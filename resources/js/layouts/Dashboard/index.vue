<template>
    <div
        id="wrapper"
        :class="toggle"
    >
        <Sidebar />
        <div id="page-content-wrapper">
            <Navbar @toggle="toggleMenu" />
            <div class="app-main">
                <AppMain />
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar.vue";
    import Sidebar from "./components/Sidebar.vue";
    import AppMain from "./components/AppMain.vue";

    export default {
        name: "Layout",
        components: {
            Navbar,
            Sidebar,
            AppMain,
        },
        data() {
            return {
                toggle: "",
                toggleBool: false,
            };
        },
        methods: {
            toggleMenu() {
                this.toggleBool = !this.toggleBool;
                if (this.toggleBool === true) {
                    this.toggle = "toggled";
                } else {
                    this.toggle = "";
                }
            },
        },
    };
</script>

<style lang="scss">
    @use "@/scss/_variables.scss";
    @use "@/scss/_layout.scss";

    #wrapper {
        #page-content-wrapper {
            .app-main {
                background-color: #f9f9f9;
                padding: 20px;

                overflow-y: auto;

                @media (max-width: 768px) {
                    padding: 10px; // Giảm padding trên mobile
                }

                @media (max-width: 480px) {
                    padding: 10px; // Giảm thêm cho màn hình nhỏ hơn
                }
            }
        }
    }
</style>
