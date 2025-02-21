import Vue from "vue/dist/vue.esm.js";
import VueRouter from "vue-router";

import Login from "@/pages/Login/index.vue";

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
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
