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
            role: ['admin']
        },
        redirect: {
            name: "dashboardHome"
        },
        children: [
            {
                path: "home",
                name: "dashboardHome",
                component: () => import("@/pages/Dashboard/Home/index.vue")
            }
        ]
    }
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
