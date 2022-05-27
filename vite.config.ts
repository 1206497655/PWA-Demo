import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({ 
    mode: "development",
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ["**\/*.{js,css,html,jpg,jpeg,png,svg,ico}"],
    },
    manifest: {
      name: 'JOMOO',
      short_name: 'JOMOO',
      description: 'Description of your app',
      theme_color: '#ffffff',
      display: "fullscreen",
      start_url: "/index.html",
      icons: [
        {
          src: '/logo-32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: "/logo-192.png",
          sizes: "192x192",
          type: "image/png"
        }
      ]
    }
  })]
})
