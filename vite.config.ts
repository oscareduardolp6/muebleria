import { defineConfig } from 'vite'
import commonjsExternals from 'vite-plugin-commonjs-externals'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [
  //   react(), 
  //   commonjsExternals({
  //     externals: ['path']
  // })]
  plugins: [commonjsExternals({
    externals: ['path']
  }), react()]
})
