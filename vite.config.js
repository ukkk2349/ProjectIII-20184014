import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: './',
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: path.resolve(__dirname, './src')
      },
      {
        find: '@css',
        replacement: path.resolve(__dirname, './src/assets/css')
      }
    ]
  },
  plugins: [
    vue(),
  ],

  build: {
    chunkSizeWarningLimit: 3000
  }
})
