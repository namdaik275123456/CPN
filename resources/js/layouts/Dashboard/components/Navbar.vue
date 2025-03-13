<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand @click.prevent.stop="$emit('toggle')">
            <i id="toggle-menu" class="fad fa-align-left"></i>
        </b-navbar-brand>

        <!-- Logo bên trái -->
        <b-navbar-brand href="#">
            <img src="/images/btec-logo.png" alt="BTEC LOGO" class="logo" />
        </b-navbar-brand>
        <b-navbar-brand href="#">
            <img src="/images/melbourne-logo.png" alt="MELBOURNE LOGO" class="logo" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse">
            <template #default="{ expanded }">
                <i v-if="expanded" class="fas fa-angle-up" />
                <i v-else class="fas fa-angle-down" />
            </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <!-- User info, Avatar, and logout -->
                <b-nav-item-dropdown right>
                    <template #button-content>
                        <!-- Kiểm tra nếu user tồn tại và có avatar -->
                        <img
                            v-if="user && user.avatar"
                            :src="user.avatar"
                            alt="User Avatar"
                            class="user-avatar"
                        />
                        <span v-if="user" class="user-name">{{ user.name }}</span>
                    </template>

                    <!-- Dropdown Items -->
                    <b-dropdown-item>
                        <i class="fad fa-users icon-dropdown-item"></i>
                        Quản trị viên
                    </b-dropdown-item>

                    <b-dropdown-item>
                        <i class="fad fa-school icon-dropdown-item"></i>
                        Hà Nội
                    </b-dropdown-item>

                    <b-dropdown-item @click="logout">
                        <i class="fad fa-power-off icon-dropdown-item"></i>
                        Đăng xuất
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        user() {
            return this.$store.getters.user;  // Giữ nguyên logic lấy user từ store
        },
        titleRoute() {
            return this.$route.meta.title;
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("auth/logout");
        },
    },
};
</script>

<style lang="scss" scoped>
@use '@/scss/_variables';
@use '@/scss/_layout';

.nav-bar {
    position: sticky;
    top: 0;
    z-index: 999;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Căn chỉnh logo */
.logo {
    height: 40px;
    margin-right: 15px;
}

/* Căn chỉnh phần tiêu đề */
.app-name {
    font-size: 18px;
    font-weight: 600;
    color: #FF7F00;
}

/* Toggle Menu */
#toggle-menu {
    font-size: 24px;
    color: #FF7F00;
    cursor: pointer;
    transition: transform 0.2s;
}

#toggle-menu:hover {
    transform: scale(1.1);
}

/* User Info */
.user-info {
    display: flex;
    align-items: center;
    margin-left: 15px;
    gap: 20px;  // Khoảng cách giữa các phần tử
    color: #555;
}

.nav-text-item {
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
}

.text-label {
    font-weight: 600;
    color: #FF7F00;
}

.user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #FF7F00;
    margin-right: 10px;
    transition: border-color 0.3s ease;
}

.user-name {
    font-size: 14px;
    font-weight: 600;
    color: #333;
}

/* Dropdown */
.b-nav-item-dropdown {
    position: relative;
}

/* Icon dropdown item */
.icon-dropdown-item {
    margin-right: 8px;
    font-size: 16px;
    color: #FF7F00;

    width: 25px;
}

/* Hover Effects */
.b-nav-item-dropdown:hover .user-name {
    color: #FF7F00;
}

.b-nav-item-dropdown:hover .user-avatar {
    border-color: #FF4500;
}

/* Responsive */
@media (max-width: 768px) {
    .app-name {
        display: none;  // Ẩn tiêu đề trên mobile
    }

    .logo {
        height: 35px;
    }

    .user-avatar {
        width: 30px;
        height: 30px;
    }

    .user-info {
        gap: 10px;  // Giảm khoảng cách giữa các phần tử trên mobile
    }

    .nav-text-item {
        font-size: 12px;  // Giảm font size trên mobile
    }
}
</style>
