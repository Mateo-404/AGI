import { cap, corta, did, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l22: Leccion = {
  id: 'l2-2',
  unidad: 2,
  titulo: 'Marketing 5.0 e inteligencia artificial',
  resumen: 'Tecnología para la humanidad: dos disciplinas base, tres aplicaciones y el rol de la IA en el marketing.',
  minutos: 35,
  objetivos: [
    'Definir Marketing 5.0 y explicar sus dos disciplinas y tres aplicaciones.',
    'Diferenciar marketing predictivo, contextual y aumentado con ejemplos.',
    'Ubicar los usos de la IA en marketing y sus advertencias (sesgos, criterio humano).',
  ],
  previos: ['l2-1'],
  bloques: [
    {
      t: 'p',
      x: 'El Marketing 5.0 «se centra en la integración de la tecnología con la humanidad»: reconoce la importancia de la IA, el aprendizaje automático y otras tecnologías emergentes para mejorar la experiencia del cliente, **equilibrando la eficiencia tecnológica con la empatía** y la conexión humana. Sigue teniendo **en el centro al talento humano**.',
      o: cap('1', '20-21', 'Marketing 5.0: Orientado a la Humanidad'),
    },
    {
      t: 'explorable',
      titulo: 'Estructura del Marketing 5.0 (Kotler, Kartajaya y Setiawan, 2021)',
      variante: 'capas',
      nodos: [
        { id: 'datos', titulo: 'Base: Marketing basado en datos', resumen: 'Disciplina 1', detalle: 'Recopilar y analizar macrodatos de fuentes internas y externas y construir un **ecosistema de datos** para impulsar y optimizar decisiones. Debe iniciar con **objetivos concretos**, datos pertinentes y una plataforma conectada a herramientas de análisis; lo debe liderar marketing y no convertirse en una iniciativa solo tecnológica. El desafío: identificar los datos relevantes. (Big data: conjuntos tan grandes que las bases convencionales no pueden capturarlos, almacenarlos, gestionarlos ni analizarlos — Hashem et al., 2015.)' },
        { id: 'agil', titulo: 'Base: Marketing ágil', resumen: 'Disciplina 2', detalle: 'Equipos multifuncionales **descentralizados** para conceptualizar, diseñar, desarrollar y validar productos y campañas rápidamente. Los ciclos de vida se acortan y los modelos de planificación tradicionales ya no alcanzan: hace falta analítica en tiempo real y equipos ágiles.' },
        { id: 'pred', titulo: 'Aplicación: Marketing predictivo', resumen: 'Predecir antes de lanzar', detalle: 'Crear y usar análisis predictivos (a veces con aprendizaje automático) para **predecir resultados antes del lanzamiento**: estimar el valor de clientes potenciales, prever el rendimiento de productos y comprender sentimientos hacia la marca. Técnicas: regresión, filtrado colaborativo, redes neuronales. Requiere colaboración con estadísticos y científicos de datos.' },
        { id: 'ctx', titulo: 'Aplicación: Marketing contextual', resumen: 'Interacción en tiempo real según el contexto', detalle: 'Identificar y perfilar clientes y darles interacciones personalizadas con **sensores e interfaces digitales en el espacio físico** (IoT + IA). Permite marketing uno a uno en tiempo real. Una vez armado el ecosistema de sensores, se definen **desencadenantes y respuestas**.' },
        { id: 'aum', titulo: 'Aplicación: Marketing aumentado', resumen: 'Tecnología que mejora la productividad humana', detalle: 'Uso de tecnología que imita a los humanos (chatbots, asistentes virtuales) para mejorar la productividad de quienes atienden al cliente, combinando **velocidad y conveniencia digital con calidez y empatía humana**. Las interfaces sirven para consultas simples; las complejas requieren el toque humano: hay que dividir el trabajo entre máquinas y personas.' },
      ],
      o: cap('1', '21-24', 'fig. de Kotler, Marketing 5.0'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      x: 'La figura del cuaderno muestra datos y agilidad como **«marco»** y a las tres aplicaciones (predictivo, contextual y aumentado) superpuestas en el centro: las **aplicaciones se apoyan en las dos disciplinas**.',
      o: cap('1', '21', 'p. 24 (figura)'),
    },
    {
      t: 'clasificar',
      titulo: '¿Qué aplicación del Marketing 5.0 es?',
      categorias: ['Predictivo', 'Contextual', 'Aumentado'],
      items: [
        { x: 'Estimar con un modelo cuánto venderá un producto nuevo antes de lanzarlo', cat: 0, porque: 'Predice resultados antes del lanzamiento.' },
        { x: 'Una góndola con sensores que ofrece un cupón cuando una persona se detiene frente a un producto', cat: 1, porque: 'Sensores en el espacio físico, desencadenante → respuesta en tiempo real.' },
        { x: 'Un chatbot responde consultas simples y deriva a una persona las complejas', cat: 2, porque: 'Divide el trabajo entre tecnología y humanos.' },
      ],
    },
    { t: 'h', x: 'El rol de la inteligencia artificial en el marketing' },
    {
      t: 'p',
      x: 'La IA desarrolló la capacidad de **imitar funciones cognitivas humanas**, sobre todo analizando grandes volúmenes de datos y generando predicciones. En marketing, permite **analizar datos de clientes para descubrir patrones de comportamiento** y también es clave para el desarrollo de contenidos y el soporte creativo (Cap. 1, p. 33). Aplicaciones destacadas en el cuaderno:',
      o: cap('1', '33-34'),
    },
    {
      t: 'tabla',
      cab: ['Aplicación de la IA', 'Dónde aparece en el cuaderno'],
      filas: [
        ['Experiencias personalizadas → marketing «de segmentos de uno» / «uno a uno» (Peppers y Rogers, 1990s)', 'Cap. 1, p. 33-34'],
        ['Predecir rendimiento de productos, optimizar campañas y anticipar demandas (aprendizaje automático)', 'Cap. 1, p. 34'],
        ['Motores de recomendación (Amazon, Netflix, YouTube): relacionan productos y fomentan ventas adicionales o cruzadas', 'Cap. 1, p. 34'],
        ['Redactar y evaluar objetivos SMART con prompts; segmentar audiencias; «limpiar» bases de datos; sugerir contenido; analizar resultados', 'Cap. 6, pp. 111-118'],
        ['Segmentación de campañas digitales (podcast de D. Rincón) y herramientas como Semrush con IA', 'Cap. 4 p. 87; Cap. 6 p. 112'],
        ['Personalización y secuenciación de contenidos en streaming y scrolling (4S)', 'Cap. 9, pp. 168-169'],
      ],
      o: cap('1', '33-34', 'y capítulos citados'),
    },
    {
      t: 'callout',
      tipo: 'ia',
      titulo: 'Advertencias del cuaderno sobre usar IA',
      x: '**(1)** «La inteligencia artificial produce contenido propio pero eso no significa que sea correcto» (Cap. 2, p. 40): validá siempre sus respuestas. **(2)** Dilemas éticos: ¿qué tan auténtico es el contenido generado? ¿qué pasa si los datos tienen **sesgos**? El cuaderno pide un marketing «más humano» donde la tecnología potencia la creatividad sin reemplazar la mirada crítica (Cap. 6, p. 124-125). **(3)** Privacidad y uso responsable de datos (Cap. 6, p. 124).',
      o: cap('2', '40', 'y Cap. 6 pp. 124-125'),
    },
    {
      t: 'ejemplo',
      titulo: 'Clasificar un caso en el marco 5.0',
      pasos: [
        'Caso (didáctico): una cadena de cafeterías analiza datos de ventas y clima para estimar la demanda de la próxima semana.',
        'Disciplina base: **marketing basado en datos** (datos internos + externos para decidir).',
        'Aplicación: **predictivo** (anticipa demanda antes de actuar).',
        'Si además un barista con tablet ve el perfil del cliente y sugiere un producto, se suma **marketing aumentado**: tecnología que potencia a la persona de primera línea.',
        'Control humano: el equipo valida la predicción y revisa posibles sesgos antes de decidir.',
      ],
      o: did,
    },
  ],
  claves: ['marketing-5-0', 'marketing-datos', 'marketing-agil', 'marketing-predictivo', 'marketing-contextual', 'marketing-aumentado', 'big-data', 'ia'],
  preguntas: [
    mc('l22-q1', 'Marketing 5.0', 1, 'Según el cuaderno, ¿cuáles son las dos disciplinas sobre las que se apoyan las aplicaciones del Marketing 5.0?', [
      ['Predictivo y aumentado', 'Son aplicaciones, no disciplinas base.'],
      ['Basado en datos y ágil', 'Correcto.'],
      ['Contextual y ágil', 'El contextual es una aplicación.'],
      ['Inbound y outbound', 'Son estrategias de otra unidad (Cap. 3).'],
    ], 1, cap('1', '21')),
    mc('l22-q2', 'Aplicaciones', 2, 'Un negocio usa sensores y reglas «si pasa X, enviar Y» para ofrecer contenido en tiempo real a quien está en el local. ¿Qué aplicación es?', [
      ['Marketing predictivo', 'Predice antes del lanzamiento; no actúa en el contexto en vivo.'],
      ['Marketing contextual', 'Correcto: sensores e interfaces en el espacio físico con desencadenantes y respuestas.'],
      ['Marketing aumentado', 'Se centra en potenciar a personas con chatbots/asistentes.'],
      ['Marketing 1.0', 'Orientado al producto, sin personalización en tiempo real.'],
    ], 1, cap('1', '22')),
    mc('l22-q3', 'IA', 2, '¿Cuál de estas afirmaciones es coherente con las advertencias del cuaderno sobre IA?', [
      ['El contenido generado por IA siempre es correcto', 'El cuaderno dice lo contrario.'],
      ['Hay que validar lo que produce y considerar sesgos y privacidad', 'Correcto.'],
      ['La IA reemplaza completamente la mirada crítica', 'Se pide que no la reemplace.'],
      ['La IA no se puede usar con datos de clientes', 'Se usa, con uso responsable de datos.'],
    ], 1, cap('2', '40')),
    mc('l22-q4', 'Aumentado vs. predictivo', 3, '¿Qué diferencia principal hay entre marketing predictivo y marketing aumentado?', [
      ['El predictivo estima resultados antes del lanzamiento; el aumentado potencia con tecnología el trabajo humano de cara al cliente', 'Correcto.'],
      ['No hay diferencia: son sinónimos', 'Son dos aplicaciones distintas.'],
      ['El predictivo usa sensores; el aumentado usa regresión', 'Están invertidas: el contextual usa sensores y el predictivo regresión.'],
      ['El aumentado solo existe en B2B', 'No hay tal limitación.'],
    ], 0, cap('1', '23-24')),
    corta('l22-q5', 'IA en marketing', 3, 'Proponé un uso de IA en una pyme y señalá una precaución que el cuaderno recomendaría.', 'Ej.: usar IA para segmentar la base de clientes y redactar variantes de asunto de email. Precauciones: validar lo que produce (puede ser incorrecto), cuidar sesgos en los datos y respetar privacidad/consentimiento; la IA potencia el criterio profesional, no lo reemplaza.', [
      'Propone un uso concreto y plausible',
      'Menciona validación/sesgos/privacidad',
      'Explicita el rol humano',
    ], cap('6', '124-125')),
  ],
  tarjetas: [
    { id: 'l22-t1', f: 'Estructura del Marketing 5.0', b: 'Dos disciplinas (basado en datos, ágil) y tres aplicaciones (predictivo, contextual, aumentado).' },
    { id: 'l22-t2', f: 'Marketing predictivo', b: 'Análisis predictivos (a veces con ML) para predecir resultados antes del lanzamiento.' },
    { id: 'l22-t3', f: 'Marketing contextual', b: 'Sensores e interfaces digitales en el espacio físico para interacciones personalizadas en tiempo real (IoT + IA).' },
    { id: 'l22-t4', f: 'Marketing aumentado', b: 'Tecnología (chatbots, asistentes) que potencia a quien atiende al cliente: velocidad digital + calidez humana.' },
    { id: 'l22-t5', f: 'Advertencias de la IA', b: 'Puede producir contenido incorrecto, tener sesgos y afectar privacidad: exige criterio humano.' },
  ],
  sintesis: ['5.0 = tecnología al servicio de las personas, con el talento humano al centro.', 'Datos y agilidad sostienen predictivo, contextual y aumentado.', 'La IA es un hilo transversal: se retoma en segmentación, email, contenidos y redes.'],
  conexiones: ['l2-1', 'l7-2', 'l5-1'],
  referencias: [cap('1', '20-24'), cap('1', '33-34'), cap('2', '39-40'), cap('6', '124-125')],
}
