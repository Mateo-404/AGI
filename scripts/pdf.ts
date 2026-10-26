import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

/** Genera los PDF de materiales/ con Chromium/Chrome headless (sin dependencias npm). */
const candidatos = [process.env.CHROME, 'chromium', 'google-chrome', 'chromium-browser'].filter(Boolean) as string[]
const nav = candidatos.find((c) => spawnSync(c, ['--version'], { stdio: 'ignore' }).status === 0)
if (!nav) {
  console.error('No se encontró Chromium/Chrome. Instalalo o definí CHROME=/ruta/al/binario')
  process.exit(1)
}
const dir = new URL('../materiales/', import.meta.url).pathname
for (const n of ['manual-estudio', 'manual-estudio-movil', 'banco-de-preguntas', 'guia-de-repaso', 'glosario']) {
  const r = spawnSync(nav, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${dir}${n}.pdf`, `file://${dir}${n}.html`], { stdio: 'pipe' })
  console.log(existsSync(`${dir}${n}.pdf`) ? `OK  ${n}.pdf` : `ERROR ${n}.pdf\n${r.stderr?.toString()}`)
}
