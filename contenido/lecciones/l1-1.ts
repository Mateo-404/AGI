import { cap, corta, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l11: Leccion = {
  id: 'l1-1',
  unidad: 1,
  titulo: 'Qué es (y qué no es) el marketing',
  resumen: 'Cuatro definiciones de autores de referencia, lo que tienen en común y por qué marketing no es vender ni hacer publicidad.',
  minutos: 25,
  objetivos: [
    'Distinguir marketing de ventas y de publicidad con argumentos tomados de las definiciones.',
    'Enunciar los cuatro rasgos que comparten las definiciones del cuaderno.',
    'Explicar en qué se diferencia —y en qué no— el marketing digital del tradicional.',
  ],
  previos: [],
  bloques: [
    {
      t: 'p',
      x: 'El cuaderno propone mirar a las organizaciones como a las personas: **buscan ser valoradas, reconocidas y elegidas**. Desde esa idea "humana", el marketing es la disciplina que estudia cómo una organización construye esa relación con su mercado.',
      o: cap('1', '10-11', 'Un enfoque bien "humano" de la disciplina'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'El ejercicio inicial de la cátedra',
      x: 'Se preguntó a personas ajenas a la disciplina, a chatbots de IA y a profesionales qué es marketing. La conclusión del cuaderno: **hay grandes diferencias entre la percepción de la actividad y la realidad** de quienes la ejercen.',
      o: cap('1', '11-14'),
    },
    { t: 'h', x: 'Cuatro definiciones' },
    {
      t: 'tabla',
      titulo: 'Definiciones citadas por el cuaderno',
      cab: ['#', 'Definición', 'Autoría'],
      filas: [
        ['1', 'Administración de relaciones redituables con el cliente. Doble meta: atraer nuevos clientes prometiéndoles un valor superior, y mantener y hacer crecer a los actuales satisfaciendo sus necesidades.', 'Kotler y Armstrong (2013)'],
        ['2', 'Ciencia socioeconómica que estudia las razones y consecuencias de las relaciones de intercambio entre consumidores y productores de bienes, desarrollando modelos estratégicos, procesos y herramientas para satisfacer necesidades y deseos con el fin de crear valor para todas las partes.', 'Asociación Argentina de Marketing (marzo 2024)'],
        ['3', 'Proceso social por el cual grupos e individuos obtienen lo que necesitan y desean mediante la creación, oferta y libre intercambio de productos y servicios de valor con otros.', 'Kotler y Keller (2012)'],
        ['4', 'Proceso mediante el cual las compañías crean valor para los clientes y establecen relaciones estrechas con ellos, para recibir a cambio valor de los clientes.', 'Kotler y Keller (2012)'],
      ],
      o: cap('1', '13-14', 'Definiciones 1 a 4'),
    },
    { t: 'h', x: 'Lo que tienen en común' },
    {
      t: 'lista',
      items: [
        'El objetivo es **satisfacer necesidades**.',
        'Es un **proceso** donde intervienen, como mínimo, dos partes: quien satisface y quien es satisfecho/a.',
        'Promueve **vínculos duraderos, estrechos y redituables** entre las partes.',
        'Busca **captar y entregar valor** entre las partes.',
      ],
      o: cap('1', '14'),
    },
    {
      t: 'callout',
      tipo: 'ojo',
      titulo: 'Marketing no es vender ni es publicidad',
      x: 'Ninguna definición menciona la palabra *publicidad* y ninguna reduce el marketing a vender. **Potenciar las ventas puede ser un objetivo** de quienes hacen marketing, pero no lo define. La publicidad es **una herramienta** del marketing (se verá como uno de los 8 modos de comunicación en [[>l2-5|plaza y promoción]]).',
      o: cap('1', '14'),
    },
    {
      t: 'comparar',
      titulo: '¿Es marketing, ventas o publicidad?',
      a: {
        titulo: 'Marketing',
        items: ['Proceso de creación y captación de valor', 'Parte de las necesidades del mercado', 'Busca relaciones duraderas y redituables', 'Incluye investigar, segmentar, diseñar oferta, comunicar'],
      },
      b: {
        titulo: 'Ventas / publicidad',
        items: ['Ventas: una de las posibles metas del marketing', 'Publicidad: forma paga y no personal de presentar ideas, bienes o servicios (una de las 8 herramientas de comunicación)', 'Ninguna alcanza por sí sola para definir la disciplina'],
      },
      o: cap('1', '14', 'y Cap. 5 p. 99'),
    },
    { t: 'h', x: 'Marketing digital: ¿otra disciplina?' },
    {
      t: 'tabla',
      cab: ['Definición', 'Autoría'],
      filas: [
        ['"Todo aquello que podemos hacer en Internet para impulsar la comercialización de nuestros productos o servicios, promocionar nuestros contenidos o generar reconocimiento de marca."', 'Maciá Domene (2018)'],
        ['"La aplicación de estrategias y técnicas de comercialización llevadas a cabo a través de los medios digitales. Todas las técnicas del marketing offline son adaptadas al mundo digital."', 'Shum Xie (2019)'],
      ],
      o: cap('1', '15'),
    },
    {
      t: 'p',
      x: 'Las dos definiciones incorporan Internet, medios digitales, marketing *online*. Por eso hay quienes sostienen que el marketing digital es **una mirada ampliada** del marketing, y otros que lo digital es **"un canal más"** donde ejercerlo. El cuaderno no zanja el debate (lo deja como pregunta de reflexión), pero sí afirma algo concreto: en los modelos tradicionales la conexión con el público puede ser limitada porque **no hay retroalimentación directa ni en tiempo real**; el digital permite un vínculo más cercano y constante mediante contenido de valor, conversación e intercambio de opiniones.',
      o: cap('1', '15'),
    },
    {
      t: 'acordeon',
      titulo: 'Qué puede aportar un/a profesional de AGI (lista del cuaderno)',
      bloques: [
        {
          t: 'lista',
          items: [
            'Definición de estrategias de marketing',
            'Diseño de un plan de marketing',
            'Seguimiento de la ejecución del proceso de marketing',
            'Desarrollo de acciones de comunicación con clientes',
            'Análisis de información sobre rendimiento de campañas digitales',
            'Elaboración de indicadores de gestión sobre el plan de marketing',
          ],
          o: cap('1', '16'),
        },
      ],
    },
    {
      t: 'clasificar',
      titulo: 'Clasificá cada enunciado',
      categorias: ['Es marketing en sentido amplio', 'Es una herramienta o un objetivo, no el concepto completo'],
      items: [
        { x: 'Estudiar qué necesita un segmento y diseñar una oferta con valor superior', cat: 0, porque: 'Es el núcleo del proceso: entender necesidades y crear valor.' },
        { x: 'Pagar un aviso en la radio', cat: 1, porque: 'Es publicidad: una herramienta dentro del mix de comunicación.' },
        { x: 'Aumentar las ventas del trimestre en 10 %', cat: 1, porque: 'Es un posible objetivo; el marketing no se reduce a él.' },
        { x: 'Mantener y hacer crecer a los clientes actuales satisfaciendo sus necesidades', cat: 0, porque: 'Es la segunda mitad de la doble meta (Kotler y Armstrong).' },
      ],
    },
  ],
  claves: ['marketing', 'marketing-digital', 'valor', 'intercambio'],
  preguntas: [
    mc('l11-q1', 'Definición', 1, '¿Qué rasgo comparten TODAS las definiciones de marketing del cuaderno?', [
      ['Buscan maximizar las ventas en el corto plazo', 'Ninguna definición reduce el marketing a vender; las ventas pueden ser un objetivo, no la definición.'],
      ['Se orientan a satisfacer necesidades y a crear y captar valor entre las partes', 'Correcto: es el hilo común que el cuaderno enumera (necesidades, proceso entre al menos dos partes, vínculos duraderos, valor).'],
      ['Destacan la publicidad como actividad central', 'El cuaderno señala que la palabra publicidad no aparece en ninguna de las definiciones.'],
      ['Se limitan a las transacciones por Internet', 'Las definiciones 1–4 son generales; lo digital se incorpora en las definiciones de marketing digital.'],
    ], 1, cap('1', '14')),
    mc('l11-q2', 'Marketing vs. ventas', 2, 'Una pyme concluye que "hacer marketing" es lanzar promociones para vender más esta semana. Según el cuaderno, esa idea es:', [
      ['Correcta: el marketing se define por las ventas', 'El cuaderno dice expresamente que marketing no significa vender.'],
      ['Incompleta: las ventas pueden ser un objetivo, pero el marketing es un proceso de creación de valor y relación con el cliente', 'Correcto: potenciar ventas es un posible objetivo, no la definición.'],
      ['Incorrecta porque las promociones están prohibidas en marketing', 'Las promociones de ventas son uno de los 8 modos de comunicación (Cap. 5).'],
      ['Correcta si se hace por redes sociales', 'El canal no cambia la definición.'],
    ], 1, cap('1', '14')),
    mc('l11-q3', 'Marketing digital', 2, '¿Cuál de estas afirmaciones es coherente con lo que dice el cuaderno sobre marketing digital?', [
      ['Es una disciplina totalmente ajena al marketing', 'El cuaderno lo presenta como mirada ampliada del marketing o como un canal más.'],
      ['Es la aplicación de técnicas de comercialización a través de medios digitales; algunos autores lo ven como mirada ampliada y otros como un canal más', 'Correcto: recoge la definición de Shum Xie y las dos posturas citadas.'],
      ['Solo existe desde que existe la inteligencia artificial', 'No hay tal afirmación; las etapas 4.0 y 5.0 se explican por separado.'],
      ['Reemplaza el marketing tradicional en todos los casos', 'El cuaderno propone omnicanalidad (unir offline y online), no reemplazo.'],
    ], 1, cap('1', '15')),
    mc('l11-q4', 'Definición', 1, 'La definición "Proceso mediante el cual las compañías crean valor para los clientes y establecen relaciones estrechas con ellos, para recibir a cambio valor de los clientes" corresponde a:', [
      ['Kotler y Keller (2012)', 'Correcto: es la definición 4 del cuaderno.'],
      ['Maciá Domene (2018)', 'Maciá define marketing digital, no esta.'],
      ['Asociación Argentina de Marketing (2024)', 'La AAM lo define como ciencia socioeconómica.'],
      ['Shum Xie (2019)', 'Shum Xie define marketing digital.'],
    ], 0, cap('1', '14')),
    corta('l11-q5', 'Marketing vs. publicidad', 2, 'Un compañero afirma: "marketing es hacer publicidad". Refutalo usando al menos dos ideas del cuaderno.', 'El cuaderno muestra que ninguna definición menciona la publicidad: marketing es un proceso de creación y captación de valor entre dos partes para satisfacer necesidades y construir vínculos duraderos y redituables. La publicidad es solo una herramienta (una de las 8 formas de comunicación) dentro del mix de promoción.', [
      'Menciona que ninguna definición incluye la publicidad',
      'Describe el marketing como proceso de valor/necesidades/relación',
      'Ubica la publicidad como herramienta (parte de la promoción)',
    ], cap('1', '14')),
  ],
  tarjetas: [
    { id: 'l11-t1', f: '¿Cuáles son los 4 rasgos comunes de las definiciones de marketing?', b: 'Satisfacer necesidades · proceso entre al menos dos partes · vínculos duraderos, estrechos y redituables · captar y entregar valor.' },
    { id: 'l11-t2', f: 'Doble meta del marketing (Kotler y Armstrong, 2013)', b: 'Atraer nuevos clientes prometiéndoles valor superior y mantener y hacer crecer a los actuales satisfaciendo sus necesidades.' },
    { id: 'l11-t3', f: '¿Marketing es lo mismo que vender?', b: 'No. Potenciar ventas puede ser un objetivo, pero la disciplina es creación/captación de valor y relación con el cliente.' },
    { id: 'l11-t4', f: 'Dos posturas sobre el marketing digital', b: 'Es una mirada ampliada del marketing, o es un "canal más" donde ejercer la disciplina.' },
  ],
  sintesis: [
    'Marketing = proceso de valor entre partes, orientado a satisfacer necesidades y sostener relaciones.',
    'Ventas y publicidad son partes o herramientas, no el todo.',
    'Lo digital aporta retroalimentación directa y en tiempo real y vínculos más constantes.',
  ],
  conexiones: ['l1-2', 'l2-1'],
  referencias: [cap('1', '10-16')],
}
