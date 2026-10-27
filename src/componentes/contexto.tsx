import { createContext, useContext, type ReactNode } from 'react'
import { inline } from '@/logica/inline'
import { useMateria } from './contextoMateria'

/** true cuando se renderiza el manual imprimible (sin animaciones, todo desplegado). */
export const ImprimirCtx = createContext(false)
export const useImprimir = () => useContext(ImprimirCtx)

/** Texto con marcado en línea y enlaces a glosario/lecciones de la materia actual. */
export const Tx = ({ t }: { t: string }): ReactNode => {
  const m = useMateria()
  return <>{inline(t, m.terminoPorId, m.slug)}</>
}
