import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Konfiguracja Vite dla Cloudflare Pages:
// - build.outDir 'dist' (domyślny output oczekiwany przez Cloudflare Pages)
// - base: '/' — projekt używa vue-router w trybie history (podstrony typu
//   /realizacje/schody), więc ścieżki zasobów muszą być bezwzględne od
//   korzenia domeny, inaczej assety nie załadują się na zagnieżdżonych URL-ach.
//   Plik public/_redirects zapewnia poprawny fallback SPA na Cloudflare Pages.
export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
