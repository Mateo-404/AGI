import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ejecutar, ErrorHerramienta } from '../scripts/ilustracion'

/** La herramienta con servicios simulados: ninguna prueba toca la red ni el repositorio real. */
const realFetch = globalThis.fetch
let raiz: string
let pedidos: string[]

const ok = (cuerpo: unknown, tipo = 'application/json') => new Response(cuerpo instanceof Uint8Array ? new Blob([cuerpo as BlobPart]) : typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo), { status: 200, headers: { 'content-type': tipo } })
type Respuesta = Response | (() => Response)
/** Responde según un fragmento de la URL; la primera regla que coincida gana. */
function servidor(reglas: [string, Respuesta][]) {
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url)
    pedidos.push(u)
    for (const [frag, r] of reglas) if (u.includes(frag)) return typeof r === 'function' ? r() : r.clone()
    return new Response('no simulado', { status: 404 })
  }) as typeof fetch
}

const sets = {
  mdi: { name: 'Material Design Icons', license: { spdx: 'Apache-2.0', url: 'https://x/mdi' }, author: { name: 'Pictogrammers' } },
  openmoji: { name: 'OpenMoji', license: { spdx: 'CC-BY-SA-4.0' }, author: { name: 'OpenMoji' } },
  sinlicencia: { name: 'Sin licencia', author: { name: 'X' } },
}
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>'

const pagina = (titulo: string, mime: string, licencia: string | undefined, extra: Record<string, unknown> = {}, restricciones?: string) => ({
  title: titulo,
  imageinfo: [{
    url: `https://upload.test/${titulo}`, width: 800, height: 600, mime, descriptionurl: `https://commons.test/wiki/${titulo}`,
    extmetadata: {
      ...(licencia ? { LicenseShortName: { value: licencia } } : {}), Artist: { value: '<a href="x">Ana &amp; Luis</a>' }, ObjectName: { value: 'Un embudo' },
      ...(restricciones ? { Restrictions: { value: restricciones } } : {}),
    },
    ...extra,
  }],
})

const doc = () => readFileSync(join(raiz, 'docs/creditos-multimedia.md'), 'utf8')
const correr = (...a: string[]) => ejecutar(a, { raiz, hoy: '2026-10-26', espera: async () => {} })

beforeEach(() => {
  raiz = mkdtempSync(join(tmpdir(), 'ilustracion-'))
  mkdirSync(join(raiz, 'docs'), { recursive: true })
  writeFileSync(join(raiz, 'docs/creditos-multimedia.md'), '# Créditos multimedia\n')
  pedidos = []
})
afterEach(() => { globalThis.fetch = realFetch })

describe('iconos (Iconify)', () => {
  test('la búsqueda descarta los sets sin licencia aceptada y los cuenta', async () => {
    servidor([['/search', ok({ icons: ['mdi:funnel', 'openmoji:funnel', 'sinlicencia:x', 'mdi:funnel-outline', 'mdi:funnel-x'] })], ['/collections', ok(sets)]])
    const out = await correr('icono', 'funnel')
    expect(out).toContain('mdi:funnel')
    expect(out).toContain('Apache-2.0')
    expect(out).not.toContain('openmoji')
    expect(out).toContain('2 resultado(s) descartado(s)')
    expect(out.match(/^mdi:/gm)).toHaveLength(2) // como mucho 2 por set
  })
  test('descargar guarda el SVG, registra el crédito y da el bloque para pegar', async () => {
    servidor([['/collections', ok(sets)], ['/mdi/funnel.svg', ok(SVG, 'image/svg+xml')]])
    const out = await correr('descargar', 'icono', 'mdi:funnel', '--alt', 'Un embudo')
    expect(readFileSync(join(raiz, 'public/media/iconos/iconify-mdi-funnel.svg'), 'utf8')).toBe(SVG)
    expect(doc()).toContain('`public/media/iconos/iconify-mdi-funnel.svg`')
    expect(doc()).toContain('`iconify:mdi:funnel`')
    expect(doc()).toContain('2026-10-26')
    expect(out).toContain('```imagen')
    expect(out).toContain('archivo: media/iconos/iconify-mdi-funnel.svg')
    expect(out).toContain('alt: "Un embudo"')
    expect(out).toContain('ancho: 24')
    expect(out).toContain('Pictogrammers (Material Design Icons) · Apache-2.0 · Iconify')
  })
  test('descargar dos veces no duplica el crédito', async () => {
    servidor([['/collections', ok(sets)], ['/mdi/funnel.svg', ok(SVG, 'image/svg+xml')]])
    await correr('descargar', 'icono', 'mdi:funnel', '--alt', 'a')
    const out = await correr('descargar', 'icono', 'mdi:funnel', '--alt', 'a')
    expect(out).toContain('El crédito ya estaba registrado')
    expect(doc().match(/`iconify:mdi:funnel`/g)).toHaveLength(1)
  })
  test('una licencia no aceptada se rechaza y no escribe nada', async () => {
    servidor([['/collections', ok(sets)], ['.svg', ok(SVG, 'image/svg+xml')]])
    const antes = doc()
    await expect(correr('descargar', 'icono', 'openmoji:grinning', '--alt', 'a')).rejects.toThrow('CC-BY-SA-4.0')
    await expect(correr('descargar', 'icono', 'sinlicencia:x', '--alt', 'a')).rejects.toThrow('no declara licencia')
    expect(existsSync(join(raiz, 'public'))).toBe(false)
    expect(doc()).toBe(antes)
    expect(pedidos.some((p) => p.endsWith('.svg'))).toBe(false) // ni siquiera se pidió el archivo
  })
  test('un set inexistente da un error claro', async () => {
    servidor([['/collections', ok({})]])
    await expect(correr('descargar', 'icono', 'nada:x', '--alt', 'a')).rejects.toThrow('No existe el set')
  })
})

describe('imágenes (Wikimedia Commons)', () => {
  test('la búsqueda muestra solo licencias aceptadas', async () => {
    servidor([['commons.wikimedia.org', ok({ query: { pages: [
      pagina('File:Bueno.svg', 'image/svg+xml', 'CC0'),
      pagina('File:Share.png', 'image/png', 'CC BY-SA 4.0'),
      pagina('File:Sin.png', 'image/png', undefined),
      pagina('File:Restringido.jpg', 'image/jpeg', 'CC BY 4.0', {}, 'trademarked'),
      pagina('File:Video.ogv', 'video/ogg', 'CC0'),
      pagina('File:Por.jpg', 'image/jpeg', 'CC BY 4.0'),
    ] } })]])
    const out = await correr('imagen', 'funnel')
    expect(out).toContain('File:Bueno.svg')
    expect(out).toContain('File:Por.jpg')
    for (const malo of ['Share.png', 'Sin.png', 'Restringido.jpg', 'Video.ogv']) expect(out).not.toContain(malo)
    expect(out).toContain('4 resultado(s) descartado(s)')
  })
  test('un SVG se baja original', async () => {
    servidor([['commons.wikimedia.org', ok({ query: { pages: [pagina('File:Sales Funnel.svg', 'image/svg+xml', 'CC0')] } })], ['upload.test', ok(SVG, 'image/svg+xml')]])
    const out = await correr('descargar', 'imagen', 'File:Sales Funnel.svg', '--alt', 'Embudo de ventas')
    expect(readFileSync(join(raiz, 'public/media/ilustraciones/commons-sales-funnel.svg'), 'utf8')).toBe(SVG)
    expect(pedidos.at(-1)).toBe('https://upload.test/File:Sales Funnel.svg')
    expect(doc()).toContain('`commons:File:Sales Funnel.svg`')
    expect(doc()).toContain('Ana & Luis')
    expect(out).toContain('ancho: 800')
    expect(out).toContain('credito: "Ana & Luis · CC0 · Wikimedia Commons"')
    expect(out).toContain('fuente: https://commons.test/wiki/File:Sales Funnel.svg')
  })
  test('una imagen de trama se baja reducida (miniatura) con su tamaño real', async () => {
    servidor([['commons.wikimedia.org', ok({ query: { pages: [pagina('File:Foto.png', 'image/png', 'CC BY 4.0', { thumburl: 'https://thumb.test/960px-Foto.png', thumbwidth: 960, thumbheight: 720, width: 4000, height: 3000 })] } })], ['thumb.test', ok(new Uint8Array([137, 80, 78, 71]), 'image/png')]])
    const out = await correr('descargar', 'imagen', 'Foto.png', '--alt', 'Foto')
    expect(existsSync(join(raiz, 'public/media/ilustraciones/commons-foto.png'))).toBe(true)
    expect(pedidos.at(-1)).toBe('https://thumb.test/960px-Foto.png')
    expect(out).toContain('ancho: 960')
    expect(out).toContain('alto: 720')
    expect(out).toContain('CC BY 4.0')
  })
  test('una licencia no aceptada se rechaza antes de bajar el archivo', async () => {
    servidor([['commons.wikimedia.org', ok({ query: { pages: [pagina('File:Share.png', 'image/png', 'CC BY-SA 4.0')] } })], ['upload.test', ok('x')]])
    const antes = doc()
    await expect(correr('descargar', 'imagen', 'File:Share.png', '--alt', 'a')).rejects.toThrow('CC BY-SA 4.0')
    expect(existsSync(join(raiz, 'public'))).toBe(false)
    expect(doc()).toBe(antes)
    expect(pedidos.every((p) => p.includes('commons.wikimedia.org'))).toBe(true)
  })
  test('un archivo inexistente da un error claro', async () => {
    servidor([['commons.wikimedia.org', ok({ query: { pages: [{ title: 'File:No.png', missing: true }] } })]])
    await expect(correr('descargar', 'imagen', 'File:No.png', '--alt', 'a')).rejects.toThrow('No se encontró')
  })
})

describe('red y uso', () => {
  test('ante un 429 espera y reintenta hasta que responde', async () => {
    let n = 0
    const esperas: number[] = []
    servidor([['/collections', () => (++n < 3 ? new Response('límite', { status: 429, headers: { 'retry-after': '7' } }) : ok(sets))], ['/mdi/funnel.svg', ok(SVG, 'image/svg+xml')]])
    await ejecutar(['descargar', 'icono', 'mdi:funnel', '--alt', 'a'], { raiz, espera: async (s) => { esperas.push(s) } })
    expect(n).toBe(3)
    expect(esperas).toEqual([7, 7])
    expect(existsSync(join(raiz, 'public/media/iconos/iconify-mdi-funnel.svg'))).toBe(true)
  })
  test('si el límite no cede, falla sin guardar ni registrar nada', async () => {
    servidor([['/collections', ok(sets)], ['/mdi/funnel.svg', new Response('límite', { status: 429 })]])
    const antes = doc()
    await expect(correr('descargar', 'icono', 'mdi:funnel', '--alt', 'a')).rejects.toThrow('Error 429')
    expect(existsSync(join(raiz, 'public'))).toBe(false)
    expect(doc()).toBe(antes) // sin crédito huérfano
  })
  test('toda imagen lleva texto alternativo', async () => {
    servidor([['/collections', ok(sets)], ['/mdi/funnel.svg', ok(SVG, 'image/svg+xml')]])
    await expect(correr('descargar', 'icono', 'mdi:funnel')).rejects.toThrow('--alt')
    await expect(correr('descargar', 'icono', 'mdi:funnel', '--alt')).rejects.toThrow('--alt')
    expect(existsSync(join(raiz, 'public'))).toBe(false)
  })
  test('una orden desconocida muestra cómo se usa', async () => {
    const e = await correr('bailar').catch((x) => x)
    expect(e).toBeInstanceOf(ErrorHerramienta)
    expect(String(e.message)).toContain('Uso:')
  })
})
