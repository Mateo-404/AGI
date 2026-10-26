---
name: agregar-leccion
description: Agregar una lección nueva a una materia de Somos #AGI. Usar cuando se pida "otra lección", "un tema nuevo" o completar la cobertura del programa.
---

# Agregar una lección

El formato, las reglas de origen y las plantillas están en **`skills/apuntes-md/SKILL.md`**: leelo primero. Esta skill es solo el orden de trabajo.

1. **Ubicá el tema** en `contenido/<materia>/cobertura.ts` y en la unidad que le corresponde (`unidades.ts`). Elegí el id siguiente (`l3-7`).
2. **Escribí** `contenido/<materia>/lecciones/l3-7.md` y `l3-7.practica.yaml`. Cada afirmación con su origen (`{c …}`, `{d}` o `{a …}`); no inventes páginas ni citas.
3. **Glosario:** agregá los términos nuevos a `glosario.ts` (con `lec: 'l3-7'`) y listalos en `claves`.
4. **Diagramas:** lo estructural va como Mermaid (`skills/diagramas`) y después `bun run diagramas`. Imágenes solo con `skills/ilustraciones`.
5. **Cobertura:** sumá la lección al tema que cubre en `cobertura.ts`.
6. **Verificá:** `bun test`, `bun run verificar` y `bun run check`. No hace falta tocar rutas: se generan solas.
7. **Mirala** en el navegador (375 px, claro y oscuro) y probá una pregunta y una tarjeta.
