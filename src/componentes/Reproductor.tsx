import { useEffect, useRef, useState, type PointerEvent as PE } from 'react'
import { Icono } from './Icono'
import { irA } from '@/logica/navegar'
import { alternar, alTerminarCapitulo, detener, reproducir, setContinuo, setVelocidad, tomarPendienteContinuo, useVoz } from '@/logica/voz'

const VELOCIDADES = [0.8, 1, 1.25, 1.5]

/** Icono circular fijo abajo a la derecha. Al tocarlo se abren las opciones de lectura en voz alta. */
export function Reproductor({ tituloPagina, siguienteHref }: { tituloPagina: string; siguienteHref?: string }) {
  const v = useVoz()
  const [montado, setMontado] = useState(false)
  const [abierto, setAbierto] = useState(false)
  useEffect(() => setMontado(true), [])
  useEffect(() => {
    alTerminarCapitulo(() => { if (siguienteHref) irA(siguienteHref) })
    // Modo continuo: si el capítulo anterior terminó con la opción activa, leer la lección nueva.
    const t = tomarPendienteContinuo() ? setTimeout(() => {
      const el = document.getElementById('principal')
      if (el) reproducir(el, document.title)
    }, 900) : undefined
    return () => { alTerminarCapitulo(() => {}); if (t) clearTimeout(t) }
  }, [siguienteHref])
  useEffect(() => { setAbierto(false) }, [tituloPagina])
  // Posición arrastrable: se guarda en el navegador (clave aparte del progreso).
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const arrastre = useRef<{ x0: number; y0: number; px: number; py: number; movio: boolean } | null>(null)
  useEffect(() => {
    try { const g = JSON.parse(localStorage.getItem('mkt-voz-pos') || 'null'); if (g && typeof g.x === 'number') setPos(g) } catch { /* sin almacenamiento */ }
  }, [])
  const limitar = (x: number, y: number) => {
    const w = 56, m = 8
    return { x: Math.min(Math.max(m, x), innerWidth - w - m), y: Math.min(Math.max(m, y), innerHeight - w - m) }
  }
  const alBajar = (e: PE<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    arrastre.current = { x0: e.clientX, y0: e.clientY, px: r.left, py: r.top, movio: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const alMover = (e: PE<HTMLButtonElement>) => {
    const a = arrastre.current
    if (!a) return
    const dx = e.clientX - a.x0, dy = e.clientY - a.y0
    if (!a.movio && Math.hypot(dx, dy) < 6) return
    a.movio = true
    setPos(limitar(a.px + dx, a.py + dy))
  }
  const alSoltar = () => {
    const a = arrastre.current
    arrastre.current = null
    if (a?.movio) {
      setPos((p) => { if (p) try { localStorage.setItem('mkt-voz-pos', JSON.stringify(p)) } catch { /* ignorar */ } return p })
    } else setAbierto((o) => !o)
  }

  useEffect(() => () => detener(), [])

  const leer = () => {
    const el = document.getElementById('principal')
    if (el) alternar(el, tituloPagina)
  }
  const activo = v.estado !== 'parado'
  const pct = v.fragmentos.length ? Math.round((v.indice / v.fragmentos.length) * 100) : 0
  const icono = v.estado === 'hablando' ? 'graphic_eq' : v.estado === 'pausado' ? 'pause' : 'volume_up'
  const estadoTexto = v.estado === 'hablando' ? 'Leyendo' : v.estado === 'pausado' ? 'En pausa' : 'Listo para escuchar'

  if (montado && !v.soportada) return null
  return (
    <div className={`voz no-print ${pos ? 'libre' : ''}`} style={pos ? { left: pos.x, top: pos.y, flexDirection: pos.y < innerHeight / 2 ? 'column-reverse' : 'column' } : undefined}>
      {abierto && (
        <section className="voz-panel" aria-label="Opciones de lectura en voz alta">
          <div className="voz-cab">
            <span className={`voz-punto ${v.estado}`} aria-hidden="true"><Icono nombre={icono} /></span>
            <div className="voz-cab-txt">
              <p className="voz-titulo">{tituloPagina}</p>
              <p className="voz-sub">{estadoTexto}{activo ? ` · ${pct} %` : ''}</p>
            </div>
          </div>
          <progress className="voz-barra" value={pct} max={100} aria-label="Avance de la lectura">{pct}%</progress>
          <div className="voz-fila">
            <button className="btn pri voz-principal" onClick={leer}>
              <Icono nombre={v.estado === 'hablando' ? 'pause' : 'play_arrow'} /> {v.estado === 'hablando' ? 'Pausar' : v.estado === 'pausado' ? 'Seguir' : 'Reproducir'}
            </button>
            <button className="btn" onClick={detener} disabled={!activo}><Icono nombre="stop" /> Detener</button>
          </div>
          <div className="voz-grupo" role="group" aria-label="Velocidad de lectura">
            <span className="voz-etiq">Velocidad</span>
            {VELOCIDADES.map((x) => (
              <button key={x} className="voz-chip" aria-pressed={v.velocidad === x} onClick={() => setVelocidad(x)}>{x}×</button>
            ))}
          </div>
          <label className="voz-op voz-check">
            <input type="checkbox" checked={v.continuo} onChange={(e) => setContinuo(e.target.checked)} /> Seguir con la lección siguiente
          </label>
        </section>
      )}
      <button
        className={`voz-icono ${activo ? 'activo' : ''}`}
        aria-expanded={abierto}
        aria-label={abierto ? 'Cerrar opciones de audio' : activo ? `Opciones de audio: ${estadoTexto.toLowerCase()}` : 'Escuchar esta página'}
        onPointerDown={alBajar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={() => { arrastre.current = null }}
      >
        {activo && (
          <svg className="voz-anillo" viewBox="0 0 36 36" aria-hidden="true">
            <circle className="pista" cx="18" cy="18" r="16" pathLength={100} />
            <circle className="avance" cx="18" cy="18" r="16" pathLength={100} strokeDasharray={`${pct} 100`} />
          </svg>
        )}
        <Icono nombre={icono} />
      </button>
    </div>
  )
}
