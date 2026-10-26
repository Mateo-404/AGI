import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: { alias: { '@contenido': r('./contenido'), '@': r('./src') } },
  build: { chunkSizeWarningLimit: 900 },
})
