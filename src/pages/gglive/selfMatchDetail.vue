<template>
    <section class="member-support member-self-detail">
        <LodingSceen :loading="loading" />
        <button type="button" class="member-back" @click="route_back"><MemberIcon name="back" />กลับ</button>
        <div v-if="selfMatch && gameWeek">
            <header class="member-self-summary">
                <p class="member-support-note">การแข่งขันของเพื่อน</p>
                <h1>{{ selfMatch.name }}</h1>
                <p>{{ gameWeek.week_name || `Gameweek ${gameWeek.week}` }} · ฤดูกาล {{ season?.label || gameWeek.season_id }}</p>
                <button type="button" @click="addTeamInMatch" class="member-button">เพิ่มทีมในการแข่งขัน</button>
            </header>
            <div v-if="!games.length" class="member-empty"><h2>ยังไม่มีทีมเข้าร่วม</h2><p>เลือกทีมของคุณใน Gameweek นี้เพื่อเข้าร่วมการแข่งขัน</p></div>
            <div v-else class="member-support-table-wrap">
                <table class="member-support-table member-self-standings">
                    <thead><tr><th scope="col" class="member-self-rank">อันดับ</th><th scope="col">ทีม</th><th scope="col">คะแนน</th><th scope="col">วันที่</th></tr></thead>
                    <tbody><tr v-for="data in rankedGames" :key="`${data.vip}-${data.id}`">
                        <td class="member-self-rank">{{ data.position }}</td>
                        <td><button type="button" class="member-team-link" @click="seeDetail(data)"><img :src="data.image_url || $memberBrand.avatarFallback" alt="" class="member-support-avatar"><span>{{ data.name }} <span v-if="data.vip" class="member-badge">VIP</span></span></button></td>
                        <td class="member-self-points">{{ data.total_point }}</td>
                        <td><DateFormatted :dateString="data.created_at" /></td>
                    </tr></tbody>
                </table>
            </div>
            <Pagination :page="page" :pages="pages" @page-change="fetchSelfMatchSubByID" />
        </div>
        <div v-else-if="!loading" class="member-error"><h2>โหลดการแข่งขันไม่สำเร็จ</h2><button type="button" class="member-button is-secondary" @click="fetchSelfMatchSubByID()">ลองใหม่</button></div>
    </section>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import { rankingRows } from '../../utils/gameweeks.js';
import '../../styles/member-support.css';

export default {
    data() {
        return {
            gameWeekID: null,
            matchID: null,
            loading: false,
            games: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
            selfMatch: {},
            isNavigating: false,
            gameWeek: null,
            season: null,
            teamCode: null
        };
    },
    computed: {
        rankedGames() {
            return rankingRows(this.games, this.page, this.limit);
        }
    },
    methods: {
        seeDetail(data) {
            if (data.vip == 1) {
                this.$router.push({
                    name: 'challenge-detail',
                    params: {
                        id: data.id
                    }
                });
            }
            if (data.vip == 0) {
                this.$router.push({
                    name: 'challenge-detail-n',
                    params: {
                        id: data.id
                    }
                });
            }

        },
        async addTeamInMatch() {
            const gameWeekID = Number(this.selfMatch.game_week_id || this.gameWeekID);
            this.$router.push({ name: 'self-match-detail-pick', params: { id: this.matchID }, query: { gameWeekID } });
        },

        async addTeamCode() {
            try {
                this.loading = true;
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/create-self_match_sub`,
                    {
                        self_match_id: this.matchID,
                        code: this.teamCode,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    }
                );
                if (response.data.ok) {
                    Swal.fire({
                        icon: 'success',
                        text: 'เข้าร่วมการเเข่งขันเรียบร้อย',
                        timer: 1500,
                        showConfirmButton: false,
                        customClass: {
                            cancelButton: 'btn-cancel',
                            confirmButton: 'btn-confirm',
                            popup: 'popup-custom',
                            title: 'text-custom',
                            htmlContainer: 'text-custom'
                        },
                    });
                    this.fetchSelfMatchSubByID();
                    this.loading = false;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: error.response.data.error,
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        confirmButton: 'btn-confirm',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                });

                this.loading = false;
            }
        },

        route_back() {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.$router.go(-1);
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            }
        },
        async fetchSelfMatchSubByID(page = 1, limit = 500) {
            try {
                this.loading = true;
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/self_match/${this.matchID}/${this.gameWeekID}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    const canonicalRound = Number(response.data.selfMatch.game_week_id);
                    if (canonicalRound > 0 && canonicalRound !== Number(this.gameWeekID)) {
                        this.gameWeekID = canonicalRound;
                        return this.fetchSelfMatchSubByID(page, limit);
                    }
                    this.games = response.data.games;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.selfMatch = response.data.selfMatch;
                    this.gameWeek = response.data.gameWeek;
                    this.season = response.data.season;
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        copyToClipboard(code) {
            navigator.clipboard.writeText(code).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    text: 'The code has been copied to clipboard.',
                    timer: 1500,
                    showConfirmButton: false
                });
            }).catch(err => {
                console.log('Something went wrong', err);
            });
        },

    },
    created() {
        this.matchID = this.$route.params.id;
        this.gameWeekID = this.$route.params.gameWeekID;
        this.fetchSelfMatchSubByID();
    }
};
</script>
