import { cap, corta, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l72: Leccion = {
  id: 'l7-2',
  unidad: 7,
  titulo: 'Email: diseño, medición, B2B y chat',
  resumen: 'Diseño efectivo de la pieza, A/B testing, indicadores, consideraciones B2B, desafíos actuales y WhatsApp como canal.',
  minutos: 30,
  objetivos: [
    'Diseñar una pieza aplicando las buenas prácticas de contenido, asunto y CTA.',
    'Planificar un A/B test válido e interpretar tasa de apertura, CTR y conversión.',
    'Adaptar la campaña al B2B y evaluar desafíos éticos y de sostenibilidad.',
  ],
  previos: ['l7-1'],
  bloques: [
    { t: 'h', x: 'Diseño efectivo de la pieza (paso 5)' },
    {
      t: 'explorable',
      titulo: 'Buenas prácticas de diseño',
      variante: 'pasos',
      nodos: [
        { id: 'c', titulo: 'Contenido', resumen: 'Breve, coherente, sin tono agresivo', detalle: 'Texto **breve y directo** (demasiado contenido genera desinterés o marcación como spam); evitar expresiones de publicidad agresiva como «oferta» o «ahora», que pueden activar filtros antispam; tono y estilo coherentes con la voz y la imagen de la marca.' },
        { id: 'a', titulo: 'Asunto', resumen: 'No en forma de pregunta; personalizar', detalle: 'Se recomienda **evitar la forma de pregunta** (puede disminuir la tasa de apertura) y **personalizarlo** con el nombre u otra información relevante, lo que exige una base de datos bien estructurada.' },
        { id: 'cta', titulo: 'Llamado a la acción', resumen: 'Una acción principal', detalle: '**CTA claro y directo.** No hay fórmula única: hacer pruebas A/B para hallar el texto más efectivo. Aunque el diseño incluya varios llamados visuales, **la campaña debe enfocarse en una única acción principal** para no diluir el mensaje.' },
      ],
      o: cap('6', '114-115'),
    },
    {
      t: 'callout',
      tipo: 'ia',
      x: 'La IA puede ayudar a **crear o sugerir texto** persuasivo, **validar y optimizar el diseño**; muchas herramientas de email incorporan IA para el **envío programado** y la **segmentación o filtrado inteligente** de bases.',
      o: cap('6', '115'),
    },
    { t: 'h', x: 'Medición y mejora (paso 6)' },
    {
      t: 'def',
      termino: 'A/B testing',
      x: 'Técnica que compara **dos versiones** de un mismo correo para identificar cuál obtiene mejores resultados. Puede aplicarse a: el asunto; el llamado a la acción (CTA); las imágenes o la disposición del contenido; la longitud o el estilo del texto. Para que sea efectivo hay que **definir el objetivo del testeo y la variable a evaluar**, y «solo se puede testear una cosa a la vez».',
      o: cap('6', '115-116'),
    },
    {
      t: 'tabla',
      titulo: 'Indicadores de una campaña de email',
      cab: ['Indicador', 'Qué mide', 'Etapa del embudo'],
      filas: [
        ['**Tasa de apertura (open rate)**', 'Porcentaje de destinatarios que abren el correo', '1.ª / apertura'],
        ['**Tasa de clics (CTR)**', 'Cuántos usuarios hicieron clic en algún enlace (hacia el sitio o la tienda)', '3.ª / reacción'],
        ['**Tasa de conversión**', 'Cuántas personas realizaron la acción deseada (compra, registro, descarga)', '4.ª / conversión'],
      ],
      o: cap('6', '116'),
    },
    {
      t: 'p',
      x: 'Medir y analizar permite **optimizar el presupuesto, mejorar conversiones y aumentar el ROI**. La medición «no es un fin en sí mismo» sino una herramienta para **aprender, ajustar y escalar** (mejora continua; metodologías ágiles en Gestión Estratégica). La IA puede procesar grandes volúmenes de datos, detectar patrones, sugerir ajustes con análisis predictivos y validar hipótesis mediante simulaciones.',
      o: cap('6', '115-116'),
    },
    {
      t: 'ejemplo',
      titulo: 'Un A/B test bien planteado (didáctico)',
      pasos: [
        '**Objetivo del test:** aumentar la tasa de apertura de un newsletter de una cafetería.',
        '**Única variable:** el asunto. Versión A: «Tu combo de la semana». Versión B: «Mauro, tu combo de la semana está listo» (personalizado, sin forma de pregunta).',
        '**Se mantiene todo lo demás igual:** día, hora, contenido y segmento.',
        '**Decisión:** se envía la ganadora al resto de la base y se registra el aprendizaje.',
        'Si además se cambiara el CTA, no se sabría cuál de los dos cambios produjo la diferencia.',
      ],
    },
    { t: 'h', x: 'Email B2B' },
    {
      t: 'comparar',
      titulo: 'B2B vs. B2C en email',
      a: { titulo: 'B2B', items: ['Racionalidad y procesos de decisión **más largos**', 'Pieza con contenido **detallado** de la empresa y características del producto/servicio', 'Destacar el mercado en el que vende', 'Valor agregado: reportes del sector, informes, artículos especializados, estudios de caso'] },
      b: { titulo: 'B2C', items: ['Busca **conexiones emocionales**', 'Respuestas más inmediatas'] },
      o: cap('6', '124'),
    },
    { t: 'h', x: 'Desafíos y limitaciones hoy' },
    {
      t: 'explorable',
      titulo: 'Cuatro desafíos del email marketing actual',
      variante: 'pasos',
      nodos: [
        { id: 'd1', titulo: 'Saturación y pérdida de atención', resumen: 'Más de lo mismo', detalle: 'La sobrecarga de notificaciones y correos hace que los mails pasen desapercibidos. Se responde con propuesta de valor clara y empática, creatividad, segmentación y respeto por el tiempo del usuario.' },
        { id: 'd2', titulo: 'Privacidad y uso responsable de datos', resumen: 'Ética y confianza', detalle: 'Se apoya en datos personales: cumplir normativas de protección y construir relaciones de confianza; no solo pedir permisos sino usarlos de manera coherente y transparente.' },
        { id: 'd3', titulo: 'IA y dilemas éticos', resumen: 'Autenticidad y sesgos', detalle: '¿Qué tan auténtico es el contenido generado por un algoritmo? ¿Qué pasa si los datos de entrenamiento tienen sesgos? Un marketing más humano: la tecnología potencia la creatividad sin reemplazar el criterio profesional.' },
        { id: 'd4', titulo: 'Sostenibilidad digital', resumen: 'Impacto ambiental', detalle: 'Cada correo implica servidores, almacenamiento y energía: reducir envíos innecesarios, limpiar bases obsoletas y comunicar con más conciencia en cantidad y calidad.' },
      ],
      o: cap('6', '124-125'),
    },
    {
      t: 'p',
      x: '**Herramientas** con pruebas gratuitas para practicar: **Mailchimp, Envialosimple y Brevo**.',
      o: cap('6', '125'),
    },
    { t: 'h', x: 'Del correo al chat: WhatsApp' },
    {
      t: 'p',
      x: 'WhatsApp pasó a ser un **canal directo y personalizado**; en algunos segmentos (jóvenes, entornos de alta inmediatez) ocupa el lugar del email: informar, fidelizar, ofrecer productos o acompañar procesos. Diferencias: el correo se percibe **más formal**; el chat ofrece **cercanía, inmediatez y diálogo**, lo que exige mensajes **breves, visuales y conversacionales** sin perder claridad ni coherencia institucional. Con **WhatsApp Business** y las **API de automatización** se pueden programar respuestas, segmentar audiencias y enviar mensajes masivos similares a una campaña de email. Desafíos: **no saturar, respetar horarios, cuidar la privacidad y evitar que sea invasivo** (el cuaderno cita los grupos de AGI y CCC AGI).',
      o: cap('6', '125-126'),
    },
  ],
  claves: ['ab-testing', 'cta', 'tasa-apertura', 'ctr', 'tasa-conversion', 'roi', 'whatsapp-business', 'sostenibilidad-digital', 'email-b2b'],
  preguntas: [
    mc('l72-q1', 'Diseño', 1, 'Una buena práctica para el asunto del email es…', [
      ['Redactarlo como pregunta', 'Puede disminuir la tasa de apertura.'],
      ['Personalizarlo y evitar la forma de pregunta', 'Correcto.'],
      ['Usar «oferta ahora» siempre', 'Puede activar filtros antispam.'],
      ['Dejarlo vacío', 'No es recomendable.'],
    ], 1, cap('6', '114')),
    mc('l72-q2', 'A/B', 2, 'Para que un A/B test sea válido hay que…', [
      ['Cambiar asunto, imagen y CTA a la vez', 'No se sabría qué causó la diferencia.'],
      ['Testear una sola variable definida', 'Correcto.'],
      ['Enviar solo a una persona', 'No sería concluyente.'],
      ['No definir objetivo', 'El objetivo es requisito.'],
    ], 1, cap('6', '116')),
    mc('l72-q3', 'B2B', 2, 'El email B2B se caracteriza respecto del B2C por…', [
      ['Apelar casi solo a emociones', 'Eso describe el B2C.'],
      ['Mayor racionalidad, decisiones más largas y contenido detallado', 'Correcto.'],
      ['No incluir información de la empresa', 'Debe incluirla.'],
      ['No usar métricas', 'Se usan.'],
    ], 1, cap('6', '124')),
    mc('l72-q4', 'CTA', 2, '¿Cuántas acciones principales debe tener una campaña, aunque el diseño tenga varios llamados visuales?', [
      ['Una', 'Correcto.'],
      ['Tres', 'No es lo que dice el cuaderno.'],
      ['Ninguna', 'Necesita una.'],
      ['Tantas como enlaces', 'Diluye el impacto.'],
    ], 0, cap('6', '115')),
    mc('l72-q5', 'Desafíos', 3, 'Limpiar bases obsoletas y reducir envíos innecesarios responde al desafío de…', [
      ['IA y sesgos', 'Se refiere a autenticidad y sesgos.'],
      ['Sostenibilidad digital', 'Correcto.'],
      ['Privacidad', 'Se refiere al uso de datos personales.'],
      ['Saturación', 'Se relaciona, pero este desafío apunta al impacto ambiental.'],
    ], 1, cap('6', '125')),
    corta('l72-q6', 'WhatsApp', 3, 'Compará email y WhatsApp para comunicar novedades a clientes y mencioná un desafío del chat.', 'El email es más formal y permite piezas más completas; WhatsApp ofrece cercanía, inmediatez y diálogo con mensajes breves y conversacionales. Desafíos: no saturar, respetar horarios, cuidar la privacidad y evitar la invasión.', [
      'Contrasta formalidad vs. cercanía/inmediatez',
      'Menciona un desafío del chat',
    ], cap('6', '125-126')),
  ],
  tarjetas: [
    { id: 'l72-t1', f: 'Asunto efectivo', b: 'Personalizado y no en forma de pregunta.' },
    { id: 'l72-t2', f: 'A/B testing', b: 'Comparar dos versiones testeando una sola variable con objetivo definido.' },
    { id: 'l72-t3', f: 'Indicadores del email', b: 'Tasa de apertura (etapa 1), CTR (etapa 3) y tasa de conversión (etapa 4).' },
    { id: 'l72-t4', f: 'Cuatro desafíos actuales', b: 'Saturación y atención, privacidad, IA y dilemas éticos, sostenibilidad digital.' },
    { id: 'l72-t5', f: 'WhatsApp vs. email', b: 'WhatsApp: cercano, inmediato, conversacional; email: más formal. Desafíos: no saturar, horarios, privacidad.' },
  ],
  sintesis: ['Una pieza, una acción principal.', 'Se mide, se testea una variable y se mejora.', 'Ética, privacidad y sostenibilidad forman parte de la estrategia.'],
  conexiones: ['l7-1', 'l4-3', 'l2-2'],
  referencias: [cap('6', '114-126')],
}
