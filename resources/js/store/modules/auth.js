import { getAuthStatus, setAuthStatus, removeAuthStatus } from "@/utils/auth";

export default {
    namespaced: true,
    state: {
        isAuthenticated: getAuthStatus(),
    },
    mutations: {
        SET_IS_AUTHENTICATED(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
            if (isAuthenticated) {
                setAuthStatus(isAuthenticated);
            } else {
                removeAuthStatus(); // Xóa cookies khi logout
            }
        },
    },
    actions: {
        async setIsAuthenticated({ commit }, isAuthenticated) {
            commit("SET_IS_AUTHENTICATED", isAuthenticated);
        },
        async logout({ commit }) {
            commit("SET_IS_AUTHENTICATED", false);
            removeAuthStatus();
        },
    },
};
