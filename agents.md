# agents.md · Somos #AGI (proyecto personal)

Instrucciones para agentes de IA que trabajen en este repositorio. Leé también `README.md` y las skills de `skills/`: **`apuntes-md`** (escribir lecciones), **`diagramas`** (Mermaid) e **`ilustraciones`** (imágenes e iconos).

## Qué es
Sitio estático con **Astro** (islas de React + TypeScript, con **bun**) publicado en GitHub Pages desde la rama `main`:
- `/AGI` → inicio de la carrera (Somos #AGI). Proyecto personal de Mateo Gariboglio; **no es oficial de la UNRaf**. Puede usar la identidad visual de la UNRaf como referencia, pero debe aclararlo.
- `/AGI/<materia>` → curso interactivo de cada materia (marketing, administracion-procesos, calculo-costos, gestion-ventas, ingenieria-software, ingles-1, introduccion-comunicaciones, paradigmas-programacion, universidad-sociedad-conocimientos): lecciones, práctica, glosario, tarjetas, progreso local. Cada página es un HTML real; es una app instalable y funciona sin conexión.
- **Una carpeta por materia** (`contenido/<materia>/` y, si hace falta, `src/pages/<materia>/`). Una rama `main` permanente; las ramas son solo para cambios temporales. Ver `skills/agregar-materia/SKILL.md`.

## Comandos (siempre con bun)
```bash
bun install
bun run dev            # desarrollo (sin service worker)
bun test               # pruebas (deben pasar todas)
bun run verificar      # valida contenido: ids, enlaces, orígenes, créditos
bun run check          # tipos (tsc). astro check no soporta TypeScript 7
bun run build          # tsc + astro build → dist/
bun run diagramas      # dibuja los Mermaid nuevos (necesita Chromium); sube los SVG
bun run ilustracion    # busca y descarga iconos e imágenes con licencia verificada
bun run materiales     # manual, banco, glosario y guía en materiales/ (requiere fuentes/ local)
```
Antes de cerrar un cambio: `bun test`, `bun run verificar`, `bun run check` y el build. Si tocaste UI, revisá en móvil (375 px), en claro y oscuro, y con gestos táctiles.

## Escribir apuntes (Markdown)
El contenido vive en `contenido/marketing/lecciones/lN-M.md` (apunte) y `lN-M.practica.yaml` (preguntas y tarjetas). **No hay contenido en TypeScript.** El formato completo, con ejemplos, está en `skills/apuntes-md/SKILL.md`. Resumen:
- Frontmatter YAML con `id`, `unidad`, `titulo`, `resumen`, `minutos`, `objetivos`, `previos`, `claves`, `conexiones`, `referencias`.
- Cuerpo: párrafos, `## encabezados`, listas y tablas GFM, contenedores `:::clave`, `:::ojo`, `:::ia`, `:::ampliacion`, `:::discrepancia`, `:::didactico`, `:::def`, `:::ejemplo`, `:::comparar`, `:::acordeon`, y bloques ```` ```explorable ````, ```` ```asociar ````, ```` ```clasificar ````, ```` ```caso ````, ```` ```mermaid ````, ```` ```imagen ````.
- Marcado en línea: `**negrita**`, `*cursiva*`, `[[id]]` (glosario), `[[>l2-3|texto]]` (lección).
- **Origen obligatorio** al final de cada bloque de contenido: `{c 1 | 14}` (cuaderno: capítulo | página | sección), `{d}` (explicación didáctica) o `{a referencia}` (ampliación externa). `bun run verificar` falla si falta.
- Escribí solo lo que sabés de la fuente. **No inventes páginas, capítulos, citas ni cifras.** Si no está en el cuaderno, es `{d}` o `{a …}` y se dice.

## Reglas de contenido
- **Fuentes:** `fuentes/` contiene el cuaderno de cátedra y un TPI con datos personales. Está en `.gitignore`. **Nunca lo subas ni lo cites textual en más de una frase.**
- No atribuyas a la cátedra lo que no dice. Las preguntas son material de práctica propio: no presentarlas como examen ni como preguntas de la cátedra.
- Los datos de la carrera (planes, contactos) vienen de páginas públicas de la UNRaf. Citá la fuente y no inventes fechas ni teléfonos.

## Diagramas y gráficos
- **Primero Mermaid**: todo lo que sea estructura, proceso, relación o secuencia va como ```` ```mermaid ```` en el `.md`, no como imagen. Se dibuja en el build (cero JavaScript de Mermaid en el navegador), con el tema claro/oscuro y animación. Reglas y ejemplos: `skills/diagramas/SKILL.md`.
- Después de escribir o cambiar un diagrama corré `bun run diagramas` y subí los SVG de `contenido/marketing/diagramas/`. El CI no tiene Chromium: si falta un SVG, el build falla con instrucciones.
- Verticales (`flowchart TB`) para lo que tenga más de 3 nodos: en el móvil los horizontales se vuelven ilegibles.
- No dibujes SVG a mano ni agregues componentes de figuras: los diagramas de texto reemplazan a `Figuras.tsx` (ya retirado).

## Imágenes, iconos y animaciones
- **Iconos de la interfaz:** Material Symbols (Apache-2.0) en `src/componentes/iconos.ts`, que **se genera**: agregá el nombre a `NOMBRES` en `scripts/generar-iconos.ts`, corré `bun run iconos` y usá `<Icono nombre="..." />`. No uses emojis como iconos.
- **Ilustraciones o iconos dentro de una lección:** solo con `bun run ilustracion` (Iconify y Wikimedia Commons). La herramienta verifica la licencia contra la API, descarga a `public/media/`, registra el crédito en `docs/creditos-multimedia.md` e imprime el bloque ```` ```imagen ```` para pegar. Buscá en **inglés**. Detalle: `skills/ilustraciones/SKILL.md`.
- **Licencias aceptadas:** CC0, dominio público, MIT, ISC, Apache-2.0, BSD y CC BY. **No se usan** SA, NC, ND, GPL ni lo que no declare licencia. **unDraw está prohibida:** su licencia veta la descarga automatizada y el uso con IA. Ante la duda, no se usa.
- No descargues imágenes a mano ni de otros sitios. Todo archivo de `public/media/` debe figurar en `docs/creditos-multimedia.md` (lo exige `tests/creditos.test.ts`).
- Animaciones Lottie: `public/media/lottie/<nombre>.json` con el bloque `animacion`; solo de fuentes verificables (LottieFiles con su licencia). Con «reducir movimiento» se muestra el primer cuadro.
- Toda imagen lleva texto alternativo que la **describe** (no repite el título) y crédito visible.

## Reglas de código
- Lógica pura en `src/logica/` (con pruebas); componentes React en `src/componentes/`; datos en `contenido/<materia>/` (sin dependencias de UI). `contenido/tipos.ts` y `contenido/validar.ts` son compartidos.
- **El cuerpo de las lecciones es HTML estático** (`LeccionEstatica.astro`); solo lo que tiene estado (explorables, asociar, clasificar, caso, calculadoras, quiz, tarjetas, repaso, voz) es una isla. No metas contenido en el JavaScript del cliente: `scripts/vite-curso-liviano.ts` le entrega al navegador solo metadatos, preguntas y tarjetas.
- El render en servidor no tiene `localStorage` ni `speechSynthesis`: los componentes deben dar el mismo HTML en servidor y navegador (`rndDe(semilla)` en vez de `Math.random`, y `getServerSnapshot` en stores).
- Enlaces internos con `ruta()` (`src/logica/rutas.ts`): la URL no lleva barra final (`/AGI/marketing/leccion/l2-1`). Para navegar desde código usá `irA()` (`src/logica/navegar.ts`), no `location.href`: el enrutador de Astro evita recargar y conserva el estado (por ejemplo, la voz).
- Las páginas se generan desde `rutasCurso()`; agregar una lección (`.md`) no requiere tocar rutas.
- Dependencias de ejecución: `astro`, `@astrojs/react`, `react`, `react-dom`, `@fontsource-variable/roboto-flex`, `@material-symbols/svg-400` (solo para generar iconos) y `lottie-web`. Cualquier otra requiere justificar peso y licencia; las herramientas van como devDependencies (hoy: `yaml`, `mermaid-isomorphic`, `playwright`).
- Todo funciona sin conexión una vez cargado (service worker generado en el build). No llames APIs externas para contenido esencial.
- Accesibilidad: foco visible, controles con nombre, `prefers-reduced-motion` respetado, contraste AA en ambos temas (`bun run contraste`).
- Idioma de la interfaz y de los textos: español rioplatense (voseo), con tildes correctas.
- **Código:** aplicá [`skills/ponytail/SKILL.md`](skills/ponytail/SKILL.md) (la solución más chica que resuelve el pedido) y usá `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain` o `/ponytail-help` cuando corresponda.

## Móvil y gestos
Hay barra inferior, deslizar entre lecciones, menú arrastrable y tarjetas que se califican deslizando (`src/logica/gestos.ts`, `src/componentes/NavMovil.tsx`). **Cada gesto tiene su botón visible** y nunca debe bloquear el scroll vertical ni interferir con el gesto «atrás» del sistema (se ignoran los 24 px de los bordes). Un componente nuevo con scroll horizontal o arrastre lleva `data-sin-gesto`.

## Tipografía
Toda la interfaz usa **Roboto Flex** servida desde el propio sitio (`@fontsource-variable/roboto-flex`, importada en `src/layouts/Base.astro`). No cargues fuentes desde Google en tiempo de ejecución. Tamaños de letra: `normal`, `grande`, `muy-grande` (clases en `<html>`).

## Lectura en voz alta
`src/logica/voz.ts` usa la síntesis del navegador, en fragmentos cortos. Pausar corta el fragmento y relee al seguir: **no uses `speechSynthesis.pause()`**, no funciona en varios móviles. Cada bloque se marca mientras suena y la página se desplaza. No la reemplaces por un servicio externo sin pedirlo.

## Despliegue
Un push a `main` ejecuta `.github/workflows/pages.yml` (Node 26: pruebas, verificar, `tsc`, build y publica `dist/`). No cambies la rama de publicación sin confirmarlo: el repositorio es público.

## Lo que no hacer
- No escribir lecciones en TypeScript ni dibujar SVG a mano: Markdown y Mermaid.
- No descargar imágenes por fuera de `bun run ilustracion` ni usar unDraw.
- No cargar fuentes, iconos ni animaciones desde CDN externos en tiempo de ejecución.
- No subir `fuentes/`, `materiales/` ni `dist/` al repositorio.
- No activar ni desactivar la visibilidad del repositorio sin pedido explícito.
- No borrar progreso de usuario ni tocar `localStorage` de forma destructiva.
