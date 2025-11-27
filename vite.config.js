import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  base: '/money-app/', // <--- 这里一定要改成 '/您的仓库名/'，前后都要有斜杠
})