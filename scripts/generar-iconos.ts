/**
 * Genera src/componentes/iconos.ts con los iconos de Material Symbols (Apache-2.0, Google)
 * que usa el sitio. Se ejecuta a mano cuando cambia la lista: `bun run scripts/generar-iconos.ts`.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const NOMBRES = [
  'menu', 'close', 'play_arrow', 'pause', 'stop', 'skip_next', 'volume_up', 'dark_mode', 'light_mode', 'brightness_auto',
  'text_fields', 'school', 'menu_book', 'quiz', 'style', 'spellcheck', 'update', 'fact_check', 'info', 'home', 'link',
  'check_circle', 'cancel', 'lightbulb', 'warning', 'arrow_forward', 'arrow_back', 'schedule', 'open_in_new', 'search',
  'target', 'touch_app', 'timeline', 'campaign', 'mail', 'trending_up', 'shopping_cart', 'record_voice_over', 'podcasts',
  'mark_email_read', 'share', 'person_search', 'graphic_eq', 'download', 'ios_share',
] as const

const base = new URL('../node_modules/@material-symbols/svg-400/rounded/', import.meta.url).pathname
const lineas: string[] = []
const faltan: string[] = []
for (const n of NOMBRES) {
  let svg: string
  try { svg = readFileSync(`${base}${n}.svg`, 'utf8') } catch { faltan.push(n); continue }
  const interior = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim()
  lineas.push(`  ${n}: ${JSON.stringify(interior)},`)
}
if (faltan.length) console.warn('Iconos no encontrados:', faltan.join(', '))
writeFileSync(
  new URL('../src/componentes/iconos.ts', import.meta.url).pathname,
  `// Generado por scripts/generar-iconos.ts a partir de @material-symbols/svg-400 (Apache-2.0, Google). No editar a mano.\n` +
    `export const ICONOS = {\n${lineas.join('\n')}\n} as const\n\nexport type NombreIcono = keyof typeof ICONOS\n`,
)
console.log(`Iconos generados: ${lineas.length}`)
