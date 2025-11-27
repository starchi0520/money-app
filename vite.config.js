import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 这一行很重要，确保变成白屏
  server: {
    host: true // 允许局域网访问
  }
})