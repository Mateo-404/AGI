import { describe, expect, test } from 'bun:test'
import { existsSync, readFileSync } from 'node:fs'
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
})
