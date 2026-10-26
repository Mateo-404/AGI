import { describe, expect, test } from 'bun:test'
import { BORDE, clasificarGesto, direccionEnCurso, objetivoExcluido, SIN_GESTO } from '../src/logica/gestos'

const base = { dy: 0, dt: 300, x0: 200, ancho: 375 }

describe('clasificarGesto', () => {
  test('deslizar claramente a la izquierda o a la derecha', () => {
    expect(clasificarGesto({ ...base, dx: -120 })).toBe('izquierda')
    expect(clasificarGesto({ ...base, dx: 120 })).toBe('derecha')
  })
  test('un recorrido corto y lento no cuenta', () => expect(clasificarGesto({ ...base, dx: -60 })).toBeNull())
  test('un recorrido corto pero rápido sí cuenta', () => {
    expect(clasificarGesto({ ...base, dx: -50, dt: 80 })).toBe('izquierda')
    expect(clasificarGesto({ ...base, dx: -30, dt: 50 })).toBeNull() // demasiado corto aun siendo rápido
  })
  test('un gesto más vertical que horizontal es scroll, no navegación', () => {
    expect(clasificarGesto({ ...base, dx: -120, dy: 90 })).toBeNull()
    expect(clasificarGesto({ ...base, dx: -120, dy: 60 })).toBe('izquierda') // justo en la proporción 2:1
    expect(clasificarGesto({ ...base, dx: -120, dy: 61 })).toBeNull()
    expect(clasificarGesto({ ...base, dx: 0, dy: 300 })).toBeNull()
  })
  test('los bordes de la pantalla quedan para el gesto «atrás» del sistema', () => {
    expect(clasificarGesto({ ...base, dx: 150, x0: BORDE - 1 })).toBeNull()
    expect(clasificarGesto({ ...base, dx: 150, x0: BORDE })).toBe('derecha')
    expect(clasificarGesto({ ...base, dx: -150, x0: 375 - BORDE + 1 })).toBeNull()
    expect(clasificarGesto({ ...base, dx: -150, x0: 375 - BORDE })).toBe('izquierda')
  })
  test('un toque sin movimiento no es un gesto', () => {
    expect(clasificarGesto({ ...base, dx: 0, dt: 0 })).toBeNull()
    expect(clasificarGesto({ ...base, dx: 3, dy: 2, dt: 100 })).toBeNull()
  })
})

describe('direccionEnCurso', () => {
  test('anticipa la dirección una vez que el movimiento es claro', () => {
    expect(direccionEnCurso(-50, 5)).toBe('izquierda')
    expect(direccionEnCurso(50, 5)).toBe('derecha')
    expect(direccionEnCurso(-20, 0)).toBeNull()
    expect(direccionEnCurso(-50, 40)).toBeNull()
  })
})

describe('objetivoExcluido', () => {
  const con = (selectores: string[]) => ({ closest: (s: string) => (selectores.some((x) => s.split(', ').includes(x)) ? {} : null) }) as unknown as Element
  test('tablas, interactivos, código y el reproductor no navegan', () => {
    for (const s of ['.tabla-w', '.inter', 'pre', '.voz', '[data-sin-gesto]', 'input']) expect(objetivoExcluido(con([s]))).toBe(true)
    expect(SIN_GESTO).toContain('.tabla-w')
  })
  test('el texto común sí navega', () => {
    expect(objetivoExcluido(con([]))).toBe(false)
    expect(objetivoExcluido(null)).toBe(false)
  })
})
