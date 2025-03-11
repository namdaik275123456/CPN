<template>
    <b-overlay
        :show="isLoading"
        variant="white"
        opacity="1"
        blur="1rem"
        rounded="sm"
        z-index="999999"
    >
        <template #overlay>
            <div class="text-center">
                <i class="fad fa-spinner-third fa-spin icon-loading" />
                <p class="text-loading">Đang tải...</p>
            </div>
        </template>

        <router-view v-if="!isLoading" />
    </b-overlay>
</template>

<script>
import router from "@/router";
import store from "@/store";
import CookieHelper from "@/utils/cookies";
import CONSTANTS from "@/constants";

export default {
    name: "App",
    computed: {
        isLoading() {
            return store.getters.isLoading;
        }
    },
    async created() {
        try {
            console.log("APP");

            console.log(this.isLoggedIn() ? "Đã login" : "Chưa login");
            console.log(this.isOAuthInProgress() ? "Đang xử lý login google" : "Không xử lý login google");

            if (this.isOAuthInProgress()) {
                return;
            }

            if (this.isLoggedIn()) {
                console.log("Lấy thông tin user và phân quyền");
                await store.dispatch("auth/fetchUser");

                router.push({ name: "dashboardHome" });
            } else {
                console.log("Chưa đăng nhập - Xoá thông tin user và phân quyền");
                await this.doLogout();
            }
        } catch (error) {
            console.error("[App] ❌ Lỗi khi tải user:", error);

            this.doLogout();
        }
    },
    methods: {
        isLoggedIn() {
            return !!CookieHelper.get(CONSTANTS.COOKIE.IS_AUTHENTICATED);
        },
        isOAuthInProgress() {
            return localStorage.getItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS) === "true";
        },
        async doLogout() {
            await store.dispatch("auth/logout");
        }
    }
};
</script>
