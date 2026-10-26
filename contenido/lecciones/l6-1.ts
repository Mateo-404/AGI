import { cap, corta, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l61: Leccion = {
  id: 'l6-1',
  unidad: 6,
  titulo: 'E-business y e-commerce: miradas comercial y de plataforma',
  resumen: 'Qué es el comercio electrónico, en qué se diferencia de e-business y cómo clasificarlo por quién vende/compra y por plataforma.',
  minutos: 30,
  objetivos: [
    'Definir e-commerce y e-business y distinguirlos.',
    'Clasificar un caso según la mirada comercial (B2B, B2C, G2C, C2G, B2E…).',
    'Comparar plataformas open source, on-premises y SaaS.',
  ],
  previos: ['l2-5'],
  bloques: [
    {
      t: 'p',
      x: 'El cuaderno plantea que el objetivo de comunicar suele ser **generar una conversión**: el proceso de venta digital transforma visitas en compras garantizando una experiencia fluida, segura y confiable; la comunicación es un medio estratégico, no un fin en sí mismo.',
      o: cap('7', '127'),
    },
    {
      t: 'def',
      termino: 'Comercio electrónico (e-commerce)',
      x: '«Las transacciones financieras y de información realizadas de manera electrónica entre una organización y cualquier tercero» (Chaffey, 2014, p. 20).',
      o: cap('7', '128'),
    },
    {
      t: 'def',
      termino: 'E-business',
      x: 'La **gestión del proceso completo** para gestionar un negocio digital: administración de transacciones de venta en línea, promoción on y offline de la venta online, actividades **offline derivadas** de las transacciones en línea y actividades derivadas de la venta online como el **servicio postventa** y la **atención al cliente**. **E-commerce y e-business no son lo mismo**: el segundo incluye al primero y más.',
      o: cap('7', '128'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Datos del estudio anual de la CACE (2024) que cita el cuaderno',
      x: 'Crecimiento de la facturación interanual del **181 %**; crecimiento anual del **5 %** del total de órdenes; **más de 504 millones de unidades** vendidas (+3 %); **6 de cada 10** consumidores compran online al menos una vez al mes; se sumaron **más de medio millón de nuevos compradores**. *Nota didáctica:* el cuaderno no aclara si el 181 % es nominal o real; con +5 % de órdenes y +3 % de unidades, la lectura más probable es que refleje precios en un contexto inflacionario (interpretación nuestra).',
      o: cap('7', '128'),
    },
    {
      t: 'p',
      x: 'La conclusión del cuaderno: la pregunta clave no es si hay que explotar la tecnología de Internet —las organizaciones no tienen elección si quieren seguir siendo competitivas— sino **cómo explotarla**.',
      o: cap('7', '128'),
    },
    {
      t: 'explorable',
      titulo: 'Las tres miradas del e-commerce (figura 24)',
      variante: 'pasos',
      nodos: [
        { id: 'm1', titulo: 'Mirada comercial', resumen: 'Quién vende y quién compra', detalle: 'B2B y B2C como modelos principales; menos populares: G2C, C2G y B2E.' },
        { id: 'm2', titulo: 'Mirada de plataforma', resumen: 'Dónde se aloja la tienda', detalle: 'Open source, on-premises y SaaS.' },
        { id: 'm3', titulo: 'Mirada del modelo de negocio', resumen: 'Cómo se organiza la empresa para ofrecer valor', detalle: 'Dropshipping, afiliación, membresía/suscripción, marketplace y tienda online (ver l6-2).' },
      ],
      o: cap('7', '129', 'fig. 24'),
    },
    { t: 'h', x: 'Mirada comercial' },
    {
      t: 'tabla',
      titulo: 'Clasificación según quién ofrece y quién recibe (Chaffey, 2014; fig. 25 transcripta)',
      cab: ['Del proveedor ↓ / al consumidor →', 'Consumidor o ciudadano', 'Negocio / organización', 'Gobierno'],
      filas: [
        ['**Consumidor o ciudadano**', 'C2C: eBay, foros, blogs, comunidades, recomendaciones de productos', 'C2B: Priceline, retroalimentación del consumidor, comunidades o campañas', 'C2G: retroalimentación al gobierno a través de grupos de presión o individuos'],
        ['**Negocio / organización**', 'B2C: Amazon (transaccional), creación de relaciones, intermediarios de comparaciones', 'B2B: Eurofic (transaccional), creación de relaciones, propietarios de medios, mercados B2B, redes sociales (LinkedIn)', 'B2G: retroalimentación a empresas gubernamentales y organizaciones no gubernamentales'],
        ['**Gobierno**', 'G2C: transacciones y servicios de gobierno nacional y local', 'G2B: servicios y transacciones gubernamentales (impuestos), normas legales', 'G2G: servicios entre gobiernos, intercambio de información'],
      ],
      o: cap('7', '129-130', 'fig. 25'),
    },
    {
      t: 'p',
      x: 'Plataformas de ejemplo (fig. 26): **B2C**: Tiendanube, PrestaShop, Shopify, WooCommerce, BigCommerce, Magento, VTEX, IBM, Oracle Commerce, SAP Hybris, Salesforce Commerce Cloud. **B2B**: Insite, OroCommerce, CloudCraze, NetSuite, Magento, SAP Hybris, IBM, Oracle Commerce.',
      o: cap('7', '130', 'fig. 26'),
    },
    {
      t: 'callout',
      tipo: 'discrepancia',
      titulo: 'Ojo con la figura 25',
      x: 'La figura transcripta contiene rótulos del original en inglés/abreviados (p. ej., «Eurofic»); se reproducen tal como figuran. El texto del cuaderno solo detalla B2B, B2C y menciona G2C, C2G y B2E (empresa a empleado/a): **B2E no figura en la figura**.',
      o: cap('7', '129'),
    },
    { t: 'h', x: 'Mirada de plataforma' },
    {
      t: 'tabla',
      titulo: 'Open source, on-premises y SaaS',
      cab: ['Tipo', 'Cómo funciona', 'Ventajas / riesgos señalados', 'Ejemplos'],
      filas: [
        ['**Open source** (código abierto)', 'Cualquier persona puede ejecutar los programas, estudiar el código y adaptarlo; producción colaborativa en comunidades', 'Costos directos iniciales menores, pero exige un **equipo interno** de mantenimiento y evolución (altos costos de tecnología) y riesgo de **obsolescencia** sin inversión constante', 'WooCommerce, PrestaShop'],
        ['**On-premises** (servidores propios)', 'La empresa **compra la licencia** y es propietaria del código; lo instala en su servidor y contrata hosting e infraestructura', 'Usada por grandes empresas; gran inversión en equipo de tecnología; mismo riesgo de obsolescencia', 'Magento (Adobe Commerce), Odoo Commerce (ambos tienen versiones open source)'],
        ['**SaaS** (software as a service)', 'La propiedad intelectual es del proveedor; la empresa **alquila** el software y servicios; infraestructura y hosting incluidos', 'No hay acceso al código ni personalización total, pero **evoluciona de forma uniforme** y las actualizaciones las hace el proveedor, con mayor capacidad de inversión', 'Shopify, Tienda Nube, EmpreTienda'],
      ],
      o: cap('7', '131-132', 'fig. 27'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Hosting (nota 10)',
      x: 'El hosting o alojamiento web es el servicio que permite que un sitio esté accesible en Internet: el espacio donde se aloja la plataforma. Elegirlo bien exige considerar rendimiento, seguridad, escalabilidad y costo.',
      o: cap('7', '131', 'nota 10'),
    },
    {
      t: 'clasificar',
      titulo: '¿Qué tipo de plataforma?',
      categorias: ['Open source', 'On-premises', 'SaaS'],
      items: [
        { x: 'Una pyme alquila su tienda y el proveedor actualiza el sistema y aloja la infraestructura', cat: 2, porque: 'Software alquilado, infraestructura y hosting del proveedor.' },
        { x: 'Una gran empresa compra la licencia, es dueña del código y lo instala en servidores propios', cat: 1, porque: 'Licencia propia e instalación on-premises.' },
        { x: 'Un equipo interno adapta el código abierto de una plataforma con apoyo de la comunidad', cat: 0, porque: 'Código abierto adaptable.' },
      ],
    },
  ],
  claves: ['ecommerce', 'ebusiness', 'b2b', 'b2c', 'g2c', 'open-source', 'on-premises', 'saas', 'hosting'],
  preguntas: [
    mc('l61-q1', 'E-commerce vs. e-business', 1, 'La atención al cliente y el servicio postventa derivados de la venta online forman parte de…', [
      ['Solo el e-commerce', 'El e-commerce son las transacciones.'],
      ['El e-business', 'Correcto: incluye actividades derivadas de la venta online.'],
      ['El SEO', 'No.'],
      ['El dropshipping', 'No.'],
    ], 1, cap('7', '128')),
    mc('l61-q2', 'Mirada comercial', 2, 'Un ciudadano que paga un impuesto online realiza una transacción…', [
      ['B2C', 'No es una empresa que vende al consumidor.'],
      ['G2C (gobierno a consumidor)', 'Correcto: el gobierno ofrece el servicio.'],
      ['C2C', 'No es entre consumidores.'],
      ['B2B', 'No.'],
    ], 1, cap('7', '129-130')),
    mc('l61-q3', 'Plataforma', 2, 'Una pyme sin equipo técnico que quiere una tienda que se actualice sola elige probablemente…', [
      ['Open source', 'Exige equipo interno de mantenimiento.'],
      ['On-premises', 'Requiere gran inversión técnica.'],
      ['SaaS', 'Correcto: alquiler con actualizaciones del proveedor.'],
      ['Ninguna', 'Alguna sirve.'],
    ], 2, cap('7', '132')),
    mc('l61-q4', 'Plataforma', 3, '¿Cuál es el principal costo oculto de una plataforma open source según el cuaderno?', [
      ['La licencia', 'El inicial puede ser menor; no es licencia.'],
      ['Un equipo interno para mantenimiento y evolución, con riesgo de obsolescencia sin inversión constante', 'Correcto.'],
      ['El hosting incluido', 'No es un costo oculto.'],
      ['Ninguno', 'Sí los tiene.'],
    ], 1, cap('7', '131-132')),
    corta('l61-q5', 'E-commerce vs. e-business', 2, 'Explicá la diferencia entre e-commerce y e-business con un ejemplo de una tienda online.', 'E-commerce son las transacciones electrónicas (la compra en la tienda). E-business es la gestión completa del negocio digital: ventas online, promoción on/offline, actividades offline derivadas (envío, stock) y atención y postventa.', [
      'Define e-commerce como transacciones',
      'Define e-business como gestión integral',
      'Da un ejemplo coherente',
    ], cap('7', '128')),
  ],
  tarjetas: [
    { id: 'l61-t1', f: 'E-commerce (Chaffey)', b: 'Transacciones financieras y de información realizadas electrónicamente entre una organización y cualquier tercero.' },
    { id: 'l61-t2', f: 'E-business', b: 'Gestión del proceso completo de un negocio digital: ventas online, promoción, actividades offline derivadas, postventa y atención.' },
    { id: 'l61-t3', f: 'Tres miradas del e-commerce', b: 'Comercial (quién vende y compra), de plataforma y de modelo de negocio.' },
    { id: 'l61-t4', f: 'Tres tipos de plataforma', b: 'Open source, on-premises (licencia en servidores propios) y SaaS (alquiler).' },
  ],
  sintesis: ['E-business abarca más que e-commerce.', 'La mirada comercial clasifica por quién vende y quién compra.', 'La plataforma determina costos, control y mantenimiento.'],
  conexiones: ['l6-2', 'l6-3', 'l2-5'],
  referencias: [cap('7', '127-132')],
}
