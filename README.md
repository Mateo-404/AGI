# Curso interactivo de Marketing Digital · UNRaf 2026

Sistema de estudio construido a partir del **Programa 2026** (CCC AGI, Marketing Digital) y del **cuaderno de cátedra «Pensando AGIlmente a la disciplina del marketing»**. Aplicación web local (React + TypeScript + Vite), materiales imprimibles y documentos de auditoría.

## Qué incluye
- **30 lecciones** en 8 unidades (7 del programa + integración), con objetivos, explicación estructurada, ejemplos paso a paso, diagramas explorables, comparaciones, actividades de asociación/clasificación, casos con decisiones, simuladores (métricas SEO/SEM, embudo, precio), síntesis y referencias a capítulo y página del cuaderno.
- **Práctica**: 147 preguntas (opción múltiple con explicación de cada alternativa y respuesta corta autoevaluada), cuestionarios por lección y por unidad, **simulacro integrador**, repaso de errores, **122 tarjetas** con repaso espaciado (+1, +3, +7, +14, +30 días), **glosario de 186 términos** y seguimiento local del progreso.
- **Materiales** (`materiales/`): manual de estudio (PDF/HTML, ~150 págs.), banco de preguntas (MD/PDF, con respuestas separadas), glosario (MD/PDF) y guía de repaso (MD/PDF).
- **Documentación** (`docs/`): auditoría académica, matriz de cobertura, arquitectura pedagógica, decisiones técnicas y ampliaciones externas.

## Requisitos
[bun](https://bun.sh) ≥ 1.1. Para generar PDF: Chromium o Chrome instalado (o `CHROME=/ruta/al/binario`).

## Uso
```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # compila a dist/ (funciona sin servidor y sin conexión)
bun run preview
bun test           # pruebas
bun run verificar  # valida el contenido (ids, enlaces, cobertura, preguntas)
bun run materiales # genera materiales/*.md y *.html
bun run pdf        # genera materiales/*.pdf (Chromium headless)
```

## Estructura
```
fuentes/      documentos originales (sin modificar)
docs/         auditoría, matriz de cobertura, arquitectura pedagógica, decisiones, ampliaciones
contenido/    lecciones, glosario, cobertura y guía (datos tipados; sin dependencia de la UI)
src/          app: componentes/ (UI), logica/ (repaso, progreso, marcado), estilos/
scripts/      verificar.ts, materiales.tsx, pdf.ts
materiales/   manual, banco de preguntas, glosario, guía de repaso
tests/        pruebas de lógica, contenido, renderizado y fidelidad
```

## Cómo se distingue cada afirmación
Cada bloque muestra su origen: **Cuaderno, Cap. X, p. Y** (páginas del PDF de 178 págs.), **Explicación didáctica** (nuestra) o **Ampliación externa** (con fuente y fecha en `docs/ampliaciones-externas.md`). Las preguntas son *material de práctica creado para este curso*, no preguntas de la cátedra ni un examen oficial.

## Progreso y persistencia
Se guarda en `localStorage` del navegador (sin cuentas ni servidores). **Límites:** por navegador/dispositivo, se pierde al borrar datos del sitio o en ventanas privadas; usá *Repaso y progreso → Exportar/Importar*. Un tema se marca **consolidado** solo con evidencia sostenida (≥3 aciertos en ≥2 días, al menos uno sin pista); un acierto aislado no cuenta como dominio. La respuesta corta es autoevaluada.

## Verificación realizada
- `bun test`: 62 pruebas (repaso espaciado y dominio, puntaje corregido por azar, fórmulas, progreso corrupto, validez del contenido, renderizado web/impresión de las 30 lecciones, fidelidad de términos clave del cuaderno).
- `bun run build` sin errores de TypeScript; sin errores de consola en la navegación por todas las rutas.
- Revisión en navegador: 30 lecciones sin desborde horizontal en 375 px; navegación, explorables, quiz y guardado local probados; encabezados y etiquetas de formularios revisados con script.
- PDF: revisados visualmente portada, tablas, diagramas, banco y guía.
- **No verificado:** lectores de pantalla, Lighthouse/axe, impresión en otros navegadores, ni los contenidos enlazados del cuaderno (videos, Genially, informes).

## Temas que requieren bibliografía complementaria
POEM, Martech, e-branding, ZMOT, storytelling, marketing relacional, remarketing/retargeting, CPL, Google Play y Google Business, m-commerce, medios de pago y logística, evolución del SEO e investigación de palabras clave. Ver `docs/matriz-de-cobertura.md`.

## Limitaciones conocidas
Discrepancias del cuaderno (numeración de pasos del email, referencias cruzadas, secciones vacías) y de las figuras transcriptas están en `docs/auditoria-academica.md`. Los Cap. 3–5 no figuran como lectura obligatoria del programa pero se incluyeron por ser soporte de los temas.
