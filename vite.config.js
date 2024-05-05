import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@axios_inst': '/src/axios.js',
    }
  }
})
