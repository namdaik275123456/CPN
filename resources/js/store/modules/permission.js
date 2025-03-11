import { asyncRoutes, constantRoutes } from '@/router';

export default {
    namespaced: true,
    state: {
        routes: [],
        addRoutes: [],
    },
    mutations: {
        SET_ROUTES(state, routes) {
            state.addRoutes = routes;
            state.routes = constantRoutes.concat(routes);
        },
    },
    actions: {
        /**
         * Tạo danh sách route dựa trên roles và permissions của user
         */
        async generateRoutes({ commit }, { roles, permissions }) {
            return new Promise(resolve => {
                let accessedRoutes;

                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes || [];
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, permissions);
                }

                commit('SET_ROUTES', accessedRoutes);
                resolve(accessedRoutes);
            });
        },
    }
};

/**
 * Kiểm tra user có quyền truy cập vào route không
 */
function canAccess(roles, permissions, route) {
    if (route.meta) {
        let hasRole = true;
        let hasPermission = true;

        if (route.meta.roles || route.meta.permissions) {
            hasRole = false;
            hasPermission = false;

            if (route.meta.roles) {
                hasRole = roles.some(role => route.meta.roles.includes(role));
            }

            if (route.meta.permissions) {
                hasPermission = permissions.some(permission => route.meta.permissions.includes(permission));
            }
        }

        return hasRole || hasPermission;
    }
    return true;
}

/**
 * Lọc route phù hợp với roles & permissions của user
 */
function filterAsyncRoutes(routes, roles, permissions) {
    return routes.reduce((acc, route) => {
        const tmp = { ...route };
        if (canAccess(roles, permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles, permissions);
            }
            acc.push(tmp);
        }
        return acc;
    }, []);
}
