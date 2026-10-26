import { parse as leerYaml } from 'yaml'
import type { Bloque, Leccion, Origen, Pregunta, Tarjeta, TipoCallout } from '@contenido/tipos'

/**
 * Lecciones en Markdown → objetos `Leccion` (el mismo modelo de contenido/tipos.ts).
 * El marcado en línea (**negrita**, *cursiva*, [[id]], [[>lec|texto]]) queda como texto: lo resuelve src/logica/inline.tsx.
 *
 * Una lección son dos archivos: `lN-M.md` (apunte) y `lN-M.practica.yaml` (preguntas y tarjetas).
 * El formato está documentado en skills/apuntes-md/SKILL.md.
 */

const CALLOUTS: readonly string[] = ['clave', 'ojo', 'ia', 'ampliacion', 'discrepancia', 'didactico']

/** `{c 1 | 10-11 | sección}`, `{d}` o `{a referencia}` al final del bloque. */
const ORIGEN_AL_FINAL = /\s*\{([cda](?:\s[^{}]*)?)\}\s*$/
const ORIGEN_SOLO = /^\{([cda](?:\s[^{}]*)?)\}$/

export function parsearOrigen(s: string): Origen {
  const t = s.trim()
  if (t === 'd') return { tipo: 'didactico' }
  if (t.startsWith('a ')) return { tipo: 'ampliacion', ref: t.slice(2).trim() }
  if (t.startsWith('c ')) {
    const [cap, pag, sec] = t.slice(2).split(' | ').map((x) => x.trim())
    return { tipo: 'cuaderno', cap: cap!, pag: pag || undefined, sec: sec || undefined }
  }
  throw new Error(`Origen inválido: {${s}}. Usá {c cap | pág | sección}, {d} o {a referencia}.`)
}

export function formatearOrigen(o: Origen): string {
  if (o.tipo === 'didactico') return 'd'
  if (o.tipo === 'ampliacion') return `a ${o.ref}`
  const partes = [o.cap, o.pag ?? '', o.sec ?? '']
  while (partes.length > 1 && partes.at(-1) === '') partes.pop()
  return `c ${partes.join(' | ')}`
}

function sacarOrigen(texto: string): { x: string; o?: Origen } {
  const m = ORIGEN_AL_FINAL.exec(texto)
  return m ? { x: texto.slice(0, m.index), o: parsearOrigen(m[1]!) } : { x: texto }
}

class ErrorMd extends Error {}

interface Ctx { id: string; sintesis: string[] }

const celdas = (linea: string): string[] =>
  linea.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'))

const esItemLista = (l: string) => /^(- |\d+\. )/.test(l)
const quitarMarca = (l: string) => l.replace(/^(- |\d+\. )/, '')

function bloques(lineas: string[], ctx: Ctx, desde: number): Bloque[] {
  const out: Bloque[] = []
  let i = 0
  const falla = (msg: string): never => { throw new ErrorMd(`${ctx.id} (línea ${desde + i + 1}): ${msg}`) }
  /** Origen en una línea sola justo después de un bloque cerrado (fence o contenedor). */
  const origenSiguiente = (): Origen | undefined => {
    const m = ORIGEN_SOLO.exec((lineas[i] ?? '').trim())
    if (!m) return undefined
    i++
    return parsearOrigen(m[1]!)
  }
  while (i < lineas.length) {
    const linea = lineas[i]!
    if (!linea.trim()) { i++; continue }

    // Contenedor: :::tipo Título … ::: (más dos puntos para anidar)
    const cont = /^(:{3,})\s*(\w+)\s*(.*)$/.exec(linea)
    if (cont) {
      const [, marca, tipo, titulo] = cont as unknown as [string, string, string, string]
      const ini = i + 1
      let fin = ini
      while (fin < lineas.length && lineas[fin]!.trim() !== marca) fin++
      if (fin >= lineas.length) falla(`falta el cierre ${marca} de :::${tipo}`)
      const cuerpo = lineas.slice(ini, fin)
      const texto = cuerpo.map((l) => l.trim()).filter(Boolean).join(' ')
      i = fin + 1
      if (CALLOUTS.includes(tipo)) {
        const { x, o } = sacarOrigen(texto)
        out.push({ t: 'callout', tipo: tipo as TipoCallout, ...(titulo ? { titulo: titulo.trim() } : {}), x, ...(o ? { o } : {}) })
      } else if (tipo === 'def') {
        const { x, o } = sacarOrigen(texto)
        out.push({ t: 'def', termino: titulo.trim(), x, ...(o ? { o } : {}) })
      } else if (tipo === 'acordeon') {
        out.push({ t: 'acordeon', titulo: titulo.trim(), bloques: bloques(cuerpo, ctx, ini) })
      } else if (tipo === 'ejemplo') {
        const items = cuerpo.filter((l) => l.trim())
        const ult = sacarOrigen(items.at(-1) ?? '')
        const pasos = [...items.slice(0, -1), ult.x].map(quitarMarca)
        out.push({ t: 'ejemplo', titulo: titulo.trim(), pasos, ...(ult.o ? { o: ult.o } : {}) })
      } else if (tipo === 'comparar') {
        const grupos: { titulo: string; items: string[] }[] = []
        for (const l of cuerpo) {
          if (l.startsWith('### ')) grupos.push({ titulo: l.slice(4).trim(), items: [] })
          else if (l.trim()) grupos.at(-1)?.items.push(quitarMarca(l.trim()))
        }
        if (grupos.length !== 2) falla(':::comparar necesita exactamente dos secciones "### Título"')
        const ult = sacarOrigen(grupos[1]!.items.at(-1) ?? '')
        grupos[1]!.items[grupos[1]!.items.length - 1] = ult.x
        out.push({ t: 'comparar', ...(titulo ? { titulo: titulo.trim() } : {}), a: grupos[0]!, b: grupos[1]!, ...(ult.o ? { o: ult.o } : {}) })
      } else if (tipo === 'sintesis') {
        ctx.sintesis.push(...cuerpo.filter((l) => l.trim()).map((l) => quitarMarca(l.trim())))
      } else falla(`contenedor desconocido :::${tipo}`)
      continue
    }

    // Bloque de código: ```tipo Título … ```
    const cerca = /^```(\w+)\s*(.*)$/.exec(linea)
    if (cerca) {
      const tipo = cerca[1]!
      const titulo = cerca[2]!.trim()
      const ini = i + 1
      let fin = ini
      while (fin < lineas.length && lineas[fin]!.trim() !== '```') fin++
      if (fin >= lineas.length) falla(`falta el cierre \`\`\` de \`\`\`${tipo}`)
      const cuerpo = lineas.slice(ini, fin).join('\n')
      i = fin + 1
      if (tipo === 'mermaid') {
        const o = origenSiguiente()
        out.push({ t: 'diagrama', ...(titulo ? { titulo } : {}), codigo: cuerpo, ...(o ? { o } : {}) })
        continue
      }
      let datos: Record<string, unknown>
      try { datos = (leerYaml(cuerpo) ?? {}) as Record<string, unknown> } catch (e) { return falla(`YAML inválido en \`\`\`${tipo}: ${(e as Error).message}`) }
      const { o, ...resto } = datos
      const oo = typeof o === 'string' ? parsearOrigen(o) : origenSiguiente()
      out.push({ t: tipo, ...resto, ...(oo ? { o: oo } : {}) } as unknown as Bloque)
      continue
    }

    // Calculadora en una línea: ::calc embudo
    const simple = /^::(\w+)\s+(\S+)\s*$/.exec(linea)
    if (simple) {
      i++
      if (simple[1] === 'calc') out.push({ t: 'calc', tipo: simple[2] as never })
      else falla(`directiva desconocida ::${simple[1]}`)
      continue
    }

    // Encabezado
    const h = /^##\s+(.*)$/.exec(linea)
    if (h) { out.push({ t: 'h', x: h[1]!.trim() }); i++; continue }

    // Tabla (con título opcional en una línea "^ Título")
    if (linea.startsWith('|') || (linea.startsWith('^ ') && (lineas[i + 1] ?? '').startsWith('|'))) {
      let titulo: string | undefined
      if (linea.startsWith('^ ')) { titulo = linea.slice(2).trim(); i++ }
      const filas: string[] = []
      while (i < lineas.length && lineas[i]!.startsWith('|')) filas.push(lineas[i++]!)
      const ult = sacarOrigen(filas.at(-1)!)
      filas[filas.length - 1] = ult.x
      const [cab, , ...cuerpo] = filas
      if (!cab) falla('tabla vacía')
      out.push({ t: 'tabla', ...(titulo ? { titulo } : {}), cab: celdas(cab!), filas: cuerpo.map(celdas), ...(ult.o ? { o: ult.o } : {}) })
      continue
    }

    // Lista
    if (esItemLista(linea)) {
      const num = /^\d+\. /.test(linea)
      const items: string[] = []
      while (i < lineas.length && esItemLista(lineas[i]!)) items.push(lineas[i++]!)
      const ult = sacarOrigen(items.at(-1)!)
      items[items.length - 1] = ult.x
      out.push({ t: 'lista', items: items.map(quitarMarca), ...(num ? { num } : {}), ...(ult.o ? { o: ult.o } : {}) })
      continue
    }

    // Párrafo (una barra inicial escapa un comienzo que parecería otro bloque)
    const parrafo: string[] = []
    while (i < lineas.length && lineas[i]!.trim()) parrafo.push(lineas[i++]!.replace(/^\\/, ''))
    const { x, o } = sacarOrigen(parrafo.map((l) => l.trim()).join(' '))
    out.push({ t: 'p', x, ...(o ? { o } : {}) })
  }
  return out
}

const comoOrigen = (v: unknown): Origen | undefined => (typeof v === 'string' ? parsearOrigen(v) : undefined)
/** `l1-1` → `l11`: prefijo de los ids de preguntas y tarjetas (l11-q1, l11-t1). */
const prefijo = (id: string) => id.replace('-', '')

/**
 * Preguntas y tarjetas (archivo .practica.yaml).
 * - Pregunta: `tema`, `dif`, `enunciado`, y o bien `opciones: [[texto, porqué], …]` + `correcta` (múltiple opción)
 *   o bien `modelo` + `criterios` (respuesta corta). `o` es un origen compacto ("c 1 | 14"). `id` y `tipo` se infieren.
 * - Tarjeta: `[frente, dorso]` (o `[frente, dorso, id]` si el id no sigue la convención).
 */
export function parsearPractica(yaml: string, leccionId: string): { preguntas: Pregunta[]; tarjetas: Tarjeta[] } {
  const datos = (leerYaml(yaml) ?? {}) as { preguntas?: Record<string, unknown>[]; tarjetas?: string[][] }
  const pre = prefijo(leccionId)
  const preguntas = (datos.preguntas ?? []).map(({ o, opciones, id, ...p }, n) => {
    const base = { id: id ?? `${pre}-q${n + 1}`, tipo: 'modelo' in p ? 'corta' : 'mc', ...p }
    const origen = comoOrigen(o)
    const ops = Array.isArray(opciones) ? { opciones: (opciones as string[][]).map(([x, porque]) => ({ x, porque })) } : {}
    return { ...base, ...ops, ...(origen ? { o: origen } : {}) } as unknown as Pregunta
  })
  const tarjetas = (datos.tarjetas ?? []).map(([f, b, id], n) => ({ id: id ?? `${pre}-t${n + 1}`, f: f!, b: b! }))
  return { preguntas, tarjetas }
}

/** Apunte `.md` (+ práctica opcional) → lección. */
export function parsearLeccion(md: string, practicaYaml = ''): Leccion {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(md)
  if (!m) throw new ErrorMd('Falta el frontmatter YAML entre líneas ---')
  const f = (leerYaml(m[1]!) ?? {}) as Record<string, unknown>
  const id = String(f.id ?? '')
  const ctx: Ctx = { id, sintesis: [] }
  const cuerpo = bloques(m[2]!.split(/\r?\n/), ctx, m[1]!.split('\n').length + 2)
  const { preguntas, tarjetas } = parsearPractica(practicaYaml, id)
  const lista = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : [])
  return {
    id,
    unidad: Number(f.unidad),
    titulo: String(f.titulo ?? ''),
    resumen: String(f.resumen ?? ''),
    objetivos: lista(f.objetivos),
    previos: lista(f.previos),
    bloques: cuerpo,
    claves: lista(f.claves),
    preguntas,
    tarjetas,
    sintesis: ctx.sintesis,
    conexiones: lista(f.conexiones),
    referencias: lista(f.referencias).map(parsearOrigen),
    minutos: Number(f.minutos),
  }
}
