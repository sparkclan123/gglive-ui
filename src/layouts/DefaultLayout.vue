<template>
    <div class="relative min-h-screen pb-16">
        <nav class="bg-nav-top-color shadow-md inset-x-0 top-0 z-10">
            <div class="container mx-auto flex justify-center">
                <img src="/public/assets/logo.webp" alt="Logo" class="h-10">
                <!-- ปรับ path และขนาดของโลโก้ตามที่ต้องการ -->
            </div>
        </nav>
        <span @click="facthBalance()">asdasdasdasdasd</span>
        <div class="container mx-auto p-1">
            <div v-if="getLoading" class="loading-overlay">
                <LodingSceen style="display: flex; justify-content: space-around;" />
            </div>
            <router-view :style="getLoading ? 'visibility: hidden' : 'visibility: visible'" class="bg-color-1" />
        </div>
        <UserMobileNav class="fixed inset-x-0 bottom-0 bg-white rounded-t-mobile w-full h-16" />
    </div>
</template>

<script>
import UserMobileNav from '../components/object/UserMobileNav.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'DefaultLayout',
    components: {
        UserMobileNav,
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('balance', ['facthBalance']),
    },
    computed: {
        ...mapGetters('loading', ['getLoading']),
    },
    mounted() {
        this.updateLoading(false);
        this.facthBalance();
      
    },
};
</script>

<style scoped>
.bg-color-1 {
    background-color: #ffffff;
    border-radius: 0.5rem;
}

.user-mobile-nav {
    height: 60px;
}

nav img {
    max-height: 40px;
}

.bg-nav-top-color {
    background: #1e0f37;
}
</style>