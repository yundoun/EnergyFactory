import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      'components': path.resolve('./src/components'),
      'features': path.resolve('./src/features'),
      'pages': path.resolve('./src/pages'),
      'assets': path.resolve('./src/assets'),
      'utils': path.resolve('./src/utils'),
      'hooks': path.resolve('./src/hooks'),
      'services': path.resolve('./src/services'),
    },
  },
})