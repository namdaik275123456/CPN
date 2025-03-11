const getters = {
    isLoading: state => state.app.isLoading,

    isAuthenticated: state => state.auth.isAuthenticated,

    user: state => state.auth.user
};

export default getters;
