import Vue from "vue";
import VueRouter from "vue-router";

import LayoutDashboard from "@/layouts/Dashboard/index.vue";

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: "",
        redirect: {
            name: "login"
        },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/pages/Login/index.vue"),
    },
    {
        path: "/auth/google/callback",
        name: "oAuthCallback",
        component: () => import("@/pages/OAuthCallback/index.vue"),
    },
    {
        path: "*", // Bất kỳ route nào không khớp sẽ vào đây
        name: "pageNotFound",
        component: () => import("@/pages/PageNotFound/index.vue"),
    },
];

export const asyncRoutes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: LayoutDashboard,
        meta: {
          title: "Dashboard",
          icon: "fad fa-chart-pie",
          role: ["admin"]
        },
        redirect: {
          name: "eventManagement",
        },
        children: [
          {
            path: "events",
            name: "eventManagement",
            component: () => import("@/pages/Dashboard/Events/index.vue"),
            meta: {
                title: "Sự kiện",
                icon: "fad fa-calendar-alt",
                role: ["admin"]
            },
          },
          {
            path: "students",
            name: "studentManagement",
            component: () => import("@/pages/Dashboard/Students/index.vue"),
            meta: {
                title: "Sinh viên",
                icon: "fad fa-user-graduate",
                role: ["admin"]
            },
          },
          {
            path: "campuses",
            name: "campusManagement",
            component: () => import("@/pages/Dashboard/Campuses/index.vue"),
            meta: {
                title: "Cơ sở",
                icon: "fad fa-university",
                role: ["admin"]
            },
          },
          {
            path: "departments",
            name: "departmentManagement",
            component: () => import("@/pages/Dashboard/Departments/index.vue"),
            meta: {
                title: "Phòng ban / bộ môn",
                icon: "fad fa-building",
                role: ["admin"]
            },
          },
          {
            path: "accounts",
            name: "accountManagement",
            component: () => import("@/pages/Dashboard/Accounts/index.vue"),
            meta: {
                title: "Tài khoản",
                icon: "fad fa-user-cog",
                role: ["admin"]
            },
          },
        ],
    },
];

const createRouter = () => new VueRouter({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
});

const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter();

	router.matcher = newRouter.matcher;
}

export default router;
