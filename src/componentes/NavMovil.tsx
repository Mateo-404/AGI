import { useEffect, useState } from 'react'
import { useMateria } from './contextoMateria'
import { clasificarGesto, direccionEnCurso, objetivoExcluido, RECORRIDO, vibrar, type Direccion } from '@/logica/gestos'
import { irA } from '@/logica/navegar'
import { rutaMateria } from '@/logica/rutas'
import { Icono } from './Icono'

/**
 * Navegación pensada para el pulgar (≤ 880 px):
 * - barra inferior: Menú · Anterior · Practicar · Siguiente;
 * - deslizar en la lección: a la izquierda va a la siguiente, a la derecha a la anterior (con un aviso mientras el dedo se mueve);
 * - el menú lateral se cierra arrastrándolo a la izquierda, tocando el fondo o con Escape.
 * Los gestos son un atajo: cada uno tiene su botón en pantalla. La lógica de qué cuenta como gesto está en src/logica/gestos.ts.
 */
export function NavMovil({ actual, menu, setMenu }: { actual?: string; menu: boolean; setMenu: (v: boolean) => void }) {
  const m = useMateria()
  const ant = actual ? m.anterior(actual) : undefined
  const sig = actual ? m.siguiente(actual) : undefined
  const [pista, setPista] = useState<{ lado: Direccion; titulo: string } | null>(null)

  // Deslizar en el contenido de una lección.
  useEffect(() => {
    if (!actual) return
    const destino = (d: Direccion) => (d === 'izquierda' ? sig : ant)
    let ini: { x: number; y: number; t: number } | null = null
    const alIniciar = (e: TouchEvent) => {
      const c = e.touches[0]
      const valido = e.touches.length === 1 && c && !objetivoExcluido(e.target as Element) && !document.getSelection()?.toString()
      ini = valido ? { x: c.clientX, y: c.clientY, t: e.timeStamp } : null
    }
    const alMover = (e: TouchEvent) => {
      const c = e.touches[0]
      if (!ini || !c) return
      const d = direccionEnCurso(c.clientX - ini.x, c.clientY - ini.y)
      const l = d && destino(d)
      setPista(d && l ? { lado: d, titulo: l.titulo } : null)
    }
    const alTerminar = (e: TouchEvent) => {
      const c = e.changedTouches[0]
      const i = ini
      ini = null
      setPista(null)
      if (!i || !c) return
      const d = clasificarGesto({ dx: c.clientX - i.x, dy: c.clientY - i.y, dt: e.timeStamp - i.t, x0: i.x, ancho: innerWidth })
      const l = d && destino(d)
      if (l) { vibrar(); irA(rutaMateria(m.slug, `leccion/${l.id}`)) }
    }
    const alCancelar = () => { ini = null; setPista(null) }
    addEventListener('touchstart', alIniciar, { passive: true })
    addEventListener('touchmove', alMover, { passive: true })
    addEventListener('touchend', alTerminar, { passive: true })
    addEventListener('touchcancel', alCancelar, { passive: true })
    return () => {
      removeEventListener('touchstart', alIniciar)
      removeEventListener('touchmove', alMover)
      removeEventListener('touchend', alTerminar)
      removeEventListener('touchcancel', alCancelar)
    }
  }, [actual, ant, sig, m.slug])

  // Menú lateral: arrastrar hacia la izquierda para cerrar, y Escape.
  useEffect(() => {
    if (!menu) return
    const nav = document.getElementById('nav')
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    addEventListener('keydown', esc)
    if (!nav) return () => removeEventListener('keydown', esc)
    let x0 = 0, y0 = 0, dx = 0, arrastra = false
    const alIniciar = (e: TouchEvent) => { const c = e.touches[0]!; x0 = c.clientX; y0 = c.clientY; dx = 0; arrastra = false }
    const alMover = (e: TouchEvent) => {
      const c = e.touches[0]!
      const x = c.clientX - x0, y = c.clientY - y0
      if (!arrastra && (x >= 0 || Math.abs(x) < 10 || Math.abs(x) < Math.abs(y))) return
      arrastra = true
      dx = Math.min(0, x)
      nav.style.transition = 'none'
      nav.style.transform = `translateX(${dx}px)`
    }
    const alTerminar = () => {
      nav.style.transition = ''
      nav.style.transform = ''
      if (arrastra && dx < -RECORRIDO) { vibrar(); setMenu(false) }
      arrastra = false
    }
    nav.addEventListener('touchstart', alIniciar, { passive: true })
    nav.addEventListener('touchmove', alMover, { passive: true })
    nav.addEventListener('touchend', alTerminar, { passive: true })
    nav.addEventListener('touchcancel', alTerminar, { passive: true })
    return () => {
      removeEventListener('keydown', esc)
      nav.removeEventListener('touchstart', alIniciar)
      nav.removeEventListener('touchmove', alMover)
      nav.removeEventListener('touchend', alTerminar)
      nav.removeEventListener('touchcancel', alTerminar)
      nav.style.transition = ''
      nav.style.transform = ''
    }
  }, [menu, setMenu])

  // La barra se esconde al bajar y reaparece al subir: la clase en <html> también acomoda el botón de audio.
  useEffect(() => {
    let ultimo = scrollY
    const alScroll = () => {
      const y = scrollY
      if (Math.abs(y - ultimo) < 8) return
      document.documentElement.classList.toggle('barra-oculta', y > ultimo && y > 120)
      ultimo = y
    }
    addEventListener('scroll', alScroll, { passive: true })
    return () => { removeEventListener('scroll', alScroll); document.documentElement.classList.remove('barra-oculta') }
  }, [])

  const enlace = (href: string | undefined, icono: 'arrow_back' | 'arrow_forward' | 'quiz' | 'home' | 'update', texto: string, etiqueta: string) =>
    href ? <a href={href} aria-label={etiqueta}><Icono nombre={icono} /><span>{texto}</span></a>
         : <span className="inactivo" aria-hidden="true"><Icono nombre={icono} /><span>{texto}</span></span>

  return (
    <>
      <nav className="barra-inf no-print" aria-label="Navegación rápida">
        <button onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav"><Icono nombre={menu ? 'close' : 'menu'} /><span>Menú</span></button>
        {actual ? (
          <>
            {enlace(ant && rutaMateria(m.slug, `leccion/${ant.id}`), 'arrow_back', 'Anterior', ant ? `Lección anterior: ${ant.titulo}` : 'No hay lección anterior')}
            {enlace(rutaMateria(m.slug, `practica/leccion/${actual}`), 'quiz', 'Practicar', 'Practicar esta lección')}
            {enlace(sig && rutaMateria(m.slug, `leccion/${sig.id}`), 'arrow_forward', 'Siguiente', sig ? `Lección siguiente: ${sig.titulo}` : 'No hay lección siguiente')}
          </>
        ) : (
          <>
            {enlace(rutaMateria(m.slug), 'home', 'Inicio', 'Inicio del curso')}
            {enlace(rutaMateria(m.slug, 'practica'), 'quiz', 'Practicar', 'Cuestionarios y simulacro')}
            {enlace(rutaMateria(m.slug, 'repaso'), 'update', 'Repaso', 'Repaso y progreso')}
          </>
        )}
      </nav>
      {pista && (
        <div className={`pista-gesto ${pista.lado}`} aria-hidden="true">
          {pista.lado === 'derecha' && <Icono nombre="arrow_back" />}
          <span>{pista.titulo}</span>
          {pista.lado === 'izquierda' && <Icono nombre="arrow_forward" />}
        </div>
      )}
    </>
  )
}
