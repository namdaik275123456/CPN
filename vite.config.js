import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';
import dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// Load biến môi trường từ file .env chung
const envConfig = dotenv.config();
dotenvExpand.expand(envConfig);

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
        createVuePlugin(),
    ],
    define: {
        __VUE_OPTIONS_API__: true,  // Đảm bảo hỗ trợ Options API
        __VUE_PROD_DEVTOOLS__: false, // Tắt Devtools trong production

        // Đọc các biến môi trường từ .env và định nghĩa vào import.meta.env
        ...Object.keys(envConfig.parsed).reduce((acc, key) => {
            acc[`import.meta.env.${key}`] = JSON.stringify(envConfig.parsed[key]);
            return acc;
        }, {})
    },
    resolve: {
        alias: {
            vue: path.resolve(__dirname, 'node_modules/vue'),
            'bootstrap-vue': path.resolve(__dirname, 'node_modules/bootstrap-vue'),
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
