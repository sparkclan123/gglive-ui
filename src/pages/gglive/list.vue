<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div v-if="userinfo">
            <div class="card">
                <div class="card__info">
                    <div class="card__logo">

                        <span class="left">

                            รายการ ทีมของคุณ
                        </span>
                        <span class="right">คะเเนนสะสม</span>
                    </div>
                    <div class="card__type mt-1 text-green-500">0</div>
                    <div class="card__number">

                    </div>
                    <div class="card__valid-thru" aria-label="Valid thru"></div>
                    <div class="card__exp-date"><time datetime="2038-01"></time></div>

                    <div class="logo-container mt-4">
                        <img :src="userinfo.ImageURL ? userinfo.ImageURL : '/public/assets/logo.webp'" alt="Logo"
                            class="logo rounded-full shadow-lg">

                    </div>
                    <div class="card__name mt-4 ml-1" aria-label="Dee Stroyer">{{ truncatedUsername }}</div>

                    <button
                        class="card__vendor bg-green-500 hover:bg-green-700 text-gray-700 font-bold py-1 px-2 rounded text-xs ">
                        เเลกคะเเนน
                    </button>

                </div>
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
                <div class="rounded-xl shadow-lg min-h-screen bg-white tab-container">
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
.cus-bg-card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.cus-bg-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card,
.card__chip {
    overflow: hidden;
    position: relative;
}

.card,
.card__chip-texture,


.card {
    background-image: linear-gradient(to bottom, #8141b157, #b077db57);
    border-radius: 0.5em;
    box-shadow: 0 0 0 hsl(0, 0%, 80%),
        0 0 0 hsl(0, 0%, 100%),
        -0.2rem 0 0.75rem 0 hsla(0, 0%, 0%, 0.3);
    color: hsl(0, 0%, 100%);
    /* width: 10.3em; */
    height: 6.8em;

}

.card__info,
.card__chip-texture,


.card__chip-texture,

.card__info {
    font: 0.75em/1 "DM Sans", sans-serif;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.75rem;
    inset: 0;
}

.card__logo,
.card__number {
    width: 100%;
}



.card__logo {
    font-weight: bold;
    font-style: italic;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card__chip {
    background-image: linear-gradient(hsl(0, 0%, 70%), hsl(0, 0%, 80%));
    border-radius: 0.2rem;
    box-shadow: 0 0 0 0.05rem hsla(0, 0%, 0%, 0.5) inset;
    width: 1.25rem;
    height: 1.25rem;
    transform: translate3d(0, 0, 0);
}

.card__chip-lines {
    width: 100%;
    height: auto;
}

.card__chip-texture {
    background-image: linear-gradient(-80deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.6) 48% 52%, hsla(0, 0%, 100%, 0));
}

.card__type {
    align-self: flex-end;
    margin-left: auto;
}

.card__digit-group,
.card__exp-date,
.card__name {
    background: linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 85%) 15% 55%, hsl(0, 0%, 70%) 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0.05rem hsla(0, 0%, 0%, 0.3));
}

.card__number {
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
}

.card__valid-thru,
.card__name {
    text-transform: uppercase;
}

.card__valid-thru,
.card__exp-date {
    /* margin-bottom: 0.25rem; */
    width: 50%;
}

/* .card__valid-thru {
    font-size: 0.3rem;
    padding-right: 0.25rem;
    text-align: right;
} */

.card__exp-date,
.card__name {
    font-size: 0.7rem;
}

.card__exp-date {
    padding-left: 0.25rem;
}

/* .card__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 6.25rem;
} */

.card__vendor,
.card__vendor:before,
.card__vendor:after {
    position: absolute;
}

.card__vendor {
    right: 0.575rem;
    bottom: 1.15rem;
    width: 5.55rem;
    height: 1.5rem;
}

.card__vendor:before,
.card__vendor:after {
    border-radius: 50%;
    content: "";
    display: block;
    top: 0;
    width: 1.5rem;
    height: 1.5rem;
}

.card__vendor-sr {
    clip: rect(1px, 1px, 1px, 1px);
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
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
    background-color: white;
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