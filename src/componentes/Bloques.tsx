import type { Bloque, Origen, TipoCallout } from '@contenido/tipos'
import { Tx, useImprimir } from './contexto'
import { Asociar, Caso, Clasificar, Explorable } from './Interactivos'
import { Icono } from './Icono'
import type { NombreIcono } from './iconos'
import { Figura } from './Figuras'
import { Animacion } from './Animacion'
import { CalcEmbudo, CalcMetricas, CalcPrecio } from './Calculadoras'
import { Diagrama } from './Diagrama'

export const etiquetaOrigen = (o?: Origen): string => {
  if (!o) return ''
  if (o.tipo === 'didactico') return 'Explicación didáctica'
  if (o.tipo === 'ampliacion') return 'Ampliación externa'
  return `Cuaderno, Cap. ${o.cap}${o.pag ? `, p. ${o.pag}` : ''}${o.sec ? ` · ${o.sec}` : ''}`
}

export const Origen_ = ({ o }: { o?: Origen }) => (o ? <span className="origen" title="Ubicación en el material original">{etiquetaOrigen(o)}</span> : null)

const ICONO_TIPO: Record<TipoCallout, NombreIcono> = { clave: 'lightbulb', ojo: 'warning', ia: 'timeline', ampliacion: 'info', discrepancia: 'fact_check', didactico: 'school' }

const TITULOS: Record<TipoCallout, string> = {
  clave: 'Idea clave',
  ojo: 'Ojo: confusión frecuente',
  ia: 'IA en este tema',
  ampliacion: 'Ampliación (no es contenido de la cátedra)',
  discrepancia: 'Discrepancia en las fuentes',
  didactico: 'Explicación didáctica (no está en el cuaderno)',
}

export function Bloques({ bloques }: { bloques: Bloque[] }) {
  return <>{bloques.map((b, i) => <BloqueView key={i} b={b} />)}</>
}

export function BloqueView({ b }: { b: Bloque }) {
  const imprimir = useImprimir()
  switch (b.t) {
    case 'p':
      return <p><Tx t={b.x} /><Origen_ o={b.o} /></p>
    case 'h':
      return <h3>{b.x}</h3>
    case 'def':
      return <div className="def"><b className="term">{b.termino}.</b> <Tx t={b.x} /><Origen_ o={b.o} /></div>
    case 'lista': {
      const L = b.num ? 'ol' : 'ul'
      return <L>{b.items.map((x, i) => <li key={i}><Tx t={x} /></li>)}{b.o && <Origen_ o={b.o} />}</L>
    }
    case 'tabla':
      return (
        <div className="tabla-w">
          <table>
            {b.titulo && <caption>{b.titulo} <Origen_ o={b.o} /></caption>}
            <thead><tr>{b.cab.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>{b.filas.map((f, i) => <tr key={i}>{f.map((c, j) => <td key={j}><Tx t={c} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      )
    case 'callout':
      return <aside className={`callout ${b.tipo}`}><b className="t"><Icono nombre={ICONO_TIPO[b.tipo]} /> {b.titulo ?? TITULOS[b.tipo]}</b><Tx t={b.x} /><Origen_ o={b.o} /></aside>
    case 'ejemplo':
      return <div className="ejemplo"><h3 className="sub">Ejemplo desarrollado: {b.titulo}<Origen_ o={b.o} /></h3><ol>{b.pasos.map((p, i) => <li key={i}><Tx t={p} /></li>)}</ol></div>
    case 'acordeon':
      return imprimir ? (
        <div className="ejemplo"><h3 className="sub">{b.titulo}</h3><Bloques bloques={b.bloques} /></div>
      ) : (
        <details className="acordeon"><summary>{b.titulo}</summary><div><Bloques bloques={b.bloques} /></div></details>
      )
    case 'comparar':
      return (
        <div>
          {b.titulo && <h3 className="sub">{b.titulo}</h3>}
          <div className="comparar">
            {[b.a, b.b].map((c, k) => <div key={k}><h3 className="sub">{c.titulo}</h3><ul>{c.items.map((x, i) => <li key={i}><Tx t={x} /></li>)}</ul></div>)}
          </div>
          <Origen_ o={b.o} />
        </div>
      )
    case 'explorable':
      return <Explorable b={b} />
    case 'figura':
      return <Figura id={b.id} />
    case 'animacion':
      return <Animacion archivo={b.archivo} titulo={b.titulo} descripcion={b.descripcion} credito={b.credito} />
    case 'calc':
      return b.tipo === 'metricas' ? <CalcMetricas /> : b.tipo === 'embudo' ? <CalcEmbudo /> : <CalcPrecio />
    case 'asociar':
      return <Asociar b={b} />
    case 'clasificar':
      return <Clasificar b={b} />
    case 'caso':
      return <Caso b={b} />
    case 'diagrama':
      return <Diagrama b={b} />
  }
}
