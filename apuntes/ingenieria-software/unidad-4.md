# Unidad 4 — Implementación, Pruebas, Despliegue y Mantenimiento

## Objetivos de la unidad

- Comprender la **implementación** como traducción del diseño a código y bases de datos.
- Distinguir **verificación** de **validación** y los **niveles de prueba**.
- Aplicar pruebas de **caja negra, caja blanca y caja gris** y las técnicas de casos (equivalencia, valores límite, cobertura).
- Conocer el **despliegue** y los tipos de **mantenimiento**.
- Comparar los **modelos de ciclo de vida** (cascada, prototipos, iterativo, espiral, evolutivo, ágil).

## 1. Implementación

**Implementación** → fase donde se traduce el diseño previo a código ejecutable y bases de datos; solo corresponde iniciarla después de un análisis exhaustivo de requisitos y de aplicar principios de diseño.

### Selección de herramientas

Depende de las decisiones tomadas en diseño y de las particularidades del entorno donde el sistema operará.

- **IDEs** (Integrated Development Environments) → Visual Studio, Eclipse, IntelliJ IDEA; aportan editor de código, depurador y gestión de proyectos.
- **Lenguajes de programación** → se ajustan al tipo de sistema; Python, Java, C++, JavaScript, Ruby.
- **DBMS** (Database Management Systems) → MySQL, PostgreSQL, SQL Server, MongoDB; según exigencias de almacenamiento y recuperación de datos.

### Adquisición de recursos

Obtención formal de licencias de software y de los permisos necesarios, conforme a la reglamentación aplicable.

### Implementación ágil

La fase se divide en ciclos cortos llamados *sprints*, con entrega incremental y adaptación continua.

### Clean Code (Código Limpio)

Prácticas para que el código sea funcional, sostenible y fácil de mantener.

- **Código limpio y legible** → evitar estructuras de control confusas o anidadas excesivamente; jerarquía clara y coherente.
- **Nombres de variables descriptivos y significativos** → comunican propósito y contenido de forma concisa.
- **Algoritmos y estructuras de datos apropiados** → un algoritmo eficiente puede marcar gran diferencia en el rendimiento.
- **Lógica simple** → evitar sobrecarga de funcionalidades innecesarias para facilitar la depuración y la expansión futura.
- **Comentarios informativos** → ayudan a otros desarrolladores y a uno mismo en el futuro a entender el propósito de cada sección.
- **Sangrías y espacios en blanco** → distinguen visualmente bloques de código y facilitan la navegación.

## 2. Pruebas (Testing)

**Pruebas** (Testing) → etapa cuyo objetivo primordial es detectar y corregir errores originados en las fases anteriores, antes de que lleguen al usuario final; parten del principio de que errar es humano.

**Criterio de éxito de una prueba** → contraintuitivamente, una prueba se considera exitosa **cuando logra identificar un error**, porque eso habilita la mejora continua.

### Verificación vs. validación

- **Verificación** → comprueba si el software fue construido de acuerdo a las especificaciones acordadas ("¿estamos construyendo el sistema correctamente?").
- **Validación** → comprueba si los requerimientos son correctos y si el producto satisface las necesidades reales del usuario ("¿estamos construyendo el sistema correcto?").

Ambos son procesos distintos y complementarios: la verificación **no** garantiza que el producto sea el que el cliente quería.

### Niveles de prueba

- **Pruebas de unidad** (Unit Testing) → nivel más granular; examinan el funcionamiento de cada componente o módulo individual de forma aislada. Objetivo: descubrir limitaciones o fallos en la implementación interna del componente.
- **Pruebas de integración** (Integration Testing) → se ejecutan cuando los componentes ya probados se ensamblan entre sí; evalúan las interfaces y cómo interactúan e intercambian datos los elementos acoplados.
- **Pruebas de sistema** (System Testing) → evalúan el sistema completo de forma integral, comprobando que el software integrado funciona globalmente en su entorno operativo.
- **Pruebas de aceptación** (Acceptance Testing) → fase final, validada por el cliente o usuario para confirmar que el producto satisface los requerimientos acordados; generan la confianza necesaria para autorizar el despliegue definitivo.
- **Pruebas Alfa** (Alpha Testing) → se distribuyen versiones tempranas del código a usuarios **internos** de la organización desarrolladora, que actúan como conejillos de indias. Objetivo: depurar los problemas muy evidentes que todavía escapan a las pruebas, **antes** de involucrar a gente externa. Los probadores alfa tienen **alta tolerancia a los fallos**.
- **Pruebas Beta** (Beta Testing) → paso posterior al alfa; el software se libera a un subconjunto de usuarios **externos** representativos, en sus entornos reales de trabajo, antes del lanzamiento masivo. Objetivo: descubrir errores latentes en condiciones reales de uso. Los probadores beta tienen **menor tolerancia a los fallos**: esperan un sistema mayormente funcional.

### Clasificación por visibilidad de la estructura interna

- **Pruebas de Caja Negra** (Black-box Testing) → el probador trata el componente como una caja opaca, sin conocimiento de su estructura interna, lógica, arquitectura ni modelo de datos. Mecánica: se suministran entradas y se evalúan las salidas resultantes frente a lo esperado. Insumo: las especificaciones, historias de usuario, diagramas de casos de uso o requerimientos funcionales; no hace falta conocer el lenguaje ni el paradigma.
- **Pruebas de Caja Blanca** (White-box Testing, caja transparente) → el probador tiene visibilidad y acceso total al código fuente, la jerarquía de componentes, el flujo de control y el flujo de datos. Mecánica: se diseñan los casos de prueba **a partir de esa estructura interna**. Requisitos: conocimientos de lenguaje de programación, del paradigma orientado a objetos o del que corresponda, y de bases de datos.
  - Error frecuente → creer que caja blanca es leer el código fuente a ojo buscando errores. Eso es **análisis estático**, no prueba de caja blanca.
  - **Cobertura** (Coverage) → mide qué porcentaje del código ejercitan las pruebas.
    - $$Cobertura = \frac{\text{Statements Executed}}{\text{Total Statements}} \times 100\%$$
    - Tipos: cobertura de sentencias, de decisiones o ramas, y de caminos.
- **Pruebas de Caja Gris** (Gray-box Testing) → enfoque híbrido; se opera desde la perspectiva de caja negra pero con conocimiento parcial de lo que ocurre adentro. Ejemplo: sin acceso al modelo de base de datos, pero sabiendo qué tablas existen, cuáles son sus claves o qué *triggers* se desarrollaron.

### Técnicas de diseño de casos de prueba

- **Particionamiento de equivalencia** (Equivalence Partitioning) → divide el conjunto de datos de entrada en grupos o clases de equivalencia válidas e inválidas, dentro de las cuales se asume que el sistema responderá igual; se prueba un representante por clase en lugar de miles de valores.
- **Análisis de valores límite** (Boundary Value Analysis) → la mayoría de los errores de programación se concentra en los bordes de las condiciones (ej.: usar `<` en lugar de `<=`), por lo que se diseñan casos centrados en el mínimo, el máximo, justo por encima y justo por debajo de cada límite.
  - Ejemplo → para un campo que acepta edades entre 18 y 65, los valores 17, 18, 65 y 66 corresponden a análisis de valores límite.

### Pruebas funcionales y no funcionales

- **Pruebas funcionales** → se enfocan en el **qué** hace el sistema; validan comportamientos, reglas de negocio y flujos de entrada y salida contra los requerimientos funcionales.
- **Pruebas no funcionales** → se enfocan en el **cómo** funciona el sistema; validan atributos de calidad como rendimiento, usabilidad, seguridad o compatibilidad, a partir de los requerimientos no funcionales.

### Principios de las pruebas

- Cada ciclo de desarrollo debe contar con pruebas de validación y de verificación.
- Cada actividad de desarrollo tiene su actividad de pruebas correspondiente, y estas **deben empezar en las etapas tempranas** del ciclo de vida del software: **principio de pruebas tempranas**.
- Cada nivel de pruebas tiene objetivos específicos: los componentes buscan identificar la mayor cantidad posible de efectos; la aceptación busca crear confianza en el usuario.
- El análisis y diseño de cada nivel debe empezar **durante** la actividad de desarrollo que le corresponde.
- Los probadores deben participar en la definición y refinamiento de requerimientos y del diseño, apenas haya borradores disponibles: es clave para capturar errores antes de que avancen en el ciclo, donde repararlos será más costoso.

## 3. Instalación / Despliegue

**Despliegue** → conjunto de actividades para llevar el sistema a su entorno de producción real y ponerlo a disposición de los usuarios.

- **Planificación integral del entorno** → configuración de servidores, redes y hardware.
- **Gestión de dependencias y compatibilidad** → asegurar librerías, marcos de trabajo (*frameworks*) y versiones de soporte necesarias.
- **Garantizar una instalación exitosa** → procedimientos de verificación posteriores a la instalación.
- **Transición desde sistemas anteriores** → migración de datos y transferencia operativa sin pérdida de información.
- **Planificación de actualizaciones** → definición del esquema para distribuir parches y nuevas versiones.

## 4. Uso y mantenimiento

**Uso y mantenimiento** → etapa operativa continua una vez entregado el software; abarca las modificaciones requeridas durante su vida útil.

- **Mantenimiento correctivo** → corrige fallos del sistema o de las aplicaciones que ya no funcionan bien, originados por mal manejo del equipo, fallas eléctricas o descuidos del usuario. Ejemplos: reinstalar por completo el sistema operativo, reparar o reinstalar una aplicación dañada, restaurar archivos críticos del registro y librerías como los `.dll` de `System32`.
- **Mantenimiento preventivo** → se realiza de forma anticipada para prevenir futuras fallas y mantener el sistema fluido y optimizado. Ejemplos: ejecutar el desfragmentador de disco; usar `CCleaner` o `TuneUp` para eliminar archivos temporales, cookies, historiales y accesos directos obsoletos.
- **Mantenimiento adaptativo** → se aplica cuando las aplicaciones no funcionan bien o no son compatibles con el entorno tecnológico, por ejemplo ante cambios de sistema operativo, de navegador o de dependencias, y deben adaptarse para seguir operando. Ejemplos: incorporar complementos o *plugins* al navegador para que un sitio se visualice bien; adaptar un driver de audio diseñado para Windows 7 para que funcione en Windows 8.
- **Mantenimiento perfectivo** → incorpora mejoras, agrega funcionalidades o refactoriza el código para aumentar el rendimiento o la usabilidad de un sistema que **ya funciona correctamente**, respondiendo a nuevas necesidades del usuario o del negocio.

## 5. Modelos de ciclo de vida

**Evolución del proceso de desarrollo** → transición histórica desde enfoques rígidos hacia modelos adaptativos.

- **Modelo en cascada** → secuencial y lineal; cada fase debe concluir por completo antes de iniciar la siguiente.
  - Ventaja: entrega un software que satisface la totalidad de la solicitud del cliente.
  - Desventaja: puede tomar meses o años, porque hay que esperar a que todos los requerimientos estén completos.
- **Abandonar el modelado en cascada** → la necesidad de obtener retroalimentación temprana de los usuarios conduce a los modelos iterativos.
- **Desarrollo de prototipos** → construcción de versiones preliminares para validar y refinar los requerimientos con el usuario antes de la codificación definitiva.
- **Modelos iterativos e incrementales** → el software se desarrolla en ciclos repetitivos, en los que **análisis, diseño, construcción y pruebas** se realizan en partes pequeñas agrupando funcionalidades. En cada iteración se agregan nuevas funcionalidades, o se incorporan requerimientos nuevos, cambios de alcance y correcciones de productos de integraciones anteriores. Al final de cada iteración se obtiene un **producto funcional**, no solo un requerimiento desarrollado que por sí mismo no es operativo.
- **Scrum** (modelo iterativo incremental) → objetivo de entregar funcionalidades terminadas en periodos cortos de tiempo.
- **Modelo en espiral** → combina la naturaleza iterativa con una evaluación y gestión rigurosa de **riesgos** en cada vuelta del ciclo. El riesgo se pondera como producto de probabilidad e impacto: $$R = P \times I$$
- **Ciclo de vida evolutivo** → el sistema se adapta y crece de manera constante según la evolución de las necesidades.
- **Ciclo de vida con metodologías ágiles** → flexibilidad, entrega continua de valor y alta adaptabilidad al cambio.

Cinco bloques de la unidad: Implementación, Pruebas, Despliegue, Mantenimiento y Modelos de Ciclo de Vida.

## Fuentes de la unidad

- Apunte oficial: `01_Unidad_IV_Apunte.pdf`.
- Hoja de ruta: `IngSoftware_U4 | Genially`.
- Videos: pruebas de caja blanca/negra/gris, alpha y beta testing, mantenimiento preventivo/correctivo/adaptativo, modelos de ciclo de vida, 7 herramientas del desarrollo de software.
- NotebookLM: cuaderno "Ingeniería de Software".

> Tip de estudio: fijate la diferencia **Caja Blanca vs. Caja Negra** (y el error frecuente), los **tipos de mantenimiento** y **Cascada vs. iterativo/espiral**. Son fijos de parcial.
