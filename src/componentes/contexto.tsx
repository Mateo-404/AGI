import { createContext, useContext, type ReactNode } from 'react'
import { inline } from '@/logica/inline'
import { terminoPorId } from '@/logica/datos'

/** true cuando se renderiza el manual imprimible (sin animaciones, todo desplegado). */
export const ImprimirCtx = createContext(false)
export const useImprimir = () => useContext(ImprimirCtx)

/** Texto con marcado en línea y enlaces a glosario/lecciones. */
export const Tx = ({ t }: { t: string }): ReactNode => <>{inline(t, terminoPorId)}</>
