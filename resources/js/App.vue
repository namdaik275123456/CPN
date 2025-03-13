<template>
    <!-- Hiển thị overlay chờ khi isLoading là true -->
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
                <!-- Hiển thị biểu tượng loading -->
                <i class="fad fa-spinner-third fa-spin icon-loading" />
                <!-- Thông báo đang tải -->
                <p class="text-loading">Đang tải...</p>
            </div>
        </template>

        <!-- Hiển thị router-view nếu không còn loading -->
        <router-view v-if="!isLoading" />
    </b-overlay>
</template>

<script>
    import router from "@/router"; // Import router
    import store from "@/store"; // Import Vuex store
    import CookieHelper from "@/utils/cookies"; // Import tiện ích cookie
    import CONSTANTS from "@/constants"; // Import các hằng số (constants)

    export default {
        name: "App", // Đặt tên cho component

        computed: {
            isLoading() {
                return store.getters.isLoading; // Trả về giá trị isLoading từ Vuex getter
            },
        },

        async created() {
            try {
                // Kiểm tra trạng thái login và OAuth
                console.log(this.isLoggedIn() ? "Đã login" : "Chưa login");
                console.log(this.isOAuthInProgress() ? "Đang xử lý login google" : "Không xử lý login google");

                // Nếu đang xử lý OAuth, không làm gì
                if (this.isOAuthInProgress()) {
                    return;
                }

                // Kiểm tra trạng thái đăng nhập
                if (this.isLoggedIn()) {
                    console.log("Lấy thông tin user và phân quyền");

                    store.dispatch("app/setLoading", true); // Bắt đầu loading
                    await store.dispatch("auth/fetchUser"); // Gọi action fetchUser để lấy thông tin người dùng
                    store.dispatch("app/setLoading", false); // Dừng loading

                    router.push(window.location.pathname); // Điều hướng về trang hiện tại sau khi tải thông tin người dùng
                } else {
                    console.log("Chưa đăng nhập - Xoá thông tin user và phân quyền");
                    await this.doLogout(); // Xử lý đăng xuất nếu chưa đăng nhập
                }
            } catch (error) {
                console.error("[App] ❌ Lỗi khi tải user:", error);
                this.doLogout(); // Nếu có lỗi, đăng xuất
            }
        },

        methods: {
            // Kiểm tra xem người dùng đã đăng nhập hay chưa
            isLoggedIn() {
                return !!CookieHelper.get(CONSTANTS.COOKIE.IS_AUTHENTICATED); // Kiểm tra cookie xác nhận đăng nhập
            },

            // Kiểm tra xem có đang xử lý OAuth không
            isOAuthInProgress() {
                return localStorage.getItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS) === "true"; // Kiểm tra tiến trình OAuth trong localStorage
            },

            // Xử lý đăng xuất
            async doLogout() {
                await store.dispatch("auth/logout"); // Gọi action logout trong Vuex để xử lý đăng xuất
            },
        },
    };
</script>
