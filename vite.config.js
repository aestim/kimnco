import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-i18next', 'i18next'],
          gsap: ['gsap', '@gsap/react'],
          maps: ['react-kakao-maps-sdk']
        }
      }
    }
  }
})
