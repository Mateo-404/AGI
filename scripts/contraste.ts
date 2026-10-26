/** Verifica contraste WCAG de los pares texto/fondo de la paleta (AA = 4.5:1, AAA = 7:1). */
import { readFileSync } from 'node:fs'
const css = readFileSync(new URL('../src/estilos/global.css', import.meta.url), 'utf8')
const bloque = (sel: string) => css.slice(css.indexOf(sel), css.indexOf('}', css.indexOf(sel)))
const vars = (b: string) => Object.fromEntries([...b.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1]!, m[2]!]))
const lum = (h: string) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! }
const cr = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x! + 0.05) / (y! + 0.05) }
const temas = { claro: vars(bloque(':root {')), oscuro: vars(bloque(':root[data-tema="oscuro"]')) }
const pares: [string, string][] = [['ink', 'bg'], ['ink', 'surf'], ['ink2', 'bg'], ['ink2', 'surf'], ['marca', 'bg'], ['marca', 'surf'], ['clave', 'clave-bg'], ['ojo', 'ojo-bg'], ['ia', 'ia-bg'], ['amp', 'amp-bg'], ['disc', 'disc-bg'], ['did', 'did-bg'], ['ok', 'ok-bg'], ['marca-t', 'marca']]
let fallos = 0
for (const [t, v] of Object.entries(temas)) for (const [a, b] of pares) { const r = cr(v[a]!, v[b]!); const ok = r >= 4.5; if (!ok) fallos++; console.log(`${t.padEnd(6)} ${a.padEnd(8)} / ${b.padEnd(8)} ${r.toFixed(2)} ${ok ? (r >= 7 ? 'AAA' : 'AA') : 'FALLA'}`) }
process.exit(fallos ? 1 : 0)
