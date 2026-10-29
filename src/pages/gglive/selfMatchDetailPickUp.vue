<template>
    <section class="member-support member-self-pick">
        <LodingSceen :loading="loading" />
        <button type="button" class="member-back" @click="route_back"><MemberIcon name="back" />กลับ</button>
        <header class="member-page-header"><h1>เลือกทีมเข้าร่วม</h1><p v-if="gameWeek">{{ selfMatch?.name }} · {{ gameWeek.week_name || `Gameweek ${gameWeek.week}` }}</p><p v-else>เลือกทีมของคุณสำหรับการแข่งขันของเพื่อน</p></header>
        <div v-if="loadError" class="member-error" role="alert"><p>{{ loadError }}</p><button type="button" class="member-button is-secondary" @click="loadMatchRound">ลองใหม่</button></div>
        <template v-else-if="gameWeekID">
            <div class="member-mode-switch" aria-label="ประเภททีม">
                <button type="button" :class="{ 'is-selected': activeTab === 'tab1' }" :aria-pressed="activeTab === 'tab1'" @click="SetactiveTab('tab1')">ปกติ</button>
                <button type="button" :class="{ 'is-selected': activeTab === 'tab2' }" :aria-pressed="activeTab === 'tab2'" @click="SetactiveTab('tab2')">VIP</button>
            </div>
            <component :is="currentTabComponent" :key="`${activeTab}-${gameWeekID}`" :gameWeekID="gameWeekID" @set-loading="setLoading" @router-back="route_back" />
        </template>
    </section>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
import MyGameWeekN from '../../components/selfPick/MyGameWeekN.vue';
import MyGameWeek from '../../components/selfPick/MyGameWeek.vue';
import '../../styles/member-support.css';
export default {
    data() {
        return {
            activeTab: 'tab1',
            loading: false,
            gameWeekID: null,
            gameWeek: null,
            selfMatch: null,
            loadError: '',
            isNavigating: false,
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
        async loadMatchRound() {
            this.loading = true;
            this.loadError = '';
            this.gameWeekID = null;
            try {
                const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
                const matchID = this.$route.params.id;
                let roundID = Number(this.$route.query.gameWeekID);
                if (!Number.isSafeInteger(roundID) || roundID <= 0) {
                    // Older picker links did not carry a round. Resolve their competition,
                    // never the latest active round.
                    let page = 1, pages = 1;
                    do {
                        const { data } = await api.get('/premier-league/v1/get-self_match', { headers, params: { page, limit: 100 } });
                        if (!data.ok) throw new Error('ไม่พบการแข่งขัน');
                        const match = data.selfMatch.find(item => Number(item.id) === Number(matchID));
                        if (match) { roundID = Number(match.game_week_id); break; }
                        pages = Number(data.pages) || 1;
                        page++;
                    } while (page <= pages);
                }
                if (!Number.isSafeInteger(roundID) || roundID <= 0) throw new Error('ไม่พบ Gameweek ของการแข่งขัน');
                let response = await api.get(`/premier-league/v1/self_match/${matchID}/${roundID}`, { headers });
                if (!response.data.ok) throw new Error('โหลดการแข่งขันไม่สำเร็จ');
                const canonicalRound = Number(response.data.selfMatch.game_week_id);
                if (!Number.isSafeInteger(canonicalRound) || canonicalRound <= 0) throw new Error('ไม่พบ Gameweek ของการแข่งขัน');
                if (canonicalRound !== roundID) {
                    response = await api.get(`/premier-league/v1/self_match/${matchID}/${canonicalRound}`, { headers });
                    if (!response.data.ok) throw new Error('โหลดการแข่งขันไม่สำเร็จ');
                }
                this.selfMatch = response.data.selfMatch;
                this.gameWeek = response.data.gameWeek;
                this.gameWeekID = canonicalRound;
            } catch (error) {
                this.loadError = 'โหลดการแข่งขันไม่สำเร็จ กรุณาลองอีกครั้ง';
            } finally {
                this.loading = false;
            }
        },
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
        this.loadMatchRound();
        let has_result_tab = localStorage.getItem('list-tab-self');
        if (has_result_tab) {
            this.activeTab = has_result_tab;
        }
    },

};
</script>
