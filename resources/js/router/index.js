import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/pages/Login/index.vue";
import GoogleCallBack from "@/pages/OAuthCallback/index.vue";

import Test from "@/pages/Test/index.vue";

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/auth/google/callback",
        name: "OAuthCallback",
        component: GoogleCallBack,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/test",
        name: "Test",
        component: Test
    }
];

export const asyncRoutes = [];

const createRouter = () => new VueRouter({
    mode: "history",
    routes: constantRoutes,
});

const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter();

	router.matcher = newRouter.matcher;
}

export default router;
