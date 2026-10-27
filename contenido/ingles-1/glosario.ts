import type { TerminoGlosario } from '../tipos'

const t = (id: string, termino: string, lec: string, def: string, ...rel: string[]): TerminoGlosario => ({ id, termino, def, lec, rel: rel.length ? rel : undefined })

export const glosario: TerminoGlosario[] = [
  t('to-be', 'Verbo to be', 'in-l1-1', 'Verbo que equivale a «ser» o «estar» en español; base para identificar, describir y ubicar.', 'presente-simple'),
  t('contraccion', 'Contracción', 'in-l1-1', 'Forma corta que combina sujeto y verbo (I\'m, he\'s, they\'re).', 'to-be'),
  t('presente-simple', 'Presente simple', 'in-l1-2', 'Tiempo verbal para verdades permanentes, hábitos y rutinas.', 'to-be', 'presente-continuo'),
  t('tercera-persona-s', 'Tercera persona del singular (-s/-es/-ies)', 'in-l1-2', 'Modificación del verbo cuando el sujeto es he, she o it.', 'presente-simple'),
  t('adjetivo-posesivo', 'Adjetivo posesivo', 'in-l1-2', 'Indica pertenencia y varía según el poseedor (my, your, his, her, our, their).', 'presente-simple'),
  t('demostrativo', 'Demostrativo (this/that/these/those)', 'in-l1-2', 'Palabra que señala la cercanía o lejanía de un objeto.', 'presente-simple'),
  t('presente-continuo', 'Presente continuo', 'in-l2-1', 'Tiempo verbal para acciones en progreso en el momento de hablar.', 'presente-simple'),
  t('ing', 'Terminación -ing', 'in-l2-1', 'Se agrega al verbo para formar el presente continuo, con reglas de supresión, duplicación y excepciones.', 'presente-continuo'),
  t('modal', 'Verbo modal', 'in-l2-2', 'Verbo auxiliar que expresa obligación, prohibición o consejo (have to, must, should).', 'have-to', 'must', 'should'),
  t('have-to', 'Have to', 'in-l2-2', 'Expresa obligación general o externa (reglas).', 'modal', 'must'),
  t('must', 'Must', 'in-l2-2', 'Expresa obligación personal o interna; mustn\'t expresa prohibición.', 'modal', 'have-to'),
  t('should', 'Should', 'in-l2-2', 'Expresa consejo o recomendación.', 'modal'),
  t('articulo-indefinido', 'Artículo indefinido (a/an)', 'in-l2-3', 'Se usa en singular para hablar de algo no específico; la elección depende del sonido inicial.', 'there-is'),
  t('there-is', 'There is / There are', 'in-l2-3', 'Expresión que significa «hay»; there is para singular, there are para plural.', 'articulo-indefinido'),
  t('why', 'Why', 'in-l3-1', 'Pronombre interrogativo que significa «¿por qué?» (pregunta).', 'because'),
  t('because', 'Because', 'in-l3-1', 'Conjunción que significa «porque» (respuesta).', 'why'),
  t('who', 'Who', 'in-l3-1', 'Pronombre interrogativo que significa «quién» o «quiénes»; el número lo determina el verbo to be.', 'to-be'),
  t('posesivo-his-her', 'Adjetivos posesivos his/her', 'in-l3-2', 'His indica posesión masculina y her posesión femenina.', 'adjetivo-posesivo'),
  t('vocabulario', 'Vocabulario útil', 'in-l4-1', 'Palabras y expresiones de rutina diaria, trabajo, emociones y conversación informal.', 'frase-hecha'),
  t('frase-hecha', 'Frase hecha (chunk)', 'in-l4-2', 'Expresión fija de uso frecuente en la comunicación natural.', 'vocabulario'),
]