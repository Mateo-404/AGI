import { lecciones, glosario, unidades } from '@contenido/marketing/indice'
import type { Leccion, Pregunta, Tarjeta } from '@contenido/tipos'

export { lecciones, glosario, unidades }

export const leccionPorId = new Map(lecciones.map((l) => [l.id, l]))
export const terminoPorId = new Map(glosario.map((t) => [t.id, t]))

export const leccionesDe = (unidad: number): Leccion[] => lecciones.filter((l) => l.unidad === unidad)
export const preguntasDe = (l: Leccion): Pregunta[] => l.preguntas
export const todasLasPreguntas = (): Pregunta[] => lecciones.flatMap((l) => l.preguntas)
export const todasLasTarjetas = (): (Tarjeta & { lec: string })[] => lecciones.flatMap((l) => l.tarjetas.map((t) => ({ ...t, lec: l.id })))

export const leccionDePregunta = (id: string): Leccion | undefined => lecciones.find((l) => l.preguntas.some((p) => p.id === id))

export function siguienteLeccion(id: string): Leccion | undefined {
  const i = lecciones.findIndex((l) => l.id === id)
  return lecciones[i + 1]
}
export function anteriorLeccion(id: string): Leccion | undefined {
  const i = lecciones.findIndex((l) => l.id === id)
  return i > 0 ? lecciones[i - 1] : undefined
}
