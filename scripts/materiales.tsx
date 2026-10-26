import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { ampliaciones } from '../contenido/marketing/ampliaciones'
import { cobertura, ESTADOS } from '../contenido/marketing/cobertura'
import { cronograma, confundibles, formulas, iaMapa, integradoras, reglasPrograma, relaciones } from '../contenido/marketing/guia'
import { glosario, lecciones, unidades } from '../contenido/marketing/indice'
import type { Leccion, Pregunta } from '../contenido/tipos'
import { etiquetaOrigen } from '../src/componentes/Bloques'
import { ImprimirCtx, Tx } from '../src/componentes/contexto'
import { LeccionCuerpo } from '../src/componentes/LeccionCuerpo'
import { plano } from '../src/logica/inline'
import { sincronizarDiagramas } from '../src/logica/diagramas-build'

// Los diagramas Mermaid del manual salen de contenido/marketing/diagramas/ (los dibuja `bun run diagramas`).
await sincronizarDiagramas({ estricto: false })

const OUT = new URL('../materiales/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })
const css = readFileSync(new URL('../src/estilos/global.css', import.meta.url), 'utf8')
const fecha = new Date().toISOString().slice(0, 10)

/** Convierte los enlaces hash de la app en anclas internas del documento. */
const anclas = (html: string) => html.replace(/href="#\/leccion\/([\w-]+)"/g, 'href="#$1"').replace(/href="#\/glosario\/([\w-]+)"/g, 'href="#g-$1"').replace(/href="#\/[^"]*"/g, 'href="#"')

const pagina = (titulo: string, cuerpo: string) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${titulo}</title><style>${css}</style></head><body class="manual"><main class="cont">${anclas(cuerpo)}</main></body></html>`
const ren = (nodo: React.ReactElement) => renderToStaticMarkup(<ImprimirCtx.Provider value={true}>{nodo}</ImprimirCtx.Provider>)
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// ---------- 1. Manual de estudio ----------
function Manual() {
  return (
    <>
      <section className="portada">
        <p className="chip">UNRaf · Ciclo de Complementación Curricular · Lic. en AGI · 2026</p>
        <h1>Manual de estudio de Marketing Digital</h1>
        <p>Versión consolidada y estructurada a partir del cuaderno de cátedra «Pensando AGIlmente a la disciplina del marketing» y del Programa 2026. Incluye contenido, tablas, diagramas, ejemplos, referencias al material original y glosario.</p>
        <p className="aviso"><b>Cómo leerlo.</b> Los recuadros «Cuaderno, Cap. X, p. Y» indican de dónde sale cada idea (páginas del PDF de 178 págs.). Los bloques etiquetados <i>Explicación didáctica</i> son aclaraciones nuestras y los <i>Ampliación</i> cubren temas del programa que el cuaderno no desarrolla (fuente y fecha al final). Las preguntas de práctica son material propio, no preguntas de la cátedra. Generado el {fecha}.</p>
      </section>
      <section>
        <h1>Índice</h1>
        <ol className="toc">
          {unidades.map((u) => (
            <li key={u.n}><b>Unidad {u.n}. {u.titulo}</b>
              <ul>{lecciones.filter((l) => l.unidad === u.n).map((l) => <li key={l.id}><a href={`#/leccion/${l.id}`}>{l.id} · {l.titulo}</a></li>)}</ul></li>
          ))}
          <li><a href="#/leccion/__cob">Cobertura del programa</a> · Glosario · Ampliaciones y limitaciones</li>
        </ol>
      </section>
      {unidades.map((u) => (
        <div key={u.n}>
          <h1 className="unidad-h">Unidad {u.n}. {u.titulo}</h1>
          <p className="meta">Programa 2026: {u.programa}. Lectura obligatoria: {u.lecturaObligatoria}.</p>
          {lecciones.filter((l) => l.unidad === u.n).map((l: Leccion) => (
            <section key={l.id} id={l.id} className="leccion-m">
              <h2>{l.id} · {l.titulo}</h2>
              <p className="meta">{l.resumen}</p>
              <LeccionCuerpo l={l} conPreguntas />
            </section>
          ))}
        </div>
      ))}
      <section id="__cob" className="unidad-h">
        <h1>Cobertura del programa 2026</h1>
        <p>CD cubierto y desarrollado · CP parcialmente · M mencionado · NL no localizado en las fuentes · BC requiere bibliografía complementaria.</p>
        <div className="tabla-w"><table><thead><tr><th>Unidad</th><th>Tema</th><th>Estado</th><th>Lecciones</th></tr></thead>
          <tbody>{cobertura.map((c, i) => <tr key={i}><td>{c.unidad}</td><td>{c.tema}</td><td title={ESTADOS[c.estado]}>{c.estado}</td><td>{c.lecciones.join(', ')}</td></tr>)}</tbody></table></div>
      </section>
      <section className="unidad-h">
        <h1>Glosario</h1>
        {[...glosario].sort((a, b) => a.termino.localeCompare(b.termino, 'es')).map((t) => (
          <p key={t.id} id={`g-${t.id}`}><b>{t.termino}.</b> <Tx t={t.def} /> <span className="meta">({t.lec})</span></p>
        ))}
      </section>
      <section className="unidad-h">
        <h1>Ampliaciones externas, fuentes y limitaciones</h1>
        <ul>{ampliaciones.map((a) => <li key={a.id}><b>{a.titulo}</b> — {a.nota} {a.url ? `${a.fuente}. ${a.url}` : `(${a.fuente})`} Consultada: {a.consultada}.</li>)}</ul>
        <h3>Limitaciones</h3>
        <ul>
          <li>El manual no reemplaza la bibliografía obligatoria del programa.</li>
          <li>No se inspeccionaron los videos, audios, plantillas, informe UNRaf ni los casos KM0/BI-PLA enlazados en el cuaderno.</li>
          <li>Discrepancias del cuaderno (numeración de pasos del email, referencias cruzadas, secciones vacías) están señaladas en cada lección y en docs/auditoria-academica.md.</li>
          <li>Las animaciones y simuladores se omiten en el PDF (se reemplazan por diagramas estáticos y tablas); están en la aplicación web.</li>
        </ul>
      </section>
    </>
  )
}
writeFileSync(OUT + 'manual-estudio.html', pagina('Manual de estudio · Marketing Digital UNRaf 2026', ren(<Manual />)))

// Versión para teléfono: página angosta (110×195 mm), letra mayor, una columna.
const movil = pagina('Manual de estudio (móvil) · Marketing Digital UNRaf 2026', ren(<Manual />)).replace('</style>', '@page{size:110mm 195mm;margin:7mm 6mm 10mm}body{font-size:12pt!important;line-height:1.5}.manual .cont{max-width:none}.portada h1{font-size:2rem!important}.comparar{grid-template-columns:1fr!important}table{font-size:.8rem}.dg-cadena>div{flex-basis:100%}</style>')
writeFileSync(OUT + 'manual-estudio-movil.html', movil)

// ---------- 2. Banco de preguntas ----------
const porUnidad = unidades.filter((u) => lecciones.some((l) => l.unidad === u.n))
const preg = (u: number): { p: Pregunta; l: Leccion }[] => lecciones.filter((l) => l.unidad === u).flatMap((l) => l.preguntas.map((p) => ({ p, l })))
const DIF = ['', 'Básica', 'Intermedia', 'Avanzada']
const letra = (i: number) => 'abcdef'[i]!
/** Orden determinista de alternativas (por id) para que la respuesta correcta no quede siempre en la misma letra. */
function orden(id: string, n: number): number[] {
  let h = 2166136261
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) % 100000) / 100000
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j]!, a[i]!] }
  return a
}

let md = `# Banco de preguntas — Marketing Digital UNRaf 2026\n\n> **Material de práctica creado para este curso.** No son preguntas oficiales de la cátedra ni anticipan un examen. Generado el ${fecha}. Cada pregunta indica unidad, lección, tema, dificultad y la ubicación en el material de origen. Parte A: preguntas. Parte B: respuestas explicadas (separadas para favorecer la autoevaluación).\n\n`
md += `Total: ${lecciones.reduce((a, l) => a + l.preguntas.length, 0)} preguntas.\n\n## Parte A. Preguntas\n\n`
for (const u of porUnidad) {
  md += `### Unidad ${u.n}. ${u.titulo}\n\n`
  for (const dif of [1, 2, 3] as const) {
    const xs = preg(u.n).filter(({ p }) => p.dif === dif)
    if (!xs.length) continue
    md += `**Dificultad ${DIF[dif]}**\n\n`
    for (const { p, l } of xs) {
      md += `**${p.id}** · ${l.id} · ${p.tema} — ${plano(p.enunciado)}\n\n`
      if (p.tipo === 'mc') md += orden(p.id, p.opciones.length).map((k, i) => `   ${letra(i)}) ${plano(p.opciones[k]!.x)}`).join('\n') + '\n\n'
      else md += '   *(Respuesta corta)*\n\n'
    }
  }
}
md += `## Parte B. Respuestas explicadas\n\n`
for (const u of porUnidad) {
  md += `### Unidad ${u.n}\n\n`
  for (const { p, l } of preg(u.n)) {
    md += `**${p.id}** (${l.id} · ${etiquetaOrigen(p.o ?? l.referencias[0])})\n\n`
    if (p.tipo === 'mc') {
      const ord = orden(p.id, p.opciones.length)
      md += `Correcta: **${letra(ord.indexOf(p.correcta))}**\n\n` + ord.map((k, i) => `- ${letra(i)}) ${k === p.correcta ? '✔' : '✘'} ${plano(p.opciones[k]!.porque)}`).join('\n') + '\n\n'
    } else {
      md += `Respuesta modelo: ${plano(p.modelo)}\n\nCriterios: ${p.criterios.map(plano).join(' · ')}\n\n`
    }
  }
}
writeFileSync(OUT + 'banco-de-preguntas.md', md)
const bancoHtml = `<h1>Banco de preguntas</h1><p class="sello">Material de práctica creado para este curso. No son preguntas oficiales de la cátedra.</p>` + [md].map(() => {
  const partes = md.split('## Parte B. Respuestas explicadas')
  const aHtml = (s: string) => esc(s).replace(/^### (.*)$/gm, '<h2>$1</h2>').replace(/^## (.*)$/gm, '<h1 style="break-before:page">$1</h1>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/^> (.*)$/gm, '<p class="meta">$1</p>').replace(/^- (.*)$/gm, '<div style="margin-left:1.2em">• $1</div>').replace(/^ {3}(.*)$/gm, '<div style="margin-left:1.2em">$1</div>').replace(/\n\n/g, '<br>')
  return aHtml(partes[0]!.split('\n').slice(1).join('\n')) + '<h1 style="break-before:page">Parte B. Respuestas explicadas</h1>' + aHtml(partes[1]!)
})[0]
writeFileSync(OUT + 'banco-de-preguntas.html', pagina('Banco de preguntas', bancoHtml))

// ---------- 3. Glosario ----------
const glosOrd = [...glosario].sort((a, b) => a.termino.localeCompare(b.termino, 'es'))
writeFileSync(OUT + 'glosario.md', `# Glosario — Marketing Digital UNRaf 2026\n\n${glosOrd.length} términos. Las entradas marcadas (didáctico) o (ampliación) no están en el cuaderno. «Lección» remite al manual y a la app.\n\n` + glosOrd.map((t) => `**${t.termino}.** ${plano(t.def)}  \n*Lección:* ${t.lec} — ${lecciones.find((l) => l.id === t.lec)?.titulo}${t.rel ? ` · *Ver también:* ${t.rel.map((r) => glosario.find((g) => g.id === r)?.termino ?? r).join(', ')}` : ''}\n`).join('\n'))

// ---------- 4. Guía de repaso ----------
const L = (id: string) => `${id}`
let g = `# Guía de repaso — Marketing Digital UNRaf 2026\n\nComplementa el curso, no lo reemplaza. Generada el ${fecha}.\n\n## 1. Relaciones entre unidades\n\n| Desde | Hacia | Relación |\n|---|---|---|\n` + relaciones.map((r) => `| ${r.de} | ${r.con} | ${r.relacion} |`).join('\n')
g += `\n\n**Hilo conductor (síntesis didáctica):** valor (U1) → mix y consumidor (U2) → plan, segmentación y journey (U3) → canales de adquisición: SEO/SEM (U4), redes (U5), email (U7) → conversión en e-commerce (U6) → medición con KPI y ajuste del plan.\n\n## 2. Conceptos que se confunden\n\n| Par | Clave |\n|---|---|\n` + confundibles.map((c) => `| ${c.par} | ${c.clave} |`).join('\n')
g += `\n\n## 3. Fórmulas y patrones\n\n| Indicador | Fórmula |\n|---|---|\n` + formulas.map(([a, b]) => `| ${a} | ${b} |`).join('\n')
g += `\n\n## 4. Preguntas integradoras (respondelas por escrito antes de mirar las pistas)\n\n` + integradoras.map((q) => `${q.n}. ${q.pregunta}  \n   *Pista:* ${q.pista} *(Lecciones: ${q.lecciones.map(L).join(', ')})*`).join('\n')
g += `\n\n## 5. Temas que requieren mayor elaboración\n\nLos siguientes temas están en el programa pero **no** (o solo parcialmente) en el cuaderno. Estudialos con la bibliografía obligatoria; el curso solo ofrece una orientación etiquetada.\n\n` + cobertura.filter((c) => ['M', 'NL', 'BC'].includes(c.estado)).map((c) => `- **${c.tema}** (U${c.unidad}, ${c.estado}) → ${c.lecciones.join(', ')}`).join('\n')
g += `\n\nTambién conviene elaborar: el debate necesidad/deseo (¿se crean o se satisfacen?), la tensión embudo vs. Messy Middle, y los límites éticos de la IA (sesgos, privacidad).\n\n## 6. La IA en el cuaderno\n\n| Dónde | Qué trata |\n|---|---|\n` + iaMapa.map(([a, b]) => `| ${a} | ${b} |`).join('\n')
g += `\n\n## 7. Reglas de cursado según el Programa 2026\n\n` + reglasPrograma.map(([a, b]) => `- **${a}:** ${b}`).join('\n')
g += `\n\n## 8. Plan sugerido de repaso antes de un examen\n\n` + cronograma.map(([a, b]) => `- **${a}:** ${b}`).join('\n') + `\n\nLa app calcula repasos espaciados a +1, +3, +7, +14 y +30 días desde la primera lectura de cada lección (sección «Repaso y progreso»).\n`
writeFileSync(OUT + 'guia-de-repaso.md', g)
const mdAHtml = (s: string) => {
  const lines = s.split('\n'); let html = ''; let tabla: string[] = []
  const flush = () => { if (!tabla.length) return; const filas = tabla.filter((r) => !/^\|[-| ]+\|$/.test(r)).map((r) => r.split('|').slice(1, -1).map((c) => c.trim())); html += `<div class="tabla-w"><table><thead><tr>${filas[0]!.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${filas.slice(1).map((r) => `<tr>${r.map((c) => `<td>${esc(c).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; tabla = [] }
  for (const ln of lines) {
    if (ln.startsWith('|')) { tabla.push(ln); continue }
    flush()
    const inl = (x: string) => esc(x).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>')
    if (ln.startsWith('# ')) html += `<h1>${inl(ln.slice(2))}</h1>`
    else if (ln.startsWith('## ')) html += `<h2>${inl(ln.slice(3))}</h2>`
    else if (ln.startsWith('- ')) html += `<div style="margin-left:1.2em">• ${inl(ln.slice(2))}</div>`
    else if (/^\d+\. /.test(ln)) html += `<p style="margin-bottom:0"><b>${inl(ln)}</b></p>`
    else if (ln.trim()) html += `<p>${inl(ln)}</p>`
  }
  flush(); return html
}
writeFileSync(OUT + 'guia-de-repaso.html', pagina('Guía de repaso', mdAHtml(g)))
writeFileSync(OUT + 'glosario.html', pagina('Glosario', mdAHtml(readFileSync(OUT + 'glosario.md', 'utf8').replace(/\n\n/g, '\n\n').replace(/  \n/g, '\n\n'))))
console.log('Materiales generados en materiales/: manual-estudio.html, banco-de-preguntas.{md,html}, glosario.{md,html}, guia-de-repaso.{md,html}')
