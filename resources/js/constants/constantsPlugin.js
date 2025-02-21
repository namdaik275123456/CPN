import CONSTANTS from '@/constants';

export default {
    install(Vue) {
        Vue.prototype.$constants = CONSTANTS;
    }
};
