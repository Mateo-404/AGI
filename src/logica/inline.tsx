import { ruta } from '@/logica/rutas'
import type { ReactNode } from 'react'

/**
 * Marcado en línea mínimo: **negrita**, *cursiva*, [[termino]] (glosario) y [[>l2-3|texto]] (lección).
 * Devuelve nodos React; los enlaces usan hash-routing.
 */
export function inline(texto: string, terminoPorId?: Map<string, { termino: string }>): ReactNode[] {
  const partes: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[\[>([\w-]+)\|(.+?)\]\]|\[\[([\w-]+)\]\]/g
  let ult = 0
  let k = 0
  for (const m of texto.matchAll(re)) {
    if (m.index! > ult) partes.push(texto.slice(ult, m.index))
    if (m[1] !== undefined) partes.push(<strong key={k++}>{inline(m[1], terminoPorId)}</strong>)
    else if (m[2] !== undefined) partes.push(<em key={k++}>{inline(m[2], terminoPorId)}</em>)
    else if (m[3] !== undefined) partes.push(<a key={k++} href={ruta(`marketing/leccion/${m[3]}`)}>{m[4]}</a>)
    else {
      const id = m[5]!
      const t = terminoPorId?.get(id)
      partes.push(
        <a key={k++} className="termino" href={ruta(`marketing/glosario/${id}`)} title="Ver en el glosario">
          {t?.termino ?? id}
        </a>,
      )
    }
    ult = m.index! + m[0].length
  }
  if (ult < texto.length) partes.push(texto.slice(ult))
  return partes
}

/** Versión texto plano (para búsquedas y exportaciones). */
export const plano = (t: string): string => t.replace(/\[\[>[\w-]+\|(.+?)\]\]/g, '$1').replace(/\[\[([\w-]+)\]\]/g, '$1').replace(/\*\*?/g, '')
