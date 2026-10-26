import type { APIRoute } from 'astro'

/** Manifiesto de la app instalable. Usa la base del sitio (`/AGI/`) para que los iconos y las rutas funcionen en GitHub Pages. */
export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
  const manifiesto = {
    id: base,
    name: 'Somos #AGI · Proyecto personal',
    short_name: 'Somos #AGI',
    description: 'Curso interactivo de Marketing Digital y proyecto personal de la Licenciatura en Administración y Gestión de la Información (UNRaf). No es un sitio oficial.',
    lang: 'es-AR',
    dir: 'ltr',
    start_url: base,
    scope: base,
    display: 'standalone',
    background_color: '#f4efe6',
    theme_color: '#b5480c',
    icons: [
      { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
      { src: `${base}icons/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
  return new Response(JSON.stringify(manifiesto, null, 2), { headers: { 'Content-Type': 'application/manifest+json' } })
}
