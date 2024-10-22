import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: 'src',
  publicDir: path.join(__dirname, '/public'),
  envDir: path.join(__dirname, '.'),
  resolve: {
    alias: {
      '@/': `${path.join(__dirname, 'src')}/`,
    },
    extensions: ['.vue', '.js', '.ts']
  },
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['FBatteryIndicator', 'fbatteryindicator'].includes(tag),
        }
      }
    }),
  ],
})
