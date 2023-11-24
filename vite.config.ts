import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import electron  from  "./plugins/electron"
import vue from '@vitejs/plugin-vue'
console.log('hello vite');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron()
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
