import { describe, expect, test } from 'bun:test'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** Todo archivo de public/media/ debe figurar en docs/creditos-multimedia.md (título, autor, licencia y origen). */
const raiz = new URL('..', import.meta.url).pathname
const archivos = (d: string): string[] => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? archivos(join(d, n)) : [join(d, n)]))

describe('créditos de los archivos multimedia', () => {
  const doc = readFileSync(join(raiz, 'docs/creditos-multimedia.md'), 'utf8')
  for (const f of archivos(join(raiz, 'public/media')).map((a) => a.slice(join(raiz, 'public/').length)).sort())
    test(`${f} figura en los créditos`, () => expect(doc, `Falta el crédito de public/${f}`).toContain(`public/${f}`))
})
