import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import auth from "./modules/auth";
import permission from "./modules/permission";

import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        auth,
        permission,
    },
    getters,
});
