import { cap, corta, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l24: Leccion = {
  id: 'l2-4',
  unidad: 2,
  titulo: 'Marketing mix: precio',
  resumen: 'Los seis pasos de Kotler para fijar un precio: objetivo, demanda, costos, competencia, método y precio final.',
  minutos: 30,
  objetivos: [
    'Enumerar y explicar los seis pasos para fijar un precio.',
    'Distinguir objetivos de fijación (ganancias, supervivencia, participación, desnatado, liderazgo).',
    'Explicar por qué la demanda es el techo y los costos el piso del precio.',
  ],
  previos: ['l2-3'],
  bloques: [
    {
      t: 'def',
      termino: 'Precio',
      x: 'Cantidad de dinero que los clientes tienen que pagar para obtener el producto. Engloba todas las actividades y estrategias de fijación acordes a las necesidades del momento de la organización. Impacta de forma directa en la **rentabilidad**.',
      o: cap('5', '92-93'),
    },
    {
      t: 'lista',
      items: [
        'Es el **único** elemento del mix que **produce ingresos**; los demás generan costos.',
        'Comunica al mercado el **posicionamiento de valor** buscado.',
        'Es el elemento **más fácil de ajustar** del programa de marketing.',
        'Las decisiones deben ser **consistentes con la estrategia**, los mercados meta y el posicionamiento de marca.',
      ],
      o: cap('5', '93', 'fig. 19: características de la variable precio'),
    },
    {
      t: 'explorable',
      titulo: 'Seis pasos para fijar el precio (Kotler)',
      variante: 'pasos',
      nodos: [
        { id: 's1', titulo: '1. Objetivo', resumen: 'Qué persigue el precio', detalle: 'Se define según la estrategia de la organización y el segmento al que apunta. Opciones: **maximización de ganancias** (precio con mayor ganancia actual según demanda y costos), **supervivencia** (cubrir costos variables y algunos fijos; no puede sostenerse in eternum: exceso de capacidad, competencia intensa o cambio de deseos), **maximización de la participación de mercado** (precios bajos de ingreso agresivo; tampoco siempre sostenible), **desnatado** (precio inicial alto a un producto nuevo para quienes más lo desean y pueden pagarlo, luego precios menores) y **liderazgo de producto o calidad** (calidad percibida, gusto y estatus con un precio apenas lo suficientemente alto para no quedar fuera de alcance).' },
        { id: 's2', titulo: '2. Demanda', resumen: 'Techo del precio', detalle: 'Cada precio genera un nivel diferente de demanda e impacta en los objetivos. La demanda establece un **límite superior** al precio que se puede cobrar. Factores: conceptos de las materias de Economía de la carrera.' },
        { id: 's3', titulo: '3. Costos', resumen: 'Piso del precio', detalle: 'Los costos marcan el **límite inferior**: el precio debe cubrir producir, distribuir y vender, con una rentabilidad justa por esfuerzo y riesgo. Hay costos fijos, variables, totales y promedio (materia Cálculo de costos y rendimiento).' },
        { id: 's4', titulo: '4. Competencia', resumen: 'Costos, precios y ofertas de competidores', detalle: 'El precio se compara siempre. Si mi oferta incluye algo que el competidor más cercano no ofrece, evalúo su valor para el cliente y lo **sumo** al precio del competidor; si él ofrece algo que yo no, lo **resto** del mío. Así decido si cobrar más, igual o menos.' },
        { id: 's5', titulo: '5. Método', resumen: 'Cómo calcular', detalle: 'Por **márgenes** (costo + margen estándar), para alcanzar una **tasa de rentabilidad** objetivo, por **valor percibido**, por **posicionamiento** (reingeniería para ser productor de bajo costo sin sacrificar calidad), en base a la **competencia** o por **subasta** (pujas).' },
        { id: 's6', titulo: '6. Precio final', resumen: 'Estructura y adaptación', detalle: 'Pocas veces hay un precio único: se desarrolla una **estructura** y se adapta: **geográfica**, **descuentos y bonificaciones** (forma de pago, temporada, volumen), **promocionales** (eventos, clientes especiales, garantías) y **diferenciada** (según necesidades y características: volumen, versión).' },
      ],
      o: cap('5', '93-95'),
    },
    {
      t: 'callout',
      tipo: 'ojo',
      titulo: 'Objetivos «insostenibles»',
      x: 'Supervivencia y maximización de participación (precios bajos) **no se pueden sostener indefinidamente**: el cuaderno lo aclara para ambos. No confundas precio bajo con posicionamiento: «fijar precios en base al posicionamiento no consiste únicamente en fijar precios más bajos».',
      o: cap('5', '94-95'),
    },
    {
      t: 'tabla',
      titulo: 'Comparar los objetivos de fijación',
      cab: ['Objetivo', 'Idea', 'Cuándo / límite'],
      filas: [
        ['Maximización de ganancias', 'Elegir el precio que da la mayor ganancia actual', 'Requiere calcular demanda y costos'],
        ['Supervivencia', 'Cubrir costos variables y algunos fijos', 'Exceso de capacidad, competencia intensa; temporal'],
        ['Participación de mercado', 'Precios bajos para ganar cuota', 'No siempre sostenible'],
        ['Desnatado', 'Precio inicial alto para producto nuevo', 'Mercado dispuesto a pagar más; luego se apunta al resto'],
        ['Liderazgo de producto/calidad', 'Calidad percibida, gusto, estatus; precio accesible', 'Evita quedar fuera del alcance del consumidor'],
      ],
      o: cap('5', '93-94'),
    },
    { t: 'calc', tipo: 'precio' },
    {
      t: 'ejemplo',
      titulo: 'Ajustar el precio frente a un competidor (regla de «sumar/restar valor»)',
      pasos: [
        'Competidor cercano vende una caja de 12 alfajores a $10.000, sin envío.',
        'Mi caja incluye envío en el día y un packaging de regalo que el cliente valora en $1.500 en total (supuesto didáctico).',
        'Sumo ese valor al precio del competidor: referencia = $11.500.',
        'Si mis costos cubren y dejan rentabilidad por debajo de $11.500, tengo margen para cobrar igual o más; si quisiera captar participación podría cobrar menos, sabiendo que no es sostenible siempre.',
      ],
      o: cap('5', '94-95', 'regla de sumar/restar; cifras didácticas'),
    },
  ],
  claves: ['precio', 'desnatado', 'valor-percibido', 'estructura-precios'],
  preguntas: [
    mc('l24-q1', 'Precio', 1, '¿Qué límite impone la demanda al precio?', [
      ['Un límite inferior', 'Los costos marcan el límite inferior.'],
      ['Un límite superior', 'Correcto.'],
      ['Ninguno', 'Cada precio genera un nivel de demanda distinto.'],
      ['Solo en B2B', 'Aplica en general.'],
    ], 1, cap('5', '94')),
    mc('l24-q2', 'Objetivos', 2, 'Lanzás un gadget innovador con un precio inicial alto para quienes más lo desean y luego lo bajás. ¿Qué objetivo de fijación aplicás?', [
      ['Supervivencia', 'Se orienta a cubrir costos ante excesos de capacidad.'],
      ['Participación de mercado', 'Implica precios bajos de entrada.'],
      ['Desnatado', 'Correcto: se capta «la nata» del mercado dispuesto a pagar más.'],
      ['Precio por subasta', 'Es un método, no un objetivo.'],
    ], 2, cap('5', '94')),
    mc('l24-q3', 'Método', 2, 'Sumar al costo un porcentaje estándar para obtener el precio es…', [
      ['Fijación por valor percibido', 'Parte de lo que el cliente valora, no del costo.'],
      ['Fijación mediante márgenes', 'Correcto.'],
      ['Fijación por subasta', 'Se basa en pujas.'],
      ['Desnatado', 'Es un objetivo, no un método de cálculo.'],
    ], 1, cap('5', '95')),
    mc('l24-q4', 'Competencia', 3, 'El competidor ofrece una garantía extendida que vos no ofrecés. Según el cuaderno, para comparar precios deberías…', [
      ['Ignorarla', 'El cuaderno pide evaluar su valor.'],
      ['Restar el valor de esa característica de tu propio precio para ubicarte frente a su oferta', 'Correcto: si él ofrece algo que vos no, ese valor se resta del tuyo.'],
      ['Sumarla al precio del competidor', 'Se suma lo que *vos* ofrecés y él no.'],
      ['Duplicar tu precio', 'No tiene fundamento.'],
    ], 1, cap('5', '94-95')),
    corta('l24-q5', 'Estructura de precios', 2, 'Nombrá cuatro estrategias de adaptación del precio final y da un ejemplo de una.', 'Geográfica, descuentos y bonificaciones, promocionales y diferenciada. Ej.: descuento por pago en efectivo o por volumen (descuentos y bonificaciones).', [
      'Menciona las cuatro estrategias',
      'Da un ejemplo coherente',
    ], cap('5', '95')),
  ],
  tarjetas: [
    { id: 'l24-t1', f: 'Seis pasos para fijar un precio', b: 'Objetivo · demanda · costos · competencia · método · precio final.' },
    { id: 'l24-t2', f: 'Límites del precio', b: 'Demanda = límite superior; costos = límite inferior.' },
    { id: 'l24-t3', f: 'Objetivos de fijación', b: 'Ganancias, supervivencia, participación de mercado, desnatado, liderazgo de producto/calidad.' },
    { id: 'l24-t4', f: 'Estrategias de adaptación del precio', b: 'Geográfica; descuentos y bonificaciones; promocional; diferenciada.' },
  ],
  sintesis: ['El precio genera ingresos, comunica posicionamiento y es lo más fácil de ajustar.', 'Se fija entre el piso (costos) y el techo (demanda), mirando a la competencia.', 'Rara vez hay un precio único.'],
  conexiones: ['l2-5', 'l3-3'],
  referencias: [cap('5', '92-95')],
}
