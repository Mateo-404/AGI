import type { Leccion, Materia, Pregunta, Tarjeta, TerminoGlosario } from '@contenido/tipos'
import { materias } from '@contenido/materias'

/**
 * Datos derivados de una materia. En el navegador `@contenido/materias` llega en versión liviana
 * (sin el cuerpo de las lecciones), así que las páginas no mandan el apunte completo como JavaScript.
 */
export interface DatosMateria extends Materia {
  leccionPorId: Map<string, Leccion>
  terminoPorId: Map<string, TerminoGlosario>
  leccionesDe: (unidad: number) => Leccion[]
  siguiente: (id: string) => Leccion | undefined
  anterior: (id: string) => Leccion | undefined
  leccionDePregunta: (id: string) => Leccion | undefined
  todasLasPreguntas: () => Pregunta[]
  todasLasTarjetas: () => (Tarjeta & { lec: string })[]
}

const cache = new Map<string, DatosMateria>()

export function datosDe(slug = 'marketing'): DatosMateria {
  const guardado = cache.get(slug)
  if (guardado) return guardado
  const m = materias[slug] ?? materias.marketing!
  const leccionPorId = new Map(m.lecciones.map((l) => [l.id, l]))
  const terminoPorId = new Map(m.glosario.map((t) => [t.id, t]))
  const datos: DatosMateria = {
    ...m,
    leccionPorId,
    terminoPorId,
    leccionesDe: (unidad) => m.lecciones.filter((l) => l.unidad === unidad),
    siguiente: (id) => {
      const i = m.lecciones.findIndex((l) => l.id === id)
      return m.lecciones[i + 1]
    },
    anterior: (id) => {
      const i = m.lecciones.findIndex((l) => l.id === id)
      return i > 0 ? m.lecciones[i - 1] : undefined
    },
    leccionDePregunta: (id) => m.lecciones.find((l) => l.preguntas.some((p) => p.id === id)),
    todasLasPreguntas: () => m.lecciones.flatMap((l) => l.preguntas),
    todasLasTarjetas: () => m.lecciones.flatMap((l) => l.tarjetas.map((t) => ({ ...t, lec: l.id }))),
  }
  cache.set(slug, datos)
  return datos
}

/** Datos de Marketing, que también son el valor por defecto del contexto de React. */
export const marketing = datosDe('marketing')
