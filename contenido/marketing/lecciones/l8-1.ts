import { cap, corta, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l81: Leccion = {
  id: 'l8-1',
  unidad: 8,
  titulo: 'Integración: del TP al plan de marketing digital',
  resumen: 'Cómo se articulan las lecciones en el Trabajo Práctico Integrador y en la escalabilidad hacia el mercado digital (Anexo 2).',
  minutos: 25,
  objetivos: [
    'Recorrer las ocho partes del TP integrador y vincular cada una con las lecciones del curso.',
    'Planificar la escalabilidad digital: diagnóstico, objetivos, funnel, POEM, estrategias y piezas con IA.',
  ],
  previos: ['l3-1', 'l5-1', 'l4-2', 'l7-2'],
  bloques: [
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Alcance de esta lección',
      x: 'El Anexo 2 del cuaderno propone un **Trabajo Práctico Integrador** intercátedra entre Marketing y comercialización y Marketing Digital. Esta lección **no resuelve el TP ni reemplaza la consigna de la cátedra**: solo ordena qué lecciones del curso sirven para cada parte, y señala qué temas requieren la bibliografía (p. ej., POEM).',
      o: cap('Anexo 2', '176-178'),
    },
    {
      t: 'tabla',
      titulo: 'Partes del TP y lecciones de apoyo',
      cab: ['Parte', 'Consigna (resumen)', 'Lecciones de apoyo'],
      filas: [
        ['**1**', 'Definir una organización (historia, colaboradores, productos, localización, perfil preliminar de clientes y una primera propuesta de valor); seleccionar marca o producto; identificar 2 competidores y analizar uno con inteligencia competitiva', '[[>l1-2|l1-2]], [[>l3-2|l3-2]]'],
        ['**2**', 'Criterios de segmentación; viaje del cliente de un segmento con puntos de dolor; análisis del posicionamiento buscado con un ejemplo', '[[>l3-3|l3-3]], [[>l3-4|l3-4]]'],
        ['**3**', 'Analizar la P de distribución (canales y logística) y la P de precio (precio actual y variantes, comparación con la competencia, descuentos, financiaciones y promociones)', '[[>l2-4|l2-4]], [[>l2-5|l2-5]]'],
        ['**4**', 'Sugerencias o mejoras tecnológicas en alguno de los puntos trabajados', '[[>l2-2|l2-2]]'],
        ['**5**', '*Escalabilidad digital:* actualizar el diagnóstico de las herramientas digitales de la organización y de la competencia (presencia en redes, sitio web, evaluaciones en Google, tipo de contenido, tono)', '[[>l3-2|l3-2]], [[>l4-3|l4-3]], [[>l5-1|l5-1]]'],
        ['**6**', 'Plan de marketing digital: (a) objetivos SMART y KPI; (b) segmentación del público y cómo acercarse por canales digitales; (c) funnel de conversión y estrategia por etapa; (d) **POEM**: qué medios se utilizarán', '[[>l3-6|l3-6]], [[>l3-4|l3-4]], [[>l2-8|l2-8]]'],
        ['**7**', 'Estrategias digitales: (a) redes sociales; (b) SEO y SEM; (c) email marketing', '[[>l5-1|l5-1]] a [[>l5-3|l5-3]], [[>l4-1|l4-1]], [[>l4-2|l4-2]], [[>l7-1|l7-1]], [[>l7-2|l7-2]]'],
        ['**8**', 'Usar herramientas de **IA** para producir **al menos 3 piezas** de contenido (jingles, placas, videos, piezas de email…), aclarando qué herramienta y cómo', '[[>l2-2|l2-2]], [[>l5-1|l5-1]]'],
      ],
      o: cap('Anexo 2', '176-178'),
    },
    {
      t: 'lista',
      items: [
        '**Grupos** de 3 a 5 integrantes (mínimo 3, máximo 5).',
        '**Formato:** presentación oral y escrita; los equipos docentes pueden hacer preguntas teóricas; se premia la presentación creativa.',
        '**Tiempo:** 15 minutos (capacidad de síntesis).',
        '**Entrega:** copia del trabajo por mail a los equipos docentes; aclarar qué herramienta se usó y de qué manera.',
        '**Importante:** quien no cursó Marketing y comercialización debe usar un **caso de base** (uno de los trabajados para el cuaderno o del repositorio) para aplicar la escalabilidad digital.',
      ],
      o: cap('Anexo 2', '178'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Un hilo conductor para integrar',
      x: 'Una forma de leer todo el curso: **valor** (U1) → **mix y consumidor** (U2) → **plan, segmentación y journey** (U3) → **canales de adquisición**: SEO/SEM (U4), redes (U5) y email (U7) → **conversión en e-commerce** (U6) → **medición con KPI** para volver a ajustar el plan. Es una síntesis didáctica.',
    },
    {
      t: 'caso',
      titulo: 'Escalar un negocio al mundo digital: ¿por dónde empezar?',
      escenario: 'Un negocio familiar de panificados vende en mostrador y por mensajes. Quiere pasar a un plan digital con poco presupuesto. Debe decidir el orden de las acciones.',
      pasos: [
        {
          pregunta: 'Antes de lanzar publicidad, ¿qué corresponde hacer primero según la lógica del plan?',
          opciones: [
            { x: 'Actualizar el diagnóstico de situación y de competencia digital', ok: true, consecuencia: 'Permite fundar objetivos y detectar oportunidades (partes 5 y 1 del TP).' },
            { x: 'Pagar campañas en Meta cuanto antes', ok: false, consecuencia: 'Sin diagnóstico ni objetivos se gasta sin saber qué medir.' },
          ],
        },
        {
          pregunta: 'Con el diagnóstico hecho, ¿cómo definir los objetivos?',
          opciones: [
            { x: 'SMART con KPI: p. ej., aumentar los pedidos por canal propio un 25 % en 3 meses', ok: true, consecuencia: 'Se pueden medir CTR, conversión y pedidos para ajustar.' },
            { x: '«Tener más presencia digital»', ok: false, consecuencia: 'Sin medida ni plazo, no se puede evaluar el éxito.' },
          ],
        },
        {
          pregunta: 'Para elegir canales (POEM), ¿qué combinación respeta la lógica pago/propio/ganado?',
          opciones: [
            { x: 'Reforzar medios propios (perfil, catálogo, email), pauta pagada puntual y fomentar reseñas', ok: true, consecuencia: 'Combina control, alcance y confianza de pares.' },
            { x: 'Solo pauta paga', ok: false, consecuencia: 'Depende del gasto y no construye activos propios.' },
          ],
        },
      ],
    },
  ],
  claves: ['plan-marketing', 'poem', 'objetivos-smart', 'embudo', 'ia'],
  preguntas: [
    mc('l81-q1', 'TP', 1, '¿Cuál es el tamaño de grupo que establece el Anexo 2 para el TP?', [
      ['1 o 2 integrantes', 'No es la consigna.'],
      ['De 3 a 5 integrantes', 'Correcto: «grupos de hasta 5 integrantes y mínimo 3».'],
      ['De 6 a 10', 'No.'],
      ['Sin límite', 'Hay límites.'],
    ], 1, cap('Anexo 2', '178')),
    mc('l81-q2', 'TP', 2, 'En la Parte 8 del TP se debe…', [
      ['Escribir solo teoría', 'Se piden piezas.'],
      ['Usar IA para producir al menos 3 piezas de contenido y aclarar la herramienta y cómo se usó', 'Correcto.'],
      ['Comprar publicidad', 'No se pide.'],
      ['Presentar un balance', 'No se pide.'],
    ], 1, cap('Anexo 2', '177-178')),
    mc('l81-q3', 'Integración', 3, 'Quien no cursó Marketing y comercialización debe…', [
      ['No hacer el TP', 'Debe hacerlo.'],
      ['Usar un caso base (del cuaderno o del repositorio) para aplicar la escalabilidad digital', 'Correcto.'],
      ['Elegir cualquier empresa sin diagnóstico', 'Se requiere un caso base.'],
      ['Reemplazarlo por un examen', 'No se menciona.'],
    ], 1, cap('Anexo 2', '178')),
    corta('l81-q4', 'Integración', 3, 'Armá un mini-plan de 5 líneas que vincule objetivo SMART, funnel y tres canales (SEO/SEM, redes y email) para una librería.', 'Objetivo: aumentar un 30 % las ventas online en 4 meses. Funnel: atraer (SEO/redes), captar leads (suscripción al newsletter), convertir (tienda y email). SEO: optimizar fichas; SEM: Shopping con feed; Redes: contenido y Ads geolocalizados; Email: secuencia de bienvenida y recordatorio de carrito. KPI: CTR, tasa de conversión y costo por conversión.', [
      'Objetivo SMART con KPI',
      'Estrategia por etapa del funnel',
      'Tres canales coherentes',
    ], cap('Anexo 2', '177')),
  ],
  tarjetas: [
    { id: 'l81-t1', f: 'Escalabilidad digital (Anexo 2)', b: 'Partes 5 a 8: diagnóstico digital, plan (objetivos SMART, KPI, funnel, POEM), estrategias (redes, SEO/SEM, email) y piezas con IA.' },
    { id: 'l81-t2', f: 'Consideraciones del TP', b: 'Grupos de 3 a 5, presentación oral y escrita de 15 minutos, copia por mail, aclarar herramientas de IA.' },
  ],
  sintesis: ['El TP articula todas las unidades.', 'Primero diagnóstico y objetivos, luego canales y medición.', 'POEM debe estudiarse con la bibliografía.'],
  conexiones: ['l3-1', 'l3-6', 'l7-2'],
  referencias: [cap('Anexo 2', '176-178')],
}
