import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      // Agent/editor writes don't always emit FSEvents; polling picks up CSS/HMR
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    target: 'es2022',
  },
})
