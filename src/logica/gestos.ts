/**
 * Gestos táctiles del sitio. La decisión de «¿esto fue un deslizamiento?» es una función pura (clasificarGesto) para poder probarla;
 * los componentes solo le pasan lo que midieron con touchstart/touchend.
 *
 * Reglas:
 * - Solo cuenta un deslizamiento claramente horizontal: |dx| ≥ 2·|dy|, para no pelear con el scroll vertical.
 * - Se ignora si empieza a menos de BORDE px del costado de la pantalla: ahí viven los gestos «atrás» de iOS y Android.
 * - Un deslizamiento rápido necesita menos recorrido que uno lento.
 * - Todo gesto tiene su botón equivalente en pantalla (WCAG 2.5.1): esto es un atajo, nunca la única vía.
 */
export type Direccion = 'izquierda' | 'derecha'

export interface Medida {
  /** Desplazamiento horizontal y vertical en px (positivo: derecha / abajo). */
  dx: number
  dy: number
  /** Duración del toque en ms. */
  dt: number
  /** Dónde empezó el toque (px desde el costado izquierdo) y el ancho de la pantalla. */
  x0: number
  ancho: number
}

export const BORDE = 24
export const RECORRIDO = 80
export const RECORRIDO_RAPIDO = 40
/** px por ms a partir de los cuales el deslizamiento se considera «rápido». */
export const VELOCIDAD_RAPIDA = 0.5

export function clasificarGesto({ dx, dy, dt, x0, ancho }: Medida): Direccion | null {
  if (x0 < BORDE || x0 > ancho - BORDE) return null
  const ax = Math.abs(dx)
  const ay = Math.abs(dy)
  if (ax < 2 * ay) return null
  const rapido = dt > 0 && ax / dt >= VELOCIDAD_RAPIDA
  if (ax < (rapido ? RECORRIDO_RAPIDO : RECORRIDO)) return null
  return dx < 0 ? 'izquierda' : 'derecha'
}

/** Qué se ve mientras el dedo todavía se mueve: hacia dónde va el gesto, sin esperar a que termine. */
export function direccionEnCurso(dx: number, dy: number): Direccion | null {
  if (Math.abs(dx) < RECORRIDO_RAPIDO || Math.abs(dx) < 2 * Math.abs(dy)) return null
  return dx < 0 ? 'izquierda' : 'derecha'
}

/** Cosas que ya usan el deslizamiento horizontal (o donde un gesto sería un accidente): ahí no se navega. */
export const SIN_GESTO = '.tabla-w, [data-sin-gesto], .inter, input, textarea, select, pre, .voz, .nav, .scrim, .barra-inf, .quiz, .flash'

export function objetivoExcluido(el: Element | null): boolean {
  return !!el && typeof el.closest === 'function' && el.closest(SIN_GESTO) !== null
}

/** Vibración corta al completar un gesto (Android), salvo que la persona pida menos movimiento. */
export function vibrar(): void {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return
  if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
  navigator.vibrate(8)
}
