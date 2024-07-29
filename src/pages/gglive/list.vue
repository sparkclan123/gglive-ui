<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div v-if="userinfo">
            <div style="margin-bottom: -30px;">

                <div class="card">
                    <div class="heading text-gray-700">{{ truncatedUsername }}</div>
                    <div class="details">รายละเอียดการเเข่งขันของคุณ.<br>ทั้งเกมวีคกติ, เเละเกมวีค <span class="text-yellow-600">VIP</span>.</div>
                  
                </div>
                <img :src="userinfo.ImageURL ? userinfo.ImageURL : '/public/assets/logo.webp'" alt="Logo"
                    class="glasses rounded-full shadow-lg">


            </div>
            
            <div>
                <div class="tabs rounded-t-lg ml-3 text-white flex mt-2">
                    <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="SetactiveTab('tab1')">
                        เกมวีคปกติ
                    </div>
                    <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="SetactiveTab('tab2')">
                        เกมวีค
                        VIP <i class="fas fa-ticket-alt text-yellow-400"></i>
                    </div>
                </div>
                <div class="rounded-xl shadow-lg min-h-screen bg-fixcolor-p tab-container ">
                    <transition name="slide" mode="out-in" @before-enter="beforeEnter" @leave="leave">
                        <component :is="currentTabComponent" :key="activeTab" @set-loading="setLoading"></component>
                    </transition>
                </div>
            </div>
        </div>
    </div>
    <!-- component -->

</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
import MyGameWeekN from '../../components/list/MyGameWeekN.vue';
import MyGameWeek from '../../components/list/MyGameWeek.vue';
export default {
    data() {
        return {
            activeTab: 'tab1',
            loading: false,
        };
    },
    components: {
        MyGameWeek,
        MyGameWeekN,
    },
    computed: {
        ...mapGetters('auth', ['userinfo']),
        truncatedUsername() {
            let name = '';
            if (this.userinfo.Email && this.userinfo.Email.length > 0) {
                name = this.userinfo.Email;
            } else {
                name = this.userinfo.Username;
            }
            return name.length > 20
                ? name.substring(0, 20) + '..'
                : name;
        },
        currentTabComponent() {
            switch (this.activeTab) {
                case 'tab1':
                    return 'MyGameWeekN';
                case 'tab2':
                    return 'MyGameWeek';
                default:
                    return 'MyGameWeekN';
            }
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        SetactiveTab(tab) {
            this.activeTab = tab;
            localStorage.setItem('list-tab', tab);
        },
        beforeEnter(el) {
            el.style.transform = 'translateX(100%)';
            el.style.opacity = 0;
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; // Faster transition
                el.style.transform = 'translateX(0)';
                el.style.opacity = 1;
            });
        },
        leave(el, done) {
            el.style.transform = 'translateX(0)';
            el.style.opacity = 1;
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; // Faster transition
                el.style.transform = 'translateX(-100%)';
                el.style.opacity = 0;
                setTimeout(done, 200); // Adjust timeout to match the transition duration
            });
        },
        setLoading(isLoading) {
            this.loading = isLoading;
        },


    },
    created() {
        let has_result_tab = localStorage.getItem('list-tab');
        if (has_result_tab) {
            this.activeTab = has_result_tab;
        }
    },

};
</script>

<style scoped>
.bg-fixcolor-p {
    background-color: #f6f6f8;
}
.card {
    position: relative;
    top: 2em;
    /* width: 12.5em; */
    height: 6.4em;
    background: rgb(239, 236, 251);
    transition: .4s ease-in-out;
    border-radius: 15px;
    box-shadow: rgba(228, 228, 228, 0.07) 0px 1px 1px, rgba(224, 223, 223, 0.07) 0px 2px 2px, rgba(211, 210, 210, 0.07) 0px 4px 4px, rgba(228, 227, 227, 0.07) 0px 8px 8px, rgba(252, 252, 252, 0.07) 0px 16px 16px;
    overflow: hidden;
}

.heading {
    position: relative;
    font-weight: bold;
    font-size: 1.1em;
    padding-top: 0.2em;
    padding-left: 4em;
}

.details {
    position: relative;
    color: black;
    font-size: 0.6em;
    padding-top: 2em;
    padding-left: 2em;
}


.glasses {
    position: relative;
    top: -6em;
    left: -0.5em;
    width: 70px;
    height: 70px;
}






.logo-container {
    position: relative;
    width: 40px;
    height: 40px;
}

.tabs {
    display: flex;
    font-size: 0.7rem;
}

.tab-item {
    margin-right: 3px;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #37003c;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.tab-item.active {
    background-color: #f6f6f8;
    color: rgb(0, 0, 0);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.tab-container {
    position: relative;
    overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
    /* Faster transition */
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
}

.slide-enter {
    transform: translateX(100%);
}

.slide-leave-active {
    transform: translateX(-100%);
}

.slide-enter-to {
    transform: translateX(0);
    opacity: 1;
}
</style>