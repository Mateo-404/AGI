import type { TerminoGlosario } from '../tipos'

const t = (id: string, termino: string, lec: string, def: string, ...rel: string[]): TerminoGlosario => ({ id, termino, def, lec, rel: rel.length ? rel : undefined })

export const glosario: TerminoGlosario[] = [
  t('sistema', 'Sistema', 'is-l1-1', 'Conjunto de elementos interrelacionados que forman un todo con un propósito.', 'sistema-informacion'),
  t('sistema-informacion', 'Sistema de información', 'is-l1-1', 'Conjunto de elementos interrelacionados que recuperan y procesan información para una organización (recursos humanos, datos, actividades, informáticos).', 'sistema'),
  t('dominio-aplicacion', 'Dominio de aplicación', 'is-l1-1', 'Área o sector en el que se aplica el software (salud, finanzas, educación, etc.).', 'ingenieria-software'),
  t('ingenieria-software', 'Ingeniería de Software', 'is-l1-1', 'Aplicación de un enfoque sistemático, disciplinado y cuantificable al desarrollo, operación y mantenimiento del software.', 'sistema-informacion'),
  t('ciclo-vida', 'Ciclo de vida del software', 'is-l2-1', 'Conjunto de fases que atraviesa el software desde su concepción hasta su retiro.', 'planificacion', 'viabilidad'),
  t('planificacion', 'Planificación (fuzzy front end)', 'is-l2-1', 'Fase inicial de definición del proyecto, objetivos y alcance.', 'ciclo-vida', 'viabilidad'),
  t('viabilidad', 'Estudio de viabilidad', 'is-l2-1', 'Evaluación técnica, económica y operacional de un proyecto de software.', 'planificacion'),
  t('requerimiento', 'Requerimiento', 'is-l2-1', 'Especificación de lo que el sistema debe hacer.', 'analisis'),
  t('analisis', 'Análisis y requerimientos', 'is-l2-1', 'Fase de identificación y documentación de los requerimientos del sistema.', 'requerimiento'),
  t('diseno-software', 'Diseño de software', 'is-l3-1', 'Definición de la arquitectura y los detalles del sistema.', 'paradigma', 'uml'),
  t('paradigma', 'Paradigma de programación', 'is-l3-1', 'Forma preestablecida de construir un programa.', 'diseno-software'),
  t('uml', 'UML (Unified Modeling Language)', 'is-l3-1', 'Lenguaje de modelado para visualizar, especificar y documentar sistemas.', 'diseno-software'),
  t('clase-uml', 'Diagrama de clases', 'is-l3-1', 'Diagrama UML que muestra la estructura estática del sistema (clases, atributos, métodos, relaciones).', 'uml'),
  t('caso-uso', 'Diagrama de casos de uso', 'is-l3-1', 'Diagrama UML que muestra la interacción entre actores y el sistema.', 'uml'),
  t('implementacion', 'Implementación', 'is-l4-1', 'Fase donde se traduce el diseño a código ejecutable y bases de datos.', 'prueba', 'despliegue'),
  t('prueba', 'Prueba (testing)', 'is-l4-1', 'Etapa para detectar y corregir errores antes de que lleguen al usuario final.', 'verificacion', 'validacion'),
  t('verificacion', 'Verificación', 'is-l4-1', '«¿Construimos el producto correctamente?» (cumple el diseño).', 'validacion'),
  t('validacion', 'Validación', 'is-l4-1', '«¿Construimos el producto correcto?» (satisface la necesidad).', 'verificacion'),
  t('despliegue', 'Despliegue', 'is-l4-1', 'Puesta en marcha del sistema en el entorno de producción.', 'implementacion'),
  t('mantenimiento', 'Mantenimiento', 'is-l4-1', 'Modificaciones posteriores a la entrega: correctivo, adaptativo, perfectivo y preventivo.', 'despliegue'),
  t('modelo-ciclo-vida', 'Modelo de ciclo de vida', 'is-l4-1', 'Modelo que define las fases del desarrollo (cascada, iterativo, espiral, ágil, etc.).', 'ciclo-vida'),
  t('agil', 'Agilidad / Manifiesto Ágil', 'is-l5-1', 'Conjunto de valores y principios para el desarrollo de software con entregas incrementales.', 'scrum', 'kanban'),
  t('scrum', 'Scrum', 'is-l5-1', 'Marco ágil con roles, artefactos y eventos para gestionar el desarrollo en sprints.', 'agil', 'kanban'),
  t('kanban', 'Kanban', 'is-l5-1', 'Método ágil de gestión visual del flujo de trabajo mediante tablero y límites WIP.', 'agil', 'scrum'),
  t('jira', 'JIRA', 'is-l5-1', 'Herramienta de gestión de proyectos y seguimiento de issues.', 'scrum', 'kanban'),
]