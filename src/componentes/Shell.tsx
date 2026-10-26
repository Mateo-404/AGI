import { Component, useEffect, useState, type ReactNode } from 'react'
import { ruta } from '@/logica/rutas'
import { Icono } from './Icono'
import { lecciones, leccionesDe, siguienteLeccion, unidades } from '@/logica/datos'
import { setTamano, setTema, useProgreso } from '@/logica/progreso'
import { AcercaPag, CoberturaPag, GlosarioPag, Inicio, LeccionPag, NoEncontrado, Practica, RepasoPag, TarjetasPag, UnidadPag } from './Paginas'
import { AgiInicio } from './AgiInicio'
import { Reproductor } from './Reproductor'
import { Instalar } from './Instalar'
import { NavMovil } from './NavMovil'

class Limite extends Component<{ children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {}
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error)
      return <div className="aviso" role="alert"><b>Algo salió mal al mostrar esta página.</b> <a href={ruta('marketing/')}>Volver al curso</a><pre>{this.state.error.message}</pre></div>
    return this.props.children
  }
}

function PaginaCurso({ ruta, children }: { ruta: string[]; children?: ReactNode }) {
  const [a, b, c] = ruta
  switch (a) {
    case undefined: return <Inicio />
    case 'unidad': return <UnidadPag n={Number(b)} />
    case 'leccion': return <LeccionPag id={b ?? ''}>{children}</LeccionPag>
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
  const iconoTema = p.tema === 'auto' ? 'brightness_auto' : p.tema === 'oscuro' ? 'dark_mode' : 'light_mode'
  const tamanos: [Parameters<typeof setTamano>[0], string][] = [['normal', 'A'], ['grande', 'A+'], ['muy-grande', 'A++']]
  return (
    <div className="barra-sup no-print">
      <a className="marca-sup" href={ruta()}>Somos #AGI</a>
      <a className="marca-sup" href={ruta('marketing/')}>Marketing Digital</a>
      <span className="empuja" />
      <div className="ajustes" role="group" aria-label="Tamaño de letra">
        {tamanos.map(([t, txt]) => (
          <button key={t} className="btn sm" aria-pressed={p.tamano === t} onClick={() => setTamano(t)} aria-label={`Tamaño de letra ${t}`}>{txt}</button>
        ))}
      </div>
      <button className="btn sm" onClick={ciclo} aria-label={`Tema: ${etiqueta}. Cambiar`}><Icono nombre={iconoTema} /> {etiqueta}</button>
    </div>
  )
}

export function Shell({ sub, enCurso, children }: { sub: string[]; enCurso: boolean; children?: ReactNode }) {
  const p = useProgreso()
  const [menu, setMenu] = useState(false)
  useEffect(() => setMenu(false), [sub.join('/')])
  useEffect(() => {
    document.documentElement.dataset.tema = p.tema
    document.documentElement.classList.remove('tamano-grande', 'tamano-muy-grande')
    if (p.tamano !== 'normal') document.documentElement.classList.add(`tamano-${p.tamano}`)
  }, [p.tema, p.tamano])
  const actual = sub[0] === 'leccion' ? sub[1] : undefined
  const unidadActual = sub[0] === 'unidad' ? Number(sub[1]) : actual ? lecciones.find((l) => l.id === actual)?.unidad : undefined
  const sig = actual ? siguienteLeccion(actual) : undefined
  const hrefSig = sig ? ruta(`marketing/leccion/${sig.id}`) : undefined
  const cur = (cond: boolean) => (cond ? 'page' : undefined)

  if (!enCurso)
    return (
      <>
        <a className="saltar" href="#principal">Saltar al contenido</a>
        <Barra />
        <Instalar />
        <main id="principal" className="cont" tabIndex={-1}><Limite><AgiInicio /></Limite></main>
      </>
    )

  return (
    <>
      <a className="saltar" href="#principal">Saltar al contenido</a>
      <Barra />
      <Instalar />
      <NavMovil actual={actual} menu={menu} setMenu={setMenu} />
      <div className="topbar no-print">
        <button className="btn sm" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}><Icono nombre={menu ? 'close' : 'menu'} /> Menú</button>
        <b style={{ fontFamily: 'var(--serif)' }}>Marketing Digital</b>
      </div>
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
      <div className="app">
        <nav id="nav" className={`nav ${menu ? 'abierto' : ''}`} aria-label="Navegación del curso">
          <a className="marca" href={ruta('marketing/')}><span className="logo" aria-hidden>M</span><span>Marketing Digital<br /><small style={{ fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--ink2)' }}>Somos #AGI · UNRaf</small></span></a>
          <h2>Estudiar</h2>
          {unidades.map((u) => (
            <details key={u.n} open={unidadActual === u.n}>
              <summary>Unidad {u.n} · {u.titulo}</summary>
              <div className="sub">
                {leccionesDe(u.n).map((l) => (
                  <a key={l.id} className="item" href={ruta(`marketing/leccion/${l.id}`)} aria-current={cur(actual === l.id)}>
                    <i className={`punto ${p.vistas[l.id] ? 'p2' : ''}`} aria-hidden /> <span>{l.titulo}</span>
                  </a>
                ))}
              </div>
            </details>
          ))}
          <h2>Practicar</h2>
          <a className="item" href={ruta('marketing/practica')} aria-current={cur(sub[0] === 'practica')}><Icono nombre="quiz" /> Cuestionarios y simulacro</a>
          <a className="item" href={ruta('marketing/tarjetas')} aria-current={cur(sub[0] === 'tarjetas')}><Icono nombre="style" /> Tarjetas de memoria</a>
          <a className="item" href={ruta('marketing/repaso')} aria-current={cur(sub[0] === 'repaso')}><Icono nombre="update" /> Repaso y progreso</a>
          <h2>Consultar</h2>
          <a className="item" href={ruta('marketing/glosario')} aria-current={cur(sub[0] === 'glosario')}><Icono nombre="spellcheck" /> Glosario</a>
          <a className="item" href={ruta('marketing/cobertura')} aria-current={cur(sub[0] === 'cobertura')}><Icono nombre="fact_check" /> Cobertura del programa</a>
          <a className="item" href={ruta('marketing/acerca')} aria-current={cur(sub[0] === 'acerca')}><Icono nombre="info" /> Fuentes y limitaciones</a>
        </nav>
        <main id="principal" className="cont" tabIndex={-1}>
          <Reproductor tituloPagina={`Marketing Digital · ${sub.join(' ') || 'inicio'}`} siguienteHref={hrefSig} />
          <Limite key={sub.join('/')}><PaginaCurso ruta={sub}>{children}</PaginaCurso></Limite>
        </main>
      </div>
    </>
  )
}
