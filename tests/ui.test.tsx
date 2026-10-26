import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { lecciones } from '../contenido/indice'
import { LeccionCuerpo } from '../src/componentes/LeccionCuerpo'
import { ImprimirCtx } from '../src/componentes/contexto'
import { embudo, equilibrio, metricas } from '../src/componentes/Calculadoras'
import { inline, plano } from '../src/logica/inline'
import { parsear } from '../src/logica/progreso'

describe('renderizado de lecciones', () => {
  for (const l of lecciones)
    test(`${l.id} se renderiza (web e impresión) sin errores y con contenido`, () => {
      const web = renderToStaticMarkup(<LeccionCuerpo l={l} />)
      const imp = renderToStaticMarkup(<ImprimirCtx.Provider value={true}><LeccionCuerpo l={l} conPreguntas /></ImprimirCtx.Provider>)
      expect(web.length).toBeGreaterThan(1500)
      expect(imp).toContain('Referencias al material original')
      expect(imp).not.toContain('undefined')
    })
})

describe('calculadoras (fórmulas de la Tabla 15 del cuaderno)', () => {
  test('ejemplo Quilmes: CTR 5 %, CPC $40, conversión 4 %, $1.000 por conversión', () => {
    const m = metricas(1_000_000, 500_000, 25_000, 1_000)
    expect(m.ctr).toBeCloseTo(5)
    expect(m.cpc).toBeCloseTo(40)
    expect(m.tasaConv).toBeCloseTo(4)
    expect(m.costoConv).toBeCloseTo(1000)
  })
  test('divisiones por cero devuelven NaN y no explotan', () => {
    const m = metricas(100, 0, 0, 0)
    expect([m.ctr, m.cpc, m.tasaConv, m.costoConv].every(Number.isNaN)).toBe(true)
  })
  test('embudo reduce progresivamente', () => expect(embudo(10_000, [5, 20, 25])).toEqual([10_000, 500, 100, 25]))
  test('punto de equilibrio', () => {
    expect(equilibrio(300_000, 1000, 400)).toBeCloseTo(500)
    expect(equilibrio(300_000, 300, 400)).toBeNaN()
  })
})

describe('marcado en línea y progreso', () => {
  test('texto plano', () => expect(plano('**a** [[>l1-1|b]] [[marketing]]')).toBe('a b marketing'))
  test('nodos de enlaces', () => expect(renderToStaticMarkup(<>{inline('ver [[>l2-3|mix]]')}</>)).toContain("href=\"#/marketing/leccion/l2-3\""))
  test('progreso corrupto o de otra versión no rompe', () => {
    expect(parsear('{no es json').v).toBe(1)
    expect(parsear(JSON.stringify({ v: 2 })).vistas).toEqual({})
    expect(parsear(null).quizzes).toEqual([])
    expect(parsear(JSON.stringify({ v: 1, vistas: { a: 'x' }, intentos: {} })).vistas).toEqual({ a: 'x' })
  })
})
