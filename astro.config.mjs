// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Sitio estático publicado en GitHub Pages: https://mateo-404.github.io/AGI/
export default defineConfig({
  site: 'https://mateo-404.github.io',
  base: '/AGI/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  build: { format: 'directory' },
  vite: { resolve: { alias: { '@contenido': new URL('./contenido', import.meta.url).pathname, '@': new URL('./src', import.meta.url).pathname } } },
})
