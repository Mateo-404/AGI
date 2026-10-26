import { useSyncExternalStore } from 'react'
import { calificarTarjeta, type EstadoTarjeta, type Intento } from './repaso'

const CLAVE = 'mkt-unraf-2026:progreso:v1'

export interface ResultadoQuiz {
  fecha: string
  alcance: string
  total: number
  aciertos: number
  corregido: number
}

export interface Estado {
  v: 1
  vistas: Record<string, string>
  intentos: Record<string, Intento[]>
  tarjetas: Record<string, EstadoTarjeta>
  quizzes: ResultadoQuiz[]
  tema: 'auto' | 'claro' | 'oscuro'
  tamano: 'normal' | 'grande' | 'muy-grande'
}

const vacio = (): Estado => ({ v: 1, vistas: {}, intentos: {}, tarjetas: {}, quizzes: [], tema: 'oscuro', tamano: 'normal' })

/** Lee y valida. Si el JSON está corrupto o es de otra versión, se parte de cero (sin romper la app). */
export function parsear(raw: string | null): Estado {
  if (!raw) return vacio()
  try {
    const o = JSON.parse(raw) as Partial<Estado>
    if (o.v !== 1 || typeof o.vistas !== 'object' || typeof o.intentos !== 'object') return vacio()
    return { ...vacio(), ...o } as Estado
  } catch {
    return vacio()
  }
}

let persistente = true
let estado: Estado = (() => {
  try {
    return parsear(localStorage.getItem(CLAVE))
  } catch {
    persistente = false
    return vacio()
  }
})()
const oyentes = new Set<() => void>()

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado))
  } catch {
    persistente = false
  }
  oyentes.forEach((f) => f())
}

export const hayPersistencia = () => persistente
export const instantaneo = () => estado
export const useProgreso = (): Estado =>
  useSyncExternalStore(
    (f) => (oyentes.add(f), () => void oyentes.delete(f)),
    () => estado,
    () => estado,
  )

const ahora = () => new Date().toISOString()

export function marcarVista(id: string) {
  if (estado.vistas[id]) return
  estado = { ...estado, vistas: { ...estado.vistas, [id]: ahora() } }
  guardar()
}

export function registrarIntento(preguntaId: string, ok: boolean, sinPista: boolean) {
  const prev = estado.intentos[preguntaId] ?? []
  estado = { ...estado, intentos: { ...estado.intentos, [preguntaId]: [...prev, { fecha: ahora(), ok, sinPista }].slice(-30) } }
  guardar()
}

export function calificar(tarjetaId: string, ok: boolean) {
  estado = { ...estado, tarjetas: { ...estado.tarjetas, [tarjetaId]: calificarTarjeta(estado.tarjetas[tarjetaId], ok, ahora()) } }
  guardar()
}

export function registrarQuiz(r: Omit<ResultadoQuiz, 'fecha'>) {
  estado = { ...estado, quizzes: [...estado.quizzes, { ...r, fecha: ahora() }].slice(-100) }
  guardar()
}

export function setTema(tema: Estado['tema']) {
  estado = { ...estado, tema }
  guardar()
}

export function setTamano(tamano: Estado['tamano']) {
  estado = { ...estado, tamano }
  guardar()
}

export const exportar = (): string => JSON.stringify(estado, null, 2)

export function importar(texto: string): boolean {
  const o = parsear(texto)
  if (o.v !== 1 || texto.trim() === '') return false
  estado = o
  guardar()
  return true
}

export function reiniciar() {
  estado = vacio()
  guardar()
}
