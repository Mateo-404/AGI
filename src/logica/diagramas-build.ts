import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Bloque } from '@contenido/tipos'
import { parsearLeccion } from './mdLeccion'
import { svgs } from './diagramas'

/** Hash SHA1 de versión+código, usado para nombres de archivo únicos. */
export const claveDiagrama = (codigo: string): string => createHash('sha1').update(`${VERSION}\n${codigo}`).digest('hex').slice(0, 16)

const VERSION = 'v1'

/** Colores marcadores que se le pasan a Mermaid y a qué variable CSS equivalen. Los que Mermaid deriva por su cuenta también se mapean. */
const MARCADORES: Record<string, string> = {
  '#010001': 'nodo', '#010002': 'texto', '#010003': 'borde', '#010004': 'linea', '#010005': 'sec', '#010006': 'terc', '#010007': 'fondo',
  '#fefff8': 'fondo', '#fefff9': 'fondo', '#fefffb': 'fondo', '#000': 'texto', '#000000': 'texto', '#333': 'texto',
  '#666': 'linea', '#999': 'borde', '#eaeaea': 'sec', '#fff5ad': 'nota', '#fff': 'fondo', '#ffffff': 'fondo',
  '#edf2ae': 'nota', '#e0e0e0': 'sec', '#efefef': 'sec',
}

/** Temas de Mermaid variables CSS. */
const TEMA = {
  primaryColor: '#010001', primaryTextColor: '#010002', primaryBorderColor: '#010003', lineColor: '#010004',
  secondaryColor: '#010005', tertiaryColor: '#010006', background: '#010007', mainBkg: '#010001', nodeBorder: '#010003',
  textColor: '#010002', edgeLabelBackground: '#010007', clusterBkg: '#010005', clusterBorder: '#010003', titleColor: '#010002',
  fontFamily: '"Roboto Flex Variable", "Roboto Flex", Arial, sans-serif', fontSize: '15px',
}

/** Carpeta donde se guardan los SVG de los diagramas (compartidos por todas las materias). */
const carpeta = join(process.cwd(), 'contenido/marketing/diagramas')

/** Rutas base de cada materia: contenido/<slug>/lecciones */
const RUTAS_MATERIAS = [
  'marketing',
  'administracion-procesos',
  'calculo-costos',
  'gestion-ventas',
  'ingenieria-software',
  'ingles-1',
  'introduccion-comunicaciones',
  'paradigmas-programacion',
  'universidad-sociedad-conocimientos',
] as const

/** Todas las rutas de lecciones de todas las materias. */
const RUTAS_LECCIONES = RUTAS_MATERIAS.map(slug => join(process.cwd(), 'contenido', slug, 'lecciones'))

/** Obtiene todos los códigos Mermaid de todas las lecciones de todas las materias. */
export function codigosMermaid(): string[] {
  const out = new Set<string>()
  const rec = (bs: Bloque[]) => bs.forEach((b) => { if (b.t === 'diagrama') out.add(b.codigo); else if (b.t === 'acordeon') rec(b.bloques) })

  for (const rutaLecciones of RUTAS_LECCIONES) {
    if (!existsSync(rutaLecciones)) continue
    for (const f of readdirSync(rutaLecciones).filter((f) => /^l\d+-\d+\.md$/.test(f))) {
      const mdPath = join(rutaLecciones, f)
      const practicaPath = mdPath.replace(/\.md$/, '.practica.yaml')
      const md = readFileSync(mdPath, 'utf8')
      const practicaYaml = existsSync(practicaPath) ? readFileSync(practicaPath, 'utf8') : ''
      try {
        const leccion = parsearLeccion(md, practicaYaml)
        const recBloques = (bs: Bloque[]) => bs.forEach((b) => { if (b.t === 'diagrama') out.add(b.codigo); else if (b.t === 'acordeon') rec(b.bloques) })
        recBloques(leccion.bloques)
      } catch (e) {
        console.warn(`[diagramas] error parsing ${mdPath}:`, (e as Error).message)
      }
    }
  }
  return [...out]
}

/** Subir si cambia la configuración o la paleta: invalida el caché. */
export async function sincronizarDiagramas({ estricto = process.env.CI === 'true' || process.env.NODE_ENV === 'production' }: { estricto?: boolean } = {}): Promise<{ dibujados: number }> {
  const codigos = codigosMermaid()
  const faltan = codigos.filter((c) => !existsSync(archivo(c)))
  if (faltan.length) {
    try {
      if (process.env.CI === 'true') throw new Error('en CI no se dibujan diagramas nuevos')
      mkdirSync(carpeta, { recursive: true })
      const nuevos = await dibujar(faltan)
      faltan.forEach((c, i) => writeFileSync(archivo(c), nuevos[i]!))
    } catch (e) {
      const msg = `Faltan ${faltan.length} diagrama(s) Mermaid dibujados. Corré \`bun run diagramas\` (necesita Chromium) y subí contenido/marketing/diagramas/. Causa: ${(e as Error).message}`
      if (estricto) throw new Error(msg)
      console.warn(`[diagramas] ${msg}`)
    }
  }
  for (const c of codigos) if (existsSync(archivo(c))) svgs.set(c, readFileSync(archivo(c), 'utf8'))
  return { dibujados: faltan.length }
}

export interface OpcionesDiagramas { estricto?: boolean }

/** Borra del caché los SVG que ningún diagrama usa. */
export function podarDiagramas(): string[] {
  if (!existsSync(carpeta)) return []
  const vigentes = new Set(codigosMermaid().map(claveDiagrama))
  const sobran = readdirSync(carpeta).filter((f) => f.endsWith('.svg') && !vigentes.has(f.replace('.svg', '')))
  for (const f of sobran) rmSync(join(carpeta, f))
  return sobran
}

let listo: Promise<unknown> | undefined
/** Para usar en las páginas: se prepara una sola vez por proceso. */
export const diagramasListos = (): Promise<unknown> => (listo ??= sincronizarDiagramas())

/** Ruta del archivo SVG por hash. */
const archivo = (codigo: string) => join(carpeta, `${claveDiagrama(codigo)}.svg`)

/** Cambia los colores de Mermaid por variables CSS y qué colores se desconocen. */
export function tematizar(svg: string): { svg: string; desconocidos: string[] } {
  const desconocidos = new Set<string>()
  const out = svg.replace(/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/g, (hex) => {
    const nombre = MARCADORES[hex.toLowerCase()]
    if (nombre) return `var(--mm-${nombre})`
    desconocidos.add(hex)
    return hex
  })
  return { svg: out, desconocidos: [...desconocidos] }
}

/** Renderiza los códigos Mermaid y retorna los SVGs tematizados. */
export async function dibujar(codigos: string[]): Promise<string[]> {
  const { createMermaidRenderer } = await import('mermaid-isomorphic')
  const exe = process.env.MERMAID_CHROMIUM
  const renderizar = createMermaidRenderer({ launchOptions: exe ? { executablePath: exe } : undefined })
  const res = await renderizar(codigos, { prefix: 'mm', mermaidConfig: { theme: 'base', themeVariables: TEMA, startOnLoad: false, securityLevel: 'strict', flowchart: { htmlLabels: false } } })
  const resultados: string[] = []
  res.forEach((r, i) => {
    if (r.status !== 'fulfilled') {
      console.warn(`[diagramas] no se pudo dibujar el código ${codigos[i]}: ${(r.reason as Error)?.message ?? 'unknown'}`)
      resultados.push('') // SVG vacío para este diagrama
      return
    }
    const hash = claveDiagrama(codigos[i]!)
    const unico = r.value.svg.replace(new RegExp(`mm-${i}(?![0-9])`, 'g'), `mm${hash}`)
    const { svg, desconocidos } = tematizar(unico)
    if (desconocidos.length) console.warn(`[diagramas] colores sin mapear en ${hash}: ${desconocidos.join(', ')}`)
    resultados.push(svg)
  })
  return resultados
}