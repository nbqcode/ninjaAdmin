import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
console.log('hello vite');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{  
    host:'0.0.0.0',
    proxy:{
      '/admin':'http://test.xiaoyaketang.com',
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
