/** Lógica pura de práctica espaciada, dominio y puntaje. Sin acceso a DOM: se prueba con `bun test`. */

export const INTERVALOS_DIAS = [1, 3, 7, 14, 30] as const

export interface Intento {
  /** ISO completo */
  fecha: string
  ok: boolean
  /** true si se respondió sin pista (respuesta corta) o con confianza alta */
  sinPista: boolean
}

export interface EstadoTarjeta {
  caja: number
  /** ISO de la próxima fecha sugerida */
  prox: string
  ult: string
}

const DIA_MS = 86_400_000

export const diaDe = (iso: string): string => iso.slice(0, 10)

export function sumarDias(iso: string, dias: number): string {
  return new Date(new Date(iso).getTime() + dias * DIA_MS).toISOString()
}

/** Fechas sugeridas de repaso para algo estudiado en `inicio`. */
export function fechasSugeridas(inicio: string): string[] {
  return INTERVALOS_DIAS.map((d) => diaDe(sumarDias(inicio, d)))
}

/** Tarjeta tras calificarse: acierto sube de caja, fallo vuelve a la primera. */
export function calificarTarjeta(prev: EstadoTarjeta | undefined, ok: boolean, ahora: string): EstadoTarjeta {
  const caja = ok ? Math.min((prev?.caja ?? 0) + 1, INTERVALOS_DIAS.length) : 0
  const dias = ok ? INTERVALOS_DIAS[caja - 1] : 1
  return { caja, ult: ahora, prox: sumarDias(ahora, dias) }
}

export const estaVencida = (t: EstadoTarjeta | undefined, ahora: string): boolean => !t || t.prox <= ahora

/**
 * Una pregunta se considera DOMINADA solo con evidencia sostenida:
 * ≥3 aciertos, en ≥2 días distintos, y al menos un acierto sin pista.
 * Así un acierto aislado (o por azar) no se lee como dominio.
 */
export function dominada(intentos: Intento[]): boolean {
  const aciertos = intentos.filter((i) => i.ok)
  if (aciertos.length < 3) return false
  if (new Set(aciertos.map((i) => diaDe(i.fecha))).size < 2) return false
  return aciertos.some((i) => i.sinPista)
}

export type Nivel = 'sin-evidencia' | 'en-practica' | 'consolidado'

/** Nivel de un conjunto de preguntas (lección o unidad) según cuántas están dominadas. */
export function nivel(intentosPorPregunta: Intento[][]): Nivel {
  const total = intentosPorPregunta.length
  if (total === 0) return 'sin-evidencia'
  const respondidas = intentosPorPregunta.filter((x) => x.length > 0).length
  if (respondidas === 0) return 'sin-evidencia'
  const dom = intentosPorPregunta.filter(dominada).length
  return dom / total >= 0.7 ? 'consolidado' : 'en-practica'
}

/** Puntaje corregido por azar: aciertos − errores/(k−1). Nunca menor a 0. */
export function puntajeCorregido(aciertos: number, errores: number, opciones: number): number {
  return Math.max(0, aciertos - errores / Math.max(1, opciones - 1))
}

/** Baraja determinista opcional para pruebas. */
export function barajar<T>(xs: T[], rnd: () => number = Math.random): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

/** Elige n preguntas priorizando las no dominadas (peso 3), luego las dominadas (peso 1). */
export function seleccionPonderada<T extends { id: string }>(
  pool: T[],
  n: number,
  esDominada: (id: string) => boolean,
  rnd: () => number = Math.random,
): T[] {
  const pendientes = barajar(pool.filter((p) => !esDominada(p.id)), rnd)
  const resto = barajar(pool.filter((p) => esDominada(p.id)), rnd)
  return [...pendientes, ...resto].slice(0, n)
}
