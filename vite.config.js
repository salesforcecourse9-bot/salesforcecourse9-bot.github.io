import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 70, mozjpeg: true },
      jpeg: { quality: 70, mozjpeg: true },
      png: { quality: 80 },
    }),
  ],
  base: '/',
})
