import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';

import Home from '@/pages/Home/index.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/home', component: Home },
];

const router = new VueRouter({
    mode: 'history', // Sử dụng history mode để URL không có dấu #
    routes
});

export default router;
