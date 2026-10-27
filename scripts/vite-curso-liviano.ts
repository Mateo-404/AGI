import type { Plugin } from 'vite'
import { listaMaterias, materias } from '../contenido/materias'
import type { Materia } from '../contenido/tipos'

/**
 * En el navegador, `contenido/materias` se reemplaza por una versión liviana: metadatos, preguntas y tarjetas,
 * sin el cuerpo de las lecciones. El cuerpo se dibuja en el build como HTML estático (src/componentes/LeccionEstatica.astro),
 * así que no hace falta mandarlo como JavaScript. En el servidor y en las pruebas se usa el módulo completo.
 */
const ID = '\0virtual:materias-livianas'

const liviana = (m: Materia): Materia => ({
  ...m,
  lecciones: m.lecciones.map((l) => ({
    id: l.id, unidad: l.unidad, titulo: l.titulo, resumen: l.resumen, minutos: l.minutos,
    objetivos: [], previos: [], bloques: [], claves: [], sintesis: [], conexiones: [], referencias: [],
    preguntas: l.preguntas, tarjetas: l.tarjetas,
  })),
})

export function cursoLiviano(): Plugin {
  return {
    name: 'curso-liviano',
    enforce: 'pre',
    resolveId(origen) {
      if (this.environment?.name === 'client' && /contenido\/materias$/.test(origen)) return ID
      return undefined
    },
    load(id) {
      if (id !== ID) return undefined
      const datos = Object.fromEntries(Object.entries(materias).map(([slug, m]) => [slug, liviana(m)]))
      return [
        `export const materias = ${JSON.stringify(datos)}`,
        `export const listaMaterias = ${JSON.stringify(listaMaterias)}`,
        `export const materiaDe = (slug) => materias[slug] ?? materias.marketing`,
      ].join('\n')
    },
  }
}
