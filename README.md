# Somos #AGI · Proyecto personal

Sitio de estudio de la Licenciatura en Administración y Gestión de la Información (CCC, UNRaf). **Es un proyecto personal de Mateo Gariboglio; no es un sitio oficial de la Universidad Nacional de Rafaela.** Los datos de la carrera provienen de sus páginas públicas, que se enlazan en el sitio.

**Sitio publicado:** https://mateo-404.github.io/AGI/ (inicio) · https://mateo-404.github.io/AGI/#/marketing (curso de Marketing Digital)

## Rutas
| Ruta | Qué es |
|---|---|
| `#/` | Inicio de la carrera: perfil, plan de estudios, contactos y fuentes oficiales |
| `#/marketing` | Curso interactivo de Marketing Digital |
| `#/marketing/leccion/l2-1` | Una lección |
| `#/marketing/practica`, `/tarjetas`, `/glosario`, `/repaso` | Práctica, tarjetas, glosario y progreso |

Cada materia nueva tiene su propia ruta (ver `skills/agregar-materia`).

## Qué incluye el curso
- **30 lecciones** en 8 unidades, con explicaciones, ejemplos, diagramas animados y simuladores (SEO/SEM, embudo, precio).
- Cada afirmación indica su origen: **cuaderno** (capítulo y página), **explicación didáctica** o **ampliación externa**.
- **Práctica:** 147 preguntas con explicación de cada alternativa, simulacro integrador, 122 tarjetas con repaso espaciado y un glosario de 186 términos. Son material de práctica propio, no preguntas de la cátedra.
- **Progreso local:** se guarda en el navegador. Se puede exportar e importar.
- **Modo claro y oscuro**, tamaños de letra y **lectura en voz alta** tipo podcast, con velocidad y modo continuo.

## Lectura en voz alta
Usa la síntesis de voz del navegador: no envía texto a ningún servicio. Funciona sin conexión si el dispositivo tiene voces en español. En Chrome y Edge hay voces de Google o del sistema; en Safari y en Android dependen del sistema. Si no hay soporte, el reproductor muestra un aviso.

## Desarrollo
Requisito: [bun](https://bun.sh) ≥ 1.1.

```bash
bun install
bun run dev          # http://localhost:5173
bun test             # pruebas
bun run verificar    # validación del contenido
bun run build        # compila a dist/
```

Materiales imprimibles (manual, banco de preguntas, glosario, guía de repaso): `bun run materiales` y `bun run pdf`. Requieren la carpeta `fuentes/` local y Chromium.

## Estructura
```
src/            aplicación: componentes/, logica/ (repaso, progreso, voz), estilos/
contenido/      lecciones, glosario, cobertura y guía (datos tipados)
tests/          pruebas de lógica, contenido, render y voz
scripts/        verificar, materiales, pdf, contraste, offline
docs/           auditoría académica, matriz de cobertura, decisiones técnicas
skills/         skills para agentes: agregar materia, lección, desplegar, lectura en voz
agents.md       instrucciones para agentes de IA
.github/        workflow de publicación en GitHub Pages
```
`fuentes/` (cuaderno de cátedra y TPI), `materiales/` y `dist/` no se publican (ver `.gitignore`).

## Publicación
La rama `marketing` se publica en GitHub Pages con `.github/workflows/pages.yml` en cada push: prueba, compila y despliega. Los enlaces profundos (`/AGI/marketing`) redirigen a la ruta de hash mediante `public/404.html`.

## Verificación
- `bun test`: pruebas de repaso, puntajes, fórmulas, progreso corrupto, validez del contenido, renderizado de lecciones y voz.
- `bun run verificar`: enlaces, ids y cobertura del contenido.
- `bun run scripts/contraste.ts`: contraste WCAG AA en claro y oscuro.
- Revisión en navegador: portada de AGI, curso en claro y oscuro, reproductor, móvil de 375 px.

## Limitaciones
- El progreso es por navegador: se pierde si se borran los datos del sitio.
- La respuesta corta se autoevalúa; no hay corrección automática.
- La voz depende de las voces que tenga el dispositivo; la calidad varía.
- Hay temas del programa que el cuaderno no desarrolla; están marcados en la matriz de cobertura (`docs/matriz-de-cobertura.md`).

## Créditos y fuentes
Contenido basado en el cuaderno de cátedra «Pensando AGIlmente a la disciplina del marketing» y en el Programa 2026 de Marketing Digital (UNRaf). Los colores de la portada de AGI son una referencia visual de la identidad de la UNRaf, usada solo como guía.
