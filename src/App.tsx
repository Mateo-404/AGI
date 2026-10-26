import { Component, useEffect, useState, type ReactNode } from 'react'
import { lecciones, leccionesDe, siguienteLeccion, unidades } from '@/logica/datos'
import { setTamano, setTema, useProgreso } from '@/logica/progreso'
import { AcercaPag, CoberturaPag, GlosarioPag, Inicio, LeccionPag, NoEncontrado, Practica, RepasoPag, TarjetasPag, UnidadPag } from './componentes/Paginas'
import { AgiInicio } from './componentes/AgiInicio'
import { Reproductor } from './componentes/Reproductor'

/** Rutas: `#/` es el inicio de AGI; `#/marketing/...` es el curso de Marketing Digital. */
function useRuta(): string[] {
  const leer = () => location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
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
      return <div className="aviso" role="alert"><b>Algo salió mal al mostrar esta página.</b> <a href="#/marketing">Volver al curso</a><pre>{this.state.error.message}</pre></div>
    return this.props.children
  }
}

function PaginaCurso({ ruta }: { ruta: string[] }) {
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

function Barra() {
  const p = useProgreso()
  const ciclo = () => setTema(p.tema === 'auto' ? 'oscuro' : p.tema === 'oscuro' ? 'claro' : 'auto')
  const etiqueta = p.tema === 'auto' ? 'Automático' : p.tema === 'oscuro' ? 'Oscuro' : 'Claro'
  const tamanos: [Parameters<typeof setTamano>[0], string][] = [['normal', 'A'], ['grande', 'A+'], ['muy-grande', 'A++']]
  return (
    <div className="barra-sup no-print">
      <a className="marca-sup" href="#/">Somos #AGI</a>
      <a className="marca-sup" href="#/marketing">Marketing Digital</a>
      <span className="empuja" />
      <div className="ajustes" role="group" aria-label="Tamaño de letra">
        {tamanos.map(([t, txt]) => (
          <button key={t} className="btn sm" aria-pressed={p.tamano === t} onClick={() => setTamano(t)} aria-label={`Tamaño de letra ${t}`}>{txt}</button>
        ))}
      </div>
      <button className="btn sm" onClick={ciclo} aria-label={`Tema: ${etiqueta}. Cambiar`}>Tema: {etiqueta}</button>
    </div>
  )
}

export function App() {
  const ruta = useRuta()
  const p = useProgreso()
  const [menu, setMenu] = useState(false)
  const enCurso = ruta[0] === 'marketing'
  const sub = enCurso ? ruta.slice(1) : []
  useEffect(() => setMenu(false), [ruta.join('/')])
  useEffect(() => {
    document.documentElement.dataset.tema = p.tema
    document.documentElement.classList.remove('tamano-grande', 'tamano-muy-grande')
    if (p.tamano !== 'normal') document.documentElement.classList.add(`tamano-${p.tamano}`)
  }, [p.tema, p.tamano])
  const actual = sub[0] === 'leccion' ? sub[1] : undefined
  const unidadActual = sub[0] === 'unidad' ? Number(sub[1]) : actual ? lecciones.find((l) => l.id === actual)?.unidad : undefined
  const sig = actual ? siguienteLeccion(actual) : undefined
  const cur = (cond: boolean) => (cond ? 'page' : undefined)

  if (!enCurso)
    return (
      <>
        <a className="saltar" href="#principal">Saltar al contenido</a>
        <Barra />
        <main id="principal" className="cont" tabIndex={-1}><Limite><AgiInicio /></Limite></main>
      </>
    )

  return (
    <>
      <a className="saltar" href="#principal">Saltar al contenido</a>
      <Barra />
      <div className="topbar no-print">
        <button className="btn sm" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}>Menú</button>
        <b style={{ fontFamily: 'var(--serif)' }}>Marketing Digital</b>
      </div>
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
      <div className="app">
        <nav id="nav" className={`nav ${menu ? 'abierto' : ''}`} aria-label="Navegación del curso">
          <a className="marca" href="#/marketing"><span className="logo" aria-hidden>M</span><span>Marketing Digital<br /><small style={{ fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--ink2)' }}>Somos #AGI · UNRaf</small></span></a>
          <h2>Estudiar</h2>
          {unidades.map((u) => (
            <details key={u.n} open={unidadActual === u.n}>
              <summary>Unidad {u.n} · {u.titulo}</summary>
              <div className="sub">
                {leccionesDe(u.n).map((l) => (
                  <a key={l.id} className="item" href={`#/marketing/leccion/${l.id}`} aria-current={cur(actual === l.id)}>
                    <i className={`punto ${p.vistas[l.id] ? 'p2' : ''}`} aria-hidden /> <span>{l.titulo}</span>
                  </a>
                ))}
              </div>
            </details>
          ))}
          <h2>Practicar</h2>
          <a className="item" href="#/marketing/practica" aria-current={cur(sub[0] === 'practica')}>Cuestionarios y simulacro</a>
          <a className="item" href="#/marketing/tarjetas" aria-current={cur(sub[0] === 'tarjetas')}>Tarjetas de memoria</a>
          <a className="item" href="#/marketing/repaso" aria-current={cur(sub[0] === 'repaso')}>Repaso y progreso</a>
          <h2>Consultar</h2>
          <a className="item" href="#/marketing/glosario" aria-current={cur(sub[0] === 'glosario')}>Glosario</a>
          <a className="item" href="#/marketing/cobertura" aria-current={cur(sub[0] === 'cobertura')}>Cobertura del programa</a>
          <a className="item" href="#/marketing/acerca" aria-current={cur(sub[0] === 'acerca')}>Fuentes y limitaciones</a>
        </nav>
        <main id="principal" className="cont" tabIndex={-1}>
          <Reproductor tituloPagina={`Marketing Digital · ${sub.join(' ') || 'inicio'}`} siguienteHref={sig ? `#/marketing/leccion/${sig.id}` : undefined} />
          <Limite key={sub.join('/')}><PaginaCurso ruta={sub} /></Limite>
        </main>
      </div>
    </>
  )
}
