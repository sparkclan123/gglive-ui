<template><div><MemberRanking compact :rows="datas" :game-week="gameWeek" :season="season" :total="total" :max-total-point="maxTotalPoint" :avg-total-point="avgTotalPoint" :page="page" :pages="pages" :limit="limit" :user-id="userinfo?.UserID" mode="normal" :loading="localLoading" :error="loadError" @view="seeDetail" @reward="rewardDetail" @page-change="facthPlayerListGameWeek" @retry="facthPlayerListGameWeek(page)" /></div></template>
<script>
import MemberRanking from '../member/MemberRanking.vue';
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    components: {MemberRanking},
    props: {gameWeekId: {type: Number, required: true}},
    data() {
        return {
            showCommingSoon: false,
            requestId: 0,
            localLoading: true,
            loadError: false,
            season: null,
            gameWeek: null,
            maxTotalPoint: 0,
            avgTotalPoint: 0,
            datas: [],
            total: 0,
            page: 1,
            limit: 100,
            pages: 1,
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        hisLastGameWeek() {
            this.$router.push({
                name: 'result-list-gameweek-n',
                params: {
                    gameWeekID: this.gameWeek.week - 1
                }
            });
        },
        rewardDetail() {
            this.$router.push({ name: 'reward-detail', params: { id: this.gameWeek.id, type: "N" } });
        },
        async facthPlayerListGameWeek(page = 1, limit = 100) {
            const request = ++this.requestId;
            this.localLoading = true; this.loadError = false;
            try {
                const response = await api.get(`/premier-league/v1/result-gameweek-n/${this.gameWeekId}`, {
                    headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`},
                    params: {page, limit}
                });
                if (request !== this.requestId) return;
                if (!response.data.ok || Number(response.data.gameWeek?.id) !== Number(this.gameWeekId)) throw new Error('Round mismatch');
                this.datas = response.data.data || [];
                this.gameWeek = response.data.gameWeek;
                this.season = response.data.season;
                this.total = Number(response.data.total || 0);
                this.page = Number(response.data.page || 1);
                this.limit = Number(response.data.limit || limit);
                this.pages = Number(response.data.pages || 1);
                this.maxTotalPoint = Number(response.data.maxTotalPoint || 0);
                this.avgTotalPoint = Number(response.data.avgTotalPoint || 0);
            } catch (error) {
                if (request === this.requestId) { this.loadError = true; this.datas = []; }
            } finally {
                if (request === this.requestId) { this.localLoading = false; this.updateLoading(false); }
            }
        },
        async seeDetail(id, user_id) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/time-now-server`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });

                if (response.data.ok) {
                    const timeNow = new Date(response.data.date_now);
                    const timeEnd = new Date(this.gameWeek.end_date);

                    if (this.userinfo.UserID === 104) {
                        this.$router.push({
                            name: 'challenge-detail-n',
                            params: {
                                id: id
                            }
                        });
                        return;
                    }

                    if (timeEnd >= timeNow && user_id != this.userinfo.UserID) {
                        Swal.fire({

                            title: 'ไม่สามารถดูข้อมูลได้',
                            text: 'กรุณารอสิ้นสุดการจัดทีมเพื่อดูนักเตะของทีมอื่น',
                            customClass: {
                                cancelButton: 'btn-cancel',
                                popup: 'popup-custom',
                                title: 'text-custom',
                                htmlContainer: 'text-custom'
                            },
                        });
                        return;
                    } else {
                        this.$router.push({
                            name: 'challenge-detail-n',
                            params: {
                                id: id
                            }
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                });
            }


        }
    },
    computed: {
        ...mapGetters('auth', ['userinfo']),
    },
    beforeUnmount() { this.requestId++; },
    created() {

        this.facthPlayerListGameWeek()
    }
};
</script>
