import Cookies from "js-cookie";
import CONSTANTS from "@/constants";

/**
 * Kiểm tra trạng thái đăng nhập từ Cookie
 * @returns {Boolean} - true nếu đã đăng nhập, false nếu chưa
 */
export function getAuthStatus() {
    return Cookies.get(CONSTANTS.COOKIE.IS_AUTHENTICATED) === "true";
}

/**
 * Cập nhật trạng thái đăng nhập vào Cookie
 * @param {Boolean} value - Trạng thái đăng nhập
 */
export function setAuthStatus(value) {
    console.log(`[Auth] 🔹 setAuthStatus: ${value}`); // Debug

    if (value) {
        Cookies.set(CONSTANTS.COOKIE.IS_AUTHENTICATED, "true", {
            expires: 1,
        }); // Lưu 1 ngày
    } else {
        removeAuthStatus();
    }
}

/**
 * Xóa trạng thái đăng nhập trong Cookie
 */
export function removeAuthStatus() {
    console.log("[Auth] ❌ Xóa trạng thái đăng nhập");
    Cookies.remove(CONSTANTS.COOKIE.IS_AUTHENTICATED);
}
