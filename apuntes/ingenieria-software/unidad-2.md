# Unidad 2 — Ciclo de Vida: Planificación y Análisis

## Objetivos de la unidad

- Comprender el **ciclo de vida del software** y sus fases (con la pregunta guía de cada una).
- Aplicar la **planificación** (fuzzy front end): alcance, viabilidad, riesgos, costos, cronograma y recursos.
- Evaluar la **viabilidad técnica, económica y operacional**, y comparar COTS, CUSTOM y ASP.
- Dominar los **requerimientos**: elicitación, tipos (funcionales y no funcionales), SRS y su administración.

## 1. Ciclo de vida del software

Todo sistema de información pasa por fases a lo largo de su vida.

### Fases y su pregunta guía

- **Planificación**: ¿es viable el proyecto?
- **Análisis**: ¿qué debe hacer el software?
- **Diseño**: ¿cómo lo va a hacer?
- **Implementación**: se construye (codificación).
- **Pruebas**: ¿funciona como debe?
- **Instalación o despliegue**: ¿funciona como se pidió?
- **Uso y mantenimiento**: correcciones.

Origen de las fases (George Polya): resolver un problema requiere comprenderlo (análisis), plantear una solución considerando alternativas (diseño), llevarla a cabo (implementación) y comprobar el resultado (pruebas). Planificación, instalación y mantenimiento son extras del mundo real: el desarrollo tiene costes (planificación) y el sistema debe poder usarse (instalación y mantenimiento).

**Prácticas** → conceptos, principios, métodos y herramientas que facilitan lograr los objetivos de cada etapa.

## 2. Planificación (fuzzy front end)

Actividades previas al inicio oficial del proyecto, sin plazos rígidos, con impacto crucial en el éxito.

### Tareas esenciales

- **Definición del alcance del proyecto** → objetivos, metas, límites y expectativas del sistema.
- **Estudio de viabilidad** → análisis técnico, financiero y operativo; recursos disponibles y capacidad de éxito.
- **Análisis de riesgos** → identificar y evaluar riesgos; estrategias de mitigación.
- **Estimación de costos** → presupuesto de desarrollo, implementación y mantenimiento.
- **Planificación temporal** → cronograma con fechas clave e hitos.
- **Asignación de recursos** → recursos humanos y materiales por etapa; roles y responsabilidades.

### Origen de los proyectos de sistemas

Dos razones amplias:

- **Problemas** que requieren soluciones basadas en sistemas de información (ej.: supermercado con gestión de inventario en tiempo real).
- **Oportunidades** de mejora actualizando o adaptando sistemas existentes o creando otros nuevos (ej.: startup de delivery con enrutamiento automatizado).

**Problema** → situación en la que los objetivos nunca se alcanzaron o se dejaron de cumplir.

### Criterios para seleccionar un proyecto de software

No todos los proyectos deben seleccionarse para análisis y desarrollo.

Consideraciones generales:

- Rechazar proyectos impulsados solo por reputación, poder o beneficio personal.
- Mirar el proyecto desde perspectiva de sistemas: los subsistemas están interconectados, un cambio repercute en toda la organización; no seleccionar un proyecto de forma aislada.

Cinco criterios específicos:

- **Respaldo de la administración** → esencial (quien paga la cuenta); sin patrocinio no se logra nada.
- **Momento oportuno** → la organización y el analista deben poder comprometer el tiempo requerido.
- **Mejorar el logro de objetivos organizacionales** → ganancias, estrategia competitiva, cooperación con distribuidores, soporte a operaciones internas, soporte a decisiones, servicio al cliente, moral de los empleados.
- **Práctico en recursos y capacidades** → del analista y de la empresa.
- **Que valga la pena** → frente a otras formas de invertir recursos (agilizar procesos, eliminar pasos duplicados, combinar procesos, reducir errores de entrada, reducir almacenamiento o salida redundante, mejorar integración de subsistemas).

### Definición del alcance del proyecto

Determinar qué se resuelve en el proyecto y qué queda **fuera** (lo excluido debe indicarse explícitamente). Si se incluye algo no previsto: reajustar la estimación de costos y la planificación temporal.

Resultado: documento breve de 1 o 2 páginas llamado *mission statement* o **project charter**, que describe el problema a resolver, funcionalidad de alto nivel, características principales y objetivos clave; debe formar parte del contrato con el cliente. Debe superar la **prueba del ascensor** → lenguaje comprensible para cualquiera, sin vocabulario excesivamente técnico.

## 3. Estudio de viabilidad

Con recursos ilimitados casi todo proyecto sería viable; en la realidad los recursos son escasos.

**Informe Chaos (Standish Group, 1994)**: crisis crónica de la programación.

- Solo 1 de cada 6 proyectos se completó a tiempo, dentro del presupuesto y con todas las características.
- La mitad se completó eventualmente: con sobrecosto, retraso y menos características.
- Más del 30% se canceló antes de completarse.

Se evalúa la viabilidad **económica, técnica y legal** antes de comenzar. No es un análisis exhaustivo; busca datos generales para que la alta dirección decida si procede un estudio detallado. Datos mediante entrevistas (a quienes piden asistencia y a tomadores de decisiones) y recolección de datos. Debe ser ágil: hay muchas propuestas y pocas se seleccionan.

### Viabilidad técnica

¿Se puede desarrollar el sistema con los recursos técnicos disponibles?

- Si no: ¿se puede actualizar o complementar el sistema existente?
- ¿Existe en el mercado la tecnología necesaria?
- ¿La organización tiene personal con las habilidades requeridas? ¿Se puede contratar o subcontratar?
- ¿Existen paquetes de software preexistentes (comerciales o de código abierto) que cumplan los objetivos?

Determinación de necesidades de hardware y software:

- Inventariar el hardware computacional disponible en la organización.
- Determinar los requerimientos de información de los humanos con los usuarios.
- Considerar estructura organizacional y cómo interactúan los usuarios con la tecnología.

### Evaluación de software: COTS vs. CUSTOM vs. ASP

Tres opciones: **comprar** software comercial, **rentar** a un proveedor de servicios de aplicación (ASP) o **crear** software personalizado.

- **COTS** (Commercial Off-The-Shelf) → software comercial de canales tradicionales (ej.: Microsoft Office, Oracle, SAP).
  - Ventajas: refinado por uso y distribución comercial; exhaustivamente probado, alta confiabilidad; funcionalidad mejorada por productos afiliados; costo inicial menor que desarrollo interno o ASP; muchas empresas usan el mismo software (simplifica la interacción); suele incluir soporte técnico y capacitación.
  - Desventajas: sin personalización completa; puede contener errores; riesgo legal por fallos de servicio; orientado a la programación, no a las necesidades humanas (los usuarios se adaptan); capacidad restringida de personalización; investigar la estabilidad financiera del proveedor; percepción reducida de propiedad.
- **CUSTOM** (software original o a medida) → se justifica cuando no existe COTS, la aplicación no se identifica en el mercado, es prohibitivamente costoso o las licencias son complicadas; también para ventaja competitiva, comercio electrónico, innovación, sectores especializados.
  - Ventajas: satisface necesidades específicas, ventaja competitiva, mantenimiento interno y orgullo de propiedad.
  - Desventajas: costos iniciales significativamente mayores; requiere equipo de desarrollo y la organización asume el mantenimiento continuo.
- **ASP** (proveedor de servicios de aplicación / subcontratación) →
  - Beneficios: la organización se centra en sus competencias fundamentales; elimina contratar, formar y retener personal de TI (ahorros).
  - Desventajas: pérdida de control sobre datos corporativos, sistemas, empleados de TI y gestión de tiempos; incertidumbre sobre la estabilidad financiera del ASP; preocupaciones de seguridad, confidencialidad y privacidad de datos; riesgo de perder ventaja estratégica por no desarrollar internamente.

### Viabilidad económica

Recursos a considerar: tiempo del analista y del equipo, costo del estudio completo de sistemas (incluye tiempo de empleados), gasto del tiempo de empleados de la empresa, estimación de costos de hardware, proyección de costos de software. La organización debe percibir el valor de la inversión antes de comprometerse. Si los costos a corto plazo no se compensan con ganancias a largo plazo ni reducción de costos operativos, el sistema no es viable económicamente y el proyecto no debe seguir.

Identificación, pronóstico y comparación de costos y beneficios (se consideran en conjunto, interdependientes):

- **Beneficios tangibles** → medibles en dinero, valor económico directo (eficiencia de procesamiento, acceso a información, disponibilidad de datos, potencia de cálculo, reducción de tiempo de empleados).
- **Beneficios intangibles** → difíciles de medir pero importantes (mejora de decisiones, precisión, competitividad en servicio, imagen comercial, experiencia de usuario, satisfacción laboral); un sistema basado solo en intangibles no tendrá éxito.
- **Costos tangibles** → estimaciones cuantificables y predecibles (hardware, recursos, tiempo de analistas y programadores, salarios).
- **Costos intangibles** → difíciles de cuantificar y a menudo desconocidos (pérdida de ventaja competitiva, reputación, imagen, ineficiencia en decisiones).

Técnicas para comparar costos y beneficios:

- **Análisis de punto de equilibrio** → punto donde los costos totales del sistema actual y el propuesto se cruzan; rentable obtener el nuevo sistema; útil cuando el volumen es clave; desventaja: asume beneficios constantes.
- **Análisis de flujo de efectivo** → examina dirección, tamaño y patrón del flujo; si reemplazar no genera efectivo adicional, hay que justificar con otros beneficios tangibles; analizar cuándo ocurren desembolsos e ingresos durante toda la vida del sistema.
- **Análisis del valor presente** → evalúa todos los desembolsos e ingresos durante la vida económica, comparando costos y beneficios actuales con futuros (valor en tiempo de la inversión).

### Viabilidad operacional

Relacionada con los **recursos humanos** disponibles: ¿funcionará y será utilizado el sistema una vez implementado? Factor clave: actitud y disposición de los **usuarios finales**.

- Usuarios arraigados al sistema existente y sin problemas: reacios a adoptar el nuevo (bajas posibilidades de uso).
- Usuarios que expresaron la necesidad de más funcionalidad y participan activamente: mayor probabilidad de éxito.

### Análisis de riesgos

Siempre surge algún contratiempo; herramienta: **gestión de riesgos**.

- **Evaluación de riesgos** → identificar riesgos que afectan el plan, estimar probabilidad de materialización, analizar impacto.
- **Control de riesgos** → planes de contingencia para los más probables y desastrosos; eliminar o mitigar el riesgo de raíz buscando alternativas.

Dejar **margen para imprevistos** y holgura en la planificación.

### Estimación de costos

Una de las dos causas más comunes de fracaso (la otra: requerimientos inestables con cambios continuos). Se estima en el peor momento: al comienzo, cuando menos se conoce el proyecto. El arte de estimar se basa en la **experiencia** del estimador.

Reglas:

- Nunca estimar sobre la marcha: respuesta meditada tras estudiar los factores.
- Reducir incertidumbre con datos históricos e información precisa.
- **Descomponer el proyecto en tareas** → el error de estimar el conjunto es mayor que el de estimar cada actividad (los errores se compensan, ley de los grandes números).
- Cuidado con **subestimar**: muchas tareas se olvidan y cada tarea parece más fácil de lo que es.

### Planificación temporal y asignación de recursos

Equilibrio en el nivel de detalle: planificar por **semanas** (no por días) da flexibilidad para contingencias. El plan debe ajustarse a medida que cambian las circunstancias; los proyectos tienden a retrasarse gradualmente; reconocer señales de alarma. Una tarea está **completada o no**; no hay "casi terminado". El último 10% de una tarea suele requerir el 90% del tiempo ("la primera mitad del trabajo consume el 90% del tiempo; la segunda, el 90% restante").

- **Planificación** → seleccionar el equipo de análisis, asignar miembros por habilidades, estimar tiempo por tarea, programar estratégicamente, asignar recursos.
- **Control** → proceso continuo; comparar plan original con evolución actual; tomar medidas ante desviaciones o reprogramar; motivar y liderar el equipo.

Estimación de tiempos: balancear alto nivel vs. desglose detallado; la experiencia es clave; usar estimaciones pesimistas, optimistas y más probables con promedio ponderado (no elimina la incertidumbre); adherirse a una metodología estructurada que identifique y describa actividades en detalle.

### Diagrama de Gantt

Representación gráfica del proyecto a lo largo del tiempo: **eje horizontal** = línea de tiempo (días, semanas, meses); **eje vertical** = tareas del proyecto. Cada tarea es una **barra horizontal** desde la fecha de inicio prevista hasta la de finalización; la longitud refleja la duración. Puede incluir dependencias entre tareas, hitos y asignación de recursos; identifica cuellos de botella o retrasos.

- Ventaja: **simplicidad**; fácil de aplicar; comunicación efectiva con usuarios finales; barras a escala.
- Desventaja: no muestra la precedencia de las actividades (a diferencia de PERT).

### Diagrama PERT (Técnicas de Evaluación y Revisión de Programas)

Red de **nodos** (eventos) y **flechas** (actividades) que permite evaluar y revisar el progreso. Origen: proyecto del submarino nuclear **Polaris** (Marina de EE.UU., finales de los 50s); ahorró 2 años de desarrollo. Ventaja: maneja **actividades en paralelo** (miembros del equipo trabajando simultáneamente).

- **Eventos** (nodos circulares) → indican que una actividad se completó y señalan las actividades que deben finalizar antes de comenzar otra (secuencia y precedencia).
- Identifica **precedencia**, **ruta crítica** y **tiempo de inactividad**.
- **Ruta crítica** → camino más largo del proyecto; cualquier retraso en sus actividades retrasa todo el proyecto; enfocar la atención en actividades críticas.

## 4. Análisis y requerimientos

Los errores más problemáticos derivan de la falta de **requerimientos explícitos** (suposiciones tácitas nunca documentadas). Actividad fundamental: **elicitación de requerimientos** (identificar los requerimientos reales del sistema). Identificar a todos los **stakeholders** (partes interesadas): cliente que financia, usuarios finales, terceros con interés indirecto (competidores, reguladores).

### Técnicas de elicitación

- **Entrevistas** → importa qué se pregunta y cómo se plantea.
- **Cuestionarios** → encuestas masivas cuando no hay tiempo ni recursos para entrevistar a todos.
- **Prototipos** → obtener información que no se conocería hasta etapas finales (cuando corregir es más costoso).
- **Observación** del entorno y **participación** temporal en las funciones de los usuarios.
- **Investigación independiente** → revisar documentos o productos similares del mercado.
- También: grupos focales, revisión documental, casos de uso, historias de usuario, brainstorming, diagramas y modelos, benchmarking, análisis de problemas, técnicas creativas, análisis de restricciones, análisis de riesgos, conversaciones informales.

Buenas prácticas: combinar técnicas y validar con interesados.

Alrededor del **25%** de los requerimientos cambia o se agrega durante el proyecto; el costo de modificar requerimientos crece a lo largo del ciclo de vida.

### Requerimientos

Pautas que establecen qué debe lograr el sistema: los **servicios** que debe proporcionar y las **limitaciones** bajo las cuales debe funcionar. Manifiestan las necesidades de los clientes.

- **Ingeniería de requerimientos** → proceso de descubrir, analizar, documentar y verificar servicios y limitaciones.
- **Requerimientos del usuario** → enunciados en lenguaje natural y diagramas; servicios esperados y restricciones de operación; nivel abstracto de alto nivel.
- **Requerimientos del sistema** → detalles precisos sobre funciones, servicios y restricciones operativas; documento llamado **especificación funcional**; puede ser parte del contrato con el desarrollador.

La redacción debe adaptarse a distintos lectores:

- Usuarios y administradores: menos interés técnico; se centran en resultados y mejora de procesos.
- Desarrolladores: perspectiva técnica; funcionalidades, flujos de datos, interfaces, integración.

Requerimientos ambiguos: el desarrollador simplifica la implementación, el resultado no coincide con las expectativas y aparecen nuevos requerimientos, retrasos y mayores costos.

### Requerimientos funcionales y no funcionales

- **Funcionales** → describen los servicios que el sistema debe proporcionar, cómo responde a entradas específicas y su comportamiento; incluyen lo que debe y lo que no debe hacer. Ej.: "el sistema de gestión de ventas debe permitir registrarse con correo y contraseña".
  - Subtipos: de proceso o negocio, de interfaz gráfica, legales, de seguridad.
  - Estructura: función (qué hace) + comportamiento (cómo lo hace).
- **No funcionales** → limitaciones sobre los servicios y funciones; restricciones de tiempo, proceso de desarrollo y estándares; se aplican al sistema en su conjunto. Ej.: "el tiempo de respuesta al buscar productos no debe superar 2 segundos con alto volumen de usuarios concurrentes".
  - Deben ser **cuantificables** (ej.: ❌ "fácil de usar" / ✅ "máximo 3 errores diarios" / ✅ "respuesta < 2 segundos con 100 usuarios").
  - Los no funcionales (rendimiento, seguridad, disponibilidad) suelen ser **más cruciales** que los funcionales individuales: su incumplimiento puede hacer inútil todo el sistema (ej.: aeronave sin confiabilidad no se certifica).
  - Razones por las que afectan a todo el sistema: influyen más en la arquitectura general que en componentes individuales; un único no funcional (ej.: seguridad) puede generar nuevos requerimientos funcionales o restringir los existentes.

Origen: necesidades del usuario, presupuesto, políticas organizacionales, interoperabilidad, regulaciones de seguridad y legislación de privacidad.

Tipos de requerimientos no funcionales:

- **Del producto** (comportamiento del software): rendimiento, fiabilidad, seguridad, usabilidad.
- **De la organización** (políticas y procedimientos del cliente y del desarrollador): proceso operacional, proceso de desarrollo, ambientales.
- **Externos** (impuestos por reguladores, legisladores o ética): regulatorios, legislativos, éticos.

### Requerimientos de dominio

Derivan del área de aplicación específica del sistema.

### Niveles de descripción de un requerimiento

- **Nivel de negocio** → objetivos generales.
- **Nivel de usuario** → tareas del usuario.
- **Nivel de sistema** → especificación precisa (parte del contrato).

### Características de un buen requerimiento

Características individuales: necesario, completo, consistente, correcto, factible, modificable, priorizado, verificable, rastreable, claro. Debe indicar: qué (funcionalidad), por qué (justificación), cómo se verifica (criterios). Reglas funcionales: comprensibles, comportamiento externo, priorizados. Regla no funcional: cuantificables.

Características de la especificación de requerimientos: completa, consistente, modificable, trazable.

### Técnicas de recopilación de requerimientos

Entrevistas; cuestionarios y encuestas; grupos focales; revisión documental; observación; prototipado rápido; casos de uso; historias de usuario ("Como [rol]…"); diagramas y modelos; benchmarking; análisis de problemas; técnicas creativas (brainstorming); análisis de restricciones; análisis de riesgos; conversaciones informales. Buenas prácticas: combinar técnicas y validar con interesados.

### Documento de requerimientos de software (SRS)

Comunicado oficial que detalla qué deben implementar los desarrolladores. Contiene requerimientos del usuario y especificación de los requerimientos del sistema (pueden combinarse o separarse en proyectos complejos). Esencial con **contratistas externos**: actúa como contrato formal.

Nivel de detalle según el tipo de sistema y proceso de desarrollo:

- Sistemas críticos: requerimientos detallados (seguridad y protección).
- Subcontratación: especificaciones precisas.
- Proceso iterativo interno: documento menos detallado; las ambigüedades se resuelven durante el desarrollo.

Usuarios del documento: clientes del sistema (especifican, analizan y validan), administradores (planifican la cotización), ingenieros del sistema (entienden qué sistema desarrollarse), ingenieros de prueba (desarrollan pruebas de validación), ingenieros de mantenimiento (comprenden el sistema y las relaciones entre componentes).

### Especificación de requerimientos

Proceso que crea el documento de requerimientos con detalle de requerimientos del usuario y del sistema. Guía todo el proceso de diseño, desarrollo e implementación. Criterios ideales: claridad, ausencia de ambigüedad, facilidad de comprensión, completitud y consistencia. Requerimientos del usuario: lenguaje natural; del sistema: pueden usar notaciones gráficas o modelos matemáticos (especificaciones formales en sistemas críticos de seguridad).

### Proceso de ingeniería de requerimientos

Cuatro actividades de alto nivel:

- **Estudio de factibilidad** → valorar si el sistema es útil para la empresa.
- **Adquisición y análisis** → descubrir requerimientos.
- **Especificación** → convertir los requerimientos a una forma estándar.
- **Validación** → comprobar que los requerimientos definen el sistema que quiere el cliente.

Proceso **iterativo en espiral**; la salida es el documento de requerimientos del sistema. Al inicio: más esfuerzo en requerimientos empresariales de alto nivel, no funcionales y del usuario; más tarde: adquisición de requerimientos detallados del sistema.

### Administración de requerimientos

Los requerimientos de sistemas a gran escala son **inherentemente susceptibles al cambio**: el problema es demasiado complejo para definirse exhaustivamente desde el principio; requerimientos incompletos. Una vez instalado el sistema, surgen invariablemente nuevos requerimientos.

Razones del cambio:

- **(A) Entornos empresariales y tecnológicos** cambian después de la implementación (nuevas tecnologías, integraciones, prioridades, regulaciones).
- **(B) Financiadores y usuarios finales** no son los mismos: los financiadores imponen restricciones organizativas y presupuestarias que pueden chocar con los usuarios finales.
- **(C) Comunidad diversa de usuarios** con requisitos conflictivos; el equilibrio final debe ajustarse con la experiencia.

Gestión: rastrear individualmente los requerimientos, mantener conexiones entre dependientes, evaluar el impacto de los cambios, proceso formal para propuestas de cambio. El proceso formal inicia cuando hay un borrador del documento; planificar la gestión del cambio incluso durante la adquisición.

⚠️ Un requerimiento ambiguo hace que el desarrollador simplifique la implementación, el resultado no coincida con las expectativas y aparezcan nuevos requerimientos, retrasos y mayores costos.

## Fuentes de la unidad

- Apunte oficial: `Unidad 2 - Apunte.pdf`.
- Especificaciones: `IngSoftware_1Parcial_Especificaciones.pdf`.
- Videos: Project Charter, Diagrama de Gantt, Red PERT, Documento ERS/SRS, Requerimientos Funcionales y No Funcionales.
- NotebookLM: cuaderno "Ingeniería de Software".

> Tip de estudio: fijate la diferencia **RF vs. RNF** (cuantificables), las **3 viabilidades** y **Gantt vs. PERT** (ruta crítica). Son fijos de parcial.
