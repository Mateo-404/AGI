import { cobertura } from './marketing/cobertura'
import { glosario, lecciones, unidades } from './marketing/indice'
import type { Bloque } from './tipos'

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
    case 'calc': case 'figura': break
  }
}

export function validarContenido(): string[] {
  const errores: string[] = []
  const err = (m: string) => errores.push(m)
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
    const rec = (bs: Bloque[]) => bs.forEach((b) => {
      textos(b, txt)
      if (b.t === 'clasificar') b.items.forEach((i) => { if (i.cat < 0 || i.cat >= b.categorias.length) err(`${l.id}: categoría fuera de rango en clasificar`) })
      if (b.t === 'caso') b.pasos.forEach((p) => { if (!p.opciones.some((o) => o.ok)) err(`${l.id}: paso de caso sin opción correcta`) })
      if (b.t === 'acordeon') rec(b.bloques)
    })
    rec(l.bloques)
    txt.push(...l.sintesis)
    for (const s of txt) {
      for (const m of s.matchAll(/\[\[>([\w-]+)\|/g)) if (!lids.has(m[1]!)) err(`${l.id}: enlace roto a lección ${m[1]}`)
      for (const m of s.matchAll(/\[\[([\w-]+)\]\]/g)) if (!gids.has(m[1]!)) err(`${l.id}: enlace roto a glosario ${m[1]}`)
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
