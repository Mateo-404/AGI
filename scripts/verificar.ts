import { materias } from '../contenido/materias'
import { validarContenido } from '../contenido/validar-todo'

const errores = validarContenido()
for (const m of Object.values(materias)) {
  const preguntas = m.lecciones.reduce((a, l) => a + l.preguntas.length, 0)
  const tarjetas = m.lecciones.reduce((a, l) => a + l.tarjetas.length, 0)
  console.log(`${m.slug}: ${m.unidades.length} unidades · ${m.lecciones.length} lecciones · ${preguntas} preguntas · ${tarjetas} tarjetas · ${m.glosario.length} términos · ${m.cobertura.length} temas de cobertura`)
  for (const u of m.unidades) console.log(`  U${u.n}: ${m.lecciones.filter((l) => l.unidad === u.n).map((l) => l.id).join(', ')}`)
}
if (errores.length) {
  console.error(`\n${errores.length} error(es):`)
  errores.forEach((e) => console.error(' - ' + e))
  process.exit(1)
}
console.log(`Contenido válido (${Object.keys(materias).length} materias): sin enlaces rotos, ids únicos y cobertura consistente.`)
