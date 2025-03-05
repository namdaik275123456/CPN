export default {
    namespaced: true,
    state: {
        isLoading: false
    },
    mutations: {
        SET_LOADING(state, status) {
            state.status = status;
        },
    },
    actions: {
        setLoading({ commit }, status) {
            commit('SET_LOADING', status);
        },
    }
};
