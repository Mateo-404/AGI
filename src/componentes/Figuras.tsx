import type { ReactNode } from 'react'

/** Ilustraciones originales (SVG propio, sin imágenes externas). Las animaciones se apagan con prefers-reduced-motion. */
const Marco = ({ titulo, desc, children, vb = '0 0 640 220' }: { titulo: string; desc: string; children: ReactNode; vb?: string }) => (
  <figure className="figura">
    <svg viewBox={vb} role="img" aria-label={`${titulo}. ${desc}`} xmlns="http://www.w3.org/2000/svg">{children}</svg>
    <figcaption>{titulo}. <span>{desc}</span></figcaption>
  </figure>
)

const T = ({ x, y, children, cls = '', a = 'middle' }: { x: number; y: number; children: ReactNode; cls?: string; a?: 'start' | 'middle' | 'end' }) => (
  <text x={x} y={y} textAnchor={a} className={`ft ${cls}`}>{children}</text>
)

function Evolucion() {
  const et = [['1.0', 'Producto', 'masivo · unidireccional'], ['2.0', 'Cliente', 'fidelizar · bidireccional'], ['3.0', 'Valores', 'emoción · propósito'], ['4.0', 'Tecnología', 'datos · omnicanal'], ['5.0', 'Humanidad', 'IA con empatía']]
  return (
    <Marco titulo="Evolución del marketing" desc="De orientarse al producto a integrar tecnología y humanidad.">
      <line x1="40" y1="110" x2="600" y2="110" className="f-linea" />
      {et.map(([v, t, s], i) => (
        <g key={v} transform={`translate(${70 + i * 125} 0)`}><g className="f-nodo" style={{ animationDelay: `${i * 0.25}s` }}>
          <circle cx="0" cy="110" r={20 + i * 3} className="f-c" />
          <T x={0} y={116} cls="f-b">{v}</T>
          <T x={0} y={i % 2 ? 165 : 60} cls="f-b">{t}</T>
          <T x={0} y={i % 2 ? 183 : 78} cls="f-s">{s}</T>
        </g></g>
      ))}
    </Marco>
  )
}

function Mix() {
  const q = [['Producto', 'qué ofrecés'], ['Precio', 'cuánto vale'], ['Plaza', 'dónde está'], ['Promoción', 'cómo se comunica']]
  return (
    <Marco titulo="Marketing mix: las 4P alrededor del cliente" desc="Las cuatro variables controlables se influyen entre sí." vb="0 0 640 260">
      <circle cx="320" cy="130" r="42" className="f-c f-pulso" /><T x={320} y={135} cls="f-b">Mercado meta</T>
      {q.map(([n, s], i) => {
        const ang = (i * Math.PI) / 2 - Math.PI / 2
        const x = 320 + Math.cos(ang) * 170 * 1.25, y = 130 + Math.sin(ang) * 95
        return (
          <g key={n} className="f-nodo" style={{ animationDelay: `${i * 0.2}s` }}>
            <line x1="320" y1="130" x2={x} y2={y} className="f-linea" />
            <rect x={x - 62} y={y - 24} width="124" height="48" rx="12" className="f-r" />
            <T x={x} y={y - 3} cls="f-b">{n}</T><T x={x} y={y + 14} cls="f-s">{s}</T>
          </g>
        )
      })}
    </Marco>
  )
}

function Messy() {
  return (
    <Marco titulo="El «lío del medio»" desc="Exploración y evaluación se alternan hasta decidir (modelo de Google, según el cuaderno)." vb="0 0 640 230">
      <path d="M190 115 C190 40 320 40 320 115 C320 190 450 190 450 115" className="f-linea f-flujo" fill="none" />
      <path d="M450 115 C450 40 320 40 320 115 C320 190 190 190 190 115" className="f-linea f-flujo" fill="none" style={{ animationDirection: 'reverse' }} />
      <rect x="40" y="90" width="110" height="50" rx="12" className="f-r" /><T x={95} y={120} cls="f-b">Necesidad</T>
      <circle cx="250" cy="90" r="34" className="f-c" /><T x={250} y={94} cls="f-b">Explorar</T>
      <circle cx="390" cy="140" r="34" className="f-c f-pulso" /><T x={390} y={144} cls="f-b">Evaluar</T>
      <rect x="490" y="90" width="110" height="50" rx="12" className="f-r f-ok" /><T x={545} y={120} cls="f-b">Decisión</T>
      <T x={320} y={218} cls="f-s">sesgos y puntos de contacto empujan el bucle</T>
    </Marco>
  )
}

function Embudo() {
  const f = [['Visitantes', 560], ['Leads', 420], ['Oportunidades', 290], ['Clientes', 170]]
  return (
    <Marco titulo="Embudo de conversión" desc="La cantidad de clientes potenciales se reduce etapa tras etapa." vb="0 0 640 230">
      {f.map(([n, w], i) => (
        <g key={n as string} className="f-barra" style={{ animationDelay: `${i * 0.3}s` }}>
          <rect x={320 - (w as number) / 2} y={14 + i * 52} width={w as number} height="42" rx="8" className="f-r f-emb" style={{ opacity: 1 - i * 0.12 }} />
          <T x={320} y={40 + i * 52} cls="f-b">{n}</T>
        </g>
      ))}
    </Marco>
  )
}

function Subasta() {
  return (
    <Marco titulo="Subasta de anuncios (Google Ads)" desc="El orden depende de la oferta, la calidad del anuncio y la experiencia en la página." vb="0 0 640 220">
      {[['Oferta máxima', 60], ['Calidad y relevancia', 230], ['Experiencia en la página', 400]].map(([n, x], i) => (
        <g key={n as string} className="f-nodo" style={{ animationDelay: `${i * 0.2}s` }}>
          <rect x={x as number} y="30" width="170" height="52" rx="12" className="f-r" /><T x={(x as number) + 85} y={62} cls="f-b">{n}</T>
          <line x1={(x as number) + 85} y1="82" x2="320" y2="130" className="f-linea f-flujo" />
        </g>
      ))}
      <rect x="215" y="130" width="210" height="56" rx="14" className="f-r f-ok" /><T x={320} y={163} cls="f-b">Posición del anuncio</T>
    </Marco>
  )
}

function EmailEmbudo() {
  const e = [['Recibe', 'IP propia · SPF/DKIM'], ['Abre', 'asunto · A/B'], ['Reacciona', 'CTA · CTR'], ['Compra', 'landing · checkout']]
  return (
    <Marco titulo="Embudo del email (B2C)" desc="Cuatro momentos y qué trabajar en cada uno." vb="0 0 640 170">
      {e.map(([n, s], i) => (
        <g key={n} transform={`translate(${20 + i * 155} 0)`}><g className="f-nodo" style={{ animationDelay: `${i * 0.25}s` }}>
          <polygon points="0,30 140,30 150,85 140,140 0,140 10,85" className="f-r" style={{ opacity: 1 - i * 0.12 }} />
          <T x={75} y={80} cls="f-b">{n}</T><T x={75} y={104} cls="f-s">{s}</T>
        </g></g>
      ))}
    </Marco>
  )
}

const MAPA = { evolucion: Evolucion, mix: Mix, messy: Messy, embudo: Embudo, subasta: Subasta, email: EmailEmbudo }
export type FiguraId = keyof typeof MAPA
export const Figura = ({ id }: { id: FiguraId }) => { const C = MAPA[id]; return <C /> }
