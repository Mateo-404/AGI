import { createContext, useContext, type ReactNode } from 'react'
import { datosDe, marketing, type DatosMateria } from '@/logica/datos'

/** Materia que se está mostrando. Marketing es el valor por defecto para no romper el manual ni los usos aislados. */
export const MateriaCtx = createContext<DatosMateria>(marketing)

export const MateriaProvider = MateriaCtx.Provider

export const useMateria = (): DatosMateria => useContext(MateriaCtx)

/** Datos de la materia pedida, o los del contexto si no se especifica. */
export const materiaONo = (slug: string | undefined, porDefecto: DatosMateria): DatosMateria => (slug ? datosDe(slug) : porDefecto)

/**
 * Aísla un subárbol en la materia indicada. Hace falta porque cada isla de React y cada componente de Astro
 * se hidrata por separado: el contexto del `Shell` no cruza esa frontera.
 */
export function MateriaScope({ materia, children }: { materia?: string; children: ReactNode }) {
  const actual = useMateria()
  return <MateriaProvider value={materiaONo(materia, actual)}>{children}</MateriaProvider>
}
