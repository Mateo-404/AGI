import { cap, corta, did, mc } from '../../ayudas'
import type { Leccion } from '../../tipos'

export const l13: Leccion = {
  id: 'l1-3',
  unidad: 1,
  titulo: 'Miopía de marketing',
  resumen: 'Cuando la organización mira su producto y pierde de vista la necesidad: cómo detectarla y tres metodologías para romperla.',
  minutos: 25,
  objetivos: [
    'Explicar qué es la miopía de marketing según Levitt (1960).',
    'Distinguir *deseos existentes* de *necesidades latentes*.',
    'Aplicar las tres metodologías del cuaderno (características→beneficios, propuesta de valor, Círculo de oro).',
  ],
  previos: ['l1-2'],
  bloques: [
    {
      t: 'def',
      termino: 'Miopía de marketing',
      x: 'Error de concentrarse **solo en el producto** (los artículos específicos que se ofrecen) y no en los **beneficios y experiencias** que producen: se atienden los deseos existentes y se pierden de vista las **necesidades latentes**. Levitt la planteó en *Marketing Myopia*, Harvard Business Review, 1960. Un artículo es solo **una herramienta para resolver un problema** de quien compra.',
      o: cap('1', '24-25'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      x: 'Pista del cuaderno: aunque hoy los consumidores llegan mejor informados, *no hay que perder de vista la necesidad y cómo satisfacerla*. No hace falta que quien compra sea experto en especificaciones técnicas.',
      o: cap('1', '25'),
    },
    {
      t: 'ejemplo',
      titulo: 'El dentista Guillermo (caso de estudiantes de AGI)',
      pasos: [
        'Figura 12: el profesional comunica servicios técnicos (pernos, coronas metalocerámicas, alineadores invisibles, frenectomía, gingivectomía). Para un paciente es «indescifrable»: miopía, foco en el servicio.',
        'Figura 13: se muestra junto a su hermana famosa con la frase «Si nos visitás, te vas con la sonrisa de Pampita». No explica servicios: **muestra el resultado**.',
        'Lectura del cuaderno: no puede asegurarse que ser hermano de una persona famosa lo ayude, pero sin dudas tiene cierto impacto en quienes ven el resultado de su trabajo. La lección es comunicar el beneficio (una sonrisa), no el procedimiento.',
      ],
      o: cap('1', '25-26', 'figuras 12 y 13'),
    },
    { t: 'h', x: 'Tres metodologías para romper con la miopía (de menor a mayor complejidad)' },
    {
      t: 'tabla',
      titulo: 'Metodología 1: características → beneficios (bicicleta mountain bike)',
      cab: ['Característica técnica', 'Beneficio'],
      filas: [
        ['Cuadro de aluminio', 'Mayor durabilidad y menor peso'],
        ['21 velocidades', 'Adaptable a diferentes terrenos y pendientes'],
        ['Frenos de disco mecánico en ambas ruedas', 'Control seguro'],
        ['Suspensión delantera', 'Suaviza golpes y vibraciones'],
      ],
      o: cap('1', '27', 'Metodología 1'),
    },
    {
      t: 'p',
      x: '**Metodología 2:** definir la propuesta de valor de la organización y del artículo (ver [[>l1-2|la lección anterior]]). Ejemplo del cuaderno: propuesta de valor de UNRaf = *innovación en la oferta académica*; de AGI = a partir de las materias informáticas y tecnológicas, un **perfil tecnológico** con ventajas competitivas.',
      o: cap('1', '27', 'Metodología 2'),
    },
    {
      t: 'explorable',
      titulo: 'Metodología 3: el Círculo de oro (Sinek, 2009)',
      variante: 'capas',
      nodos: [
        { id: 'why', titulo: 'Por qué (Why)', resumen: 'Propósito, causa o creencia', detalle: 'La razón principal por la que la organización existe y hace lo que hace. En el laboratorio del ejemplo: brindar respuestas de calidad a su comunidad (familias, profesionales de la salud, empresas, veterinaria).' },
        { id: 'how', titulo: 'Cómo (How)', resumen: 'Proceso o valores distintivos', detalle: 'Lo que distingue a la organización: en el laboratorio, personal capacitado, selección rigurosa de proveedores, equipo de última tecnología y procesos definidos.' },
        { id: 'what', titulo: 'Qué (What)', resumen: 'Productos o servicios', detalle: 'Lo que ofrece: análisis clínicos, bacteriológicos, bromatológicos y veterinarios.' },
      ],
      o: cap('1', '27-29', 'Metodología 3'),
    },
    {
      t: 'p',
      x: 'Según Sinek, las organizaciones comunican habitualmente desde el **Qué hacia el Por qué**; las exitosas hacen el camino inverso: empiezan por el **Por qué**, siguen con el Cómo y el Qué y así **conectan emocionalmente**, creando lealtad.',
      o: cap('1', '28'),
    },
    {
      t: 'asociar',
      titulo: 'Asociá cada enunciado con la capa del Círculo de oro',
      pares: [
        ['Creemos que cada análisis debe darle respuestas confiables a la comunidad', 'Por qué'],
        ['Contamos con personal capacitado y selección rigurosa de proveedores', 'Cómo'],
        ['Ofrecemos análisis bacteriológicos y bromatológicos', 'Qué'],
      ],
    },
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Cómo distinguir miopía de especialización',
      x: 'Mostrar detalles técnicos **no** es siempre miopía: es miopía cuando el mensaje queda en el *qué* y el público no puede traducirlo a un beneficio propio. Una prueba simple: preguntarse «¿y eso para mí qué significa?» tras cada característica; si no hay respuesta en el mensaje, hay miopía.',
      o: did,
    },
  ],
  claves: ['miopia', 'necesidad-latente', 'circulo-de-oro', 'propuesta-de-valor'],
  preguntas: [
    mc('l13-q1', 'Miopía', 1, '¿En qué consiste la miopía de marketing?', [
      ['En no tener un plan de marketing', 'La miopía no es ausencia de plan; es un error de enfoque.'],
      ['En enfocarse en el producto y descuidar las necesidades (y beneficios) de los clientes', 'Correcto, según Levitt (1960).'],
      ['En segmentar demasiado el mercado', 'No tiene relación: eso es hipersegmentación.'],
      ['En invertir poco en publicidad', 'La inversión publicitaria no define la miopía.'],
    ], 1, cap('1', '24-25')),
    mc('l13-q2', 'Metodología', 2, 'Una ferretería publica una lista de especificaciones de taladros. ¿Qué metodología aplicarías primero, por ser la menos compleja?', [
      ['Círculo de oro', 'Es la más compleja y exige trabajo organizacional profundo.'],
      ['Traducir características técnicas en beneficios percibidos por el cliente', 'Correcto: es la Metodología 1, la más simple.'],
      ['Rediseñar la misión de la empresa', 'Es un trabajo de nivel organizacional (más complejo).'],
      ['Eliminar las especificaciones', 'Las especificaciones pueden mantenerse; se trata de traducirlas a beneficios.'],
    ], 1, cap('1', '26-27')),
    mc('l13-q3', 'Círculo de oro', 2, 'Según Sinek, ¿cómo comunican las organizaciones exitosas?', [
      ['Del Qué al Por qué', 'Es lo que hacen habitualmente las organizaciones no exitosas, según el cuaderno.'],
      ['Solo desde el Cómo', 'No es el orden planteado.'],
      ['Del Por qué hacia el Cómo y el Qué', 'Correcto: empiezan por el propósito y generan conexión emocional.'],
      ['Únicamente con precio', 'El modelo no se centra en precio.'],
    ], 2, cap('1', '28')),
    mc('l13-q4', 'Miopía', 3, 'En el caso del dentista Guillermo, ¿por qué la figura 13 es mejor que la 12 desde la perspectiva de la miopía?', [
      ['Porque usa a una persona famosa, lo cual garantiza más ventas', 'El cuaderno dice expresamente que no se puede asegurar que ayude.'],
      ['Porque muestra el resultado (beneficio) en lugar de enumerar servicios técnicos incomprensibles', 'Correcto: pasa del servicio al beneficio.'],
      ['Porque oculta los servicios', 'No se trata de ocultarlos sino de priorizar el resultado.'],
      ['Porque baja el precio', 'No hay referencia al precio.'],
    ], 1, cap('1', '25-26')),
    corta('l13-q5', 'Miopía', 2, 'Elegí un producto o servicio que conozcas y mostrá, con la metodología 1, dos pares característica→beneficio. ¿Cómo cambia la comunicación?', 'Ejemplo: mochila con tela impermeable (característica) → tus cosas llegan secas aunque llueva (beneficio); cierre con candado (característica) → tranquilidad al viajar. La comunicación deja de listar atributos y habla del resultado para el usuario, evitando la miopía.', [
      'Presenta al menos dos pares característica→beneficio coherentes',
      'El beneficio está formulado desde la perspectiva del cliente',
      'Relaciona con la miopía (foco en la necesidad)',
    ], cap('1', '27')),
  ],
  tarjetas: [
    { id: 'l13-t1', f: 'Miopía de marketing (Levitt, 1960)', b: 'Enfocarse solo en el producto y perder de vista las necesidades latentes y los beneficios que busca el cliente.' },
    { id: 'l13-t2', f: 'Tres metodologías contra la miopía', b: '1) Características → beneficios · 2) Definir la propuesta de valor · 3) Círculo de oro (Por qué, Cómo, Qué).' },
    { id: 'l13-t3', f: 'Círculo de oro: orden de comunicación exitosa', b: 'Por qué → Cómo → Qué (de adentro hacia afuera).' },
    { id: 'l13-t4', f: 'Un artículo es…', b: 'Solo una herramienta para resolver un problema de quien compra.' },
  ],
  sintesis: ['Hablá del beneficio, no solo de la ficha técnica.', 'Hay tres metodologías, de menor a mayor complejidad.', 'El Círculo de oro vuelve a aparecer en el diseño de contenido (Cap. 9).'],
  conexiones: ['l1-2', 'l5-1'],
  referencias: [cap('1', '24-29')],
}
