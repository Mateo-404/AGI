/** Contenido de la guía de repaso (se renderiza a Markdown y PDF en scripts/materiales.tsx). */
export interface Integradora { n: number; pregunta: string; pista: string; lecciones: string[] }

export const relaciones: { de: string; con: string; relacion: string }[] = [
  { de: 'U1 Valor y necesidades', con: 'U3 Segmentación y plan', relacion: 'La propuesta de valor se dirige a un segmento; entender necesidades es el paso 1 del proceso y la base del diagnóstico del plan.' },
  { de: 'U1 Estrategia/táctica', con: 'U3 Plan de marketing', relacion: 'El plan articula lo estratégico (análisis, objetivos) con lo operativo (mix y acciones).' },
  { de: 'U2 Evolución 1.0–5.0', con: 'U5, U7 y todos los capítulos con IA', relacion: 'Marketing 4.0 trae omnicanalidad y datos; 5.0 trae predicción, contexto y aumento con IA.' },
  { de: 'U2 4P y 4P digitales', con: 'U6 E-commerce y U4–U5 promoción', relacion: 'Plaza se vuelve digital (tienda, marketplace); promoción se despliega en SEO/SEM, redes y email.' },
  { de: 'U2 Consumidor', con: 'U3 Journey/embudo', relacion: 'Las 5 fases de decisión alimentan las etapas del journey; Messy Middle y 4S cuestionan la linealidad.' },
  { de: 'U3 Objetivos y KPI', con: 'U4 métricas, U7 indicadores', relacion: 'Los objetivos SMART se verifican con CTR, CPC, conversión, apertura y ROI.' },
  { de: 'U3 Buyer persona/journey', con: 'U5 contenidos y U7 email', relacion: 'El contenido y las secuencias de email se diseñan por etapa del embudo y por segmento.' },
  { de: 'U4 SEO/SEM', con: 'U6 UX y tienda', relacion: 'De nada sirve tráfico a una tienda lenta o confusa; velocidad, responsive y UX son SEO y conversión a la vez.' },
  { de: 'U5 Redes (Ads)', con: 'U4 SEM', relacion: 'Comparten lógica: objetivo, presupuesto, segmentación, creatividad y optimización; difieren en la intención del usuario.' },
  { de: 'U7 Email', con: 'U2 Marketing directo/omnicanalidad', relacion: 'Es marketing directo digital; se integra con otros canales (incluido WhatsApp).' },
]

export const integradoras: Integradora[] = [
  { n: 1, pregunta: 'Una panadería artesanal quiere crecer online. Planteá su propuesta de valor, el segmento prioritario y justificá con las 4 normas de segmentación.', pista: 'Usar propuesta de valor (5 características), segmentación (4 normas, bases) y capacidades de la organización.', lecciones: ['l1-2', 'l3-3'] },
  { n: 2, pregunta: 'Explicá por qué marketing digital puede verse como mirada ampliada o como un canal más, y qué cambia concretamente según el cuaderno.', pista: 'Retroalimentación en tiempo real, contenido de valor, omnicanalidad, 4.0.', lecciones: ['l1-1', 'l2-1'] },
  { n: 3, pregunta: 'Armá un plan de marketing digital en las 4 etapas para un negocio local, con un objetivo SMART y dos KPI.', pista: 'Análisis de situación, público, objetivos con verbo+objeto+medida+plazo, estrategia con mix.', lecciones: ['l3-1', 'l3-2', 'l3-6'] },
  { n: 4, pregunta: 'Compará el uso de las 5 fuerzas de Porter en el análisis de la competencia y en la selección de segmentos.', pista: 'Mismo modelo, distinto objetivo.', lecciones: ['l3-2', 'l3-3'] },
  { n: 5, pregunta: 'Describí el recorrido de un cliente (journey) y proponé una acción por etapa del embudo, indicando qué es inbound y qué es outbound.', pista: 'Siete pasos del journey; fases del lead; contenido de valor vs. insistencia.', lecciones: ['l3-4'] },
  { n: 6, pregunta: '¿En qué se diferencian SEO y SEM? Elegí cuál priorizarías para un negocio nuevo con poco presupuesto y para uno con un lanzamiento esta semana.', pista: 'Orgánico vs. pago; inmediatez; subasta; calidad del anuncio.', lecciones: ['l4-1', 'l4-2'] },
  { n: 7, pregunta: 'Con 400.000 impresiones, 8.000 clics, 160 conversiones y $200.000 de costo, calculá CTR, CPC, tasa de conversión y costo por conversión y proponé una acción de mejora.', pista: 'Fórmulas de la Tabla 15; diagnóstico entre anuncio y página de destino.', lecciones: ['l4-3'] },
  { n: 8, pregunta: 'Diseñá la planificación de redes de un emprendimiento: 5 aspectos, 3 etapas del contenido y un modelo (AIDA/SCQA/Círculo de oro) justificado.', pista: 'Conocer al público, objetivos, diseño; elegir por propósito.', lecciones: ['l5-1'] },
  { n: 9, pregunta: '¿Qué funciones cumple un Community Manager y cómo gestionaría una crisis de reputación?', pista: 'Doble monitoreo; respuestas adecuadas, empáticas y oportunas.', lecciones: ['l5-2'] },
  { n: 10, pregunta: 'Una marca nueva duda entre marketplace y tienda propia. Argumentá con ventajas y desventajas y proponé una combinación.', pista: 'Visibilidad vs. control de marca; comisiones; datos del cliente.', lecciones: ['l6-2'] },
  { n: 11, pregunta: 'Armá una campaña de email completa (6 pasos) para reactivar clientes inactivos, cuidando entregabilidad y ética de datos.', pista: 'Consentimiento, baja, higiene, dominio propio, SPF y DKIM; A/B de una variable.', lecciones: ['l7-1', 'l7-2'] },
  { n: 12, pregunta: 'Señalá tres lugares donde el cuaderno usa IA y tres precauciones que recomienda.', pista: 'Segmentación, objetivos SMART, contenido, análisis; validar, sesgos, privacidad.', lecciones: ['l2-2', 'l7-2', 'l5-1'] },
  { n: 13, pregunta: 'Contrastá el embudo con el Messy Middle y los 4S: ¿para qué sigue sirviendo el embudo?', pista: 'Planificar por etapas vs. recorrido no lineal.', lecciones: ['l2-8', 'l3-4'] },
]

export const confundibles: { par: string; clave: string }[] = [
  { par: 'Necesidad · deseo · demanda', clave: 'carencia · forma cultural de satisfacerla · deseo con poder de compra.' },
  { par: 'Marketing estratégico · operativo', clave: 'rumbo a medio/largo plazo · ejecución con el mix a corto/medio plazo.' },
  { par: 'Marketing · ventas · publicidad', clave: 'proceso de valor · posible objetivo · una de las 8 herramientas de comunicación.' },
  { par: 'Inbound · outbound', clave: 'atraer con contenido de valor (bilateral) · salir a buscar al cliente (venta por insistencia).' },
  { par: 'Push · pull', clave: 'empuja el producto por el canal (poca lealtad) · el consumidor lo pide y arrastra al canal (lealtad fuerte).' },
  { par: 'SEO · SEM', clave: 'orgánico (se gana) · pago por subasta (inmediato).' },
  { par: 'SEO on page · off page', clave: 'dentro del sitio · autoridad externa (backlinks).' },
  { par: 'CTR · CPC · tasa de conversión · costo por conversión', clave: 'clics÷impresiones · costo÷clics · conversiones÷clics · costo÷conversiones.' },
  { par: 'E-commerce · e-business', clave: 'transacciones electrónicas · gestión completa del negocio digital.' },
  { par: 'Marketplace · tienda propia', clave: 'visibilidad y confianza prestadas · control total y datos propios.' },
  { par: 'Buyer persona · segmento', clave: 'representación semi-ficticia de un cliente · grupo de mercado.' },
  { par: 'Embudo · Messy Middle', clave: 'etapas para planificar · bucle exploración–evaluación no lineal.' },
  { par: 'SPF · DKIM', clave: 'qué servidores pueden enviar · firma que verifica origen e integridad.' },
  { par: 'Marketing predictivo · contextual · aumentado', clave: 'predecir antes del lanzamiento · interacción en tiempo real con sensores · tecnología que potencia a las personas.' },
  { par: 'Porter en el plan · Porter en segmentación', clave: 'analiza la competencia de la organización · mide el atractivo del segmento.' },
]

export const formulas: [string, string][] = [
  ['CTR', 'clics ÷ impresiones × 100'],
  ['CPC', 'costo total ÷ clics'],
  ['Tasa de conversión', 'conversiones ÷ clics × 100'],
  ['Costo por conversión', 'gasto total ÷ conversiones'],
  ['% de impresiones', 'impresiones obtenidas ÷ impresiones posibles × 100'],
  ['Objetivo (patrón)', 'verbo + objeto + medida + plazo'],
  ['Puntaje corregido por azar (práctica de este curso)', 'aciertos − errores ÷ (opciones − 1)'],
]

export const iaMapa: [string, string][] = [
  ['Cap. 1, pp. 33-34', 'IA y marketing «uno a uno»; predicción; motores de recomendación.'],
  ['Cap. 2, pp. 38-40', 'Comparar definiciones con IA y evaluar críticamente su respuesta.'],
  ['Cap. 4, p. 87', 'IA en la segmentación de campañas.'],
  ['Cap. 6, pp. 111-118', 'Objetivos SMART con prompt, segmentación, limpieza de bases, contenido y análisis.'],
  ['Cap. 6, pp. 124-125', 'Dilemas éticos: autenticidad, sesgos y criterio humano.'],
  ['Cap. 9, pp. 164-173', 'IA creativa y colaborativa; personalización en 4S.'],
  ['Anexo 2, Parte 8', 'Producir al menos 3 piezas con IA aclarando herramienta y uso.'],
]

export const reglasPrograma: [string, string][] = [
  ['Criterios de evaluación', 'Parcial teórico con opción a 1 recuperatorio · trabajos prácticos sobre unidades específicas · participación en clase · evaluación final.'],
  ['Para regularizar', '75 % de asistencia a teleclases (salvo certificados laborales) y aprobación de las instancias parciales con nota mínima 6.'],
  ['Para promocionar', '75 % de asistencia y aprobación de los dos parciales con nota mínima 7, sin recuperatorio.'],
  ['Para rendir', 'Cumplir la regularidad y aprobar el examen con nota mínima 6.'],
  ['Para rendir libre', 'Examen escrito aprobado con 6 (puede incluir bibliografía obligatoria y complementaria) y luego instancia oral; no se puede rendir libre si se rindió libre una correlativa.'],
]

export const cronograma: [string, string][] = [
  ['14 días antes', 'Releer los resúmenes de las 7 unidades; hacer el simulacro integrador y anotar errores.'],
  ['7 días antes', 'Repasar solo lecciones no consolidadas; tarjetas vencidas; rehacer errores.'],
  ['3 días antes', 'Preguntas integradoras (sin mirar); fórmulas y cuadros comparativos.'],
  ['1 día antes', 'Tarjetas de las unidades más débiles; temas que requieren bibliografía complementaria; descanso.'],
]
