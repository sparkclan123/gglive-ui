<template>
    <div class="relative min-h-screen pb-16">
        <nav class="bg-nav-top-color shadow-md inset-x-0 top-0 z-10">
            <div class="container mx-auto flex justify-center items-center relative" @click="facthTicket()">
                <img src="/public/assets/logo.webp" alt="Logo" class="h-10">
                <div class="absolute right-0 flex items-center mr-4">
                    <i class="fas fa-ticket-alt text-yellow-400"></i>
                    <span class="ml-1 mr-2 text-yellow-200 text-xs">{{ getTicket }}</span>
                </div>
            </div>
            <div class="marquee" v-if="Aannounce">
                <p>{{ Aannounce }}</p>
            </div>
        </nav>

        <div class="container mx-auto p-1">
            <LodingSceen :loading="getLoading" style="display: flex; justify-content: space-around;" />
            <router-view :style="getLoading ? 'visibility: hidden' : 'visibility: visible'" />
        </div>

        <!-- Modal -->
        <!-- <transition name="fade">
            <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
                @click.self="hideForToday">
                <div class="relative p-2">
                    <img src="https://pudee.sgp1.digitaloceanspaces.com/newreward.png" alt="Reward Image"
                        @click="hideForToday" class="cursor-pointer max-w-full h-auto  rounded-lg">
                    <button @click="hideForToday"
                        class="absolute top-0 right-0 bg-red-800 text-white text-xs px-3 py-1 rounded" style="margin-top: -15px;">ไม่ต้องแสดงอีกวันนี้</button>
                </div>
            </div>
        </transition> -->

        <UserMobileNav class="fixed inset-x-0 bottom-0 bg-white rounded-t-mobile w-full h-16 shadow-2xl" />
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
            showModal: false, // state for modal
        };
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
        closeModal() {
            this.showModal = false;
        },
        hideForToday() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            sessionStorage.setItem('hideModalUntil2', tomorrow.toISOString());
            this.showModal = false;
        },
        checkModalStatus() {
            const hideModalUntil = sessionStorage.getItem('hideModalUntil2');
            if (!hideModalUntil || new Date(hideModalUntil) < new Date()) {
                this.showModal = true;
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
        this.checkModalStatus(); // Check modal status on mount
    },
};
</script>

<style scoped>
/* Modal Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

/* Modal Styling */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
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
    width: 200%;
    height: 100%;
    font-size: 10px;
    margin: 0;
    line-height: 18px;
    text-align: center;
    animation: scroll-left 20s linear infinite;
}

@keyframes scroll-left {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>