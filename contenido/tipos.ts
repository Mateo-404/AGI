/** Modelo de datos del curso. El contenido (contenido/) es independiente de los componentes (src/). */

/** De dónde sale una afirmación: evita atribuir a la cátedra lo que no dice. */
export type Origen =
  | { tipo: 'cuaderno'; cap: string; pag?: string; sec?: string }
  | { tipo: 'didactico' }
  | { tipo: 'ampliacion'; ref: string }

export type TipoCallout = 'clave' | 'ojo' | 'ia' | 'ampliacion' | 'discrepancia' | 'didactico'

export interface Nodo {
  id: string
  titulo: string
  resumen: string
  detalle: string
}

export type Bloque =
  | { t: 'p'; x: string; o?: Origen }
  | { t: 'h'; x: string }
  | { t: 'def'; termino: string; x: string; o?: Origen }
  | { t: 'lista'; items: string[]; num?: boolean; o?: Origen }
  | { t: 'tabla'; titulo?: string; cab: string[]; filas: string[][]; o?: Origen }
  | { t: 'callout'; tipo: TipoCallout; titulo?: string; x: string; o?: Origen }
  | { t: 'ejemplo'; titulo: string; pasos: string[]; o?: Origen }
  | { t: 'acordeon'; titulo: string; bloques: Bloque[] }
  | { t: 'comparar'; titulo?: string; a: { titulo: string; items: string[] }; b: { titulo: string; items: string[] }; o?: Origen }
  | { t: 'explorable'; titulo: string; variante: 'pasos' | 'capas' | 'embudo' | 'linea'; nodos: Nodo[]; o?: Origen }
  | { t: 'animacion'; archivo: 'seo' | 'marketing-digital'; titulo: string; descripcion: string; credito: string; o?: Origen }
  | { t: 'calc'; tipo: 'metricas' | 'embudo' | 'precio' }
  /** Diagrama Mermaid: se dibuja en el build como SVG (ver src/logica/diagramas.ts). */
  | { t: 'diagrama'; titulo?: string; codigo: string; o?: Origen }
  | { t: 'asociar'; titulo: string; pares: [string, string][] }
  | { t: 'clasificar'; titulo: string; categorias: string[]; items: { x: string; cat: number; porque: string }[] }
  | {
      t: 'caso'
      titulo: string
      escenario: string
      pasos: { pregunta: string; opciones: { x: string; ok: boolean; consecuencia: string }[] }[]
    }

export interface Opcion {
  x: string
  /** Por qué es correcta o incorrecta (se muestra para cada alternativa). */
  porque: string
}

export interface PreguntaMC {
  id: string
  tipo: 'mc'
  tema: string
  dif: 1 | 2 | 3
  enunciado: string
  opciones: Opcion[]
  correcta: number
  o?: Origen
}

export interface PreguntaCorta {
  id: string
  tipo: 'corta'
  tema: string
  dif: 1 | 2 | 3
  enunciado: string
  modelo: string
  criterios: string[]
  o?: Origen
}

export type Pregunta = PreguntaMC | PreguntaCorta

export interface Tarjeta {
  id: string
  f: string
  b: string
}

export interface Leccion {
  id: string
  unidad: number
  titulo: string
  resumen: string
  objetivos: string[]
  previos: string[]
  bloques: Bloque[]
  /** ids del glosario */
  claves: string[]
  preguntas: Pregunta[]
  tarjetas: Tarjeta[]
  sintesis: string[]
  conexiones: string[]
  referencias: Origen[]
  /** minutos estimados de estudio */
  minutos: number
}

export interface Unidad {
  n: number
  titulo: string
  /** Tema del programa 2026 que cubre la unidad. */
  programa: string
  lecturaObligatoria: string
}

export interface TerminoGlosario {
  id: string
  termino: string
  def: string
  lec: string
  rel?: string[]
}

export interface Ampliacion {
  id: string
  titulo: string
  fuente: string
  url: string
  consultada: string
  nota: string
}
