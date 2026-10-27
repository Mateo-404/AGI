import { cargarLecciones } from '../cargar'
import type { Leccion } from '../tipos'

export { unidades } from './unidades'
export { glosario } from './glosario'
/** Las lecciones, leídas de lecciones/*.md. */
export const lecciones: Leccion[] = cargarLecciones('ingenieria-software')
