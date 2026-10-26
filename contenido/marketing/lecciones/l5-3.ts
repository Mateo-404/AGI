import { cap, corta, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l53: Leccion = {
  id: 'l5-3',
  unidad: 5,
  titulo: 'Campañas de Ads en redes sociales',
  resumen: 'Los seis pasos de una campaña paga en Meta Ads: objetivo, presupuesto, audiencia, ubicaciones, anuncios y optimización.',
  minutos: 25,
  objetivos: [
    'Recorrer los seis pasos de una campaña de Ads en redes.',
    'Distinguir audiencias personalizadas y similares.',
    'Diferenciar alcance orgánico y pago y relacionarlo con el objetivo.',
  ],
  previos: ['l5-1', 'l4-3'],
  bloques: [
    {
      t: 'p',
      x: 'Tras definir la estrategia de contenidos, el público y el estilo de comunicación, llega el momento de **potenciar el alcance con campañas pagas**. **Meta Ads** (Facebook e Instagram), TikTok o incluso Tinder permiten segmentar audiencias, definir objetivos precisos y medir resultados. El cuaderno ilustra los pasos con **Meta Business Suite (2025)**.',
      o: cap('9', '169-170'),
    },
    {
      t: 'explorable',
      titulo: 'Seis pasos de una campaña de Ads',
      variante: 'pasos',
      nodos: [
        { id: 'p1', titulo: '1. Definir el objetivo', resumen: '¿Qué quiero lograr?', detalle: 'Meta permite elegir reconocimiento de marca, visitas al sitio, interacciones con publicaciones o ventas. El objetivo **condiciona la configuración y la optimización** y guía la medición del éxito.' },
        { id: 'p2', titulo: '2. Establecer el presupuesto', resumen: 'Cuánto y por cuánto tiempo', detalle: 'Presupuesto **diario o total**; se pueden activar o pausar los anuncios en cualquier momento, adaptándose al rendimiento o a cambios de estrategia.' },
        { id: 'p3', titulo: '3. Definir la audiencia', resumen: 'Segmentación', detalle: 'Según ubicación geográfica, intereses, comportamientos, edad, género y más. **Audiencias personalizadas** (p. ej., personas que interactuaron con nuestro perfil) y **audiencias similares** (parecidas a nuestros clientes actuales).' },
        { id: 'p4', titulo: '4. Seleccionar ubicaciones', resumen: 'Dónde se muestra', detalle: 'Selección **automática** (Meta decide las mejores ubicaciones) o **manual** según el tipo de campaña y dónde está la audiencia.' },
        { id: 'p5', titulo: '5. Diseñar los anuncios', resumen: 'Creatividad', detalle: 'Imagen, video, carrusel, texto y llamado a la acción; clara, atractiva y coherente con la identidad visual y el tono de marca; busca generar interacción y acción.' },
        { id: 'p6', titulo: '6. Monitorear y optimizar', resumen: 'Seguimiento constante', detalle: 'Desde el Administrador de Anuncios se analizan impresiones, clics, alcance y conversiones; se ajustan creatividades, segmentaciones o presupuesto en tiempo real; se generan reportes y se decide para futuras campañas.' },
      ],
      o: cap('9', '170-173', 'figs. 43 a 47'),
    },
    {
      t: 'callout',
      tipo: 'discrepancia',
      titulo: 'Sección vacía en el original',
      x: 'Al final del capítulo figura el encabezado «**Estructura de campañas y anuncios**» (p. 173) **sin contenido** en el documento inspeccionado. No se completa con conocimiento externo; se registra como tema sin desarrollo.',
      o: cap('9', '173'),
    },
    {
      t: 'comparar',
      titulo: 'Contenido orgánico y pago',
      a: { titulo: 'Orgánico', items: ['Publicaciones sin pauta; alcance depende de la plataforma y la comunidad', 'El cuaderno menciona «alcance orgánico vs. pago» como parte del estudio de cada red (p. 162)'] },
      b: { titulo: 'Pago (Ads)', items: ['Potencia el alcance con segmentación, objetivos precisos y medición', 'Se configura con objetivo, presupuesto, audiencia, ubicaciones y anuncios'] },
      o: cap('9', '162-170'),
    },
    {
      t: 'ejemplo',
      titulo: 'Campaña geolocalizada de una panadería (ejemplo didáctico)',
      pasos: [
        '**Objetivo:** que más personas del barrio hagan pedidos por WhatsApp (conversión), no solo «likes».',
        '**Presupuesto:** diario bajo, durante 2 semanas, con posibilidad de pausar si no rinde.',
        '**Audiencia:** residentes de la ciudad y barrios cercanos; intereses gastronómicos; personalizada: quienes interactuaron con el perfil; similar: parecida a los clientes actuales.',
        '**Ubicaciones:** automáticas al inicio; revisar luego dónde convierte mejor.',
        '**Anuncio:** foto real del producto, precio visible y botón para escribir por WhatsApp.',
        '**Monitoreo:** mirar clics, conversaciones iniciadas y costo por resultado; ajustar creatividad o audiencia.',
      ],
    },
  ],
  claves: ['meta-ads', 'audiencia-personalizada', 'audiencia-similar', 'ubicaciones', 'contenido-organico', 'contenido-pago'],
  preguntas: [
    mc('l53-q1', 'Campañas', 1, '¿Cuál es el primer paso de una campaña de Ads según el cuaderno?', [
      ['Diseñar el anuncio', 'Es el quinto paso.'],
      ['Definir el objetivo', 'Correcto.'],
      ['Monitorear', 'Es el último.'],
      ['Elegir la ubicación', 'Es el cuarto.'],
    ], 1, cap('9', '170')),
    mc('l53-q2', 'Audiencias', 2, 'Una audiencia de personas parecidas a tus clientes actuales es…', [
      ['Personalizada', 'Esas son quienes ya interactuaron con nosotros.'],
      ['Similar', 'Correcto.'],
      ['Orgánica', 'No es un tipo de audiencia.'],
      ['Automática', 'Se refiere a ubicaciones.'],
    ], 1, cap('9', '171')),
    mc('l53-q3', 'Presupuesto', 2, 'Respecto del presupuesto en Meta Ads, el cuaderno señala que se puede…', [
      ['Solo fijar un monto total irrevocable', 'Se puede diario o total y pausar.'],
      ['Elegir presupuesto diario o total y activar o pausar los anuncios en cualquier momento', 'Correcto.'],
      ['No limitar el gasto', 'Se define cuánto y por cuánto tiempo.'],
      ['Pagar solo en efectivo', 'No se menciona.'],
    ], 1, cap('9', '170')),
    corta('l53-q4', 'Campañas', 3, 'Elegí un objetivo de negocio y recorré los seis pasos con decisiones concretas.', 'Ej.: objetivo de ventas; presupuesto diario bajo por 15 días; audiencia local con intereses; ubicaciones automáticas; anuncio con foto, precio y botón de compra; monitoreo de conversiones y ajuste semanal.', [
      'Recorre los seis pasos en orden',
      'Las decisiones son coherentes con el objetivo',
    ], cap('9', '170-173')),
  ],
  tarjetas: [
    { id: 'l53-t1', f: 'Seis pasos de una campaña de Ads', b: 'Objetivo · presupuesto · audiencia · ubicaciones · anuncios · monitoreo y optimización.' },
    { id: 'l53-t2', f: 'Audiencia personalizada vs. similar', b: 'Personalizada: gente que interactuó con nosotros. Similar: gente parecida a nuestros clientes.' },
    { id: 'l53-t3', f: 'Ubicaciones', b: 'Automáticas (decide Meta) o manuales (según campaña y audiencia).' },
  ],
  sintesis: ['La campaña parte de un objetivo claro que condiciona todo.', 'La segmentación es el gran beneficio de la pauta paga.', 'Monitorear y optimizar es continuo.'],
  conexiones: ['l4-2', 'l4-3', 'l5-1'],
  referencias: [cap('9', '169-173')],
}
