import { navigate } from 'astro:transitions/client'

/** Va a otra página del sitio con la transición del enrutador de Astro (sin recargar: el estado, como la voz, sobrevive). */
export const irA = (href: string): void => { void navigate(href) }
