# Unidad 4 — Testing

## Objetivos de la unidad

- Comprender la **implementación** como traducción del diseño a código.
- Distinguir **verificación** de **validación**.
- Aplicar pruebas de **caja negra, caja blanca y caja gris** y las técnicas de casos (equivalencia, valores límite).
- Conocer los **niveles de prueba** (unidad, integración, sistema, aceptación).
- Reconocer los tipos de **mantenimiento** y los **modelos de ciclo de vida**.

## 1. Implementación

**Implementación** → fase donde se traduce el diseño previo a código ejecutable y bases de datos; solo corresponde iniciarla después de un análisis exhaustivo de requisitos y de aplicar principios de diseño.

### Selección de herramientas

Depende de las decisiones tomadas en diseño y de las particularidades del entorno donde el sistema operará.

- **IDEs** (Integrated Development Environments): Visual Studio, Eclipse, IntelliJ IDEA; aportan editor de código, depurador y gestión de proyectos.
- **Lenguajes de programación**: se ajustan al tipo de sistema; Python, Java, C++, JavaScript, Ruby.
- **DBMS** (Database Management Systems): MySQL, PostgreSQL, SQL Server, MongoDB; según exigencias de almacenamiento y recuperación de datos.

### Implementación ágil

La fase se divide en ciclos cortos llamados *sprints*, con entrega incremental y adaptación continua.

### Clean Code (código limpio)

Prácticas para que el código sea funcional, sostenible y fácil de mantener.

- Código limpio y legible: evitar estructuras de control confusas o anidadas excesivamente; jerarquía clara y coherente.
- Nombres de variables descriptivos y significativos.
- Algoritmos y estructuras de datos apropiados.
- Lógica simple: evitar sobrecarga de funcionalidades innecesarias.
- Comentarios informativos.
- Sangrías y espacios en blanco para distinguir bloques.

## 2. Pruebas: verificación y validación

**Pruebas (Testing)** → etapa cuyo objetivo primordial es detectar y corregir errores originados en las fases anteriores, antes de que lleguen al usuario final; parten del principio de que *errar es humano*.

- **Verificación** → "¿construimos el producto correctamente?" (cumple el diseño/especificación).
- **Validación** → "¿construimos el producto correcto?" (satisface la necesidad del usuario).

### Niveles de prueba

- **Pruebas de unidad (Unit Testing)** → nivel más granular; examinan el funcionamiento de cada componente o módulo individual de forma aislada.
- **Pruebas de integración (Integration Testing)** → se ejecutan cuando los componentes ya probados se ensamblan entre sí; evalúan las interfaces y cómo interactúan e intercambian datos los elementos acoplados.
- **Pruebas de sistema (System Testing)** → evalúan el sistema completo de forma integral, comprobando que el software integrado funciona globalmente en su entorno operativo.
- **Pruebas de aceptación (Acceptance Testing)** → fase final, validada por el cliente o usuario para confirmar que el producto satisface los requerimientos acordados; generan la confianza necesaria para autorizar el despliegue definitivo.

### Tipos de prueba por caja

- **Pruebas de Caja Blanca (White-box Testing, caja transparente)** → el probador tiene visibilidad y acceso total al código fuente, la jerarquía de componentes, el flujo de control y el flujo de datos.
- **Pruebas de Caja Negra (Black-box Testing)** → el probador trata el componente como una caja opaca, sin conocimiento de su estructura interna, lógica, arquitectura ni modelo de datos.
- **Pruebas de Caja Gris (Gray-box Testing)** → enfoque híbrido; se opera desde la perspectiva de caja negra pero con conocimiento parcial de lo que ocurre adentro.

### Técnicas de casos

- **Partición de equivalencia** → agrupar entradas que se espera produzcan el mismo comportamiento.
- **Análisis de valores límite (Boundary Value Analysis)** → la mayoría de los errores de programación se concentra en los bordes de las condiciones (ej.: usar `<` en lugar de `<=`), por lo que se diseñan casos centrados en el mínimo, el máximo, justo por encima y justo por debajo de cada límite.
- **Cobertura** → medir qué porcentaje del código se ejecuta durante las pruebas.

### Pruebas alfa y beta

- **Pruebas Alfa (Alpha Testing)** → se distribuyen versiones tempranas del código a usuarios internos de la organización desarrolladora.
- **Pruebas Beta (Beta Testing)** → paso posterior al alfa; el software se libera a un subconjunto de usuarios externos representativos, en sus entornos reales de trabajo, antes del lanzamiento masivo.

## 3. Despliegue y mantenimiento

### Despliegue

Puesta en marcha del sistema en el entorno de producción, con instalación, configuración y capacitación de usuarios.

### Tipos de mantenimiento

- **Correctivo**: corrección de defectos detectados.
- **Adaptativo**: adaptación a cambios en el entorno (SO, hardware, regulaciones).
- **Perfectivo**: mejoras y nuevas funcionalidades.
- **Preventivo**: reducción de degradación futura.

## 4. Modelos de ciclo de vida

- **Cascada (Waterfall)**: secuencial, fases completas al 100%.
- **Prototipos**: construcción de prototipos para validar requisitos.
- **Iterativo**: evolución progresiva en ciclos.
- **Espiral**: combina iterativo con análisis de riesgos.
- **Evolutivo**: desarrollo incremental con entregas parciales.
- **Ágil**: ciclos cortos (sprints) con entrega continua de valor.
" path="/tmp/opencode/AGI3/apuntes/paradigmas-programacion/unidad-4.md