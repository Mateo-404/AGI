import { describe, expect, test } from 'bun:test'
import { calificarTarjeta, dominada, estaVencida, fechasSugeridas, nivel, puntajeCorregido, seleccionPonderada } from '../src/logica/repaso'

const ok = (f: string, sinPista = false) => ({ fecha: f, ok: true, sinPista })
const mal = (f: string) => ({ fecha: f, ok: false, sinPista: false })

describe('dominio', () => {
  test('un acierto aislado no es dominio', () => expect(dominada([ok('2026-01-01T10:00:00Z', true)])).toBe(false))
  test('3 aciertos el mismo día no alcanzan', () =>
    expect(dominada([ok('2026-01-01T10:00:00Z', true), ok('2026-01-01T11:00:00Z'), ok('2026-01-01T12:00:00Z')])).toBe(false))
  test('3 aciertos en 2 días pero todos con pista no alcanzan', () =>
    expect(dominada([ok('2026-01-01T10:00:00Z'), ok('2026-01-02T10:00:00Z'), ok('2026-01-03T10:00:00Z')])).toBe(false))
  test('3 aciertos, 2 días y uno sin pista: dominada', () =>
    expect(dominada([ok('2026-01-01T10:00:00Z'), ok('2026-01-02T10:00:00Z', true), mal('2026-01-02T11:00:00Z'), ok('2026-01-03T10:00:00Z')])).toBe(true))
  test('nivel por lección', () => {
    const dom = [ok('2026-01-01T10:00:00Z'), ok('2026-01-02T10:00:00Z', true), ok('2026-01-03T10:00:00Z')]
    expect(nivel([])).toBe('sin-evidencia')
    expect(nivel([[], []])).toBe('sin-evidencia')
    expect(nivel([dom, [ok('2026-01-01T10:00:00Z')]])).toBe('en-practica')
    expect(nivel([dom, dom])).toBe('consolidado')
  })
})

describe('puntaje y espaciado', () => {
  test('corrige el azar con 4 opciones', () => {
    expect(puntajeCorregido(6, 3, 4)).toBeCloseTo(5)
    expect(puntajeCorregido(1, 9, 4)).toBe(0)
  })
  test('tarjetas suben de caja y fallan a la primera', () => {
    const t1 = calificarTarjeta(undefined, true, '2026-01-01T00:00:00.000Z')
    expect(t1.caja).toBe(1)
    expect(t1.prox.slice(0, 10)).toBe('2026-01-02')
    const t2 = calificarTarjeta(t1, true, '2026-01-02T00:00:00.000Z')
    expect(t2.prox.slice(0, 10)).toBe('2026-01-05')
    expect(calificarTarjeta(t2, false, '2026-01-05T00:00:00.000Z').caja).toBe(0)
  })
  test('fechas sugeridas +1,+3,+7,+14,+30', () =>
    expect(fechasSugeridas('2026-03-01T00:00:00.000Z')).toEqual(['2026-03-02', '2026-03-04', '2026-03-08', '2026-03-15', '2026-03-31']))
  test('vencimiento', () => {
    expect(estaVencida(undefined, '2026-01-01')).toBe(true)
    expect(estaVencida({ caja: 1, ult: 'x', prox: '2026-02-01' }, '2026-01-01')).toBe(false)
  })
  test('selección prioriza no dominadas', () => {
    const pool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const sel = seleccionPonderada(pool, 2, (id) => id === 'a', () => 0.5)
    expect(sel.map((x) => x.id)).not.toContain('a')
  })
})
