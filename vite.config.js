import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      ssr: 'resources/js/ssr.tsx',
      refresh: true
    }),
    
    react()
  ],
  build: {
    outDir: 'public/build',  // Ensure this matches your Laravel build directory
  },
})
