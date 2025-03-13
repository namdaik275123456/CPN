<template>
    <div class="login-container">
        <!-- Logo ngoài card -->
        <div class="logo-container">
            <b-img
                class="logo"
                src="/images/btec-logo.png"
                fluid
                alt="BTEC Logo"
            ></b-img>
            <b-img
                class="logo"
                src="/images/melbourne-logo.png"
                fluid
                alt="Melbourne Logo"
            ></b-img>
        </div>

        <!-- Thẻ đăng nhập -->
        <b-card class="login-card text-center">
            <h3 class="mb-4">Đăng nhập</h3>
            <b-form>
                <!-- Dropdown chọn cơ sở -->
                <b-form-select
                    v-model="selectedBranch"
                    :options="branches"
                    id="branch"
                    class="custom-select"
                ></b-form-select>

                <!-- Nút đăng nhập với Google -->
                <b-button
                    variant="danger"
                    block
                    class="custom-button google-btn mt-3"
                    @click="loginWithGoogle"
                >
                    <i class="fab fa-google"></i>
                    Đăng nhập với Google
                </b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                // Lấy giá trị cơ sở đã lưu trong localStorage, nếu không có thì để mặc định là null
                selectedBranch: localStorage.getItem(this.$constants.LOCAL_STORAGE.CAMPUS) || null,
                // Các cơ sở có sẵn để người dùng chọn
                branches: [
                    {
                        value: null,
                        text: "Chọn cơ sở",
                    },
                    {
                        value: "hcm",
                        text: "Hồ Chí Minh",
                    },
                    {
                        value: "hn",
                        text: "Hà Nội",
                    },
                    {
                        value: "dn",
                        text: "Đà Nẵng",
                    },
                    {
                        value: "ct",
                        text: "Cần Thơ",
                    },
                ],
            };
        },
        computed: {
            // Kiểm tra xem đã chọn cơ sở hay chưa
            isSelectedBranchChange() {
                return this.selectedBranch;
            },
        },
        watch: {
            // Theo dõi sự thay đổi của cơ sở và lưu lại vào localStorage
            isSelectedBranchChange() {
                localStorage.setItem(this.$constants.LOCAL_STORAGE.CAMPUS, this.selectedBranch);
            },
        },
        methods: {
            // Hàm đăng nhập với Google
            loginWithGoogle() {
                try {
                    // Đánh dấu rằng OAuth đang được xử lý
                    localStorage.setItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS, "true");

                    // Kiểm tra nếu chưa chọn cơ sở, hiển thị cảnh báo
                    if (!this.selectedBranch) {
                        this.$toast.warning("Vui lòng chọn cơ sở trước khi đăng nhập!");
                        return;
                    }

                    // Lấy các thông tin cấu hình từ environment variables
                    const clientId = this.$env.VITE_GOOGLE_CLIENT_ID;
                    const redirectUri = this.$env.VITE_GOOGLE_REDIRECT_URI;
                    const scope = this.$env.VITE_GOOGLE_SCOPE;
                    const prompt = this.$env.VITE_GOOGLE_PROMPT;
                    const responseType = this.$env.VITE_GOOGLE_RESPONSE_TYPE;

                    // Tạo URL OAuth của Google
                    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=${prompt}&response_type=${responseType}`;

                    // Chuyển hướng trình duyệt đến Google để thực hiện OAuth
                    window.location.href = googleAuthURL;
                } catch (error) {
                    // Nếu có lỗi, xóa trạng thái OAuth đang xử lý
                    console.log("[loginWithGoogle]:", error);
                    localStorage.removeItem(this.$constants.LOCAL_STORAGE.OAUTH_IN_PROGRESS);
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    /* Định dạng container đăng nhập */
    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Chiếm toàn bộ chiều cao màn hình */
        padding: 10px;
    }

    /* Định dạng container chứa logo */
    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* Định dạng logo */
    .logo {
        width: 150px;
        height: auto;

        /* Responsive: thu nhỏ logo trên màn hình nhỏ */
        @media (max-width: 576px) {
            width: 120px;
        }
    }

    /* Định dạng card đăng nhập */
    .login-card {
        width: 400px;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px); /* Làm mờ nền card */

        /* Responsive cho màn hình nhỏ */
        @media (max-width: 576px) {
            width: 95%; /* Chiếm 90% màn hình trên mobile */
            padding: 20px;
        }
    }

    /* Định dạng dropdown chọn cơ sở */
    .custom-select {
        border-radius: 8px;
        padding: 12px;
        height: auto;
        min-height: 45px;
        font-size: 16px;
    }

    /* Định dạng nút đăng nhập Google */
    .custom-button {
        border-radius: 8px;
        padding: 12px;
        font-weight: bold;
        transition: 0.3s;
    }

    .custom-button:hover {
        opacity: 0.8; /* Hiệu ứng khi hover */
    }

    .google-btn {
        background-color: #db4437; /* Màu nền đỏ Google */
        color: white;
    }

    .google-btn i {
        margin-right: 8px; /* Khoảng cách giữa biểu tượng Google và chữ */
    }
</style>
