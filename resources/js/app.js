import Vue from 'vue';
import App from '../js/App.vue';

// ENV
Vue.prototype.$env = import.meta.env;

// Vue Router
import router from './router';

// VueX
import store from './store';
Vue.prototype.$store = store;

// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

// Toast
import ToastService from '@/utils/toast';

Vue.use(ToastService);

// Helpers
import * as helpers from "@/utils/helpers";

Vue.prototype.$helpers = helpers;

// Event Bus
import EventBus from "@/utils/eventBus";

Vue.use(EventBus);

// Constants
import ConstantsPlugin from '@/constants/constantsPlugin';

Vue.use(ConstantsPlugin);

// Import CSS
import '../css/app.css';
import '../css/fontawesome/css/all.min.css';

// Import SCSS
import '@/scss/app.scss';

// Middleware
import '@/utils/middleware';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
