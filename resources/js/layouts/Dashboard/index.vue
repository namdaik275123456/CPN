<template>
    <div>
        <Navbar />
        <AppMain />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import AppMain from './components/AppMain.vue';

export default {
    name: 'LayoutDashboard',
    components: {
        Navbar,
        AppMain
    },
}
</script>

<style lang="scss" scoped>

</style>
