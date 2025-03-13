import {asyncRoutes, constantRoutes} from "@/router"; // Import các route động (async) và tĩnh (constant) từ file router

export default {
    namespaced: true, // Đảm bảo module này có phạm vi tên riêng trong Vuex (để tránh xung đột với các module khác)

    state: {
        routes: [], // Dữ liệu lưu trữ toàn bộ các route (bao gồm các route tĩnh và động)
        addRoutes: [], // Dữ liệu lưu trữ các route động (các route sẽ được thêm vào sau khi xác thực quyền)
    },

    mutations: {
        // Cập nhật các routes vào store
        SET_ROUTES(state, routes) {
            state.addRoutes = routes; // Lưu các route động vào state
            state.routes = constantRoutes.concat(routes); // Kết hợp các route tĩnh và động thành một mảng tổng hợp
        },
    },

    actions: {
        /**
         * Tạo danh sách route dựa trên roles và permissions của user
         *
         * @param {Object} context - Context của Vuex store
         * @param {Object} payload - payload chứa thông tin roles và permissions của người dùng
         */
        async generateRoutes({commit}, {roles, permissions}) {
            return new Promise((resolve) => {
                let accessedRoutes;

                // Kiểm tra nếu người dùng có quyền admin thì cho phép truy cập vào tất cả các route
                if (roles.includes("admin")) {
                    accessedRoutes = asyncRoutes || []; // Nếu là admin, sử dụng tất cả các route động
                } else {
                    // Nếu không phải admin, lọc ra các route mà user có quyền truy cập dựa trên roles và permissions
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, permissions);
                }

                commit("SET_ROUTES", accessedRoutes); // Cập nhật các route hợp lệ vào Vuex store
                resolve(accessedRoutes); // Trả về danh sách các route đã được kiểm tra quyền truy cập
            });
        },
    },
};

/**
 * Kiểm tra xem user có quyền truy cập vào route không dựa trên roles và permissions
 *
 * @param {Array} roles - Danh sách các roles của user
 * @param {Array} permissions - Danh sách các permissions của user
 * @param {Object} route - Route cần kiểm tra
 * @returns {boolean} - Trả về true nếu user có quyền truy cập, false nếu không
 */
function canAccess(roles, permissions, route) {
    if (route.meta) {
        // Kiểm tra xem route có thông tin meta không (thường dùng để lưu trữ roles/permissions)
        let hasRole = true;
        let hasPermission = true;

        // Kiểm tra nếu route có yêu cầu roles hoặc permissions
        if (route.meta.roles || route.meta.permissions) {
            hasRole = false; // Mặc định là không có quyền role
            hasPermission = false; // Mặc định là không có quyền permission

            // Kiểm tra quyền role của user có trong meta.roles của route hay không
            if (route.meta.roles) {
                hasRole = roles.some((role) => route.meta.roles.includes(role));
            }

            // Kiểm tra quyền permission của user có trong meta.permissions của route hay không
            if (route.meta.permissions) {
                hasPermission = permissions.some((permission) => route.meta.permissions.includes(permission));
            }
        }

        // Trả về true nếu có ít nhất một trong hai quyền (role hoặc permission)
        return hasRole || hasPermission;
    }
    return true; // Nếu route không có meta, mặc định user có quyền truy cập
}

/**
 * Lọc các route động (asyncRoutes) dựa trên quyền (roles và permissions) của user
 *
 * @param {Array} routes - Danh sách các route động cần lọc
 * @param {Array} roles - Danh sách các roles của user
 * @param {Array} permissions - Danh sách các permissions của user
 * @returns {Array} - Trả về danh sách các route hợp lệ mà user có quyền truy cập
 */
function filterAsyncRoutes(routes, roles, permissions) {
    return routes.reduce((acc, route) => {
        const tmp = {
            ...route, // Tạo một bản sao của route để không thay đổi trực tiếp route gốc
        };
        // Kiểm tra quyền truy cập của user với route này
        if (canAccess(roles, permissions, tmp)) {
            // Nếu route có children, gọi đệ quy để lọc các children của route đó
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles, permissions);
            }
            acc.push(tmp); // Thêm route hợp lệ vào danh sách kết quả
        }
        return acc;
    }, []); // Trả về danh sách các route hợp lệ
}
