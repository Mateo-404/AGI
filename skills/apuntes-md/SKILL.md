---
name: apuntes-md
description: Escribir o editar apuntes de lecciones de Somos #AGI en Markdown (contenido/<materia>/lecciones/lN-M.md y lN-M.practica.yaml). Usar para agregar una lección, corregir una, agregar preguntas o tarjetas, o convertir material a este formato.
---

# Apuntes en Markdown

Una lección son **dos archivos** en `contenido/<materia>/lecciones/`: `l2-3.md` (el apunte) y `l2-3.practica.yaml` (preguntas y tarjetas). El proyecto los renderiza: vos escribís solo contenido. Después corré `bun test` y `bun run verificar`: te dicen la línea exacta de cada error.

## Reglas que no se negocian
1. **Origen en cada bloque de contenido** (párrafo, lista, tabla, callout, definición, ejemplo, comparar), al final y entre llaves:
   - `{c 1 | 14}` cuaderno: capítulo | página | sección (página y sección son opcionales: `{c 3}`).
   - `{d}` explicación didáctica (no está en la fuente).
   - `{a Nombre de la fuente}` ampliación externa.
2. **No inventes** páginas, capítulos, citas ni cifras. Si no lo sabés de la fuente, es `{d}` o `{a …}`.
3. Español rioplatense (voseo), con tildes.
4. Los títulos de sección son `## Título` (un solo nivel). El título de la lección va en el frontmatter.
5. Sin saltos de línea dentro de un texto de lista o tabla; una celda con `|` se escribe `\|`.

## Plantilla
```md
---
id: l2-3
unidad: 2
titulo: Marketing mix y las 4P
resumen: Qué son las cuatro P y cómo se combinan.
minutos: 20
objetivos:
  - Nombrar las cuatro variables del mix.
  - Explicar por qué se influyen entre sí.
previos: [l2-2]
claves: [marketing-mix]
conexiones: [l2-4]
referencias:
  - c 2 | 40-45
---
El mix reúne cuatro variables que la organización controla: **producto, precio, plaza y promoción**. {c 2 | 41}

## Las cuatro variables

- **Producto:** qué se ofrece.
- **Precio:** cuánto vale. {c 2 | 42}

:::clave Una decisión arrastra a las otras
Cambiar el precio cambia la percepción del producto. {d}
:::

:::sintesis
- Las 4P son variables controlables.
- Se deciden en conjunto.
:::
```
Los `previos`, `conexiones` e ids de `claves` deben existir (lecciones y `contenido/<materia>/glosario.ts`). `referencias` es la lista de orígenes que se muestra al final.

## Bloques
| Quiero | Escribo |
|---|---|
| párrafo / lista / tabla | Markdown normal, con `{origen}` al final. Tabla con título: una línea `^ Título` antes. |
| nota destacada | `:::clave`, `:::ojo`, `:::ia`, `:::ampliacion`, `:::discrepancia` o `:::didactico`, con título opcional en la primera línea (`:::ojo Título`). |
| definición | `:::def Término` + texto. |
| ejemplo paso a paso | `:::ejemplo Título` + lista numerada. |
| comparar dos cosas | `:::comparar Título` con `### A` y `### B`, cada uno con su lista. |
| desplegable | `:::acordeon Título` … `:::` (sin interactivos adentro; para anidar, más dos puntos: `::::`). |
| calculadora | `::calc metricas`, `::calc embudo` o `::calc precio`. |
| síntesis | `:::sintesis` con una lista (una sola vez por lección). |
| diagrama | ```` ```mermaid Título ```` … ```` ``` ````, y el origen `{d}` en la línea siguiente. Ver `skills/diagramas`. |
| imagen o icono | solo con `bun run ilustracion`, que imprime el bloque. Ver `skills/ilustraciones`. |

### Interactivos (YAML)
Cada uno es un bloque de código con su nombre; el origen puede ir como `o: d` dentro del YAML.
````md
```explorable
titulo: Capas del mix
variante: capas        # pasos | capas | embudo | linea
nodos:
  - {id: prod, titulo: Producto, resumen: Qué se ofrece., detalle: Incluye marca y servicio.}
o: d
```

```asociar
titulo: Unir cada P con su pregunta
pares:
  - [Precio, ¿Cuánto vale?]
  - [Plaza, ¿Dónde se consigue?]
o: d
```

```clasificar
titulo: ¿Es una P?
categorias: [Es una de las 4P, No lo es]
items:
  - {x: Fijar un descuento, cat: 0, porque: Es una decisión de precio.}
o: d
```

```caso
titulo: Una panadería nueva
escenario: Abre un local y duda cómo lanzarlo.
pasos:
  - pregunta: ¿Qué decidís primero?
    opciones:
      - {x: El producto, ok: true, consecuencia: Define el resto del mix.}
      - {x: La publicidad, ok: false, consecuencia: Sin oferta clara, no hay qué comunicar.}
o: d
```
````
Reglas: `cat` es el índice (desde 0) en `categorias`; cada paso de `caso` necesita al menos una opción `ok: true`. Un valor con `:` va entre comillas; **dentro de `[a, b]` también los que llevan comas** (si no, el verificador falla con «debe ser [texto, porqué]»).

## Práctica (`lN-M.practica.yaml`)
```yaml
preguntas:
  - tema: Marketing mix
    dif: 1                        # 1 básica, 2 intermedia, 3 avanzada
    enunciado: ¿Cuál NO es una de las 4P?
    opciones:
      - [Precio, Es una de las 4P.]
      - [Plaza, Es una de las 4P.]
      - [Publicidad, Correcto: la publicidad es una herramienta de la promoción.]
    correcta: 2                   # índice desde 0
    o: c 2 | 41
  - tema: Marketing mix
    dif: 2
    enunciado: Explicá con tus palabras por qué las 4P se influyen entre sí.
    modelo: Cambiar una variable modifica cómo se percibe el conjunto.
    criterios:
      - Menciona al menos dos variables
      - Da un ejemplo de efecto cruzado
tarjetas:
  - [¿Cuáles son las 4P?, "Producto, precio, plaza y promoción"]   # con comas, entre comillas
```
Mínimos que valida `bun run verificar`: 4 preguntas (con **explicación de cada alternativa**), 2 tarjetas, 2 objetivos, 1 referencia, 3 opciones por pregunta de opción múltiple y 2 criterios por pregunta corta. Los ids (`l23-q1`, `l23-t1`) se generan solos.

## Marcado en línea
`**negrita**`, `*cursiva*`, `[[id]]` enlaza al glosario, `[[>l2-4|texto]]` enlaza a otra lección. Si el id no existe, el verificador lo marca.

## Antes de terminar
1. `bun test` y `bun run verificar` en verde.
2. Si agregaste un diagrama: `bun run diagramas` y subir los SVG.
3. Si es una lección nueva: agregá sus términos a `contenido/<materia>/glosario.ts` y su tema a `cobertura.ts` si corresponde.
4. Mirá la lección en el navegador (375 px, claro y oscuro).
