---
name: agregar-materia
description: Agregar una materia nueva a Somos #AGI en su propia carpeta (contenido/<materia>/) y ruta (/AGI/<materia>/). Usar cuando se pida "otra materia", "nueva materia" o un curso nuevo.
---

# Agregar una materia

Regla: **una carpeta por materia, una rama `main`**. Las ramas son solo para cambios temporales.

1. **Contenido:** creá `contenido/<materia>/` con `indice.ts` (lecciones), `unidades.ts`, `glosario.ts`, `cobertura.ts` y `lecciones/<id>.ts`. Copiá la forma de `contenido/marketing/` y usá los tipos de `contenido/tipos.ts`.
2. **Rutas:** en `src/logica/rutas.ts`, generalizá `rutasCurso()` para recibir la materia. Agregá `src/pages/<materia>/[...ruta].astro` (copiá el de `marketing`, cambiando el import del índice).
3. **Portada:** en `src/componentes/AgiInicio.tsx`, agregá la materia a `agi-materias` (activa solo si tiene contenido).
4. **Shell:** en `src/componentes/Shell.tsx`, la barra lateral y los enlaces deben apuntar a `ruta('<materia>/…')`.
5. **Validación:** agregá la materia a `scripts/verificar.ts` y a `tests/`. Corré `bun test`, `bun run verificar` y `bun run check`.
6. **Navegador:** abrí `/AGI/<materia>/` en 375 px y en escritorio, en claro y oscuro.
7. **Documentación:** sumá la materia al README y a `agents.md`.

No toques los datos de otra materia. No enlaces como activa una materia sin contenido.
