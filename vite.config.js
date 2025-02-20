import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
        vue(),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // Sử dụng Vue có template compiler,
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    build: {
        sourcemap: false, // Tắt source map để tránh lộ mã nguồn khi build
        minify: "terser", // Giảm kích thước file JS
        terserOptions: {
            compress: {
                drop_console: true, // Loại bỏ console.log() trong bản build
                drop_debugger: true,
            },
        },
    },
});
