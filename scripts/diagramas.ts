/**
 * Dibuja los diagramas Mermaid del curso que todavía no tienen SVG en contenido/marketing/diagramas/ y borra los que ya no se usan.
 * Necesita Chromium: `bunx playwright install chromium` (o MERMAID_CHROMIUM=/ruta/al/chrome).
 *
 *   bun run diagramas
 */
import { codigosMermaid, podarDiagramas, sincronizarDiagramas } from '../src/logica/diagramas-build'

const { dibujados } = await sincronizarDiagramas({ estricto: true })
const sobran = podarDiagramas()
console.log(`${codigosMermaid().length} diagramas en el curso · ${dibujados} dibujados · ${sobran.length} sobrantes borrados`)
