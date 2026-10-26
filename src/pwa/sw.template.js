/*
 * Service worker de Somos #AGI. Es una plantilla: astro.config.mjs completa las tres constantes
 * de abajo al terminar el build y escribe dist/sw.js.
 *
 * - Al instalar guarda todo el sitio generado (páginas, estilos, scripts, fuentes, iconos, lecciones animadas).
 * - Navegaciones: red primero; si no hay conexión, la copia guardada.
 * - Resto de archivos: desde la copia guardada; si no está, de la red y se guarda.
 */
const VERSION = __VERSION__
const BASE = __BASE__
const PRECACHE = __PRECACHE__

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

const guardar = (req, res) => {
  if (res.ok) caches.open(VERSION).then((c) => c.put(req, res.clone()))
  return res
}

const redPrimero = (req) =>
  fetch(req).then((res) => guardar(req, res)).catch(async () => (await caches.match(req)) || caches.match(`${BASE}404`) || Response.error())

const cachePrimero = (req) =>
  caches.match(req).then((hit) => hit || fetch(req).then((res) => guardar(req, res)))

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return
  e.respondWith(req.mode === 'navigate' ? redPrimero(req) : cachePrimero(req))
})
