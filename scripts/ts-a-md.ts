/**
 * Convierte las lecciones de TypeScript (contenido/marketing/lecciones/*.ts) a Markdown + YAML.
 * Es el inverso de src/logica/mdLeccion.ts: la prueba tests/md-roundtrip.test.ts comprueba que ida y vuelta no pierde nada.
 *
 *   bun run scripts/ts-a-md.ts           escribe los .md y .practica.yaml junto a los .ts
 *   bun run scripts/ts-a-md.ts --base    además congela tests/fixtures/lecciones.base.json
 */
import { Document, stringify } from 'yaml'
import { formatearOrigen } from '../src/logica/mdLeccion'
import type { Bloque, Leccion, Origen } from '../contenido/tipos'

const una = (id: string, s: string): string => {
  if (/[\r\n]/.test(s)) throw new Error(`${id}: un texto con saltos de línea no se puede escribir en Markdown: "${s.slice(0, 50)}…"`)
  return s
}

/** Un párrafo que empezaría como otro bloque se escapa con una barra. */
const escapar = (s: string): string => (/^(\\|#{2}\s|[-|{`^]|:{2}|\d+\.\s)/.test(s) ? `\\${s}` : s)

const origen = (o?: Origen): string => (o ? ` {${formatearOrigen(o)}}` : '')
const celda = (s: string): string => s.replace(/\|/g, '\\|')
const aFence = (tipo: string, datos: unknown, o?: Origen): string => {
  const doc = new Document({ ...(datos as object), ...(o ? { o: formatearOrigen(o) } : {}) })
  return `\`\`\`${tipo}\n${doc.toString({ lineWidth: 0 }).trimEnd()}\n\`\`\``
}

/** Cantidad de acordeones anidados: define cuántos dos puntos necesita el contenedor exterior. */
const alturaAcordeon = (b: Bloque): number =>
  b.t === 'acordeon' ? 1 + Math.max(0, ...b.bloques.map(alturaAcordeon)) : 0

function bloque(id: string, b: Bloque): string {
  switch (b.t) {
    case 'p': return `${escapar(una(id, b.x))}${origen(b.o)}`
    case 'h': return `## ${una(id, b.x)}`
    case 'def': return `:::def ${b.termino}\n${una(id, b.x)}${origen(b.o)}\n:::`
    case 'callout': return `:::${b.tipo}${b.titulo ? ` ${b.titulo}` : ''}\n${una(id, b.x)}${origen(b.o)}\n:::`
    case 'lista': return b.items.map((x, n) => `${b.num ? `${n + 1}.` : '-'} ${una(id, x)}${n === b.items.length - 1 ? origen(b.o) : ''}`).join('\n')
    case 'ejemplo': return `:::ejemplo ${b.titulo}\n${b.pasos.map((x, n) => `${n + 1}. ${una(id, x)}${n === b.pasos.length - 1 ? origen(b.o) : ''}`).join('\n')}\n:::`
    case 'tabla': {
      const fila = (c: string[]) => `| ${c.map((x) => celda(una(id, x))).join(' | ')} |`
      const filas = [fila(b.cab), `|${b.cab.map(() => '---').join('|')}|`, ...b.filas.map(fila)]
      filas[filas.length - 1] += origen(b.o)
      return `${b.titulo ? `^ ${b.titulo}\n` : ''}${filas.join('\n')}`
    }
    case 'comparar': {
      const lado = (g: { titulo: string; items: string[] }, fin: string) => `### ${g.titulo}\n${g.items.map((x, n) => `- ${una(id, x)}${n === g.items.length - 1 ? fin : ''}`).join('\n')}`
      return `:::comparar${b.titulo ? ` ${b.titulo}` : ''}\n${lado(b.a, '')}\n${lado(b.b, origen(b.o))}\n:::`
    }
    case 'acordeon': {
      const marca = ':'.repeat(3 + alturaAcordeon(b))
      return `${marca}acordeon ${b.titulo}\n${b.bloques.map((x) => bloque(id, x)).join('\n\n')}\n${marca}`
    }
    case 'figura': return `::figura ${b.id}`
    case 'calc': return `::calc ${b.tipo}`
    case 'diagrama': return `\`\`\`mermaid${b.titulo ? ` ${b.titulo}` : ''}\n${b.codigo}\n\`\`\`${b.o ? `\n{${formatearOrigen(b.o)}}` : ''}`
    case 'explorable': case 'animacion': case 'asociar': case 'clasificar': case 'caso': {
      const { t, o, ...datos } = b as typeof b & { o?: Origen }
      return aFence(t, datos, o)
    }
  }
}

/** Escalar YAML con las comillas mínimas; dentro de [a, b] se comilla también lo que tenga , [ ] { }. */
const y = (v: string | number): string => {
  const t = stringify(v, { lineWidth: 0 }).trim()
  return typeof v === 'string' && /[,[\]{}]/.test(v) && !/^["']/.test(t) ? JSON.stringify(v) : t
}

function frontmatter(l: Leccion): string {
  const lista = (clave: string, xs: string[]) => `${clave}: [${xs.map(y).join(', ')}]`
  return [
    `id: ${y(l.id)}`, `unidad: ${l.unidad}`, `titulo: ${y(l.titulo)}`, `resumen: ${y(l.resumen)}`, `minutos: ${l.minutos}`,
    'objetivos:', ...l.objetivos.map((o) => `  - ${y(o)}`),
    lista('previos', l.previos), lista('claves', l.claves), lista('conexiones', l.conexiones),
    'referencias:', ...l.referencias.map((r) => `  - ${y(formatearOrigen(r))}`),
  ].join('\n')
}

const pre = (id: string) => id.replace('-', '')

function practica(l: Leccion): string {
  const out = ['preguntas:']
  l.preguntas.forEach((p, n) => {
    const props: string[] = []
    if (p.id !== `${pre(l.id)}-q${n + 1}`) props.push(`id: ${y(p.id)}`)
    props.push(`tema: ${y(p.tema)}`, `dif: ${p.dif}`, `enunciado: ${y(p.enunciado)}`)
    if (p.tipo === 'mc') props.push('opciones:', ...p.opciones.map((o) => `  - [${y(o.x)}, ${y(o.porque)}]`), `correcta: ${p.correcta}`)
    else props.push(`modelo: ${y(p.modelo)}`, 'criterios:', ...p.criterios.map((c) => `  - ${y(c)}`))
    if (p.o) props.push(`o: ${y(formatearOrigen(p.o))}`)
    out.push(...props.map((x, k) => `${k === 0 ? '  - ' : '    '}${x}`))
  })
  out.push('tarjetas:')
  l.tarjetas.forEach((t, n) => out.push(`  - [${[y(t.f), y(t.b), ...(t.id === `${pre(l.id)}-t${n + 1}` ? [] : [y(t.id)])].join(', ')}]`))
  return `${out.join('\n')}\n`
}

export function serializarLeccion(l: Leccion): { md: string; practica: string } {
  const cuerpo = l.bloques.map((b) => bloque(l.id, b)).join('\n\n')
  const sintesis = l.sintesis.length ? `\n\n:::sintesis\n${l.sintesis.map((s) => `- ${una(l.id, s)}`).join('\n')}\n:::` : ''
  return { md: `---\n${frontmatter(l)}\n---\n${cuerpo}${sintesis}\n`, practica: practica(l) }
}

if (import.meta.main) {
  const { lecciones } = await import('../contenido/marketing/indice')
  const { writeFileSync, mkdirSync } = await import('node:fs')
  const dir = new URL('../contenido/marketing/lecciones/', import.meta.url).pathname
  for (const l of lecciones) {
    const { md, practica: py } = serializarLeccion(l)
    writeFileSync(`${dir}${l.id}.md`, md)
    writeFileSync(`${dir}${l.id}.practica.yaml`, py)
  }
  if (process.argv.includes('--base')) {
    const f = new URL('../tests/fixtures/', import.meta.url).pathname
    mkdirSync(f, { recursive: true })
    writeFileSync(`${f}lecciones.base.json`, JSON.stringify(lecciones))
  }
  console.log(`${lecciones.length} lecciones convertidas`)
}
