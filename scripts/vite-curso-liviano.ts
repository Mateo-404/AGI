import type { Plugin } from 'vite'
import { lecciones } from '../contenido/marketing/indice'

/**
 * En el navegador, `contenido/marketing/indice` se reemplaza por una versión liviana: metadatos, preguntas y tarjetas,
 * sin el cuerpo de las lecciones. El cuerpo se dibuja en el build como HTML estático (src/componentes/LeccionEstatica.astro),
 * así que no hace falta mandarlo como JavaScript. En el servidor y en las pruebas se usa el módulo completo.
 */
const ID = '\0virtual:curso-liviano'

export function cursoLiviano(): Plugin {
  const liviano = lecciones.map((l) => ({
    id: l.id, unidad: l.unidad, titulo: l.titulo, resumen: l.resumen, minutos: l.minutos,
    objetivos: [], previos: [], bloques: [], claves: [], sintesis: [], conexiones: [], referencias: [],
    preguntas: l.preguntas, tarjetas: l.tarjetas,
  }))
  return {
    name: 'curso-liviano',
    enforce: 'pre',
    resolveId(origen) {
      if (this.environment?.name === 'client' && /contenido\/marketing\/indice$/.test(origen)) return ID
      return undefined
    },
    load(id) {
      if (id !== ID) return undefined
      return [
        `export const lecciones = ${JSON.stringify(liviano)}`,
        `export { unidades } from '@contenido/marketing/unidades'`,
        `export { glosario } from '@contenido/marketing/glosario'`,
      ].join('\n')
    },
  }
}
