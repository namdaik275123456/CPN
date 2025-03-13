<template>
    <div>
        <h1>404 - Page Not Found</h1>
        <button @click="goHome">Home</button>
    </div>
</template>

<script>
    export default {
        name: "PageNotFound",
        methods: {
            goHome() {
                this.$router.push({
                    name: "dashboardHome",
                });
            },
        },
    };
</script>

<style lang="scss" scoped></style>
