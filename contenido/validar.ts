import { existsSync, readFileSync } from 'node:fs'
import type { Bloque, Materia } from './tipos'

/** Recorre todo el texto de una lección (para comprobar enlaces [[...]]). */
function textos(b: Bloque, out: string[]): void {
  const push = (...xs: (string | undefined)[]) => xs.forEach((x) => x && out.push(x))
  switch (b.t) {
    case 'p': case 'h': push(b.x); break
    case 'def': push(b.x); break
    case 'lista': push(...b.items); break
    case 'tabla': b.filas.forEach((f) => push(...f)); break
    case 'callout': push(b.x); break
    case 'ejemplo': push(...b.pasos); break
    case 'acordeon': b.bloques.forEach((x) => textos(x, out)); break
    case 'comparar': push(...b.a.items, ...b.b.items); break
    case 'explorable': b.nodos.forEach((n) => push(n.resumen, n.detalle)); break
    case 'asociar': b.pares.forEach((p) => push(...p)); break
    case 'clasificar': b.items.forEach((i) => push(i.x, i.porque)); break
    case 'caso': push(b.escenario); b.pasos.forEach((p) => { push(p.pregunta); p.opciones.forEach((o) => push(o.x, o.consecuencia)) }); break
    case 'calc': break
    case 'diagrama': push(b.titulo); break
    case 'imagen': push(b.alt); break
    case 'animacion': push(b.descripcion); break
  }
}

/** Tipos de Mermaid que se ven bien con la paleta del sitio en claro y oscuro (probados). Los demás salen negros o con colores fijos. */
const TIPOS_MERMAID = /^(flowchart|graph|sequenceDiagram|stateDiagram(-v2)?|classDiagram|erDiagram)\b/
const PROHIBIDO_MERMAID = /^\s*(classDef|style|linkStyle|click)\b|%%\{/m

/** Devuelve el problema de un diagrama Mermaid, o undefined si está bien. */
export function problemaDiagrama(codigo: string): string | undefined {
  const primera = codigo.split('\n').map((l) => l.trim()).find((l) => l && !l.startsWith('%%'))
  if (!primera || !TIPOS_MERMAID.test(primera)) return `tipo no admitido «${primera?.split(/\s/)[0] ?? ''}»: usá flowchart, sequenceDiagram, stateDiagram-v2, classDiagram o erDiagram (los demás no se adaptan al modo oscuro)`
  const m = PROHIBIDO_MERMAID.exec(codigo)
  if (m) return `no uses «${m[0].trim()}»: los colores los pone el tema (claro/oscuro) y uno propio se rompería en el otro modo`
  return undefined
}

let docCreditos: string | undefined
const creditos = (): string => (docCreditos ??= readFileSync(new URL('../docs/creditos-multimedia.md', import.meta.url), 'utf8'))

/** Valida una materia (ids, enlaces, orígenes, preguntas y cobertura). */
export function validarMateria(m: Materia): string[] {
  const errores: string[] = []
  const err = (e: string) => errores.push(`${m.slug}: ${e}`)
  const { lecciones, glosario, unidades, cobertura } = m
  const unico = (nombre: string, ids: string[]) => {
    const vistos = new Set<string>()
    for (const id of ids) vistos.has(id) ? err(`${nombre} duplicado: ${id}`) : vistos.add(id)
  }
  const lids = new Set(lecciones.map((l) => l.id))
  const gids = new Set(glosario.map((g) => g.id))

  unico('lección', lecciones.map((l) => l.id))
  unico('glosario', glosario.map((g) => g.id))
  unico('pregunta', lecciones.flatMap((l) => l.preguntas.map((p) => p.id)))
  unico('tarjeta', lecciones.flatMap((l) => l.tarjetas.map((t) => t.id)))

  for (const u of unidades) if (u.n <= 7 && !lecciones.some((l) => l.unidad === u.n)) err(`Unidad ${u.n} sin lecciones`)

  for (const l of lecciones) {
    if (!unidades.some((u) => u.n === l.unidad)) err(`${l.id}: unidad inexistente ${l.unidad}`)
    if (l.preguntas.length < 4) err(`${l.id}: menos de 4 preguntas`)
    if (l.tarjetas.length < 2) err(`${l.id}: menos de 2 tarjetas`)
    if (l.objetivos.length < 2) err(`${l.id}: faltan objetivos`)
    if (l.referencias.length === 0) err(`${l.id}: sin referencias al material original`)
    for (const id of [...l.previos, ...l.conexiones]) if (!lids.has(id)) err(`${l.id}: enlace a lección inexistente ${id}`)
    for (const c of l.claves) if (!gids.has(c)) err(`${l.id}: clave sin glosario ${c}`)
    for (const p of l.preguntas) {
      if (p.tipo === 'mc') {
        if (p.opciones.length < 3) err(`${p.id}: menos de 3 opciones`)
        if (p.correcta < 0 || p.correcta >= p.opciones.length) err(`${p.id}: índice de respuesta fuera de rango`)
        if (p.opciones.some((o) => !o.porque.trim())) err(`${p.id}: opción sin explicación`)
        if (new Set(p.opciones.map((o) => o.x)).size !== p.opciones.length) err(`${p.id}: opciones repetidas`)
      } else if (p.criterios.length < 2 || !p.modelo.trim()) err(`${p.id}: respuesta corta incompleta`)
    }
    const txt: string[] = []
    const rec = (bs: Bloque[], dentroDeAcordeon = false) => bs.forEach((b) => {
      textos(b, txt)
      // Toda afirmación del curso lleva origen (bibliografía, didáctico o ampliación): ver agents.md.
      if (['p', 'def', 'lista', 'tabla', 'callout', 'ejemplo', 'comparar'].includes(b.t) && !(b as { o?: unknown }).o) err(`${l.id}: bloque "${b.t}" sin origen`)
      if (b.t === 'diagrama') { const pb = problemaDiagrama(b.codigo); if (pb) err(`${l.id}: diagrama «${b.titulo ?? b.codigo.split('\n')[0]}»: ${pb}`) }
      if (b.t === 'imagen') {
        if (!b.alt.trim()) err(`${l.id}: imagen sin texto alternativo`)
        if (!b.credito.trim()) err(`${l.id}: imagen sin crédito visible`)
        if (!existsSync(new URL(`../public/${b.archivo}`, import.meta.url))) err(`${l.id}: la imagen ${b.archivo} no existe en public/`)
        else if (!creditos().includes(`public/${b.archivo}`)) err(`${l.id}: la imagen ${b.archivo} no figura en docs/creditos-multimedia.md (usá bun run ilustracion)`)
      }
      if (dentroDeAcordeon && ['explorable', 'asociar', 'clasificar', 'caso', 'calc', 'animacion'].includes(b.t)) err(`${l.id}: un bloque interactivo (${b.t}) no puede ir dentro de un acordeón`)
      if (b.t === 'clasificar') b.items.forEach((i) => { if (i.cat < 0 || i.cat >= b.categorias.length) err(`${l.id}: categoría fuera de rango en clasificar`) })
      if (b.t === 'caso') b.pasos.forEach((p) => { if (!p.opciones.some((o) => o.ok)) err(`${l.id}: paso de caso sin opción correcta`) })
      if (b.t === 'acordeon') rec(b.bloques, true)
    })
    rec(l.bloques)
    txt.push(...l.sintesis)
    for (const s of txt) {
      for (const en of s.matchAll(/\[\[>([\w-]+)\|/g)) if (!lids.has(en[1]!)) err(`${l.id}: enlace roto a lección ${en[1]}`)
      for (const en of s.matchAll(/\[\[([\w-]+)\]\]/g)) if (!gids.has(en[1]!)) err(`${l.id}: enlace roto a glosario ${en[1]}`)
    }
  }
  for (const g of glosario) {
    if (!lids.has(g.lec)) err(`glosario ${g.id}: lección inexistente ${g.lec}`)
    for (const r of g.rel ?? []) if (!gids.has(r)) err(`glosario ${g.id}: relacionado inexistente ${r}`)
  }
  for (const c of cobertura) {
    if (c.lecciones.length === 0) err(`cobertura "${c.tema}" sin lección`)
    for (const id of c.lecciones) if (!lids.has(id)) err(`cobertura "${c.tema}": lección inexistente ${id}`)
  }
  return errores
}
