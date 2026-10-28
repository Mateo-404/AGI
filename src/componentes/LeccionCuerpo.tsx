import type { CSSProperties } from 'react'
import { rutaMateria } from '@/logica/rutas'
import type { Leccion } from '@contenido/tipos'
import { Bloques, etiquetaOrigen } from './Bloques'
import { Tx } from './contexto'
import { MateriaScope, useMateria } from './contextoMateria'
import { getUnidadIcon } from '@/design/tokens'

/** Objetivos y conocimientos previos: lo que va antes de los bloques. */
export function LeccionCabecera({ l, materia }: { l: Leccion; materia?: string }) {
  return <MateriaScope materia={materia}><LeccionCabeceraBase l={l} /></MateriaScope>
}

function LeccionCabeceraBase({ l }: { l: Leccion }) {
  const m = useMateria()
  const unidadIcon = getUnidadIcon(m.slug, l.unidad)
  const cuatriColor = `var(--color-cuatri-${m.unidades.find(u => u.n === l.unidad)?.cuatri || 1})`
  const cuatriBg = `var(--color-cuatri-${m.unidades.find(u => u.n === l.unidad)?.cuatri || 1}-bg, var(--color-brand-light))`
  
  return (
    <>
      {/* Unit cover image - Notion style */}
      <div className="unit-cover" style={{ '--cuatri-color': cuatriColor, '--cuatri-bg': cuatriBg } as CSSProperties} aria-hidden="true">
        <div className="unit-cover-pattern" />
        <div className="unit-cover-content">
          <p className="unit-cover-number">{unidadIcon} Unidad {l.unidad}</p>
          <h1 className="unit-cover-title">{l.titulo}</h1>
          <div className="unit-cover-meta">
            <span>{l.minutos} min</span>
            <span>·</span>
            <span>{l.resumen}</span>
          </div>
        </div>
      </div>
      
      <h2 className="sub">Objetivos de aprendizaje</h2>
      <ul>{l.objetivos.map((o, i) => <li key={i}>{o}</li>)}</ul>
      {l.previos.length > 0 && (
        <p className="meta">Conocimientos previos: {l.previos.map((id, i) => <span key={id}>{i > 0 && ', '}<a href={rutaMateria(m.slug, `leccion/${id}`)}>{m.leccionPorId.get(id)?.titulo ?? id}</a></span>)}</p>
      )}
    </>
  )
}

/** Conceptos clave, síntesis, conexiones y referencias: lo que va después de los bloques. */
export function LeccionPie({ l, conPreguntas = false, materia }: { l: Leccion; conPreguntas?: boolean; materia?: string }) {
  return <MateriaScope materia={materia}><LeccionPieBase l={l} conPreguntas={conPreguntas} /></MateriaScope>
}

function LeccionPieBase({ l, conPreguntas = false }: { l: Leccion; conPreguntas?: boolean }) {
  const m = useMateria()
  return (
    <>
      <h3>Conceptos clave</h3>
      <p>{l.claves.map((id, i) => <span key={id}>{i > 0 && ' · '}<Tx t={`[[${id}]]`} /></span>)}</p>
      <h3>Síntesis</h3>
      <ul>{l.sintesis.map((s, i) => <li key={i}><Tx t={s} /></li>)}</ul>
      {l.conexiones.length > 0 && (
        <p>Conexiones: {l.conexiones.map((id, i) => <span key={id}>{i > 0 && ' · '}<a href={rutaMateria(m.slug, `leccion/${id}`)}>{m.leccionPorId.get(id)?.titulo ?? id}</a></span>)}</p>
      )}
      <h3>Referencias al material original</h3>
      <ul>{l.referencias.map((o, i) => <li key={i}>{etiquetaOrigen(o)}</li>)}</ul>
      {conPreguntas && <PreguntasImpresas l={l} />}
      <span hidden>{m.terminoPorId.size}</span>
    </>
  )
}

/** Cuerpo de una lección para el manual imprimible y las pruebas. En la web se arma en LeccionEstatica.astro, con los interactivos como islas. */
export function LeccionCuerpo({ l, conPreguntas = false, materia }: { l: Leccion; conPreguntas?: boolean; materia?: string }) {
  return (
    <MateriaScope materia={materia}>
      <LeccionCabecera l={l} />
      <Bloques bloques={l.bloques} />
      <LeccionPie l={l} conPreguntas={conPreguntas} />
    </MateriaScope>
  )
}

function PreguntasImpresas({ l }: { l: Leccion }) {
  const abiertas = l.preguntas.filter((p) => p.tipo === 'corta')
  return (
    <>
      <h3>Preguntas de recuperación activa</h3>
      <ol>{abiertas.map((p) => <li key={p.id}><Tx t={p.enunciado} /></li>)}</ol>
      <p className="meta">Las preguntas de opción múltiple con la explicación de cada alternativa están en el banco de preguntas (ids {l.preguntas.filter((p) => p.tipo === 'mc').map((p) => p.id).join(', ')}).</p>
    </>
  )
}
