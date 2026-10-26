import type { Opcion, Origen, PreguntaCorta, PreguntaMC } from './tipos'

/** Referencia al cuaderno: cap('1','11-15','Marketing y Marketing digital'). */
export const cap = (c: string, pag?: string, sec?: string): Origen => ({ tipo: 'cuaderno', cap: c, pag, sec })
export const did: Origen = { tipo: 'didactico' }
export const amp = (ref: string): Origen => ({ tipo: 'ampliacion', ref })

type Op = [texto: string, porque: string]

/** Pregunta de opción múltiple. `correcta` es el índice (desde 0) en `ops`. */
export const mc = (
  id: string,
  tema: string,
  dif: 1 | 2 | 3,
  enunciado: string,
  ops: Op[],
  correcta: number,
  o?: Origen,
): PreguntaMC => ({
  id,
  tipo: 'mc',
  tema,
  dif,
  enunciado,
  opciones: ops.map<Opcion>(([x, porque]) => ({ x, porque })),
  correcta,
  o,
})

export const corta = (
  id: string,
  tema: string,
  dif: 1 | 2 | 3,
  enunciado: string,
  modelo: string,
  criterios: string[],
  o?: Origen,
): PreguntaCorta => ({ id, tipo: 'corta', tema, dif, enunciado, modelo, criterios, o })
