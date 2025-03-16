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
    import store from "@/store";

    export default {
        name: "App",

        computed: {
            isLoading() {
                return store.getters.isLoading;
            },
        },
    };
</script>
