<template>
    <div>
        <div class="contant_style">
            <iframe
                :src="iframeSrc"
                class="iframe_style"
                frameborder="0"
            ></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: "plinko",
    data() {
        return {
            access_token: ""
        };
    },
    computed: {
        iframeSrc() {
            return this.access_token
                ? `http://127.0.0.1:8080/?access_token=${this.access_token}`
                : "about:blank"; // Fallback when access_token is not available
        }
    },
    methods: {
        getAccessToken() {
            this.access_token = localStorage.getItem('access_token');
        }
    },
    created() {
        this.getAccessToken();
    }
};
</script>

<style scoped>
.contant_style {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
    overflow: hidden; /* Ensure iframe content doesn't overflow */
    /* Ensure the container adapts to the screen size */
    width: 100%;
    height: 65vh; /* Use viewport height to make the container fill the screen */
}

.iframe_style {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%; /* Ensure the iframe fills its container */
    overflow: auto; /* Ensure iframe content can scroll */
}
</style>
