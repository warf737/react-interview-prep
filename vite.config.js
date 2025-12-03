import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/react-interview-prep/', // Замените на имя вашего репозитория
  server: {
    port: 3000,
    open: true
  }
})