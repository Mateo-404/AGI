import { cap, corta, did, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l14: Leccion = {
  id: 'l1-4',
  unidad: 1,
  titulo: 'Estrategia y táctica: marketing estratégico y operativo',
  resumen: 'Qué se decide a largo plazo y qué se ejecuta a corto, y cómo se conecta con la estrategia de la organización.',
  minutos: 20,
  objetivos: [
    'Diferenciar marketing estratégico y operativo (táctico) por horizonte, foco y tareas.',
    'Explicar la definición de estrategia de Kotler (1993) con sus cinco ideas.',
    'Ubicar el vínculo relacional dentro de las definiciones y etapas del marketing.',
  ],
  previos: ['l1-2'],
  bloques: [
    {
      t: 'p',
      x: 'Cuando se habla de **lo estratégico**, el cuaderno se refiere a acciones macro definidas a **mediano / largo plazo**; **lo operativo** son definiciones micro a **corto y mediano plazo**. Es una distinción transversal a gran cantidad de materias de la Licenciatura y a lo que hace un/a profesional de AGI en cualquier organización.',
      o: cap('2', '37', 'Marketing Estratégico y Marketing Operativo'),
    },
    {
      t: 'comparar',
      titulo: 'Figura 14 (transcripta): diferencias',
      a: {
        titulo: 'Marketing estratégico — «la mente de la empresa»',
        items: ['Busca conocer las necesidades actuales y futuras de consumidores/as', 'Detecta necesidades y servicios a cubrir', 'Identifica productos y mercados analizando su atractivo (ciclo de vida y ventas potenciales)', 'Crea ventajas competitivas', 'Previsiones globales', 'Horizonte: medio–largo plazo'],
      },
      b: {
        titulo: 'Marketing operativo — «el brazo comercial»',
        items: ['Paso de la teoría a la práctica con las herramientas del marketing mix', 'Conquista mercados existentes', 'Alcanza cuotas de mercado prefijadas', 'Gestiona producto, punto de venta, precio y promoción', 'Crea y controla presupuestos de marketing y ventas', 'Horizonte: corto–medio plazo'],
      },
      o: cap('2', '37-38', 'fig. 14'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      x: 'Nota de lectura: el cuaderno repite casi textualmente la definición de ambos conceptos en pp. 37 y 38; acá están consolidadas. El operativo también se llama *marketing táctico* u *operacional*.',
      o: cap('2', '37-38'),
    },
    {
      t: 'def',
      termino: 'Estrategia (Kotler, 1993)',
      x: '«Mantener a la organización adaptada en forma óptima y continua a sus mejores oportunidades, analizando los cambios del entorno y aprovechando al máximo los recursos internos que le confieren una ventaja frente a la competencia». Cinco ideas: **organización adaptada, oportunidad, cambios en el entorno, aprovechamiento de recursos internos, ventaja competitiva**.',
      o: cap('9', '161-162'),
    },
    {
      t: 'clasificar',
      titulo: '¿Estratégico u operativo?',
      categorias: ['Estratégico', 'Operativo'],
      items: [
        { x: 'Evaluar si conviene ingresar a un nuevo nicho en los próximos tres años', cat: 0, porque: 'Analiza el mercado a medio–largo plazo y orienta a la organización hacia oportunidades.' },
        { x: 'Definir el precio promocional de esta semana y el presupuesto de la campaña', cat: 1, porque: 'Aplica herramientas del mix y controla presupuestos a corto plazo.' },
        { x: 'Identificar segmentos del mercado y ventajas competitivas', cat: 0, porque: 'Corresponde a la «mente de la empresa».' },
        { x: 'Alcanzar la cuota de ventas prefijada del trimestre', cat: 1, porque: 'Conquista mercados existentes y cuotas prefijadas.' },
      ],
    },
    { t: 'h', x: 'Alineación con la organización' },
    {
      t: 'p',
      x: 'El cuaderno insiste en que las estrategias de marketing deben **alinearse con la estrategia de la organización** y estar en consonancia con otras áreas; por eso vincula la materia con Dirección Estratégica, Gestión Estratégica y con áreas como finanzas, costos, ventas u operaciones. Esto se aplica en [[>l3-1|el plan de marketing]].',
      o: cap('2', '36'),
    },
    { t: 'h', x: 'Marketing relacional' },
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Tema del programa que el cuaderno no nombra',
      x: 'El Programa 2026 incluye «marketing relacional», pero **el término no aparece en el cuaderno**. Lo que sí aparece son sus ideas centrales: las definiciones de marketing hablan de **relaciones redituables y estrechas** (Kotler y Armstrong; Kotler y Keller, p. 13), Marketing 2.0 pasa de satisfacer a **retener y fidelizar** (p. 17), y el proceso de marketing incluye «establecer relaciones redituables» (p. 31). Una lectura posible —nuestra, no de la cátedra— es entender el marketing relacional como el énfasis en construir y sostener esos vínculos de largo plazo más que en la transacción aislada. Para cumplir el programa corresponde leer la bibliografía obligatoria (Kotler y Keller, 2012, Cap. 1).',
      o: did,
    },
  ],
  claves: ['marketing-estrategico', 'marketing-operativo', 'estrategia', 'marketing-relacional'],
  preguntas: [
    mc('l14-q1', 'Estratégico vs. operativo', 1, 'El marketing operativo (táctico) se caracteriza por…', [
      ['Prever necesidades futuras y evaluar nichos nuevos', 'Es marketing estratégico.'],
      ['Llevar a la práctica el marketing mix para alcanzar objetivos, a corto/medio plazo', 'Correcto.'],
      ['Definir la misión y la visión', 'Corresponde a la planificación estratégica de la organización.'],
      ['No requerir planificación', 'Requiere planificar, ejecutar y controlar.'],
    ], 1, cap('2', '37-38')),
    mc('l14-q2', 'Estrategia', 2, '¿Cuál NO es una de las ideas que el cuaderno destaca de la definición de estrategia de Kotler (1993)?', [
      ['Cambios en el entorno', 'Sí es una de las cinco ideas.'],
      ['Aprovechamiento de recursos internos', 'Sí es una de las cinco ideas.'],
      ['Reducir costos por debajo de la competencia en todos los casos', 'Correcto: no figura entre las ideas listadas.'],
      ['Ventaja competitiva', 'Sí es una de las cinco ideas.'],
    ], 2, cap('9', '161-162')),
    mc('l14-q3', 'Marketing relacional', 3, '¿Qué afirmación es honesta respecto de «marketing relacional» y el cuaderno?', [
      ['El cuaderno lo desarrolla en un capítulo propio', 'No: el término no aparece.'],
      ['El término no aparece, pero sus ideas (relaciones redituables, fidelización) sí están en las definiciones y en Marketing 2.0', 'Correcto.'],
      ['El cuaderno lo rechaza como concepto', 'No hay tal rechazo.'],
      ['Es sinónimo de marketing operativo', 'No: son planos distintos.'],
    ], 1, cap('1', '13-17')),
    corta('l14-q4', 'Estratégico vs. operativo', 2, 'Para una cafetería, da un ejemplo de decisión estratégica y otro de decisión operativa y justificá con el horizonte y el foco.', 'Estratégica: decidir si expandirse a servicio corporativo de viandas en los próximos 2-3 años tras analizar el mercado (mediano/largo plazo, oportunidad). Operativa: fijar el combo de desayuno de esta semana, su precio y su presupuesto en redes (corto plazo, uso del marketing mix).', [
      'Ejemplo estratégico coherente con horizonte largo y análisis de oportunidades',
      'Ejemplo operativo coherente con el mix y corto plazo',
      'Justifica con horizonte y foco',
    ], cap('2', '37-38')),
  ],
  tarjetas: [
    { id: 'l14-t1', f: 'Marketing estratégico vs. operativo', b: 'Estratégico: necesidades actuales y futuras, nichos, segmentos, oportunidades (medio/largo plazo). Operativo: aplicar el mix para lograr objetivos, controlar y ejecutar (corto/medio plazo).' },
    { id: 'l14-t2', f: 'Estrategia según Kotler (1993): 5 ideas', b: 'Organización adaptada · oportunidad · cambios del entorno · recursos internos · ventaja competitiva.' },
  ],
  sintesis: ['Lo estratégico define el rumbo; lo operativo lo ejecuta.', 'Ambos se articulan en el plan de marketing.', 'Marketing relacional: tema del programa sin término propio en el cuaderno.'],
  conexiones: ['l3-1', 'l1-1'],
  referencias: [cap('2', '36-38'), cap('9', '161-162')],
}
