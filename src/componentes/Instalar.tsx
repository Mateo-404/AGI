import { useEffect, useState } from 'react'
import { Icono } from './Icono'

/** Evento de Chrome y Edge que ofrece instalar la página como app. No está en los tipos de TypeScript. */
interface EventoInstalar extends Event { prompt(): Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }

/**
 * Instalar el curso como app en el móvil. En Chrome y Edge (Android) aparece un botón que abre el diálogo del navegador.
 * En iPhone y iPad no hay botón: se muestra cómo hacerlo desde Safari. Si ya está instalada, no aparece nada.
 */
export function Instalar() {
  const [evento, setEvento] = useState<EventoInstalar | null>(null)
  const [ios, setIos] = useState(false)
  const [instalada, setInstalada] = useState(true)
  useEffect(() => {
    const standalone = matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
    const safari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS/.test(navigator.userAgent)
    setInstalada(standalone)
    setIos(safari && !standalone)
    const alPedir = (e: Event) => { e.preventDefault(); setEvento(e as EventoInstalar) }
    const alInstalar = () => { setEvento(null); setInstalada(true) }
    addEventListener('beforeinstallprompt', alPedir)
    addEventListener('appinstalled', alInstalar)
    return () => { removeEventListener('beforeinstallprompt', alPedir); removeEventListener('appinstalled', alInstalar) }
  }, [])

  if (instalada) return null
  if (evento) {
    return (
      <div className="instalar no-print">
        <button className="btn sm" onClick={async () => {
          await evento.prompt()
          const { outcome } = await evento.userChoice
          if (outcome === 'accepted') setEvento(null)
        }}><Icono nombre="download" /> Instalar la app</button>
      </div>
    )
  }
  if (ios) {
    return (
      <p className="instalar meta no-print"><Icono nombre="ios_share" /> Para instalar la app: tocá Compartir y después «Agregar a pantalla de inicio».</p>
    )
  }
  return null
}
