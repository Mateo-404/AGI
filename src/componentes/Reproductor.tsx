import { useEffect, useRef, useState, type PointerEvent as PE } from 'react'
import { Icono } from './Icono'
import { alternar, alTerminarCapitulo, detener, reproducir, setContinuo, setVelocidad, tomarPendienteContinuo, textoDeElemento, useVoz } from '@/logica/voz'

const VELOCIDADES = [0.8, 1, 1.25, 1.5]

/** Icono circular fijo abajo a la derecha. Al tocarlo se abren las opciones de lectura en voz alta. */
export function Reproductor({ tituloPagina, siguienteHref }: { tituloPagina: string; siguienteHref?: string }) {
  const v = useVoz()
  const [montado, setMontado] = useState(false)
  const [abierto, setAbierto] = useState(false)
  useEffect(() => setMontado(true), [])
  useEffect(() => {
    alTerminarCapitulo(() => { if (siguienteHref) location.href = siguienteHref })
    // Modo continuo: si el capítulo anterior terminó con la opción activa, leer la lección nueva.
    const t = tomarPendienteContinuo() ? setTimeout(() => {
      const el = document.getElementById('principal')
      if (el) reproducir(textoDeElemento(el), document.title)
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
    if (el) alternar(textoDeElemento(el), tituloPagina)
  }
  const activo = v.estado !== 'parado'
  const pct = v.fragmentos.length ? Math.round((v.indice / v.fragmentos.length) * 100) : 0
  const etiqueta = v.estado === 'hablando' ? 'Pausar lectura' : v.estado === 'pausado' ? 'Seguir leyendo' : 'Escuchar esta página'

  if (montado && !v.soportada) return null
  return (
    <div className={`voz no-print ${pos ? 'libre' : ''}`} style={pos ? { left: pos.x, top: pos.y, flexDirection: pos.y < innerHeight / 2 ? 'column-reverse' : 'column' } : undefined}>
      {abierto && (
        <section className="voz-panel" aria-label="Opciones de lectura en voz alta">
          <p className="voz-titulo">{activo ? tituloPagina : 'Escuchar esta página'}</p>
          <div className="voz-fila">
            <button className="btn pri" onClick={leer}><Icono nombre={v.estado === 'hablando' ? 'pause' : 'play_arrow'} /> {v.estado === 'hablando' ? 'Pausar' : v.estado === 'pausado' ? 'Seguir' : 'Reproducir'}</button>
            {activo && <button className="btn" onClick={detener}><Icono nombre="stop" /> Detener</button>}
          </div>
          {activo && <progress className="voz-barra" value={pct} max={100} aria-label="Avance de la lectura">{pct}%</progress>}
          <label className="voz-op">Velocidad
            <select value={v.velocidad} onChange={(e) => setVelocidad(Number(e.target.value))}>
              {VELOCIDADES.map((x) => <option key={x} value={x}>{x}×</option>)}
            </select>
          </label>
          <label className="voz-op voz-check">
            <input type="checkbox" checked={v.continuo} onChange={(e) => setContinuo(e.target.checked)} /> Seguir con la lección siguiente
          </label>
        </section>
      )}
      <button
        className={`voz-icono ${activo ? 'activo' : ''}`}
        aria-expanded={abierto}
        aria-label={abierto ? 'Cerrar opciones de audio' : etiqueta}
        onPointerDown={alBajar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={() => { arrastre.current = null }}
      >
        {activo && v.estado === 'hablando' ? <Icono nombre="pause" /> : activo ? <Icono nombre="play_arrow" /> : <Icono nombre="volume_up" />}
      </button>
    </div>
  )
}
