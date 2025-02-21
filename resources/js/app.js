import Vue from 'vue/dist/vue.esm.js';
import App from '../js/App.vue';

import router from './router';

import store from './store';
Vue.prototype.$store = store;

import * as helpers from "@/utils/helpers";

Vue.prototype.$helpers = helpers;

import BootstrapVue from 'bootstrap-vue';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

// Import CSS
import '../css/app.css';
import '../css/fontawesome.css';

// Import SCSS
import '@/scss/app.scss';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
