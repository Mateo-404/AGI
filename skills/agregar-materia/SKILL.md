---
name: agregar-materia
description: Agregar una materia nueva al sitio Somos #AGI con su propia ruta (#/<materia>). Usar cuando se pida "otra materia", "/nueva-materia" o un curso nuevo.
---

# Agregar una materia

1. **Contenido:** creá `contenido/<materia>/` con `unidades.ts`, `glosario.ts` y `lecciones/*.ts` siguiendo `skills/agregar-leccion/SKILL.md`. Usá los tipos de `contenido/tipos.ts`.
2. **Enrutado:** en `src/App.tsx`, reconocé el primer segmento de la ruta (`marketing` hoy). Duplicá la lógica de `enCurso` para la materia nueva o generalizalo a `const materia = ruta[0]`. Prefijá todos los enlaces internos con `#/<materia>/`.
3. **Portada:** en `src/componentes/AgiInicio.tsx`, agregá la materia a la lista `agi-materias` (activa si tiene contenido) y mantené el plan de estudios de la carrera.
4. **Pruebas:** agregá la materia a `tests/` (renderizado y enlaces). Corré `bun test` y `bun run verificar`.
5. **Verificación en navegador:** abrí `#/<materia>` en 375 px y en escritorio, en claro y oscuro.
6. **Documentación:** sumá la materia al `README.md` y a `agents.md`.

No tocar los datos de otra materia. Si una materia no tiene contenido, no la enlaces como activa.
