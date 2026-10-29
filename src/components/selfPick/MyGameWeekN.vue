<template>
    <section class="member-support member-self-pick-list">
        <div v-if="loadError" class="member-error" role="alert"><p>{{ loadError }}</p><button type="button" class="member-button is-secondary" @click="fetchDataMyGameWeek()">ลองใหม่</button></div>
        <div v-else-if="!loadingEntries && !datas.length" class="member-empty"><h2>ยังไม่มีทีมใน Gameweek นี้</h2><p>ทีมที่ส่งในรอบนี้จะแสดงที่นี่เพื่อให้เลือกเข้าร่วมการแข่งขัน</p></div>
        <article v-for="data in datas" :key="data.id" class="member-entry-card">
            <div class="member-entry-meta"><span>ฤดูกาล {{ data.season }} · Gameweek {{ data.week }}</span><span class="member-badge">ปกติ</span></div>
            <h3>{{ data.name }}</h3>
            <div class="member-support-note"><DateFormatted :dateString="data.created_at" /></div>
            <div class="member-entry-actions">
                <button type="button" @click="selectSelf(data.id, 'N', data.name)" class="member-button">เลือกทีม</button>
                <button type="button" @click="seeDetailAndEdit(data)" class="member-button is-secondary">รายละเอียดทีม</button>
            </div>
        </article>
        <Pagination :page="page" :pages="pages" @page-change="fetchDataMyGameWeek" />
    </section>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import '../../styles/member-support.css';
export default {
    props: {
        gameWeekID: { type: Number, required: true }
    },
    data() {
        return {
            datas: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
            matchID: null,
            loadingEntries: false,
            loadError: ''
        };
    },
    computed: {
    },
    methods: {
        async selectSelf(id, type, name) {
            const entry = this.datas.find(item => Number(item.id) === Number(id));
            if (!entry || !this.gameWeekID || Number(entry.week_id) !== Number(this.gameWeekID)) return;

            const result = await Swal.fire({
                title: 'เลือกทีม',
                text: 'คุณต้องการเลือก ทีม: ' + name + ' ใช่หรือไม่?',
                showCancelButton: true,
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });

            if (!result.isConfirmed) {
                return;
            }



            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/self_match_sub-pick`,
                    {
                        game_main_id: id,
                        type: type,
                        self_match_id: parseInt(this.matchID)

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
                    this.$emit('set-loading', false);
                    this.$emit('router-back');

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

                this.$emit('set-loading', false);
            }
        },
        async fetchDataMyGameWeek(page = 1, limit = 10) {
            if (!Number.isSafeInteger(this.gameWeekID) || this.gameWeekID <= 0) return;
            this.loadingEntries = true;
            this.loadError = '';
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player-user-n', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit,
                        game_week_id: this.gameWeekID
                    }
                });
                if (response.data.ok) {
                    this.datas = response.data.data.filter(entry => Number(entry.week_id) === Number(this.gameWeekID));
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                this.loadError = 'โหลดทีมไม่สำเร็จ กรุณาลองอีกครั้ง';
            } finally {
                this.loadingEntries = false;
                this.$emit('set-loading', false);
            }
        },
        seeDetailAndEdit(data) {
            if (!data) {
                return;
            }
            let id = data.id;
            this.$router.push({ name: 'pitch-detail-n', params: { id } });
        },
    },
    watch: {
        gameWeekID() { this.fetchDataMyGameWeek(); }
    },
    created() {
        this.matchID = this.$route.params.id;
        this.fetchDataMyGameWeek();
    },

};
</script>
