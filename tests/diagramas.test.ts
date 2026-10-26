import { describe, expect, test } from 'bun:test'
import { existsSync, readFileSync } from 'node:fs'
import { problemaDiagrama } from '../contenido/validar'
import { claveDiagrama, codigosMermaid, tematizar } from '../src/logica/diagramas-build'

describe('diagramas Mermaid', () => {
  test('los colores de Mermaid pasan a variables del tema', () => {
    const { svg, desconocidos } = tematizar('<rect fill="#010001" stroke="#010003"/><style>.t{fill:#010002;stroke:#999}</style>')
    expect(svg).toContain('fill="var(--mm-nodo)"')
    expect(svg).toContain('stroke="var(--mm-borde)"')
    expect(svg).toContain('fill:var(--mm-texto)')
    expect(desconocidos).toEqual([])
  })
  test('un color que no conoce queda igual y se informa', () => {
    const { svg, desconocidos } = tematizar('<rect fill="#abcdef"/>')
    expect(svg).toContain('#abcdef')
    expect(desconocidos).toEqual(['#abcdef'])
  })
  test('la clave depende del código: otro código, otro archivo', () => {
    expect(claveDiagrama('flowchart LR\n A-->B')).toBe(claveDiagrama('flowchart LR\n A-->B'))
    expect(claveDiagrama('flowchart LR\n A-->B')).not.toBe(claveDiagrama('flowchart LR\n A-->C'))
  })
  /** Si cambia un diagrama sin volver a dibujarlo, el CI no tiene Chromium y el build falla: mejor que falle acá y con instrucciones. */
  test('todo diagrama del curso tiene su SVG dibujado y sin colores sueltos', () => {
    const codigos = codigosMermaid()
    expect(codigos.length).toBeGreaterThan(0)
    for (const c of codigos) {
      const f = new URL(`../contenido/marketing/diagramas/${claveDiagrama(c)}.svg`, import.meta.url)
      expect(existsSync(f), `falta el SVG de un diagrama: corré bun run diagramas\n${c.slice(0, 80)}`).toBe(true)
      expect(readFileSync(f, 'utf8')).not.toMatch(/#[0-9a-fA-F]{3,6}\b/)
    }
  })

  describe('reglas del verificador', () => {
    test('admite los tipos que se ven bien en claro y oscuro', () => {
      for (const c of ['flowchart TB\n A-->B', 'graph LR\n A-->B', 'sequenceDiagram\n A->>B: hola', 'stateDiagram-v2\n [*] --> A', 'classDiagram\n class A', 'erDiagram\n A ||--o{ B : x', '%% comentario\nflowchart TB\n A-->B'])
        expect(problemaDiagrama(c)).toBeUndefined()
    })
    test('rechaza los tipos que salen negros o con colores fijos', () => {
      for (const c of ['pie title X\n "a": 1', 'timeline\n 1 : a', 'mindmap\n root', 'gantt\n title x', 'journey\n title x', 'quadrantChart\n x-axis a --> b', 'xychart-beta\n bar [1]', ''])
        expect(problemaDiagrama(c)).toContain('no admitido')
    })
    test('rechaza colores propios y directivas de configuración', () => {
      expect(problemaDiagrama('flowchart TB\n A:::r --> B\n classDef r fill:#f00')).toContain('classDef')
      expect(problemaDiagrama('flowchart TB\n A-->B\n style A fill:#f00')).toContain('style')
      expect(problemaDiagrama('flowchart TB\n A-->B\n linkStyle 0 stroke:red')).toContain('linkStyle')
      expect(problemaDiagrama('%%{init: {"theme":"dark"}}%%\nflowchart TB\n A-->B')).toContain('%%{')
    })
    test('un diagrama de clases no se confunde con classDef', () => expect(problemaDiagrama('classDiagram\n class Cliente\n class Pedido')).toBeUndefined())
  })
})
