<template>
    <section class="member-support member-self-list">
        <div class="member-support-heading"><h2>การแข่งขันของเพื่อน</h2><button type="button" class="member-icon-button" aria-label="ข้อมูลการแข่งขัน" @click="showinformation"><MemberIcon name="book" /></button></div>
        <div class="member-self-create">
            <label for="self-match-gameweek">Gameweek สำหรับสร้างการแข่งขัน</label>
            <select id="self-match-gameweek" v-model="selectedGameweekID" class="member-week-select" @change="rememberSelection">
                <option :value="null" disabled>เลือก Gameweek</option>
                <option v-for="week in gameweeks" :key="week.id" :value="week.id" :disabled="roundState(week) !== 'open'">
                    {{ week.week_name || `Gameweek ${week.week}` }} · ฤดูกาล {{ week.season?.label || week.season_id }} · {{ roundState(week) === 'open' ? 'เปิดรับทีม' : 'ยังไม่เปิดรับทีม' }}
                </option>
            </select>
            <p v-if="gameweeksError" class="member-support-error" role="alert">{{ gameweeksError }} <button type="button" @click="loadGameweeks">ลองใหม่</button></p>
            <p v-else-if="!gameweeksLoading && !gameweeks.length" class="member-support-note">ยังไม่มี Gameweek ที่เปิดให้สร้างการแข่งขัน</p>
            <div class="member-support-actions">
                <button type="button" @click="toggleModel" :disabled="gameweeksLoading || !selectedGameweek || roundState(selectedGameweek) !== 'open'" class="member-button">สร้างการแข่งขัน</button>
                <button type="button" @click="toggleModelJoin" class="member-button is-secondary">เข้าร่วมด้วยโค้ด</button>
            </div>
        </div>
        <div v-if="!selfMatchs.length" class="member-empty"><h2>ยังไม่มีการแข่งขัน</h2><p>สร้างการแข่งขันของคุณ หรือเข้าร่วมด้วยโค้ดจากเพื่อน</p></div>
        <div v-else class="member-support-table-wrap">
            <table class="member-support-table">
                <thead><tr><th>การแข่งขัน</th><th>โค้ด</th><th>รายละเอียด</th></tr></thead>
                <tbody><tr v-for="match in selfMatchs" :key="match.id">
                    <td><strong>{{ match.name }}</strong><small>Gameweek {{ match.game_week_id }}</small></td>
                    <td><button type="button" @click="copyToClipboard(match.code_generated)" class="member-table-button">คัดลอกโค้ด</button></td>
                    <td><button type="button" @click="seeMatchDetail(match.id, match.game_week_id)" class="member-table-button">ดูการแข่งขัน</button></td>
                </tr></tbody>
            </table>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="facthAllSelfMatch" />
    </section>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import { fetchActiveGameweeks, rememberedGameweek, rememberGameweek } from '../../services/gameweeks.js';
import { gameweekState } from '../../utils/gameweeks.js';
import '../../styles/member-support.css';

export default {
    data() {
        return {
            selfMatchs: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
            teamName: '',
            joinCode: '',
            gameweeks: [],
            selectedGameweekID: null,
            gameweeksLoading: false,
            gameweeksError: '',
            serverClockOffset: 0

        };
    },
    computed: {
        selectedGameweek() {
            return this.gameweeks.find(week => Number(week.id) === Number(this.selectedGameweekID)) || null;
        }
    },
    methods: {
        roundState(week) {
            return gameweekState(week, Date.now() + this.serverClockOffset);
        },
        rememberSelection() {
            rememberGameweek(this.selectedGameweek);
        },
        async loadGameweeks() {
            this.gameweeksLoading = true;
            this.gameweeksError = '';
            try {
                const response = await fetchActiveGameweeks();
                this.gameweeks = response.data;
                const serverTime = new Date(response.currentTime).getTime();
                this.serverClockOffset = Number.isFinite(serverTime) ? serverTime - Date.now() : 0;
                const preferred = this.selectedGameweekID || rememberedGameweek();
                const chosen = this.gameweeks.find(week => Number(week.id) === Number(preferred) && this.roundState(week) === 'open')
                    || this.gameweeks.find(week => this.roundState(week) === 'open');
                this.selectedGameweekID = chosen?.id || null;
            } catch (error) {
                this.gameweeksError = 'โหลด Gameweek ไม่สำเร็จ';
            } finally {
                this.gameweeksLoading = false;
            }
        },
        showinformation() {
            Swal.fire({
                icon: 'info',
                html: `
    <div class="text-custom" style="text-align: left;">
      <p> - คุณสามารถสร้างเเข่งขันของคุณเอง หรือเข้าร่วมเเข่งขันของเพื่อนๆของคุณได้</p>
      <p> - ทางเราไม่มีส่วนเกี่ยวข้องใดๆทั้งสิ้นในการจัดการเเข่งขันของคุณ นอกจากการตัดสินคะเเนน จากระบบ</p>
    </div>
  `,
                showConfirmButton: true,
                confirmButtonText: 'เข้าใจเเล้ว',
                customClass: {
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
            });
        },
        async seeMatchDetail(id, gameWeekID) {
            console.log(id);
            this.$router.push({
                name: 'self-match-detail',
                params: {
                    id: id,
                    gameWeekID: gameWeekID
                }
            });
        },
        async facthAllSelfMatch(page = 1, limit = 10) {
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/get-self_match`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.selfMatchs = response.data.selfMatch;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                console.log(error);
                this.$emit('set-loading', false);
            }
        },
        async toggleModelJoin() {
            Swal.fire({
                title: 'เข้าร่วมการเเข่งขัน',
                text: 'กรอกโค้ดการเเข่งขันจากเพื่อนของคุณ',
                input: 'text',
                inputPlaceholder: 'กรอกโค้ดการเเข่งขัน',
                showCancelButton: true,
                confirmButtonText: 'เข้าร่วม',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    input: 'swal-input', // Add custom class for input
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
                preConfirm: (joinCode) => {
                    if (!joinCode) {
                        Swal.showValidationMessage('กรุณากรอกโค้ดการเเข่งขัน');
                    }
                    return joinCode;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.joinCode = result.value;
                    this.joinMatch();
                }
            });
        },
        async toggleModel() {
            if (!this.selectedGameweek || this.roundState(this.selectedGameweek) !== 'open') return;

            Swal.fire({
                title: 'สร้างการเเข่งขัน',
                text: `สร้างการแข่งขันใน ${this.selectedGameweek.week_name || 'Gameweek ' + this.selectedGameweek.week}`,
                input: 'text',
                inputPlaceholder: 'ตั้งชื่อการเเข่งของคุณ',
                showCancelButton: true,
                confirmButtonText: 'สร้าง',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    input: 'swal-input', // Add custom class for input
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
                preConfirm: (teamName) => {
                    // ไม่เกิน 15 ตัวอักษร
                    if (teamName.length > 20) {
                        Swal.showValidationMessage('ชื่อการเเข่งขันต้องไม่เกิน 20 ตัวอักษร');
                    }
                    if (!teamName) {
                        Swal.showValidationMessage('กรุณากรอกชื่อการเเข่งขัน');
                    }
                    return teamName;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.teamName = result.value;
                    this.confirmCreateMatch();
                }
            }).catch((error) => {
                console.log(error);
            });

        },
        async joinMatch() {
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/join-self_match`,
                    {
                        code: this.joinCode,
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
                    this.facthAllSelfMatch();
                    this.$emit('set-loading', false);
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

        async confirmCreateMatch() {
            if (!this.selectedGameweek || this.roundState(this.selectedGameweek) !== 'open') return;
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/create-self_match`,
                    {
                        teamName: this.teamName,
                        game_week_id: Number(this.selectedGameweekID),
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    }
                );
                if (response.data.ok) {
                    this.facthAllSelfMatch();
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                console.log("asdasdas", error.data);
                this.$emit('set-loading', false);
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
            }
        },
        copyToClipboard(code) {
            navigator.clipboard.writeText(code).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'คัดลอก!',
                    text: 'คัดลอกโค้ดเรียบร้อย',
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
            }).catch(err => {
                console.log('Something went wrong', err);
            });
        }
    },
    created() {
        this.facthAllSelfMatch();
        this.loadGameweeks();
    }
};
</script>
