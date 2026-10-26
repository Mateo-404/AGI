import { cap, corta, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l35: Leccion = {
  id: 'l3-5',
  unidad: 3,
  titulo: 'Compra organizacional (B2B)',
  resumen: 'Por qué el marketing industrial es distinto, características del mercado de negocios y las seis etapas del proceso de compra B2B.',
  minutos: 25,
  objetivos: [
    'Contrastar mercado de negocios y de consumo.',
    'Enumerar las seis etapas del proceso de compra B2B.',
    'Distinguir compra productiva y no productiva y las implicancias de cada una.',
  ],
  previos: ['l2-8'],
  bloques: [
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Contexto en el programa',
      x: 'La compra B2B pertenece al Cap. 3 del cuaderno, que no figura en la bibliografía obligatoria del Programa de Marketing Digital 2026 (ver auditoría). Se incluye porque los contenidos de la unidad (segmentación, plan, email B2B, e-commerce B2B) la usan.',
    },
    {
      t: 'p',
      x: 'Conocer el marketing **B2B (business-to-business)** es crucial en zonas con fuerte desarrollo industrial: las empresas (no solo industriales) dependen de adquirir materias primas, maquinaria y servicios de otras empresas. En el mercado B2B **cambia el comprador y cambia el uso del bien**: lo que se consume se usa para producir otros bienes, facilitar el funcionamiento de la organización o revenderlos.',
      o: cap('3', '67'),
    },
    {
      t: 'def',
      termino: 'Compra organizacional',
      x: 'Proceso de toma de decisiones en el que las organizaciones formales **establecen la necesidad de adquirir** productos y servicios e **identifican, evalúan y eligen** entre las diferentes marcas y proveedores disponibles.',
      o: cap('3', '67'),
    },
    {
      t: 'tabla',
      titulo: 'Mercado empresarial vs. consumo (figuras de la p. 68, transcriptas)',
      cab: ['Mercado empresarial', 'Diferencias del mercado de negocios respecto del de consumo'],
      filas: [
        ['Se compone de todas las organizaciones que adquieren bienes y servicios para utilizarlos en la producción de otros productos o servicios que se venden, alquilan o suministran a otros', 'Menos compradores de mayor tamaño · relaciones más estrechas cliente-proveedor · compradores profesionales · múltiples influencias de compra (más personas) · múltiples llamadas de ventas'],
        ['Mayor cantidad de dinero y los artículos cambian de manos varias veces en las transacciones empresariales', 'Demanda **derivada** (del consumo) · demanda **inelástica** · demanda **fluctuante** · compradores concentrados geográficamente · compra directa con los fabricantes'],
        ['Mayor riesgo: **homogeneización** (el producto se convierte en commodity) → vital crear y comunicar factores de diferenciación', ''],
      ],
      o: cap('3', '68', 'figuras de la página'),
    },
    {
      t: 'p',
      x: 'La **complejidad** del proceso depende de: la complejidad del problema que se resuelve, qué tan nuevo es el requerimiento, la cantidad de personas involucradas y el tiempo requerido.',
      o: cap('3', '68', 'Situaciones de compra'),
    },
    {
      t: 'explorable',
      titulo: 'Seis etapas del proceso de compra B2B',
      variante: 'pasos',
      nodos: [
        { id: 'b1', titulo: '1. Identificación del problema', resumen: 'Reconocer la necesidad', detalle: 'Como en los consumidores finales, el primer paso es reconocer un problema o necesidad a resolver.' },
        { id: 'b2', titulo: '2. Especificación del producto', resumen: 'Características requeridas', detalle: 'Analiza las características que debe tener el producto; se hace un análisis del valor del producto y a partir de ello se determina su ventaja competitiva.' },
        { id: 'b3', titulo: '3. Búsqueda de proveedores', resumen: 'Quiénes lo ofrecen', detalle: 'Ya definidas las características, comienza la búsqueda de proveedores de ese producto.' },
        { id: 'b4', titulo: '4. Elección del proveedor', resumen: 'Criterios y valoración', detalle: 'Se analizan las características a las que se da más importancia y se selecciona la opción con mayor valoración.' },
        { id: 'b5', titulo: '5. Rutina de pedido', resumen: 'Condiciones a largo plazo', detalle: 'Se acuerdan precios, plazos de entrega, condiciones de pago, garantías, etc.' },
        { id: 'b6', titulo: '6. Revisión de resultados', resumen: 'Evaluación periódica', detalle: 'Se evalúa si el proveedor sigue brindando el valor agregado y los atributos por los que fue seleccionado: es determinante para continuar o no la relación.' },
      ],
      o: cap('3', '69'),
    },
    {
      t: 'comparar',
      titulo: 'Consejo para un/a profesional de AGI: compra productiva vs. no productiva',
      a: { titulo: 'Compra productiva', items: ['El material va al producto final', 'Proceso más complejo: las especificaciones con el cliente suelen estar definidas de antemano', 'Cualquier cambio debe consensuarse con el cliente'] },
      b: { titulo: 'Compra no productiva', items: ['El material no va al producto final', 'Proceso más flexible', 'Práctica usual: aprobar al proveedor desde compras junto con RR. HH., seguridad e higiene e impuestos, y darlo de alta si todos aprueban'] },
      o: cap('3', '70'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Tendencias del mercado B2B local (cuaderno)',
      x: 'Plataforma de evaluación y selección de proveedores con abono mensual (GCG, de una consultora cordobesa) para quienes brindan servicios en planta; empresas que por procedimiento no pueden comprar por Mercado Libre y lo hacen vía una plataforma que cobra comisión; **tercerización de compras no productivas**. Normativa: contrato de compraventa según el Código Civil y Comercial, defensa del consumidor y publicidad engañosa.',
      o: cap('3', '70'),
    },
  ],
  claves: ['b2b', 'b2c', 'compra-organizacional', 'demanda-derivada', 'compra-productiva'],
  preguntas: [
    mc('l35-q1', 'B2B', 1, 'En el mercado B2B la demanda es, entre otras características:', [
      ['Derivada, inelástica y fluctuante', 'Correcto, según la figura del cuaderno.'],
      ['Siempre elástica', 'Se la describe como inelástica.'],
      ['Independiente del consumo final', 'Es derivada del consumo.'],
      ['Solo local', 'No se afirma.'],
    ], 0, cap('3', '68')),
    mc('l35-q2', 'Etapas', 2, 'Acordar precios, plazos de entrega, condiciones de pago y garantías corresponde a:', [
      ['Búsqueda de proveedores', 'Es buscar quién ofrece el producto.'],
      ['Rutina de pedido', 'Correcto.'],
      ['Especificación del producto', 'Define características.'],
      ['Identificación del problema', 'Es reconocer la necesidad.'],
    ], 1, cap('3', '69')),
    mc('l35-q3', 'Compra productiva', 3, '¿Por qué una compra productiva suele ser más compleja?', [
      ['Porque las especificaciones con el cliente están definidas de antemano y los cambios deben consensuarse', 'Correcto.'],
      ['Porque no interviene compras', 'Siempre interviene compras.'],
      ['Porque es siempre más barata', 'No se trata de precio.'],
      ['Porque solo se hace en e-commerce', 'No se afirma.'],
    ], 0, cap('3', '70')),
    corta('l35-q4', 'B2B vs. B2C', 2, 'Mencioná tres diferencias entre comprar como consumidor y comprar como empresa.', 'Menos compradores pero de mayor tamaño, compradores profesionales y múltiples influencias de compra; demanda derivada, inelástica y fluctuante; relaciones más estrechas; proceso más formal con varias etapas.', [
      'Menciona al menos tres diferencias válidas',
      'Las relaciona con el mercado B2B',
    ], cap('3', '68')),
  ],
  tarjetas: [
    { id: 'l35-t1', f: 'Seis etapas de compra B2B', b: 'Identificación del problema · especificación del producto · búsqueda de proveedores · elección · rutina de pedido · revisión de resultados.' },
    { id: 'l35-t2', f: 'Rasgos del mercado de negocios', b: 'Pocos compradores grandes, compradores profesionales, múltiples influencias, demanda derivada/inelástica/fluctuante, compra directa.' },
    { id: 'l35-t3', f: 'Compra productiva vs. no productiva', b: 'Productiva: va al producto final, más compleja. No productiva: más flexible; aprobación conjunta de varias áreas.' },
  ],
  sintesis: ['B2B cambia el comprador y el uso del bien.', 'El proceso tiene seis etapas y termina con revisión de resultados.', 'La distinción productiva/no productiva ordena los requisitos.'],
  conexiones: ['l3-3', 'l7-2', 'l6-1'],
  referencias: [cap('3', '67-71')],
}
