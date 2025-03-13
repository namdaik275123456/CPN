<template>
    <div class="page-oauth-callback"></div>
    <!-- Container trống, sẽ dùng để xử lý OAuth callback -->
</template>

<script>
    import CookieHelper from "@/utils/cookies"; // Import công cụ quản lý cookie
    import authService from "@/services/authService"; // Import dịch vụ xác thực

    export default {
        name: "OAuthCallback", // Đặt tên cho component
        beforeMount() {
            // Kiểm tra nếu người dùng đã được xác thực từ cookie, không cần xử lý lại callback
            if (CookieHelper.get("IS_AUTHENTICATED")) {
                return;
            }

            // Nếu không, gọi hàm xử lý callback OAuth
            this.handleCallback();
        },
        methods: {
            // Hàm xử lý callback OAuth từ Google hoặc dịch vụ xác thực khác
            async handleCallback() {
                try {
                    // Xóa trạng thái OAuth đang xử lý trong localStorage
                    localStorage.removeItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);

                    // Thiết lập trạng thái loading khi đang xử lý OAuth
                    this.$store.dispatch("app/setLoading", true);

                    // Lấy mã code từ URL (trả về từ OAuth provider)
                    const urlParams = new URLSearchParams(window.location.search);
                    const code = urlParams.get("code");

                    // Nếu không có mã code, tiến hành logout
                    if (!code) {
                        this.doLogout();
                        return;
                    }

                    // Gửi mã code đến server để xác thực người dùng và lấy thông tin người dùng
                    const auth = await authService.login({code});
                    const {user} = auth;

                    // Nếu không có người dùng, tiến hành logout
                    if (!user) {
                        this.doLogout();
                        return;
                    }

                    // Lưu trữ thông tin người dùng vào store
                    await this.$store.dispatch("auth/fetchUser", user);

                    // Tắt trạng thái loading
                    this.$store.dispatch("app/setLoading", false);

                    // In thông báo xác thực thành công và chuyển hướng đến trang dashboard
                    console.log("✅ Xác thực thành công, chuyển hướng Dashboard...");

                    // Chuyển hướng đến trang dashboard
                    this.$router.replace({
                        name: "dashboard",
                    });
                } catch (error) {
                    // Nếu có lỗi trong quá trình xử lý callback, gọi logout
                    console.error("[handleCallback]:", error);
                    this.doLogout();
                }
            },

            // Hàm logout
            doLogout() {
                // Tắt trạng thái loading
                this.$store.dispatch("app/setLoading", false);

                // Đặt lại trạng thái người dùng về chưa đăng nhập
                this.$store.dispatch("auth/setUserState", {
                    isAuthenticated: false,
                    user: null,
                });

                // Xóa trạng thái OAuth đang xử lý trong localStorage
                localStorage.removeItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);

                // Chuyển hướng về trang login
                this.$router.push({
                    name: "login",
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    /* Định dạng cho container của OAuth callback */
    .page-oauth-callback {
        height: 100vh; /* Chiếm toàn bộ chiều cao màn hình */
        width: 100%; /* Chiếm toàn bộ chiều rộng màn hình */
    }
</style>
