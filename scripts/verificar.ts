import { validarContenido } from '../contenido/validar'
import { glosario, lecciones, unidades } from '../contenido/indice'
import { cobertura } from '../contenido/cobertura'

const errores = validarContenido()
const preguntas = lecciones.reduce((a, l) => a + l.preguntas.length, 0)
const tarjetas = lecciones.reduce((a, l) => a + l.tarjetas.length, 0)
console.log(`Unidades: ${unidades.length} · Lecciones: ${lecciones.length} · Preguntas: ${preguntas} · Tarjetas: ${tarjetas} · Glosario: ${glosario.length} · Temas de cobertura: ${cobertura.length}`)
for (const u of unidades) console.log(`  U${u.n}: ${lecciones.filter((l) => l.unidad === u.n).map((l) => l.id).join(', ')}`)
if (errores.length) {
  console.error(`\n${errores.length} error(es):`)
  errores.forEach((e) => console.error(' - ' + e))
  process.exit(1)
}
console.log('Contenido válido: sin enlaces rotos, ids únicos y cobertura consistente.')
