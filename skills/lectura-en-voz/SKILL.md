---
name: lectura-en-voz
description: Modificar la lectura en voz alta (tipo podcast) del sitio: reproductor, fragmentos, velocidad y modo continuo. Usar cuando se toque la función de audio o aparezcan problemas de lectura.
---

# Lectura en voz alta

- Implementación: `src/logica/voz.ts` (lógica) y `src/componentes/Reproductor.tsx` (controles).
- Usa `speechSynthesis` del navegador, que funciona sin conexión si el dispositivo tiene voces instaladas. Prefiere `es-AR`, luego cualquier `es`.
- El texto se toma del `main` visible: se quitan botones, SVG, figuras y controles (`textoDeElemento`).
- Los fragmentos son de unos 220 caracteres (`trocear`), porque algunos navegadores cortan lecturas largas. No eliminar esa división.
- Modo continuo: al terminar una lección se navega a la siguiente y, si la opción está activa, la lectura continúa (`tomarPendienteContinuo`).
- Cambiar la velocidad reinicia el fragmento actual con la nueva velocidad.
- Probar con `bun test tests/voz.test.ts`. La síntesis real no se puede probar en CI: verificala a mano en Chrome y en el teléfono.
- En navegadores sin soporte, el reproductor muestra un aviso en lugar de fallar.
