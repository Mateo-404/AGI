import { cap, corta, did, mc } from '../ayudas'
import type { Leccion } from '../tipos'

export const l32: Leccion = {
  id: 'l3-2',
  unidad: 3,
  titulo: 'Análisis de la situación: mercado, sector y competencia',
  resumen: 'Primera etapa del plan: dónde está la organización y qué ocurre en su mercado digital. FODA, 5 fuerzas, 8 dimensiones e inteligencia de mercados.',
  minutos: 30,
  objetivos: [
    'Distinguir análisis del mercado, del sector y de la competencia y sus preguntas guía.',
    'Aplicar FODA, las 5 fuerzas de Porter y la matriz de 8 dimensiones.',
    'Explicar el concepto de inteligencia de mercados y de oportunidad.',
  ],
  previos: ['l3-1'],
  bloques: [
    {
      t: 'p',
      x: 'En la primera etapa se describe **el punto de partida**: la situación actual y **por qué no es satisfactoria**. Se analizan factores como misión, visión, valores, esencia de la marca y competencia, en relación con el entorno, el mercado y los competidores.',
      o: cap('2', '41', '1. Análisis de la situación inicial'),
    },
    {
      t: 'tabla',
      titulo: 'Tres análisis',
      cab: ['Análisis', 'Pregunta principal', 'Qué mirar y dónde buscar'],
      filas: [
        ['**Mercado**', '¿Cómo está afectando el mundo digital al mercado al que se dirige la organización?', 'Acceso de la población al mundo digital, costumbres y formas de uso, finalidad con que se usa la red, sitios más visitados. Informes oficiales de centros estadísticos del sector público y privado.'],
        ['**Sector**', '¿Qué ocurre en el mundo digital en relación con nuestro sector? ¿Impacto y tendencias?', 'Administraciones públicas, colegios profesionales, asociaciones y federaciones empresariales, sindicatos, asociaciones de consumidores, consultoras especializadas, universidades.'],
        ['**Competencia**', '¿Quiénes son los principales competidores, cómo nos comparamos, en qué nos aventajan, cómo estamos de preparados?', 'Competidores directos (ya están en el mercado con productos, servicios o contenidos similares para los mismos segmentos); indicadores y estrategias; mejores prácticas.'],
      ],
      o: cap('2', '41-42'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'Dos pasos fundamentales (mercado)',
      x: '**(1)** Documentar y acopiar información actualizada, con un **repositorio fidedigno** y una **frecuencia de análisis**. **(2)** Analizar **cómo esos datos afectan** a la organización, al mercado y al plan.',
      o: cap('2', '41'),
    },
    {
      t: 'callout',
      tipo: 'didactico',
      titulo: 'Tip para AGI (competencia no tan directa)',
      x: 'El cuaderno sugiere «salir fuera de la caja»: analizar competidores no tan directos y de otros mercados puede, en ciertos momentos del ciclo de vida de la organización, **generar nuevas oportunidades**.',
      o: cap('2', '42'),
    },
    { t: 'h', x: 'Herramientas' },
    {
      t: 'explorable',
      titulo: 'Herramientas para analizar la situación',
      variante: 'pasos',
      nodos: [
        { id: 'foda', titulo: 'Matriz FODA', resumen: 'Fortalezas, oportunidades, debilidades, amenazas', detalle: 'Herramienta que el cuaderno remite a la materia Gestión y administración de las organizaciones. En el ejemplo de la distribuidora se usa como análisis interno (directorio y clientes).' },
        { id: 'porter', titulo: '5 fuerzas de Porter', resumen: 'Qué afecta la capacidad de satisfacer clientes y generar beneficios', detalle: 'Un cambio en cualquiera obliga a redefinir la estrategia: (a) amenaza de productos **sustitutos**; (b) amenaza de **nuevos competidores** (facilidad de ingreso); (c) **intensidad de la competencia** (quiénes y qué relación); (d) **poder del cliente**; (e) **poder de los proveedores**. En el Cap. 4 se usa para medir el atractivo de un segmento.' },
        { id: 'ocho', titulo: 'Matriz de las 8 dimensiones', resumen: 'Analizar la organización bajo 8 aspectos', detalle: '**Procesos** (los de negocio) · **finanzas** (ventas, ingresos, ganancias) · **reputación/imagen** (premios, políticas, comentarios de clientes) · **marketing y comunicación** (acciones y dónde) · **organización** (estructura, puestos, sucursales) · **alianzas** (asociaciones, cámaras, grupos) · **tecnología** (hardware y software) · **producto/mercado** (cartera y dónde). También sirve para segmentar mercados industriales (Cap. 4).' },
      ],
      o: cap('2', '42-43'),
    },
    {
      t: 'tabla',
      titulo: 'Herramientas digitales mencionadas',
      cab: ['Para…', 'Herramientas'],
      filas: [
        ['Mercado y sector', 'Google Scholar, Google Trends'],
        ['Competencia', 'Semrush, Sistrix, SimilarWeb, Buzzsumo, BoardFy, Nubimetrics, Kompyte'],
        ['Informes y estadísticas (factos)', 'CACE (Cámara Argentina de Comercio Electrónico), Statista'],
      ],
      o: cap('2', '43-47'),
    },
    {
      t: 'p',
      x: 'Las herramientas digitales entregan mucha información que es necesario **seleccionar, priorizar, interpretar y plasmar en un entregable para quien decide**: una tarea clave de AGI, vinculada a estadística, gestión de datos y aprendizaje automático. «**No hay una herramienta mejor que la otra**»: se aplican de modo complementario según la capacidad de la organización.',
      o: cap('2', '44'),
    },
    {
      t: 'def',
      termino: 'Inteligencia de mercados',
      x: '«El diseño sistemático, recolección, análisis y presentación de la información y descubrimientos relevantes para una situación de mercadotecnia específica a la que se enfrenta la empresa» (Kotler, 1974: 112). Se incorpora porque el entorno cambia y se requiere **monitoreo sistemático**; la seriedad, la exploración responsable y la sistematización son un valor diferencial para decidir.',
      o: cap('2', '44', 'Bonus track para estudiantes #AGI'),
    },
    {
      t: 'callout',
      tipo: 'clave',
      titulo: 'El concepto de oportunidad',
      x: 'Cierre de la etapa: ¿qué posibilidades de acción hay en el mercado? ¿qué sucede en el entorno? ¿cómo pueden las organizaciones apropiarse de ello y desarrollar un **diferencial futuro**?',
      o: cap('2', '44'),
    },
    {
      t: 'ejemplo',
      titulo: 'Matriz de 8 dimensiones para una panadería (didáctico)',
      pasos: [
        '**Procesos:** elaboración propia, pedidos anticipados y por WhatsApp, entrega. **Finanzas:** ventas por canal y estacionalidad.',
        '**Reputación:** reseñas en Google e Instagram. **Marketing y comunicación:** solo contenido orgánico en Instagram.',
        '**Organización:** pocas personas, sin rol dedicado a lo digital. **Alianzas:** ninguna formal. **Tecnología:** celular y plataforma de delivery de terceros. **Producto/mercado:** pastelería y panificación para el barrio.',
        'Lectura: la oportunidad detectada es ordenar los pedidos con un canal propio de autogestión y medir cómo responde el barrio.',
      ],
      o: did,
    },
  ],
  claves: ['analisis-situacion', 'foda', 'cinco-fuerzas', 'matriz-8-dimensiones', 'inteligencia-mercados', 'oportunidad', 'pestel'],
  preguntas: [
    mc('l32-q1', 'Análisis', 1, '¿Qué pregunta guía el análisis del mercado en la etapa 1?', [
      ['¿Cuántos empleados tiene la competencia?', 'Pertenece al análisis de la competencia.'],
      ['¿Cómo está afectando el mundo digital al mercado al que se dirige la organización?', 'Correcto.'],
      ['¿Cuánto cuesta producir?', 'Es costos; no es la pregunta del análisis de mercado.'],
      ['¿Qué estrategia seguir?', 'Es la etapa 4.'],
    ], 1, cap('2', '41')),
    mc('l32-q2', '5 fuerzas', 2, 'Que sea fácil para nuevos negocios ingresar al mercado corresponde a…', [
      ['Poder de los proveedores', 'Habla de proveedores.'],
      ['Amenaza de nuevos competidores', 'Correcto.'],
      ['Poder del cliente', 'Habla del cliente.'],
      ['Productos sustitutos', 'Son alternativas de otra categoría.'],
    ], 1, cap('2', '43')),
    mc('l32-q3', '8 dimensiones', 2, 'Revisar premios, políticas y comentarios de clientes pertenece a la dimensión:', [
      ['Finanzas', 'Son ventas, ingresos y ganancias.'],
      ['Reputación / imagen', 'Correcto.'],
      ['Tecnología', 'Es hardware y software.'],
      ['Alianzas', 'Son asociaciones y cámaras.'],
    ], 1, cap('2', '43')),
    mc('l32-q4', 'Inteligencia', 3, '¿Por qué el cuaderno incorpora la inteligencia de mercados en esta etapa?', [
      ['Porque el entorno es cambiante y requiere monitoreo sistemático', 'Correcto.'],
      ['Porque reemplaza al plan de marketing', 'No lo reemplaza.'],
      ['Porque solo sirve para grandes empresas', 'No lo dice.'],
      ['Porque elimina la necesidad de datos', 'Al contrario: se basa en datos.'],
    ], 0, cap('2', '44')),
    corta('l32-q5', 'Análisis', 3, 'Elegí un negocio y proponé qué fuentes usarías para analizar mercado, sector y competencia, y qué harías con los datos.', 'Mercado: informes de la CACE/estadísticas de acceso y uso de Internet; sector: cámaras o asociaciones del rubro; competencia: revisar presencia digital y herramientas como Semrush o SimilarWeb. Luego seleccionar, priorizar, interpretar y plasmar en un informe para decidir, y repetir periódicamente.', [
      'Distingue fuentes para mercado/sector/competencia',
      'Menciona seleccionar-interpretar y entregable',
      'Menciona frecuencia/actualización',
    ], cap('2', '41-44')),
  ],
  tarjetas: [
    { id: 'l32-t1', f: 'Tres análisis de la etapa 1', b: 'Mercado (cómo lo afecta lo digital), sector (tendencias) y competencia (comparación y mejores prácticas).' },
    { id: 'l32-t2', f: '5 fuerzas de Porter', b: 'Sustitutos · nuevos competidores · intensidad de la competencia · poder del cliente · poder de proveedores.' },
    { id: 'l32-t3', f: 'Matriz de 8 dimensiones', b: 'Procesos, finanzas, reputación/imagen, marketing y comunicación, organización, alianzas, tecnología, producto/mercado.' },
    { id: 'l32-t4', f: 'Inteligencia de mercados (Kotler, 1974)', b: 'Diseño sistemático, recolección, análisis y presentación de información relevante para una situación de marketing.' },
  ],
  sintesis: ['Analizar el punto de partida incluye mercado, sector y competencia.', 'Las herramientas son complementarias: no hay una mejor.', 'El fin es detectar oportunidades.'],
  conexiones: ['l3-1', 'l3-3', 'l4-3'],
  referencias: [cap('2', '41-47')],
}
