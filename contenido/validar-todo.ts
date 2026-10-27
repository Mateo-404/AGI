import { materias } from './materias'
import { validarMateria } from './validar'

/** Valida todas las materias registradas (lo usan el verificador y las pruebas). */
export function validarContenido(): string[] {
  return Object.values(materias).flatMap(validarMateria)
}
