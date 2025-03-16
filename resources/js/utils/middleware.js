// Import Vue Router, store, và các constants cần thiết
import router from "@/router";
import store from "@/store";
import constants from "@/constants";

// Hàm kiểm tra tiến trình OAuth đang xử lý hay không
function isOAuthInProgress() {
    // Kiểm tra giá trị trong localStorage xem tiến trình OAuth có đang được xử lý không
    return localStorage.getItem(constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS) === "true";
}

const whiteList = ["/login"];

// Cấu hình trước mỗi route được điều hướng
router.beforeEach(async(to, from, next) => {
    const isLoggedIn = store.getters.isAuthenticated;
    const isOAuth = isOAuthInProgress();

    console.log(isLoggedIn ? "[Đã login]" : "[Chưa login]");
    console.log(isOAuth ? "[Đang login GG]" : "[Không login GG]");

    if (isLoggedIn || isOAuth) {
        if (to.name == "login") {
            next({ path: "/" })
        } else {
            let user = store.getters.user;

            const hasRoles = user && user.roles && user.roles.length > 0;

            if (hasRoles) {
                next();
            } else {
                try {
                    if (to.name == "oAuthCallback") {
                        next();
                    } else {
                        store.dispatch("app/setLoading", true);
                        await store.dispatch("auth/fetchUser");
                        store.dispatch("app/setLoading", false);

                        localStorage.removeItem(constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);

                        next((window.location.pathname + window.location.search));
                    }
                } catch (error) {
                    console.log("Lỗi xử lý phân quyền:", error);

                    await store.dispatch("auth/resetAuthState");
                    localStorage.removeItem(constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);

                    next({ name: "login" });
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
            next();
        } else {
            next({ name: "login" });
        }
    }
});
