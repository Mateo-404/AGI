import { ruta } from '@/logica/rutas'
import { useMemo, useState } from 'react'
import type { Pregunta, PreguntaCorta, PreguntaMC } from '@contenido/tipos'
import { registrarIntento, registrarQuiz } from '@/logica/progreso'
import { barajar, puntajeCorregido, rndDe } from '@/logica/repaso'
import { leccionDePregunta } from '@/logica/datos'
import { Tx } from './contexto'
import { Origen_ } from './Bloques'

export function PreguntaMCView({ p, onFin }: { p: PreguntaMC; onFin: (ok: boolean) => void }) {
  const [sel, setSel] = useState<number | null>(null)
  const [seguro, setSeguro] = useState(false)
  // Las alternativas se mezclan en cada intento para que la posición no delate la respuesta.
  const orden = useMemo(() => barajar(p.opciones.map((_, i) => i), rndDe(p.id)), [p])
  const ok = sel === p.correcta
  return (
    <div>
      <p><b><Tx t={p.enunciado} /></b> <span className="chip">{'●'.repeat(p.dif)}{'○'.repeat(3 - p.dif)}</span></p>
      {sel === null && (
        <label style={{ fontWeight: 500 }}><input type="checkbox" checked={seguro} onChange={(e) => setSeguro(e.target.checked)} /> Voy a responder con seguridad (no por descarte o azar)</label>
      )}
      {orden.map((i) => [i, p.opciones[i]!] as const).map(([i, o]) => (
        <button key={i} className={`opcion ${sel === null ? '' : i === p.correcta ? 'ok' : i === sel ? 'mal' : ''}`} disabled={sel !== null}
          onClick={() => { setSel(i); const acierto = i === p.correcta; registrarIntento(p.id, acierto, acierto && seguro) }}>
          <Tx t={o.x} />
          {sel !== null && <span className="porque">{i === p.correcta ? '✔ ' : '✘ '}<Tx t={o.porque} /></span>}
        </button>
      ))}
      {sel !== null && (
        <div>
          <div className={`fb ${ok ? 'ok' : 'mal'}`} role="status">{ok ? (seguro ? 'Correcto, con seguridad.' : 'Correcto. Para contar como dominio, repetilo en otro día y con seguridad.') : 'Incorrecto: revisá las explicaciones de cada alternativa.'}</div>
          <Origen_ o={p.o} />
          <div className="fila"><button className="btn pri" onClick={() => onFin(ok)}>Continuar</button></div>
        </div>
      )}
    </div>
  )
}

export function PreguntaCortaView({ p, onFin }: { p: PreguntaCorta; onFin: (ok: boolean) => void }) {
  const [texto, setTexto] = useState('')
  const [ver, setVer] = useState(false)
  const [marcas, setMarcas] = useState<boolean[]>(() => p.criterios.map(() => false))
  const cumplidos = marcas.filter(Boolean).length
  const ok = cumplidos >= Math.ceil((p.criterios.length * 2) / 3)
  return (
    <div>
      <p><b><Tx t={p.enunciado} /></b> <span className="chip">Respuesta corta · autoevaluación</span></p>
      <label htmlFor={`t-${p.id}`}>Tu respuesta (escribila antes de mirar el modelo)</label>
      <textarea id={`t-${p.id}`} rows={4} value={texto} onChange={(e) => setTexto(e.target.value)} disabled={ver} />
      {!ver ? (
        <div className="fila" style={{ marginTop: 8 }}>
          <button className="btn pri" onClick={() => setVer(true)} disabled={texto.trim().length < 10}>Ver respuesta modelo</button>
          {texto.trim().length < 10 && <span className="meta">Escribí al menos una frase para evitar el "ya lo sé".</span>}
        </div>
      ) : (
        <div>
          <div className="callout didactico"><b className="t">Respuesta modelo</b><Tx t={p.modelo} /></div>
          <p><b>Criterios:</b> marcá los que cumpliste</p>
          {p.criterios.map((c, i) => (
            <label key={i} style={{ fontWeight: 500 }}><input type="checkbox" checked={marcas[i]} onChange={() => setMarcas(marcas.map((m, j) => (j === i ? !m : m)))} /> <Tx t={c} /></label>
          ))}
          <Origen_ o={p.o} />
          <div className="fila" style={{ marginTop: 8 }}>
            <button className="btn pri" onClick={() => { registrarIntento(p.id, ok, true); onFin(ok) }}>Registrar ({ok ? 'lo logré' : 'a repasar'}) y continuar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export function QuizRunner({ preguntas, alcance, titulo, onSalir }: { preguntas: Pregunta[]; alcance: string; titulo: string; onSalir?: () => void }) {
  const [i, setI] = useState(0)
  const [res, setRes] = useState<{ id: string; ok: boolean }[]>([])
  const [guardado, setGuardado] = useState(false)
  const fin = i >= preguntas.length
  const mcs = useMemo(() => preguntas.filter((p): p is PreguntaMC => p.tipo === 'mc'), [preguntas])
  if (preguntas.length === 0) return <p className="aviso">No hay preguntas para este alcance.</p>
  if (fin) {
    const mcRes = res.filter((r) => mcs.some((m) => m.id === r.id))
    const ac = mcRes.filter((r) => r.ok).length
    const er = mcRes.length - ac
    const k = mcs[0]?.opciones.length ?? 4
    const corr = puntajeCorregido(ac, er, k)
    const falladas = res.filter((r) => !r.ok).map((r) => leccionDePregunta(r.id)).filter((l, j, a) => l && a.indexOf(l) === j)
    if (!guardado) { registrarQuiz({ alcance, total: res.length, aciertos: res.filter((r) => r.ok).length, corregido: Number(corr.toFixed(2)) }); setGuardado(true) }
    return (
      <section className="inter" aria-live="polite">
        <h3 style={{ marginTop: 0 }}>Resultado: {titulo}</h3>
        <p className="res">{res.filter((r) => r.ok).length} / {res.length}<small>Aciertos brutos (incluye respuestas cortas autoevaluadas)</small></p>
        {mcs.length > 0 && <p>Puntaje de opción múltiple corregido por azar: <b>{corr.toFixed(1)}</b> de {mcRes.length} <span className="meta">(aciertos − errores/({k}−1))</span></p>}
        <p className="aviso">Un buen resultado hoy no significa dominio: el tema se marca como <b>consolidado</b> recién con aciertos repetidos en días distintos.</p>
        {falladas.length > 0 && (<><h3 className="sub">Recomendación de repaso</h3><ul className="rec">{falladas.map((l) => <li key={l!.id}><a href={ruta(`marketing/leccion/${l!.id}`)}>{l!.id} · {l!.titulo}</a></li>)}</ul></>)}
        <div className="fila"><button className="btn pri" onClick={() => { setI(0); setRes([]); setGuardado(false) }}>Repetir</button>{onSalir && <button className="btn" onClick={onSalir}>Volver</button>}</div>
      </section>
    )
  }
  const p = preguntas[i]!
  const siguiente = (ok: boolean) => { setRes([...res, { id: p.id, ok }]); setI(i + 1) }
  return (
    <section className="inter" aria-label={titulo}>
      <span className="etq">Material de práctica creado para este curso — no es una evaluación oficial · {titulo} · {i + 1}/{preguntas.length}</span>
      <div className="barra" aria-hidden><i style={{ width: `${(i / preguntas.length) * 100}%` }} /></div>
      <div key={p.id} style={{ marginTop: 10 }}>
        {p.tipo === 'mc' ? <PreguntaMCView p={p} onFin={siguiente} /> : <PreguntaCortaView p={p} onFin={siguiente} />}
      </div>
    </section>
  )
}
