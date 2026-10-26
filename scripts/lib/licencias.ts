/**
 * Qué licencias se aceptan para material externo y cómo se registran los créditos.
 * Lógica pura (sin red ni archivos) para poder probarla: la usa scripts/ilustracion.ts.
 *
 * Criterio: se acepta lo que permite uso comercial y redistribución sin obligar a licenciar el sitio igual
 * (CC0, dominio público, licencias permisivas y CC BY). Quedan afuera las «igual licencia» (SA, GPL), las de uso no
 * comercial (NC), las que prohíben obras derivadas (ND) y todo lo que no declare licencia: ante la duda, no se usa.
 */

/** SPDX de iconos y código: sirven para uso comercial y redistribución. */
export const SPDX_PERMITIDOS = new Set(['CC0-1.0', 'MIT', 'ISC', 'Apache-2.0', '0BSD', 'Unlicense', 'BSD-2-Clause', 'BSD-3-Clause', 'CC-BY-4.0', 'CC-BY-3.0'])

export interface Licencia {
  /** Nombre normalizado, p. ej. «CC BY 4.0», «CC0», «Dominio público», «MIT». */
  nombre: string
  /** Se exige mencionar autoría (CC BY, y por buena práctica también MIT, Apache o BSD). */
  atribucion: boolean
}

export type Veredicto = { ok: true; licencia: Licencia } | { ok: false; motivo: string }

const rechazo = (motivo: string): Veredicto => ({ ok: false, motivo })

/** Licencia de un set de Iconify (identificador SPDX). */
export function licenciaSpdx(spdx: string | undefined): Veredicto {
  if (!spdx) return rechazo('el set no declara licencia SPDX')
  if (!SPDX_PERMITIDOS.has(spdx)) return rechazo(`licencia no aceptada: ${spdx}`)
  const libre = spdx === 'CC0-1.0' || spdx === 'Unlicense' || spdx === '0BSD'
  return { ok: true, licencia: { nombre: spdx.replace('CC0-1.0', 'CC0').replace(/^CC-BY-/, 'CC BY '), atribucion: !libre } }
}

/** Licencia de un archivo de Wikimedia Commons, a partir del texto «LicenseShortName» de su API. */
export function licenciaCommons(corta: string | undefined, restricciones?: string): Veredicto {
  const t = (corta ?? '').trim()
  if (!t) return rechazo('el archivo no declara licencia')
  if (restricciones?.trim()) return rechazo(`tiene restricciones adicionales (${restricciones.trim()}): derechos de imagen, marcas u otras`)
  if (/\b(SA|NC|ND)\b|GFDL|GPL|fair use|copyrighted|all rights|no known|unknown/i.test(t.replace(/-/g, ' '))) return rechazo(`licencia no aceptada: ${t}`)
  if (/^(CC0|CC0 1\.0|Public domain|PD\b|Dominio p)/i.test(t)) return { ok: true, licencia: { nombre: /^CC0/i.test(t) ? 'CC0' : 'Dominio público', atribucion: false } }
  const by = /^CC[ -]BY[ -](\d\.\d)(?:\b|$)/i.exec(t)
  if (by) return { ok: true, licencia: { nombre: `CC BY ${by[1]}`, atribucion: true } }
  return rechazo(`licencia no reconocida: ${t}`)
}

/** Texto de la leyenda visible bajo la imagen. */
export const credito = (autor: string, lic: Licencia, fuente: string): string =>
  [lic.atribucion || autor ? autor : '', lic.nombre, fuente].filter(Boolean).join(' · ')

/** De HTML de la API (autor con enlaces, etc.) a texto plano. */
export const textoPlano = (html: string | undefined): string =>
  (html ?? '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()

export interface EntradaCredito {
  /** Ruta bajo public/, p. ej. `media/ilustraciones/commons-123.jpg`. */
  archivo: string
  titulo: string
  autor: string
  licencia: string
  origen: string
  /** Aaaa-mm-dd. */
  fecha: string
  /** Fuente y id en esa fuente: clave para no registrar dos veces lo mismo. */
  clave: string
}

const ENCABEZADO = '## Imágenes e iconos (herramienta `bun run ilustracion`)'
const TABLA = '| Archivo | Título | Autor | Licencia | Página de origen | Verificado | Id |\n|---|---|---|---|---|---|---|'
const celda = (s: string) => s.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
export const filaCredito = (e: EntradaCredito): string =>
  `| \`public/${e.archivo}\` | ${celda(e.titulo)} | ${celda(e.autor)} | ${celda(e.licencia)} | ${e.origen} | ${e.fecha} | \`${e.clave}\` |`

/** Agrega una fila al documento de créditos, creando la sección si no existe. Idempotente: si la clave ya figura, no cambia nada. */
export function registrarCredito(doc: string, e: EntradaCredito): { doc: string; nuevo: boolean } {
  if (doc.includes(`\`${e.clave}\``)) return { doc, nuevo: false }
  const fila = filaCredito(e)
  if (!doc.includes(ENCABEZADO)) {
    const aviso = 'Cada fila la agrega la herramienta al descargar. No se editan a mano: la prueba `tests/creditos.test.ts` exige que todo archivo de `public/media/` figure acá.'
    return { doc: `${doc.trimEnd()}\n\n${ENCABEZADO}\n${aviso}\n\n${TABLA}\n${fila}\n`, nuevo: true }
  }
  // La tabla es lo último de su sección: se agrega la fila al final de ese bloque de líneas que empiezan con «|».
  const lineas = doc.split('\n')
  const ini = lineas.findIndex((l) => l === ENCABEZADO)
  let fin = lineas.findIndex((l, i) => i > ini && l.startsWith('|'))
  while (fin < lineas.length && lineas[fin]?.startsWith('|')) fin++
  lineas.splice(fin, 0, fila)
  return { doc: lineas.join('\n'), nuevo: true }
}

/** Bloque de lección listo para pegar en el `.md`. */
export function bloqueImagen(o: { archivo: string; alt: string; ancho?: number; alto?: number; credito: string; fuente: string }): string {
  const l = ['```imagen', `archivo: ${o.archivo}`, `alt: ${JSON.stringify(o.alt)}`]
  if (o.ancho && o.alto) l.push(`ancho: ${o.ancho}`, `alto: ${o.alto}`)
  l.push(`credito: ${JSON.stringify(o.credito)}`, `fuente: ${o.fuente}`, 'o: d', '```')
  return l.join('\n')
}

/** Nombre de archivo seguro y estable. */
export const nombreArchivo = (fuente: string, id: string, ext: string): string =>
  `${fuente}-${id.replace(/^(File|Archivo):/i, '').replace(/\.[a-z0-9]+$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)}.${ext.replace(/^\./, '').toLowerCase()}`
