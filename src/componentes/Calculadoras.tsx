import { useState } from 'react'
import { useImprimir } from './contexto'

const num = (v: string) => (v === '' ? 0 : Number(v))
const fmt = (n: number, d = 2) => (Number.isFinite(n) ? n.toLocaleString('es-AR', { maximumFractionDigits: d }) : '—')

/** Fórmulas de la Tabla 15 del cuaderno (p. 158-159). Exportadas para pruebas. */
export const metricas = (gasto: number, impr: number, clics: number, conv: number) => ({
  ctr: impr > 0 ? (clics / impr) * 100 : NaN,
  cpc: clics > 0 ? gasto / clics : NaN,
  tasaConv: clics > 0 ? (conv / clics) * 100 : NaN,
  costoConv: conv > 0 ? gasto / conv : NaN,
})

function Campo({ id, etq, v, set }: { id: string; etq: string; v: string; set: (s: string) => void }) {
  return <div><label htmlFor={id}>{etq}</label><input id={id} type="number" min={0} inputMode="decimal" value={v} onChange={(e) => set(e.target.value)} /></div>
}

export function CalcMetricas() {
  const imprimir = useImprimir()
  const [g, setG] = useState('1000000'); const [i, setI] = useState('500000'); const [c, setC] = useState('25000'); const [k, setK] = useState('1000')
  if (imprimir) return <p className="sello">Simulador interactivo (CPC, CTR, tasa de conversión, costo por conversión) disponible en la versión web del curso.</p>
  const m = metricas(num(g), num(i), num(c), num(k))
  const incoherente = num(c) > num(i) || num(k) > num(c)
  return (
    <section className="inter" aria-label="Calculadora de métricas publicitarias">
      <span className="etq">Simulador</span>
      <h3 className="sub">Calculadora de métricas de SEO/SEM (Tabla 15 del cuaderno)</h3>
      <p className="meta">Valores iniciales = ejemplo Quilmes del cuaderno (p. 158-159). Modificalos y mirá cómo cambian los indicadores.</p>
      <div className="calc">
        <Campo id="g" etq="Costo total ($)" v={g} set={setG} /><Campo id="i" etq="Impresiones" v={i} set={setI} />
        <Campo id="c" etq="Clics" v={c} set={setC} /><Campo id="k" etq="Conversiones" v={k} set={setK} />
      </div>
      {incoherente && <p className="aviso" role="alert">Revisá los datos: no puede haber más clics que impresiones ni más conversiones que clics.</p>}
      <div className="calc" style={{ marginTop: 12 }}>
        <div className="res">{fmt(m.ctr)} %<small>CTR = clics ÷ impresiones × 100</small></div>
        <div className="res">$ {fmt(m.cpc)}<small>CPC = costo ÷ clics</small></div>
        <div className="res">{fmt(m.tasaConv)} %<small>Tasa de conversión = conversiones ÷ clics × 100</small></div>
        <div className="res">$ {fmt(m.costoConv)}<small>Costo por conversión = costo ÷ conversiones</small></div>
      </div>
    </section>
  )
}

/** Visitantes → leads → oportunidades → clientes, con tasas editables. */
export const embudo = (visitas: number, tasas: number[]): number[] => {
  const out = [visitas]
  for (const t of tasas) out.push(Math.round(out[out.length - 1]! * (t / 100)))
  return out
}

export function CalcEmbudo() {
  const imprimir = useImprimir()
  const [vis, setVis] = useState('10000')
  const [t, setT] = useState(['5', '20', '25'])
  if (imprimir) return <p className="sello">Simulador de embudo (visitas → leads → oportunidades → clientes) disponible en la versión web.</p>
  const etapas = ['Visitantes', 'Leads', 'Oportunidades', 'Clientes']
  const v = embudo(num(vis), t.map(num))
  const max = Math.max(1, v[0]!)
  return (
    <section className="inter" aria-label="Simulador de embudo de conversión">
      <span className="etq">Simulador</span>
      <h3 className="sub">Embudo de conversión: la reducción progresiva</h3>
      <p className="meta">El cuaderno describe el embudo como la reducción progresiva de clientes potenciales hasta la conversión (Cap. 3, p. 64). Las tasas son <b>supuestos tuyos</b>, no datos de la cátedra.</p>
      <div className="calc">
        <Campo id="vis" etq="Visitantes" v={vis} set={setVis} />
        {t.map((x, i) => <Campo key={i} id={`t${i}`} etq={`% ${etapas[i]} → ${etapas[i + 1]}`} v={x} set={(s) => setT(t.map((y, j) => (j === i ? s : y)))} />)}
      </div>
      <div className="embudo-vis" aria-label="Embudo">
        {v.map((n, i) => <div key={i} style={{ width: `${Math.max(22, (n / max) * 100)}%` }}>{etapas[i]}: {fmt(n, 0)}</div>)}
      </div>
      <p>Conversión global visitante→cliente: <b>{fmt(v[0]! > 0 ? (v[3]! / v[0]!) * 100 : NaN)} %</b></p>
    </section>
  )
}

/** Punto de equilibrio simple: unidades = costos fijos ÷ (precio − costo variable unitario). */
export const equilibrio = (fijos: number, precio: number, variable: number): number => (precio > variable ? fijos / (precio - variable) : NaN)

export function CalcPrecio() {
  const imprimir = useImprimir()
  const [f, setF] = useState('300000'); const [cv, setCv] = useState('400'); const [m, setM] = useState('50'); const [p, setP] = useState('1000')
  if (imprimir) return <p className="sello">Simulador de precio (margen sobre costo y punto de equilibrio) disponible en la versión web.</p>
  const porMargen = num(cv) * (1 + num(m) / 100)
  const pe = equilibrio(num(f), num(p), num(cv))
  return (
    <section className="inter" aria-label="Simulador de precio">
      <span className="etq">Simulador</span>
      <h3 className="sub">Costos como piso, demanda como techo</h3>
      <p className="meta">Ilustra «fijación por márgenes» y el límite inferior que marcan los costos (Cap. 5, pp. 94-95). El punto de equilibrio es un cálculo de apoyo <b>didáctico</b> (cuaderno remite a Cálculo de costos y rendimiento).</p>
      <div className="calc">
        <Campo id="f" etq="Costos fijos del período ($)" v={f} set={setF} /><Campo id="cv" etq="Costo variable unitario ($)" v={cv} set={setCv} />
        <Campo id="m" etq="Margen estándar sobre costo (%)" v={m} set={setM} /><Campo id="p" etq="Precio a evaluar ($)" v={p} set={setP} />
      </div>
      <div className="calc" style={{ marginTop: 12 }}>
        <div className="res">$ {fmt(porMargen)}<small>Precio por margen = costo × (1 + margen)</small></div>
        <div className="res">{Number.isFinite(pe) ? `${fmt(Math.ceil(pe), 0)} u.` : '—'}<small>Unidades para cubrir costos fijos a ese precio</small></div>
      </div>
      {!Number.isFinite(pe) && <p className="aviso" role="alert">Con ese precio no se cubre ni el costo variable: nunca alcanzará el equilibrio.</p>}
    </section>
  )
}
