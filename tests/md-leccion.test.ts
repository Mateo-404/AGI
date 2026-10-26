import { describe, expect, test } from 'bun:test'
import { formatearOrigen, parsearLeccion, parsearOrigen, parsearPractica } from '../src/logica/mdLeccion'

const cab = `---
id: l9-9
unidad: 9
titulo: Prueba
resumen: Una lección de prueba.
minutos: 10
objetivos:
  - Uno
  - Dos
previos: [l1-1]
claves: [marketing]
conexiones: [l1-2, l2-1]
referencias:
  - c 1 | 10-16
  - d
---
`
const bloques = (cuerpo: string) => parsearLeccion(cab + cuerpo).bloques

describe('origen compacto', () => {
  test('cuaderno, didáctico y ampliación', () => {
    expect(parsearOrigen('c 1 | 11-14 | Definiciones')).toEqual({ tipo: 'cuaderno', cap: '1', pag: '11-14', sec: 'Definiciones' })
    expect(parsearOrigen('c 3')).toEqual({ tipo: 'cuaderno', cap: '3', pag: undefined, sec: undefined })
    expect(parsearOrigen('d')).toEqual({ tipo: 'didactico' })
    expect(parsearOrigen('a HubSpot (2024)')).toEqual({ tipo: 'ampliacion', ref: 'HubSpot (2024)' })
  })
  test('ida y vuelta', () => {
    for (const o of ['c 1 | 11-14 | Definiciones', 'c 3', 'c 2 |  | Solo sección', 'd', 'a Ref con | barra']) {
      const f = formatearOrigen(parsearOrigen(o))
      expect(parsearOrigen(f)).toEqual(parsearOrigen(o))
    }
  })
  test('un origen inválido da un error claro', () => expect(() => parsearOrigen('x 1')).toThrow('Origen inválido'))
})

describe('frontmatter', () => {
  test('metadatos de la lección', () => {
    const l = parsearLeccion(cab)
    expect(l).toMatchObject({ id: 'l9-9', unidad: 9, titulo: 'Prueba', minutos: 10, previos: ['l1-1'], claves: ['marketing'], conexiones: ['l1-2', 'l2-1'] })
    expect(l.objetivos).toEqual(['Uno', 'Dos'])
    expect(l.referencias).toEqual([{ tipo: 'cuaderno', cap: '1', pag: '10-16', sec: undefined }, { tipo: 'didactico' }])
  })
  test('sin frontmatter falla', () => expect(() => parsearLeccion('hola')).toThrow('frontmatter'))
})

describe('bloques', () => {
  test('párrafo con origen, encabezado y escape', () => {
    expect(bloques('## Tema\n\nTexto **fuerte** y [[marketing]]. {c 1 | 14}\n\n\\- no es lista {d}\n')).toEqual([
      { t: 'h', x: 'Tema' },
      { t: 'p', x: 'Texto **fuerte** y [[marketing]].', o: { tipo: 'cuaderno', cap: '1', pag: '14', sec: undefined } },
      { t: 'p', x: '- no es lista', o: { tipo: 'didactico' } },
    ])
  })
  test('un párrafo en varias líneas se une', () => expect(bloques('Primera\nsegunda {d}\n')[0]).toEqual({ t: 'p', x: 'Primera segunda', o: { tipo: 'didactico' } }))
  test('listas con viñetas y numeradas; el origen va en el último ítem', () => {
    expect(bloques('- uno\n- dos {d}\n\n1. a\n2. b\n')).toEqual([
      { t: 'lista', items: ['uno', 'dos'], o: { tipo: 'didactico' } },
      { t: 'lista', items: ['a', 'b'], num: true },
    ])
  })
  test('tabla con título y barra escapada en una celda', () => {
    expect(bloques('^ Cuadro\n| A | B |\n|---|---|\n| 1 | x \\| y |\n| 2 | z | {d}\n')[0]).toEqual({
      t: 'tabla', titulo: 'Cuadro', cab: ['A', 'B'], filas: [['1', 'x | y'], ['2', 'z']], o: { tipo: 'didactico' },
    })
  })
  test('callouts, definición y ejemplo', () => {
    expect(bloques(':::clave Un título\nCuerpo {d}\n:::\n\n:::ojo\nSin título\n:::\n\n:::def Embudo\nEtapas.\n:::\n\n:::ejemplo Caso\n1. Uno\n2. Dos {d}\n:::\n')).toEqual([
      { t: 'callout', tipo: 'clave', titulo: 'Un título', x: 'Cuerpo', o: { tipo: 'didactico' } },
      { t: 'callout', tipo: 'ojo', x: 'Sin título' },
      { t: 'def', termino: 'Embudo', x: 'Etapas.' },
      { t: 'ejemplo', titulo: 'Caso', pasos: ['Uno', 'Dos'], o: { tipo: 'didactico' } },
    ])
  })
  test('comparar necesita dos secciones', () => {
    expect(bloques(':::comparar ¿A o B?\n### A\n- a1\n### B\n- b1 {d}\n:::\n')[0]).toEqual({
      t: 'comparar', titulo: '¿A o B?', a: { titulo: 'A', items: ['a1'] }, b: { titulo: 'B', items: ['b1'] }, o: { tipo: 'didactico' },
    })
    expect(() => bloques(':::comparar\n### Solo una\n- x\n:::\n')).toThrow('dos secciones')
  })
  test('acordeón con contenedores anidados (más dos puntos afuera)', () => {
    const [a] = bloques('::::acordeon Más\nTexto {d}\n\n:::clave\nIdea {d}\n:::\n::::\n')
    expect(a).toMatchObject({ t: 'acordeon', titulo: 'Más' })
    expect((a as { bloques: unknown[] }).bloques).toHaveLength(2)
  })
  test('figura y calculadora en una línea', () => expect(bloques('::figura mix\n\n::calc embudo\n')).toEqual([{ t: 'figura', id: 'mix' }, { t: 'calc', tipo: 'embudo' }]))
  test('bloques interactivos en YAML, con origen', () => {
    const [b] = bloques('```explorable\ntitulo: Capas\nvariante: capas\nnodos:\n  - {id: a, titulo: A, resumen: r, detalle: d}\no: d\n```\n')
    expect(b).toEqual({ t: 'explorable', titulo: 'Capas', variante: 'capas', nodos: [{ id: 'a', titulo: 'A', resumen: 'r', detalle: 'd' }], o: { tipo: 'didactico' } })
  })
  test('diagrama Mermaid conserva el código y toma el origen de la línea siguiente', () => {
    expect(bloques('```mermaid Embudo simple\nflowchart LR\n  A --> B\n```\n{d}\n')[0]).toEqual({
      t: 'diagrama', titulo: 'Embudo simple', codigo: 'flowchart LR\n  A --> B', o: { tipo: 'didactico' },
    })
  })
  test('la síntesis no es un bloque: va a la lección', () => {
    const l = parsearLeccion(`${cab}Texto {d}\n\n:::sintesis\n- Uno\n- Dos\n:::\n`)
    expect(l.sintesis).toEqual(['Uno', 'Dos'])
    expect(l.bloques).toHaveLength(1)
  })
})

describe('errores con línea', () => {
  test('contenedor sin cierre', () => expect(() => bloques(':::clave\nTexto\n')).toThrow(/l9-9 \(línea \d+\): falta el cierre :::/))
  test('contenedor desconocido', () => expect(() => bloques(':::rara\nx\n:::\n')).toThrow('contenedor desconocido'))
  test('YAML inválido', () => expect(() => bloques('```asociar\ntitulo: [roto\n```\n')).toThrow('YAML inválido'))
  test('origen incompleto: {c} sin capítulo falla en vez de quedar como texto', () => expect(() => bloques('Texto {c}\n')).toThrow('Origen inválido'))
})

describe('práctica', () => {
  test('ids y tipo se infieren; opciones y tarjetas compactas', () => {
    const { preguntas, tarjetas } = parsearPractica(
      'preguntas:\n  - tema: T\n    dif: 1\n    enunciado: "¿Qué?"\n    opciones:\n      - [Sí, Porque sí]\n      - [No, Porque no]\n    correcta: 0\n    o: c 1 | 14\n  - tema: T\n    dif: 2\n    enunciado: Explicá\n    modelo: M\n    criterios:\n      - a\n      - b\ntarjetas:\n  - [Frente, Dorso]\n  - [F2, D2, l99-x]\n',
      'l9-9',
    )
    expect(preguntas[0]).toMatchObject({ id: 'l99-q1', tipo: 'mc', correcta: 0, opciones: [{ x: 'Sí', porque: 'Porque sí' }, { x: 'No', porque: 'Porque no' }], o: { tipo: 'cuaderno', cap: '1' } })
    expect(preguntas[1]).toMatchObject({ id: 'l99-q2', tipo: 'corta', modelo: 'M' })
    expect(tarjetas).toEqual([{ id: 'l99-t1', f: 'Frente', b: 'Dorso' }, { id: 'l99-x', f: 'F2', b: 'D2' }])
  })
})
