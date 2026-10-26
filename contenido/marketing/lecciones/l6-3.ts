import { cap, corta, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l63: Leccion = {
  id: 'l6-3',
  unidad: 6,
  titulo: 'UX y proceso de venta digital',
  resumen: 'La experiencia de usuario como pilar del e-commerce y los temas del programa sin desarrollo: medios de pago, logística y m-commerce.',
  minutos: 30,
  objetivos: [
    'Explicar por qué la UX es un pilar del e-commerce y cuál es su impacto.',
    'Aplicar los seis principios estratégicos de UX a un caso.',
    'Reconocer los límites del cuaderno en pagos, logística y m-commerce.',
  ],
  previos: ['l6-2'],
  bloques: [
    {
      t: 'p',
      x: 'En el e-commerce **la interfaz digital es el único punto de contacto** entre usuario y marca. Por eso cada detalle —organización del contenido, velocidad de carga, claridad del proceso de compra— impacta en la percepción, la decisión de compra y la fidelización. La UX deja de ser un aspecto estético o técnico para convertirse en **un pilar de la planificación y gestión**.',
      o: cap('7', '138', 'La experiencia de usuario/a (UX)'),
    },
    {
      t: 'lista',
      items: [
        '**Tasa de conversión.**',
        '**Retención y lealtad** del cliente.',
        '**Reducción de carritos abandonados.**',
        '**Percepción de marca.**',
      ],
      o: cap('7', '138', 'La UX tiene un impacto directo en…'),
    },
    {
      t: 'explorable',
      titulo: 'Seis principios estratégicos de UX (Tabla 12)',
      variante: 'pasos',
      nodos: [
        { id: 'u1', titulo: 'Simplicidad y foco', resumen: 'Sin distracciones', detalle: 'Diseño claro: formularios cortos, navegación sencilla y opciones comprensibles reducen fricción y aumentan conversiones.' },
        { id: 'u2', titulo: 'Navegación intuitiva', resumen: 'Encontrar lo que busco', detalle: 'Menús organizados, filtros eficaces y buscadores funcionales mejoran la experiencia y reducen el abandono.' },
        { id: 'u3', titulo: 'Consistencia visual', resumen: 'Colores, tipografías, botones', detalle: 'Estilos coherentes en todo el sitio generan confianza, facilitan la navegación y proyectan imagen profesional.' },
        { id: 'u4', titulo: 'Velocidad de carga', resumen: 'Menos de 3 segundos', detalle: 'Un sitio rápido evita frustraciones: «si demora más de 3 segundos, muchos usuarios lo abandonan» (criterio del cuaderno).' },
        { id: 'u5', titulo: 'Personalización', resumen: 'Contenido adaptado', detalle: 'Contenido y recomendaciones adaptadas al usuario mejoran la percepción de valor, elevan el ticket promedio y refuerzan la fidelización.' },
        { id: 'u6', titulo: 'Evaluación continua', resumen: 'Datos reales', detalle: 'Una UX estratégica se basa en datos: analizar métricas, realizar pruebas y ajustar el diseño continuamente.' },
      ],
      o: cap('7', '138-139', 'Tabla 12'),
    },
    {
      t: 'p',
      x: 'Un e-commerce eficaz no se limita al diseño y la UX: hace falta que los potenciales clientes **encuentren el sitio** (SEO/SEM, ver [[>l4-1|l4-1]] y [[>l4-2|l4-2]]).',
      o: cap('7', '139'),
    },
    { t: 'h', x: 'Actividades prácticas propuestas por el cuaderno' },
    {
      t: 'lista',
      num: true,
      items: [
        'Seleccionar **tres tiendas online** para desarrollar un e-commerce: **(a)** análisis comparativo con variables clave; **(b)** ¿cuál y por qué sería la más adecuada para comercializar bicicletas, cosméticos y budines?',
        'Con los casos del Anexo (**KM0 Motos** y **BI-PLA**): **(a)** detallar y clasificar qué tipo de e-commerce posee cada uno; **(b)** fortalezas y debilidades; **(c)** elaborar el viaje del cliente; **(d)** tres sugerencias de mejora desde el punto de vista del usuario.',
      ],
      o: cap('7', '139-140'),
    },
    {
      t: 'callout',
      tipo: 'discrepancia',
      titulo: 'Casos del anexo no incluidos',
      x: 'Los casos KM0 Motos y BI-PLA están como enlaces a presentaciones de Genially (p. 174-175); su contenido **no está en el documento** y no se inspeccionó. La actividad 2 no puede resolverse con este curso sin esas presentaciones.',
      o: cap('Anexo 1', '174-175'),
    },
    { t: 'h', x: 'Proceso de venta digital: lo que el cuaderno deja sin desarrollar' },
    {
      t: 'callout',
      tipo: 'ampliacion',
      titulo: 'Medios de pago, logística y m-commerce (programa U6)',
      x: 'El programa pide «medios de pago y logística» y «la importancia del mobile: introducción al m-commerce». En el cuaderno solo hay **menciones**: pagos seguros y devoluciones como característica técnica de la tienda (p. 137); logística y medios de pago como ventajas del marketplace (p. 136); un ejemplo de la librería con envío por OCA y pagos con Mercado Pago, tarjeta o transferencia (Cap. 5, pp. 104-105); y «diseño responsive» como factor SEO (p. 145). **No hay una explicación de m-commerce.** *Síntesis didáctica (sin fuente externa verificada):* m-commerce = comercio electrónico realizado desde dispositivos móviles; la experiencia móvil exige sitio responsive, carga rápida y proceso de compra simple (ideas que el cuaderno ya vincula con UX y SEO). Para cumplir el programa leer CACE (2022), Hernández Ramos (2020, Cap. 8) y Chaffey (2014).',
      o: { tipo: 'ampliacion', ref: 'Síntesis didáctica; requiere CACE (2022), Hernández Ramos (2020)' },
    },
    {
      t: 'ejemplo',
      titulo: 'Diagnóstico de UX de una tienda de panificados (didáctico)',
      pasos: [
        '**Simplicidad:** ¿el pedido se completa en menos de 5 campos? Si el formulario pide 12 datos, se pierde conversión.',
        '**Navegación:** ¿hay categorías (budines, tartas, combos) y buscador?',
        '**Consistencia:** ¿colores y botones coinciden con Instagram y con el packaging?',
        '**Velocidad:** probar la carga en el celular con PageSpeed Insights.',
        '**Personalización:** «volvé a pedir lo de la semana pasada».',
        '**Evaluación continua:** medir carritos abandonados y probar dos versiones del botón de compra.',
      ],
    },
    {
      t: 'clasificar',
      titulo: '¿Qué principio de UX falla?',
      categorias: ['Simplicidad', 'Navegación', 'Consistencia', 'Velocidad', 'Personalización'],
      items: [
        { x: 'Un formulario de compra de 15 campos obligatorios', cat: 0, porque: 'Aumenta la fricción.' },
        { x: 'No hay filtros ni buscador en un catálogo de 300 productos', cat: 1, porque: 'Dificulta encontrar lo que se busca.' },
        { x: 'Cada página usa botones y colores distintos', cat: 2, porque: 'Falta coherencia visual y confianza.' },
        { x: 'La página tarda 8 segundos en cargar', cat: 3, porque: 'Se supera el umbral de abandono del cuaderno.' },
        { x: 'Recomendaciones iguales para todos los clientes', cat: 4, porque: 'No se adapta al usuario ni sube el ticket.' },
      ],
    },
  ],
  claves: ['ux', 'carrito-abandonado', 'checkout', 'm-commerce', 'responsive', 'tasa-conversion', 'medios-pago', 'logistica'],
  preguntas: [
    mc('l63-q1', 'UX', 1, '¿Por qué la UX es crítica en el e-commerce?', [
      ['Porque la interfaz es el único punto de contacto entre el usuario y la marca', 'Correcto.'],
      ['Porque reemplaza al producto', 'No.'],
      ['Porque solo importa el diseño estético', 'El cuaderno dice que no es solo estético.'],
      ['Porque elimina la necesidad de SEO', 'Se complementan.'],
    ], 0, cap('7', '138')),
    mc('l63-q2', 'UX', 2, '¿Cuál de estos NO es un impacto directo de la UX según el cuaderno?', [
      ['Tasa de conversión', 'Sí lo es.'],
      ['Reducción de carritos abandonados', 'Sí lo es.'],
      ['Aumento del precio de las materias primas', 'Correcto: no guarda relación con la UX.'],
      ['Percepción de marca', 'Sí lo es.'],
    ], 2, cap('7', '138')),
    mc('l63-q3', 'Cobertura', 2, 'Sobre m-commerce, el cuaderno…', [
      ['Lo define y explica en el Cap. 7', 'No aparece como concepto.'],
      ['No lo desarrolla: solo hay indicios (responsive, UX)', 'Correcto.'],
      ['Lo prohíbe', 'No.'],
      ['Lo equipara a marketplace', 'No.'],
    ], 1, cap('7', '138-145')),
    corta('l63-q4', 'UX', 3, 'Elegí una tienda online que uses y evaluá dos principios de UX (uno bien resuelto y uno a mejorar) con evidencia concreta.', 'Ej.: Buena navegación (filtros y buscador efectivos) pero velocidad mejorable en celular (tarda más de 3 segundos). Propuesta: comprimir imágenes y medir con PageSpeed Insights.', [
      'Aplica dos principios de la tabla 12',
      'Usa evidencia concreta',
      'Propone una mejora',
    ], cap('7', '138-139')),
  ],
  tarjetas: [
    { id: 'l63-t1', f: 'Impacto de la UX', b: 'Tasa de conversión, retención y lealtad, menos carritos abandonados y mejor percepción de marca.' },
    { id: 'l63-t2', f: 'Seis principios de UX', b: 'Simplicidad, navegación intuitiva, consistencia visual, velocidad de carga, personalización y evaluación continua.' },
    { id: 'l63-t3', f: 'Pagos, logística y m-commerce en el cuaderno', b: 'Solo mencionados: requieren bibliografía complementaria.' },
  ],
  sintesis: ['La UX conecta con conversión, retención y marca.', 'Seis principios para auditar una tienda.', 'Pagos, logística y m-commerce: ampliación y lectura obligatoria.'],
  conexiones: ['l4-1', 'l6-2', 'l8-1'],
  referencias: [cap('7', '137-140'), cap('Anexo 1', '174-175')],
}
