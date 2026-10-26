/**
 * Búsqueda y descarga de iconos e imágenes con licencia verificada, para las IAs y para quien escriba apuntes.
 * Fuentes: Iconify (iconos; cada set declara su licencia SPDX) y Wikimedia Commons (imágenes; la API informa licencia y autoría).
 * unDraw está excluida a propósito: su licencia prohíbe la descarga automatizada y el uso con IA.
 *
 *   bun run ilustracion icono <consulta en inglés> [--set mdi,lucide] [--limite 12]
 *   bun run ilustracion imagen <consulta en inglés> [--limite 8]
 *   bun run ilustracion descargar icono <prefijo:nombre> --alt "Texto alternativo"
 *   bun run ilustracion descargar imagen "File:Nombre.svg" --alt "Texto alternativo"
 *
 * Buscar no descarga nada. Descargar vuelve a pedir la licencia a la API, rechaza lo que no esté en la lista aceptada
 * (ver scripts/lib/licencias.ts), guarda el archivo en public/media/ y registra el crédito en docs/creditos-multimedia.md.
 * Al final imprime el bloque ```imagen listo para pegar en el .md de la lección.
 * Si falla algo (licencia, red, límite de pedidos) no guarda ni registra nada.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { bloqueImagen, credito, licenciaCommons, licenciaSpdx, nombreArchivo, registrarCredito, textoPlano, type EntradaCredito } from './lib/licencias'

const UA = 'SomosAGI-ilustraciones/1.0 (proyecto personal de estudio; https://github.com/Mateo-404/AGI)'

/** Error esperable (licencia rechazada, archivo inexistente, falta un dato): se informa sin traza. */
export class ErrorHerramienta extends Error {}
const salir = (msg: string): never => { throw new ErrorHerramienta(msg) }

interface Sesion { raiz: string; doc: string; texto: string[]; imprimir: boolean; hoy: string; espera: (seg: number) => Promise<void> }
let s: Sesion

const decir = (m = ''): void => { s.texto.push(m); if (s.imprimir) console.log(m) }

/** Pide una URL; si el servicio limita los pedidos (429) o está ocupado (503) espera y reintenta, respetando Retry-After. */
async function pedir(url: string): Promise<Response> {
  for (let intento = 1; ; intento++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' } })
    if (r.ok) return r
    if ((r.status === 429 || r.status === 503) && intento < 5) {
      const espera = Math.min(30, Number(r.headers.get('retry-after')) || 2 ** intento)
      console.warn(`El servicio pidió esperar (${r.status}); reintento ${intento}/4 en ${espera} s…`)
      await s.espera(espera)
      continue
    }
    return salir(`Error ${r.status} al pedir ${url.slice(0, 120)}`)
  }
}
const json = async <T>(url: string): Promise<T> => (await pedir(url)).json() as Promise<T>

// ---------------------------------------------------------------- Iconify
interface SetIconify { name: string; license?: { title?: string; spdx?: string; url?: string }; author?: { name?: string; url?: string }; palette?: boolean }

const setsDe = (prefijos: string[]) => json<Record<string, SetIconify>>(`https://api.iconify.design/collections?prefixes=${[...new Set(prefijos)].join(',')}`)

async function buscarIconos(consulta: string, limite: number, sets?: string) {
  const q = new URLSearchParams({ query: consulta, limit: String(Math.max(32, limite * 6)) })
  if (sets) q.set('prefixes', sets)
  const { icons } = await json<{ icons: string[] }>(`https://api.iconify.design/search?${q}`)
  const info = icons.length ? await setsDe(icons.map((i) => i.split(':')[0]!)) : {}
  const filas: string[] = []
  const porSet = new Map<string, number>()
  let descartados = 0
  for (const id of icons) {
    const prefijo = id.split(':')[0]!
    const set = info[prefijo]
    const v = licenciaSpdx(set?.license?.spdx)
    if (!v.ok) { descartados++; continue }
    // Como mucho 2 por set, para que los resultados sean variados.
    if ((porSet.get(prefijo) ?? 0) >= 2) continue
    porSet.set(prefijo, (porSet.get(prefijo) ?? 0) + 1)
    filas.push(`${id.padEnd(34)} ${set!.name.slice(0, 26).padEnd(27)} ${v.licencia.nombre.padEnd(11)} ${set!.author?.name ?? ''}`)
    if (filas.length >= limite) break
  }
  decir(filas.length ? filas.join('\n') : 'Sin resultados con licencia aceptada (la búsqueda es en inglés).')
  decir(`\n${descartados} resultado(s) descartado(s) por licencia. Para usar uno: bun run ilustracion descargar icono <prefijo:nombre> --alt "..."`)
}

async function descargarIcono(id: string, alt: string) {
  const [prefijo, nombre] = id.split(':')
  if (!prefijo || !nombre) salir('El icono se indica como prefijo:nombre, p. ej. lucide:funnel')
  const set = (await setsDe([prefijo!]))[prefijo!]
  if (!set) return salir(`No existe el set «${prefijo}» en Iconify`)
  const v = licenciaSpdx(set.license?.spdx)
  if (!v.ok) return salir(`Rechazado: ${v.motivo} (${set.name})`)
  if (set.palette) console.warn('Aviso: el icono trae colores propios; puede no combinar con el tema oscuro.')
  const svg = await (await pedir(`https://api.iconify.design/${prefijo}/${nombre}.svg`)).text()
  if (!svg.trimStart().startsWith('<svg')) salir('Iconify no devolvió un SVG')
  const archivo = `media/iconos/${nombreArchivo('iconify', `${prefijo}-${nombre}`, 'svg')}`
  const autor = set.author?.name ?? set.name
  const fuente = `https://icon-sets.iconify.design/${prefijo}/${nombre}/`
  const m = /viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) ([\d.]+)"/.exec(svg)
  registrar(archivo, svg, { titulo: `${set.name}: ${nombre}`, autor, licencia: `${v.licencia.nombre} (${set.license?.url ?? 'ver set'})`, origen: fuente, clave: `iconify:${prefijo}:${nombre}` })
  mostrar({ archivo, alt, ancho: m ? Math.round(Number(m[1])) : undefined, alto: m ? Math.round(Number(m[2])) : undefined, credito: credito(`${autor} (${set.name})`, v.licencia, 'Iconify'), fuente })
}

// ---------------------------------------------------------------- Wikimedia Commons
interface PaginaCommons {
  title: string
  imageinfo?: { url: string; thumburl?: string; width: number; height: number; thumbwidth?: number; thumbheight?: number; mime: string; descriptionurl: string; extmetadata?: Record<string, { value: string }> }[]
}

const consultaCommons = (extra: Record<string, string>) =>
  `https://commons.wikimedia.org/w/api.php?${new URLSearchParams({
    action: 'query', format: 'json', formatversion: '2', prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '960',
    iiextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|ObjectName|Restrictions|AttributionRequired', ...extra,
  })}`

const MIME_OK = new Set(['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'])

function evaluar(p: PaginaCommons) {
  const ii = p.imageinfo?.[0]
  if (!ii) return { ok: false as const, motivo: 'sin datos del archivo' }
  if (!MIME_OK.has(ii.mime)) return { ok: false as const, motivo: `formato no aceptado: ${ii.mime}` }
  const m = ii.extmetadata ?? {}
  const v = licenciaCommons(m.LicenseShortName?.value, m.Restrictions?.value)
  if (!v.ok) return v
  return { ok: true as const, ii, licencia: v.licencia, autor: textoPlano(m.Artist?.value) || 'Autoría no informada', titulo: textoPlano(m.ObjectName?.value) || p.title.replace(/^File:/, '') }
}

async function buscarImagenes(consulta: string, limite: number) {
  const r = await json<{ query?: { pages?: PaginaCommons[] } }>(consultaCommons({ generator: 'search', gsrsearch: `${consulta} filetype:bitmap|drawing`, gsrnamespace: '6', gsrlimit: String(Math.min(50, limite * 5)) }))
  const filas: string[] = []
  let descartadas = 0
  for (const p of r.query?.pages ?? []) {
    const e = evaluar(p)
    if (!e.ok) { descartadas++; continue }
    filas.push(`${p.title.padEnd(52).slice(0, 52)} ${e.licencia.nombre.padEnd(14)} ${e.ii.width}×${e.ii.height}  ${e.autor.slice(0, 30)}`)
    if (filas.length >= limite) break
  }
  decir(filas.length ? filas.join('\n') : 'Sin resultados con licencia aceptada (la búsqueda es en inglés).')
  decir(`\n${descartadas} resultado(s) descartado(s) por licencia o formato. Para usar uno: bun run ilustracion descargar imagen "File:Nombre.svg" --alt "..."`)
}

async function descargarImagen(titulo: string, alt: string) {
  const t = /^File:/i.test(titulo) ? titulo : `File:${titulo}`
  const r = await json<{ query?: { pages?: PaginaCommons[] } }>(consultaCommons({ titles: t }))
  const p = r.query?.pages?.[0]
  if (!p || !p.imageinfo) return salir(`No se encontró «${t}» en Wikimedia Commons`)
  const e = evaluar(p)
  if (!e.ok) return salir(`Rechazado: ${e.motivo}`)
  const vector = e.ii.mime === 'image/svg+xml'
  // Las imágenes de trama se bajan ya reducidas (≤ 960 px): pesan mucho menos que el original.
  const url = vector ? e.ii.url : e.ii.thumburl ?? e.ii.url
  const ext = vector ? 'svg' : e.ii.mime === 'image/png' ? 'png' : e.ii.mime === 'image/webp' ? 'webp' : 'jpg'
  const datos = Buffer.from(await (await pedir(url)).arrayBuffer())
  const archivo = `media/ilustraciones/${nombreArchivo('commons', t, ext)}`
  registrar(archivo, datos, { titulo: e.titulo, autor: e.autor, licencia: e.licencia.nombre, origen: e.ii.descriptionurl, clave: `commons:${t}` })
  mostrar({ archivo, alt, ancho: vector ? e.ii.width : e.ii.thumbwidth ?? e.ii.width, alto: vector ? e.ii.height : e.ii.thumbheight ?? e.ii.height, credito: credito(e.autor, e.licencia, 'Wikimedia Commons'), fuente: e.ii.descriptionurl })
}

// ---------------------------------------------------------------- salida
/** Guarda el archivo y anota el crédito juntos: si algo falló antes, no queda ninguno de los dos. */
function registrar(archivo: string, datos: string | Buffer, c: Omit<EntradaCredito, 'archivo' | 'fecha'>) {
  const { doc, nuevo } = registrarCredito(readFileSync(s.doc, 'utf8'), { ...c, archivo, fecha: s.hoy })
  const destino = join(s.raiz, 'public', archivo)
  mkdirSync(join(destino, '..'), { recursive: true })
  writeFileSync(destino, datos)
  decir(`Guardado: public/${archivo} (${Buffer.byteLength(datos)} bytes)`)
  if (nuevo) { writeFileSync(s.doc, doc); decir('Crédito registrado en docs/creditos-multimedia.md') } else decir('El crédito ya estaba registrado.')
}

function mostrar(o: Parameters<typeof bloqueImagen>[0]) {
  decir('\nPegá esto en el .md de la lección (revisá el texto alternativo: describe la imagen, no repite el título):\n')
  decir(bloqueImagen(o))
}

const USO = 'Uso:\n  bun run ilustracion icono <consulta en inglés> [--set mdi,lucide] [--limite 12]\n  bun run ilustracion imagen <consulta en inglés> [--limite 8]\n  bun run ilustracion descargar icono <prefijo:nombre> --alt "..."\n  bun run ilustracion descargar imagen "File:Nombre.svg" --alt "..."'

export interface Opciones { raiz?: string; imprimir?: boolean; hoy?: string; espera?: (seg: number) => Promise<void> }

/** Ejecuta una orden de la herramienta y devuelve lo que imprimió. Lanza ErrorHerramienta si algo no se puede (licencia, uso, red). */
export async function ejecutar(argv: string[], { raiz = new URL('..', import.meta.url).pathname, imprimir = false, hoy = new Date().toISOString().slice(0, 10), espera = (seg) => new Promise((ok) => setTimeout(ok, seg * 1000)) }: Opciones = {}): Promise<string> {
  s = { raiz, doc: join(raiz, 'docs/creditos-multimedia.md'), texto: [], imprimir, hoy, espera }
  const [orden, ...resto] = argv
  const banderas = new Map<string, string>()
  const pos: string[] = []
  for (let i = 0; i < resto.length; i++) {
    const a = resto[i]!
    if (a.startsWith('--')) banderas.set(a.slice(2), resto[i + 1] === undefined || resto[i + 1]!.startsWith('--') ? 'true' : resto[++i]!)
    else pos.push(a)
  }
  if (!existsSync(s.doc)) salir('No encuentro docs/creditos-multimedia.md')
  const limite = Number(banderas.get('limite') ?? 10)
  const alt = (): string => { const v = banderas.get('alt'); return v && v !== 'true' ? v : salir('Falta --alt "Texto alternativo": toda imagen lo lleva.') }
  if (orden === 'icono' && pos[0]) await buscarIconos(pos.join(' '), limite, banderas.get('set'))
  else if (orden === 'imagen' && pos[0]) await buscarImagenes(pos.join(' '), limite)
  else if (orden === 'descargar' && pos[0] === 'icono' && pos[1]) await descargarIcono(pos[1], alt())
  else if (orden === 'descargar' && pos[0] === 'imagen' && pos[1]) await descargarImagen(pos.slice(1).join(' '), alt())
  else salir(USO)
  return s.texto.join('\n')
}

if (import.meta.main) {
  try {
    await ejecutar(process.argv.slice(2), { imprimir: true })
  } catch (e) {
    if (!(e instanceof ErrorHerramienta)) throw e
    console.error(e.message)
    process.exit(1)
  }
}
