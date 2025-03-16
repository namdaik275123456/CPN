import {getAuthStatus, setAuthStatus, removeAuthStatus} from "@/utils/auth"; // Import các hàm xử lý trạng thái xác thực từ tiện ích
import router from "@/router"; // Import router của Vue
import {resetRouter} from "@/router"; // Import hàm reset router

export default {
    namespaced: true, // Đảm bảo module này có phạm vi tên riêng trong Vuex (để tránh xung đột với các module khác)

    state: {
        isAuthenticated: getAuthStatus(), // Lấy trạng thái đăng nhập từ Cookie
        user: null, // Thông tin user (ban đầu là null)
    },

    mutations: {
        /**
         * Cập nhật trạng thái đăng nhập và thông tin user
         */
        SET_USER_STATE(state, {isAuthenticated, user}) {
            console.log(`[Auth] 🔹 Cập nhật trạng thái: isAuthenticated=${isAuthenticated}, user=${user?.name || "null"}`);

            state.isAuthenticated = isAuthenticated; // Cập nhật trạng thái xác thực
            state.user = user; // Cập nhật thông tin user

            console.log("[VueX] User:", user);

            if (isAuthenticated) {
                setAuthStatus(true); // Lưu trạng thái đăng nhập vào Cookie khi user đã đăng nhập
            } else {
                removeAuthStatus(); // Xóa trạng thái đăng nhập trong Cookie khi user logout
            }
        },
    },

    actions: {
        /**
         * Cập nhật trạng thái đăng nhập và thông tin user
         */
        setUserState({commit}, {isAuthenticated, user = null}) {
            commit("SET_USER_STATE", {
                isAuthenticated,
                user,
            });
        },

        /**
         * Gọi API để lấy thông tin user
         */
        async fetchUser({commit, dispatch}, user = null) {
            try {
                console.log("📡 [Auth] Gọi API fetchUser...");

                if (user) {
                    console.log("✅ [Auth] Sử dụng thông tin user đã truyền vào.");
                } else {
                    // Giả lập dữ liệu API nếu không có user
                    user = {
                        name: "Đức Việt Vũ",
                        email: "vuducviet0131@gmail.com",
                        avatar: "https://lh3.googleusercontent.com/a/ACg8ocI-0lkf2NAOGdTgi8OvEfsIsNjsfFdkveWUE61H5lW8L9lZsymalg=s96-c",
                        roles: ["admin"], // Role của user
                        permissions: ["admin"], // Permissions của user
                    };
                }

                // Lưu thông tin user vào state
                dispatch("setUserState", {
                    isAuthenticated: true,
                    user: user,
                });

                // Gọi action `generateRoutes` từ module permission để tạo các route được phép truy cập
                const accessedRoutes = await dispatch(
                    "permission/generateRoutes",
                    {
                        roles: [user.role], // Truyền role của user
                        permissions: user.permissions, // Truyền permissions của user
                    },
                    {
                        root: true, // Gọi action ở root module (module ngoài cùng)
                    }
                );

                console.log(
                    "✅ [Auth] Routes được cấp quyền:",
                    accessedRoutes.map((r) => r.path)
                );

                // Thêm các route đã được cấp quyền vào Vue Router
                accessedRoutes.forEach((route) => {
                    router.addRoute(route); // Đăng ký các route vào Vue Router
                });
            } catch (error) {
                console.error("❌ Lỗi khi fetch user:", error);
                dispatch("resetAuthState"); // Reset trạng thái khi có lỗi
            }
        },

        /**
         * Xử lý logout - Xóa thông tin user và trạng thái đăng nhập
         */
        async logout({dispatch}) {
            try {
                console.log("[Auth] 🔹 Đang logout...");

                resetRouter(); // Xóa tất cả các route đã thêm vào
                await dispatch("resetAuthState"); // Reset trạng thái đăng nhập và xóa thông tin user

                console.log("[Auth] ✅ Logout thành công!");
                router.replace({name: "login"}); // Điều hướng về trang login sau khi logout
            } catch (error) {
                console.error("❌ Lỗi khi logout:", error);
            }
        },

        /**
         * Reset trạng thái đăng nhập và xóa thông tin user
         */
        resetAuthState({commit}) {
            commit("SET_USER_STATE", {
                isAuthenticated: false, // Đánh dấu là chưa đăng nhập
                user: null, // Xóa thông tin user
            });
        },
    },
};
