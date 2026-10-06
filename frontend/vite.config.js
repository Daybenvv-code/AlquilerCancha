import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para el entorno de producción (vite preview, que usa Railway)
  preview: {
    allowedHosts: true, // Esto permite CUALQUIER dominio, incluyendo el de Railway
    host: true,         // Escucha en todas las interfaces de red, no solo local
  },
  // Configuración para el entorno de desarrollo (vite dev, tu local)
  server: {
    allowedHosts: true, // Útil si pruebas tu local desde otro dispositivo o túnel
    host: true,         // Permite el acceso desde la red local
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})