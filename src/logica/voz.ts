import { useSyncExternalStore } from 'react'

/**
 * Lectura en voz alta estilo podcast con la síntesis de voz del navegador (sin servidores).
 * Divide el texto en fragmentos porque muchos navegadores cortan las lecturas largas.
 */
export type EstadoVoz = 'parado' | 'hablando' | 'pausado'

interface Estado {
  estado: EstadoVoz
  fragmentos: string[]
  indice: number
  velocidad: number
  continuo: boolean
  titulo: string
  soportada: boolean
}

const hayVoz = (): boolean => typeof globalThis !== 'undefined' && 'speechSynthesis' in globalThis && typeof (globalThis as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance === 'function'

let estado: Estado = {
  estado: 'parado', fragmentos: [], indice: 0, velocidad: 1, continuo: false, titulo: '', soportada: hayVoz(),
}
const oyentes = new Set<() => void>()
const emitir = () => oyentes.forEach((f) => f())
const set = (p: Partial<Estado>) => { estado = { ...estado, ...p }; emitir() }

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

/** Texto visible de la página, sin botones, diagramas, figuras ni controles. */
export function textoDeElemento(el: Element): string {
  const c = el.cloneNode(true) as Element
  c.querySelectorAll('button, svg, .no-print, .quiz, script, style, .origen, .figura, .aviso.no-leer').forEach((n) => n.remove())
  return (c as HTMLElement).innerText ?? c.textContent ?? ''
}

function hablar(i: number) {
  const { fragmentos, velocidad } = estado
  if (i >= fragmentos.length) {
    if (estado.continuo) { pendienteContinuo = true; set({ estado: 'parado', indice: 0 }); siguienteCapitulo?.(); return }
    set({ estado: 'parado', indice: 0 }); return
  }
  const u = new (globalThis as unknown as { SpeechSynthesisUtterance: new (t: string) => SpeechSynthesisUtterance }).SpeechSynthesisUtterance(fragmentos[i]!)
  u.lang = 'es-AR'
  u.rate = velocidad
  const voces = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('es'))
  const pref = voces.find((v) => v.lang === 'es-AR') ?? voces[0]
  if (pref) u.voice = pref
  u.onend = () => { if (estado.estado === 'hablando') hablar(i + 1) }
  u.onerror = () => { if (estado.estado === 'hablando') hablar(i + 1) }
  set({ indice: i })
  speechSynthesis.speak(u)
}

let siguienteCapitulo: (() => void) | undefined
let pendienteContinuo = false

/** Al terminar un capítulo en modo continuo se llama a este gancho (la app navega a la lección siguiente). */
export function alTerminarCapitulo(f: () => void) { siguienteCapitulo = f }
/** Lo consulta la lección que se abre después de un avance continuo. */
export function tomarPendienteContinuo(): boolean { const v = pendienteContinuo; pendienteContinuo = false; return v }

export function reproducir(texto: string, titulo: string) {
  if (!estado.soportada) return
  speechSynthesis.cancel()
  const fragmentos = trocear(texto)
  set({ fragmentos, titulo, indice: 0, estado: 'hablando' })
  hablar(0)
}

export function pausar() { if (!estado.soportada || estado.estado !== 'hablando') return; speechSynthesis.pause(); set({ estado: 'pausado' }) }
export function seguir() { if (!estado.soportada || estado.estado !== 'pausado') return; speechSynthesis.resume(); set({ estado: 'hablando' }) }
export function detener() { if (!estado.soportada) return; speechSynthesis.cancel(); set({ estado: 'parado', indice: 0, fragmentos: [] }) }
export function alternar(texto: string, titulo: string) {
  if (estado.estado === 'hablando') pausar()
  else if (estado.estado === 'pausado') seguir()
  else reproducir(texto, titulo)
}
export function setVelocidad(v: number) {
  set({ velocidad: v })
  // La velocidad aplica al siguiente fragmento; reanudar el actual con la nueva velocidad.
  if (estado.estado !== 'parado') { const i = estado.indice; speechSynthesis.cancel(); set({ estado: 'hablando' }); hablar(i) }
}
export function setContinuo(c: boolean) { set({ continuo: c }) }

const suscribir = (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f) } }
const sinVoz: Estado = { ...estado, soportada: false }
export const useVoz = (): Estado => useSyncExternalStore(suscribir, () => estado, () => sinVoz)
export const estadoVoz = () => estado
