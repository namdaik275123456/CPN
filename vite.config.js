import {defineConfig} from "vite";
import laravel from "laravel-vite-plugin";
import {createVuePlugin} from "vite-plugin-vue2";
import path from "path";
import dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

// Load biến môi trường từ file .env chung
const envConfig = dotenv.config(); // Đọc các biến môi trường từ file .env
dotenvExpand.expand(envConfig); // Mở rộng và xử lý các biến môi trường, ví dụ như các biến định nghĩa trong `.env` có thể tham chiếu lẫn nhau

export default defineConfig({
    plugins: [
        // Plugin Laravel giúp tích hợp Vite vào Laravel để xây dựng các asset như JavaScript và CSS
        laravel({
            input: ["resources/js/app.js", "resources/css/app.css"], // Các file JS và CSS chính để Vite quản lý
            refresh: true, // Bật chế độ refresh lại trang khi thay đổi file (hot-reload)
        }),
        // Plugin Vue 2 để hỗ trợ cú pháp Vue 2 trong dự án
        createVuePlugin(),
    ],
    define: {
        // Đảm bảo hỗ trợ Vue Options API, mặc định Vue 3 sử dụng Composition API
        __VUE_OPTIONS_API__: true,
        // Tắt Devtools trong môi trường production (để bảo mật và tối ưu hóa)
        __VUE_PROD_DEVTOOLS__: false,

        // Đọc các biến môi trường từ .env và định nghĩa vào import.meta.env
        // Giúp bạn có thể truy cập các biến môi trường trong code JS thông qua `import.meta.env`
        ...Object.keys(envConfig.parsed).reduce((acc, key) => {
            acc[`import.meta.env.${key}`] = JSON.stringify(envConfig.parsed[key]);
            return acc;
        }, {}),
    },
    resolve: {
        // Định nghĩa alias để dễ dàng import các thư viện
        alias: {
            vue: path.resolve(__dirname, "node_modules/vue"), // Alias cho Vue 2
            "bootstrap-vue": path.resolve(__dirname, "node_modules/bootstrap-vue"), // Alias cho Bootstrap Vue
            "@": path.resolve(__dirname, "resources/js"), // Alias cho thư mục nguồn JS
        },
    },
    server: {
        // Cấu hình cho server Vite, đặc biệt là HMR (Hot Module Replacement)
        hmr: {
            host: "localhost", // Cấu hình hostname cho HMR
        },
    },
    build: {
        // Cấu hình cho quá trình build (đóng gói ứng dụng)
        sourcemap: false, // Tắt source map để tránh lộ mã nguồn trong bản build (bảo mật)
        minify: "terser", // Sử dụng terser để giảm kích thước file JavaScript
        terserOptions: {
            compress: {
                drop_console: true, // Loại bỏ các console.log trong bản build
                drop_debugger: true, // Loại bỏ các câu lệnh debugger trong bản build
            },
        },
    },
});
