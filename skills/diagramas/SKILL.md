---
name: diagramas
description: Hacer diagramas Mermaid para las lecciones de Somos #AGI (flujos, procesos, secuencias, estados, relaciones). Usar cuando una idea sea una estructura o un proceso y haya que mostrarla, en vez de dibujar un SVG o buscar una imagen.
---

# Diagramas con Mermaid

Todo lo que sea **estructura, proceso, relación o secuencia** va como diagrama de texto dentro del `.md`. No se dibuja a mano ni se busca una imagen. Un diagrama de texto cuesta pocos tokens, se versiona y se adapta solo al modo claro y oscuro.

## Cómo se escribe
````md
```mermaid Embudo de conversión: la cantidad de personas baja etapa tras etapa
flowchart TB
  V["Visitantes"] e1@--> L["Leads"]
  L e2@--> O["Oportunidades"]
  O e3@--> C["Clientes"]
  e1@{ animate: true }
  e2@{ animate: true }
  e3@{ animate: true }
```
{d}
````
- **El texto después de `mermaid` es el título**: se muestra como leyenda y es el texto alternativo. Que diga qué muestra el diagrama, no «diagrama de X».
- **El origen** `{d}` (o `{c …}` / `{a …}`) va en la línea **siguiente** al cierre.
- Después de escribir o cambiar un diagrama: **`bun run diagramas`** (necesita Chromium: `bunx playwright install chromium`, o `MERMAID_CHROMIUM=/ruta/chrome`) y subí los SVG nuevos de `contenido/marketing/diagramas/`. El CI no dibuja: si falta uno, el build falla.

## Tipos admitidos (probados con la paleta del sitio, en claro y oscuro)
`flowchart` (o `graph`), `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, `erDiagram`.
**No uses** `pie`, `timeline`, `mindmap`, `journey`, `quadrantChart`, `xychart-beta` ni `gantt`: salen negros o con colores fijos que no cambian con el tema. `bun run verificar` los rechaza.

| Querés mostrar | Usá |
|---|---|
| pasos, embudo, ciclo, jerarquía, causa → efecto | `flowchart` |
| quién le pide qué a quién, en orden | `sequenceDiagram` |
| etapas por las que pasa algo (visita → lead → cliente) | `stateDiagram-v2` |
| conceptos y cómo se relacionan | `classDiagram` o `erDiagram` |
| proporciones, evolución en el tiempo, tablero | **tabla** Markdown (no hay diagrama admitido) |

## Reglas para que se lea bien
1. **Vertical para más de 3 nodos** (`flowchart TB`): en el celular un flujo horizontal se encoge hasta ser ilegible. `LR` solo con 2-3 nodos de texto corto.
2. **Hasta ~8 nodos.** Si hay más, partilo en dos diagramas.
3. **Etiquetas cortas** (≤ 25 caracteres). Para dos líneas: `A["Título<br/>detalle"]`. Poné entre comillas toda etiqueta con paréntesis, comas, `:` o tildes raras.
4. **Texto en español**, igual que el resto de la lección.
5. **Sin colores ni estilos**: no uses `classDef`, `style`, `linkStyle`, `click` ni `%%{init}`. El tema pone los colores; uno propio queda fijo y se rompe en el otro modo. `bun run verificar` lo rechaza.
6. **Animación:** a las flechas que muestran un **flujo en el tiempo** (embudo, proceso) dales id y `animate: true`, como arriba (`e1@-->` y `e1@{ animate: true }`; `animation: slow` o `fast` regula la velocidad). Animá pocas: si se mueve todo, nada destaca. Con «reducir movimiento» se frenan solas.
7. Un diagrama por idea. No repitas en el diagrama lo que ya dice el párrafo de al lado: agregá lo que el texto no muestra bien (orden, cantidad, relación).

## Si algo falla
- `bun run diagramas` muestra el error de sintaxis de Mermaid con el código del diagrama: corregí la sintaxis y repetí.
- Un nodo con texto raro que rompe el diagrama casi siempre se arregla con comillas: `A["Texto (con) símbolos"]`.
