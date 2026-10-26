import { describe, expect, test } from 'bun:test'
import { bloqueImagen, credito, filaCredito, licenciaCommons, licenciaSpdx, nombreArchivo, registrarCredito, textoPlano, type EntradaCredito } from '../scripts/lib/licencias'

describe('licencias de Iconify (SPDX)', () => {
  test('acepta las permisivas y CC BY', () => {
    for (const s of ['MIT', 'Apache-2.0', 'ISC', 'CC0-1.0', 'CC-BY-4.0', 'BSD-3-Clause']) expect(licenciaSpdx(s).ok).toBe(true)
  })
  test('rechaza igual-licencia, no comercial, copyleft y lo desconocido', () => {
    for (const s of ['CC-BY-SA-4.0', 'CC-BY-NC-4.0', 'CC-BY-ND-4.0', 'GPL-3.0', 'GPL-2.0-only', 'LGPL-3.0', 'MPL-2.0', 'OFL-1.1', undefined]) expect(licenciaSpdx(s).ok).toBe(false)
  })
  test('CC0 no exige atribución; MIT y CC BY sí', () => {
    expect(licenciaSpdx('CC0-1.0')).toEqual({ ok: true, licencia: { nombre: 'CC0', atribucion: false } })
    expect(licenciaSpdx('CC-BY-4.0')).toEqual({ ok: true, licencia: { nombre: 'CC BY 4.0', atribucion: true } })
    expect(licenciaSpdx('MIT')).toMatchObject({ ok: true, licencia: { atribucion: true } })
  })
})

describe('licencias de Wikimedia Commons', () => {
  test('acepta CC0, dominio público y CC BY', () => {
    expect(licenciaCommons('CC0')).toMatchObject({ ok: true, licencia: { nombre: 'CC0', atribucion: false } })
    expect(licenciaCommons('Public domain')).toMatchObject({ ok: true, licencia: { nombre: 'Dominio público' } })
    expect(licenciaCommons('PD-old-100')).toMatchObject({ ok: true })
    expect(licenciaCommons('CC BY 4.0')).toMatchObject({ ok: true, licencia: { nombre: 'CC BY 4.0', atribucion: true } })
    expect(licenciaCommons('CC BY 2.0')).toMatchObject({ ok: true, licencia: { nombre: 'CC BY 2.0' } })
  })
  test('rechaza SA, NC, ND, GFDL y lo sin licencia', () => {
    for (const s of ['CC BY-SA 4.0', 'CC BY-NC 4.0', 'CC BY-ND 2.0', 'CC BY-NC-SA 3.0', 'GFDL', 'GPL', 'Fair use', '', undefined]) expect(licenciaCommons(s).ok).toBe(false)
  })
  test('una restricción adicional (derechos de imagen, marcas) la descarta aunque la licencia sirva', () => {
    expect(licenciaCommons('CC BY 4.0', 'personality')).toMatchObject({ ok: false })
    expect(licenciaCommons('CC BY 4.0', '  ')).toMatchObject({ ok: true })
  })
  test('una licencia que no reconoce no se usa', () => expect(licenciaCommons('Licencia rara 1.0')).toMatchObject({ ok: false }))
})

describe('créditos', () => {
  const e: EntradaCredito = { archivo: 'media/iconos/iconify-lucide-funnel.svg', titulo: 'Lucide: funnel', autor: 'Lucide', licencia: 'ISC', origen: 'https://x.test/a', fecha: '2026-10-26', clave: 'iconify:lucide:funnel' }
  const base = '# Créditos\n\n## Iconos\n- algo\n'
  test('crea la sección la primera vez y agrega filas después', () => {
    const a = registrarCredito(base, e)
    expect(a.nuevo).toBe(true)
    expect(a.doc).toContain('## Imágenes e iconos')
    expect(a.doc).toContain('`public/media/iconos/iconify-lucide-funnel.svg`')
    const b = registrarCredito(a.doc, { ...e, archivo: 'media/ilustraciones/commons-x.svg', clave: 'commons:File:X.svg' })
    expect(b.nuevo).toBe(true)
    const filas = b.doc.split('\n').filter((l) => l.startsWith('| `public/'))
    expect(filas).toHaveLength(2)
  })
  test('es idempotente: la misma clave no se registra dos veces', () => {
    const a = registrarCredito(base, e).doc
    expect(registrarCredito(a, e)).toEqual({ doc: a, nuevo: false })
  })
  test('una barra en un título no rompe la tabla', () => expect(filaCredito({ ...e, titulo: 'A | B' }).split(' | ').length).toBe(filaCredito(e).split(' | ').length + 0))
  test('la leyenda lleva autor, licencia y fuente', () => expect(credito('Ana', { nombre: 'CC BY 4.0', atribucion: true }, 'Wikimedia Commons')).toBe('Ana · CC BY 4.0 · Wikimedia Commons'))
  test('el bloque generado es un fence imagen con origen didáctico', () => {
    const b = bloqueImagen({ archivo: 'media/x.svg', alt: 'Un "embudo"', ancho: 10, alto: 20, credito: 'A · MIT · Iconify', fuente: 'https://x.test' })
    expect(b.startsWith('```imagen\n')).toBe(true)
    expect(b).toContain('alt: "Un \\"embudo\\""')
    expect(b).toContain('ancho: 10')
    expect(b.endsWith('```')).toBe(true)
  })
})

describe('utilidades', () => {
  test('texto plano de HTML de autoría', () => expect(textoPlano('<a href="x">Ana &amp; Luis</a>  <br/> 2020')).toBe('Ana & Luis 2020'))
  test('nombre de archivo estable y seguro', () => {
    expect(nombreArchivo('commons', 'File:Sales Funnel (v2).SVG', 'svg')).toBe('commons-sales-funnel-v2.svg')
    expect(nombreArchivo('iconify', 'lucide-funnel', '.svg')).toBe('iconify-lucide-funnel.svg')
  })
})
