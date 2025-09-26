import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(), 
    vueDevTools(),
    tailwindcss()
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Explicitly set __VUE_PROD_DEVTOOLS__ to false for production builds
    // This ensures devtools support is excluded from the bundle
    __VUE_PROD_DEVTOOLS__: false,
  },
})
