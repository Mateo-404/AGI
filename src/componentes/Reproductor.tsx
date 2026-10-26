import { useEffect } from 'react'
import { alternar, alTerminarCapitulo, detener, reproducir, setContinuo, setVelocidad, tomarPendienteContinuo, textoDeElemento, useVoz } from '@/logica/voz'

const VELOCIDADES = [0.8, 1, 1.25, 1.5]

/** Barra de audio tipo podcast. Lee el texto visible de la página principal. */
export function Reproductor({ tituloPagina, siguienteHref }: { tituloPagina: string; siguienteHref?: string }) {
  const v = useVoz()
  useEffect(() => {
    alTerminarCapitulo(() => { if (siguienteHref) location.hash = siguienteHref })
    // Modo continuo: si el capítulo anterior terminó con la opción activa, leer la lección nueva.
    const t = tomarPendienteContinuo() ? setTimeout(() => {
      const el = document.getElementById('principal')
      if (el) reproducir(textoDeElemento(el), document.title)
    }, 900) : undefined
    return () => { alTerminarCapitulo(() => {}); if (t) clearTimeout(t) }
  }, [siguienteHref])
  useEffect(() => () => { if (estadoLector()) detener() }, [])
  if (!v.soportada) return <p className="voz-aviso no-print">Tu navegador no tiene lectura en voz alta. Probá Chrome, Edge o Safari.</p>
  const leer = () => {
    const el = document.getElementById('principal')
    if (!el) return
    alternar(textoDeElemento(el), tituloPagina)
  }
  const activo = v.estado !== 'parado'
  const pct = v.fragmentos.length ? Math.round((v.indice / v.fragmentos.length) * 100) : 0
  return (
    <section className="reproductor no-print" aria-label="Escuchar esta página">
      <button className="btn pri" onClick={leer} aria-label={v.estado === 'hablando' ? 'Pausar lectura' : v.estado === 'pausado' ? 'Seguir leyendo' : 'Escuchar esta página'}>
        {v.estado === 'hablando' ? 'Pausar' : v.estado === 'pausado' ? 'Seguir' : 'Escuchar'}
      </button>
      {activo && <button className="btn" onClick={detener}>Detener</button>}
      <label className="rep-vel">Velocidad
        <select value={v.velocidad} onChange={(e) => setVelocidad(Number(e.target.value))}>
          {VELOCIDADES.map((x) => <option key={x} value={x}>{x}×</option>)}
        </select>
      </label>
      <label className="rep-cont"><input type="checkbox" checked={v.continuo} onChange={(e) => setContinuo(e.target.checked)} /> Seguir con la lección siguiente</label>
      {activo && <progress className="rep-barra" value={pct} max={100} aria-label="Avance de la lectura">{pct}%</progress>}
    </section>
  )
}

const estadoLector = () => { const s = (globalThis as unknown as { speechSynthesis?: SpeechSynthesis }).speechSynthesis; return !!s && (s.speaking || s.paused) }
