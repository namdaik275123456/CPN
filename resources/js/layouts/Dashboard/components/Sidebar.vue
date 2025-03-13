<template>
    <div id="sidebar-wrapper">
        <!-- Menu sidebar -->
        <MenuSidebar
            class="sidebar-menu"
            :routes="dashboardChildren"
        />
    </div>
</template>

<script>
    import MenuSidebar from "./MenuSidebar.vue";

    export default {
        name: "Sidebar",
        components: {
            MenuSidebar,
        },
        computed: {
            dashboardChildren() {
                const dashboardRoute = this.$store.getters.routes.find((route) => route.name === "dashboard");
                return dashboardRoute ? (dashboardRoute.children || []).filter((child) => child.meta?.visible !== false) : [];
            },
        },
    };
</script>

<style lang="scss" scoped>
    @use "@/scss/_variables.scss";
    @use "@/scss/_layout.scss";
</style>
