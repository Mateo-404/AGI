import { ruta } from '@/logica/rutas'
import { useEffect } from 'react'

/** Portada del proyecto. Usa la identidad visual de UNRaf como referencia; no es un sitio oficial. */
export function AgiInicio() {
  useEffect(() => { document.title = 'Somos #AGI · Proyecto personal' }, [])
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
        <p>Hoy hay un curso interactivo publicado: Marketing Digital. El resto del plan figura abajo para ubicarlo; todavía no tienen contenido en este proyecto.</p>
        <ul className="agi-materias">
          <li><a className="agi-materia activa" href={ruta('marketing/')}><b>Marketing Digital</b><span>Curso interactivo · 30 lecciones · práctica, glosario y tarjetas</span></a></li>
        </ul>
        <details className="agi-plan">
          <summary>Plan de estudios del CCC (por cuatrimestre)</summary>
          <ol>
            <li><b>1.º cuatrimestre:</b> Administración de capital humano · Administración y diseño de procesos organizacionales · Introducción a las Comunicaciones · Paradigmas de Programación · Inglés I</li>
            <li><b>2.º cuatrimestre:</b> Universidad, sociedad y conocimientos · <a href={ruta('marketing/')}>Marketing digital</a> · Cálculo de Costos y Rendimiento · Ingeniería de Software · Gestión de Ventas</li>
            <li><b>3.º cuatrimestre:</b> Control de Gestión · Introducción a la Optimización · Introducción a la Gestión de Datos · Gestión de Operaciones</li>
            <li><b>4.º cuatrimestre:</b> Gestión Estratégica · Financiamiento e Inversión · Gestión y Administración de las Tecnologías · Inglés II</li>
            <li><b>5.º cuatrimestre:</b> Unidad Curricular Electiva · Aprendizaje Automático y Minería de Datos · Prospectiva Tecnológica · Trabajo Final de Grado</li>
          </ol>
        </details>
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
