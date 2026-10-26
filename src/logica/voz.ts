import { useSyncExternalStore } from 'react'

/**
 * Lectura en voz alta estilo podcast con la síntesis de voz del navegador (sin servidores).
 * El texto se divide en fragmentos cortos porque muchos navegadores cortan las lecturas largas.
 *
 * Pausar no usa speechSynthesis.pause(): en varios móviles no funciona y la lectura queda trabada.
 * Se corta el fragmento que suena y, al seguir, se relee ese fragmento desde su comienzo.
 */
export type EstadoVoz = 'parado' | 'hablando' | 'pausado'

/** Trozo de texto a leer y el bloque de la página donde está (para marcarlo mientras suena). */
export interface Fragmento { texto: string; el?: Element }

interface Estado {
  estado: EstadoVoz
  fragmentos: Fragmento[]
  indice: number
  velocidad: number
  continuo: boolean
  titulo: string
  soportada: boolean
}

/** Bloques que se leen y se marcan. Cada uno lee solo su texto directo: los anidados se leen aparte. */
const BLOQUES = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,dt,dd,figcaption,td,th,pre'
/** Lo que no se lee: controles, figuras, diagramas y las preguntas de práctica. */
const NO_LEER = 'button, svg, .no-print, .quiz, script, style, .origen, .aviso.no-leer'

const hayVoz = (): boolean => typeof globalThis !== 'undefined' && 'speechSynthesis' in globalThis && typeof (globalThis as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance === 'function'

let estado: Estado = {
  estado: 'parado', fragmentos: [], indice: 0, velocidad: 1, continuo: false, titulo: '', soportada: hayVoz(),
}
const oyentes = new Set<() => void>()
const emitir = () => oyentes.forEach((f) => f())
const set = (p: Partial<Estado>) => { estado = { ...estado, ...p }; emitir(); sincronizarSistema() }

/** Parte un texto en frases y las agrupa hasta `max` caracteres. */
export function trocear(texto: string, max = 220): string[] {
  const frases = texto.replace(/\s+/g, ' ').trim().split(/(?<=[.!?;:])\s+/).filter(Boolean)
  const out: string[] = []
  let actual = ''
  for (const f of frases) {
    if (f.length > max) {
      // frase sin puntuación muy larga: cortar por palabras
      for (const w of f.split(' ')) {
        if ((actual + ' ' + w).trim().length > max) { if (actual) out.push(actual); actual = w } else actual = (actual + ' ' + w).trim()
      }
      continue
    }
    if ((actual + ' ' + f).trim().length > max) { if (actual) out.push(actual); actual = f } else actual = (actual + ' ' + f).trim()
  }
  if (actual) out.push(actual)
  return out
}

/** Texto de un elemento sin lo que no se lee; con `propio`, sin los bloques anidados (se leen aparte). */
function textoLeible(el: Element, propio: boolean): string {
  const c = el.cloneNode(true) as Element
  c.querySelectorAll(propio ? `${NO_LEER}, ${BLOQUES}` : NO_LEER).forEach((n) => n.remove())
  c.querySelectorAll('br').forEach((br) => br.replaceWith(' '))
  return c.textContent ?? ''
}

/** Texto visible de la página, sin botones, diagramas, figuras ni controles. */
export function textoDeElemento(el: Element): string {
  return textoLeible(el, false)
}

/** Bloques de la página en orden, partidos en fragmentos. Si la página no tiene bloques, se lee todo el texto sin marcar nada. */
function fragmentosDe(raiz: Element): Fragmento[] {
  const out: Fragmento[] = []
  for (const el of raiz.querySelectorAll(BLOQUES)) {
    if (el.closest(NO_LEER)) continue
    for (const texto of trocear(textoLeible(el, true))) out.push({ texto, el })
  }
  if (out.length) return out
  return trocear(textoDeElemento(raiz)).map((texto) => ({ texto }))
}

/**
 * Marca el bloque que suena y lo lleva al tercio superior de la pantalla, donde no tapa el menú de audio.
 * Si ya está en una zona visible, la página no se mueve.
 */
let marcado: Element | undefined
function marcar(el: Element | undefined) {
  if (el === marcado) return
  marcado?.classList.remove('voz-leyendo')
  marcado = el
  if (!el) return
  el.classList.add('voz-leyendo')
  const r = el.getBoundingClientRect()
  if (r.top >= innerHeight * 0.15 && r.top <= innerHeight * 0.5) return
  const reducir = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  scrollBy({ top: r.top - innerHeight * 0.3, behavior: reducir ? 'auto' : 'smooth' })
}

/** Número de la lectura en curso. Cada corte lo cambia: los eventos del fragmento cortado se ignoran. */
let turno = 0
function cortar() {
  turno++
  speechSynthesis.cancel()
}

function terminar() {
  marcar(undefined)
  set({ estado: 'parado', indice: 0 })
}

function hablar(i: number) {
  const { fragmentos, velocidad } = estado
  if (i >= fragmentos.length) {
    if (estado.continuo) { pendienteContinuo = true; terminar(); siguienteCapitulo?.(); return }
    terminar(); return
  }
  const frag = fragmentos[i]!
  const t = turno
  const u = new (globalThis as unknown as { SpeechSynthesisUtterance: new (t: string) => SpeechSynthesisUtterance }).SpeechSynthesisUtterance(frag.texto)
  u.lang = 'es-AR'
  u.rate = velocidad
  const voces = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('es'))
  const pref = voces.find((v) => v.lang === 'es-AR') ?? voces[0]
  if (pref) u.voice = pref
  // Un evento de un fragmento cortado (pausa, velocidad, detener) llega con otro turno y no avanza.
  const alFinalizar = () => { if (t === turno) hablar(i + 1) }
  u.onend = alFinalizar
  u.onerror = alFinalizar
  set({ indice: i })
  marcar(frag.el)
  speechSynthesis.speak(u)
}

let siguienteCapitulo: (() => void) | undefined
let pendienteContinuo = false

/** Al terminar un capítulo en modo continuo se llama a este gancho (la app navega a la lección siguiente). */
export function alTerminarCapitulo(f: () => void) { siguienteCapitulo = f }
/** Lo consulta la lección que se abre después de un avance continuo. */
export function tomarPendienteContinuo(): boolean { const v = pendienteContinuo; pendienteContinuo = false; return v }

export function reproducir(raiz: Element, titulo: string) {
  if (!hayVoz()) return
  cortar()
  const fragmentos = fragmentosDe(raiz)
  if (!fragmentos.length) return
  set({ fragmentos, titulo, indice: 0, estado: 'hablando' })
  hablar(0)
}

export function pausar() {
  if (!hayVoz() || estado.estado !== 'hablando') return
  cortar()
  set({ estado: 'pausado' })
}

export function seguir() {
  if (!hayVoz() || estado.estado !== 'pausado') return
  set({ estado: 'hablando' })
  hablar(estado.indice)
}

export function detener() {
  if (!hayVoz()) return
  cortar()
  marcar(undefined)
  set({ estado: 'parado', indice: 0, fragmentos: [] })
}

export function alternar(raiz: Element, titulo: string) {
  if (estado.estado === 'hablando') pausar()
  else if (estado.estado === 'pausado') seguir()
  else reproducir(raiz, titulo)
}

export function setVelocidad(v: number) {
  set({ velocidad: v })
  // La velocidad se aplica al fragmento que suena: se corta y se relee desde ahí. En pausa solo se guarda.
  if (estado.estado === 'hablando') { cortar(); hablar(estado.indice) }
}

export function setContinuo(c: boolean) { set({ continuo: c }) }

/*
 * Controles del sistema (notificación en el móvil, pantalla de bloqueo, auriculares).
 * Chrome y Android solo los muestran si hay audio sonando, así que mientras se lee suena un silencio en bucle.
 */
const acciones: [MediaSessionAction, () => void][] = [['play', () => seguir()], ['pause', () => pausar()], ['stop', () => detener()]]
let silencio: HTMLAudioElement | undefined

/** WAV mono de 1 s (8 kHz, 8 bits) en silencio: en PCM sin signo el silencio es 128. */
function urlSilencio(): string {
  const n = 8000
  const v = new DataView(new ArrayBuffer(44 + n))
  const texto = (o: number, s: string) => { for (let i = 0; i < 4; i++) v.setUint8(o + i, s.charCodeAt(i)) }
  texto(0, 'RIFF'); v.setUint32(4, 36 + n, true); texto(8, 'WAVE'); texto(12, 'fmt ')
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true)
  v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true)
  texto(36, 'data'); v.setUint32(40, n, true)
  new Uint8Array(v.buffer).fill(128, 44)
  return URL.createObjectURL(new Blob([v.buffer], { type: 'audio/wav' }))
}

function sincronizarSistema() {
  if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
  const ms = navigator.mediaSession
  const { estado: e, titulo } = estado
  if (e === 'parado') {
    silencio?.pause()
    ms.metadata = null
    ms.playbackState = 'none'
    return
  }
  if (typeof MediaMetadata === 'function') ms.metadata = new MediaMetadata({ title: titulo, artist: 'Somos #AGI', album: 'Marketing Digital' })
  ms.playbackState = e === 'hablando' ? 'playing' : 'paused'
  for (const [accion, f] of acciones) {
    try { ms.setActionHandler(accion, f) } catch { /* el navegador no admite esta acción */ }
  }
  if (!silencio && typeof Audio === 'function' && typeof URL.createObjectURL === 'function') {
    silencio = new Audio(urlSilencio())
    silencio.loop = true
  }
  if (e === 'hablando') void silencio?.play().catch(() => { /* sin gesto del usuario: la voz sigue igual */ })
  else silencio?.pause()
}

const suscribir = (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f) } }
const sinVoz: Estado = { ...estado, soportada: false }
export const useVoz = (): Estado => useSyncExternalStore(suscribir, () => estado, () => sinVoz)
export const estadoVoz = () => estado
