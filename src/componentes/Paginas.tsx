import { rutaMateria } from '@/logica/rutas'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { CSSProperties } from 'react'
import { ESTADOS } from '@contenido/tipos'
import { useMateria } from './contextoMateria'
import { clasificarGesto, vibrar } from '@/logica/gestos'
import { exportar, hayPersistencia, importar, marcarVista, calificar, reiniciar, useProgreso } from '@/logica/progreso'
import { dominada, estaVencida, fechasSugeridas, nivel, rndDe, seleccionPonderada, type Nivel } from '@/logica/repaso'
import type { Leccion } from '@contenido/tipos'
import { QuizRunner } from './Quiz'
import { Tx } from './contexto'
import { getUnidadIcon } from '@/design/tokens'

const NIVEL_TXT: Record<Nivel, string> = { 'sin-evidencia': 'Sin evidencia', 'en-practica': 'En práctica', consolidado: 'Consolidado' }

function useNivelLeccion() {
  const p = useProgreso()
  return (l: Leccion): Nivel => nivel(l.preguntas.map((q) => p.intentos[q.id] ?? []))
}

function MapaRuta({ vistas }: { vistas: Set<string> }) {
  const m = useMateria()
  // Una estación por unidad; cada lección es una parada que se enciende al leerla.
  const paso = Math.min(80, 560 / Math.max(1, m.unidades.length - 1))
  const xs = m.unidades.map((_, i) => 60 + i * paso)
  return (
    <figure className="ruta" aria-label={`Mapa del curso: ${m.unidades.length} unidades y sus lecciones`}>
      <svg viewBox="0 0 680 150" role="img" aria-label="Línea de estaciones, una por unidad, con sus lecciones marcadas como leídas o pendientes">
        <path d={`M${xs[0]} 60 L${xs[xs.length - 1]} 60`} className="ruta-linea" />
        {m.unidades.map((u, i) => {
          const ls = m.leccionesDe(u.n)
          const leidas = ls.filter((l) => vistas.has(l.id)).length
          return (
            <g key={u.n}>
              <a href={rutaMateria(m.slug, `unidad/${u.n}`)}>
                <circle cx={xs[i]} cy={60} r={14} className={`ruta-est ${leidas === ls.length && ls.length ? 'completa' : ''}`} />
                <text x={xs[i]} y={64} textAnchor="middle" className="ruta-num">{u.n}</text>
                <title>{`Unidad ${u.n}: ${u.titulo} (${leidas} de ${ls.length} leídas)`}</title>
              </a>
              {ls.map((l, j) => (
                <circle key={l.id} cx={xs[i]! - ((ls.length - 1) * 6) / 2 + j * 6} cy={94} r={4} className={vistas.has(l.id) ? 'parada leida' : 'parada'} />
              ))}
            </g>
          )
        })}
      </svg>
      <figcaption>Cada estación es una unidad. Cada punto es una lección; se enciende al leerla.</figcaption>
    </figure>
  )
}

export function Inicio() {
  const m = useMateria()
  const p = useProgreso()
  const nivelDe = useNivelLeccion()
  const vistas = m.lecciones.filter((l) => p.vistas[l.id]).length
  const cons = m.lecciones.filter((l) => nivelDe(l) === 'consolidado').length
  const sig = m.lecciones.find((l) => !p.vistas[l.id])
  const hoy = new Date().toISOString()
  const vencidas = m.todasLasTarjetas().filter((t) => p.tarjetas[t.id] && estaVencida(p.tarjetas[t.id], hoy)).length
  const esMarketing = m.slug === 'marketing'
  return (
    <>
      <header className="portada">
        <p className="kicker">{m.nombre} · UNRaf 2026</p>
        <h1>{esMarketing ? 'Un curso para estudiar de a tramos' : 'Apuntes para estudiar de a tramos'}</h1>
        <p className="bajada">{esMarketing
          ? 'Basado en el cuaderno de cátedra y el programa. Cada lección dice de dónde sale cada idea, y la app distingue lo que dice la cátedra de lo que agregamos.'
          : `${m.descripcion} Cada lección dice de dónde sale cada idea y separa lo que dice la bibliografía de lo que es explicación didáctica.`}</p>
        <div className="fila">
          <a className="btn pri" href={sig ? rutaMateria(m.slug, `leccion/${sig.id}`) : rutaMateria(m.slug, 'practica')}>{sig ? (vistas ? 'Seguir donde quedé' : 'Empezar por el principio') : 'Ir a practicar'}</a>
          <a className="btn" href={rutaMateria(m.slug, 'practica')}>Practicar</a>
        </div>
      </header>
      <MapaRuta vistas={new Set(Object.keys(p.vistas))} />
      {!hayPersistencia() && <p className="aviso" role="alert">Tu navegador bloquea el almacenamiento local: el progreso no se guardará al cerrar la página.</p>}
      <dl className="cifras">
        <div><dt>Lecciones vistas</dt><dd>{vistas}<span>/{m.lecciones.length}</span></dd></div>
        <div><dt>Consolidadas</dt><dd>{cons}<span>/{m.lecciones.length}</span></dd></div>
        <div><dt>Tarjetas para repasar hoy</dt><dd>{vencidas}</dd></div>
      </dl>
      <h2>Unidades</h2>
      <ol className="estaciones">
        {m.unidades.map((u) => {
          const ls = m.leccionesDe(u.n)
          const v = ls.filter((l) => p.vistas[l.id]).length
          return (
            <li key={u.n}>
              <a href={rutaMateria(m.slug, `unidad/${u.n}`)}>
                <span className="est-n">{u.n}</span>
                <span className="est-t">{u.titulo}</span>
                <span className="meta">{v} de {ls.length} leídas · {ls.reduce((a, l) => a + l.minutos, 0)} min</span>
              </a>
            </li>
          )
        })}
      </ol>
    </>
  )
}

export function UnidadPag({ n }: { n: number }) {
  const m = useMateria()
  const u = m.unidades.find((x) => x.n === n)
  const p = useProgreso()
  const nivelDe = useNivelLeccion()
  if (!u) return <NoEncontrado />
  const ls = m.leccionesDe(n)
  const unidadIcon = getUnidadIcon(m.slug, n)
  const cuatriColor = `var(--color-cuatri-${u.cuatri || 1})`
  const cuatriBg = `var(--color-cuatri-${u.cuatri || 1}-bg, var(--color-brand-light))`
  
  return (
    <>
      {/* Unit cover image - Notion style */}
      <div className="unit-cover" style={{ '--cuatri-color': cuatriColor, '--cuatri-bg': cuatriBg } as CSSProperties} aria-hidden="true">
        <div className="unit-cover-pattern" />
        <div className="unit-cover-content">
          <p className="unit-cover-number">{unidadIcon} Unidad {n}</p>
          <h1 className="unit-cover-title">{u.titulo}</h1>
          <div className="unit-cover-meta">
            <span>{u.programa}</span>
            <span>·</span>
            <span>Lectura: {u.lecturaObligatoria}</span>
            <span>·</span>
            <span>{ls.length} lecciones · {ls.reduce((a, l) => a + l.minutos, 0)} min</span>
          </div>
        </div>
      </div>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
        {ls.map((l) => (
          <a key={l.id} href={rutaMateria(m.slug, `leccion/${l.id}`)} className="tarjeta" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="fila"><span className="chip">{l.id}</span><span className="chip">{NIVEL_TXT[nivelDe(l)]}</span>{p.vistas[l.id] && <span className="chip did">vista</span>}<span className="meta">{l.minutos} min</span></div>
            <h3 style={{ margin: '6px 0' }}>{l.titulo}</h3><p className="meta" style={{ margin: 0 }}>{l.resumen}</p>
          </a>
        ))}
      </div>
      <p><a className="btn pri" href={rutaMateria(m.slug, `practica/unidad/${n}`)}>Cuestionario acumulativo de la unidad</a></p>
    </>
  )
}

/** El cuerpo de la lección llega ya dibujado como HTML estático (children): ver LeccionEstatica.astro. */
export function LeccionPag({ id, children }: { id: string; children?: ReactNode }) {
  const m = useMateria()
  const l = m.leccionPorId.get(id)
  const [practica, setPractica] = useState(false)
  useEffect(() => { setPractica(false); if (l) marcarVista(l.id) }, [l])
  if (!l) return <NoEncontrado />
  const sig = m.siguiente(l.id)
  const ant = m.anterior(l.id)
  return (
    <article className="leccion">
      <p className="meta"><a href={rutaMateria(m.slug)}>Inicio</a> › <a href={rutaMateria(m.slug, `unidad/${l.unidad}`)}>Unidad {l.unidad}</a> › {l.id}</p>
      <h1>{l.titulo}</h1>
      <p className="meta">{l.minutos} min · {l.resumen}</p>
      {children}
      <h2>Practicá lo aprendido</h2>
      {practica ? <QuizRunner preguntas={l.preguntas} alcance={`lección ${l.id}`} titulo={l.titulo} onSalir={() => setPractica(false)} /> : (
        <div className="fila"><button className="btn pri" onClick={() => setPractica(true)}>Responder {l.preguntas.length} preguntas</button><a className="btn" href={rutaMateria(m.slug, `tarjetas/${l.id}`)}>Tarjetas de esta lección ({l.tarjetas.length})</a></div>
      )}
      <nav className="fila no-print" style={{ justifyContent: 'space-between', marginTop: 30 }} aria-label="Navegación entre lecciones">
        {ant ? <a className="btn" href={rutaMateria(m.slug, `leccion/${ant.id}`)}>← {ant.titulo}</a> : <span />}
        {sig && <a className="btn pri" href={rutaMateria(m.slug, `leccion/${sig.id}`)}>{sig.titulo} →</a>}
      </nav>
    </article>
  )
}

export function Practica({ alcance, ref_ }: { alcance?: string; ref_?: string }) {
  const m = useMateria()
  const p = useProgreso()
  const [semilla, setSemilla] = useState(0)
  const todas = useMemo(() => m.todasLasPreguntas(), [m])
  const es = (id: string) => dominada(p.intentos[id] ?? [])
  const set = useMemo(() => {
    void semilla
    if (alcance === 'leccion') return m.leccionPorId.get(ref_ ?? '')?.preguntas ?? []
    if (alcance === 'unidad') return seleccionPonderada(todas.filter((q) => m.leccionDePregunta(q.id)?.unidad === Number(ref_)), 15, es, rndDe(`u${ref_}${semilla}`))
    if (alcance === 'simulacro') return seleccionPonderada(todas, 40, es, rndDe(`s${semilla}`))
    if (alcance === 'errores') return todas.filter((q) => (p.intentos[q.id] ?? []).slice(-1)[0]?.ok === false)
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alcance, ref_, semilla, m])
  if (!alcance) {
    const errores = todas.filter((q) => (p.intentos[q.id] ?? []).slice(-1)[0]?.ok === false).length
    return (
      <>
        <h1>Práctica y evaluación</h1>
        <p className="sello">Todo el material de esta sección fue creado para este curso. No son preguntas oficiales de la cátedra ni anticipan un examen.</p>
        <div className="grid">
          <a className="tarjeta" href={rutaMateria(m.slug, 'practica/simulacro')} style={{ textDecoration: 'none', color: 'inherit' }}><h3>Simulacro integrador</h3><p className="meta">40 preguntas de todo el programa, priorizando lo no dominado.</p></a>
          <a className="tarjeta" href={rutaMateria(m.slug, 'practica/errores')} style={{ textDecoration: 'none', color: 'inherit' }}><h3>Repaso de errores</h3><p className="meta">{errores} pregunta(s) cuyo último intento fue incorrecto.</p></a>
          <a className="tarjeta" href={rutaMateria(m.slug, 'tarjetas')} style={{ textDecoration: 'none', color: 'inherit' }}><h3>Tarjetas de memoria</h3><p className="meta">Recuperación activa con repaso espaciado.</p></a>
        </div>
        <h2>Por unidad</h2>
        <div className="fila">{m.unidades.map((u) => <a key={u.n} className="btn" href={rutaMateria(m.slug, `practica/unidad/${u.n}`)}>Unidad {u.n}</a>)}</div>
        <h2>Por lección</h2>
        <ul>{m.lecciones.map((l) => <li key={l.id}><a href={rutaMateria(m.slug, `practica/leccion/${l.id}`)}>{l.id} · {l.titulo}</a> <span className="meta">({l.preguntas.length})</span></li>)}</ul>
      </>
    )
  }
  const titulo = alcance === 'simulacro' ? 'Simulacro integrador' : alcance === 'errores' ? 'Repaso de errores' : alcance === 'unidad' ? `Unidad ${ref_}` : `Lección ${ref_}`
  return (
    <>
      <p className="meta"><a href={rutaMateria(m.slug, 'practica')}>Práctica</a> › {titulo}</p>
      <h1>{titulo}</h1>
      {set.length === 0 ? <p className="aviso">{alcance === 'errores' ? 'No tenés errores pendientes. Buen trabajo, pero repasá igual.' : 'No hay preguntas.'}</p>
        : <QuizRunner key={`${alcance}${ref_}${semilla}`} preguntas={set} alcance={`${alcance}${ref_ ? ' ' + ref_ : ''}`} titulo={titulo} onSalir={() => setSemilla(semilla + 1)} />}
    </>
  )
}

export function TarjetasPag({ lec }: { lec?: string }) {
  const m = useMateria()
  const p = useProgreso()
  const ahora = new Date().toISOString()
  const pool = useMemo(() => m.todasLasTarjetas().filter((t) => !lec || t.lec === lec), [lec, m])
  const [solo, setSolo] = useState(!lec)
  const cola = pool.filter((t) => !solo || estaVencida(p.tarjetas[t.id], ahora))
  const [i, setI] = useState(0)
  const [rev, setRev] = useState(false)
  const t = cola[i % Math.max(1, cola.length)]
  const toque = useRef<{ x: number; y: number; t: number } | null>(null)
  /** Atajo táctil, con la tarjeta revelada: deslizar a la derecha = la sabía, a la izquierda = no la sabía. Los botones hacen lo mismo. */
  const responder = (sabia: boolean) => { if (!t) return; calificar(t.id, sabia); setRev(false); setI(i + (solo ? 0 : 1)) }
  return (
    <>
      <h1>Tarjetas de memoria{lec ? ` · ${lec}` : ''}</h1>
      <p className="meta">Intentá responder en voz alta o por escrito <b>antes</b> de revelar. Calificá con honestidad: lo que fallás vuelve mañana; lo que acertás se espacia (1, 3, 7, 14 y 30 días).</p>
      <label style={{ fontWeight: 500 }}><input type="checkbox" checked={solo} onChange={(e) => { setSolo(e.target.checked); setI(0); setRev(false) }} /> Solo nuevas o vencidas</label>
      {!t ? <p className="aviso">No hay tarjetas pendientes. Volvé en la fecha sugerida o desmarcá el filtro.</p> : (
        <section
          className="flash"
          aria-label="Tarjeta"
          onTouchStart={(e) => { const c = e.touches[0]; toque.current = e.touches.length === 1 && c ? { x: c.clientX, y: c.clientY, t: e.timeStamp } : null }}
          onTouchEnd={(e) => {
            const ini = toque.current, c = e.changedTouches[0]
            toque.current = null
            if (!rev || !ini || !c) return
            const g = clasificarGesto({ dx: c.clientX - ini.x, dy: c.clientY - ini.y, dt: e.timeStamp - ini.t, x0: ini.x, ancho: innerWidth })
            if (g) { vibrar(); responder(g === 'derecha') }
          }}
        >
          <p className="meta">{(i % cola.length) + 1} de {cola.length} · {t.lec}{p.tarjetas[t.id] ? ` · caja ${p.tarjetas[t.id]!.caja}` : ' · nueva'}</p>
          <button className={`cara ${rev ? 'resp' : ''}`} onClick={() => setRev(!rev)} aria-label={rev ? 'Respuesta; tocar para ver la pregunta' : 'Pregunta; tocar para ver la respuesta'}><span><Tx t={rev ? t.b : t.f} /></span></button>
          {rev ? (
            <div className="fila" style={{ marginTop: 10 }}>
              <button className="btn" onClick={() => responder(false)}>No la sabía</button>
              <button className="btn pri" onClick={() => responder(true)}>La sabía</button>
            </div>
          ) : <p className="meta">Tocá la tarjeta para revelar la respuesta.</p>}
          {rev && <p className="meta solo-tactil">También podés deslizar: a la derecha, la sabía; a la izquierda, no la sabía.</p>}
        </section>
      )}
    </>
  )
}

export function RepasoPag() {
  const m = useMateria()
  const p = useProgreso()
  const nivelDe = useNivelLeccion()
  const [msg, setMsg] = useState('')
  const vistas = m.lecciones.filter((l) => p.vistas[l.id])
  const debiles = m.lecciones.filter((l) => p.vistas[l.id] && nivelDe(l) !== 'consolidado')
  const hoy = new Date().toISOString().slice(0, 10)
  return (
    <>
      <h1>Repaso y progreso</h1>
      <h2>Recomendaciones</h2>
      {vistas.length === 0 ? <p>Todavía no viste ninguna lección.</p> : debiles.length === 0 ? <p>Todas las lecciones vistas están consolidadas. Hacé el <a href={rutaMateria(m.slug, 'practica/simulacro')}>simulacro</a>.</p> : (
        <ul className="rec">{debiles.map((l) => <li key={l.id}><a href={rutaMateria(m.slug, `leccion/${l.id}`)}>{l.titulo}</a> — {NIVEL_TXT[nivelDe(l)]}. <a href={rutaMateria(m.slug, `practica/leccion/${l.id}`)}>Practicar</a></li>)}</ul>
      )}
      <h2>Calendario de repaso espaciado sugerido</h2>
      <p className="meta">Fechas sugeridas a +1, +3, +7, +14 y +30 días desde la primera vez que abriste cada lección. Es una propuesta, no una obligación.</p>
      <div className="tabla-w"><table><thead><tr><th>Lección</th><th>Vista</th><th>Repasos sugeridos</th></tr></thead><tbody>
        {vistas.map((l) => (
          <tr key={l.id}><td><a href={rutaMateria(m.slug, `leccion/${l.id}`)}>{l.id}</a></td><td>{p.vistas[l.id]!.slice(0, 10)}</td>
            <td className="cal">{fechasSugeridas(p.vistas[l.id]!).map((f) => <span key={f} style={f <= hoy ? { background: 'var(--acento-bg)', fontWeight: 700 } : undefined}>{f}</span>)}</td></tr>
        ))}
      </tbody></table></div>
      <h2>Resultados de cuestionarios</h2>
      {p.quizzes.length === 0 ? <p>Sin resultados todavía.</p> : (
        <div className="tabla-w"><table><thead><tr><th>Fecha</th><th>Alcance</th><th>Aciertos</th><th>Puntaje MC corregido</th></tr></thead><tbody>
          {[...p.quizzes].reverse().slice(0, 15).map((q, i) => <tr key={i}><td>{q.fecha.slice(0, 16).replace('T', ' ')}</td><td>{q.alcance}</td><td>{q.aciertos}/{q.total}</td><td>{q.corregido}</td></tr>)}
        </tbody></table></div>
      )}
      <h2>Guardado local</h2>
      <p className="meta">El progreso se guarda en este navegador (<code>localStorage</code>). No se sincroniza entre dispositivos y se pierde si borrás los datos del sitio o usás una ventana privada. Exportá una copia para conservarla.</p>
      <div className="fila">
        <button className="btn" onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([exportar()], { type: 'application/json' })); a.download = `progreso-${m.slug}.json`; a.click() }}>Exportar progreso</button>
        <label className="btn" style={{ margin: 0 }}>Importar progreso<input type="file" accept="application/json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (f) setMsg(importar(await f.text()) ? 'Progreso importado.' : 'Archivo no válido.') }} /></label>
        <button className="btn" onClick={() => { if (confirm('¿Borrar todo el progreso de este navegador?')) { reiniciar(); setMsg('Progreso reiniciado.') } }}>Reiniciar</button>
      </div>
      {msg && <p role="status" className="fb ok">{msg}</p>}
    </>
  )
}

export function GlosarioPag({ foco }: { foco?: string }) {
  const m = useMateria()
  const [q, setQ] = useState('')
  useEffect(() => { if (foco) document.getElementById(`g-${foco}`)?.scrollIntoView({ block: 'center' }) }, [foco])
  const items = m.glosario.filter((t) => (t.termino + ' ' + t.def).toLowerCase().includes(q.toLowerCase())).sort((a, b) => a.termino.localeCompare(b.termino, 'es'))
  return (
    <>
      <h1>Glosario</h1>
      <label htmlFor="bq">Buscar</label><input id="bq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscá un término…" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--linea)', background: 'var(--surf)', color: 'var(--ink)' }} />
      <p className="meta">{items.length} términos</p>
      {items.map((t) => (
        <div key={t.id} id={`g-${t.id}`} className="def" style={t.id === foco ? { borderColor: 'var(--acento)', borderWidth: 2 } : undefined}>
          <b className="term">{t.termino}.</b> <Tx t={t.def} />
          <div className="meta">Lección: <a href={rutaMateria(m.slug, `leccion/${t.lec}`)}>{m.leccionPorId.get(t.lec)?.titulo ?? t.lec}</a>{t.rel && t.rel.length > 0 && <> · Ver también: {t.rel.map((r, i) => <span key={r}>{i > 0 && ', '}<Tx t={`[[${r}]]`} /></span>)}</>}</div>
        </div>
      ))}
    </>
  )
}

export function CoberturaPag() {
  const m = useMateria()
  return (
    <>
      <h1>Cobertura del programa</h1>
      <p>Cada tema del programa y la lección donde se estudia. <b>CD</b> cubierto y desarrollado · <b>CP</b> cubierto parcialmente · <b>M</b> mencionado, requiere desarrollo · <b>NL</b> no localizado en las fuentes · <b>BC</b> requiere bibliografía complementaria.</p>
      {m.unidades.map((u) => (
        <div key={u.n}>
          <h2>Unidad {u.n}. {u.titulo}</h2>
          <div className="tabla-w"><table><thead><tr><th>Tema del programa</th><th>Estado</th><th>Lecciones</th></tr></thead><tbody>
            {m.cobertura.filter((c) => c.unidad === u.n).map((c) => (
              <tr key={c.tema}><td>{c.tema}</td><td><span className="chip" title={ESTADOS[c.estado]}>{c.estado}</span></td><td>{c.lecciones.map((id, i) => <span key={id}>{i > 0 && ', '}<a href={rutaMateria(m.slug, `leccion/${id}`)}>{id}</a></span>)}</td></tr>
            ))}
          </tbody></table></div>
        </div>
      ))}
    </>
  )
}

export function AcercaPag() {
  const m = useMateria()
  if (m.slug === 'marketing') return <AcercaMarketing />
  return (
    <>
      <h1>Fuentes, alcance y limitaciones</h1>
      <h2>Fuentes</h2>
      <ul>
        {(m.fuentes?.length ? m.fuentes : ['Apuntes personales de la materia, basados en la bibliografía de la cátedra y en el programa.']).map((f) => <li key={f}>{f}</li>)}
      </ul>
      <h2>Cómo leer las etiquetas</h2>
      <ul>
        <li><span className="chip cuaderno">Bibliografía</span> contenido tomado de la fuente indicada, resumido o reorganizado.</li>
        <li><span className="chip did">Explicación didáctica</span> aclaración propia para entender; no se atribuye a la cátedra.</li>
        <li><span className="chip amp">Ampliación externa</span> tema que se amplía con otra fuente.</li>
      </ul>
      {m.nota && <p>{m.nota}</p>}
      <h2>Limitaciones</h2>
      <ul>
        <li>Estos apuntes son material personal de estudio y <b>no reemplazan</b> la bibliografía obligatoria.</li>
        <li>Las preguntas y tarjetas son material de práctica propio: no son preguntas de la cátedra ni anticipan un examen.</li>
        <li>El progreso vive solo en este navegador. Los cuestionarios se autoevalúan.</li>
      </ul>
    </>
  )
}

function AcercaMarketing() {
  const m = useMateria()
  return (
    <>
      <h1>Fuentes, alcance y limitaciones</h1>
      <h2>Fuentes</h2>
      <ul>
        <li><b>Programa 2026</b> (CCC AGI, Marketing Digital): define el alcance.</li>
        <li><b>Cuaderno de cátedra «Pensando AGIlmente a la disciplina del marketing»</b>: fuente principal del contenido. Las páginas citadas son las del PDF de 178 págs.</li>
      </ul>
      <h2>Cómo leer las etiquetas</h2>
      <ul>
        <li><span className="chip cuaderno">Cuaderno, Cap. X, p. Y</span> contenido de la cátedra (resumido o reorganizado, con ubicación).</li>
        <li><span className="chip did">Explicación didáctica</span> aclaración nuestra para entender; no se atribuye a la cátedra.</li>
        <li><span className="chip amp">Ampliación externa</span> tema del programa que el cuaderno no desarrolla; fuente y fecha abajo.</li>
      </ul>
      <h2>Ampliaciones externas (consultadas el 2026-10-26)</h2>
      <ul>{m.ampliaciones.map((a) => <li key={a.id}><b>{a.titulo}.</b> {a.nota} {a.url ? <a href={a.url} target="_blank" rel="noreferrer">{a.fuente}</a> : <i>{a.fuente}</i>}</li>)}</ul>
      <h2>Limitaciones</h2>
      <ul>
        <li>El curso <b>no reemplaza</b> la bibliografía obligatoria del programa (Kotler, Maciá, Shum Xie, Chaffey, Lecinski, etc.).</li>
        <li>No se pudieron inspeccionar los videos, audios, plantillas, informes y casos enlazados en el cuaderno (Genially, informe UNRaf).</li>
        <li>Hay discrepancias menores en el cuaderno (numeración de pasos, referencias cruzadas); están señaladas en las lecciones y en <code>docs/auditoria-academica.md</code>.</li>
        <li>El progreso vive solo en este navegador. Los cuestionarios son material de práctica propio, no preguntas de la cátedra.</li>
      </ul>
    </>
  )
}

export const NoEncontrado = () => {
  const m = useMateria()
  return <><h1>No encontrado</h1><p><a href={rutaMateria(m.slug)}>Volver al inicio</a></p></>
}
