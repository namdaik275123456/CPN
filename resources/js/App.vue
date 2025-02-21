<template>
    <div>
        <router-link to="/home">
            Home
        </router-link>

        <router-view />

        <i class="fas fa-wreath"></i>

        <div class="a">
            <div class="b">
                Ahgihi: {{ getCampus }}
            </div>
        </div>
    </div>
</template>

<script>
import CONSTANTS from '@/constants';

export default {
    name: 'App',
    computed: {
        getCampus() {
            return this.$store.getters.getCampus;
        }
    },
    created() {
        console.log(this.$helpers.isNumber('1'));
        console.log(CONSTANTS);
        console.log(this.$constants);
    }
}
</script>
