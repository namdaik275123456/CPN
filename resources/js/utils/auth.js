import Cookies from "js-cookie";

export function getAuthStatus() {
    return Cookies.get("isAuthenticated") === "true";
}

export function setAuthStatus(value) {
    if (value) {
        Cookies.set("isAuthenticated", "true", { expires: 7 });
    } else {
        removeAuthStatus();
    }
}

export function removeAuthStatus() {
    Cookies.remove("isAuthenticated");
}
