import type { FilaCobertura, Materia } from './tipos'
import { lecciones as leccionesMarketing, unidades as unidadesMarketing, glosario as glosarioMarketing } from './marketing/indice'
import { cobertura as coberturaMarketing } from './marketing/cobertura'
import { ampliaciones as ampliacionesMarketing } from './marketing/ampliaciones'

import { lecciones as leccionesAdministracionProcesos, unidades as unidadesAdministracionProcesos, glosario as glosarioAdministracionProcesos } from './administracion-procesos/indice'
import { cobertura as coberturaAdministracionProcesos } from './administracion-procesos/cobertura'
import { ampliaciones as ampliacionesAdministracionProcesos } from './administracion-procesos/ampliaciones'
import { lecciones as leccionesCalculoCostos, unidades as unidadesCalculoCostos, glosario as glosarioCalculoCostos } from './calculo-costos/indice'
import { cobertura as coberturaCalculoCostos } from './calculo-costos/cobertura'
import { ampliaciones as ampliacionesCalculoCostos } from './calculo-costos/ampliaciones'
import { lecciones as leccionesGestionVentas, unidades as unidadesGestionVentas, glosario as glosarioGestionVentas } from './gestion-ventas/indice'
import { cobertura as coberturaGestionVentas } from './gestion-ventas/cobertura'
import { ampliaciones as ampliacionesGestionVentas } from './gestion-ventas/ampliaciones'
import { lecciones as leccionesIngenieriaSoftware, unidades as unidadesIngenieriaSoftware, glosario as glosarioIngenieriaSoftware } from './ingenieria-software/indice'
import { cobertura as coberturaIngenieriaSoftware } from './ingenieria-software/cobertura'
import { ampliaciones as ampliacionesIngenieriaSoftware } from './ingenieria-software/ampliaciones'
import { lecciones as leccionesIngles1, unidades as unidadesIngles1, glosario as glosarioIngles1 } from './ingles-1/indice'
import { cobertura as coberturaIngles1 } from './ingles-1/cobertura'
import { ampliaciones as ampliacionesIngles1 } from './ingles-1/ampliaciones'
import { lecciones as leccionesIntroduccionComunicaciones, unidades as unidadesIntroduccionComunicaciones, glosario as glosarioIntroduccionComunicaciones } from './introduccion-comunicaciones/indice'
import { cobertura as coberturaIntroduccionComunicaciones } from './introduccion-comunicaciones/cobertura'
import { ampliaciones as ampliacionesIntroduccionComunicaciones } from './introduccion-comunicaciones/ampliaciones'
import { lecciones as leccionesParadigmasProgramacion, unidades as unidadesParadigmasProgramacion, glosario as glosarioParadigmasProgramacion } from './paradigmas-programacion/indice'
import { cobertura as coberturaParadigmasProgramacion } from './paradigmas-programacion/cobertura'
import { ampliaciones as ampliacionesParadigmasProgramacion } from './paradigmas-programacion/ampliaciones'
import { lecciones as leccionesUniversidadSociedad, unidades as unidadesUniversidadSociedad, glosario as glosarioUniversidadSociedad } from './universidad-sociedad-conocimientos/indice'
import { cobertura as coberturaUniversidadSociedad } from './universidad-sociedad-conocimientos/cobertura'
import { ampliaciones as ampliacionesUniversidadSociedad } from './universidad-sociedad-conocimientos/ampliaciones'

/**
 * Registro único de materias. Cada materia vive en `contenido/<slug>/` y reutiliza el mismo motor que Marketing.
 * En el navegador, `scripts/vite-curso-liviano.ts` reemplaza este módulo por una versión sin el cuerpo de las lecciones.
 */
const m = (
  slug: string,
  nombre: string,
  corto: string,
  descripcion: string,
  lecciones: Materia['lecciones'],
  unidades: Materia['unidades'],
  glosario: Materia['glosario'],
  cobertura: FilaCobertura[],
  ampliaciones: Materia['ampliaciones'],
  fuentes: string[] = [],
  nota?: string,
): Materia => ({ slug, nombre, corto, descripcion, lecciones, unidades, glosario, cobertura, ampliaciones, fuentes, nota })

export const materias: Record<string, Materia> = {
  marketing: m(
    'marketing',
    'Marketing Digital',
    'Marketing',
    'Curso interactivo de Marketing Digital (UNRaf 2026) basado en el cuaderno de cátedra.',
    leccionesMarketing,
    unidadesMarketing,
    glosarioMarketing,
    coberturaMarketing,
    ampliacionesMarketing,
  ),
  'administracion-procesos': m(
    'administracion-procesos',
    'Administración y diseño de procesos organizacionales',
    'Procesos',
    'Apuntes de Administración y diseño de procesos organizacionales: calidad, diseño, mejora, tecnología, automatización y gestión del cambio.',
    leccionesAdministracionProcesos,
    unidadesAdministracionProcesos,
    glosarioAdministracionProcesos,
    coberturaAdministracionProcesos,
    ampliacionesAdministracionProcesos,
  ),
  'calculo-costos': m(
    'calculo-costos',
    'Cálculo de Costos y Rendimiento',
    'Costos',
    'Apuntes de Cálculo de Costos y Rendimiento: contabilidad de costos, sistemas de costeo y análisis marginal.',
    leccionesCalculoCostos,
    unidadesCalculoCostos,
    glosarioCalculoCostos,
    coberturaCalculoCostos,
    ampliacionesCalculoCostos,
  ),
  'gestion-ventas': m(
    'gestion-ventas',
    'Gestión de Ventas',
    'Ventas',
    'Apuntes de Gestión de Ventas: planeación, organización, dirección, control y ética de la fuerza de ventas.',
    leccionesGestionVentas,
    unidadesGestionVentas,
    glosarioGestionVentas,
    coberturaGestionVentas,
    ampliacionesGestionVentas,
  ),
  'ingenieria-software': m(
    'ingenieria-software',
    'Ingeniería de Software',
    'Ing. de Software',
    'Apuntes de Ingeniería de Software: ciclo de vida, diseño, pruebas, despliegue, mantenimiento y metodologías ágiles.',
    leccionesIngenieriaSoftware,
    unidadesIngenieriaSoftware,
    glosarioIngenieriaSoftware,
    coberturaIngenieriaSoftware,
    ampliacionesIngenieriaSoftware,
  ),
  'ingles-1': m(
    'ingles-1',
    'Inglés I',
    'Inglés I',
    'Apuntes de Inglés I: verbo to be, presente simple y continuo, modales, artículos, vocabulario y expresiones de uso frecuente.',
    leccionesIngles1,
    unidadesIngles1,
    glosarioIngles1,
    coberturaIngles1,
    ampliacionesIngles1,
  ),
  'introduccion-comunicaciones': m(
    'introduccion-comunicaciones',
    'Introducción a las comunicaciones',
    'Comunicaciones',
    'Apuntes de Introducción a las comunicaciones: modelos, redes, OSI, TCP/IP, LAN, seguridad y diseño.',
    leccionesIntroduccionComunicaciones,
    unidadesIntroduccionComunicaciones,
    glosarioIntroduccionComunicaciones,
    coberturaIntroduccionComunicaciones,
    ampliacionesIntroduccionComunicaciones,
  ),
  'paradigmas-programacion': m(
    'paradigmas-programacion',
    'Paradigmas de Programación',
    'Paradigmas',
    'Apuntes de Paradigmas de Programación: pensamiento computacional, requerimientos, paradigmas y testing.',
    leccionesParadigmasProgramacion,
    unidadesParadigmasProgramacion,
    glosarioParadigmasProgramacion,
    coberturaParadigmasProgramacion,
    ampliacionesParadigmasProgramacion,
  ),
  'universidad-sociedad-conocimientos': m(
    'universidad-sociedad-conocimientos',
    'Universidad, sociedad y conocimientos',
    'Universidad y sociedad',
    'Apuntes de Universidad, sociedad y conocimientos: la universidad argentina, su historia y el conocimiento científico.',
    leccionesUniversidadSociedad,
    unidadesUniversidadSociedad,
    glosarioUniversidadSociedad,
    coberturaUniversidadSociedad,
    ampliacionesUniversidadSociedad,
  ),
}

/** Orden en el que se muestran las materias en la portada y en la navegación. */
export const listaMaterias: string[] = [
  'administracion-procesos',
  'introduccion-comunicaciones',
  'paradigmas-programacion',
  'ingles-1',
  'universidad-sociedad-conocimientos',
  'marketing',
  'calculo-costos',
  'ingenieria-software',
  'gestion-ventas',
]

export const materiaDe = (slug: string): Materia => materias[slug] ?? materias.marketing!
