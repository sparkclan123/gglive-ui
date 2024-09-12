<template>
    <div>
        <div >
            <LodingSceen :loading="loading" />
        </div>
        <div class="contant_style">
            <div class="back-button" @click="route_back()">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
                    class="svg-white mr-1">
                    <path
                        d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                        fill="white" transform="matrix(-1 0 0 1 24 0)"></path>
                </svg>
                <span class="text-gray-200 font-bold text-xs">กลับ</span>
            </div>
            <div class="mt-5">
                <div class="text-gray-200 font-bold text-xs">รายละเอียดการเเข่งขันของคุณ</div>
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
                        <component :is="currentTabComponent" :key="activeTab" @set-loading="setLoading" @router-back="route_back"></component>
                    </transition>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
import MyGameWeekN from '../../components/selfPick/MyGameWeekN.vue';
import MyGameWeek from '../../components/selfPick/MyGameWeek.vue';
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
        route_back() {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.$router.go(-1);
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            }
        },
        SetactiveTab(tab) {
            this.activeTab = tab;
            localStorage.setItem('list-tab-self', tab);
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
        let has_result_tab = localStorage.getItem('list-tab-self');
        if (has_result_tab) {
            this.activeTab = has_result_tab;
        }
    },

};
</script>

<style scoped>
.contant_style {
    position: relative;
    border-radius: 10px;
    padding: 5px;
}

.back-button {
    position: absolute;
    top: 0;
    left: 0;
    margin: 3px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fffdfd;
}

.back-button svg {
    margin-right: 5px;
}

.text-gray-200 {
    color: #f4f1f1;
    /* เปลี่ยนเป็นสีที่เหมาะสม */
}

.font-bold {
    font-weight: bold;
}

.text-xs {
    font-size: 0.75rem;
}

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

.tab-item_2 {
    margin-right: 3px;
    padding: 10px 10px;
    cursor: pointer;
    background-color: #37003c;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.tab-item_2.active {
    background-color: #f6f6f8;
    color: rgb(0, 0, 0);
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
