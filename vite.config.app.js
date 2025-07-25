import vue from '@vitejs/plugin-vue';
import ViteFonts from 'unplugin-fonts/vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import dotenv from "dotenv";
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';


dotenv.config();


export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900'
          }
        ]
      }
    }),
    cssInjectedByJsPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});
