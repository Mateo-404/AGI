# Unidad 3 — Diseño de Software

## Objetivos de la unidad

- Comprender el **diseño de software** y sus dos aspectos (arquitectura y detalle).
- Enumerar los objetivos del **diseño de arquitectura** y el rol de los patrones.
- Distinguir los **paradigmas de programación** (imperativo y declarativo, estructurado, POO, funcional, lógico, reactivo).
- Leer e interpretar **diagramas de clases** (UML) y **diagramas de casos de uso**.

## 1. Diseño de software

**Diseño de software** → fase crítica del ciclo de vida donde se crea un plano detallado de cómo funcionará y estará estructurado el software antes de codificar; un buen diseño lleva a software más mantenible, escalable y de alta calidad.

**Escalabilidad** → capacidad de un sistema o aplicación de manejar un aumento en la carga de trabajo o la demanda de recursos sin degradación significativa del rendimiento; un software escalable crece y se adapta a las necesidades cambiantes sin volverse ineficiente o poco fiable.

El proceso de diseño consta de dos aspectos:

- **Diseño de la arquitectura**.
- **Diseño detallado**.

### Diseño de arquitectura de software

Fase inicial y crítica: planificación basada en modelos, patrones y abstracciones teóricas, paso previo a cualquier implementación; establece la estructura general del sistema y cómo encajan cada una de sus piezas.

Objetivos del diseño de arquitectura (5):

- **Satisfacer requisitos funcionales y no funcionales** → garantizar que el sistema cumpla las funciones que debe realizar (funcionales) y aspectos como rendimiento, seguridad y usabilidad (no funcionales).
- **Lograr una estructura modular** → dividir el sistema en módulos o componentes independientes, reutilizables y fáciles de mantener.
- **Facilitar la comunicación** → los componentes se comunican de manera efectiva para realizar tareas y compartir datos de forma segura.
- **Garantizar flexibilidad y escalabilidad** → permitir cambios y expansiones futuras sin afectar negativamente la integridad del sistema.
- **Mantener la coherencia** → seguir un conjunto coherente de principios y estándares para que el sistema sea fácil de entender.

**Patrones de arquitectura** → soluciones de arquitectura reutilizables; se aplican patrones según el problema y el paradigma elegido.

**Trade-off** → compensaciones entre las funciones más importantes del software; el diseño implica elegir entre distintas soluciones según prioridades.

Ventajas de documentar la arquitectura → facilita comprender, comunicar, mantener y escalar el software; una arquitectura documentada es coherente y fácil de entender.

## 2. Paradigmas de programación

**Paradigma de programación** → forma preestablecida de construir un programa; un conjunto de ideas o modelo que define las herramientas conceptuales para resolver problemas con código.

Dos grupos básicos:

- **Imperativos** → secuencia definida de instrucciones conectadas paso a paso que determinan qué debe hacer la computadora en cada momento (el "cómo").
- **Declarativos** → se basan en las matemáticas y la lógica; se declara **qué** se quiere obtener, sin especificar ampliamente cómo lograrlo (más cercano al razonamiento humano).

### Paradigma estructurado

Controla el software mediante el diseño descendente y la segmentación, con el objetivo de lograr programas eficientes y de fácil mantenimiento.

- **Diseño descendente** → las instrucciones se ordenan de arriba hacia abajo para facilitar la organización y codificación del algoritmo.
- **Segmentación** → dividir el problema en partes pequeñas llamadas **módulos** que resuelven tareas específicas y forman parte de la solución general.

Estructuras de control (3 tipos):

- **Secuenciales** → bloque de instrucciones que se ejecuta en orden y de forma lineal.
- **Selectivas** → ejecutan un bloque si la condición es verdadera y un bloque alternativo si es falsa.
- **Iterativas (o interactivas)** → el bloque de instrucciones se repite un número determinado de veces mientras la condición sea verdadera.

Método del paradigma estructurado (4 pasos):

1. Analizar el problema a resolver.
2. Listar las tareas que ayudan a solucionarlo.
3. Agrupar las semejantes en módulos.
4. Crear los algoritmos de cada tarea usando estructuras secuenciales, selectivas e iterativas.

### Paradigma orientado a objetos (POO)

El más usado en el mundo; cada elemento del sistema (usuario, carrito, producto…) es un **objeto** con **datos** y **funcionalidad**, y los objetos se comunican entre sí.

- **Datos y funcionalidad** → en POO los datos se llaman **atributos** y la funcionalidad se llama **métodos**.
- **Clase** → plantilla o molde que define la estructura básica del objeto (sus atributos y métodos); a partir de una sola clase se crean miles de objetos sin reescribir código (ej.: el plano de una casa; el dibujo de un diseñador de vestidos).
- **Instancia (o instanciación)** → proceso de crear un objeto a partir de una clase; cada objeto creado es una instancia de esa clase.

Pilares de la POO (4):

- **Abstracción** → proceso mental de pensar qué atributos y qué métodos debe tener cada clase del sistema.
- **Encapsulamiento** → proteger la información de manipulaciones no autorizadas; define datos protegidos, privados o públicos y qué objetos pueden (o no) acceder a cierta información o métodos.
- **Polimorfismo** → dar la misma orden a diferentes objetos y que cada uno responda de su propia manera (ej.: notificar por Slack, web y correo = misma función, distinta lógica interna).
- **Herencia** → la o las clases hijas heredan atributos y funcionalidades de una clase padre pero no son idénticas: agregan sus propias características (ej.: clase padre Usuario que deriva en Staff, Profesor, Invitado).

### Paradigma funcional

Se basa principalmente en funciones (evita los datos mutables y compartir estados); cada función realiza una sola cosa; las funciones pueden asignarse a variables y usarse como entrada o salida de otras funciones.

### Paradigma lógico

Se apoya en la lógica y las matemáticas (hechos y reglas) para deducir respuestas.

### Paradigma reactivo

Opera y maneja flujos (streams) de datos asíncronos: no sabemos cuándo llegarán los datos, el sistema reacciona a los cambios en tiempo real (ej.: calidad de video según el internet).

## 3. Modelado estructural: Diagramas de Clases (UML)

Los modelos permiten representar gráficamente el diseño del software para comprenderlo, comunicarlo, documentarlo y mantenerlo.

**Clase (en UML)** → representada como un rectángulo de tres secciones: nombre (arriba), atributos (medio), métodos (abajo).

- **Atributo** → dato que identifica cada instancia de la clase (también llamados campos, variables o propiedades); formato: `visibilidad nombre: tipo` (ej.: `- nombre: string`).
- **Método** → comportamiento de la clase (también llamados operaciones o funciones); formato: `visibilidad nombre(param): tipo` (ej.: `+ verificarLogin(): bool`).

**Visibilidad** → define la accesibilidad de atributos y métodos.

- `-` **privado** → solo accesible desde la misma clase o subclase.
- `+` **público** → accesible desde cualquier clase.
- `#` **protegido** → solo la misma clase o sus subclases.
- `~` **paquete** → usable desde el mismo paquete (se usa poco).

### Relaciones entre clases

- **Herencia** → flecha abierta apuntando a la superclase; las subclases heredan sus atributos y métodos; con cambios en la clase madre se actualizan todas las hijas.
- **Clase abstracta** → no se instancia directamente; sirve para simplificar y evitar repetir código; se representa en cursiva.
- **Asociación** → línea simple entre clases; relación básica sin dependencia (ej.: la nutria come erizos de mar).
- **Agregación** → diamante abierto; relación "todo-parte" donde la parte puede existir sin el todo (ej.: una tortuga puede salir del tortuguero y seguir existiendo).
- **Composición** → diamante cerrado; la parte **no puede existir** sin el todo (ej.: centro de visitantes con recepción y baño; cliente con carrito y pedidos).
- **Multiplicidad** → restricciones numéricas de la relación: `1` (uno y solo uno), `0..1` (opcional), `1..*` (uno o muchos), `0..*` (cero o muchos), o un rango específico (ej.: un cliente puede tener 0..* pedidos; un pedido pertenece a un solo cliente).

**Diagrama de objetos** → muestra instancias concretas del sistema en un momento dado (complementa al diagrama de clases).

## 4. Modelado de comportamiento: Diagramas de Casos de Uso

**Diagrama de casos de uso** → describe la funcionalidad del sistema desde el punto de vista del usuario; es un diagrama de **alto nivel** (no entra en detalles) que facilita la comunicación entre desarrolladores, clientes y usuarios, y sirve como base de escenarios de prueba.

- **Actor** → persona (usuario, administrador, técnico) u otra aplicación o sistema que interactúa con el sistema; se basa en **roles**, no en personas concretas; los actores principales van a la izquierda y los secundarios a la derecha.
- **Caso de uso (funcionalidad)** → qué puede hacer el sistema; se representa con una **elipse**; un mismo caso de uso puede ser realizado por varios actores.
- **Asociación** → línea que conecta un actor con una funcionalidad, indicando quién realiza qué.
- **Documentos de casos de uso** → descripciones escritas que detallan cada caso de uso (flujo normal, alternativas, etc.).
- **Diagramas de secuencia** → muestran la interacción entre objetos a lo largo del tiempo (mensajes ordenados).
- **Diagramas de actividad** → representan el flujo de actividades o acciones de un proceso.

## Fuentes de la unidad

- Apunte oficial: `01_Unidad_III_Apunte.pdf`.
- Hoja de ruta: `IngSoftware_U3 | Genially`.
- Videos: paradigmas de programación, programación estructurada, POO, diagramas de casos de uso UML, diagrama de clases UML.
- NotebookLM: cuaderno "Ingeniería de Software".

> Tip de estudio: fijate la diferencia **Herencia vs. Composición** en UML y los **4 pilares de la POO**. Son fijos de parcial.
