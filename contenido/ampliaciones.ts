import type { Ampliacion } from './tipos'

const C = '2026-10-26'

/** Fuentes externas usadas SOLO para temas del programa que el cuaderno no desarrolla. */
export const ampliaciones: Ampliacion[] = [
  { id: 'poem', titulo: 'POEM (Paid, Owned, Earned Media)', fuente: 'Compilación de guías (upGrad, WSCube Tech) y materiales universitarios abiertos', url: 'https://www.upgrad.com/blog/poem-framework-in-digital-marketing/', consultada: C, nota: 'Definición de medios pagos, propios y ganados. No se encontró la página primaria de Chaffey/Smart Insights en la búsqueda; la definición es estándar pero conviene contrastarla con Chaffey y Ellis-Chadwick (2015), bibliografía del programa.' },
  { id: 'remarketing', titulo: 'Remarketing', fuente: 'Google Analytics Help — Introduction to remarketing', url: 'https://support.google.com/analytics/answer/7166025?hl=en_US', consultada: C, nota: 'Definición: llegar con anuncios a quienes ya visitaron el sitio o app, mediante audiencias.' },
  { id: 'zmot', titulo: 'ZMOT — Zero Moment of Truth', fuente: 'Lecinski (2011), «Winning the Zero Moment of Truth», Google (Think with Google)', url: 'https://thinkwithgoogle.com/_qs/documents/673/2011-winning-zmot-ebook_research-studies.pdf', consultada: C, nota: 'El momento en que la persona investiga online antes de comprar. Es bibliografía obligatoria del programa (U3); el curso solo ofrece una síntesis conceptual.' },
  { id: 'messy', titulo: 'Messy Middle: año de publicación', fuente: 'WARC (caso de estudio Google × The Behavioural Architects)', url: 'https://cdn.warc.com/content/article/google-decoding-decisions--making-sense-of-the-messy-middle/en-gb/134965', consultada: C, nota: 'No se pudo confirmar en una fuente primaria el año que cita el cuaderno (2019); los textos secundarios consultados lo sitúan hacia 2020. Dato a verificar.' },
  { id: 'cpl', titulo: 'Costo por lead (CPL), m-commerce, medios de pago, logística, Martech, storytelling, marketing relacional, e-branding', fuente: 'Explicación didáctica propia (sin fuente externa verificada)', url: '', consultada: C, nota: 'En estos temas el curso ofrece solo una explicación didáctica etiquetada como tal, sin atribuir afirmaciones a la cátedra ni a terceros. Requieren la bibliografía del programa (Chaffey, Kotler, Maciá, CACE).' },
]
