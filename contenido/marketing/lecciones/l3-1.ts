import { cap, corta, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l31: Leccion = {
  id: 'l3-1',
  unidad: 3,
  titulo: 'El plan de marketing',
  resumen: 'Qué es, para qué sirve y cuáles son sus cuatro etapas; con el ejemplo integrador de una distribuidora de Rafaela.',
  minutos: 30,
  objetivos: [
    'Definir el plan de marketing y justificar su importancia.',
    'Enumerar las etapas del plan y los elementos que todo modelo contiene.',
    'Explicar por qué el cuaderno dice que lo importante es el proceso y no el documento.',
  ],
  previos: ['l1-4'],
  bloques: [
    {
      t: 'p',
      x: 'El plan de marketing es **una herramienta que ayuda a articular todos los procesos necesarios para alcanzar el objetivo deseado**. Una buena planificación minimiza el riesgo previsto y ayuda a proyectar lo que se quiere alcanzar.',
      o: cap('2', '38', 'El plan de marketing'),
    },
    {
      t: 'tabla',
      titulo: 'Dos definiciones',
      cab: ['Definición', 'Autoría (como la cita el cuaderno)'],
      filas: [
        ['Documento escrito en el que, de forma sistemática y estructurada y tras los análisis y estudios correspondientes, se definen los objetivos a conseguir en un período determinado y se detallan los programas y medios de acción precisos para alcanzarlos en el plazo previsto.', 'Sanz de la Tajada (1974)'],
        ['Documento escrito de contenido sistematizado y estructurado que define claramente los campos de responsabilidad de la función de marketing y posibilita el control de la gestión comercial y de marketing.', 'Sainz de Vicuña (2024)'],
      ],
      o: cap('2', '38'),
    },
    {
      t: 'callout',
      tipo: 'ia',
      titulo: 'Un ejemplo de uso crítico de la IA',
      x: 'El equipo docente pidió a una IA los puntos en común de ambas definiciones. Coincidió en: **documento escrito, estructura y sistematización, objetivos y responsabilidades**. Agregó que ambas implican **período de tiempo** y **control y seguimiento** aunque no siempre lo digan. El cuaderno pregunta si estamos de acuerdo con las dos últimas reflexiones y recuerda: la IA produce contenido propio pero **no necesariamente correcto**. Además vincula el control con la **mejora continua** (Administración y diseño de procesos).',
      o: cap('2', '38-40'),
    },
    {
      t: 'lista',
      items: [
        'Determina cursos de acción para **conquistar, mantener y desarrollar mercados** (planifica, fija objetivos y plazos).',
        'Es una **base sólida para compartir** con otras áreas porque es un documento escrito.',
        '**Identifica oportunidades**: parte de la estrategia.',
        'Es **participativo**: define responsabilidades.',
      ],
      o: cap('2', '40', 'por qué es importante'),
    },
    {
      t: 'p',
      x: 'Es **flexible**: puede aplicarse a la disciplina tradicional o 100 % a lo digital, y a toda la organización, una unidad de negocios, una línea de productos o incluso un producto.',
      o: cap('2', '40'),
    },
    { t: 'h', x: 'Etapas del plan' },
    {
      t: 'p',
      x: 'No existe un modelo ideal: depende del negocio, los clientes, las prácticas de la competencia, la cultura y el momento de la organización. Sí hay elementos que **todos los modelos de organizaciones orientadas al mercado contienen**: descripción de la situación, objetivos, estrategias y proyección de resultados. Las cátedras siguen una secuencia que combina autores y **suma el concepto de oportunidad**:',
      o: cap('2', '40-41'),
    },
    {
      t: 'explorable',
      titulo: 'Las cuatro etapas del plan (secuencia de la cátedra)',
      variante: 'pasos',
      nodos: [
        { id: 'e1', titulo: '1. Análisis de la situación inicial', resumen: 'Punto de partida', detalle: 'Se describe la situación actual y por qué no es satisfactoria: misión, visión, valores, esencia de la marca, competencia… en relación con el entorno, el mercado y la competencia. Incluye análisis del mercado, del sector y de la competencia (ver l3-2).' },
        { id: 'e2', titulo: '2. Público objetivo', resumen: 'Segmentación y viaje del cliente', detalle: 'Definir el segmento de público sobre el que se enfocan las estrategias: se hace un proceso de segmentación y se estructura el viaje del cliente (Cap. 3 y 4).' },
        { id: 'e3', titulo: '3. Objetivos', resumen: '¿Dónde queremos estar?', detalle: 'Objetivos de marketing en función de los de la organización; pueden incluir una visión y objetivos numéricos para canales digitales. Se formulan con estructura **SMART** y se definen **KPI**. De ellos dependen medios, estrategias, recursos, inversión y plazo.' },
        { id: 'e4', titulo: '4. Estrategia de marketing', resumen: 'Planes de acción', detalle: 'Planes de acción para operativizar el cumplimiento de los objetivos: marketing mix (Cap. 5).' },
      ],
      o: cap('2', '41-45'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Lo importante es el proceso',
      x: '«Lo importante de la planificación no es el plan en sí, sino el proceso»: lleva al equipo a una **reflexión estratégica** y a un conocimiento más exhaustivo de la propia realidad. También: aunque no exista un área de marketing, **se puede** hacer un plan (pregunta de reflexión).',
      o: cap('2', '45-47'),
    },
    { t: 'h', x: 'Ejemplo integrador: distribuidora de bebidas y comestibles de Rafaela' },
    {
      t: 'ejemplo',
      titulo: 'Desde la propuesta de valor hasta el público objetivo',
      pasos: [
        '**Propuesta de valor:** «ser generadores de buenos momentos».',
        '**Misión:** ser generadores de buenos momentos. **Visión:** expandir las unidades de negocio de forma consolidada, ofreciendo servicios a nivel regional, y potenciar la identidad de marca. **Valores:** integridad, vocación por el servicio, trabajo en equipo, profesionalismo, pasión, innovación constante, respeto.',
        '**Análisis interno:** a nivel estratégico (FODA interno-directorio-clientes, variables controlables 4P, stakeholders) y a nivel de marketing (estrategias actuales, efectividad de campañas pasadas, recursos). **Análisis del contexto:** PESTEL (variables no controlables: político, legal, económico, tecnológico, etc.) y análisis de la competencia.',
        '**Público objetivo:** B2B (empresas; kioscos, almacenes y barrios; eventos, bares, boliches; mayoristas; franquicias) y B2C (sucursales; delivery).',
        '**Objetivo general del plan:** desarrollar una estrategia de marketing 360° para todos los clientes identificados.',
      ],
      o: cap('2', '45-47', 'Tablas 2, 3 y 4'),
    },
    {
      t: 'callout',
      tipo: 'ampliacion',
      titulo: 'Plan «de marketing digital»',
      x: 'El programa pide «estructura y etapas de un plan de marketing **digital**». El cuaderno usa la misma estructura de 4 etapas y marca, en cada una, qué herramientas son digitales (l3-2) y cómo escalar el plan en el Anexo 2 (partes 5 a 8; ver [[>l8-1|l8-1]]). Para un tratamiento específico del plan digital, el programa remite a Chaffey y Ellis-Chadwick (2015, Cap. 4), Maciá (2018) y Coto (2008), que este curso no reemplaza.',
      o: cap('2', '40-41'),
    },
  ],
  claves: ['plan-marketing', 'objetivos-smart', 'kpi', 'mision-vision', 'oportunidad', 'mejora-continua'],
  preguntas: [
    mc('l31-q1', 'Plan', 1, 'Según el cuaderno, ¿qué elementos contienen invariablemente todos los modelos de plan de organizaciones orientadas al mercado?', [
      ['Solo presupuesto', 'No es el listado del cuaderno.'],
      ['Descripción de la situación, objetivos, estrategias y proyección de resultados', 'Correcto.'],
      ['Misión, visión y valores únicamente', 'Son parte del análisis inicial, no los cuatro elementos.'],
      ['Organigrama y manual de procesos', 'No están en el listado.'],
    ], 1, cap('2', '40')),
    mc('l31-q2', 'Plan', 2, 'El concepto que la cátedra agrega a la secuencia de etapas respecto de otros modelos es…', [
      ['Rentabilidad', 'No es el concepto señalado.'],
      ['Oportunidad', 'Correcto: «no todos incluyen el concepto de oportunidad».'],
      ['Logística', 'No lo es.'],
      ['Franquicia', 'No lo es.'],
    ], 1, cap('2', '41')),
    mc('l31-q3', 'Plan', 2, 'La etapa 3 del plan (objetivos) se caracteriza por…', [
      ['Formularlos con estructura SMART y definir KPI', 'Correcto.'],
      ['Elegir exclusivamente medios de comunicación', 'Eso depende de los objetivos.'],
      ['Describir la competencia', 'Es parte de la etapa 1.'],
      ['Ejecutar las acciones', 'Es operativo; la etapa 4 define las estrategias.'],
    ], 0, cap('2', '45')),
    mc('l31-q4', 'Plan', 3, 'Una pyme sin área de marketing pregunta si le sirve armar un plan. La respuesta coherente con el cuaderno es:', [
      ['No: es solo para grandes empresas', 'El cuaderno dice que se aplica a toda la organización, a una unidad, línea o incluso un producto.'],
      ['Sí: es flexible y su valor está en el proceso de reflexión estratégica', 'Correcto.'],
      ['Solo si es digital', 'Puede ser tradicional o 100 % digital.'],
      ['Solo con una agencia', 'No lo dice el cuaderno.'],
    ], 1, cap('2', '40')),
    corta('l31-q5', 'Plan', 2, 'Enumerá las cuatro etapas del plan y explicá qué se decide en cada una.', '1) Análisis de la situación inicial (punto de partida: mercado, sector, competencia). 2) Público objetivo (segmentación y viaje del cliente). 3) Objetivos (SMART y KPI). 4) Estrategia (planes de acción/marketing mix).', [
      'Menciona las 4 etapas en orden',
      'Explica brevemente cada una',
    ], cap('2', '41-45')),
  ],
  tarjetas: [
    { id: 'l31-t1', f: 'Plan de marketing: definición', b: 'Documento escrito, sistemático y estructurado que define objetivos, programas y medios en un plazo, define responsabilidades y permite controlar la gestión.' },
    { id: 'l31-t2', f: 'Etapas del plan (cátedra)', b: '1 análisis de la situación inicial · 2 público objetivo · 3 objetivos (SMART/KPI) · 4 estrategia.' },
    { id: 'l31-t3', f: '¿Por qué es importante el plan?', b: 'Fija cursos de acción, se comparte con otras áreas por escrito, identifica oportunidades y define responsabilidades.' },
    { id: 'l31-t4', f: 'Lo importante de planificar', b: 'No es el plan en sí sino el proceso de reflexión estratégica.' },
  ],
  sintesis: ['El plan articula análisis, objetivos y acciones.', 'Cuatro etapas con foco en la oportunidad.', 'Es flexible: tradicional o digital, para una organización o un producto.'],
  conexiones: ['l3-2', 'l3-6', 'l8-1'],
  referencias: [cap('2', '36-47')],
}
