import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Bloque } from '@contenido/tipos'
import { lecciones } from '@contenido/marketing/indice'
import { svgs } from './diagramas'

/**
 * Diagramas Mermaid dibujados en el build (solo servidor).
 * - Cada diagrama se dibuja una vez y se guarda en contenido/marketing/diagramas/<hash>.svg. Esa carpeta se sube al
 *   repositorio: el CI no necesita Chromium salvo que cambie un diagrama (entonces falla y pide `bun run diagramas`).
 * - Los colores de Mermaid se reemplazan por variables CSS del sitio (--mm-*), así un solo SVG sirve en claro y oscuro.
 * - El navegador nunca carga Mermaid: recibe el SVG ya dibujado.
 */

/** Subir si cambia la configuración o la paleta: invalida el caché. */
const VERSION = 'v1'
const carpeta = join(process.cwd(), 'contenido/marketing/diagramas')

/** Colores marcadores que se le pasan a Mermaid y a qué variable CSS equivalen. Los que Mermaid deriva por su cuenta también se mapean. */
const MARCADORES: Record<string, string> = {
  '#010001': 'nodo', '#010002': 'texto', '#010003': 'borde', '#010004': 'linea', '#010005': 'sec', '#010006': 'terc', '#010007': 'fondo',
  '#fefff8': 'fondo', '#fefff9': 'fondo', '#fefffb': 'fondo', '#000': 'texto', '#000000': 'texto', '#333': 'texto',
  '#666': 'linea', '#999': 'borde', '#eaeaea': 'sec', '#fff5ad': 'nota', '#fff': 'fondo', '#ffffff': 'fondo',
}

const TEMA = {
  primaryColor: '#010001', primaryTextColor: '#010002', primaryBorderColor: '#010003', lineColor: '#010004',
  secondaryColor: '#010005', tertiaryColor: '#010006', background: '#010007', mainBkg: '#010001', nodeBorder: '#010003',
  textColor: '#010002', edgeLabelBackground: '#010007', clusterBkg: '#010005', clusterBorder: '#010003', titleColor: '#010002',
  fontFamily: '"Roboto Flex Variable", "Roboto Flex", Arial, sans-serif', fontSize: '15px',
}

export const claveDiagrama = (codigo: string): string => createHash('sha1').update(`${VERSION}\n${codigo}`).digest('hex').slice(0, 16)

/** Cambia los colores de Mermaid por variables CSS y devuelve los que no conoce (para avisar). */
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

/** Todos los códigos Mermaid del curso, sin repetir. */
export function codigosMermaid(): string[] {
  const out = new Set<string>()
  const rec = (bs: Bloque[]) => bs.forEach((b) => { if (b.t === 'diagrama') out.add(b.codigo); else if (b.t === 'acordeon') rec(b.bloques) })
  for (const l of lecciones) rec(l.bloques)
  return [...out]
}

const archivo = (codigo: string) => join(carpeta, `${claveDiagrama(codigo)}.svg`)

async function dibujar(codigos: string[]): Promise<string[]> {
  const { createMermaidRenderer } = await import('mermaid-isomorphic')
  const exe = process.env.MERMAID_CHROMIUM
  const renderizar = createMermaidRenderer({ launchOptions: exe ? { executablePath: exe } : undefined })
  const res = await renderizar(codigos, { prefix: 'mm', mermaidConfig: { theme: 'base', themeVariables: TEMA, startOnLoad: false, securityLevel: 'strict', flowchart: { htmlLabels: false } } })
  return res.map((r, i) => {
    if (r.status !== 'fulfilled') throw new Error(`Mermaid no pudo dibujar el diagrama:\n${codigos[i]}\n→ ${(r.reason as Error)?.message ?? r.reason}`)
    const hash = claveDiagrama(codigos[i]!)
    // Los ids (mm-0, mm-1…) se repiten entre diagramas: se renombran con el hash para que varios convivan en una página.
    const unico = r.value.svg.replace(new RegExp(`mm-${i}(?![0-9])`, 'g'), `mm${hash}`)
    const { svg, desconocidos } = tematizar(unico)
    if (desconocidos.length) console.warn(`[diagramas] colores sin mapear en ${hash}: ${desconocidos.join(', ')}`)
    return svg
  })
}

export interface OpcionesDiagramas { estricto?: boolean }

/** Deja en `svgs` el SVG de cada diagrama del curso, dibujando solo los que faltan en el caché. */
export async function sincronizarDiagramas({ estricto = process.env.CI === 'true' || process.env.NODE_ENV === 'production' }: OpcionesDiagramas = {}): Promise<{ dibujados: number }> {
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

let listo: Promise<unknown> | undefined
/** Para usar en las páginas: se prepara una sola vez por proceso. */
export const diagramasListos = (): Promise<unknown> => (listo ??= sincronizarDiagramas())

/** Borra del caché los SVG que ningún diagrama usa. */
export function podarDiagramas(): string[] {
  if (!existsSync(carpeta)) return []
  const vigentes = new Set(codigosMermaid().map(claveDiagrama))
  const sobran = readdirSync(carpeta).filter((f) => f.endsWith('.svg') && !vigentes.has(f.replace('.svg', '')))
  for (const f of sobran) rmSync(join(carpeta, f))
  return sobran
}
