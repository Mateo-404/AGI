# Decisiones técnicas

## Arquitectura
- **Astro 7 (sitio estático) + islas de React 19 + TypeScript 7**, con **bun**. Sin backend, sin cuentas, sin servicios externos en tiempo de ejecución. Cada página es un HTML real (`build.format: 'file'`, URLs sin barra final), publicado en GitHub Pages.
- **Los apuntes son Markdown** (`contenido/<materia>/lecciones/lN-M.md` + `lN-M.practica.yaml`). Un parser propio (`src/logica/mdLeccion.ts`, ~230 líneas) los convierte al mismo modelo `Leccion` de siempre (`contenido/tipos.ts`), así el render web, el manual imprimible y las pruebas comparten una sola fuente.
- **El cuerpo de la lección es HTML estático** (`src/componentes/LeccionEstatica.astro`); solo lo que tiene estado es una isla con `client:visible` (explorables, asociar, clasificar, caso, calculadoras, animación). Quiz, tarjetas, repaso, progreso y voz viven en la isla `Shell`. Un plugin de Vite (`scripts/vite-curso-liviano.ts`) le entrega al navegador solo metadatos, preguntas y tarjetas: el texto de las 30 lecciones ya no viaja como JavaScript.
- **Diagramas Mermaid dibujados en el build** (`src/logica/diagramas-build.ts`): cada SVG se guarda por hash en `contenido/<materia>/diagramas/` y se sube al repositorio, así el CI no necesita Chromium. Los colores de Mermaid se reemplazan por variables CSS (`--mm-*`) derivadas de los tokens del tema: un solo SVG sirve en claro y oscuro. Solo se admiten los tipos probados (flowchart, secuencia, estados, clases, ER); el resto salía negro o con colores fijos.
- **Navegación sin recargar** con el enrutador de Astro (`ClientRouter`): el contenido se desliza según el orden del curso y el estado de la página (voz, progreso) sobrevive. Gestos táctiles y barra inferior en `src/logica/gestos.ts` y `src/componentes/NavMovil.tsx`; cada gesto tiene su botón.
- **App instalable y sin conexión:** manifiesto generado por Astro y un service worker propio (`src/pwa/sw.template.js`, completado en el build por `astro.config.mjs`) que precachea el sitio. Sin Workbox.
- **Marcado en línea propio** (`**negrita**`, `[[glosario]]`, `[[>leccion|texto]]`) y un store mínimo con `useSyncExternalStore` + `localStorage`: sin librería de estado.
- **Dependencias de ejecución:** `astro`, `@astrojs/react`, `react`, `react-dom`, `lottie-web` y fuentes/iconos. Herramientas (devDependencies): `typescript`, `yaml`, `mermaid-isomorphic`, `playwright`. Cualquier otra requiere justificar peso y licencia.
- **Separación de capas:** `contenido/` (datos y Markdown, sin dependencias de UI), `src/componentes/` (presentación e interacción), `src/logica/` (lógica pura con pruebas), `scripts/` (validación, diagramas, ilustraciones, materiales).
- **Una sola fuente para web y PDF:** `scripts/materiales.tsx` renderiza los mismos componentes con `renderToStaticMarkup` en «modo imprimir» (acordeones abiertos, simuladores reemplazados por un aviso). El PDF se produce con Chromium headless.

## Por qué Markdown y qué se midió (2026-10-26)
- **Tokens:** el 33 % de los bytes de las lecciones en TypeScript era sintaxis y metadatos (67 % prosa). Medido: el contenido pasó de **327 KB a 297 KB (−9 %)** al llevarlo a Markdown + YAML, bastante menos que el 25-30 % que se estimó al planificar (el YAML de práctica y los orígenes conservan su propia sintaxis). **No se midieron tokens** (no hay tokenizador en el repositorio): el ahorro real en tokens puede diferir de los bytes, porque las comillas, llaves y comas del TypeScript se tokenizan mal. Lo que sí es seguro: desaparecieron los helpers (`cap()`, `mc()`, `corta()`) que una IA debía aprender, y un apunte se lee y se edita sin recorrer objetos anidados. Las cifras de «3-6 veces menos tokens» que circulan comparan Mermaid con prosa que describe una estructura, no Markdown con TypeScript.
- **Peso:** JavaScript por página 648 KB → 475 KB (210 → 151 KB con gzip), incluyendo el enrutador, los gestos y la barra inferior. Quedan 41 KB gzip de datos del cliente (glosario, preguntas, tarjetas) que solo se podrían diferir volviendo asíncronos `Tx` y el quiz.
- **Migración sin pérdidas:** las 30 lecciones se convirtieron con un script y se comprobó que, leídas de los `.md`, eran idénticas al TypeScript original (comparación estructural campo por campo) antes de borrar los `.ts`.
- **Origen obligatorio:** el validador exige origen en cada bloque de contenido (212 de 217 lo tenían; los cinco restantes son ejemplos didácticos y se marcaron `{d}`).

## Imágenes e ilustraciones
Las IAs no descargan ni dibujan a mano: usan `bun run ilustracion` (Iconify y Wikimedia Commons), que verifica la licencia contra la API, rechaza SA/NC/ND/GPL y lo que no declare licencia, y registra el crédito. **unDraw se excluye** porque su licencia prohíbe la descarga automatizada y el uso con IA. No se incluyó Openverse: no se pudo probar desde el entorno de desarrollo y no se entrega código sin probar. La descarga de archivos desde Commons quedó verificada con respuestas simuladas, no contra el servidor real (devolvió 429 desde el entorno de desarrollo).

## Modelo pedagógico implementado
- **Dominio ≠ acierto:** una pregunta cuenta como *dominada* con ≥3 aciertos, en ≥2 días distintos y al menos uno «sin pista» (respuesta corta autoevaluada o acierto declarado con seguridad). Una lección es *consolidada* con ≥70 % de sus preguntas dominadas. Puntaje de opción múltiple corregido por azar: aciertos − errores/(k−1).
- **Repaso espaciado:** intervalos +1, +3, +7, +14, +30 días (cajas tipo Leitner) para tarjetas; calendario sugerido por lección.
- Las alternativas de opción múltiple se **mezclan** en cada intento (y de forma determinista en el banco impreso) para evitar sesgo de posición.
- La respuesta corta es **autoevaluada** (no hay corrección automática de texto libre; esa limitación se declara en la interfaz).

## Skills y recursos revisados (2026-10-26)
- **Disponibles en este entorno** (listados por Claude Code): `frontend-design`, `pdf`, `docx`, `artifact-design`, etc. Se aplicaron los criterios de diseño de `frontend-design` (tipografía serif editorial + sans de sistema, paleta con roles por tipo de contenido) sin ejecutar código de terceros; para el PDF **no hizo falta** la skill `pdf` (Chromium headless es suficiente y verificable).
- **Búsqueda de repositorios de la comunidad** (anthropics/skills; «course builder», «codebase-to-course», «course designer»): se confirmó por fuentes secundarias que existe `anthropics/skills` (docx, pdf, pptx, xlsx, frontend-design). Los repositorios de «course creation» aparecieron solo en **dominios espejo o registros de terceros**; **no se verificaron en su repositorio original, no se inspeccionaron sus instrucciones y no se instaló ninguno**. Además ninguno está pensado para convertir documentos académicos con trazabilidad de página. Decisión: no bloquear el proyecto; capacidades nativas suficientes.
- **Accesibilidad y pruebas de interfaz:** no se instaló ninguna skill; se usó revisión manual en navegador y verificaciones programáticas (ver README, sección Verificación).

## Persistencia y límites
`localStorage` (clave `mkt-unraf-2026:progreso:v1`), validación al leer (JSON corrupto o de otra versión → estado vacío sin romper). Se ofrece exportar/importar JSON. Es por navegador y dispositivo; no sincroniza.

## Decisiones reversibles documentadas
- Se incluyeron los Cap. 3–5 aunque el programa no los cita como lectura obligatoria (ver auditoría §5.1).
- Se normalizó la numeración de los pasos del email a seis, señalando la discrepancia del cuaderno.
- Las figuras que solo existen como imagen (pp. 20, 31, 32, 37, 50, 56, 59, 60, 68, 93, 99–103, 110, 130, 173) se transcribieron a texto y se citan como «fig.».
- `TPI Mkt.docx` (trabajo del propio estudiante) se conserva en `fuentes/` pero no se usó como contenido teórico ni se reproducen datos personales.
