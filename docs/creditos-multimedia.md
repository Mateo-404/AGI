# Créditos multimedia

Todo el material gráfico y animado de este sitio proviene de fuentes externas con licencia verificada en la fecha indicada. Si un archivo no tiene entrada aquí, es un dibujo del proyecto (ver *Figuras del proyecto*).

## Iconos
- **Material Symbols** (Google). Paquete `@material-symbols/svg-400` v0.48.1. Licencia **Apache-2.0**. Se generan los iconos usados en `src/componentes/iconos.ts` con `scripts/generar-iconos.ts`. Verificado el 2026-10-26.

## Tipografía
- **Roboto Flex** (Google Fonts). Paquete `@fontsource-variable/roboto-flex` v5.3.0. Licencia **SIL Open Font License 1.1**. Verificado el 2026-10-26.

## Animaciones (Lottie)
| Archivo | Título | Autor | Licencia | Página de origen | Verificado |
|---|---|---|---|---|---|
| `public/media/lottie/seo.json` | SEO Optimization | Riju Shah | Lottie Simple License | https://lottiefiles.com/de/free-animation/seo-optimization-v978olJm8B | 2026-10-26 |
| `public/media/lottie/marketing-digital.json` | Free Digital Marketing Animation | manju | Lottie Simple License | https://lottiefiles.com/free-animation/digital-marketing-Jru0zuyaaj | 2026-10-26 |

La Lottie Simple License permite uso comercial y publicación. La atribución no es obligatoria pero se recomienda, y las copias distribuidas deben conservar los mismos términos (ver https://lottiefiles.com/page/license).

## Diagramas del proyecto
Los diagramas de las lecciones son **texto Mermaid** escrito por el proyecto (```` ```mermaid ```` en los `.md`) y se dibujan en el build con `mermaid` (MIT) a través de `mermaid-isomorphic` (MIT). No hay dibujos de terceros: las seis figuras SVG hechas a mano que existían antes (`Figuras.tsx`) fueron reemplazadas por diagramas de texto.

## Imágenes e iconos de lecciones
Se obtienen **solo** con `bun run ilustracion` (Iconify y Wikimedia Commons). La herramienta verifica la licencia contra la API, guarda el archivo en `public/media/` y agrega una fila a la tabla de esta sección. Todo archivo de `public/media/` debe figurar acá (lo comprueba `tests/creditos.test.ts`). Licencias aceptadas: CC0, dominio público, MIT, ISC, Apache-2.0, BSD y CC BY. **unDraw no se usa**: su licencia prohíbe la descarga automatizada y el uso con IA.
