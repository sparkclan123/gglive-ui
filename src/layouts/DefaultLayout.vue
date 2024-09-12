<template>
    <div class="relative min-h-screen pb-16">
        <nav class="bg-nav-top-color shadow-md inset-x-0 top-0 z-10">
            <div class="container mx-auto flex justify-center items-center relative" @click="facthTicket()">
                <img src="/public/assets/logo.webp" alt="Logo" class="h-10">
                <div class="absolute right-0 flex items-center  mr-4">
                    <i class="fas fa-ticket-alt text-yellow-400"></i>
                    <span class="ml-1 mr-2 text-yellow-200 text-xs">{{ getTicket }}</span>
                </div>

            </div>

            <div class="marquee" v-if="Aannounce">
                <p> {{ Aannounce }} </p>
            </div>


        </nav>
        <div class="container mx-auto p-1">
            <div>
                <LodingSceen :loading="getLoading" style="display: flex; justify-content: space-around;" />
            </div>

            <router-view :style="getLoading ? 'visibility: hidden' : 'visibility: visible'" />

        </div>
        <UserMobileNav class="fixed inset-x-0 bottom-0 bg-white rounded-t-mobile w-full h-16  shadow-2xl	" />
    </div>
</template>

<script>
import UserMobileNav from '../components/object/UserMobileNav.vue';
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
export default {
    name: 'DefaultLayout',
    data() {
        return {
            Aannounce: null,
        }
    },
    components: {
        UserMobileNav,
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('ticket', ['facthTicket']),
        ...mapActions('auth', ['facthUserInfo']),
        async getAannounces() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/get-aannounces', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.Aannounce = response.data.announces;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapGetters('loading', ['getLoading']),
        ...mapGetters('ticket', ['getTicket']),

    },
    mounted() {
        this.updateLoading(false);
        this.facthTicket();
        this.facthUserInfo();
        this.getAannounces();
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

.marquee {
    height: 20px;
    overflow: hidden;
    position: relative;
    background: #fefefe88;
    color: #222123;
    border: 1px solid #4a4a4a;
}

.marquee p {
    position: absolute;
    width:200%;
    height: 100%;
    font-size: 10px;
    margin: 0;
    line-height: 18px;
    text-align: center;
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    -moz-animation: scroll-left 2s linear infinite;
    -webkit-animation: scroll-left 2s linear infinite;
    animation: scroll-left 20s linear infinite;
}

@-moz-keyframes scroll-left {
    0% {
        -moz-transform: translateX(100%);
    }

    100% {
        -moz-transform: translateX(-100%);
    }
}

@-webkit-keyframes scroll-left {
    0% {
        -webkit-transform: translateX(100%);
    }

    100% {
        -webkit-transform: translateX(-100%);
    }
}

@keyframes scroll-left {
    0% {
        -moz-transform: translateX(100%);
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
    }

    100% {
        -moz-transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
}
</style>
