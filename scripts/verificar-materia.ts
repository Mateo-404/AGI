import type { Materia } from '../contenido/tipos'
import { validarMateria } from '../contenido/validar'

/** Valida una sola materia sin cargar las demás: `bun run scripts/verificar-materia.ts gestion-ventas`. */
const slug = process.argv[2]
if (!slug) {
  console.error('Falta el slug. Ejemplo: bun run scripts/verificar-materia.ts gestion-ventas')
  process.exit(1)
}
try {
  const dir = `../contenido/${slug}/`
  const { lecciones } = await import(`${dir}indice.ts`)
  const { unidades } = await import(`${dir}unidades.ts`)
  const { glosario } = await import(`${dir}glosario.ts`)
  const { cobertura } = await import(`${dir}cobertura.ts`)
  const { ampliaciones } = await import(`${dir}ampliaciones.ts`)
  const m: Materia = { slug, nombre: slug, corto: slug, descripcion: '', lecciones, unidades, glosario, cobertura, ampliaciones }
  const errores = validarMateria(m)
  const preguntas = lecciones.reduce((a: number, l: { preguntas: unknown[] }) => a + l.preguntas.length, 0)
  const tarjetas = lecciones.reduce((a: number, l: { tarjetas: unknown[] }) => a + l.tarjetas.length, 0)
  console.log(`${m.slug}: ${unidades.length} unidades · ${lecciones.length} lecciones · ${preguntas} preguntas · ${tarjetas} tarjetas · ${glosario.length} términos · ${cobertura.length} temas`)
  for (const u of unidades) console.log(`  U${u.n}: ${lecciones.filter((l: { unidad: number }) => l.unidad === u.n).map((l: { id: string }) => l.id).join(', ')}`)
  if (errores.length) {
    console.error(`\n${errores.length} error(es):`)
    errores.forEach((e) => console.error(' - ' + e))
    process.exit(1)
  }
  console.log('Materia válida.')
} catch (e) {
  console.error(`No se pudo validar ${slug}: ${(e as Error).message}`)
  process.exit(1)
}
