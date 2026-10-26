# agents.md · Somos #AGI (proyecto personal)

Instrucciones para agentes de IA que trabajen en este repositorio. Leé también `README.md` y las skills de `skills/`.

## Qué es
Sitio estático con **Astro** (islas de React + TypeScript, con **bun**) publicado en GitHub Pages desde la rama `main`:
- `/AGI/` → inicio de la carrera (Somos #AGI). Proyecto personal de Mateo Gariboglio; **no es oficial de la UNRaf**. Puede usar la identidad visual de la UNRaf como referencia, pero debe aclararlo.
- `/AGI/marketing/` → curso interactivo de Marketing Digital (30 lecciones, práctica, glosario, tarjetas, progreso local). Cada página es un HTML real generado por Astro.
- **Una carpeta por materia** (`contenido/<materia>/` y, si hace falta, `src/pages/<materia>/`). Una rama `main` permanente; las ramas son solo para cambios temporales. Ver `skills/agregar-materia/SKILL.md`.

## Comandos (siempre con bun)
```bash
bun install
bun run dev          # desarrollo
bun test             # pruebas (deben pasar todas)
bun run verificar    # valida contenido: ids, enlaces, cobertura
bun run check        # tipos de Astro y TypeScript
bun run build        # tsc + astro build → dist/
bun run materiales   # manual, banco, glosario y guía en materiales/ (requiere fuentes/ local)
bun run pdf          # PDF de materiales (requiere Chromium)
```
Antes de cerrar un cambio: `bun test`, `bun run verificar`, `bun run build`. Si tocaste UI, revisá en móvil (375 px) y en modo claro y oscuro.

## Reglas de contenido
- **Fuentes:** `fuentes/` contiene el cuaderno de cátedra y un TPI con datos personales. Está en `.gitignore`. **Nunca lo subas ni lo cites textual en más de una frase.**
- Toda afirmación del curso lleva origen: `cuaderno` (capítulo y página), `didactico` o `ampliacion`. No atribuyas a la cátedra lo que no dice.
- Las preguntas son material de práctica propio. No presentarlas como examen ni como preguntas de la cátedra.
- Los datos de la carrera (planes, contactos) vienen de páginas públicas de la UNRaf. Citá la fuente y no inventes fechas ni teléfonos.

## Reglas de código
- Lógica pura en `src/logica/` (con pruebas); componentes React en `src/componentes/` (se hidratan como islas); datos en `contenido/<materia>/` (tipados, sin dependencias de UI). `contenido/tipos.ts` y `contenido/validar.ts` son compartidos.
- El render en servidor (build) no tiene `localStorage` ni `speechSynthesis`: los componentes deben dar el mismo HTML en el servidor y en el navegador (usar `rndDe(semilla)` en lugar de `Math.random`, y `getServerSnapshot` en stores).
- Los enlaces internos se generan con `ruta()` (`src/logica/rutas.ts`), que respeta la base `/AGI/`. No escribas URLs a mano.
- Las páginas del curso se generan desde `rutasCurso()`; agregar una lección no requiere tocar rutas.
- Dependencias de ejecución actuales: `astro`, `@astrojs/react`, `react`, `react-dom`, `@fontsource-variable/roboto-flex`, `@material-symbols/svg-400` (solo para generar iconos) y `lottie-web`. Cualquier dependencia nueva requiere justificar el peso y la licencia. Las herramientas van como devDependencies.
- Todo funciona sin conexión una vez cargado. No llames APIs externas para contenido esencial.
- Accesibilidad: foco visible, controles con nombre, `prefers-reduced-motion` respetado, contraste AA en ambos temas (`bun run scripts/contraste.ts`).
- Idioma de la interfaz y de los textos: español rioplatense (voseo), con tildes correctas.

## Tipografía
- Toda la interfaz usa **Roboto Flex**, servida desde el propio sitio con `@fontsource-variable/roboto-flex` (importada en `src/layouts/Base.astro`). No cargues la fuente desde Google en tiempo de ejecución.
- Las variables `--sans` y `--serif` apuntan a Roboto Flex. Los títulos usan ejes de ancho (`wdth`) y de tamaño óptico (`opsz`) en `global.css`; el cuerpo usa los valores normales.
- Tamaño de letra: `normal`, `grande` y `muy-grande` (clases en `<html>`, guardadas en el progreso local).

## Iconos
- Iconos de **Material Symbols** (Google, Apache-2.0), en `src/componentes/iconos.ts`. Este archivo **se genera**: no lo edites a mano.
- Para usar un icono nuevo: agregá su nombre a la lista `NOMBRES` de `scripts/generar-iconos.ts`, corré `bun run iconos` y usá `<Icono nombre="..." />` (`src/componentes/Icono.tsx`). El nombre debe existir en `@material-symbols/svg-400/rounded`.
- El icono hereda color y tamaño (`currentColor`, `1em`). Si no es decorativo, pasá `etiqueta`.
- No uses emojis ni caracteres Unicode como iconos.

## Imágenes y animaciones
- **No crees ilustraciones ni animaciones propias.** Buscá material en fuentes verificables (LottieFiles, Wikimedia Commons, Storyset, unDraw, etc.), comprobá la licencia de cada archivo en su página y registrala en `docs/creditos-multimedia.md` (título, autor, licencia, página de origen y fecha de verificación).
- Licencias aceptables: CC0, dominio público, Lottie Simple License, licencias Creative Commons que permitan uso comercial y redistribución (con atribución cuando se exija). Si la licencia no está clara, no se usa.
- Las animaciones Lottie van en `public/media/lottie/<nombre>.json` y se muestran con el bloque `animacion` (`src/componentes/Animacion.tsx`). Se cargan con `lottie-web/build/player/lottie_light.min.js` (sin `eval`) y solo cuando la figura se acerca a la pantalla.
- Con «reducir movimiento» activo se muestra el primer cuadro fijo. Toda imagen o animación lleva texto alternativo o descripción y un crédito visible.
- Las figuras SVG existentes en `src/componentes/Figuras.tsx` son dibujos del proyecto y están pendientes de reemplazo por material verificado; no agregues más figuras de ese tipo.

## Lectura en voz alta
`src/logica/voz.ts` usa la síntesis de voz del navegador. Divide en fragmentos cortos por una limitación de los navegadores. No la reemplaces por un servicio externo sin pedirlo.

## Despliegue
Un push a `main` ejecuta `.github/workflows/pages.yml` (prueba, `astro check`, build y publica `dist/`). No cambies la rama de publicación sin confirmarlo: el repositorio es público.

## Lo que no hacer
- No crear imágenes, ilustraciones ni animaciones propias: buscar y verificar la licencia.
- No cargar fuentes, iconos ni animaciones desde CDN externos en tiempo de ejecución.
- No subir `fuentes/`, `materiales/` ni `dist/` al repositorio.
- No activar ni desactivar la visibilidad del repositorio sin pedido explícito.
- No borrar progreso de usuario ni tocar `localStorage` de forma destructiva.
