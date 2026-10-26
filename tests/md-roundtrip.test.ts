import { describe, expect, test } from 'bun:test'
import { lecciones } from '../contenido/marketing/indice'
import { parsearLeccion } from '../src/logica/mdLeccion'
import { serializarLeccion } from '../scripts/ts-a-md'

/** Ida y vuelta: TypeScript → Markdown → lección. No puede perder ni cambiar nada. */
describe('lecciones en Markdown', () => {
  for (const l of lecciones)
    test(`${l.id}: Markdown ↔ TypeScript sin pérdidas`, () => {
      const { md, practica } = serializarLeccion(l)
      expect(parsearLeccion(md, practica)).toEqual(l)
    })
})
