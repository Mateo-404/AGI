---
name: lectura-en-voz
description: Modificar o depurar la lectura en voz alta de Somos #AGI (reproductor, pausa, marcado del texto, controles del sistema). Usar ante un error de audio, de pausa o de la notificación en el móvil.
---

# Lectura en voz alta

Código: `src/logica/voz.ts` (estado y voz), `src/componentes/Reproductor.tsx` (botón y menú), pruebas en `tests/voz.test.ts` y `tests/voz-estado.test.ts`.

## Cómo funciona
- Usa la síntesis de voz del navegador, **sin servidores**. El texto se parte en fragmentos de hasta 220 caracteres porque muchos navegadores cortan las lecturas largas.
- Cada **bloque** de la página (párrafo, ítem, título…) es una unidad: mientras suena se marca con la clase `voz-leyendo` y la página se desplaza para dejarlo en el tercio superior.
- **Pausar corta el fragmento y, al seguir, lo relee desde el comienzo.** No uses `speechSynthesis.pause()`: no funciona en varios móviles y deja la lectura trabada.
- Cada corte (pausa, velocidad, detener) cambia un número de «turno»: los eventos de un fragmento cortado se ignoran. Sin eso, cancelar dispara `error` de forma asíncrona y avanza dos veces.
- **Notificación y pantalla de bloqueo:** Media Session (`navigator.mediaSession`) con play/pausa/detener. Chrome y Android solo muestran esos controles si hay audio sonando, así que mientras se lee suena un silencio en bucle generado en memoria.
- **Modo continuo:** al terminar la lección navega a la siguiente con `irA()` y la lee; el estado sobrevive porque el enrutador de Astro no recarga. Cambiar de lección a mano detiene la voz.
- No se leen los controles, las figuras, los diagramas ni los créditos (`NO_LEER` en `voz.ts`).

## Probar
- Lógica: `bun test tests/voz-estado.test.ts` usa una síntesis simulada que cancela de forma asíncrona, como Chrome.
- En navegador: el entorno de pruebas no tiene voces; simulá `speechSynthesis` con un `addInitScript` (hay ejemplos de este patrón en la historia del repositorio) y comprobá pausar, seguir, velocidad, detener, marcado y continuo.
- Lo que **no** se puede verificar sin un teléfono real: el sonido, y que la notificación aparezca. Probalo en Android (Chrome) y en un iPhone.

## No hacer
No reemplazar por un servicio externo sin pedirlo; no leer el texto desde el DOM completo sin excluir lo no leíble; no navegar con `location.href` (se pierde el estado).
