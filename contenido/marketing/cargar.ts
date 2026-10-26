import { existsSync, readdirSync, readFileSync } from 'node:fs'
import type { Leccion } from '../tipos'
import { parsearLeccion } from '../../src/logica/mdLeccion'

/**
 * Lee las lecciones de esta carpeta: `lecciones/lN-M.md` (apunte) y `lecciones/lN-M.practica.yaml` (preguntas y tarjetas).
 * Solo corre en el servidor (build, pruebas, scripts): el navegador recibe una versión liviana (ver astro.config.mjs).
 */
const carpeta = new URL('./lecciones/', import.meta.url)

const orden = (a: string, b: string): number => {
  const [ua, na] = a.match(/\d+/g)!.map(Number)
  const [ub, nb] = b.match(/\d+/g)!.map(Number)
  return ua! - ub! || na! - nb!
}

export function cargarLecciones(): Leccion[] {
  return readdirSync(carpeta)
    .filter((f) => /^l\d+-\d+\.md$/.test(f))
    .sort(orden)
    .map((f) => {
      const practica = new URL(f.replace(/\.md$/, '.practica.yaml'), carpeta)
      return parsearLeccion(readFileSync(new URL(f, carpeta), 'utf8'), existsSync(practica) ? readFileSync(practica, 'utf8') : '')
    })
}
