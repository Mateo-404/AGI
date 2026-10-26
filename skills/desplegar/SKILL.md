---
name: desplegar
description: Publicar Somos #AGI en GitHub Pages (Mateo-404/AGI, rama main) y verificar las URLs. Usar cuando se pida "deploy", "publicar" o "subir".
---

# Desplegar

1. Verificá en local: `bun test`, `bun run check`, `bun run verificar` y `bun run build`. Si algo falla, no despliegues.
2. Revisá que no haya material protegido en el commit: `git status` no debe mostrar `fuentes/`, `materiales/`, `dist/` ni `.astro/` (están en `.gitignore`).
3. Commiteá en `main` con el atributo de coautoría que indique la sesión.
4. Subí con `git push origin main`. El workflow `.github/workflows/pages.yml` prueba, verifica tipos, compila con Astro y publica `dist/`.
5. Esperá el resultado con `gh run watch <id> --exit-status` (un solo comando, no un bucle).
6. Verificá: `https://mateo-404.github.io/AGI/` y `https://mateo-404.github.io/AGI/marketing/` deben responder 200, y una lección directa (`/AGI/marketing/leccion/l2-1/`).
7. Si el navegador muestra una versión vieja, es caché: recargá con Ctrl+Shift+R.

No cambies la visibilidad del repositorio ni la fuente de Pages sin confirmación del usuario.
