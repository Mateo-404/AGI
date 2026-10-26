import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'

/** Une dist/ en UN solo archivo HTML (JS y CSS en línea): se copia al teléfono y funciona sin conexión. */
const dist = new URL('../dist/', import.meta.url).pathname
const assets = readdirSync(dist + 'assets')
const css = readFileSync(dist + 'assets/' + assets.find((f) => f.endsWith('.css'))!, 'utf8')
const js = readFileSync(dist + 'assets/' + assets.find((f) => f.endsWith('.js'))!, 'utf8').replace(/<\/script/gi, '<\\/script')
let html = readFileSync(dist + 'index.html', 'utf8')
html = html.replace(/<script type="module"[^>]*><\/script>/, '').replace(/<link rel="stylesheet"[^>]*>/, '')
// Reemplazo con función: el JS contiene `$&`, `$'` etc. que String.replace interpretaría.
html = html.replace('</head>', () => `<style>${css}</style></head>`).replace('</body>', () => `<script type="module">${js}</script></body>`)
mkdirSync(new URL('../materiales/', import.meta.url).pathname, { recursive: true })
const out = new URL('../materiales/curso-marketing-digital.html', import.meta.url).pathname
writeFileSync(out, html)
console.log(`OK ${out} (${(html.length / 1024).toFixed(0)} KB)`)
