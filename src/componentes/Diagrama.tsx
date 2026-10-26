import type { Bloque } from '@contenido/tipos'
import { svgs } from '@/logica/diagramas'

/**
 * Diagrama Mermaid. El SVG se dibuja en el build (src/logica/diagramas-build.ts) y llega aquí listo:
 * en el navegador no se carga Mermaid. Si no hay SVG (pruebas, o falló el render en desarrollo) se muestra el código.
 */
export function Diagrama({ b }: { b: Extract<Bloque, { t: 'diagrama' }> }) {
  const svg = svgs.get(b.codigo)
  return (
    <figure className="diagrama">
      {svg ? <div role="img" aria-label={b.titulo ?? 'Diagrama'} dangerouslySetInnerHTML={{ __html: svg }} /> : <pre className="diagrama-fallo">{b.codigo}</pre>}
      {b.titulo && <figcaption>{b.titulo}</figcaption>}
    </figure>
  )
}
