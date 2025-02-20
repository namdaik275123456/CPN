<template>
    <div>
        <router-link to="/home">
            Home
        </router-link>

        <router-view />

        <div class="a">
            <div class="b">
                Ahgihi: {{ getCampus }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        getCampus() {
            return this.$store.getters.getCampus;
        }
    },
    created() {
        console.log(this.$helpers.isNumber('1'));
    }
}
</script>
