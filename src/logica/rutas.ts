import { materias } from '@contenido/materias'

/** Base del sitio: `/AGI/` en GitHub Pages, `/` en pruebas. Vite la inyecta en `import.meta.env.BASE_URL`. */
const entorno = (import.meta as unknown as { env?: { BASE_URL?: string } }).env
const BASE = (entorno?.BASE_URL ?? '/').replace(/\/?$/, '/')

/** URL absoluta dentro del sitio, sin barra final: `ruta('marketing/leccion/l2-1')` → `/AGI/marketing/leccion/l2-1`. La raíz es `/AGI`. */
export function ruta(p = ''): string {
  const limpio = p.replace(/^\/+|\/+$/g, '')
  if (limpio) return `${BASE}${limpio}`
  return BASE.length > 1 ? BASE.slice(0, -1) : BASE
}

/** URL de una ruta dentro de una materia: `rutaMateria('gestion-ventas', 'leccion/gv-l1-1')`. */
export function rutaMateria(materia: string, p = ''): string {
  const limpio = p.replace(/^\/+|\/+$/g, '')
  return ruta(limpio ? `${materia}/${limpio}` : materia)
}

/** Todas las rutas del curso de una materia (relativas a `materia/`), para generar las páginas estáticas. */
export function rutasCurso(materia = 'marketing'): string[] {
  const m = materias[materia]
  if (!m) return []
  return [
    '',
    ...m.unidades.map((u) => `unidad/${u.n}`),
    ...m.lecciones.map((l) => `leccion/${l.id}`),
    'practica', 'practica/simulacro', 'practica/errores',
    ...m.unidades.map((u) => `practica/unidad/${u.n}`),
    ...m.lecciones.map((l) => `practica/leccion/${l.id}`),
    'tarjetas', ...m.lecciones.map((l) => `tarjetas/${l.id}`),
    'repaso', 'glosario', 'cobertura', 'acerca',
  ]
}

/** `getStaticPaths` de una materia: una página HTML real por ruta. */
export function paginasDe(materia: string) {
  return rutasCurso(materia).map((r) => ({ params: { ruta: r || undefined }, props: { sub: r ? r.split('/') : [] } }))
}

/** URL de un archivo estático (sin barra final): `archivo('media/lottie/seo.json')`. */
export function archivo(p: string): string {
  return `${BASE}${p.replace(/^\/+/, '')}`
}
