---
name: desplegar
description: Publicar el sitio en GitHub Pages (Mateo-404/AGI, rama marketing) y verificar la URL. Usar cuando se pida "deploy", "publicar" o "subir".
---

# Desplegar

1. Verificá en local: `bun test`, `bun run verificar`, `bun run build`. Si algo falla, no desplegues.
2. Revisá que no haya material protegido en el commit: `git status` no debe mostrar `fuentes/`, `materiales/` ni `dist/` (están en `.gitignore`).
3. Commiteá en la rama `marketing` con el atributo de coautoría que indique la sesión.
4. Subí con `git push origin marketing`. El workflow `.github/workflows/pages.yml` prueba, compila y publica.
5. Esperá el resultado con `gh run list --repo Mateo-404/AGI --limit 2` (una consulta, no un bucle).
6. Verificá: `curl -s -o /dev/null -w "%{http_code}" https://mateo-404.github.io/AGI/` debe dar 200. Abrí `#/marketing` y `#/marketing/leccion/l2-1`.
7. Si la URL profunda `/AGI/marketing` no redirige, revisá `public/404.html`.

No cambies la visibilidad del repositorio ni la fuente de Pages sin confirmación del usuario.
