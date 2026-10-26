# Unidad 5 — Metodologías Ágiles

## Objetivos de la unidad

- Comprender la **agilidad** y el **Manifiesto Ágil**.
- Conocer el marco **Scrum**: roles, artefactos y eventos.
- Conocer **Kanban**: gestión visual del flujo y límite WIP.
- Conocer **JIRA** y el modelo híbrido **Scrumban**.
- Comparar **Scrum vs. Kanban**.

## 1. Agilidad y Manifiesto Ágil

**Metodología ágil** → enfoque de desarrollo que entrega valor funcional en ciclos muy cortos para obtener feedback real y ajustar el rumbo a tiempo, en lugar de planificar todo por adelantado.

**Entornos BUCA/VUCA** → volátiles, inciertos, complejos y ambiguos; el software los habita, a diferencia de la obra civil, que trabaja en entornos estables y predecibles.

**Modelo en cascada (enfoque tradicional)** → planifica el proyecto completo a largo plazo antes de entregar; sirve en entornos estables y predecibles, no en software.

Problemas del modelo tradicional:

- **Procesos y herramientas pesados** → burocracia que frena la creatividad y la colaboración.
- **Documentación excesiva** → cientos de páginas que nadie lee ni mantiene.
- **Negociación contractual rígida** → genera conflictos de interés entre cliente y desarrolladores.
- **Seguir un plan riguroso** → compromisos imposibles de cumplir ante cambios continuos del mercado.

**Manifiesto Ágil (2001)** → documento creado por **17 líderes del desarrollo de software** que fija los 4 valores de la agilidad.

Valores del Manifiesto Ágil:

1. **Individuos e interacciones** sobre procesos y herramientas.
2. **Software funcionando** sobre documentación extensiva.
3. **Colaboración con el cliente** sobre negociación contractual.
4. **Respuesta ante el cambio** sobre seguir un plan.

## 2. Scrum: roles, artefactos y eventos

**Scrum** → marco de trabajo ágil, liviano y fácil de entender; toma su nombre del rugby, donde el equipo empuja unido hacia el mismo objetivo.

### Roles de Scrum

- **Product Owner** → representa la voz del cliente; levanta los requisitos, los traduce en historias de usuario y prioriza el Product Backlog.
- **Scrum Master** → facilitador y moderador (no es jefe ni da órdenes): remueve obstáculos, asegura que se cumplan las reglas del marco y busca la excelencia técnica.
- **Team Developer** → equipo multidisciplinario (programadores, testers, analistas); su tamaño óptimo es de 7 ± 2 personas (entre 5 y 9).

**Analogía del cerdo y la gallina** → la gallina solo se *involucra* (pone los huevos y sigue viva); el cerdo se *compromete* de lleno (da la vida). El equipo Scrum son los "cerdos" y el cliente la "gallina".

### Artefactos de Scrum

- **Product Backlog** → lista completa (inicialmente sin ordenar ni estimar) de todas las funcionalidades o historias de usuario del proyecto.
- **Sprint Backlog** → historias y tareas seleccionadas del Product Backlog que el equipo se compromete a realizar en el Sprint actual.
- **Incremento (entregable funcional)** → versión del software 100% terminada, probada y operativa que se obtiene al cerrar cada Sprint.
- **Planning Poker** → técnica de estimación donde el equipo asigna valores numéricos (0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100) medidos en días ideales de trabajo.

### Eventos de Scrum

- **Sprint** → corazón de Scrum: período de trabajo acotado que dura entre **1 y 4 semanas** (lo habitual son 2) para construir un incremento funcional.
- **Sprint Planning** → reunión inicial donde el PO, el SM y el equipo estiman las historias de usuario y arman el Sprint Backlog.
- **Daily Scrum (Stand-Up)** → reunión diaria de **máximo 15 minutos**, de pie frente al tablero; cada desarrollador responde: ¿qué hice ayer?, ¿qué voy a hacer hoy? y ¿qué problemas o bloqueos encontré?
- **Sprint Review (Demo)** → reunión al final del Sprint donde se presenta el entregable funcional al cliente para recibir su feedback.
- **Sprint Retrospective** → reunión interna posterior a la demo para analizar qué funcionó, qué falló y cómo mejorar el proceso en el próximo Sprint.

## 3. Kanban: gestión visual del flujo

**Kanban** → método de gestión visual del flujo de trabajo, creado por **Taiichi Ohno** en Toyota (década de 1940) y aplicado al software por **David J. Anderson** en 2004.

- **Tablero Kanban** → tablero con columnas básicas *Por hacer*, *En proceso* y *Listo*, donde cada tarjeta es una tarea.
- **Límite WIP** → cantidad máxima de tareas permitidas simultáneamente en la columna "En proceso", para no sobrecargar la capacidad del equipo.
- **Objetivo de Kanban** → visualizar el trabajo para identificar cuellos de botella y lograr que las tareas fluyan a rendimiento óptimo.

Reglas de Kanban:

- **Visualizar el flujo** → tablero con columnas y tarjetas.
- **Limitar el WIP** → tope de tareas en proceso.
- **Administrar el flujo** → evitar acumulación de trabajo.
- **Hacer explícitas las reglas** → acuerdos de cuándo una tarjeta avanza.
- **Bucles de retroalimentación** → detectar y corregir errores temprano.

## 4. JIRA

**JIRA** → herramienta de gestión y seguimiento de proyectos (en la nube u *onsite*); su plan gratuito es *Always Free* para equipos de hasta **10 usuarios**.

- **Incidencia (issue o ticket)** → unidad básica de trabajo en JIRA; puede ser del tipo *Story*, *Bug*, *Task* o *Sub-task*.
- **Épica** → gran iniciativa que agrupa tareas y abarca varios Sprints; se visualiza en el Roadmap del proyecto.
- **Workflow en JIRA** → flujo de trabajo personalizable con reglas restrictivas (por ejemplo, prohibir que una tarea pase a *Done* sin haber pasado antes por *In Review*).
- **Integraciones de JIRA** → se conecta nativamente con GitHub, Slack, Microsoft Teams y Confluence.

## 5. Scrum vs. Kanban

Diferencias:

- **Tiempo** → Scrum usa Sprints (bloques fijos de 1 a 4 semanas); Kanban es flujo continuo, sin ciclos fijos.
- **Control del trabajo** → Scrum limita el Sprint Backlog al inicio; Kanban limita el WIP por columna.
- **Cambios** → Scrum no admite tareas nuevas a mitad de Sprint; Kanban permite agregar o repriorizar en cualquier momento.
- **Roles** → Scrum exige roles formales (PO, SM, Developers); Kanban no prescribe roles.

**Scrumban** → modelo híbrido: conserva las reuniones diarias de 15 minutos y los Sprints cortos de Scrum, pero organiza el trabajo visualmente en un tablero tipo Kanban.

## Fuentes de la unidad

- Videos: "¿Qué es Agile?", "Scrum en 6 minutos", "Caso práctico de Scrum: Lego", "Metodología Kanban", "Scrum + Kanban", "JIRA: qué es y cómo se usa".
- NotebookLM: cuaderno "Ingeniería de Software".

> Tip de estudio: fijate los **4 valores del Manifiesto Ágil**, los **3 roles/3 artefactos/ceremonias de Scrum**, el **límite WIP en Kanban** y las **diferencias Scrum vs. Kanban**. Son fijos de parcial.
