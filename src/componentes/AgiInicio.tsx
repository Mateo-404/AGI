import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { rutaMateria } from '@/logica/rutas'
import { listaMaterias } from '@contenido/materias'
import { getMateriaIcon } from '@/design/tokens'

type MateriaInfo = {
  nombre: string
  slug: string | null
  apuntes: boolean
  cuatri: number
}

const CUATRIMESTRES: { n: number; titulo: string; materias: MateriaInfo[] }[] = [
  { n: 1, titulo: '1.º cuatrimestre', materias: [
    { nombre: 'Administración de capital humano', slug: 'administracion-capital-humano', apuntes: true, cuatri: 1 },
    { nombre: 'Administración y diseño de procesos organizacionales', slug: 'administracion-procesos', apuntes: true, cuatri: 1 },
    { nombre: 'Introducción a las comunicaciones', slug: 'introduccion-comunicaciones', apuntes: true, cuatri: 1 },
    { nombre: 'Paradigmas de Programación', slug: 'paradigmas-programacion', apuntes: true, cuatri: 1 },
    { nombre: 'Inglés I', slug: 'ingles-1', apuntes: true, cuatri: 1 },
  ]},
  { n: 2, titulo: '2.º cuatrimestre', materias: [
    { nombre: 'Universidad, sociedad y conocimientos', slug: 'universidad-sociedad-conocimientos', apuntes: true, cuatri: 2 },
    { nombre: 'Marketing digital', slug: 'marketing', apuntes: false, cuatri: 2 },
    { nombre: 'Cálculo de Costos y Rendimiento', slug: 'calculo-costos', apuntes: true, cuatri: 2 },
    { nombre: 'Ingeniería de Software', slug: 'ingenieria-software', apuntes: true, cuatri: 2 },
    { nombre: 'Gestión de Ventas', slug: 'gestion-ventas', apuntes: true, cuatri: 2 },
  ]},
  { n: 3, titulo: '3.º cuatrimestre', materias: [
    { nombre: 'Control de Gestión', slug: 'control-gestion', apuntes: false, cuatri: 3 },
    { nombre: 'Introducción a la Optimización', slug: 'introduccion-optimizacion', apuntes: false, cuatri: 3 },
    { nombre: 'Introducción a la Gestión de Datos', slug: 'introduccion-gestion-datos', apuntes: false, cuatri: 3 },
    { nombre: 'Gestión de Operaciones', slug: 'gestion-operaciones', apuntes: false, cuatri: 3 },
  ]},
  { n: 4, titulo: '4.º cuatrimestre', materias: [
    { nombre: 'Gestión Estratégica', slug: 'gestion-estrategica', apuntes: false, cuatri: 4 },
    { nombre: 'Financiamiento e Inversión', slug: 'financiamiento-inversion', apuntes: false, cuatri: 4 },
    { nombre: 'Gestión y Administración de las Tecnologías', slug: 'gestion-tecnologias', apuntes: false, cuatri: 4 },
    { nombre: 'Inglés II', slug: 'ingles-2', apuntes: false, cuatri: 4 },
  ]},
  { n: 5, titulo: '5.º cuatrimestre', materias: [
    { nombre: 'Unidad Curricular Electiva', slug: 'unidad-electiva', apuntes: false, cuatri: 5 },
    { nombre: 'Aprendizaje Automático y Minería de Datos', slug: 'aprendizaje-automatico', apuntes: false, cuatri: 5 },
    { nombre: 'Prospectiva Tecnológica', slug: 'prospectiva-tecnologica', apuntes: false, cuatri: 5 },
    { nombre: 'Trabajo Final de Grado', slug: 'trabajo-final-grado', apuntes: false, cuatri: 5 },
  ]},
]

const CLAVE_MATERIAS = 'agi:materias-estudiadas:v1'

/** Calculate overall progress across all cuatrimestres */
function getOverallProgress(estudiadas: Record<string, boolean>): { total: number; estudiadasCount: number } {
  const allMaterias = CUATRIMESTRES.flatMap(c => c.materias)
  const total = allMaterias.length
  const estudiadasCount = allMaterias.filter(m => estudiadas[m.nombre]).length
  return { total, estudiadasCount }
}

/** Calculate progress for a single cuatrimestre */
function getCuatriProgress(cuatri: typeof CUATRIMESTRES[0], estudiadas: Record<string, boolean>): { total: number; estudiadasCount: number; pct: number } {
  const total = cuatri.materias.length
  const estudiadasCount = cuatri.materias.filter(m => estudiadas[m.nombre]).length
  return { total, estudiadasCount, pct: total ? Math.round((estudiadasCount / total) * 100) : 0 }
}

/** Portada del proyecto con tarjetas estilo Notion */
export function AgiInicio() {
  useEffect(() => { document.title = 'Somos #AGI · Proyecto personal' }, [])
  
  const [estudiadas, setEstudiadas] = useState<Record<string, boolean>>(() => {
    try { 
      if (typeof localStorage === 'undefined') return {}
      return JSON.parse(localStorage.getItem(CLAVE_MATERIAS) || '{}') 
    } catch { return {} }
  })
  
  useEffect(() => {
    try { 
      if (typeof localStorage !== 'undefined') 
        localStorage.setItem(CLAVE_MATERIAS, JSON.stringify(estudiadas)) 
    } catch {}
  }, [estudiadas])
  
  const toggle = (nombre: string) => setEstudiadas(e => ({ ...e, [nombre]: !e[nombre] }))
  
  const overall = getOverallProgress(estudiadas)
  const overallPct = overall.total ? Math.round((overall.estudiadasCount / overall.total) * 100) : 0

  return (
    <div className="agi">
      <header className="agi-cab">
        <p className="agi-aviso">
          Proyecto personal de Mateo Gariboglio. No es un sitio oficial de la Universidad Nacional de Rafaela; 
          los datos se toman de sus páginas públicas, que se enlazan abajo.
        </p>
        <h1>Licenciatura en Administración y Gestión de la Información</h1>
        <p className="agi-bajada">
          Ciclo de Complementación Curricular (CCC), modalidad a distancia. 
          Título de Licenciada/o en Administración y Gestión de la Información. 
          2 años y medio, 1.680 horas.
        </p>
        <p className="agi-slogan">«Gestioná y potenciá organizaciones flexibles y eficaces»</p>
        
        {/* Global progress bar */}
        <div className="header-progress" role="progressbar" aria-valuenow={overallPct} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso global del plan de estudios">
          <div className="header-progress-bar" style={{ width: `${overallPct}%` }} />
        </div>
        <span className="header-progress-text">
          {overall.estudiadasCount} de {overall.total} materias · {overallPct}%
        </span>
      </header>

      <section className="agi-sec" aria-labelledby="materias">
        <h2 id="materias">Materias</h2>
        <p>Marcá las materias que ya estudiaste: quedan tachadas. Las que tienen apuntes enlazan al material disponible.</p>
        
        {CUATRIMESTRES.map((c) => {
          const cuatriProgress = getCuatriProgress(c, estudiadas)
          const cuatriColor = `var(--color-cuatri-${c.n})`
          const cuatriBg = `var(--color-cuatri-${c.n}-bg, var(--color-brand-light))`
          
          return (
            <div key={c.n} style={{ marginBottom: 'var(--space-10)' } as CSSProperties}>
              {/* Cuatrimestre header with progress */}
              <div className="cuatrimestre-header" style={{ 
                '--cuatri-color': cuatriColor,
                '--cuatri-bg': cuatriBg,
              } as CSSProperties}>
                <span className="cuatrimestre-number">{c.n}º</span>
                <h3 className="cuatrimestre-title">{c.titulo}</h3>
                <span className="cuatrimestre-progress">
                  {cuatriProgress.estudiadasCount}/{cuatriProgress.total} · {cuatriProgress.pct}%
                </span>
              </div>
              
              {/* Course cards grid */}
              <div className="course-grid" role="list" aria-label={`${c.titulo} - materias`}>
                {c.materias.map((m, idx) => {
                  const est = !!estudiadas[m.nombre]
                  const interna = !!m.slug && listaMaterias.includes(m.slug)
                  const href = interna ? rutaMateria(m.slug!) : 
                    (m.apuntes && m.slug ? `https://github.com/Mateo-404/AGI/tree/main/apuntes/${m.slug}` : null)
                  const iconSvg = getMateriaIcon(m.slug || '')
                  const badgeClass = m.apuntes 
                    ? (interna ? 'apuntes' : 'apuntes') 
                    : (m.slug ? 'en-desarrollo' : 'proximamente')
                  const badgeText = m.apuntes 
                    ? (interna ? 'Apuntes' : 'Apuntes en GitHub') 
                    : (m.slug ? 'En desarrollo' : 'Próximamente')
                  
                  return (
                    <article 
                      key={m.nombre} 
                      role="listitem"
                      className="course-card reveal"
                      style={{ 
                        '--cuatri-color': cuatriColor,
                        '--cuatri-bg': cuatriBg,
                        animationDelay: `${idx * 50}ms`,
                      } as CSSProperties}
                    >
                      <div className="course-card-header">
                        <div className="course-card-icon" dangerouslySetInnerHTML={{ __html: iconSvg }} aria-hidden="true" />
                        <div className="course-card-status">
                          <input
                            type="checkbox"
                            className="course-card-checkbox"
                            checked={est}
                            onChange={() => toggle(m.nombre)}
                            aria-label={`Marcar ${m.nombre} como estudiada`}
                          />
                        </div>
                      </div>
                      
                      {href ? (
                        <a 
                          href={href} 
                          target={interna ? undefined : '_blank'} 
                          rel="noreferrer"
                          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}
                        >
                          <h4 className="course-card-title" style={{ textDecoration: est ? 'line-through' : 'none', opacity: est ? 0.6 : 1 }}>
                            {m.nombre}
                          </h4>
                          <div className="course-card-meta">
                            <span className={`course-card-badge ${badgeClass}`}>{badgeText}</span>
                            {interna && <span>· Disponible en el sitio</span>}
                          </div>
                        </a>
                      ) : (
                        <>
                          <h4 className="course-card-title" style={{ textDecoration: est ? 'line-through' : 'none', opacity: est ? 0.6 : 1 }}>
                            {m.nombre}
                          </h4>
                          <div className="course-card-meta">
                            <span className={`course-card-badge ${badgeClass}`}>{badgeText}</span>
                          </div>
                        </>
                      )}
                      
                      <div className="course-card-footer">
                        <div className="course-card-progress" aria-hidden="true">
                          <svg viewBox="0 0 40 40">
                            <circle className="track" cx="20" cy="20" r="18" />
                            <circle 
                              className="progress" 
                              cx="20" 
                              cy="20" 
                              r="18" 
                              style={{ 
                                strokeDasharray: '113.1',
                                strokeDashoffset: est ? '0' : '113.1',
                              }} 
                            />
                          </svg>
                        </div>
                        <span className="course-card-progress-text">
                          {est ? 'Estudiada' : 'Pendiente'}
                        </span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      <section className="agi-sec" aria-labelledby="perfil">
        <h2 id="perfil">Perfil y salidas</h2>
        <p>Forma profesionales que integran administración con sistemas y tecnologías para gestionar organizaciones en entornos de transformación digital. Puede desempeñarse en industrias, empresas de servicios y organismos públicos, en planificación, organización, dirección y control.</p>
        <p>Requisito de ingreso: título de Técnico/a Superior en Administración de Empresas, en Gestión de las Organizaciones, en Administración u otra área afín (la universidad evalúa equivalencias).</p>
      </section>

      <section className="agi-sec" aria-labelledby="contacto">
        <h2 id="contacto">Contacto y fuentes oficiales</h2>
        <ul className="agi-enlaces">
          <li><a href="https://www.unraf.edu.ar/component/content/article/carrera-ccc-agi?Itemid=120&catid=159" target="_blank" rel="noreferrer">Página de la carrera CCC AGI (UNRaf)</a></li>
          <li><a href="https://sites.google.com/unraf.edu.ar/somos-agi" target="_blank" rel="noreferrer">Somos #AGI (sitio de la carrera)</a></li>
          <li><a href="https://sites.google.com/unraf.edu.ar/somos-agi/ciclo-a-distancia" target="_blank" rel="noreferrer">Ciclo a distancia: cursado, docentes y contenidos</a></li>
        </ul>
        <p className="agi-dato">Universidad Nacional de Rafaela · Av. Ángela de la Casa 2500, Rafaela, Santa Fe · Correo institucional: info@unraf.edu.ar · Tel. 54 3492 290852</p>
        <p className="meta">Datos tomados de las páginas públicas de la UNRaf. Revisá siempre el calendario y las condiciones en esas fuentes.</p>
      </section>
    </div>
  )
}