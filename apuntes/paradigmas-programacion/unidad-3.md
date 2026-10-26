# Unidad 3 — Programación y Paradigmas

## Objetivos de la unidad

- Definir qué es un **paradigma de programación**.
- Distinguir los **paradigmas imperativo y declarativo**.
- Comprender el **paradigma estructurado** (diseño descendente, segmentación, estructuras de control, método).
- Comprender el **paradigma orientado a objetos** (clase, instancia, pilares).
- Reconocer los paradigmas **funcional, lógico y reactivo**.

## 1. Paradigma de programación

**Paradigma de programación** → forma preestablecida de construir un programa; un conjunto de ideas o modelo que define las herramientas conceptuales para resolver problemas con código.

### Dos grupos básicos

- **Imperativos** → secuencia definida de instrucciones conectadas paso a paso que determinan qué debe hacer la computadora en cada momento (el "cómo").
- **Declarativos** → se basan en las matemáticas y la lógica; se declara **qué** se quiere obtener, sin especificar ampliamente cómo lograrlo (más cercano al razonamiento humano).

## 2. Paradigma estructurado

**Paradigma estructurado** → controla el software mediante el diseño descendente y la segmentación, con el objetivo de lograr programas eficientes y de fácil mantenimiento.

### Diseño descendente

Las instrucciones se ordenan de arriba hacia abajo para facilitar la organización y codificación del algoritmo.

### Segmentación

Dividir el problema en partes pequeñas llamadas **módulos** que resuelven tareas específicas y forman parte de la solución general.

### Estructuras de control (3 tipos)

- **Secuenciales** → bloque de instrucciones que se ejecuta en orden y de forma lineal.
- **Selectivas** → ejecutan un bloque si la condición es verdadera y un bloque alternativo si es falsa.
- **Iterativas (o interactivas)** → el bloque de instrucciones se repite un número determinado de veces mientras la condición sea verdadera.

### Método del paradigma estructurado (4 pasos)

1. Analizar el problema a resolver.
2. Listar las tareas que ayudan a solucionarlo.
3. Agrupar las semejantes en módulos.
4. Crear los algoritmos de cada tarea usando estructuras secuenciales, selectivas e iterativas.

## 3. Paradigma orientado a objetos (POO)

**POO** → el más usado en el mundo; cada elemento del sistema (usuario, carrito, producto…) es un **objeto** con **datos** y **funcionalidad**, y los objetos se comunican entre sí.

### Datos y funcionalidad

En POO los datos se llaman **atributos** y la funcionalidad se llama **métodos**.

### Clase

Plantilla o molde que define la estructura básica del objeto (sus atributos y métodos); a partir de una sola clase se crean miles de objetos sin reescribir código (ej.: el plano de una casa; el dibujo de un diseñador de vestidos).

### Instancia (o instanciación)

Proceso de crear un objeto a partir de una clase; cada objeto creado es una instancia de esa clase.

### Pilares de la POO (4)

- **Abstracción** → proceso mental de pensar qué atributos y qué métodos debe tener cada clase del sistema.
- **Encapsulamiento** → proteger la información de manipulaciones no autorizadas; define datos protegidos, privados o públicos y qué objetos pueden (o no) acceder a cierta información o métodos.
- **Polimorfismo** → dar la misma orden a diferentes objetos y que cada uno responda de su propia manera (ej.: notificar por Slack, web y correo = misma función, distinta lógica interna).
- **Herencia** → la o las clases hijas heredan atributos y funcionalidades de una clase padre pero no son idénticas: agregan sus propias características (ej.: clase padre Usuario que deriva en Staff, Profesor, Invitado).

## 4. Paradigma funcional

**Paradigma funcional** → se basa principalmente en funciones (evita los datos mutables y compartir estados); cada función realiza una sola cosa; las funciones pueden asignarse a variables y usarse como entrada o salida de otras funciones.

## 5. Paradigma lógico

**Paradigma lógico** → se apoya en la lógica y las matemáticas (hechos y reglas) para deducir respuestas.

## 6. Paradigma reactivo

**Paradigma reactivo** → opera y maneja flujos (streams) de datos asíncronos: no sabemos cuándo llegarán los datos, el sistema reacciona a los cambios en tiempo real (ej.: calidad de video según el internet).
" path="/tmp/opencode/AGI3/apuntes/paradigmas-programacion/unidad-3.md