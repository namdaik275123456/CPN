// Import Vue Router, store, và các constants cần thiết
import router from "@/router";
import store from "@/store";
import constants from "@/constants";

// Hàm kiểm tra tiến trình OAuth đang xử lý hay không
function isOAuthInProgress() {
    // Kiểm tra giá trị trong localStorage xem tiến trình OAuth có đang được xử lý không
    return localStorage.getItem(constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS) === "true";
}

// Cấu hình trước mỗi route được điều hướng
router.beforeEach((to, from, next) => {
    // Kiểm tra trạng thái đăng nhập của người dùng từ Vuex store
    const isLoggedIn = store.getters.isAuthenticated;
    // Kiểm tra xem có tiến trình OAuth đang xử lý không
    const isOAuth = isOAuthInProgress();

    // In ra trạng thái hiện tại của đăng nhập và OAuth
    console.log(`[Router] 🔍 Trạng thái đăng nhập: ${isLoggedIn}`);
    console.log(`[Router] ⏳ OAuth đang xử lý: ${isOAuth}`);

    // 1. Nếu chưa đăng nhập và không có tiến trình OAuth, chuyển hướng đến trang login
    if (!isLoggedIn && !isOAuth && to.name !== "login") {
        console.log("[Router] ⛔ Chưa đăng nhập, chuyển hướng login...");
        // Nếu không phải là từ trang login, chuyển hướng đến login
        if (from.name !== "login") {
            return next({
                name: "login", // Điều hướng về trang login
            });
        }
        return;
    }

    // 2. Nếu đã đăng nhập và không có tiến trình OAuth, chuyển hướng đến dashboard khi cố gắng vào trang login
    if (isLoggedIn && !isOAuth && to.name === "login") {
        console.log("[Router] 🔄 Đã đăng nhập, chuyển hướng dashboard...");
        // Nếu không phải là từ trang dashboard, chuyển hướng về dashboard
        if (from.name !== "dashboard") {
            return next({
                name: "dashboard", // Điều hướng về trang dashboard
            });
        }
        return;
    }

    // Nếu không có điều kiện nào được thỏa mãn, tiếp tục điều hướng bình thường
    next();
});
