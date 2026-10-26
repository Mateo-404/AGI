import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Leccion } from './tipos'
import { parsearLeccion } from '../src/logica/mdLeccion'

/**
 * Lee las lecciones de una materia: `contenido/<materia>/lecciones/lN-M.md` (apunte) y `lN-M.practica.yaml` (preguntas y tarjetas).
 * Solo corre en el servidor (build, pruebas, scripts): el navegador recibe una versión liviana (ver scripts/vite-curso-liviano.ts).
 */

const orden = (a: string, b: string): number => {
  const [ua, na] = a.match(/\d+/g)!.map(Number)
  const [ub, nb] = b.match(/\d+/g)!.map(Number)
  return ua! - ub! || na! - nb!
}

/** Relativa al proyecto, no al módulo: el build empaqueta este archivo en dist/.prerender/ y `import.meta.url` dejaría de apuntar acá. */
export function cargarLecciones(materia: string): Leccion[] {
  const carpeta = join(process.cwd(), 'contenido', materia, 'lecciones')
  return readdirSync(carpeta)
    .filter((f) => /^l\d+-\d+\.md$/.test(f))
    .sort(orden)
    .map((f) => {
      const practica = join(carpeta, f.replace(/\.md$/, '.practica.yaml'))
      return parsearLeccion(readFileSync(join(carpeta, f), 'utf8'), existsSync(practica) ? readFileSync(practica, 'utf8') : '')
    })
}
