import { getAuthStatus, setAuthStatus, removeAuthStatus } from "@/utils/auth";
import router from "@/router";
import { resetRouter } from "@/router";

export default {
    namespaced: true,
    state: {
        isAuthenticated: getAuthStatus(), // Lấy trạng thái từ Cookie
        user: null
    },
    mutations: {
        /**
         * Cập nhật trạng thái đăng nhập và thông tin user
         */
        SET_USER_STATE(state, { isAuthenticated, user }) {
            console.log(`[Auth] 🔹 Cập nhật trạng thái: isAuthenticated=${isAuthenticated}, user=${user?.name || "null"}`);

            state.isAuthenticated = isAuthenticated;
            state.user = user;

            if (isAuthenticated) {
                setAuthStatus(true); // Lưu vào Cookie
            } else {
                removeAuthStatus(); // Xóa Cookie khi logout
            }
        }
    },
    actions: {
        /**
         * Cập nhật trạng thái đăng nhập và thông tin user
         */
        setUserState({ commit }, { isAuthenticated, user = null }) {
            commit("SET_USER_STATE", { isAuthenticated, user });
        },

        /**
         * Gọi API lấy thông tin user
         */
        async fetchUser({ commit, dispatch }) {
            try {
                console.log("📡 [Auth] Gọi API fetchUser...");

                // Fake API - Giả lập dữ liệu user
                const fakeUser = {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    role: ["admin"],
                    permissions: ["admin"]
                };

                // ✅ Lưu thông tin user vào state
                dispatch("setUserState", { isAuthenticated: true, user: fakeUser });

                // ✅ Gọi action `generateRoutes` từ module permission
                const accessedRoutes = await dispatch(
                    "permission/generateRoutes",
                    { roles: [fakeUser.role], permissions: fakeUser.permissions },
                    { root: true }
                );

                console.log("✅ [Auth] Routes được cấp quyền:", accessedRoutes.map(r => r.path));

                // ✅ Thêm routes vào Vue Router
                accessedRoutes.forEach(route => {
                    router.addRoute(route);
                });
            } catch (error) {
                console.error("❌ Lỗi khi fetch user:", error);
                dispatch("resetAuthState"); // Reset trạng thái khi có lỗi
            }
        },

        /**
         * Xử lý logout - Xóa thông tin user và trạng thái đăng nhập
         */
        async logout({ dispatch }) {
            try {
                console.log("[Auth] 🔹 Đang logout...");

                resetRouter(); // Xóa toàn bộ routes trước
                await dispatch("resetAuthState"); // Reset trạng thái đăng nhập và xóa user

                console.log("[Auth] ✅ Logout thành công!");
                router.replace({ name: "login" }); // Điều hướng về trang login
            } catch (error) {
                console.error("❌ Lỗi khi logout:", error);
            }
        },

        /**
         * Reset trạng thái đăng nhập và xóa thông tin user
         */
        resetAuthState({ commit }) {
            commit("SET_USER_STATE", { isAuthenticated: false, user: null });
        }
    }
};
