import { amp, cap, corta, did, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l51: Leccion = {
  id: 'l5-1',
  unidad: 5,
  titulo: 'Planificación en redes y marketing de contenidos',
  resumen: 'Cinco aspectos para planificar la presencia en redes y tres etapas para crear contenido; AIDA, SCQA y Círculo de oro.',
  minutos: 35,
  objetivos: [
    'Definir red social y explicar por qué lo estratégico es priorizar un conjunto de redes.',
    'Aplicar los cinco aspectos de planificación y las tres etapas del marketing de contenidos.',
    'Elegir entre AIDA, SCQA y Círculo de oro según el propósito.',
  ],
  previos: ['l3-4'],
  bloques: [
    {
      t: 'p',
      x: 'Una **red social**, tradicionalmente, es un conjunto de personas conectadas por vínculos (comerciales, de amistad, laborales, familiares). Con las redes digitales esos vínculos se trasladaron a sitios web conformados por comunidades con intereses comunes. Antes, los sitios ofrecían **comunicación unidireccional**; hoy otorgan protagonismo a las personas usuarias y facilitan la **bidireccionalidad** y el intercambio de fotos, videos y comentarios.',
      o: cap('9', '162'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Decisión del cuaderno sobre las plataformas',
      x: 'Dada la constante evolución, «analizar cada red social de manera individual no resulta relevante a largo plazo»: **las plataformas pueden desaparecer, transformarse o ser reemplazadas**. Lo estratégico es **definir qué conjunto de redes merece prioridad** según objetivos, recursos y público. Por eso este curso no describe plataforma por plataforma (tema del programa «plataformas de redes sociales»: cubierto parcialmente).',
      o: cap('9', '162'),
    },
    {
      t: 'explorable',
      titulo: 'Cinco aspectos clave para planificar la presencia en redes',
      variante: 'pasos',
      nodos: [
        { id: 'a1', titulo: '1. Estudiar cada red', resumen: 'Funcionamiento y costos', detalle: 'Conocer funcionamiento, alcance, limitaciones y usos posibles; valores económicos (costos de publicidad, alcance orgánico vs. pago) y el conocimiento técnico necesario.' },
        { id: 'a2', titulo: '2. Conocer al público', resumen: 'Hábitos online', detalle: 'Necesidades, deseos y demandas; segmentación; ¿cuáles son sus hábitos online?, ¿en qué redes están y cómo las usan?; intereses de los buyer persona.' },
        { id: 'a3', titulo: '3. Analizar la competencia', resumen: 'Presencia y desempeño', detalle: 'Identificar buenas prácticas, errores a evitar y oportunidades para una ventaja competitiva sostenible.' },
        { id: 'a4', titulo: '4. Evaluar recursos internos', resumen: 'Capacidades', detalle: 'Habilidades del equipo y logística para sostener una presencia activa y profesional, alineada con la estrategia general.' },
        { id: 'a5', titulo: '5. Definir el contenido', resumen: 'Estrategia de contenidos', detalle: 'Contenido = piezas o recursos comunicacionales (video, imagen, webinar, audio, texto) para informar, entretener, educar o generar valor en la comunidad.' },
      ],
      o: cap('9', '162-163'),
    },
    {
      t: 'def',
      termino: 'Marketing de contenidos',
      x: 'Crear y distribuir contenido **de manera estratégica** con el fin de alcanzar los objetivos de la organización. «Crear contenido» puede ser: imágenes, videos, carruseles e historias; emails masivos (newsletters o automatizaciones); recursos gratuitos como ebooks; clases o webinars grabados; posts de blog.',
      o: cap('9', '163'),
    },
    {
      t: 'explorable',
      titulo: 'Tres etapas para planificar la creación de contenidos',
      variante: 'pasos',
      nodos: [
        { id: 'et1', titulo: 'Etapa 1: conocer al público', resumen: 'Intereses, dudas, necesidades, puntos de dolor', detalle: 'Qué interesa conocer: **intereses** respecto del negocio, **dudas frecuentes**, **necesidades** que se puedan satisfacer, **puntos de dolor o satisfacción**. Recursos: foros, estudio de competencia, grupos de redes sociales, opiniones de clientes (Brand24, comentarios, stickers de preguntas y encuestas) y tendencias (Google Trends, Google Analytics, Gemini Deep Research).' },
        { id: 'et2', titulo: 'Etapa 2: definir objetivos', resumen: 'Según el embudo', detalle: 'Objetivos según las etapas del embudo: **verbo / acción + objeto + medida + plazo**. Ej.: «Aumentar las visitas a la web y redes sociales en un 40 % en 6 meses». Todavía no hay piezas, pero ya se sabe qué se necesita lograr.' },
        { id: 'et3', titulo: 'Etapa 3: diseñar el contenido', resumen: 'Estructuras narrativas', detalle: 'Se eligen estructuras para construir y comunicar: AIDA, SCQA o Círculo de oro (ver tabla). Luego se crean las piezas y se distribuyen por distintos canales.' },
      ],
      o: cap('9', '163-165'),
    },
    {
      t: 'tabla',
      titulo: 'Tabla 16: modelos para la construcción de contenido',
      cab: ['', 'AIDA', 'SCQA', 'Círculo de oro'],
      filas: [
        ['**Qué es**', 'Modelo clásico de marketing y publicidad para redactar textos persuasivos (emails, publicidades, landing pages). Lo enunció Elias St. Elmo Lewis en 1898 con tres etapas y luego sumó la acción; lo difundió, entre otros, Kotler (2011)', 'Técnica narrativa de Minto (2010), *El principio de la pirámide* (McKinsey), para comunicar ideas de forma clara y lógica: informes, presentaciones, textos ejecutivos', 'Modelo de Simon Sinek (2009): organiza la comunicación desde el porqué hacia el cómo y el qué'],
        ['**Significa**', '**Attention** (captar con algo llamativo) · **Interest** (mostrar algo que le importe) · **Desire** (generar ganas) · **Action** (invitar a actuar: comprar, inscribirse, comentar)', '**Situation** (contexto actual) · **Complication** (problema o giro que genera tensión) · **Question** (lo que hay que resolver) · **Answer** (la solución o propuesta)', '**Why** (¿por qué lo hacés?: propósito) · **How** (¿cómo?: proceso o valores diferenciadores) · **What** (¿qué hacés?: lo que ofrecés)'],
        ['**Cuándo usarlo**', 'Para convencer o vender', 'Para exponer con lógica', 'Para inspirar o alinear equipos'],
      ],
      o: cap('9', '165-166'),
    },
    {
      t: 'ejemplo',
      titulo: 'Un mismo mensaje con AIDA (ejemplo didáctico)',
      pasos: [
        '**Atención:** «¿Llegaste tarde otra vez sin desayunar?» (con foto de un combo).',
        '**Interés:** «Combo desayuno para llevar: café + medialunas, listo en 3 minutos.»',
        '**Deseo:** testimonios y foto real del producto recién hecho.',
        '**Acción:** «Pedilo hoy por WhatsApp antes de las 10 y retiralo sin espera.»',
      ],
      o: did,
    },
    {
      t: 'callout',
      tipo: 'ampliacion',
      titulo: 'Storytelling (tema del programa)',
      x: 'El término *storytelling* **no aparece** en el cuaderno (el programa cita a Salas, 2017). Lo más cercano son las estructuras narrativas de la tabla 16. **Síntesis didáctica (sin fuente externa verificada):** contar una historia con personajes, conflicto y resolución para que el mensaje sea más memorable; SCQA y el Círculo de oro pueden verse como esqueletos narrativos. Requiere la lectura de Salas (2017).',
      o: amp('cpl'),
    },
    {
      t: 'callout',
      tipo: 'ia',
      x: 'En contenidos la IA sirve para **brainstorming y creación** (entrevista a Flavia Simon, Gemini, en los Factos), personalización de piezas en streaming y scrolling, y búsqueda de tendencias (Gemini Deep Research). Pregunta del cuaderno: ¿cómo usar IA en términos creativos para construir contenido?',
      o: cap('9', '164-173'),
    },
    {
      t: 'asociar',
      titulo: 'Asociá cada letra o elemento con su modelo',
      pares: [
        ['Attention – Interest – Desire – Action', 'AIDA'],
        ['Situation – Complication – Question – Answer', 'SCQA'],
        ['Why – How – What', 'Círculo de oro'],
      ],
    },
  ],
  claves: ['red-social', 'marketing-contenidos', 'aida', 'scqa', 'circulo-de-oro', 'storytelling', 'contenido'],
  preguntas: [
    mc('l51-q1', 'Planificación', 1, '¿Por qué el cuaderno no analiza cada red social individualmente?', [
      ['Porque no son importantes', 'Lo son; lo que cambia es su permanencia.'],
      ['Porque las plataformas pueden desaparecer, transformarse o ser reemplazadas; lo estratégico es priorizar un conjunto', 'Correcto.'],
      ['Porque son todas iguales', 'No se afirma.'],
      ['Porque están prohibidas', 'No.'],
    ], 1, cap('9', '162')),
    mc('l51-q2', 'Contenido', 2, 'La Etapa 1 del marketing de contenidos consiste en…', [
      ['Publicar el contenido', 'Es posterior.'],
      ['Conocer al público: intereses, dudas, necesidades y puntos de dolor', 'Correcto.'],
      ['Fijar el presupuesto', 'No es la etapa 1.'],
      ['Medir resultados', 'Es posterior.'],
    ], 1, cap('9', '164')),
    mc('l51-q3', 'Modelos', 2, 'Para redactar un email persuasivo de venta resulta más adecuado:', [
      ['AIDA', 'Correcto: para convencer o vender.'],
      ['SCQA', 'Es para exponer con lógica.'],
      ['Círculo de oro', 'Es para inspirar o alinear equipos.'],
      ['Ninguno', 'Sí hay uno apropiado.'],
    ], 0, cap('9', '165')),
    mc('l51-q4', 'Objetivos', 3, 'Elegí el objetivo que respeta el patrón del cuaderno:', [
      ['Mejorar el engagement', 'Falta medida y plazo.'],
      ['Aumentar el alcance de las publicaciones en un 30 % en 4 meses', 'Correcto: verbo + objeto + medida + plazo.'],
      ['Ser reconocidos', 'Es difuso.'],
      ['Subir más historias', 'No hay medida ni plazo.'],
    ], 1, cap('9', '164')),
    corta('l51-q5', 'Contenido', 3, 'Elegí un negocio, definí un objetivo con el patrón del cuaderno y proponé una pieza de contenido estructurada con un modelo (AIDA, SCQA o Círculo de oro).', 'Ej.: «Aumentar un 40 % las consultas por Instagram en 3 meses». Pieza con AIDA: gancho llamativo, beneficio, prueba social y CTA para escribir por mensaje. Se justifica AIDA porque el fin es convencer.', [
      'Objetivo con verbo, objeto, medida y plazo',
      'Pieza coherente con el modelo elegido',
      'Justifica la elección del modelo',
    ], cap('9', '164-166')),
  ],
  tarjetas: [
    { id: 'l51-t1', f: 'Cinco aspectos para planificar redes', b: 'Estudiar cada red · conocer al público · analizar a la competencia · evaluar recursos internos · definir el contenido.' },
    { id: 'l51-t2', f: 'Tres etapas del marketing de contenidos', b: 'Conocer al público · definir objetivos · diseñar el contenido.' },
    { id: 'l51-t3', f: 'AIDA', b: 'Attention, Interest, Desire, Action: para convencer o vender.' },
    { id: 'l51-t4', f: 'SCQA', b: 'Situation, Complication, Question, Answer: para exponer con lógica.' },
    { id: 'l51-t5', f: 'Marketing de contenidos', b: 'Crear y distribuir contenido de manera estratégica para alcanzar los objetivos de la organización.' },
  ],
  sintesis: ['Se prioriza un conjunto de redes según objetivos, recursos y público.', 'El contenido se planifica: público → objetivos → diseño.', 'AIDA, SCQA y Círculo de oro cumplen propósitos distintos.'],
  conexiones: ['l5-2', 'l5-3', 'l1-3'],
  referencias: [cap('9', '161-166')],
}
