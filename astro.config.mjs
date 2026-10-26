// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cursoLiviano } from './scripts/vite-curso-liviano'

// Sitio estático publicado en GitHub Pages: https://mateo-404.github.io/AGI
const base = '/AGI/'

/**
 * Service worker propio y sin dependencias (ver src/pwa/sw.template.js).
 * Al terminar el build lista todos los archivos generados y los precachea, así el sitio funciona sin conexión.
 */
const sinConexion = () => ({
  name: 'sin-conexion',
  hooks: {
    /** @param {{ dir: URL, logger: { info(m: string): void } }} args */
    'astro:build:done': ({ dir, logger }) => {
      const raiz = fileURLToPath(dir)
      /** @param {string} d @returns {string[]} */
      const listar = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? listar(join(d, n)) : [join(d, n)]))
      const archivos = listar(raiz).filter((f) => !f.endsWith(`${sep}sw.js`)).map((f) => relative(raiz, f).split(sep).join('/')).sort()
      // Las páginas se sirven sin .html: se precachean con la URL limpia (y la del archivo, por si se pide así).
      const urls = archivos.flatMap((a) => {
        if (a === 'index.html') return [base, base.slice(0, -1), `${base}index.html`]
        if (a.endsWith('/index.html')) { const d = a.slice(0, -'/index.html'.length); return [`${base}${d}`, `${base}${a}`] }
        if (a.endsWith('.html')) return [`${base}${a.slice(0, -5)}`, `${base}${a}`]
        return [`${base}${a}`]
      })
      const version = createHash('sha256')
      for (const a of archivos) version.update(a).update(readFileSync(join(raiz, a)))
      const plantilla = readFileSync(new URL('./src/pwa/sw.template.js', import.meta.url), 'utf8')
      const sw = plantilla
        .replace('const VERSION = __VERSION__', `const VERSION = ${JSON.stringify(`agi-${version.digest('hex').slice(0, 12)}`)}`)
        .replace('const BASE = __BASE__', `const BASE = ${JSON.stringify(base)}`)
        .replace('const PRECACHE = __PRECACHE__', `const PRECACHE = ${JSON.stringify([...new Set(urls)])}`)
      writeFileSync(join(raiz, 'sw.js'), sw)
      logger.info(`service worker: ${new Set(urls).size} URLs precacheadas`)
    },
  },
})

export default defineConfig({
  site: 'https://mateo-404.github.io',
  base,
  output: 'static',
  trailingSlash: 'never',
  integrations: [react(), sinConexion()],
  build: { format: 'file' },
  vite: { plugins: [cursoLiviano()], resolve: { alias: { '@contenido': new URL('./contenido', import.meta.url).pathname, '@': new URL('./src', import.meta.url).pathname } } },
})
