# agents.md · Somos #AGI (proyecto personal)

Instrucciones para agentes de IA que trabajen en este repositorio. Leé también `README.md` y las skills de `skills/`.

## Qué es
Sitio estático (React + TypeScript + Vite, con **bun**) publicado en GitHub Pages desde la rama `marketing`:
- `#/` → inicio de la carrera (Somos #AGI). Proyecto personal de Mateo Gariboglio; **no es oficial de la UNRaf**. Puede usar la identidad visual de la UNRaf como referencia, pero debe aclararlo.
- `#/marketing` → curso interactivo de Marketing Digital (30 lecciones, práctica, glosario, tarjetas, progreso local).
- Cada materia nueva tiene su propia ruta `#/<materia>`. Ver `skills/agregar-materia/SKILL.md`.

## Comandos (siempre con bun)
```bash
bun install
bun run dev          # desarrollo
bun test             # pruebas (deben pasar todas)
bun run verificar    # valida contenido: ids, enlaces, cobertura
bun run build        # tsc + vite build → dist/
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
- Lógica pura en `src/logica/` (con pruebas); presentación en `src/componentes/`; datos en `contenido/` (tipados, sin dependencias de UI).
- Los enlaces internos del curso empiezan con `#/marketing/`. Un enlace sin ese prefijo es un bug.
- No agregues dependencias de ejecución. Hoy sólo `react` y `react-dom`. Las herramientas van como devDependencies.
- Todo funciona sin conexión una vez cargado. No llames APIs externas para contenido esencial.
- Accesibilidad: foco visible, controles con nombre, `prefers-reduced-motion` respetado, contraste AA en ambos temas (`bun run scripts/contraste.ts`).
- Idioma de la interfaz y de los textos: español rioplatense (voseo), con tildes correctas.

## Lectura en voz alta
`src/logica/voz.ts` usa la síntesis de voz del navegador. Divide en fragmentos cortos por una limitación de los navegadores. No la reemplaces por un servicio externo sin pedirlo.

## Despliegue
Un push a `marketing` ejecuta `.github/workflows/pages.yml` (prueba, compila y publica). No cambies la rama de publicación sin confirmarlo: el repositorio es público.

## Lo que no hacer
- No subir `fuentes/`, `materiales/` ni `dist/` al repositorio.
- No activar ni desactivar la visibilidad del repositorio sin pedido explícito.
- No borrar progreso de usuario ni tocar `localStorage` de forma destructiva.
