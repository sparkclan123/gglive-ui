<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>

        <div>
            <div class="tabs rounded-t-lg ml-3 text-white flex">
                <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="SetactiveTab('tab1')">เกมวีคปกติ
                </div>
                <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="SetactiveTab('tab2')">เกมวีค VIP <i class="fas fa-ticket-alt text-yellow-400"></i>
                </div>
                <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="SetactiveTab('tab3')">กติกา</div>
            </div>
            <div class="rounded-xl shadow-lg min-h-screen bg-white tab-container">
                <transition name="slide" mode="out-in" @before-enter="beforeEnter" @leave="leave">
                    <component :is="currentTabComponent" :key="activeTab" @set-loading="setLoading"></component>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import ChallengeGameWeek from '../../components/challenge/GameWeek.vue';
import ChallengeGameWeekVip from '../../components/challenge/GameWeekVip.vue';
import Rule from '../../components/rule/rule.vue';

export default {
    name: 'challenge',
    data() {
        return {
            activeTab: 'tab1',
            loading: false
        };
    },
    components: {
        ChallengeGameWeek,
        ChallengeGameWeekVip,
        Rule,
        
    },
    computed: {
        currentTabComponent() {
            switch (this.activeTab) {
                case 'tab1':
                    return 'ChallengeGameWeek';
                case 'tab2':
                    return 'ChallengeGameWeekVip';
                case 'tab3':
                    return 'Rule';
                default:
                    return 'ChallengeGameWeek';
            }
        }
    },
    methods: {
        SetactiveTab(tab) {
            this.activeTab = tab;
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
        }
    }
};
</script>

<style scoped>
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
    transition: all 0.3s ease; /* Faster transition */
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
