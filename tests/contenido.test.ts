import { expect, test } from 'bun:test'
import { validarContenido } from '../contenido/validar'

test('el contenido es consistente (ids únicos, enlaces, preguntas, cobertura)', () => {
  expect(validarContenido()).toEqual([])
})
