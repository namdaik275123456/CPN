<template>
    <transition
        name="slide-up"
        mode="out-in"
    >
        <router-view :key="key" />
    </transition>
</template>

<script>
    export default {
        name: "AppMain",
        computed: {
            key() {
                return this.$route.fullPath;
            },
        },
    };
</script>

<style lang="scss" scoped>
    /* Hiệu ứng slide từ dưới lên */
    .slide-up-enter-active,
    .slide-up-leave-active {
        transition:
            transform 0.5s ease-in-out,
            opacity 0.5s ease-in-out;
    }

    .slide-up-enter,
    .slide-up-leave-to {
        transform: translateY(20px); /* Di chuyển từ dưới lên */
        opacity: 0;
    }
</style>
