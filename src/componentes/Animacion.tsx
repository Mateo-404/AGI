import { useEffect, useRef, useState } from 'react'
import { archivo } from '@/logica/rutas'

/**
 * Animación Lottie (lottie-web, cargada solo cuando la tarjeta entra en pantalla).
 * Con «reducir movimiento» activo se muestra el primer cuadro fijo.
 */
export function Animacion({ archivo: nombre, titulo, descripcion, credito }: { archivo: string; titulo: string; descripcion: string; credito: string }) {
  const contenedor = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = contenedor.current
    if (!el) return
    const obs = new IntersectionObserver((entradas) => { if (entradas.some((e) => e.isIntersecting)) { setVisible(true); obs.disconnect() } }, { rootMargin: '200px' })
    obs.observe(el)
    // Respaldo: si el observador no responde en 2,5 s, se carga igual (la animación sigue siendo liviana).
    const respaldo = setTimeout(() => { setVisible(true); obs.disconnect() }, 2500)
    return () => { obs.disconnect(); clearTimeout(respaldo) }
  }, [])
  useEffect(() => {
    if (!visible || !contenedor.current) return
    let anim: { destroy: () => void } | undefined
    let cancelado = false
    const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches
    import('lottie-web/build/player/lottie_light.min.js').then(async (mod) => {
      const lottie = (mod as unknown as { default: typeof import('lottie-web').default }).default
      if (cancelado || !contenedor.current) return
      const datos = await fetch(archivo(`media/lottie/${nombre}.json`)).then((r) => r.json())
      if (cancelado || !contenedor.current) return
      anim = lottie.loadAnimation({ container: contenedor.current, renderer: 'svg', loop: !reducir, autoplay: !reducir, animationData: datos })
      // Con movimiento reducido se queda en el primer cuadro, sin animar.
      if (reducir) (anim as unknown as { goToAndStop: (f: number, esFrame: boolean) => void }).goToAndStop(0, true)
    })
    return () => { cancelado = true; anim?.destroy() }
  }, [visible, nombre])
  return (
    <figure className="animacion">
      <div ref={contenedor} className="animacion-lienzo" role="img" aria-label={titulo} />
      <figcaption>
        <b>{titulo}.</b> {descripcion} <span className="credito">{credito}</span>
      </figcaption>
    </figure>
  )
}
