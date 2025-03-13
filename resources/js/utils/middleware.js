import router from "@/router";
import store from "@/store";
import constants from "@/constants";

function isOAuthInProgress() {
    return localStorage.getItem(constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS) === "true";
}

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isAuthenticated;
    const isOAuth = isOAuthInProgress();

    console.log(`[Router] 🔍 Trạng thái đăng nhập: ${isLoggedIn}`);
    console.log(`[Router] ⏳ OAuth đang xử lý: ${isOAuth}`);

    if (!isLoggedIn && !isOAuth && to.name !== "login") {
        console.log("[Router] ⛔ Chưa đăng nhập, chuyển hướng login...");
        if (from.name !== "login") {
            return next({ name: "login" });
        }
        return;
    }

    if (isLoggedIn && !isOAuth && to.name === "login") {
        console.log("[Router] 🔄 Đã đăng nhập, chuyển hướng dashboard...");
        if (from.name !== "dashboard") {
            return next({ name: "dashboard" });
        }
        return;
    }

    next();
});
