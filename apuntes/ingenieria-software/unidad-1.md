# Unidad 1 — Introducción a la Ingeniería de Software

## Objetivos de la unidad

- Definir qué es un **sistema** y un **subsistema**, y reconocer las características clave de todo sistema.
- Distinguir **entradas**, **procesos** y **salidas**, y las relaciones entre sistemas (retroalimentación, causalidad, dependencia, sinergia).
- Comprender qué es un **sistema de información**, sus componentes, funciones y tipos.
- Reconocer los **dominios de aplicación** del software.
- Entender qué es la **Ingeniería de Software**, sus capas, su proceso y sus etapas fundamentales.

## 1. Sistemas

**Sistema** → Conjunto de elementos interconectados y organizados que trabajan coordinadamente para lograr un objetivo específico. Un sistema puede operar dentro de otro mayor (subsistema); las salidas del subsistema se convierten en entradas del sistema mayor.

**Subsistema** → Sistema que opera dentro de otro mayor.

### Características clave de un sistema

- **Elementos o componentes**: objetos, personas, procesos, datos o entidades relevantes.
- **Interconexiones e interacciones**: relaciones que determinan cómo los elementos se influyen y trabajan en conjunto.
- **Objetivo o propósito**: finalidad para la que fue diseñado; guía sus acciones.
- **Entorno**: contexto externo que provee las entradas y recibe las salidas.
- **Límites o fronteras**: definen qué elementos son parte del sistema y cuáles no.
- **Funcionamiento y comportamiento**: funciones y conducta en respuesta a las entradas.
- **Emergencia y propiedades sistémicas**: propiedades que emergen de las interacciones entre elementos y no se explican viendo cada componente aislado.

### Partes de un sistema

- **Entradas** → insumos que ingresan al sistema desde el entorno:
  - **Datos**: información numérica, alfabética o simbólica.
  - **Recursos**: materias primas, herramientas, energía.
  - **Señales o eventos**: activan o disparan el funcionamiento.
  - **Información externa**: datos de otras fuentes o sistemas.
  - Una entrada puede ser la salida de otro sistema conectado.
- **Procesos** → actividades, operaciones o transformaciones que procesan las entradas y generan las salidas.
  - **Caja negra**: proceso del que se conocen entradas y salidas pero no las transformaciones internas; simplifica el análisis de sistemas complejos.
- **Salidas** → resultados, productos, servicios o información generados:
  - **Resultados físicos**: productos manufacturados, bienes.
  - **Información**: informes, reportes, análisis.
  - **Servicios**: actividades que satisfacen una necesidad.
  - Las salidas pueden convertirse en entradas de otro sistema.

### Relaciones entre sistemas

- **Retroalimentación (feedback)** → influencia mutua entre las salidas y las entradas del sistema.
  - **Positiva**: la salida refuerza o amplifica una acción; efectos acumulativos o exponenciales.
  - **Negativa**: la salida regula o contrarresta una acción; estabiliza el sistema dentro de límites.
- **Causalidad** → un elemento afecta directamente a otro (causa → efecto).
- **Dependencia** → la existencia o rendimiento de un elemento depende de otro.
- **Sinergia** → los elementos trabajan juntos para lograr un resultado más valioso que la suma de las partes.
- Otras: equifinalidad, jerarquía o niveles, interconexión.

## 2. Sistemas de información (SI)

**Sistema de información (SI)** → Conjunto de componentes interconectados que trabajan juntos para recoger, procesar, almacenar y difundir información, para que una organización tome las mejores decisiones. Objetivo: proporcionar información relevante, precisa y oportuna para facilitar decisiones informadas.

**SI ≠ Sistema informático**: el sistema informático es solo parte del SI.

### Componentes de un SI

- **Hardware**: computadoras, servidores, dispositivos de almacenamiento y equipos físicos.
- **Software**: aplicaciones, programas y sistemas operativos para procesar, analizar y visualizar datos.
- **Datos**: información recopilada y organizada (registros, archivos, bases de datos); materia prima de la información.
- **Personas**: usuarios (proporcionan y acceden a la información) y especialistas IT (administran y mantienen el sistema).
- **Procedimientos**: políticas, normas y procesos para capturar, manipular y distribuir información de forma coherente y segura.
- **Redes de comunicación**: Internet y redes internas que conectan los componentes y a los usuarios.

### Ciclo básico de un SI

Recopilación de datos → procesamiento a información significativa → almacenamiento → distribución.

### Dato vs. información

- **Dato** → representación básica y aislada de un hecho, carente de significado por sí mismo (ej.: "18 de diciembre de 2022").
- **Información** → conjunto de datos organizados y procesados que adquieren sentido y utilidad al ser interpretados y contextualizados (ej.: "Argentina campeón del mundo el 18/12/2022").

### Características de un SI

Fiables y precisos; flexibles y adaptables; seguros (protegen información sensible); eficientes (procesan grandes volúmenes de datos con rapidez).

### Funciones de un SI

- Gestionar y administrar datos de la empresa.
- Automatizar procesos internos sin intermediarios.
- Unificar la información en almacenes estandarizados.
- Brindar información actualizada en tiempo real a los tomadores de decisiones.
- Favorecer el aprovechamiento del tiempo y la productividad de los empleados.

### Tipos de sistemas de información

- **Transaccional**: procesa y registra transacciones comerciales diarias (ventas, compras, pagos); ej.: SAP, Salesforce.
- **Gerencial**: información resumida y reportes para decisiones de nivel medio; ej.: Tableau, Power BI.
- **Estratégico**: ayuda a directivos en decisiones estratégicas de futuro; ej.: Oracle Hyperion, Google Analytics.
- **Experto**: usa conocimiento especializado para resolver problemas complejos; ej.: IBM Watson.
- **Soporte a la toma de decisiones**: modelos y herramientas para decisiones no estructuradas o semi-estructuradas; ej.: Tableau, Power BI, Excel.
- **Procesamiento de transacciones**: grandes volúmenes de transacciones rutinarias; ej.: SAP Business One.

## 3. Dominios de aplicación del software

**Dominio de aplicación** → ámbito o campo específico en el que se utiliza o aplica el software.

- **Software Empresarial**: gestión y operación de empresas: ERP, CRM, RRHH, gestión de proyectos (ej.: SAP S/4HANA).
- **Software de Entretenimiento**: videojuegos, streaming de música y video, redes sociales, realidad virtual (ej.: Fortnite).
- **Software de Educación**: aprendizaje en línea, LMS, enseñanza asistida por computadora (ej.: Google Classroom).
- **Software de Salud**: registros médicos electrónicos, sistemas hospitalarios, telemedicina (ej.: Epic EHR).
- **Software de Finanzas**: contabilidad, gestión de impuestos, banca en línea (ej.: QuickBooks).
- **Aplicaciones Web**: programas accedidos por navegador (email, redes sociales, productividad); ej.: Google Workspace.
- **Software Embebido**: integrado en dispositivos (electrodomésticos, automóviles, dispositivos médicos); ej.: Android OS.
- **Software de Inteligencia Artificial**: algoritmos y aprendizaje automático para tareas que requieren inteligencia humana (ej.: Amazon Alexa).

## 4. Ingeniería de Software (IS)

**Ingeniería de Software** → disciplina con enfoque sistemático que aplica principios de ingeniería, técnicas y métodos científicos a la conceptualización, diseño, desarrollo, implementación, prueba, mantenimiento y evolución del software.

**Definición IEEE** → "Aplicación de un enfoque sistemático, disciplinado y cuantificable al desarrollo, operación y mantenimiento de software; la aplicación de la ingeniería al software".

**Va más allá de la codificación** → enfoque holístico y estructurado para abordar la complejidad de crear software. Implica: identificar problemas; formular soluciones; planificar y ejecutar procesos; gestionar recursos y riesgos; evaluar constantemente que el resultado cumpla los requisitos.

**Busca software** → confiable, eficiente, seguro, mantenible y escalable, con especial atención a la calidad.

**Técnicas utilizadas** → modelización y simulación, diseño orientado a objetos, gestión de configuración, gestión de proyectos, prácticas de desarrollo ágil; comunicación y colaboración efectiva en equipos multidisciplinarios.

**Uso** → crear software de escritorio, móvil y web en educación, soluciones empresariales, entretenimiento, salud, finanzas y comunicaciones.

### Importancia (beneficios)

- **Calidad y confiabilidad**: software que funciona correctamente y sin errores; reduce problemas costosos.
- **Eficiencia en el desarrollo**: planificación que acelera la entrega de soluciones.
- **Gestión de cambios**: incorporar cambios de manera controlada ante nuevas necesidades.
- **Satisfacción del cliente**: el software cumple las expectativas y necesidades del usuario final.
- **Mantenibilidad**: software fácil de mantener, actualizar y mejorar; prolonga su vida útil.
- **Colaboración efectiva**: comunicación entre el equipo que agiliza la resolución de problemas.
- **Reducción de riesgos**: planificación que identifica y mitiga riesgos en etapas tempranas.
- **Cumplimiento y seguridad**: cumple estándares normativos y protege datos y privacidad.
- **Eficiencia en costos**: menos errores, desarrollo más rápido y mantenimiento optimizado.

### Capas de la Ingeniería de Software

Tecnología multicapa; la base o primera capa está orientada a la calidad.

- **Compromiso con la calidad** → asegurar que el software cumpla estándares de fiabilidad, rendimiento, seguridad y usabilidad.
- **Proceso** → gestión y planificación del desarrollo: metodologías, recursos, tareas, seguimiento del progreso.
- **Métodos** → enfoques y técnicas para diseñar, desarrollar y probar (ágil, orientado a objetos, ingeniería de requisitos).
- **Herramientas** → IDE, control de versiones, pruebas automatizadas; mejoran productividad y eficiencia.

### Proceso de Ingeniería de Software

Secuencia de pasos para construir software según los requerimientos del cliente; mejora el entendimiento del problema y la comunicación entre los involucrados.

- **Comunicación** → comprender las necesidades y requerimientos del cliente; una de las etapas más importantes porque es primordial entender el problema.
- **Planeación** → definir objetivos, estimar recursos (tiempo, personal, tecnología), analizar viabilidad, fijar cronograma e identificar riesgos y estrategias de mitigación.
- **Modelado** → crear representaciones visuales (diagramas, arquitectura, estructura de datos, flujos de información) para entender y comunicar la solución al cliente y al equipo.
- **Construcción** → codificar y desarrollar el software según el diseño y los modelos; pruebas unitarias y corrección de errores.
- **Despliegue** → instalar el software en el entorno de producción; verificar funcionamiento y prueba final antes de ponerlo a disposición de los usuarios.

### Práctica de la Ingeniería de Software: etapas fundamentales

- **Entender el problema (Comunicación y Análisis)** → interactuar con clientes y partes interesadas para capturar y analizar requisitos; entrevistas, encuestas y discusiones.
  - Preguntas clave: ¿quiénes son los participantes? ¿cuáles son las incógnitas (datos, funciones, características)? ¿puede fraccionarse el problema? ¿puede representarse gráficamente (modelo de análisis)?
- **Planear la solución (Modelado y Diseño)** → crear modelos conceptuales y diagramas de estructura, arquitectura y funcionalidad; definir relaciones entre componentes e interfaces; el resultado es un plan detallado para la implementación.
  - Preguntas clave: ¿hay patrones o software existente que resuelva problemas similares? ¿son reutilizables elementos de una solución previa? ¿puede representarse la solución para una implementación eficaz?
- **Ejecutar el plan (Generación del Código)** → escribir código fuente con lenguajes y técnicas adecuadas, siguiendo mejores prácticas y estándares; código limpio, eficiente y bien estructurado.
  - Preguntas clave: ¿el código se ajusta al plan y al modelo de diseño? ¿se revisó o probó la corrección de cada componente?
- **Examinar la exactitud del resultado (Probar y Asegurar la Calidad)** → ejecutar pruebas funcionales, de rendimiento, de seguridad y de compatibilidad; manuales o automatizadas; esencial para el despliegue.
  - Preguntas clave: ¿puede probarse cada componente con una estrategia razonable? ¿la solución cumple todos los requerimientos y se validó contra los participantes?
- **Aplicación a otros procesos** → el mismo proceso se aplica a mejorar un proceso productivo u organizacional: planificación y análisis, diseño y modelado, implementación y construcción, pruebas y verificación, despliegue y puesta en marcha.

## Fuentes de la unidad

- Apunte oficial: `01_Unidad_I_Apunte.pdf`.
- Videos: "¿Qué son los sistemas de información?", "Tipos de sistemas de información", "Sistemas de Business Intelligence".
- NotebookLM: cuaderno "Ingeniería de Software" (fuentes de la cátedra).

> Tip de estudio: fijate que la **calidad** es el cimiento de las capas de la IS y que **dato ≠ información**. Son fijos de parcial.
