import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/scss/global.scss";`
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {}
  }

  if (command === 'serve') {
    config.server = {
      host: true,
      port: 3001,
      watch: {
        usePolling: true
      }
    }
  }

  return config
})
