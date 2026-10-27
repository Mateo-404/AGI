import { rutaMateria } from '@/logica/rutas'
import { listaMaterias } from '@contenido/materias'
import { useEffect, useState } from 'react'

type Materia = { nombre: string; slug: string | null; apuntes: boolean }

const CUATRIMESTRES: { n: number; titulo: string; materias: Materia[] }[] = [
  { n: 1, titulo: '1.º cuatrimestre', materias: [
    { nombre: 'Administración de capital humano', slug: 'administracion-capital-humano', apuntes: true },
    { nombre: 'Administración y diseño de procesos organizacionales', slug: 'administracion-procesos', apuntes: true },
    { nombre: 'Introducción a las comunicaciones', slug: 'introduccion-comunicaciones', apuntes: true },
    { nombre: 'Paradigmas de Programación', slug: 'paradigmas-programacion', apuntes: true },
    { nombre: 'Inglés I', slug: 'ingles-1', apuntes: true },
  ]},
  { n: 2, titulo: '2.º cuatrimestre', materias: [
    { nombre: 'Universidad, sociedad y conocimientos', slug: 'universidad-sociedad-conocimientos', apuntes: true },
    { nombre: 'Marketing digital', slug: 'marketing', apuntes: false },
    { nombre: 'Cálculo de Costos y Rendimiento', slug: 'calculo-costos', apuntes: true },
    { nombre: 'Ingeniería de Software', slug: 'ingenieria-software', apuntes: true },
    { nombre: 'Gestión de Ventas', slug: 'gestion-ventas', apuntes: true },
  ]},
  { n: 3, titulo: '3.º cuatrimestre', materias: [
    { nombre: 'Control de Gestión', slug: null, apuntes: false },
    { nombre: 'Introducción a la Optimización', slug: null, apuntes: false },
    { nombre: 'Introducción a la Gestión de Datos', slug: null, apuntes: false },
    { nombre: 'Gestión de Operaciones', slug: null, apuntes: false },
  ]},
  { n: 4, titulo: '4.º cuatrimestre', materias: [
    { nombre: 'Gestión Estratégica', slug: null, apuntes: false },
    { nombre: 'Financiamiento e Inversión', slug: null, apuntes: false },
    { nombre: 'Gestión y Administración de las Tecnologías', slug: null, apuntes: false },
    { nombre: 'Inglés II', slug: null, apuntes: false },
  ]},
  { n: 5, titulo: '5.º cuatrimestre', materias: [
    { nombre: 'Unidad Curricular Electiva', slug: null, apuntes: false },
    { nombre: 'Aprendizaje Automático y Minería de Datos', slug: null, apuntes: false },
    { nombre: 'Prospectiva Tecnológica', slug: null, apuntes: false },
    { nombre: 'Trabajo Final de Grado', slug: null, apuntes: false },
  ]},
]

const CLAVE_MATERIAS = 'agi:materias-estudiadas:v1'

/** Portada del proyecto. Usa la identidad visual de UNRaf como referencia; no es un sitio oficial. */
export function AgiInicio() {
  useEffect(() => { document.title = 'Somos #AGI · Proyecto personal' }, [])
  const [estudiadas, setEstudiadas] = useState<Record<string, boolean>>(() => {
    try { if (typeof localStorage === 'undefined') return {}; return JSON.parse(localStorage.getItem(CLAVE_MATERIAS) || '{}') } catch { return {} }
  })
  useEffect(() => {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(CLAVE_MATERIAS, JSON.stringify(estudiadas)) } catch {}
  }, [estudiadas])
  const toggle = (nombre: string) => setEstudiadas((e) => ({ ...e, [nombre]: !e[nombre] }))
  return (
    <div className="agi">
      <header className="agi-cab">
        <p className="agi-aviso">Proyecto personal de Mateo Gariboglio. No es un sitio oficial de la Universidad Nacional de Rafaela; los datos se toman de sus páginas públicas, que se enlazan abajo.</p>
        <h1>Licenciatura en Administración y Gestión de la Información</h1>
        <p className="agi-bajada">Ciclo de Complementación Curricular (CCC), modalidad a distancia. Título de Licenciada/o en Administración y Gestión de la Información. 2 años y medio, 1.680 horas.</p>
        <p className="agi-slogan">«Gestioná y potenciá organizaciones flexibles y eficaces».</p>
      </header>

      <section className="agi-sec" aria-labelledby="materias">
        <h2 id="materias">Materias</h2>
        <p>Marcá las materias que ya estudiaste (aunque sea fuera de este sitio): quedan tachadas. Las que tienen apuntes enlazan al material disponible.</p>
        {CUATRIMESTRES.map((c) => (
          <div key={c.n} style={{ marginBottom: 16 }}>
            <h3 style={{ marginBottom: 6 }}>{c.titulo}</h3>
            <ul className="agi-materias" style={{ listStyle: 'none', padding: 0 }}>
              {c.materias.map((m) => {
                const est = !!estudiadas[m.nombre]
                const interna = !!m.slug && listaMaterias.includes(m.slug)
                const href = interna ? rutaMateria(m.slug!) : (m.apuntes && m.slug ? `https://github.com/Mateo-404/AGI/tree/main/apuntes/${m.slug}` : null)
                return (
                  <li key={m.nombre} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', textDecoration: est ? 'line-through' : 'none', opacity: est ? 0.6 : 1 }}>
                    <input type="checkbox" checked={est} onChange={() => toggle(m.nombre)} aria-label={`Marcar ${m.nombre} como estudiada`} />
                    {href ? <a href={href} target={interna ? undefined : '_blank'} rel="noreferrer"><b>{m.nombre}</b></a> : <b>{m.nombre}</b>}
                    {m.apuntes && !interna && <span className="meta" style={{ fontSize: 12 }}>· apuntes</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
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
