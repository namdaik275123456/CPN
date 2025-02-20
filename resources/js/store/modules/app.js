export default {
    namespaced: true,
    state: {
        campus: "HN"
    },
    mutations: {
        SET_CAMPUS(state, campus) {
            state.campus = campus;
        },
    },
    actions: {
        setCampus({ commit }, campus) {
            commit('SET_CAMPUS', campus);
        },
    }
};
