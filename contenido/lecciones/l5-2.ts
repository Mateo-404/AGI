import { cap, corta, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l52: Leccion = {
  id: 'l5-2',
  unidad: 5,
  titulo: 'El Community Manager y el rol de los usuarios',
  resumen: 'Funciones del CM, reputación y crisis, y cómo cambió la forma de consumir contenido (Messy Middle y 4S).',
  minutos: 25,
  objetivos: [
    'Enumerar las funciones del Community Manager y su doble monitoreo.',
    'Explicar las premisas del mundo digital (los errores no se perdonan; siempre hay que responder) con matices.',
    'Relacionar el cambio del consumo con Messy Middle y 4S.',
  ],
  previos: ['l5-1', 'l2-8'],
  bloques: [
    {
      t: 'p',
      x: 'El **Community Manager (CM)** administra y gestiona la presencia de una marca en redes y plataformas digitales. Su función va mucho más allá de «publicar»: es el **vínculo directo** entre la organización y su comunidad online. Construye y fortalece relaciones **escuchando activamente**, promoviendo la participación y generando conversación. Requiere **empatía, criterio profesional y visión estratégica** alineada con los objetivos.',
      o: cap('9', '166-167'),
    },
    {
      t: 'explorable',
      titulo: 'Funciones clave del Community Manager',
      variante: 'pasos',
      nodos: [
        { id: 'c1', titulo: 'Conocer su comunidad', resumen: 'Quiénes y qué buscan', detalle: 'Quiénes son los seguidores, qué les interesa y qué buscan en relación con la marca.' },
        { id: 'c2', titulo: 'Planificar contenido', resumen: 'Calendarizar', detalle: 'Proponer y calendarizar publicaciones que respondan a los intereses del público y a los objetivos de marketing.' },
        { id: 'c3', titulo: 'Producir y distribuir', resumen: 'Piezas valiosas', detalle: 'Coordinar con diseñadores y redactores o usar herramientas propias para generar piezas educativas, informativas o promocionales.' },
        { id: 'c4', titulo: 'Interactuar', resumen: 'Responder', detalle: 'Responder comentarios, mensajes y menciones, sosteniendo el tono de marca y promoviendo conversaciones de calidad.' },
        { id: 'c5', titulo: 'Gestionar la reputación', resumen: 'Crisis y trolls', detalle: 'Detectar posibles crisis, actuar con rapidez ante comentarios negativos y aplicar protocolos para trolls o situaciones complejas.' },
        { id: 'c6', titulo: 'Medir y analizar', resumen: 'KPI y reportes', detalle: 'Observar el rendimiento de las publicaciones, evaluar KPI y elaborar reportes para ajustar la estrategia.' },
      ],
      o: cap('9', '166-167'),
    },
    {
      t: 'comparar',
      titulo: 'Los «ojos y oídos» de la marca: doble monitoreo',
      a: { titulo: 'Hacia la comunidad', items: ['¿Qué se dice de nosotros?', '¿Quiénes son nuestros usuarios?', '¿Qué les interesa y qué les gusta?'] },
      b: { titulo: 'Hacia la competencia', items: ['¿Qué nos hace similares?', '¿Qué redes usan?', '¿Qué contenido publican?', '¿Qué fortalezas y fallas tienen?'] },
      o: cap('9', '167'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Dos premisas del mundo digital — con matiz',
      x: '«**Los errores no se perdonan**» y «**siempre hay que dar una respuesta**»: las marcas están expuestas públicamente y las audiencias reaccionan y opinan; cualquier error queda registrado. Pero el cuaderno matiza: una buena **gestión de crisis, honestidad y aprendizaje** puede convertir una falla en oportunidad de credibilidad; y no se trata solo de responder sino de dar respuestas **adecuadas, empáticas y oportunas**.',
      o: cap('9', '167'),
    },
    { t: 'h', x: 'Quienes consumen: del embudo a la red' },
    {
      t: 'p',
      x: 'La experiencia con las marcas ya no sigue un camino lineal: el recorrido es **dinámico, fragmentado y personalizado** con múltiples puntos de contacto simultáneos («es una red, no un embudo»). Google modeló el comportamiento con el **«lío del medio» (Messy Middle)**: un bucle entre **exploración** y **evaluación**. Boston Consulting Group (2025) propone los **4S**: *Streaming, Scrolling, Searching y Shopping*. El detalle de cada uno está en [[>l2-8|Decisión de compra y nuevo consumidor digital]].',
      o: cap('9', '167-169'),
    },
    {
      t: 'tabla',
      titulo: 'Qué implica cada «S» para quien gestiona contenido',
      cab: ['S', 'Qué hace la persona', 'Qué conviene hacer (según el cuaderno)'],
      filas: [
        ['Streaming', 'Consume contenido continuo y personalizado', 'Secuenciar bien los mensajes, contar historias relevantes y aprovechar la IA para personalizar'],
        ['Scrolling', 'Descubre sin intención de compra', 'Piezas con diseño atractivo, narrativa clara y persuasiva y personalización'],
        ['Searching', 'Busca con texto, imagen, voz o IA', 'Estar presente con respuestas relevantes, rápidas y adaptadas al contexto'],
        ['Shopping', 'Compra desde cualquier punto', 'Integrar oportunidades de compra en todos los puntos de contacto con ofertas personalizadas'],
      ],
      o: cap('9', '168-169'),
    },
    {
      t: 'clasificar',
      titulo: '¿Tarea del Community Manager?',
      categorias: ['Es parte de su rol', 'No es lo central de su rol'],
      items: [
        { x: 'Responder comentarios y mensajes con el tono de la marca', cat: 0, porque: 'Interactuar.' },
        { x: 'Definir la estrategia de precios de la empresa', cat: 1, porque: 'Corresponde al marketing mix/gestión, no al CM.' },
        { x: 'Aplicar un protocolo ante comentarios negativos o trolls', cat: 0, porque: 'Gestionar la reputación.' },
        { x: 'Elaborar reportes de KPI de las publicaciones', cat: 0, porque: 'Medir y analizar.' },
      ],
    },
  ],
  claves: ['community-manager', 'reputacion-online', 'messy-middle', '4s', 'troll'],
  preguntas: [
    mc('l52-q1', 'CM', 1, 'La función principal del Community Manager es:', [
      ['Solo publicar', 'Va mucho más allá.'],
      ['Ser el vínculo entre la organización y su comunidad online, gestionando todo el proceso', 'Correcto.'],
      ['Fijar precios', 'No es su función.'],
      ['Programar el sitio', 'No lo es.'],
    ], 1, cap('9', '166')),
    mc('l52-q2', 'Reputación', 2, 'Según el cuaderno, ante un error en redes lo más adecuado es…', [
      ['Ignorarlo', 'Los errores quedan registrados.'],
      ['Dar una respuesta adecuada, empática y oportuna y aprender de la situación', 'Correcto.'],
      ['Borrar los comentarios', 'No se recomienda.'],
      ['Esperar que se olvide', 'No se perdonan los errores.'],
    ], 1, cap('9', '167')),
    mc('l52-q3', '4S', 2, 'El «scrolleo» como el nuevo «mirar vidrieras» describe…', [
      ['Searching', 'Es búsqueda con intención.'],
      ['Scrolling', 'Correcto: descubrimiento sin intención directa de compra.'],
      ['Streaming', 'Consumo de contenido continuo.'],
      ['Shopping', 'Compra fluida.'],
    ], 1, cap('9', '169')),
    corta('l52-q4', 'CM', 3, 'Describí cómo un CM haría el doble monitoreo para una cafetería de barrio y qué decisiones tomaría con lo observado.', 'Hacia la comunidad: ver qué comentan y qué productos les interesan (ej. combos de desayuno). Hacia la competencia: relevar qué redes y contenidos usan otras cafeterías. Decisiones: ajustar el calendario de contenidos, reforzar lo que gusta y detectar oportunidades de diferenciación.', [
      'Distingue monitoreo a la comunidad y a la competencia',
      'Propone decisiones concretas',
    ], cap('9', '167')),
  ],
  tarjetas: [
    { id: 'l52-t1', f: 'Funciones del CM', b: 'Conocer la comunidad · planificar contenido · producir y distribuir · interactuar · gestionar la reputación · medir y analizar.' },
    { id: 'l52-t2', f: 'Doble monitoreo del CM', b: 'Hacia la comunidad (qué se dice, qué les interesa) y hacia la competencia (redes, contenidos, fortalezas y fallas).' },
    { id: 'l52-t3', f: 'Premisas del mundo digital', b: 'Los errores no se perdonan; siempre hay que dar una respuesta (adecuada, empática y oportuna).' },
  ],
  sintesis: ['El CM es mucho más que publicar: es el vínculo con la comunidad.', 'La reputación se gestiona con protocolos y empatía.', 'El recorrido del usuario es una red de puntos de contacto.'],
  conexiones: ['l5-1', 'l5-3', 'l2-8'],
  referencias: [cap('9', '166-169')],
}
