import { lecciones, unidades } from '@contenido/marketing/indice'

/** Base del sitio: `/AGI/` en GitHub Pages, `/` en pruebas. Vite la inyecta en `import.meta.env.BASE_URL`. */
const entorno = (import.meta as unknown as { env?: { BASE_URL?: string } }).env
const BASE = (entorno?.BASE_URL ?? '/').replace(/\/?$/, '/')

/** URL absoluta dentro del sitio: `ruta('marketing/leccion/l2-1')` → `/AGI/marketing/leccion/l2-1/`. */
export function ruta(p = ''): string {
  const limpio = p.replace(/^\/+|\/+$/g, '')
  return limpio ? `${BASE}${limpio}/` : BASE
}

/** Todas las rutas del curso (relativas a `marketing/`), para generar las páginas estáticas. */
export function rutasCurso(): string[] {
  return [
    '',
    ...unidades.map((u) => `unidad/${u.n}`),
    ...lecciones.map((l) => `leccion/${l.id}`),
    'practica', 'practica/simulacro', 'practica/errores',
    ...unidades.map((u) => `practica/unidad/${u.n}`),
    ...lecciones.map((l) => `practica/leccion/${l.id}`),
    'tarjetas', ...lecciones.map((l) => `tarjetas/${l.id}`),
    'repaso', 'glosario', 'cobertura', 'acerca',
  ]
}

/** URL de un archivo estático (sin barra final): `archivo('media/lottie/seo.json')`. */
export function archivo(p: string): string {
  return `${BASE}${p.replace(/^\/+/, '')}`
}
