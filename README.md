# Somos #AGI · Proyecto personal

Sitio de estudio de la Licenciatura en Administración y Gestión de la Información (CCC, UNRaf). **Es un proyecto personal de Mateo Gariboglio; no es un sitio oficial de la Universidad Nacional de Rafaela.** Los datos de la carrera provienen de sus páginas públicas, que se enlazan en el sitio.

**Sitio publicado:** https://mateo-404.github.io/AGI (inicio) · https://mateo-404.github.io/AGI/marketing (curso de Marketing Digital)

## Rutas
| Ruta | Qué es |
|---|---|
| `/AGI` | Inicio de la carrera: perfil, plan de estudios, contactos y fuentes oficiales |
| `/AGI/marketing` | Curso interactivo de Marketing Digital |
| `/AGI/marketing/leccion/l2-1` | Una lección |
| `/AGI/marketing/practica`, `tarjetas`, `glosario`, `repaso` | Práctica, tarjetas, glosario y progreso |

Las URLs no llevan barra final: `ruta()` en `src/logica/rutas.ts` es la única forma de armar enlaces internos.

## App en el móvil
El sitio es una app web instalable (PWA): tiene manifiesto, iconos y un service worker que guarda todo el sitio al primer uso, así que sigue funcionando sin conexión.
- **Android (Chrome, Edge):** aparece el botón «Instalar la app» arriba de la página.
- **iPhone y iPad (Safari):** tocar Compartir → «Agregar a pantalla de inicio».

El service worker (`sw.js`) lo genera `astro.config.mjs` al terminar el build a partir de `src/pwa/sw.template.js`. Solo existe en `dist/`, no en `bun run dev`.

Cada materia tiene su carpeta y su ruta (ver `skills/agregar-materia`).

## Qué incluye el curso
- **30 lecciones** en 8 unidades, con explicaciones, ejemplos, diagramas Mermaid animados y simuladores (SEO/SEM, embudo, precio). Los apuntes están escritos en **Markdown**.
- Cada afirmación indica su origen: **cuaderno** (capítulo y página), **explicación didáctica** o **ampliación externa**.
- **Práctica:** 147 preguntas con explicación de cada alternativa, simulacro integrador, 122 tarjetas con repaso espaciado y un glosario de 186 términos. Son material de práctica propio, no preguntas de la cátedra.
- **Progreso local:** se guarda en el navegador. Se puede exportar e importar.
- **Modo claro y oscuro**, tamaños de letra y **lectura en voz alta** tipo podcast: marca el bloque que suena y desplaza la página, con velocidad, pausa, modo continuo y controles en la notificación del móvil.
- **Pensado para el celular:** barra inferior, deslizar entre lecciones, menú arrastrable y tarjetas que se califican deslizando; cada gesto tiene su botón.

## Lectura en voz alta
Usa la síntesis de voz del navegador: no envía texto a ningún servicio. Funciona sin conexión si el dispositivo tiene voces en español. En Chrome y Edge hay voces de Google o del sistema; en Safari y en Android dependen del sistema. Si no hay soporte, el reproductor muestra un aviso.

## Desarrollo
Requisito: [bun](https://bun.sh) ≥ 1.1. El CI usa Node 26; Astro exige Node ≥ 22.23.4 (con una versión menor, ejecutalo con el runtime de bun: `bun --bun node_modules/astro/bin/astro.mjs build`).

**Escribir una lección:** `contenido/marketing/lecciones/lN-M.md` y `lN-M.practica.yaml`. El formato está en [`skills/apuntes-md`](skills/apuntes-md/SKILL.md); los diagramas, en [`skills/diagramas`](skills/diagramas/SKILL.md).

```bash
bun install
bun run dev          # http://localhost:4321/AGI/
bun test             # pruebas
bun run verificar    # validación del contenido
bun run check        # tipos de TypeScript
bun run build        # compila a dist/ (117 páginas estáticas)
bun run diagramas    # dibuja los diagramas Mermaid nuevos (necesita Chromium)
bun run ilustracion  # busca y descarga iconos e imágenes con licencia verificada
bun run preview      # sirve dist/ localmente
```

Materiales imprimibles (manual, banco de preguntas, glosario, guía de repaso): `bun run materiales` y `bun run pdf`. Requieren la carpeta `fuentes/` local y Chromium.

## Estructura
```
src/            Astro (pages/, layouts/) + componentes/ React (islas), logica/ (parser de Markdown, repaso, progreso, voz, gestos, rutas), pwa/, estilos/
contenido/      tipos, validación y cargador compartidos; marketing/ (una carpeta por materia: lecciones/*.md, diagramas/*.svg, glosario, unidades, cobertura)
tests/          pruebas de lógica, contenido, parser, diagramas, gestos, licencias y voz
scripts/        verificar, diagramas, ilustracion, materiales, pdf, contraste
docs/           auditoría académica, matriz de cobertura, decisiones técnicas, créditos multimedia
skills/         skills para agentes: apuntes-md, diagramas, ilustraciones, agregar materia y lección, desplegar, lectura en voz
agents.md       instrucciones para agentes de IA
.github/        workflow de publicación en GitHub Pages
```
`fuentes/` (cuaderno de cátedra y TPI), `materiales/` y `dist/` no se publican (ver `.gitignore`).

## Publicación
La rama `main` se publica en GitHub Pages con `.github/workflows/pages.yml` en cada push: prueba, verifica tipos, compila con Astro y despliega `dist/`. Cada ruta es una página HTML real, así que los enlaces directos funcionan sin trucos.

**Organización:** una carpeta por materia, una rama `main` permanente. Las ramas nuevas son solo para cambios temporales que se integran y se borran.

## Verificación
- `bun test`: pruebas de repaso, puntajes, fórmulas, progreso corrupto, validez del contenido, parser de Markdown, diagramas, gestos, licencias de imágenes, renderizado de lecciones y voz.
- `bun run verificar`: enlaces, ids, cobertura, origen en cada bloque, diagramas admitidos y créditos de las imágenes.
- `bun run scripts/contraste.ts`: contraste WCAG AA en claro y oscuro.
- `bun run check`: tipos de TypeScript (`tsc`). Los archivos `.astro` no se revisan hasta que `astro check` soporte TypeScript 7.
- Revisión en navegador: portada de AGI, curso en claro y oscuro, reproductor, móvil de 375 px.

## Limitaciones
- El progreso es por navegador: se pierde si se borran los datos del sitio.
- La respuesta corta se autoevalúa; no hay corrección automática.
- La voz depende de las voces que tenga el dispositivo; la calidad varía.
- Hay temas del programa que el cuaderno no desarrolla; están marcados en la matriz de cobertura (`docs/matriz-de-cobertura.md`).

## Contribuir
Ver [`CONTRIBUTING.md`](CONTRIBUTING.md). Las reglas del proyecto para agentes de IA están en [`agents.md`](agents.md). Seguridad: [`SECURITY.md`](SECURITY.md). Convivencia: [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Licencia
Pendiente de definir por el autor. Hasta entonces, todos los derechos están reservados: el contenido del cuaderno pertenece a la cátedra.

## Créditos y fuentes
Contenido basado en el cuaderno de cátedra «Pensando AGIlmente a la disciplina del marketing» y en el Programa 2026 de Marketing Digital (UNRaf). Los colores de la portada de AGI son una referencia visual de la identidad de la UNRaf, usada solo como guía.
