import { ICONOS, type NombreIcono } from './iconos'

/** Icono de Material Symbols en línea. Hereda color y tamaño (1em) y es decorativo salvo que se indique etiqueta. */
export function Icono({ nombre, etiqueta, className = '' }: { nombre: NombreIcono; etiqueta?: string; className?: string }) {
  return (
    <svg
      className={`icono ${className}`}
      viewBox="0 -960 960 960"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden={etiqueta ? undefined : true}
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONOS[nombre] }}
    />
  )
}
