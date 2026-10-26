import { cap, corta, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l26: Leccion = {
  id: 'l2-6',
  unidad: 2,
  titulo: 'De las 4P a las 4P digitales',
  resumen: 'Personalización, par a par, participación y predicciones modeladas, con el caso de una librería.',
  minutos: 25,
  objetivos: [
    'Definir cada una de las cuatro P digitales.',
    'Identificarlas en un caso y contrastarlas con las 4P tradicionales.',
    'Relacionar personalización con hipersegmentación y marketing uno a uno.',
  ],
  previos: ['l2-3', 'l2-4', 'l2-5'],
  bloques: [
    {
      t: 'p',
      x: 'El cuaderno afirma que las variables tradicionales **«se han adaptado al surgimiento del marketing en el mercado digital»** y presenta cuatro P digitales. No reemplazan al mix tradicional: lo reinterpretan desde la experiencia de usuario conectada. (El cuaderno no cita autoría para esta lista.)',
      o: cap('5', '103', 'De las 4Ps tradicionales a las 4Ps digitales'),
    },
    {
      t: 'explorable',
      titulo: 'Las 4P digitales',
      variante: 'pasos',
      nodos: [
        { id: 'd1', titulo: 'Personalización', resumen: 'Experiencia a medida', detalle: 'La experiencia online es cada vez más personalizada: se rastrean, miden y almacenan datos de los usuarios y a partir de ellos se crean, diseñan y enfocan productos a medida. Ejemplos: anuncios en Google y redes según gustos; emails personalizados (newsletters); web adaptada a las necesidades del cliente.' },
        { id: 'd2', titulo: 'Par a par', resumen: 'Confianza entre pares', detalle: 'Importancia del boca a boca: los consumidores confían más en sus pares que en lo que dicen las marcas. Conviene crear una comunidad online (ventaja diferencial). Las recomendaciones son instantáneas y en tiempo real. Ejemplos: referencias de usuarios en Google Maps; compartir una lista de reproducción de Spotify en redes.' },
        { id: 'd3', titulo: 'Participación', resumen: 'Co-creación de valor', detalle: 'Involucramiento directo de los usuarios: opinan, participan, tienen voz propia y se genera co-creación de valor; implica comunidades offline y online. Caso: Lays lanzó sabores en preventa y los consumidores votaron en la web oficial el sabor que saldría a la venta de manera permanente.' },
        { id: 'd4', titulo: 'Predicciones modeladas', resumen: 'Anticiparse al cliente', detalle: 'Identificar y captar clientes según factores cuantitativos para analizar datos en tiempo real, monitorear la interacción con la marca y diseñar acciones según el comportamiento; así se predice qué le interesará al cliente y se anticipa su proceso de compra.' },
      ],
      o: cap('5', '103-104'),
    },
    {
      t: 'tabla',
      titulo: 'Ejemplo integrador: una librería (tradicionales vs. digitales)',
      cab: ['P', 'Aplicación en el caso del cuaderno'],
      filas: [
        ['**Producto**', 'Gama amplia (lettering y artística, comercial y oficina, escolar); diseños modernos en colores pastel, neón o clásicos; «Boxs» con combinaciones de productos; packaging y etiquetas coherentes con la imagen de marca.'],
        ['**Plaza**', 'Venta mayorista (70 %) y minorista (30 %), dos tiendas online, envíos por OCA (3 a 6 días hábiles), también en Mercado Libre con Mercado Envíos.'],
        ['**Precio**', 'Precios claros con IVA incluido; descuentos por volumen y envío gratis por montos; mayoristas necesitan cuenta; pago con Mercado Pago, tarjeta o transferencia; cupón del 10 % en compras minoristas; precios fijados mirando el minorista de la competencia y permitiendo que el revendedor venda a precio similar.'],
        ['**Promoción**', 'Publicidad en redes sociales y creciente Google Ads; equipo con asesoramiento técnico; presencia en Facebook, Instagram, TikTok, YouTube y WhatsApp con tutoriales; mensaje: marca innovadora y única en el país.'],
        ['**Personalización** (digital)', 'Ventanas emergentes recogen datos e intereses para enviar campañas de email relevantes.'],
        ['**Par a par** (digital)', 'Buena reputación como vendedores en Mercado Libre: da confianza al comprador.'],
        ['**Predicciones modeladas** (digital)', 'Modelado predictivo con datos históricos, patrones y estacionalidad; detectó el aumento de interés en los kits de lettering.'],
        ['**Participación** (digital)', 'Propuesta: desafío creativo con hashtag propio, votación de la comunidad y uso de diseños en packaging o productos exclusivos.'],
      ],
      o: cap('5', '104-106'),
    },
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Hilo con otros temas',
      x: 'La personalización conecta con la **hipersegmentación** y el marketing «uno a uno» (l3-3, l2-2); el par a par con la reputación en marketplaces ([[>l6-2|l6-2]]) y las reseñas; las predicciones modeladas con el marketing predictivo ([[>l2-2|l2-2]]).',
      o: { tipo: 'didactico' },
    },
    {
      t: 'asociar',
      titulo: 'Asociá cada acción con la P digital',
      pares: [
        ['Una marca envía un email con productos según las compras previas de cada cliente', 'Personalización'],
        ['Una tienda destaca reseñas y calificaciones de otros compradores', 'Par a par'],
        ['Una marca invita a votar el próximo sabor y lo comercializa', 'Participación'],
        ['Un comercio anticipa la demanda del mes con datos históricos y estacionalidad', 'Predicciones modeladas'],
      ],
    },
  ],
  claves: ['4p-digitales', 'personalizacion', 'par-a-par', 'participacion', 'predicciones-modeladas', 'hipersegmentacion'],
  preguntas: [
    mc('l26-q1', '4P digitales', 1, 'Cuál de estas NO es una de las 4P digitales del cuaderno:', [
      ['Personalización', 'Sí lo es.'],
      ['Par a par', 'Sí lo es.'],
      ['Posicionamiento', 'Correcto: no forma parte de esa lista (la cuarta es predicciones modeladas).'],
      ['Participación', 'Sí lo es.'],
    ], 2, cap('5', '103-104')),
    mc('l26-q2', '4P digitales', 2, 'Lays pidió a los consumidores votar el sabor que quedaría en el mercado. ¿Qué P digital ilustra?', [
      ['Personalización', 'Se orienta a adaptar la experiencia a cada usuario con datos.'],
      ['Par a par', 'Se centra en recomendaciones entre usuarios.'],
      ['Participación', 'Correcto: involucra directamente a los usuarios y co-crea valor.'],
      ['Predicciones modeladas', 'Usa análisis cuantitativo de datos para anticipar comportamientos.'],
    ], 2, cap('5', '104')),
    mc('l26-q3', '4P digitales', 3, 'Una tienda online confía más en las reseñas que en su propio discurso para generar confianza. Esto se explica porque…', [
      ['Los consumidores confían más en sus pares que en lo que expresan las marcas', 'Correcto: es el fundamento de «par a par».'],
      ['Las reseñas siempre son verdaderas', 'El cuaderno no afirma eso.'],
      ['El precio es más importante', 'No es el fundamento.'],
      ['Las marcas no pueden comunicar', 'Pueden; pero el par a par pesa más.'],
    ], 0, cap('5', '103')),
    corta('l26-q4', '4P digitales', 3, 'Elegí un negocio y proponé una acción para cada una de las 4P digitales.', 'Ej. panadería: personalización (promos por WhatsApp según pedidos previos), par a par (mostrar reseñas de Google), participación (votar el nuevo sabor de alfajor), predicciones modeladas (prever demanda por fechas con historial de ventas).', [
      'Propone una acción por cada P',
      'Cada acción corresponde con la definición',
    ], cap('5', '103-104')),
  ],
  tarjetas: [
    { id: 'l26-t1', f: 'Las 4P digitales', b: 'Personalización, par a par, participación y predicciones modeladas.' },
    { id: 'l26-t2', f: 'Par a par', b: 'Los consumidores confían más en sus pares que en las marcas; importa construir comunidad.' },
    { id: 'l26-t3', f: 'Participación', b: 'Involucramiento y co-creación de valor con los usuarios (ej.: Lays y la votación del sabor).' },
    { id: 'l26-t4', f: 'Predicciones modeladas', b: 'Análisis cuantitativo de datos en tiempo real para anticipar el interés y el proceso de compra.' },
  ],
  sintesis: ['Las 4P digitales reinterpretan el mix con datos y comunidad.', 'Un mismo negocio combina 4P tradicionales y digitales.', 'Se conectan con segmentación, marketplaces e IA.'],
  conexiones: ['l2-2', 'l3-3', 'l6-2'],
  referencias: [cap('5', '103-106')],
}
