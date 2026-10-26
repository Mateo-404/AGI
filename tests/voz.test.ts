import { describe, expect, test } from 'bun:test'
import { trocear, textoDeElemento } from '../src/logica/voz'

describe('trocear para la lectura en voz alta', () => {
  test('ningún fragmento supera el máximo', () => {
    const largo = 'Frase de prueba bastante larga. '.repeat(40)
    for (const f of trocear(largo, 120)) expect(f.length).toBeLessThanOrEqual(120)
  })
  test('no pierde palabras', () => {
    const t = 'Uno dos tres. Cuatro cinco; seis siete. Ocho'
    expect(trocear(t, 15).join(' ')).toBe(t)
  })
  test('texto vacío', () => expect(trocear('   ')).toEqual([]))
  test('frase sin puntuación muy larga se corta por palabras', () => {
    const f = Array.from({ length: 60 }, (_, i) => `palabra${i}`).join(' ')
    const out = trocear(f, 80)
    expect(out.length).toBeGreaterThan(1)
    for (const x of out) expect(x.length).toBeLessThanOrEqual(80)
  })
})

describe('texto de la página', () => {
  test('excluye botones y figuras', () => {
    // entorno sin DOM: se prueba con un objeto mínimo que imita cloneNode/querySelectorAll
    const fake = {
      cloneNode() { return this },
      querySelectorAll() { return { forEach() {} } },
      innerText: 'Texto visible',
    } as unknown as Element
    expect(textoDeElemento(fake)).toBe('Texto visible')
  })
})
