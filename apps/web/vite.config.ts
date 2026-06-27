import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({

    plugins: [tailwindcss(), react()],
    base:'',
    cacheDir: path.resolve(__dirname, 'node_modules/.vite-system-ui'),
    optimizeDeps: {
        include: [],
        exclude: ['@shared/model', '@shared/axios'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@shared/model': path.resolve(__dirname, '../../packages/shared/model/index.ts'),
            '@shared/axios': path.resolve(__dirname, '../../packages/shared/axios/index.ts'),
        },
    },
});
