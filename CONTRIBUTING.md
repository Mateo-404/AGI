# Cómo contribuir

Gracias por el interés. Este es un proyecto personal de estudio; las contribuciones se revisan con criterio académico y técnico.

## Antes de empezar
- Leé [`agents.md`](agents.md): reglas del proyecto, comandos y convenciones.
- Para errores de contenido (una afirmación que no coincide con el cuaderno, un enlace roto, una pregunta ambigua), abrí un issue con la plantilla correspondiente.

## Flujo de trabajo
1. Creá una rama corta desde `main` (`feat/…`, `fix/…`, `docs/…`).
2. Una carpeta por materia: el contenido nuevo va en `contenido/<materia>/`.
3. Antes del pull request, corré en local:
   ```bash
   bun install
   bun test
   bun run verificar
   bun run check
   bun run build
   ```
4. Abrí el pull request contra `main` y completá la plantilla.

## Reglas de contenido
- Toda afirmación del curso debe tener origen: cuaderno (capítulo y página), explicación didáctica o ampliación externa con fuente.
- No se publican materiales protegidos ni datos personales. `fuentes/` está fuera del repositorio por diseño.
- Las preguntas son material de práctica propio; no se presentan como preguntas de la cátedra.

## Estilo
- TypeScript estricto. Editor con soporte de `.editorconfig`.
- Mensajes de commit en español o inglés, en tiempo presente y de una línea de resumen (≤ 72 caracteres).
- Accesibilidad y contraste AA en modo claro y oscuro; comprobá en 375 px.
