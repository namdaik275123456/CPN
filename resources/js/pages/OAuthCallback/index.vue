<template>
    <div class="page-oauth-callback">

    </div>
</template>

<script>
import CookieHelper from "@/utils/cookies";
import authService from "@/services/authService";

export default {
    name: "OAuthCallback",
    beforeMount() {
        if (CookieHelper.get("IS_AUTHENTICATED")) {
            return;
        }

        this.handleCallback();
    },
    methods: {
        async handleCallback() {
            try {
                localStorage.removeItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);

                this.$store.dispatch("app/setLoading", true);

                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get("code");

                if (!code) {
                    this.doLogout();
                    return;
                }

                const auth = await authService.login({ code });
                const { user } = auth;

                if (!user) {
                    this.doLogout();
                    return;
                }

                await this.$store.dispatch("auth/fetchUser");

                this.$store.dispatch("app/setLoading", false);

                console.log("✅ Xác thực thành công, chuyển hướng Dashboard...");

                this.$router.replace({ name: "dashboard" });
            } catch (error) {
                console.error("[handleCallback]:", error);
                this.doLogout();
            }
        },
        doLogout() {
            this.$store.dispatch("app/setLoading", false);
            this.$store.dispatch("auth/setUserState", {
                isAuthenticated: false,
                user: null
            });

            localStorage.removeItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);

            this.$router.push({ name: "login" });
        }
    }
};

</script>

<style lang="scss" scoped>
.page-oauth-callback {
    height: 100vh;
    width: 100%;
}
</style>
