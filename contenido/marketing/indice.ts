import { cargarLecciones } from '../cargar'
import type { Leccion } from '../tipos'

export { unidades } from './unidades'
export { glosario } from './glosario'
/** Las 30 lecciones, leídas de lecciones/*.md. En el navegador este módulo se reemplaza por una versión liviana (astro.config.mjs). */
export const lecciones: Leccion[] = cargarLecciones('marketing')
