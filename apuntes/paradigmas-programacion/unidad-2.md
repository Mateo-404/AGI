# Unidad 2 — Requerimientos de Software

## Objetivos de la unidad

- Comprender qué es el **software** y sus características únicas frente al hardware.
- Entender la **ingeniería de software**, sus capas y disciplinas.
- Distinguir un **sistema de información** de un sistema informático.
- Reconocer las actividades del **desarrollo de software** y las 4 "P".
- Dominar los **requerimientos**: definición, gestión, ingeniería, clasificación, niveles, características y técnicas de recopilación.

## 1. Software: concepto y características

**Software** → conjunto de **instrucciones**, **estructuras de datos** y **documentos** que controlan la operación de una computadora y viabilizan la información.

### Componentes del software

- **Instrucciones**: al ejecutarse, proveen características, funciones y desempeño.
- **Estructuras de datos**: permiten manipular la información adecuadamente.
- **Documentos**: describen la operación y uso de los programas.

### Características únicas del software

- **Intangible**: no es físico; su intangibilidad es la principal fuente de complejidad.
- **Alto contenido intelectual**: se desarrolla con la mente, no se manufactura.
- **No se desgasta**: a diferencia del hardware, no tiene degradación física.
- **Maleable**: puede modificarse permanentemente.
- **No es activo contable**: generalmente no figura en balances financieros.
- **Sin separación I+D / producción**: el desarrollo y la producción son el mismo proceso.

### Software vs. hardware

- **Hardware**: producción sistemática, base de conocimiento clara, fiabilidad predecible.
- **Software**: costos difíciles de prever, difícil de mantener, difícil cambiar de entorno.

## 2. Ingeniería de Software

**Crisis del software** → reconocimiento público en 1968 de problemas sistémicos: sistemas que fallan, exceden presupuesto/plazos y no cumplen expectativas.

**Ingeniería de Software** → aplicación de un enfoque **sistemático, disciplinado y cuantificable** para el **desarrollo, operación y mantenimiento** del software.

### Capas de la Ingeniería de Software

- **Calidad**: base cultural de mejora continua.
- **Proceso**: marco de trabajo con hitos y control.
- **Métodos**: cómo construir técnicamente el software.
- **Herramientas**: soporte automatizado (CASE).

### Disciplinas de la Ingeniería de Software

- **Técnicas**: requerimientos, análisis, diseño, implementación, prueba, despliegue.
- **De gestión**: planificación, monitoreo y control.
- **De soporte / protectoras**: configuración, calidad, métricas.

## 3. Sistema de información

**Sistema de información (SI)** → conjunto de **elementos interrelacionados** que permiten **recuperar y procesar información** para una organización.

### Recursos de un SI

- **Humanos**: personal.
- **Datos**: información organizada.
- **Actividades**: procedimientos.
- **Informáticos**: tecnología.

**SI ≠ sistema informático**: el sistema informático es solo **parte** del SI.

## 4. Desarrollo de software

**Desarrollo de Software** → actividad que transforma **ideas y necesidades** en un producto.

**Gran software** → cumple necesidades, se entrega a tiempo, respeta presupuesto.

### Las 4 "P"

- **Personas**: factor clave (analistas, programadores, etc.).
- **Proceso**: actividades definidas.
- **Proyecto**: esfuerzo temporal y único.
- **Producto**: artefactos resultantes.

### Características de un proyecto de software

- **Temporal**: inicio y fin definidos.
- **Único**: resultados irrepetibles.
- **Orientado a objetivos**: claros y alcanzables.
- **Elaboración gradual**: desarrollo incremental.

### Modelos de proceso

- **Secuencial**: fases completas al 100%.
- **Iterativo**: evolución progresiva.

### Artefactos

Información creada, modificada o usada en el desarrollo.

- **De ingeniería**: requerimientos, diseño, código.
- **De gestión**: planes.

### Factor humano

- **Problemas principales**: sociológicos.
- **Clave de éxito**: personas adecuadas.

### Actividades del desarrollo de software

- **Recolectar requerimientos**: definir qué construir (la más difícil).
- **Planificar**: qué, cuándo, cómo, quién.
- **Estimar**: tiempo y costo.
- **Diseñar**: arquitectura y modelos.
- **Programar**: escribir código.
- **Revisar técnicamente**: detectar errores temprano.
- **Probar**: validar y verificar.
- **Controlar configuración**: mantener integridad.
- **Monitorear**: medir avance con números.

## 5. Requerimientos de software

### Definición y concepto

**Requerimiento (IEEE)**:

- **Usuario**: necesidad para lograr un objetivo.
- **Sistema**: capacidad requerida.
- **Documento**: representación formal.

**Requerimiento** → especificación de **qué debe implementarse**.

⚠️ **Especificación deficiente** → principal causa de **fallos en proyectos**.

### Gestión e ingeniería de requerimientos

- **Gestión de requerimientos** → definir, documentar y mantener lo que el sistema debe hacer.
- **Ingeniería de requerimientos** → uso sistemático para asegurar que sean completos, consistentes y relevantes.
- ⚠️ **Requerimientos técnicos** → deben ser comprensibles y **firmados por ambas partes**.

**Origen de los requerimientos**:

- **Del sistema**: necesidades del usuario.
- **Del proyecto**: especificaciones.

### Por qué definir los requerimientos

- **Impacto del cambio tardío** → cambios al final cuestan un orden de magnitud más.
- **Control de cambios** → registro de impacto en tiempo y costo.

**Problemas habituales**:

- Falta de claridad.
- Falta de actualización.
- Alta complejidad.
- Baja participación del usuario.

### Clasificación de requerimientos

- **Requerimientos funcionales** → servicios y comportamientos del sistema.
  - Estructura: **función** (qué hace) y **comportamiento** (cómo lo hace).
  - Subtipos: proceso/negocio, interfaz gráfica, legales, seguridad.
- **Requerimientos no funcionales** → restricciones del sistema.
  - ⚠️ Deben ser **cuantificables**.
  - Ejemplo: ❌ "fácil de usar" → ✅ "máximo 3 errores diarios" / "respuesta < 2 segundos con 100 usuarios".
- **Requerimientos de dominio** → derivan del área de aplicación.

### Niveles de descripción de un requerimiento

- **Nivel de negocio** → objetivos generales.
- **Nivel de usuario** → tareas del usuario.
- **Nivel de sistema** → especificación precisa (parte del contrato).

### Características de un buen requerimiento

**Características individuales**:

- Necesario, completo, consistente, correcto, factible, modificable, priorizado, verificable, rastreable, claro.

**Debe indicar**:

- **Qué**: funcionalidad.
- **Por qué**: justificación.
- **Cómo se verifica**: criterios.

**Reglas funcionales**: comprensibles, comportamiento externo, priorizados.
**Regla no funcional**: cuantificables.

### Características de la especificación de requerimientos

**Especificación de Requerimientos** → documento que describe todos los requerimientos.

**Debe ser**: completa, consistente, modificable, trazable.

### Técnicas de recopilación de requerimientos

- **Entrevistas**: conversaciones uno a uno.
- **Cuestionarios y encuestas**: datos cuantitativos.
- **Grupos focales**: discusión grupal.
- **Revisión documental**: análisis de material existente.
- **Observación**: ver tareas reales.
- **Prototipado rápido**: maquetas visuales.
- **Casos de uso**: interacciones usuario-sistema.
- **Historias de usuario**: formato "Como [rol]…".
- **Diagramas y modelos**: visualización.
- **Benchmarking**: comparación con el mercado.
- **Análisis de problemas**: detectar mejoras.
- **Técnicas creativas**: brainstorming.
- **Análisis de restricciones**: limitaciones.
- **Análisis de riesgos**: problemas potenciales.
- **Conversaciones informales**: insights espontáneos.

**Buenas prácticas**: combinar técnicas y validar con interesados.
" path="/tmp/opencode/AGI3/apuntes/paradigmas-programacion/unidad-2.md