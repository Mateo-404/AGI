# Decisiones técnicas

## Arquitectura mínima
- **React 19 + TypeScript + Vite**, gestionado con **bun** (preferencia del usuario). Sin backend, sin cuentas, sin servicios externos: el curso funciona sin conexión una vez construido (`bun run build` → `dist/`).
- **Dependencias de ejecución: solo `react` y `react-dom`.** Router propio basado en `location.hash` (permite abrir `dist/index.html` con `file://` y usar enlaces internos); marcado en línea propio (`**negrita**`, `[[glosario]]`, `[[>leccion|texto]]`); sin librería de estado (un store mínimo con `useSyncExternalStore` + `localStorage`).
- **Separación de capas**
  - `contenido/`: datos tipados (`tipos.ts`) de lecciones, glosario, cobertura, ampliaciones y guía. Es independiente de la interfaz y alimenta también los materiales impresos.
  - `src/componentes/`: presentación e interacciones.
  - `src/logica/`: lógica pura (repaso espaciado, dominio, puntaje, progreso, marcado en línea) con pruebas.
  - `scripts/`: validación del contenido, generación de materiales y PDF.
- **Una sola fuente para web y PDF:** `scripts/materiales.tsx` renderiza los mismos componentes con `renderToStaticMarkup` en «modo imprimir» (acordeones abiertos, diagramas estáticos, simuladores reemplazados por un aviso). El PDF se produce con **Chromium headless** (`--print-to-pdf`), sin dependencias npm.

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
