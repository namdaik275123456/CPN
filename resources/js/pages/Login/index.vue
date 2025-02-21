<template>
    <div class="login-container">
        <!-- Logo ngoài card -->
        <div class="logo-container">
            <b-img class="logo" src="/images/btec-logo.png" fluid alt="BTEC Logo"></b-img>
            <b-img class="logo" src="/images/melbourne-logo.png" fluid alt="Melbourne Logo"></b-img>
        </div>

        <!-- Thẻ đăng nhập -->
        <b-card class="login-card text-center">
            <h3 class="mb-4">Đăng nhập</h3>
            <b-form>
                <b-form-select v-model="selectedBranch" :options="branches" id="branch" required class="custom-select"></b-form-select>

                <b-button variant="danger" block class="custom-button google-btn mt-3" @click="loginWithGoogle">
                    <i class="fab fa-google"></i> Đăng nhập với Google
                </b-button>
            </b-form>
        </b-card>

        <button @click="show()">Hiênr thị</button>
        <button @click="hide()">Dong</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedBranch: null,
            branches: [
                { value: null, text: 'Chọn cơ sở' },
                { value: 'hcm', text: 'Hồ Chí Minh' },
                { value: 'hn', text: 'Hà Nội' },
                { value: 'dn', text: 'Đà Nẵng' },
                { value: 'ct', text: 'Cần Thơ' },
            ]
        };
    },
    methods: {
        loginWithGoogle() {
            console.log('Đăng nhập với Google');
            // Xử lý OAuth Google
        },
        show() {

        },
        hide() {

        }
    }
};
</script>

<style lang="scss" scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 10px;
    }

    /* Logo ngoài card */
    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* Kích thước logo thay đổi tùy theo thiết bị */
    .logo {
        width: 150px;
        height: auto;

        /* Mobile: thu nhỏ logo */
        @media (max-width: 576px) {
            width: 120px;
        }
    }

    /* Card đăng nhập */
    .login-card {
        width: 400px;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);

        /* Responsive cho màn hình nhỏ */
        @media (max-width: 576px) {
            width: 95%; /* Chiếm 90% màn hình trên mobile */
            padding: 20px;
        }
    }

    /* Dropdown chọn cơ sở */
    .custom-select {
        border-radius: 8px;
        padding: 12px;
        height: auto;
        min-height: 45px;
        font-size: 16px;
    }

    /* Nút Google */
    .custom-button {
        border-radius: 8px;
        padding: 12px;
        font-weight: bold;
        transition: 0.3s;
    }

    .custom-button:hover {
        opacity: 0.8;
    }

    .google-btn {
        background-color: #db4437;
        color: white;
    }

    .google-btn i {
        margin-right: 8px;
    }
</style>
