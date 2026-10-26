import { useState, type ReactNode } from 'react'
import type { Bloque, Nodo } from '@contenido/tipos'
import { Tx, useImprimir } from './contexto'
import { barajar, rndDe } from '@/logica/repaso'

type De<T extends Bloque['t']> = Extract<Bloque, { t: T }>

export function Explorable({ b }: { b: De<'explorable'> }) {
  const imprimir = useImprimir()
  const [sel, setSel] = useState<string | null>(null)
  if (imprimir)
    return (
      <div className="tabla-w">
        <Diagrama b={b} />
        <table>
          <caption>{b.titulo}</caption>
          <thead><tr><th>Elemento</th><th>En síntesis</th><th>Detalle</th></tr></thead>
          <tbody>
            {b.nodos.map((n: Nodo) => (
              <tr key={n.id}><td><b>{n.titulo}</b></td><td><Tx t={n.resumen} /></td><td><Tx t={n.detalle} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  const act = b.nodos.find((n: Nodo) => n.id === sel)
  return (
    <section className="inter" aria-label={b.titulo}>
      <span className="etq">Diagrama explorable</span>
      <h3 className="sub">{b.titulo}</h3>
      <div className={`nodos ${b.variante}`}>
        {b.nodos.map((n: Nodo, i: number) => (
          <button key={n.id} className="nodo" aria-pressed={sel === n.id} onClick={() => setSel(sel === n.id ? null : n.id)}
            style={b.variante === 'embudo' ? { width: `${100 - (i * 55) / Math.max(1, b.nodos.length - 1)}%` } : undefined}>
            <b>{n.titulo}</b>
            <div className="meta"><Tx t={n.resumen} /></div>
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {act ? <div className="nodo-det"><b>{act.titulo}.</b> <Tx t={act.detalle} /></div> : <p className="meta">Tocá un elemento para ver el detalle.</p>}
      </div>
    </section>
  )
}

export function Asociar({ b }: { b: De<'asociar'> }) {
  const imprimir = useImprimir()
  const [orden] = useState(() => barajar(b.pares.map((_, i) => i), rndDe(b.titulo)))
  const [resp, setResp] = useState<Record<number, number>>({})
  const [rev, setRev] = useState(false)
  if (imprimir)
    return (
      <div className="tabla-w"><table><caption>{b.titulo}</caption><tbody>{b.pares.map(([a, c]) => <tr key={a}><td><Tx t={a} /></td><td><Tx t={c} /></td></tr>)}</tbody></table></div>
    )
  const aciertos = b.pares.filter((_, i) => resp[i] === i).length
  return (
    <section className="inter" aria-label={b.titulo}>
      <span className="etq">Actividad de asociación</span>
      <h3 className="sub">{b.titulo}</h3>
      {b.pares.map(([izq], i) => (
        <div className="par" key={i}>
          <div className="etiq"><Tx t={izq} /></div>
          <select aria-label={`Asociar con: ${izq}`} value={resp[i] ?? ''} onChange={(e) => setResp({ ...resp, [i]: e.target.value === '' ? -1 : Number(e.target.value) })}>
            <option value="">— elegí —</option>
            {orden.map((j) => <option key={j} value={j}>{b.pares[j]![1]}</option>)}
          </select>
          {rev && <small className={resp[i] === i ? 'fb ok' : 'fb mal'}>{resp[i] === i ? 'Correcto' : `Correcta: ${b.pares[i]![1]}`}</small>}
        </div>
      ))}
      <div className="fila">
        <button className="btn pri" onClick={() => setRev(true)} disabled={Object.keys(resp).length < b.pares.length}>Comprobar</button>
        {rev && <span><b>{aciertos}</b> de {b.pares.length}</span>}
        {rev && <button className="btn" onClick={() => { setRev(false); setResp({}) }}>Reintentar</button>}
      </div>
    </section>
  )
}

export function Clasificar({ b }: { b: De<'clasificar'> }) {
  const imprimir = useImprimir()
  const [resp, setResp] = useState<Record<number, number>>({})
  const [rev, setRev] = useState(false)
  if (imprimir)
    return (
      <div className="tabla-w"><table><caption>{b.titulo}</caption><thead><tr><th>Enunciado</th><th>Categoría</th><th>Por qué</th></tr></thead>
        <tbody>{b.items.map((it) => <tr key={it.x}><td><Tx t={it.x} /></td><td>{b.categorias[it.cat]}</td><td><Tx t={it.porque} /></td></tr>)}</tbody></table></div>
    )
  return (
    <section className="inter" aria-label={b.titulo}>
      <span className="etq">Actividad de clasificación</span>
      <h3 className="sub">{b.titulo}</h3>
      {b.items.map((it, i) => (
        <fieldset key={i} style={{ border: 0, padding: 0, margin: '10px 0' }}>
          <legend><Tx t={it.x} /></legend>
          <div className="fila">
            {b.categorias.map((c, k) => (
              <label key={k} style={{ fontWeight: 500, display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                <input type="radio" name={`${b.titulo}-${i}`} checked={resp[i] === k} onChange={() => setResp({ ...resp, [i]: k })} /> {c}
              </label>
            ))}
          </div>
          {rev && <div className={`fb ${resp[i] === it.cat ? 'ok' : 'mal'}`}>{resp[i] === it.cat ? 'Correcto. ' : `Correcta: ${b.categorias[it.cat]}. `}<Tx t={it.porque} /></div>}
        </fieldset>
      ))}
      <div className="fila">
        <button className="btn pri" onClick={() => setRev(true)} disabled={Object.keys(resp).length < b.items.length}>Comprobar</button>
        {rev && <button className="btn" onClick={() => { setRev(false); setResp({}) }}>Reintentar</button>}
      </div>
    </section>
  )
}

export function Caso({ b }: { b: De<'caso'> }) {
  const imprimir = useImprimir()
  const [paso, setPaso] = useState(0)
  const [elec, setElec] = useState<number | null>(null)
  const [aciertos, setAciertos] = useState(0)
  if (imprimir)
    return (
      <div className="ejemplo"><h3 className="sub">Caso: {b.titulo}</h3><p><Tx t={b.escenario} /></p>
        {b.pasos.map((p, i) => <div key={i}><p><b><Tx t={p.pregunta} /></b></p><ul>{p.opciones.map((o) => <li key={o.x}>{o.ok ? '✔ ' : '✘ '}<Tx t={o.x} /> — <Tx t={o.consecuencia} /></li>)}</ul></div>)}</div>
    )
  const fin = paso >= b.pasos.length
  const p = b.pasos[paso]
  return (
    <section className="inter" aria-label={b.titulo}>
      <span className="etq">Caso con decisiones</span>
      <h3 className="sub">{b.titulo}</h3>
      <p><Tx t={b.escenario} /></p>
      {fin ? (
        <div><p className="fb ok">Fin del caso: decisiones adecuadas {aciertos} de {b.pasos.length}.</p>
          <button className="btn" onClick={() => { setPaso(0); setElec(null); setAciertos(0) }}>Volver a empezar</button></div>
      ) : (
        <div>
          <p><b>Decisión {paso + 1}/{b.pasos.length}.</b> <Tx t={p!.pregunta} /></p>
          {p!.opciones.map((o, i) => (
            <button key={i} className={`opcion ${elec === null ? '' : o.ok ? 'ok' : elec === i ? 'mal' : ''}`} disabled={elec !== null}
              onClick={() => { setElec(i); if (o.ok) setAciertos(aciertos + 1) }}>
              <Tx t={o.x} />{elec === i && <span className="porque"><b>Consecuencia:</b> <Tx t={o.consecuencia} /></span>}
            </button>
          ))}
          {elec !== null && <button className="btn pri" onClick={() => { setPaso(paso + 1); setElec(null) }}>Continuar</button>}
        </div>
      )}
    </section>
  )
}

/** Diagrama estático (solo para el manual imprimible): cadena, embudo o capas anidadas. */
function Diagrama({ b }: { b: De<'explorable'> }) {
  const n = b.nodos.length
  if (b.variante === 'embudo')
    return (
      <div className="dg dg-embudo" aria-hidden>
        {b.nodos.map((x: Nodo, i: number) => <div key={x.id} style={{ width: `${100 - (i * 55) / Math.max(1, n - 1)}%` }}>{x.titulo}</div>)}
      </div>
    )
  if (b.variante === 'capas')
    return (
      <div className="dg dg-capas" aria-hidden>
        {b.nodos.reduceRight<ReactNode>((dentro, x: Nodo) => <div className="capa"><span>{x.titulo}</span>{dentro}</div>, null)}
      </div>
    )
  return (
    <div className="dg dg-cadena" aria-hidden>
      {b.nodos.map((x: Nodo) => <div key={x.id}><b>{x.titulo}</b><small>{x.resumen}</small></div>)}
    </div>
  )
}
