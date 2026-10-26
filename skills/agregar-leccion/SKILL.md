---
name: agregar-leccion
description: Escribir o modificar una lección del curso con el formato tipado del proyecto (bloques, preguntas, tarjetas, glosario) y validarla. Usar al crear contenido nuevo o corregir una lección.
---

# Agregar o editar una lección

Formato: `contenido/lecciones/<id>.ts`, objeto `Leccion` de `contenido/tipos.ts`.

1. **Origen obligatorio:** cada bloque de texto relevante lleva `o:` con `cap(...)` (cuaderno), `did` (explicación propia) o `amp(...)` (ampliación externa con fuente). Nunca atribuyas a la cátedra lo que no dice.
2. **Bloques:** usá `p`, `h`, `def`, `lista`, `tabla`, `callout` (tipos: clave, ojo, ia, ampliacion, discrepancia, didactico), `ejemplo`, `explorable`, `comparar`, `asociar`, `clasificar`, `caso`, `figura` (SVG propio: evolucion, mix, messy, embudo, subasta, email) y `calc`.
3. **Preguntas:** al menos 4, con `mc(...)` (cada alternativa explica por qué es o no correcta; la correcta va en el índice) y `corta(...)` (modelo y criterios). Ids únicos `<leccion>-qN`.
4. **Tarjetas:** al menos 2, con `id` único.
5. **Glosario:** los conceptos nuevos van a `contenido/glosario.ts` y se listan en `claves`.
6. **Enlaces:** dentro del texto, `[[>id|texto]]` para lecciones y `[[termino]]` para glosario.
7. **Validar:** `bun run verificar` (enlaces rotos, ids, cobertura), `bun test`.

No inventes páginas ni números de página. Si no sabés la ubicación exacta, indicá el capítulo o apartado.
