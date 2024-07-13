<template>
    <div>
        <div class="tabs rounded-t-lg ml-3 text-white flex">
            <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="SetactiveTab('tab1')">การเเข่ง
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="SetactiveTab('tab2')">ย้อนหลัง(ปกติ)</div>
            <!-- <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="SetactiveTab('tab3')">ย้อนหลัง(ปกติ)</div> -->
        </div>
        <div class="rounded-xl shadow-lg min-h-screen bg-white tab-container">
            <transition name="slide" mode="out-in" @before-enter="beforeEnter" @leave="leave">
                <component :is="currentTabComponent" :key="activeTab" v-bind="currentTabProps"></component>
            </transition>
        </div>
    </div>
</template>

<script>
import Result from '../../components/result/result.vue';
import ResultGameweek from '../../components/result/gameweek.vue';
import { api } from '@axios_inst';
import { mapActions } from 'vuex';

export default {
    name: 'challenge',
    data() {
        return {
            activeTab: 'tab1',
            resultData: { /* your data for Result component */ },
            gameweekData: {
                datas: [],
                total: 0,
                page: 1,
                limit: 10,
                pages: 1,
            },
            matches: []
        };
    },
    components: {
        Result,
        ResultGameweek
    },
    computed: {
        currentTabComponent() {
            switch (this.activeTab) {
                case 'tab1':
                    return 'Result';
                case 'tab2':
                    return 'ResultGameweek';
                case 'tab3':
                    return 'ResultGameweek';
                default:
                    return 'Result';
            }
        },
        currentTabProps() {
            switch (this.activeTab) {
                case 'tab1':
                    return { data: this.resultData, matches: this.matches, fetchMatches: this.fetchMatches };
                case 'tab2':
                case 'tab3':
                    return { data: this.gameweekData, fetchGameWeeks: this.fetchGameWeeks };
                default:
                    return {};
            }
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        SetactiveTab(tab) {
            this.activeTab = tab;
            localStorage.setItem('result-tab', tab);
        },
        beforeEnter(el) {
            el.style.transform = 'translateX(100%)';
            el.style.opacity = 0;
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                el.style.transform = 'translateX(0)';
                el.style.opacity = 1;
            });
        },
        leave(el, done) {
            el.style.transform = 'translateX(0)';
            el.style.opacity = 1;
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                el.style.transform = 'translateX(-100%)';
                el.style.opacity = 0;
                setTimeout(done, 500);
            });
        },
        async fetchGameWeeks(page = 1, limit = 10) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/game-week-all`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.gameweekData.datas = response.data.data;
                    this.gameweekData.total = response.data.total;
                    this.gameweekData.page = response.data.page;
                    this.gameweekData.limit = response.data.limit;
                    this.gameweekData.pages = response.data.pages;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async fetchMatches() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/result', {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                if (response.data.ok) {
                    this.matches = response.data.matches.map(match => ({
                        id: match.ID,
                        date: match.DateVs,
                        team1: match.Team1Name,
                        score1: match.Score1,
                        score2: match.Score2,
                        team2: match.Team2Name,
                        alt_ids_opta_1: match.Team1Code,
                        alt_ids_opta_2: match.Team2Code
                    }));
                }
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        },
    },
    created() {
        this.updateLoading(true);
        let has_result_tab = localStorage.getItem('result-tab');
        if (has_result_tab) {
            this.activeTab = has_result_tab;
        }
        Promise.all([this.fetchGameWeeks(), this.fetchMatches()])
            .then(() => {
                setTimeout(() => {
                    this.updateLoading(false);
                }, 50);
            })
            .catch((error) => {
                setTimeout(() => {
                    this.updateLoading(false);
                }, 50);
            });
    },
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
    transition: all 0.3s ease;
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
