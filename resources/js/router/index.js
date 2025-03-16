import Vue from "vue";
import VueRouter from "vue-router";

import LayoutDashboard from "@/layouts/Dashboard/index.vue";

// Sử dụng Vue Router trong ứng dụng
Vue.use(VueRouter);

// Routes cố định (không thay đổi, không phụ thuộc vào quyền người dùng)
export const constantRoutes = [
    // Route cho trang đăng nhập
    {
        path: "/login",
        name: "login",
        component: () => import("@/pages/Login/index.vue"), // Chạy dynamic import để tải trang login
    },
    // Route cho callback OAuth (đăng nhập qua Google)
    {
        path: "/auth/google/callback",
        name: "oAuthCallback",
        component: () => import("@/pages/OAuthCallback/index.vue"), // Chạy dynamic import cho trang OAuth callback
    },
    // Route cho trang không tìm thấy (404)
    {
        path: "*", // Bất kỳ route nào không khớp sẽ vào đây
        name: "pageNotFound",
        component: () => import("@/pages/PageNotFound/index.vue"), // Trang thông báo lỗi 404
    },
];

// Routes động (tùy thuộc vào quyền người dùng, sẽ thay đổi)
export const asyncRoutes = [
    {
        path: "",
        redirect: {
            name: "dashboard"
        }
    },
    {
        path: "/dashboard", // Route cho trang Dashboard
        name: "dashboard",
        component: LayoutDashboard, // Component dashboard chính
        meta: {
            title: "Dashboard", // Tiêu đề trang
            icon: "fad fa-chart-pie", // Icon cho trang dashboard
            role: ["admin"], // Chỉ cho phép user có role admin
        },
        redirect: {
            name: "eventManagement", // Redirect đến quản lý sự kiện
        },
        children: [
            {
                path: "events", // Route con cho quản lý sự kiện
                name: "eventManagement",
                component: () => import("@/pages/Dashboard/Events/index.vue"), // Component sự kiện
                meta: {
                    title: "Sự kiện", // Tiêu đề trang
                    icon: "fad fa-calendar-alt", // Icon cho sự kiện
                    role: ["admin"], // Chỉ cho phép role admin
                },
            },
            {
                path: "students", // Route con cho quản lý sinh viên
                name: "studentManagement",
                component: () => import("@/pages/Dashboard/Students/index.vue"), // Component sinh viên
                meta: {
                    title: "Sinh viên", // Tiêu đề trang
                    icon: "fad fa-user-graduate", // Icon cho sinh viên
                    role: ["admin"], // Chỉ cho phép role admin
                },
            },
            {
                path: "campuses", // Route con cho quản lý cơ sở
                name: "campusManagement",
                component: () => import("@/pages/Dashboard/Campuses/index.vue"), // Component cơ sở
                meta: {
                    title: "Cơ sở", // Tiêu đề trang
                    icon: "fad fa-university", // Icon cho cơ sở
                    role: ["admin"], // Chỉ cho phép role admin
                },
            },
            {
                path: "departments", // Route con cho quản lý phòng ban
                name: "departmentManagement",
                component: () => import("@/pages/Dashboard/Departments/index.vue"), // Component phòng ban
                meta: {
                    title: "Phòng ban / bộ môn", // Tiêu đề trang
                    icon: "fad fa-building", // Icon cho phòng ban
                    role: ["admin"], // Chỉ cho phép role admin
                },
            },
            {
                path: "accounts", // Route con cho quản lý tài khoản
                name: "accountManagement",
                component: () => import("@/pages/Dashboard/Accounts/index.vue"), // Component tài khoản
                meta: {
                    title: "Tài khoản", // Tiêu đề trang
                    icon: "fad fa-user-cog", // Icon cho tài khoản
                    role: ["admin"], // Chỉ cho phép role admin
                },
            },
        ],
    },
];

// Tạo một router mới
const createRouter = () =>
    new VueRouter({
        mode: "history", // Sử dụng lịch sử để điều hướng (không có dấu # trong URL)
        scrollBehavior: () => ({
            y: 0, // Mỗi khi chuyển trang, cuộn lên đầu trang
        }),
        routes: constantRoutes, // Sử dụng các routes cố định (constantRoutes) trong khi chưa xác thực
    });

// Khởi tạo router
const router = createRouter();

// Hàm reset router khi cần thiết (ví dụ sau khi logout)
export function resetRouter() {
    const newRouter = createRouter(); // Tạo một instance router mới
    router.matcher = newRouter.matcher; // Cập nhật matcher của router cũ bằng matcher của router mới
}

// Xuất router để sử dụng trong ứng dụng
export default router;
