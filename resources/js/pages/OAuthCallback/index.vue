<template>
    <div>Loading...</div>
</template>

<script>
import authService from "@/services/authService";

export default {
    name: "OAuthCallback",
    beforeMount() {
        this.handleCallback();
    },
    methods: {
        async handleCallback() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get("code");
                console.log("code:", code);

                if (!code) {
                    this.$router.push({ name: "Login" });

                    return;
                }

                const auth = await authService.login({ code });
                console.log(auth);

                const { user } = auth;
                if (!user) {

                    await this.$store.dispatch("auth/setIsAuthenticated", false)
                    this.$router.push("/login");

                    return;
                }

                await this.$store.dispatch("auth/setIsAuthenticated", true);
                this.$router.push("/test");
            } catch (error) {
                console.log("[handleCallback]:", error);

                await this.$store.dispatch("auth/setIsAuthenticated", false)
                this.$router.push("/login");
            }
        }
    },
}
</script>
