import router, { resetRouter } from "@/router";
import CookieHelper from '@/utils/cookies';
import CONSTANTS from '@/constants';

const whiteList = ["/", "/login", "/auth/google/callback", "/test"];

function isLoggedIn() {
    try {
        const TOKEN = CookieHelper.get(CONSTANTS.COOKIE.TOKEN);

        console.log("TOKEN:", TOKEN);

        return Boolean(TOKEN);
    } catch (error) {
        console.log("[isLoggedIn]:", error);

        return false;
    }
}

router.beforeEach((to, from, next) => {
    const getStatusLogin = isLoggedIn();

    if (getStatusLogin) {
        console.log("Đã login");
    } else {
        console.log("Chưa login");

        resetRouter();

        if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
            console.log("whiteList");
            next();
        } else {
            if (to.name !== "Login" && to.name !== "OAuthCallback") {
                next({ name: "Login" });
            } else {
                next();
            }
        }
    }
});
