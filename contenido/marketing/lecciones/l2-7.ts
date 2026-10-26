import { cap, corta, did, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l27: Leccion = {
  id: 'l2-7',
  unidad: 2,
  titulo: 'El consumidor: modelo de comportamiento y factores',
  resumen: 'Entrada, proceso y salida; factores culturales, sociales y personales; el método VALS para «conocer para interpelar».',
  minutos: 35,
  objetivos: [
    'Explicar las tres fases del modelo de comportamiento del consumidor.',
    'Clasificar un factor de influencia en cultural, social o personal.',
    'Usar VALS (o un método equivalente) para adecuar la comunicación a un perfil.',
  ],
  previos: ['l1-2'],
  bloques: [
    {
      t: 'def',
      termino: 'Comportamiento del consumidor',
      x: 'El comportamiento que los consumidores exhiben al **buscar, comprar, utilizar, evaluar y desechar** productos y servicios que esperan que satisfagan sus necesidades (Schiffman). Se enfoca en cómo consumidores, familias u hogares deciden gastar o invertir sus recursos (**tiempo, dinero, esfuerzo**): qué compran, por qué, cuándo, dónde, con qué frecuencia, cómo lo evalúan y lo desechan.',
      o: cap('3', '49', 'Modelo de comportamiento del consumidor'),
    },
    {
      t: 'explorable',
      titulo: 'Modelo de comportamiento del consumidor (figura 15)',
      variante: 'pasos',
      nodos: [
        { id: 'e', titulo: 'Entrada', resumen: 'Influencias externas', detalle: 'Hace que el consumidor reconozca la necesidad de un producto. Dos fuentes: **esfuerzos de marketing de la empresa** (producto, promoción, precio, canales de distribución) e **influencias sociológicas externas** (familia, grupos de referencia, fuentes no comerciales, clase social, cultura y subcultura).' },
        { id: 'p', titulo: 'Proceso', resumen: 'Toma de decisiones', detalle: 'Cómo decide: reconocimiento de la necesidad, búsqueda antes de la compra y evaluación de alternativas. Lo afecta el **campo psicológico** (motivación, percepción, aprendizaje, personalidad, actitudes); la **experiencia** de la evaluación, a su vez, modifica esos atributos.' },
        { id: 's', titulo: 'Salida', resumen: 'Comportamiento posterior', detalle: 'Compra (prueba o compra repetida) y **evaluación posterior a la compra**, que realimenta las compras futuras.' },
      ],
      o: cap('3', '49-50', 'fig. 15'),
    },
    {
      t: 'p',
      x: 'El comportamiento de compra se ve influido por factores **culturales, sociales y personales**; de ellos, **los culturales ejercen la influencia más amplia y profunda**.',
      o: cap('3', '50'),
    },
    {
      t: 'tabla',
      titulo: 'Factores que influyen en la compra',
      cab: ['Grupo', 'Factor', 'Explicación'],
      filas: [
        ['Cultural', 'Cultura', 'Conjunto complejo de toda forma de expresión de una sociedad: costumbres, códigos, normas, alimentación, vestimenta, religión, rituales, creencias. Da sentido a las acciones.'],
        ['Cultural', 'Subcultura', 'Grupos dentro de una cultura con normas y valores propios que buscan distinguirse (formas de vestir, hablar, saludar, bailar, caminar).'],
        ['Cultural', 'Clase social', 'Estratificación en la que un grupo comparte una característica común (función productiva o «social», poder adquisitivo o «económico», posición en la burocracia).'],
        ['Social', 'Grupos de referencia', 'Influyen directa o indirectamente en actitudes y comportamientos.'],
        ['Social', 'Familia', 'Uno de los factores más importantes en las compras de consumo; grupo de referencia de mayor influencia primaria. Dos tipos: **de orientación** (madre/padre, hermanos) y **de procreación** (cónyuge e hijos).'],
        ['Social', 'Roles y estatus', 'Posición dentro de cada grupo: se eligen productos que reflejan y comunican el rol y estatus actual o deseado.'],
        ['Personal', 'Edad y etapa del ciclo de vida', 'Los gustos varían con la edad; eventos críticos (matrimonio, nacimiento de un hijo, enfermedad, mudanza, divorcio, primer empleo, cambio de profesión, jubilación, muerte del cónyuge) **detonan nuevas necesidades**.'],
        ['Personal', 'Ocupación y circunstancias económicas', 'La ocupación determina patrones de consumo; ingresos y ahorros determinan la elección de marcas y productos.'],
        ['Personal', 'Personalidad y autoconcepto', 'Personalidad: rasgos psicológicos distintivos con respuestas relativamente consistentes. Autoconcepto en la elección de marca: **real, ideal y según los demás**.'],
        ['Personal', 'Estilo de vida y valores', 'Estilo de vida: patrón de vida expresado en actividades, intereses y opiniones (ligado a restricciones de tiempo y dinero). Valores: creencias que subyacen a actitudes y comportamientos; determinan elecciones y deseos en el largo plazo.'],
      ],
      o: cap('3', '50-54'),
    },
    {
      t: 'clasificar',
      titulo: '¿Factor cultural, social o personal?',
      categorias: ['Cultural', 'Social', 'Personal'],
      items: [
        { x: 'Las costumbres alimentarias de una región', cat: 0, porque: 'Forma parte de la cultura.' },
        { x: 'La opinión de los amigos sobre qué celular comprar', cat: 1, porque: 'Grupo de referencia.' },
        { x: 'Cambiar hábitos de consumo al tener un primer hijo', cat: 2, porque: 'Evento crítico del ciclo de vida: factor personal.' },
        { x: 'Elegir una marca para comunicar el estatus al que se aspira', cat: 1, porque: 'Roles y estatus (social).' },
      ],
    },
    { t: 'h', x: 'VALS: conocer para interpelar' },
    {
      t: 'p',
      x: '**VALS** («valores y estilo de vida») es el sistema de segmentación más popular que combina estilos de vida y valores. Partiendo de la jerarquía de necesidades de Maslow y del concepto de carácter social, investigadores de SRI Internacional desarrollaron un esquema de segmentación de la población estadounidense. El cuaderno remite a Schiffman, *Comportamiento del consumidor* (pp. 67-69), y aclara que sirve «cualquier otro método» que permita conocer rasgos de personalidad, conducta y estilo de vida. Idea central de la cátedra: *«lo que no se conoce, no se quiere»*.',
      o: cap('3', '54-56'),
    },
    {
      t: 'tabla',
      titulo: 'Comunicación errada vs. efectiva según el perfil (ejemplos del cuaderno)',
      cab: ['Perfil', 'Comunicación errada', 'Comunicación efectiva'],
      filas: [
        ['**Superviviente**', 'Anuncio de vehículo de alta gama a personas de bajos ingresos, enfatizando lujo y exclusividad', 'Economía de combustible, durabilidad y funcionalidad: cómo mejora la vida cotidiana'],
        ['**Innovador**', 'Presentar el producto como algo tradicional y convencional', 'Tecnología de vanguardia, diseño único y capacidad de redefinir experiencias (el cuaderno cita el estilo de presentación de Steve Jobs)'],
        ['**Pensador práctico**', 'Mensaje emocional y sentimental sin información concreta ni datos', 'Características técnicas, relación calidad-precio y beneficios tangibles'],
      ],
      o: cap('3', '54-55'),
    },
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Cómo usar esto en un plan',
      x: 'Los factores (cultura, familia, ciclo de vida, estilo de vida) son **variables descriptivas** que luego se convierten en bases de segmentación psicográfica ([[>l3-3|l3-3]]) y en el perfil del buyer persona ([[>l3-4|l3-4]]). Esta conexión es didáctica (el cuaderno la sugiere al decir, en Cap. 4, que se retome VALS para segmentar).',
      o: did,
    },
  ],
  claves: ['comportamiento-consumidor', 'modelo-entrada-proceso-salida', 'cultura', 'subcultura', 'clase-social', 'grupos-referencia', 'ciclo-de-vida', 'autoconcepto', 'estilo-de-vida', 'vals'],
  preguntas: [
    mc('l27-q1', 'Modelo', 1, 'En el modelo de comportamiento del consumidor, la «evaluación posterior a la compra» corresponde a la fase de:', [
      ['Entrada', 'La entrada son las influencias externas.'],
      ['Proceso', 'El proceso es el reconocimiento, la búsqueda y la evaluación de alternativas.'],
      ['Salida', 'Correcto: junto con el comportamiento de compra.'],
      ['Ninguna', 'Sí pertenece a una fase.'],
    ], 2, cap('3', '49-50')),
    mc('l27-q2', 'Factores', 2, '¿Qué factores ejercen, según el cuaderno, la influencia más amplia y profunda en la compra?', [
      ['Personales', 'Son relevantes pero no los de mayor alcance.'],
      ['Sociales', 'Tampoco.'],
      ['Culturales', 'Correcto.'],
      ['Situacionales', 'Se tratan en la fase de decisión, no entre estos tres.'],
    ], 2, cap('3', '50')),
    mc('l27-q3', 'Familia', 2, 'La familia en la que una persona nació y se crió se denomina, según el cuaderno:', [
      ['De procreación', 'Es la formada por cónyuge e hijos.'],
      ['De orientación', 'Correcto: madre/padre y hermanos.'],
      ['Grupo aspiracional', 'No es una categoría del cuaderno.'],
      ['Subcultura', 'No corresponde.'],
    ], 1, cap('3', '52')),
    mc('l27-q4', 'VALS', 3, 'Un banco promociona un préstamo con un mensaje emotivo sin datos de tasas ni costos a un público «pensador práctico». Según el cuaderno, el error es…', [
      ['Usar un canal digital', 'El canal no es el problema.'],
      ['Hablar a un perfil práctico con un mensaje emocional sin información concreta', 'Correcto: este perfil necesita datos, características y relación calidad-precio.'],
      ['Incluir datos', 'Es lo que debería hacer.'],
      ['Segmentar por edad', 'No es el error planteado.'],
    ], 1, cap('3', '55')),
    corta('l27-q5', 'Ciclo de vida', 2, 'Elegí un evento crítico del ciclo de vida y explicá qué nuevas necesidades podría detonar y cómo lo aprovecharía un negocio.', 'Ej.: mudanza → necesidades de muebles, servicios, decoración y logística; el negocio puede segmentar por «mudanza reciente» con ofertas de bienvenida y packs de instalación. Los eventos críticos detonan nuevas necesidades.', [
      'Elige un evento crítico válido',
      'Identifica nuevas necesidades',
      'Propone una acción de marketing',
    ], cap('3', '52')),
  ],
  tarjetas: [
    { id: 'l27-t1', f: 'Fases del modelo de comportamiento del consumidor', b: 'Entrada (marketing + influencias sociológicas) → proceso (decisión + campo psicológico) → salida (compra + evaluación posterior).' },
    { id: 'l27-t2', f: 'Tres grupos de factores', b: 'Culturales (cultura, subcultura, clase social), sociales (grupos de referencia, familia, roles/estatus), personales (edad/ciclo de vida, ocupación, personalidad/autoconcepto, estilo de vida/valores).' },
    { id: 'l27-t3', f: 'Autoconcepto', b: 'Real, ideal y según los demás: influye en la elección y uso de una marca.' },
    { id: 'l27-t4', f: 'VALS', b: 'Valores y estilos de vida: segmentación que combina ambos (SRI); sirve «o cualquier otro método» para conocer al cliente.' },
  ],
  sintesis: ['El consumidor busca, compra, usa, evalúa y desecha.', 'Los factores culturales son los más profundos.', 'Conocer valores y estilo de vida evita comunicaciones erradas.'],
  conexiones: ['l2-8', 'l3-3', 'l3-4'],
  referencias: [cap('3', '49-56')],
}
