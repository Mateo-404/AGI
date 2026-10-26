# Unidad 1 — Modelos de Información

## 1. Conceptos fundamentales

### Símbolo
Todo aquello que por convención remite a algo que no necesariamente necesita estar presente; su significado es arbitrario y cultural, no intrínseco.
*Ejemplos:* letras, palabras, gestos, colores, sonidos no lingüísticos.

### Atributo
Propiedad o cualidad de los entes y sucesos al ser representados simbólicamente; pueden ser identificadores, descriptores, localizadores o relacionadores.

### Dato
Representación simbólica de propiedades o cualidades de entes y sucesos, usada como antecedente para decidir una acción concreta.

**Propiedades de los datos:**
- **Transmitir:** llevarlos de un lugar a otro o comunicárselos a alguien.
- **Almacenar:** guardarlos para su posterior uso.
- **Transformar / procesar:** operar sobre ellos con ciertas reglas para obtener nuevos datos.

### Información
Representaciones simbólicas que, por el significado que les asigna quien las recibe e interpreta, **disminuyen la incertidumbre** y permiten decidir un curso de acción entre varios posibles.

> **Regla clave:** toda información consta de datos, pero **no todos los datos constituyen información**.

### Diferencias clave: Dato vs. Información

- **Dato:** representación simbólica de entes, hechos, atributos — sin significado para la máquina que los procesa.
- **Información:** datos que, por el significado que les atribuye quien decide, permiten tomar una decisión con la **menor incertidumbre posible**.

---

## 2. Teoría de la Información

Conjunto de leyes matemáticas que rigen la transmisión, almacenamiento y procesamiento de información; se ocupa de la **medición**, **representación (codificación)** y **capacidad** de los sistemas.

Desarrollada por **Claude E. Shannon** en 1948 — *"A Mathematical Theory of Communication"*.

### Tres conceptos básicos

- **Medida de la información:** cuantificación probabilística del contenido informativo de un mensaje.
- **Capacidad del canal:** límite máximo de la tasa de información transmisible por un sistema.
- **Codificación:** técnica para adaptar la fuente al canal y maximizar la transferencia de información.

### Teorema fundamental
Dada una fuente y un canal, existe una codificación que permite transmitir información a una tasa menor que la capacidad del canal **con errores arbitrariamente pequeños**, incluso en presencia de ruido.

### Información e incertidumbre

Relación información–probabilidad:
- **A menor probabilidad de ocurrencia:** mayor valor informativo (evento inesperado → mucha información).
- **A mayor probabilidad de ocurrencia:** menor valor informativo (evento cierto → información = 0).
- **Certeza total (P = 100 %):** la cantidad de información es **0**.

La medida de la información no depende de la **longitud** del mensaje, sino de la **probabilidad** de que ese mensaje sea recibido dentro de un conjunto de mensajes posibles.

### Protocolo, sincronización y estandarización

- **Protocolo:** codificación acordada previamente entre emisor y receptor para poder interpretar los mensajes.
- **Sincronización:** funcionamiento coordinado en cuanto al tiempo; sin ella el mensaje puede llegar fuera de momento y perder efecto.
- **Estandarización:** establecimiento de convenciones regulares para que todos interpreten los símbolos de la misma manera.

### Fórmula de Shannon

Cantidad de información (I): medida probabilística del valor informativo de un mensaje.

- **Expresión:** `I = log₂(1/P)` donde P es la probabilidad del mensaje transmitido.
- **log₂:** logaritmo en base 2 — el exponente al que hay que elevar 2 para obtener el argumento (ej.: log₂8 = 3, porque 2³ = 8).
- **Unidad:** el resultado se expresa en **bits**.

**Fórmula alternativa (igual probabilidad):** `I = log₂(Nᴱ)`
- N = cantidad de alternativas posibles (variables); E = cantidad de elementos (ej.: monedas).
- *Ejemplo moneda:* N=2, E=1 → I = log₂(2¹) = 1 bit.

### Bit
Unidad mínima de información binaria; corresponde a la elección entre dos símbolos igualmente probables (0 y 1).
Con **n** bits se pueden representar **2ⁿ** estados (ej.: 8 bits → 256 combinaciones).

---

## 3. Sistema de comunicación de Shannon

### Componentes del sistema de comunicación

- **Transmisor:** convierte el mensaje en señales eléctricas o electromagnéticas (ej.: micrófono, teléfono).
- **Canal de comunicación:** medio físico por el que viajan las señales (ej.: cable, atmósfera).
- **Ruido:** interferencias que distorsionan la señal en el canal (ej.: estática en radios, "lluvia" en TV).
- **Receptor:** transforma la señal recibida de vuelta al mensaje original (ej.: parlante de radio).

### Capacidad del sistema de comunicaciones
Límite de la tasa de información que puede ser transmitida; determinado por limitaciones físicas fundamentales.

---

## 4. Señales analógicas y digitales

### Señal
Cantidad física que varía con el tiempo, el espacio u otra variable independiente.

### Señal analógica
Función de una variable **continua** que toma valores en un rango continuo; predomina en la naturaleza (voz, temperatura, presión).
- Conversión al dominio digital: **conversor A/D** (analógico → digital).
- Conversión de vuelta: **conversor D/A** (digital → analógico).

### Señal digital
Variación **discontinua** con el tiempo; solo toma valores discretos (0 o 1); forma característica de pulsos cuadrados.

**Ventajas de las señales digitales:**
- ✅ Mayor inmunidad al ruido (interferencias).
- ✅ Se almacenan fácilmente en distintos soportes.
- ✅ Sistemas fácilmente reconfigurables por software.
- ✅ Generalmente más económicos de implementar.

Con **n** señales binarias en **paralelo** se representan **2ⁿ** estados.
En modo **serie**: información enviada secuencialmente por una línea única.

---

## 5. Sistemas de numeración

### Sistema posicional / ponderado
El valor de cada dígito depende del símbolo utilizado **y** de su posición en el número.

### Comparación de sistemas

- **Decimal (base 10):** usa 10 símbolos (0–9); cada posición = potencia de 10.
- **Binario (base 2):** usa 2 símbolos (0 y 1); cada posición = potencia de 2; subíndice ₂ para distinguir.
- **Hexadecimal (base 16):** usa 16 símbolos (0–9, A–F); cada dígito hex = 4 bits binarios.

### Equivalencias hexadecimal
0→0000, 1→0001 … 9→1001, A→1010, B→1011, C→1100, D→1101, E→1110, F→1111.

### Ventajas del sistema hexadecimal
- ✅ Notación mucho más compacta que el binario.
- ✅ La mayoría de datos binarios ocupa múltiplos de 4 bits → conversión directa.
- ✅ Conversión binario ↔ hex muy simple (agrupación de 4 bits).

---

## 6. Conversiones entre sistemas

### Binario → Decimal
1. **Enumerar** los dígitos de derecha a izquierda comenzando desde 0.
2. **Multiplicar** cada dígito por 2 elevado al número asignado.
3. **Sumar** todos los productos.
*Ejemplo:* 1011₂ = (1×2³)+(0×2²)+(1×2¹)+(1×2⁰) = 8+0+2+1 = **11₁₀**.

### Decimal → Binario
1. **Dividir** el número decimal por 2 repetidamente hasta que el dividendo sea menor que 2.
2. **Leer** el número binario: primer número = último cociente obtenido; luego concatenar los restos **de abajo hacia arriba** (derecha a izquierda).
*Ejemplo:* 28 ÷2=14 r0; 14÷2=7 r0; 7÷2=3 r1; 3÷2=1 r1 → **11100₂**.

### Decimal → Hexadecimal
1. **Dividir** el número decimal por 16.
2. La **parte entera** del cociente pasa a la siguiente fila; la **parte decimal** × 16 da el dígito hex de esa fila (si ≥10, usar letra A–F).
3. Repetir hasta que no sea posible dividir; leer los dígitos hex **de abajo hacia arriba**.
*Ejemplo:* 6898 → 1AF2₁₆.

### Hexadecimal → Decimal
1. **Enumerar** los dígitos de derecha a izquierda comenzando desde 0.
2. **Multiplicar** cada dígito por 16 elevado al número asignado (A=10, B=11 … F=15).
3. **Sumar** todos los productos.
*Ejemplo:* 1A3F₁₆ = 1×16³ + 10×16² + 3×16¹ + 15×16⁰ = 4096+2560+48+15 = **6719₁₀**.

### Binario → Hexadecimal
1. **Agrupar** los bits de derecha a izquierda en grupos de 4 (completar con ceros a la izquierda si es necesario).
2. **Reemplazar** cada grupo de 4 bits por su símbolo hexadecimal equivalente.
*Ejemplo:* 11011110 0001₂ → 1101 1110 0001 ↔ **DE1₁₆**.

---

## 7. Códigos binarios

### Complemento a 2
- **Uso:** representar números binarios **negativos**.
- **MSB** (bit más significativo): bit de signo — 0 = positivo, 1 = negativo.
- **Procedimiento para número negativo:** convertir a binario → **complementar** todos los bits (complemento a 1) → **sumar 1** (ignorar eventual acarreo).
- **Ventaja:** permite resolver **restas** realizando sumas; ej.: 6+(−5) = 0110+1011 = (1)0001 = 1₁₀.

### Código BCD (Decimal Codificado en Binario)
Usa grupos de 4 bits (nibbles) para representar cada dígito decimal (0–9).
*Ejemplo:* 732₁₀ = 0111 0011 0010 en BCD.

### Código Gray
Código binario **sin peso**; característica: dos números sucesivos difieren en **exactamente 1 bit**.

---

## 8. Funciones lógicas (Álgebra de Boole)

### Álgebra de Boole
Sistema algebraico para calcular e interpretar datos binarios mediante conjuntos de elementos y operaciones lógicas.
Desarrollada por **George Boole** — Lincoln, 1815–1864; base de la lógica de microprocesadores.

### Operaciones lógicas básicas

- **AND** (`OUT = A · B`): salida en 1 solo cuando **ambas** entradas son 1; equivale a llaves en **serie**.
- **OR** (`OUT = A + B`): salida en 1 cuando **al menos una** entrada es 1; equivale a llaves en **paralelo**.
- **NOT** (`OUT = Ā`): salida = **complemento** de la entrada (0→1, 1→0).
- **NAND** (`OUT = A·B̄`): AND seguido de NOT — salida en 0 solo cuando **ambas** entradas son 1.
- **NOR** (`OUT = Ā+B̄`): OR seguido de NOT — salida en 1 solo cuando **ambas** entradas son 0.
- **XOR** (`OUT = A⊕B`): salida en 1 cuando la cantidad de entradas en 1 es **impar** (entradas distintas).
- **XNOR** (`OUT = A⊕B̄`): XOR seguido de NOT — salida en 1 cuando las entradas son **iguales**.

---

## 9. Técnicas de codificación de señales

### Codificación
Proceso de convertir niveles lógicos normalizados a una forma adecuada para la transmisión.

### NRZ (No Return to Zero)
- **NRZ básico:** tensión constante durante la duración del bit; 0 = ausencia de tensión, 1 = tensión positiva.
- **NRZ-L (Level):** nivel negativo = 1 lógico; nivel positivo = 0 lógico.
- **NRZ-I (Invert on ones):** transición al inicio del intervalo = 1; ausencia de transición = 0 (codificación **diferencial**).
- ✅ Ventajas NRZ: fácil implementación, uso eficaz del ancho de banda.
- ❌ Desventajas NRZ: componente DC continua, sin capacidad de sincronización en cadenas largas.

### Binario multinivel
- **Bipolar-AMI:** 0 = ausencia de señal; 1 = pulso alternante positivo/negativo.
- **Pseudoternario:** inverso del AMI — 1 = ausencia; 0 = pulso alternante.
- ✅ Sin componente DC; mejor sincronización en cadenas de 1; detección de errores por alternancia.

### Bifásicos (autosincronizados)
- **Manchester:** transición en mitad del intervalo — de bajo a alto = 1; de alto a bajo = 0.
- **Manchester diferencial:** transición en mitad = sincronización; transición al inicio del intervalo = 0; ausencia de transición al inicio = 1.
- ✅ Ventajas bifásicos: autosincronización, sin componente DC, detección de errores por ausencia de transición esperada.

---

## 10. Autoevaluación

- **¿La teoría de la información mide la capacidad de transmisión?** → **Verdadero** — se ocupa de la medición de la información y la capacidad de los sistemas.
- **¿La información aumenta la incertidumbre?** → **Falso** — la información **disminuye** la incertidumbre.
- **¿La cantidad de información depende de la longitud del mensaje?** → **Falso** — depende de la **probabilidad** del mensaje, no de su longitud.
- **¿La medida de la información está relacionada con la incertidumbre?** → **Verdadero**.
- **¿Cómo se llama el límite de la tasa de información transmisible?** → **Capacidad del sistema de comunicaciones**.

---

## Tablas de referencia rápida

### Conversiones Binario ↔ Decimal
- `01` = 1 | `1101` = 13 | `1100` = 12 | `1111` = 15 | `0011` = 3
- `0101` = 5 | `1010` = 10 | `0000` = 0 | `110011` = 51 | `10101` = 21
- `0100011` = 35 | `01111000` = 120 | `1110011` = 115 | `10011` = 19
- `11011` = 27 | `111` = 7 | `100000001` = 257 | `00110` = 6
- `7₁₀` = `111₂` | `9₁₀` = `1001₂` | `12₁₀` = `1100₂` | `34₁₀` = `100010₂`
- `100₁₀` = `1100100₂` | `205₁₀` = `11001101₂` | `63₁₀` = `111111₂` | `1023₁₀` = `1111111111₂`

### Conversiones Hexadecimal ↔ Binario
- `12A₁₆` = `100101010₂` | `3C0₁₆` = `1111000000₂` | `FF₁₆` = `11111111₂`
- `D1A₁₆` = `110100011010₂` | `11₁₆` = `10001₂` | `10₁₆` = `10000₂`
- `26₁₆` = `00100110₂` | `A1₁₆` = `010100001₂` | `66C₁₆` = `11001101100₂`
- `8₁₆` = `1000₂` | `9₁₆` = `01001₂` | `55₁₆` = `01010101₂`
