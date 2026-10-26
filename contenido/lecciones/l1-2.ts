import { cap, corta, did, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l12: Leccion = {
  id: 'l1-2',
  unidad: 1,
  titulo: 'Necesidad, deseo, demanda y propuesta de valor',
  resumen: 'De la carencia a la compra: tres conceptos que se confunden, y la propuesta de valor como respuesta a «¿por qué nos eligen?».',
  minutos: 30,
  objetivos: [
    'Diferenciar necesidad, deseo y demanda y clasificar situaciones concretas.',
    'Describir el proceso de marketing de cinco pasos como proceso de construcción de la propuesta de valor.',
    'Redactar una propuesta de valor y evaluarla con las cinco características del cuaderno.',
  ],
  previos: ['l1-1'],
  bloques: [
    {
      t: 'p',
      x: 'Si el marketing busca satisfacer necesidades, las organizaciones **no solo venden productos o servicios: ofrecen soluciones a problemas concretos**, que se traducen en beneficios para los públicos. El cuaderno advierte que esto, por sí solo, no garantiza la sostenibilidad de la organización a largo plazo: ahí entra la propuesta de valor.',
      o: cap('1', '29', 'Propuesta de valor'),
    },
    {
      t: 'callout',
      tipo: 'discrepancia',
      titulo: '¿Qué se comercializa? (tema del programa)',
      x: 'El Programa 2026 incluye «¿Qué se comercializa?». El cuaderno responde en una frase (soluciones y beneficios, p. 29) y define *producto* en el Cap. 5 (p. 89); además el Cap. 5 afirma que en el Cap. 1 se desarrollaron los tipos de artículos ofrecidos, pero **el Cap. 1 no los desarrolla**. Por eso, en este curso el tema se completa en [[>l2-3|Marketing mix: producto y marca]].',
      o: cap('5', '89-91'),
    },
    { t: 'h', x: 'El proceso de marketing de cinco pasos' },
    {
      t: 'explorable',
      titulo: 'Proceso de creación de valor (Kotler y Armstrong, 2023)',
      variante: 'pasos',
      nodos: [
        { id: 'p1', titulo: '1. Entender', resumen: 'Mercado, necesidades y deseos', detalle: 'Entender el mercado y las necesidades y los deseos de los clientes. Es la etapa que el Cap. 1 desarrolla (necesidad, deseo, demanda).' },
        { id: 'p2', titulo: '2. Diseñar', resumen: 'Estrategia impulsada por clientes', detalle: 'Diseñar una estrategia de marketing impulsada por clientes: segmentación y posicionamiento (Cap. 2 y 4).' },
        { id: 'p3', titulo: '3. Elaborar', resumen: 'Programa integrado', detalle: 'Elaborar un programa de marketing integrado que proporcione un valor superior: el marketing mix (Cap. 5).' },
        { id: 'p4', titulo: '4. Establecer', resumen: 'Relaciones redituables', detalle: 'Establecer relaciones redituables y lograr el deleite de los clientes.' },
        { id: 'p5', titulo: '5. Captar', resumen: 'Valor de los clientes', detalle: 'Captar valor de los clientes para obtener utilidades y activo de ellos. Los pasos 1 a 4 son la «creación de valor para los clientes y establecimiento de relaciones»; el 5, el «captar a cambio valor de clientes».' },
      ],
      o: cap('1', '31', 'figura del proceso (Kotler y Armstrong, 2023)'),
    },
    { t: 'h', x: 'Necesidad, deseo y demanda' },
    {
      t: 'tabla',
      cab: ['Concepto', 'Definición del cuaderno', 'Ejemplo del cuaderno'],
      filas: [
        ['**Necesidad**', 'Estado de carencia percibido. Incluye físicas básicas (alimento, ropa, calidez, seguridad), sociales (pertenencia, afecto) e individuales (conocimiento, expresión personal). Son universales y básicas. (Kotler y Keller, 2016)', 'Todos necesitan alimentarse'],
        ['**Deseo**', 'Forma que adoptan las necesidades humanas moldeadas por la cultura y la personalidad individual. Expresión cultural y contextual de la necesidad.', 'Hamburguesa gourmet, plato vegano o «un buen asadito»'],
        ['**Demanda**', 'Necesidades y deseos **respaldados por el poder de compra**.', 'Quien además tiene intención y capacidad de pagar'],
      ],
      o: cap('1', '32', 'Necesidad, deseo y demanda'),
    },
    {
      t: 'p',
      x: 'La figura de Sayago (2025) que reproduce el cuaderno ordena la secuencia: *equilibrio → necesidad (surge una carencia) → deseo (cómo quiere satisfacerla) → demanda (intención + capacidad adquisitiva) → equilibrio*. El marketing **identifica** la necesidad, **orienta** el deseo y **estimula** la demanda.',
      o: cap('1', '32', 'fig. de Sayago, 2025'),
    },
    {
      t: 'acordeon',
      titulo: 'El debate: ¿el marketing satisface necesidades o las crea?',
      bloques: [
        { t: 'p', x: 'El cuaderno lo llama «un debate *in eternum*» y recoge posiciones: **Kotler** (2016): los especialistas no crean necesidades, preexisten; el marketing las identifica y responde. **Baudrillard** (1970): el consumo moderno es más simbólico que funcional. **Packard**: la publicidad explora deseos inconscientes para inducir consumos muchas veces innecesarios. **Posición intermedia**: no crea necesidades básicas, pero puede *amplificar, transformar o canalizar* necesidades latentes en deseos y demandas; Levitt (1960) invita a mirar la necesidad subyacente.', o: cap('1', '33', 'nota 5') },
        { t: 'p', x: 'Lo que el cuaderno **sí afirma**: un propósito fundamental del marketing es cubrir las necesidades y los deseos del público objetivo **mejor que la competencia**, lo que exige entender cómo piensan, sienten y actúan.', o: cap('1', '33') },
      ],
    },
    {
      t: 'clasificar',
      titulo: 'Necesidad, deseo o demanda',
      categorias: ['Necesidad', 'Deseo', 'Demanda'],
      items: [
        { x: 'Sentir inseguridad en la vivienda', cat: 0, porque: 'Estado de carencia (seguridad), aún sin forma específica.' },
        { x: 'Querer un alarma con cámaras conectadas al celular', cat: 1, porque: 'Forma concreta, moldeada por contexto y cultura, que toma la necesidad.' },
        { x: 'Querer ese sistema y contar con el dinero para contratarlo', cat: 2, porque: 'Deseo respaldado por poder de compra.' },
        { x: 'Necesitar pertenecer a un grupo', cat: 0, porque: 'Necesidad social (pertenencia y afecto).' },
      ],
    },
    { t: 'h', x: 'Propuesta de valor' },
    {
      t: 'def',
      termino: 'Propuesta de valor',
      x: 'Conjunto de beneficios que hace que una organización destaque y sea preferida. Responde tres preguntas: **a)** ¿por qué nos eligen?, **b)** ¿qué nos diferencia?, **c)** ¿qué problema resolvemos que otros no?',
      o: cap('1', '29-30'),
    },
    { t: 'p', x: 'Se sugiere que sea: **(1)** representativa de la identidad de la organización, **(2)** única y diferenciadora, **(3)** sostenible en el tiempo, **(4)** claramente superior a las alternativas y **(5)** aplicable y flexible, capaz de adaptarse a los cambios en las necesidades de las partes. No es una única característica: puede combinar atributos y **no necesariamente es tangible**. Lo difícil es definirla y, sobre todo, **comunicarla** para que el público la perciba, sin perder la capacidad de ajustarla.', o: cap('1', '30') },
    {
      t: 'tabla',
      titulo: 'Ejemplos de propuestas de valor (Tabla 1)',
      cab: ['Empresa', 'Propuesta de valor'],
      filas: [
        ['Apple', 'Tecnología innovadora con diseño elegante y funcional · ecosistema integrado que simplifica la experiencia · status y diferenciación'],
        ['Amazon', 'Amplia variedad en un solo lugar · entrega rápida y confiable · atención eficiente y resolutiva'],
        ['Netflix', 'Acceso ilimitado a entretenimiento personalizado · contenido original y diverso · recomendaciones inteligentes'],
        ['Starbucks', 'Experiencia personalizada y ambiente acogedor · producto de calidad · conexión emocional con la marca'],
        ['Mercado Libre', 'Plataforma de e-commerce accesible y segura · soluciones integrales (pagos, logística, crédito) · rapidez y facilidad de uso'],
      ],
      o: cap('1', '31', 'Tabla 1'),
    },
    {
      t: 'ejemplo',
      titulo: 'Evaluar una propuesta de valor de una panadería de barrio',
      pasos: [
        'Propuesta candidata (ejemplo didáctico): «Pan casero de masa madre, horneado cada mañana y entregado en tu puerta en el día».',
        '¿Representa la identidad? Sí, si el negocio realmente elabora de forma artesanal.',
        '¿Es única y diferenciadora? Depende de la competencia del barrio: si todos venden pan casero, el diferencial real sería la entrega en el día.',
        '¿Es sostenible y flexible? Requiere capacidad logística sostenida y adaptarse a cambios (p. ej., horarios de trabajo de los clientes).',
        '¿Es superior? Habría que contrastarlo con el delivery de terceros. Conclusión: la propuesta se afina comunicando el beneficio (frescura + comodidad), no solo el producto.',
      ],
      o: did,
    },
    {
      t: 'callout',
      tipo: 'ia',
      x: 'El cuaderno propone, para las preguntas de reflexión, pensar cómo usar herramientas de IA en la vida diaria; y señala (p. 34) que la IA permite el marketing «uno a uno» y diseñar propuestas de valor basadas en intereses individuales (Peppers y Rogers, 1990s). Se profundiza en [[>l2-2|Marketing 5.0 e IA]].',
      o: cap('1', '33-34'),
    },
  ],
  claves: ['necesidad', 'deseo', 'demanda', 'propuesta-de-valor', 'proceso-de-marketing'],
  preguntas: [
    mc('l12-q1', 'Necesidad/deseo/demanda', 1, 'Una persona necesita alimentarse, prefiere un plato vegano y puede pagarlo. ¿Cómo se denomina que cuenta con poder de compra para ese plato?', [
      ['Necesidad', 'La necesidad es la carencia básica (alimentarse), no la forma ni el poder de compra.'],
      ['Deseo', 'El deseo es la forma específica (plato vegano); aún sin considerar el poder de compra.'],
      ['Demanda', 'Correcto: necesidades y deseos respaldados por poder de compra.'],
      ['Posicionamiento', 'Concepto de otra etapa (estrategia): no describe este estado.'],
    ], 2, cap('1', '32')),
    mc('l12-q2', 'Necesidad/deseo/demanda', 2, 'Según el cuaderno, ¿qué es lo que SÍ afirma sobre el debate «¿crea o satisface necesidades?»', [
      ['Que el marketing crea todas las necesidades', 'Es la posición de algunos críticos citados, no la afirmación del cuaderno.'],
      ['Que las necesidades no existen sin publicidad', 'Contradice a Kotler y a la posición intermedia.'],
      ['Que un propósito fundamental es cubrir necesidades y deseos del público objetivo mejor que la competencia', 'Correcto: el cuaderno lo presenta como lo «posible afirmar», dejando el debate abierto.'],
      ['Que el debate está resuelto a favor de Baudrillard', 'El cuaderno dice que es un debate in eternum.'],
    ], 2, cap('1', '33')),
    mc('l12-q3', 'Propuesta de valor', 2, '¿Cuál de estas NO es una de las preguntas que responde la propuesta de valor?', [
      ['¿Por qué nos eligen?', 'Sí lo es (pregunta a).'],
      ['¿Qué nos diferencia?', 'Sí lo es (pregunta b).'],
      ['¿Cuánto cuesta producir cada unidad?', 'Correcto: es una pregunta de costos, no de propuesta de valor.'],
      ['¿Qué problema resolvemos que otros no?', 'Sí lo es (pregunta c).'],
    ], 2, cap('1', '29-30')),
    mc('l12-q4', 'Propuesta de valor', 3, 'Una empresa define su propuesta de valor como «tenemos el mejor producto» sin explicar para quién ni por qué. Frente a las 5 características, ¿qué falla principalmente?', [
      ['Es demasiado flexible', 'Nada indica exceso de flexibilidad; el problema es que no diferencia ni comunica el beneficio.'],
      ['No es única/diferenciadora ni muestra superioridad frente a alternativas de forma verificable', 'Correcto: es una declaración genérica; no explica qué problema resuelve ni por qué es preferible.'],
      ['Es tangible', 'La propuesta puede ser intangible; no es un defecto.'],
      ['Es sostenible en el tiempo', 'No se puede juzgar sostenibilidad sin información; no es el defecto señalado.'],
    ], 1, cap('1', '30')),
    corta('l12-q5', 'Necesidad/deseo/demanda', 2, 'Explicá con un ejemplo propio la diferencia entre necesidad, deseo y demanda y qué rol cumple el marketing en cada paso.', 'Necesidad: carencia universal (p. ej., abrigarse). Deseo: forma concreta moldeada por cultura/personalidad (p. ej., una campera de determinada marca). Demanda: ese deseo con poder de compra (tiene el dinero y la intención). El marketing identifica la necesidad, orienta el deseo y estimula la demanda.', [
      'Define los tres conceptos con ejemplo coherente',
      'Distingue el rol del poder de compra',
      'Menciona identificar/orientar/estimular',
    ], cap('1', '32')),
  ],
  tarjetas: [
    { id: 'l12-t1', f: 'Necesidad vs. deseo vs. demanda', b: 'Necesidad: carencia percibida (universal). Deseo: forma cultural/individual de satisfacerla. Demanda: necesidad o deseo + poder de compra.' },
    { id: 'l12-t2', f: 'Tres preguntas de la propuesta de valor', b: '¿Por qué nos eligen? ¿Qué nos diferencia? ¿Qué problema resolvemos que otros no?' },
    { id: 'l12-t3', f: 'Cinco características de una buena propuesta de valor', b: 'Representativa de la identidad · única y diferenciadora · sostenible · claramente superior · aplicable y flexible.' },
    { id: 'l12-t4', f: 'Los 5 pasos del proceso de marketing (Kotler y Armstrong)', b: '1 entender mercado/necesidades · 2 diseñar estrategia · 3 programa integrado · 4 relaciones redituables · 5 captar valor.' },
  ],
  sintesis: [
    'Se vende solución a un problema; la propuesta de valor explica por qué te eligen.',
    'Necesidad (carencia) → deseo (forma) → demanda (poder de compra).',
    'El proceso de marketing tiene 5 pasos; este capítulo desarrolla el primero.',
  ],
  conexiones: ['l1-3', 'l3-3', 'l2-3'],
  referencias: [cap('1', '29-33'), cap('5', '89-91', 'discrepancia sobre tipos de productos')],
}
