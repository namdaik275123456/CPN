<template>
    <b-overlay
        :show="isLoading"
        variant="white"
        :opacity="1"
        blur="1rem"
        rounded="sm"
        :z-index="999999"
    >
        <template #overlay>
            <div class="text-center">
                <i class="fad fa-spinner-third fa-spin icon-loading" />
                <p class="text-loading">
                    Đang tải...
                </p>
            </div>
        </template>
        <router-view />
    </b-overlay>
</template>

<script>
export default {
    name: "App",
    computed: {
        isLoading() {
            return this.$store.getters.isLoading;
        }
    }
};
</script>
