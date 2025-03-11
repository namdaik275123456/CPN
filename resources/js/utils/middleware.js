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

    // 🚀 Nếu OAuth đang xử lý, không ép buộc redirect về login
    if (!isLoggedIn && !isOAuth && to.name !== "login") {
        console.log("[Router] ⛔ Chưa đăng nhập, chuyển hướng login...");
        return next({ name: "login" });
    }

    if (isLoggedIn && !isOAuth && to.name === "login") {
        console.log("[Router] 🔄 Đã đăng nhập, chuyển hướng dashboard...");
        return next({ name: "dashboard" });
    }

    next();
});
