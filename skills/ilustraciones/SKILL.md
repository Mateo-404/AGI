---
name: ilustraciones
description: Conseguir iconos o imágenes con licencia verificada para una lección de Somos #AGI. Usar cuando una lección necesite una ilustración, un icono o una foto. Sin esta herramienta no se agregan imágenes.
---

# Ilustraciones e iconos con licencia verificada

## Primero, ¿hace falta una imagen?
1. ¿Es una **estructura, proceso o relación**? → **diagrama Mermaid** (`skills/diagramas`). Es la primera opción.
2. ¿Es un **icono de la interfaz** (botón, menú)? → Material Symbols: `scripts/generar-iconos.ts` y `<Icono />` (ver `agents.md`).
3. ¿Hace falta un **icono o una ilustración dentro de la lección**? → `bun run ilustracion`.
4. ¿Es un dato o una comparación? → una **tabla**. Una imagen decorativa que no enseña nada no se agrega.

## Buscar (no descarga nada)
```bash
bun run ilustracion icono funnel                       # iconos (Iconify)
bun run ilustracion icono "shopping cart" --set lucide,tabler,mdi --limite 6
bun run ilustracion imagen "sales funnel diagram"      # imágenes (Wikimedia Commons)
```
- **Buscá en inglés**: los índices están en inglés y en español casi no devuelven nada.
- Solo muestra lo que tiene **licencia aceptada**. Dice cuántos descartó.
- En Iconify, preferí un solo set para toda la lección (mismo trazo): por ejemplo `lucide` o `tabler`.

## Descargar (guarda el archivo, registra el crédito, da el bloque)
```bash
bun run ilustracion descargar icono lucide:funnel --alt "Embudo"
bun run ilustracion descargar imagen "File:Sales-funnel.svg" --alt "Diagrama de un embudo de ventas"
```
Vuelve a verificar la licencia al descargar, guarda en `public/media/`, agrega la fila a `docs/creditos-multimedia.md` y **imprime el bloque** ```` ```imagen ```` para pegar en el `.md`. No edites los créditos a mano.

- **`--alt` es obligatorio y describe lo que se ve** («Embudo con cuatro etapas»), no repite el título ni dice «imagen de…».
- Si falla (licencia, límite de pedidos, red) **no guarda nada**. Un error 429 se reintenta solo con espera; si persiste, esperá unos minutos y repetí. No insistas en bucle ni cambies el user agent para esquivarlo.
- Si hay que citar el origen de la imagen en el apunte, el bloque ya lleva `o: d`; cambialo si corresponde.

## Qué licencias se aceptan y por qué
Aceptadas: **CC0, dominio público, MIT, ISC, Apache-2.0, BSD y CC BY** (con crédito visible, que el bloque ya incluye). Rechazadas: **CC BY-SA** (obliga a licenciar el sitio igual), **NC** (no comercial), **ND**, **GPL**, y todo lo que no declare licencia o tenga restricciones adicionales (derechos de imagen, marcas). Ante la duda, no se usa.

**unDraw está prohibida**: su licencia veta la descarga automatizada y el uso con IA. Tampoco se descarga a mano de otros sitios, ni se saca una imagen de una búsqueda general: sin licencia verificable por la herramienta, no entra.

## Después
1. Pegá el bloque en el `.md`, donde ayude a entender (no al final por relleno).
2. `bun run verificar` comprueba: el archivo existe, figura en los créditos, tiene `alt` y crédito visible.
3. Mirala en el navegador en 375 px y en oscuro (un icono con color propio puede no combinar).
