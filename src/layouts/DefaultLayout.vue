<template>
    <div class="relative min-h-screen pb-16">
        <nav class="bg-nav-top-color shadow-md inset-x-0 top-0 z-10">
            <div class="container mx-auto flex justify-center items-center relative">
                <img src="/public/assets/logo.webp" alt="Logo" class="h-10">
                <div class="absolute right-0 flex items-center  mr-4">
                    <i class="fas fa-ticket-alt text-gray-400"></i>
                    <span class="ml-1 mr-2 text-gray-200 text-xs">3</span>

                    <i class="fas fa-ticket-alt text-yellow-400"></i>
                    <span class="ml-1 text-yellow-200 text-xs">0</span>
                </div>
                
            </div>
        </nav>
        <div class="container mx-auto p-1">
            <div v-if="getLoading">
                <LodingSceen style="display: flex; justify-content: space-around;" />
            </div>

            <router-view :style="getLoading ? 'visibility: hidden' : 'visibility: visible'" />

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
