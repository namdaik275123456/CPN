<template>
    <h1>Test</h1>
</template>

<script>
import CookieHelper from '@/utils/cookies';

export default {
    name: "Test",
    mounted () {
        console.log(CookieHelper.get("isAuthenticated"));
    },
}
</script>

<style>

</style>
