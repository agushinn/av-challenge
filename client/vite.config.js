import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@assets': '/src/assets',
            '@components': '/src/components',
            '@hooks': '/src/hooks',
            '@pages': '/src/pages',
            '@store': '/src/store',
            '@styles': '/src/styles',
            '@utils': '/src/utils',
            '@configs': '/src/configs',
        },
    },
})
