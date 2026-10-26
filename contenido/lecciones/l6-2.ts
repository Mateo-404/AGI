import { cap, corta, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l62: Leccion = {
  id: 'l6-2',
  unidad: 6,
  titulo: 'Modelos de negocio digital: marketplace vs. tienda propia',
  resumen: 'Dropshipping, afiliación, membresía, marketplace y tienda online con sus ventajas y desventajas.',
  minutos: 40,
  objetivos: [
    'Describir cinco modelos de negocio de e-commerce con ventajas y desventajas.',
    'Diferenciar e-commerce (tienda propia) y marketplace.',
    'Elegir un modelo para un caso justificando la decisión.',
  ],
  previos: ['l6-1'],
  bloques: [
    {
      t: 'p',
      x: 'La clasificación **según el modelo de negocio** considera cómo se organiza la empresa para ofrecer valor, gestionar recursos y llegar a los consumidores por canales digitales. Cada modelo define cómo se generan ingresos, se gestiona el inventario, se hace la logística y se establece la relación con el cliente.',
      o: cap('7', '132'),
    },
    {
      t: 'explorable',
      titulo: 'Cinco modelos de negocio',
      variante: 'pasos',
      nodos: [
        { id: 'drop', titulo: 'Dropshipping', resumen: 'Vender sin stock propio', detalle: 'La experiencia del cliente es la de cualquier e-commerce, pero el vendedor **no posee stock ni envía**: es intermediario y un tercero (proveedor o fabricante) gestiona inventario y logística. *Ventajas:* baja inversión inicial, escalabilidad, logística externalizada. *Desventajas:* alta **dependencia del proveedor** (un problema de stock o entrega afecta tu reputación), menor control de calidad y tiempos, márgenes reducidos, dificultad de diferenciación. Ideal para validar una idea con bajo riesgo.' },
        { id: 'afil', titulo: 'Afiliación', resumen: 'Comisión por resultados', detalle: 'Personas o empresas promocionan productos de terceros en sus canales (sitios, blogs, redes, newsletters) y **cobran una comisión por cada acción** (venta, clic o registro). La plataforma intermedia: ofrece el catálogo, genera los enlaces de seguimiento y paga las comisiones. *Ventajas:* visibilidad en buscadores (enlaces externos → SEO off page), flexibilidad, reconocimiento de marca, bajo riesgo (se paga por rendimiento). *Riesgos:* imagen dañada por afiliados engañosos, **canibalización** (comisiones por ventas que habrían ocurrido igual), comisiones altas que reducen márgenes y necesidad de controlar fraudes y coherencia del mensaje.' },
        { id: 'memb', titulo: 'Membresía / suscripción', resumen: 'Pago periódico', detalle: 'Compras recurrentes (semanal, mensual, bimestral, anual): vínculo sostenido, **previsibilidad de ingresos**. Popular con las «cajas sorpresa»; presente en Netflix, Spotify, YouTube Premium y en diarios (Clarín, La Nación y El Cronista usan membresía; Infobae y Ámbito ofrecen contenido gratuito). Clave: **valor sostenido** y relación personalizada para **reducir la tasa de cancelación**.' },
        { id: 'mkt', titulo: 'Marketplace', resumen: 'Múltiples vendedores en una plataforma', detalle: 'Plataformas que agrupan vendedores (Mercado Libre, Amazon, AliExpress, PedidosYa); cobran **comisión** por venta o servicios. *Ventajas:* alta visibilidad y tráfico masivo, confianza ya construida, logística, medios de pago y atención al cliente facilitados. *Desafíos:* **pérdida de control de la experiencia de marca**, competencia intensa (sobre todo en precio → márgenes), exigencia de operación constante y respuestas rápidas. Buena forma de empezar o llegar a nuevas audiencias; como canal principal, evaluarlo con cautela si se busca marca propia.' },
        { id: 'tienda', titulo: 'Tienda online propia', resumen: 'Una sola marca', detalle: 'Tienda exclusiva de una empresa que vende solo sus productos/servicios. *Ventajas:* **control total** y personalización (diseño, medios de pago, promociones, todo el viaje del usuario), posicionamiento de marca, **relación directa** con consumidores y acceso a métricas. *Desafíos:* mayores esfuerzos operativos, tiempo, inversión y diferenciación. Formas: desarrollo a medida, soluciones preconfiguradas o plataformas (Shopify, WooCommerce, Magento).' },
      ],
      o: cap('7', '132-137', 'figs. 28 y 29'),
    },
    {
      t: 'tabla',
      titulo: 'Marketplace vs. tienda online propia',
      cab: ['Criterio', 'Marketplace', 'Tienda online propia'],
      filas: [
        ['Visibilidad inicial', 'Alta: tráfico masivo y confianza del público', 'Hay que construirla (SEO, SEM, redes)'],
        ['Control de marca y experiencia', 'Bajo: depende de la plataforma', 'Total'],
        ['Competencia dentro del canal', 'Intensa, sobre todo en precio', 'Depende de tu diferenciación'],
        ['Logística, pagos y atención', 'La plataforma suele facilitarlos', 'Los gestionás vos (o con integraciones)'],
        ['Relación con el cliente y datos', 'Mediada por la plataforma', 'Directa; métricas propias'],
        ['Costo', 'Comisión por venta/servicios', 'Inversión y esfuerzo operativo mayores'],
      ],
      o: cap('7', '136-137'),
    },
    {
      t: 'tabla',
      titulo: 'Requisitos de una tienda online (técnicos y funcionales)',
      cab: ['Características técnicas', 'Requisitos funcionales'],
      filas: [
        ['Gestión integral de pedidos · medios de pago seguros · análisis e informes administrativos · personalización de ofertas · política de devoluciones eficiente · flexibilidad en el checkout', 'Escalabilidad · integración con otros canales (omnicanalidad) · seguridad · estabilidad · rendimiento · catálogo dinámico · diseño intuitivo y buena usabilidad · opciones de internacionalización'],
      ],
      o: cap('7', '137'),
    },
    {
      t: 'caso',
      titulo: '¿Qué modelo conviene? Una panadería que vende solo por Instagram y WhatsApp',
      escenario: 'Una panadería familiar quiere vender online. Hoy los pedidos llegan por mensaje y se saturan; ya usa una plataforma de delivery de terceros. ¿Cómo decidir el siguiente paso?',
      pasos: [
        {
          pregunta: 'Para evitar la saturación de mensajes y sumar autogestión, ¿qué canal conviene priorizar?',
          opciones: [
            { x: 'Una tienda o catálogo online propio', ok: true, consecuencia: 'Permite consultar productos, elegir entrega y comprar de forma autónoma; da relación directa y datos (aunque exige más esfuerzo operativo).' },
            { x: 'Dropshipping de panificados de otro proveedor', ok: false, consecuencia: 'Pierde el diferencial artesanal y depende de un tercero: choca con la propuesta de valor.' },
            { x: 'Dejar solo el marketplace de delivery', ok: false, consecuencia: 'Da visibilidad pero resta control de marca y deja márgenes y datos en manos de la plataforma.' },
          ],
        },
        {
          pregunta: 'Para ampliar el alcance sin perder la marca, ¿cómo conviene tratar el marketplace actual?',
          opciones: [
            { x: 'Mantenerlo como canal complementario, evaluando comisiones y márgenes', ok: true, consecuencia: 'Aprovecha su tráfico y confianza sin depender de él como canal principal.' },
            { x: 'Abandonarlo inmediatamente', ok: false, consecuencia: 'Se pierde visibilidad y pedidos mientras la tienda propia aún no tiene tráfico.' },
          ],
        },
      ],
    },
    {
      t: 'asociar',
      titulo: 'Asociá la desventaja con el modelo',
      pares: [
        ['Dependencia del proveedor y márgenes reducidos', 'Dropshipping'],
        ['Canibalización de ventas y riesgo para la imagen de marca', 'Afiliación'],
        ['Mantener un valor que justifique el pago continuo y evitar cancelaciones', 'Suscripción'],
        ['Pérdida de control de la experiencia de marca y competencia en precio', 'Marketplace'],
      ],
    },
  ],
  claves: ['dropshipping', 'afiliacion', 'suscripcion', 'marketplace', 'tienda-online', 'canibalizacion', 'tasa-cancelacion'],
  preguntas: [
    mc('l62-q1', 'Modelos', 1, 'En el dropshipping, el vendedor…', [
      ['Posee el stock y hace el envío', 'Eso sería una tienda tradicional.'],
      ['No posee stock ni envía: un tercero gestiona inventario y logística', 'Correcto.'],
      ['Cobra comisión por derivar tráfico', 'Eso es afiliación.'],
      ['Cobra una cuota mensual al cliente', 'Eso es suscripción.'],
    ], 1, cap('7', '132-133')),
    mc('l62-q2', 'Afiliación', 2, 'Una de las desventajas de la afiliación es…', [
      ['Alto riesgo financiero', 'Se paga por rendimiento: bajo riesgo.'],
      ['La canibalización: pagar comisión por ventas que habrían ocurrido igual', 'Correcto.'],
      ['No genera enlaces', 'Genera enlaces externos (SEO off page).'],
      ['No requiere control', 'Sí requiere un sistema de control.'],
    ], 1, cap('7', '134-135')),
    mc('l62-q3', 'Marketplace', 2, '¿Qué desafío principal enfrenta un vendedor que depende de un marketplace?', [
      ['Falta total de tráfico', 'Tienen tráfico masivo.'],
      ['Pérdida de control sobre la experiencia de marca y competencia intensa en precios', 'Correcto.'],
      ['No puede cobrar', 'Sí puede.'],
      ['No tiene logística disponible', 'Suele facilitarla.'],
    ], 1, cap('7', '136')),
    mc('l62-q4', 'Suscripción', 3, 'La clave del éxito del modelo de suscripción es…', [
      ['El mayor precio posible', 'No lo dice.'],
      ['Ofrecer valor sostenido y una relación personalizada para reducir la tasa de cancelación', 'Correcto.'],
      ['Eliminar el contacto con el cliente', 'Es lo contrario.'],
      ['Compras únicas', 'La suscripción es recurrente.'],
    ], 1, cap('7', '135-136')),
    corta('l62-q5', 'Elección de modelo', 3, 'Para una marca nueva que quiere construir identidad propia, ¿qué rol le darías al marketplace y a la tienda propia? Justificá.', 'Marketplace como canal para ganar visibilidad y confianza inicial con poca inversión, evaluando comisiones y competencia en precio; tienda propia como canal central para controlar la experiencia, construir marca y obtener datos de clientes, con inversión y diferenciación sostenidas.', [
      'Reconoce ventajas y límites del marketplace',
      'Reconoce el valor de la tienda propia para marca y datos',
      'Justifica una combinación',
    ], cap('7', '136-137')),
  ],
  tarjetas: [
    { id: 'l62-t1', f: 'Dropshipping', b: 'Vendés sin stock ni envío; un tercero gestiona logística. Baja inversión pero alta dependencia y márgenes reducidos.' },
    { id: 'l62-t2', f: 'Afiliación', b: 'Terceros promocionan tus productos y cobran comisión por acción; riesgos: imagen y canibalización.' },
    { id: 'l62-t3', f: 'Suscripción', b: 'Pago periódico; ingresos previsibles; clave: valor sostenido y baja cancelación.' },
    { id: 'l62-t4', f: 'Marketplace', b: 'Plataforma con múltiples vendedores; alta visibilidad y confianza; menos control de marca; cobra comisión.' },
    { id: 'l62-t5', f: 'Tienda online propia', b: 'Control total de la experiencia y datos; mayor esfuerzo y necesidad de diferenciación.' },
  ],
  sintesis: ['Cada modelo cambia ingresos, stock, logística y relación con el cliente.', 'El marketplace da alcance; la tienda propia da control.', 'Elegir implica equilibrar visibilidad, control y esfuerzo.'],
  conexiones: ['l6-3', 'l2-6', 'l4-2'],
  referencias: [cap('7', '132-137')],
}
