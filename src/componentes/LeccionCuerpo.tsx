import { ruta } from '@/logica/rutas'
import type { Leccion } from '@contenido/tipos'
import { Bloques, etiquetaOrigen } from './Bloques'
import { Tx } from './contexto'
import { leccionPorId, terminoPorId } from '@/logica/datos'

/** Cuerpo de una lección, compartido por la app web y el manual imprimible. */
export function LeccionCuerpo({ l, conPreguntas = false }: { l: Leccion; conPreguntas?: boolean }) {
  return (
    <>
      <h2 className="sub">Objetivos de aprendizaje</h2>
      <ul>{l.objetivos.map((o, i) => <li key={i}>{o}</li>)}</ul>
      {l.previos.length > 0 && (
        <p className="meta">Conocimientos previos: {l.previos.map((id, i) => <span key={id}>{i > 0 && ', '}<a href={ruta(`marketing/leccion/${id}`)}>{leccionPorId.get(id)?.titulo ?? id}</a></span>)}</p>
      )}
      <Bloques bloques={l.bloques} />
      <h3>Conceptos clave</h3>
      <p>{l.claves.map((id, i) => <span key={id}>{i > 0 && ' · '}<Tx t={`[[${id}]]`} /></span>)}</p>
      <h3>Síntesis</h3>
      <ul>{l.sintesis.map((s, i) => <li key={i}><Tx t={s} /></li>)}</ul>
      {l.conexiones.length > 0 && (
        <p>Conexiones: {l.conexiones.map((id, i) => <span key={id}>{i > 0 && ' · '}<a href={ruta(`marketing/leccion/${id}`)}>{leccionPorId.get(id)?.titulo ?? id}</a></span>)}</p>
      )}
      <h3>Referencias al material original</h3>
      <ul>{l.referencias.map((o, i) => <li key={i}>{etiquetaOrigen(o)}</li>)}</ul>
      {conPreguntas && <PreguntasImpresas l={l} />}
      <span hidden>{terminoPorId.size}</span>
    </>
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
