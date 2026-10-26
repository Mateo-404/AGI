import { Component, useEffect, useState, type ReactNode } from 'react'
import { lecciones, leccionesDe, unidades } from '@/logica/datos'
import { setTema, useProgreso } from '@/logica/progreso'
import { AcercaPag, CoberturaPag, GlosarioPag, Inicio, LeccionPag, NoEncontrado, Practica, RepasoPag, TarjetasPag, UnidadPag } from './componentes/Paginas'

function useRuta(): string[] {
  const leer = () => (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean)
  const [r, setR] = useState(leer)
  useEffect(() => {
    const f = () => { setR(leer()); window.scrollTo(0, 0); document.getElementById('principal')?.focus() }
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return r
}

class Limite extends Component<{ children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {}
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error)
      return <div className="aviso" role="alert"><b>Algo salió mal al mostrar esta página.</b> <a href="#/">Volver al inicio</a><pre>{this.state.error.message}</pre></div>
    return this.props.children
  }
}

function Pagina({ ruta }: { ruta: string[] }) {
  const [a, b, c] = ruta
  switch (a) {
    case undefined: return <Inicio />
    case 'unidad': return <UnidadPag n={Number(b)} />
    case 'leccion': return <LeccionPag id={b ?? ''} />
    case 'practica': return <Practica alcance={b} ref_={c} />
    case 'tarjetas': return <TarjetasPag lec={b} />
    case 'repaso': return <RepasoPag />
    case 'glosario': return <GlosarioPag foco={b} />
    case 'cobertura': return <CoberturaPag />
    case 'acerca': return <AcercaPag />
    default: return <NoEncontrado />
  }
}

function BarraLectura() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const f = () => { const h = document.documentElement; setW(h.scrollHeight - innerHeight > 0 ? (scrollY / (h.scrollHeight - innerHeight)) * 100 : 0) }
    addEventListener('scroll', f, { passive: true }); f()
    return () => removeEventListener('scroll', f)
  }, [])
  return <div className="lectura no-print" style={{ width: `${w}%` }} aria-hidden />
}

export function App() {
  const ruta = useRuta()
  const p = useProgreso()
  const [menu, setMenu] = useState(false)
  useEffect(() => setMenu(false), [ruta.join('/')])
  useEffect(() => { document.documentElement.dataset.tema = p.tema }, [p.tema])
  const actual = ruta[0] === 'leccion' ? ruta[1] : undefined
  const unidadActual = ruta[0] === 'unidad' ? Number(ruta[1]) : actual ? lecciones.find((l) => l.id === actual)?.unidad : undefined
  const ciclo = () => setTema(p.tema === 'auto' ? 'oscuro' : p.tema === 'oscuro' ? 'claro' : 'auto')
  const cur = (cond: boolean) => (cond ? 'page' : undefined)
  return (
    <>
      <a className="saltar" href="#principal" onClick={(e) => { e.preventDefault(); document.getElementById('principal')?.focus() }}>Saltar al contenido</a>
      <BarraLectura />
      <div className="topbar no-print">
        <button className="btn sm" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}>☰ Menú</button>
        <b style={{ fontFamily: 'var(--serif)' }}>Marketing Digital</b>
      </div>
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
      <div className="app">
        <nav id="nav" className={`nav ${menu ? 'abierto' : ''}`} aria-label="Navegación principal">
          <a className="marca" href="#/"><span className="logo" aria-hidden>M</span><span>Marketing Digital<br /><small style={{ fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--ink2)' }}>UNRaf · CCC AGI 2026</small></span></a>
          <h2>Estudiar</h2>
          {unidades.map((u) => (
            <details key={u.n} open={unidadActual === u.n}>
              <summary>Unidad {u.n} · {u.titulo}</summary>
              <div className="sub">
                {leccionesDe(u.n).map((l) => (
                  <a key={l.id} className="item" href={`#/leccion/${l.id}`} aria-current={cur(actual === l.id)}>
                    <i className={`punto ${p.vistas[l.id] ? 'p2' : ''}`} aria-hidden /> <span>{l.titulo}</span>
                  </a>
                ))}
              </div>
            </details>
          ))}
          <h2>Practicar</h2>
          <a className="item" href="#/practica" aria-current={cur(ruta[0] === 'practica')}>Cuestionarios y simulacro</a>
          <a className="item" href="#/tarjetas" aria-current={cur(ruta[0] === 'tarjetas')}>Tarjetas de memoria</a>
          <a className="item" href="#/repaso" aria-current={cur(ruta[0] === 'repaso')}>Repaso y progreso</a>
          <h2>Consultar</h2>
          <a className="item" href="#/glosario" aria-current={cur(ruta[0] === 'glosario')}>Glosario</a>
          <a className="item" href="#/cobertura" aria-current={cur(ruta[0] === 'cobertura')}>Cobertura del programa</a>
          <a className="item" href="#/acerca" aria-current={cur(ruta[0] === 'acerca')}>Fuentes y limitaciones</a>
          <p style={{ margin: '16px 6px' }}><button className="btn sm" onClick={ciclo}>Tema: {p.tema === 'auto' ? 'automático' : p.tema}</button></p>
        </nav>
        <main id="principal" className="cont" tabIndex={-1}>
          <Limite key={ruta.join('/')}><Pagina ruta={ruta} /></Limite>
        </main>
      </div>
    </>
  )
}
