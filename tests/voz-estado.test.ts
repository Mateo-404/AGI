import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'bun:test'
import * as voz from '../src/logica/voz'

/*
 * Máquina de estados de la lectura, con una síntesis simulada que se comporta como Chrome:
 * cancel() corta la voz y el fragmento cortado recibe `error` de forma asíncrona.
 */

class Emision {
  text: string
  lang = ''
  rate = 1
  voice = null
  onend: ((e: unknown) => void) | null = null
  onerror: ((e: unknown) => void) | null = null
  constructor(text: string) { this.text = text }
}

const hablado: string[] = []
let emisiones: Emision[] = []
const sintesis = {
  speak(u: Emision) { hablado.push(u.text); emisiones.push(u) },
  cancel() {
    const cortadas = emisiones
    emisiones = []
    for (const u of cortadas) setTimeout(() => u.onerror?.({}), 0)
  },
  pause() { /* no se usa: pausar corta la voz */ },
  resume() { /* no se usa */ },
  getVoices: () => [],
}

const tick = () => new Promise((r) => setTimeout(r, 0))
/** Simula que el navegador termina la emisión actual. */
const terminarActual = () => emisiones.at(-1)?.onend?.({})
/** Un bloque de página de varios fragmentos (cada frase ocupa un fragmento). */
const frases = Array.from({ length: 4 }, (_, i) => `Frase ${i} ${'texto de relleno '.repeat(12)}.`)
const raiz = { cloneNode() { return this }, querySelectorAll: () => [], textContent: frases.join(' ') } as unknown as Element

beforeAll(() => {
  Object.assign(globalThis, { speechSynthesis: sintesis, SpeechSynthesisUtterance: Emision })
})
afterAll(() => {
  Reflect.deleteProperty(globalThis, 'speechSynthesis')
  Reflect.deleteProperty(globalThis, 'SpeechSynthesisUtterance')
})
beforeEach(() => {
  voz.detener()
  hablado.length = 0
  emisiones = []
})

describe('pausar y seguir', () => {
  test('pausar corta la voz y seguir relee el mismo fragmento', async () => {
    voz.reproducir(raiz, 'Lección')
    expect(voz.estadoVoz().estado).toBe('hablando')
    voz.pausar()
    await tick()
    expect(voz.estadoVoz().estado).toBe('pausado')
    expect(emisiones).toHaveLength(0)
    voz.seguir()
    expect(voz.estadoVoz().estado).toBe('hablando')
    expect(hablado).toEqual([frases[0]!, frases[0]!])
  })

  test('un evento tardío del fragmento cortado no avanza la lectura', async () => {
    voz.reproducir(raiz, 'Lección')
    const cortada = emisiones[0]!
    voz.pausar()
    cortada.onend?.({})
    cortada.onerror?.({})
    await tick()
    expect(hablado).toHaveLength(1)
    expect(voz.estadoVoz().estado).toBe('pausado')
  })

  test('si el fragmento termina en pausa, al seguir la lectura continúa', async () => {
    voz.reproducir(raiz, 'Lección')
    voz.pausar()
    voz.seguir()
    terminarActual()
    await tick()
    expect(hablado.at(-1)).toBe(frases[1]!)
    expect(voz.estadoVoz().indice).toBe(1)
  })

  test('cambiar la velocidad en pausa no reanuda la voz', async () => {
    voz.reproducir(raiz, 'Lección')
    voz.pausar()
    voz.setVelocidad(1.5)
    await tick()
    expect(voz.estadoVoz().estado).toBe('pausado')
    expect(voz.estadoVoz().velocidad).toBe(1.5)
    expect(emisiones).toHaveLength(0)
  })

  test('cambiar la velocidad al hablar relee el fragmento actual con la nueva velocidad', async () => {
    voz.reproducir(raiz, 'Lección')
    terminarActual()
    await tick()
    voz.setVelocidad(1.25)
    await tick()
    expect(voz.estadoVoz().estado).toBe('hablando')
    expect(voz.estadoVoz().indice).toBe(1)
    expect(emisiones.at(-1)?.rate).toBe(1.25)
    expect(hablado.at(-1)).toBe(frases[1]!)
  })

  test('alternar pasa de hablar a pausa y de pausa a hablar', () => {
    voz.alternar(raiz, 'Lección')
    expect(voz.estadoVoz().estado).toBe('hablando')
    voz.alternar(raiz, 'Lección')
    expect(voz.estadoVoz().estado).toBe('pausado')
    voz.alternar(raiz, 'Lección')
    expect(voz.estadoVoz().estado).toBe('hablando')
  })
})

describe('avance y detener', () => {
  test('la lectura recorre todos los fragmentos y queda parada al terminar', async () => {
    voz.reproducir(raiz, 'Lección')
    for (let i = 0; i < frases.length; i++) { terminarActual(); await tick() }
    expect(hablado).toEqual(frases)
    expect(voz.estadoVoz().estado).toBe('parado')
    expect(voz.estadoVoz().indice).toBe(0)
  })

  test('detener deja todo parado y no vuelve a hablar', async () => {
    voz.reproducir(raiz, 'Lección')
    const cortada = emisiones[0]!
    voz.detener()
    cortada.onend?.({})
    await tick()
    expect(voz.estadoVoz().estado).toBe('parado')
    expect(voz.estadoVoz().fragmentos).toEqual([])
    expect(hablado).toHaveLength(1)
  })

  test('reproducir sin texto no deja la lectura colgada', () => {
    const vacia = { cloneNode() { return this }, querySelectorAll: () => [], textContent: '   ' } as unknown as Element
    voz.reproducir(vacia, 'Vacía')
    expect(voz.estadoVoz().estado).toBe('parado')
    expect(hablado).toHaveLength(0)
  })

  test('un fragmento que dispara error y end avanza una sola vez, no dos', async () => {
    voz.reproducir(raiz, 'Lección')
    const primero = emisiones[0]!
    primero.onerror?.({})
    primero.onend?.({})
    await tick()
    expect(hablado).toEqual([frases[0]!, frases[1]!])
    expect(voz.estadoVoz().indice).toBe(1)
  })
})

describe('modo continuo', () => {
  test('al terminar la lección pasa a la siguiente una sola vez, aunque el último fragmento avise dos veces', async () => {
    let saltos = 0
    voz.alTerminarCapitulo(() => { saltos++ })
    voz.setContinuo(true)
    voz.reproducir(raiz, 'Lección')
    for (let i = 0; i < frases.length - 1; i++) { terminarActual(); await tick() }
    const ultimo = emisiones.at(-1)!
    ultimo.onend?.({})
    ultimo.onend?.({})
    ultimo.onerror?.({})
    await tick()
    expect(saltos).toBe(1)
    expect(voz.tomarPendienteContinuo()).toBe(true)
    expect(voz.tomarPendienteContinuo()).toBe(false) // se consume: la lección nueva la lee una sola vez
    expect(voz.estadoVoz().estado).toBe('parado')
    voz.setContinuo(false)
    voz.alTerminarCapitulo(() => {})
  })
  test('sin modo continuo no navega ni deja pendiente', async () => {
    let saltos = 0
    voz.alTerminarCapitulo(() => { saltos++ })
    voz.reproducir(raiz, 'Lección')
    for (let i = 0; i < frases.length; i++) { terminarActual(); await tick() }
    expect(saltos).toBe(0)
    expect(voz.tomarPendienteContinuo()).toBe(false)
    voz.alTerminarCapitulo(() => {})
  })
})
