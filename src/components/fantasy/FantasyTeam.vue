<template>
  <div v-if="getGameWeek" class="member-builder">
    <header class="builder-heading">
      <div><p class="builder-eyebrow">YOUR STARTING XI · {{ mode === 'normal' ? 'NORMAL' : 'VIP' }}</p><h1>จัดทีมของคุณ</h1><p>เกมวีค {{ getGameWeek.week_name || getGameWeek.week }} <span class="builder-mode">{{ mode === 'normal' ? 'ปกติ' : 'VIP' }}</span></p></div>
      <RouterLink :to="{ name: 'season-select' }" class="builder-text-button">เปลี่ยนรอบ ↗</RouterLink>
    </header>
    <div v-if="roundState !== 'open'" class="builder-state"><h2>{{ roundState === 'scheduled' ? 'เกมวีคนี้ยังไม่ถึงเวลาเปิดรับ' : 'เกมวีคนี้ปิดรับทีมแล้ว' }}</h2><p>เลือกรอบที่เปิดรับ เพื่อเริ่มจัดทีมของคุณ</p><RouterLink :to="{ name: 'season-select' }" class="builder-button">ดูเกมวีคทั้งหมด</RouterLink></div>
    <template v-else>
      <div class="builder-summary" aria-live="polite">
        <div><span>งบคงเหลือ</span><strong :class="{ 'builder-over-budget': remainingAmount < 0 }">{{ remainingAmount }}<small> / 80</small></strong></div>
        <div><span>ผู้เล่นในทีม</span><strong>{{ totalPlayerCount }}<small> / 11</small></strong></div>
        <button class="builder-captain-summary" @click="selectedPlayers.length && adjustPlayer(selectedPlayers.find(p => p.id === isCaptain) || selectedPlayers[0])"><span>กัปตันทีม</span><strong class="builder-captain-name"><b>C</b>{{ captainName }}</strong></button>
      </div>
      <div v-if="conditionError" class="builder-inline-error" role="alert">โหลดกติกาสโมสรไม่ได้ <button @click="fetchCondition">ลองอีกครั้ง</button></div>
      <div class="builder-grid">
        <section class="builder-pitch-panel" aria-label="สนามจัดทีม">
          <div class="builder-panel-bar"><span>แตะเสื้อเพื่อเลือกนักเตะ</span><button @click="ClickshowCopyTeamModal" class="builder-text-button">คัดลอกทีม</button></div>
          <div class="builder-pitch">
            <div class="builder-pitch-markings" aria-hidden="true"><i></i><b></b></div>
            <div v-for="row in positionRows" :key="row.code" class="builder-position-row">
              <span class="builder-position-label">{{ row.label }}</span>
              <div class="builder-slots">
                <div v-for="(player, index) in row.players" :key="index" class="builder-slot" :class="{ 'builder-slot-filled': player.id }">
                  <button type="button" class="builder-shirt-button" :aria-label="player.id ? `${player.name} ราคา ${player.price} จัดการนักเตะ` : `เพิ่ม${row.label}`" @click="player.id ? adjustPlayer(player) : toggleClass(row.code)">
                    <img :src="getShirtImage(player, row.code)" :alt="player.id ? `เสื้อ ${player.name}` : `ช่องว่าง ${row.label}`" class="builder-shirt" />
                    <span v-if="player.id === isCaptain" class="builder-captain-badge">C</span>
                    <span class="builder-player-name" :title="player.name">{{ player.id ? player.name : '+ เพิ่ม' }}</span>
                    <span v-if="player.id" class="builder-player-price">{{ Number(player.price).toFixed(1) }} <small>{{ player.team_vs }}</small></span>
                  </button>
                  <button v-if="player.id" class="builder-remove-player" :aria-label="`ลบ ${player.name}`" @click="removePlayerC(player)">×</button>
                </div>
              </div>
            </div>
          </div>
          <div class="builder-rules"><span>GK 1 · DEF ≥3 · MID ≥2 · FWD ≥1</span><span>สโมสรละไม่เกิน {{ condition || '…' }} คน</span></div>
          <div class="builder-save-bar"><div><strong>{{ totalPlayerCount === 11 && isCaptain !== 'none' ? 'ทีมของคุณพร้อมแล้ว' : 'สร้าง 11 ตัวจริงของคุณ' }}</strong><span>{{ mode === 'normal' ? 'ปกติ · 1 ทีมต่อเกมวีค' : 'VIP · ใช้ 1 ตั๋วต่อทีม' }}</span></div><button class="builder-button" :disabled="disable || !condition" @click="saveTeam">{{ disable ? 'กำลังบันทึก…' : 'บันทึกทีม' }} <span>↗</span></button></div>
          <div class="builder-tools"><button class="builder-text-button" @click="resetTeam">รีเซ็ตทีม</button><button class="builder-text-button" @click="toggleClass('all')">รายชื่อนักเตะทั้งหมด +</button></div>
        </section>
        <div v-if="isToggled" class="builder-picker-backdrop" @click="toggleClassBack"></div>
        <aside v-member-dialog.mobile="isToggled" ref="picker" class="builder-picker" :class="{ 'is-open': isToggled }" :role="isToggled ? 'dialog' : 'complementary'" :aria-modal="isToggled ? true : undefined" aria-label="เลือกนักเตะ" @keydown.esc="toggleClassBack">
          <div class="builder-picker-heading"><div><p class="builder-eyebrow">PLAYER SELECTION</p><h2>เลือกนักเตะ</h2></div><button ref="pickerClose" class="builder-close" @click="toggleClassBack" aria-label="ปิดรายชื่อนักเตะ">×</button></div>
          <PlayerSelection :mode="mode" :position="position" :remainingAmount="remainingAmount" :condition="condition" @playerAdded="toggleClassBack" @showPositionFullModal="alertPositionfull" @showTeamLimitModal="alertTeamLimit" @showTeamAllLimitModal="alertTeamAllLimit" @remove-player="del_captan" />
        </aside>
      </div>
      <section class="builder-fixtures"><div class="builder-panel-bar"><h2>โปรแกรมเกมวีค {{ getGameWeek.week_name || getGameWeek.week }}</h2><span>MATCHDAY</span></div><p v-if="matchesLoading" role="status">กำลังโหลดโปรแกรม…</p><p v-else-if="matchesError" role="alert">โหลดโปรแกรมไม่ได้ <button class="builder-text-button" @click="fetchMatches">ลองอีกครั้ง</button></p><p v-else-if="!matches.length">รอโปรแกรมการแข่งขัน</p><div v-for="(fixtures, date) in groupedMatches" :key="date" class="builder-fixture-group"><h3>{{ formatDate(date) }}</h3><div v-for="match in fixtures" :key="match.id" class="builder-fixture"><span>{{ match.team1 }}</span><strong>{{ match.score1 }} : {{ match.score2 }}</strong><span>{{ match.team2 }}</span></div></div></section>
    </template>
    <Modelc :showAdjustPlayerModal="showAdjustPlayerModal" :playerName="detailPlayer ? detailPlayer.name : 'นักเตะ'" @close-modal="showAdjustPlayerModal = false" @set-captain="setCaptan" @remove-player="ClickRemovePlayer" />
    <ModelCopyTeam :showCopyTeamModal="showCopyTeamModal" :gameWeekId="getGameWeek.id" @close-modal="showCopyTeamModal = false" @copy-player="CopyPlayer" />
  </div>
</template>

<script>
import PlayerSelection from './PlayerSelection.vue';
import ModelCopyTeam from '../object/model_copy_my_team.vue';
import { mapActions, mapGetters } from 'vuex';
import Modelc from '../object/model.vue'
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import { originalShirtImage, resolveCopiedPlayers } from '../../utils/builderContext.js';
import { gameweekState } from '../../utils/gameweeks.js';
export default {
    name: 'FantasyTeam',
    props: { mode: { type: String, default: 'vip' } },
    components: {
        PlayerSelection,
        Modelc,
        ModelCopyTeam
    },
    data() {
        return {
            condition: null,
            conditionError: false,
            disposed: false,
            now: Date.now(),
            matchesLoading: true,
            matchesError: false,
            showCopyTeamModal: false,

            showPlayerList: false,
            isToggled: false,
            selectedFormation: '1-5-5-3',
            loading: true,
            position: 'all',

            showAdjustPlayerModal: false,
            isCaptain: 'none',
            detailPlayer: null,
            nameteam: '',
            amount: 80.0,
            disable: false,
            matches: [],
        }
    },
    methods: {
        ...mapActions('playerSelect', ['addPlayer', 'setFormation', 'removePlayer']),
        ...mapActions('alert', ['addNotification']),
        ...mapActions('ticket', ['facthTicket']),
        ClickshowCopyTeamModal() {
            this.showCopyTeamModal = true;
        },
        CopyPlayer(players) {
            try {
                const current = resolveCopiedPlayers(players, this.getGameWeekPlayer, this.getGameWeek.id);
                this.updateFormation();
                current.forEach(player => this.addPlayer({ player, position: this.getPositionStateKey(player.position) }));
                this.showCopyTeamModal = false;
                this.addNotification({ type: 'success', message: 'คัดลอกทีมแล้ว กรุณาเลือกกัปตันใหม่' });
            } catch (error) {
                this.addNotification({ type: 'error', message: 'คัดลอกไม่ได้ รายชื่อนักเตะไม่ตรงกับเกมวีคนี้' });
            }
        },
        async fetchMatches() {
            this.matchesLoading = true;
            this.matchesError = false;
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/result-game-week/${this.$route.params.gameWeekID}`, {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                if (response.data.ok) {
                    this.matches = (response.data.matches || []).map(match => ({
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
                this.matchesError = true;
            } finally { this.matchesLoading = false; }
        },
        async fetchCondition() {
            this.conditionError = false;
            try {
                const { data } = await api.get('/premier-league/v1/condition', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
                });
                if (!data.ok || Number(data.condition) <= 0) throw new Error('Invalid condition');
                this.condition = Number(data.condition);
            } catch (error) { this.conditionError = true; }
        },

        formatDate(date) {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(date).toLocaleDateString('th-TH', options);
        },
        alertPositionfull() {
            Swal.fire({
                text: 'ไม่สามารถเลือกตำเเหน่งซ้ำกันได้',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                showConfirmButton: false,
                customClass: {
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });
        },
        alertTeamLimit(condition = this.condition) {
            Swal.fire({
                text: `ไม่สามารถเลือกทีมเดียวกันได้เกิน ${condition} คน`,
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                showConfirmButton: false,
                customClass: {
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });
        },
        alertTeamAllLimit() {
            Swal.fire({
                text: 'ไม่สามารถเลือกนักเตะได้เกิน 11 คน',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                showConfirmButton: false,
                customClass: {
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });
        },
        resetTeam() {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: "คุณจะล้างข้อมูลนักเตะ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่, รีเซ็ต!',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateFormation();
                }
            })
        },
        toggleClass(position) {
            if (this.totalPlayerCount >= 11) {
                this.alertTeamAllLimit();
                return;
            }
            this.position = position;
            this.isToggled = true;
        },
        toggleClassBack() {
            this.isToggled = false;
        },

        updateFormation() {
            this.isCaptain = 'none';
            const formation = this.selectedFormation;
            this.setFormation(formation);

        },
        getShirtImage: originalShirtImage,
        truncateText(text) {
            if (text.length > 8) {
                return text.slice(0, 8) + '...';
            } else {
                return text;
            }
        },
        adjustPlayer(player) {
            this.detailPlayer = player;
            this.showAdjustPlayerModal = true;
        },
        setCaptan() {
            this.isCaptain = this.detailPlayer.id;
            this.showAdjustPlayerModal = false;
        },
        removePlayerC(player) {
            const positionState = this.getPositionStateKey(player.position);
            this.removePlayer({ player, position: positionState });
            if (player.id == this.isCaptain) {
                this.isCaptain = 'none';
            }
        },
        ClickRemovePlayer() {
            let player = this.detailPlayer;
            if (player.id == this.isCaptain) {
                this.isCaptain = 'none';
            }
            const positionState = this.getPositionStateKey(player.position);
            this.removePlayer({ player, position: positionState });
            this.showAdjustPlayerModal = false;
        },
        del_captan(player_id) {
            if (player_id == this.isCaptain) {
                this.isCaptain = 'none';
            }
        },
        getPositionStateKey(position) {
            switch (position) {
                case 'G': return 'GKP';
                case 'D': return 'DEF';
                case 'M': return 'MID';
                case 'F': return 'FWD';
            }
        },
        checkHasCaptan() {
            const allPlayers = [
                ...this.getGKP,
                ...this.getDEF,
                ...this.getMID,
                ...this.getFWD,
            ];
            const isCaptainValid = allPlayers.some(player => player.id === this.isCaptain);
            return isCaptainValid;
        },
        async saveTeam() {

            if (!this.getGameWeek || gameweekState(this.getGameWeek) !== 'open' || Number(this.$route.params.gameWeekID) !== Number(this.getGameWeek.id) || Number(this.$route.params.seasonID) !== Number(this.getGameWeek.season_id)) {
                this.addNotification({ type: 'error', message: 'เกมวีคไม่สามารถบันทึกได้' });
                return;
            }
            if (this.disable) {
                return;
            }

            if (!this.condition || this.selectedPlayers.some(player => !this.getGameWeekPlayer.some(candidate => candidate.id === player.id))) {
                this.addNotification({ type: 'error', message: 'กรุณาโหลดข้อมูลเกมวีคให้ครบก่อนบันทึก' });
                return;
            }
            const clubs = this.selectedPlayers.reduce((counts, player) => { counts[player.team_id] = (counts[player.team_id] || 0) + 1; return counts; }, {});
            if (Object.values(clubs).some(count => count > this.condition)) { this.alertTeamLimit(); return; }
            const savedContext = `${this.getGameWeek.season_id}:${this.getGameWeek.id}`;
            let countGKP = 0;
            for (let i = 0; i < this.getGKP.length; i++) {
                if (this.getGKP[i].id != null) {
                    countGKP++;
                }
            }

            let countDiff = 0;
            for (let i = 0; i < this.getDEF.length; i++) {
                if (this.getDEF[i].id != null) {
                    countDiff++;
                }
            }

            let countMid = 0;
            for (let i = 0; i < this.getMID.length; i++) {
                if (this.getMID[i].id != null) {
                    countMid++;
                }
            }

            let countFWD = 0;
            for (let i = 0; i < this.getFWD.length; i++) {
                if (this.getFWD[i].id != null) {
                    countFWD++;
                }
            }

            if (countGKP < 1) {
                Swal.fire({
                    text: 'กรุณาเลือกผู้รักษาประตูอย่างน้อย 1 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (countDiff < 3) {
                Swal.fire({
                    text: 'กรุณาเลือกกองหลังอย่างน้อย 3 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (countMid < 2) {
                Swal.fire({
                    text: 'กรุณาเลือกกองกลางอย่างน้อย 2 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (countFWD < 1) {
                Swal.fire({
                    text: 'กรุณาเลือกกองหน้าอย่างน้อย 1 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (this.remainingAmount < 0) {
                Swal.fire({
                    text: 'จำนวนเงินไม่เพียงพอ',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                this.disable = false;
                return;
            }
            if (this.totalPlayerCount !== 11) {
                Swal.fire({
                    text: 'กรุณาเลือกนักเตะให้ครบ 11 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });

                this.disable = false;
                return;
            }
            if (!this.checkHasCaptan()) {
                Swal.fire({
                    text: 'กรุณาเลือกกัปตันทีม',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });

                this.disable = false;
                return;
            }

            this.disable = true;
            const result = await Swal.fire({
                title: 'กรุณาอ่าน!',
                text: 'บันทึกเเล้วต้องการเเก้ไขให้ไปที่เมนูรายการ',
                input: 'text',
                inputPlaceholder: 'กรุณาใส่ชื่อทีมของคุณ',
                inputAttributes: { maxlength: 18 },
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: this.mode === 'normal' ? 'ยืนยัน' : 'ยืนยัน (1 ตั๋ว)',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
                inputValidator: (value) => {
                    if (!value.trim()) {
                        return 'กรุณาใส่ชื่อทีมของคุณ';
                    }
                    if (value.length > 18) {
                        return 'ชื่อทีมต้องไม่เกิน 18 ตัวอักษร';
                    }
                }
            });

            if (!result.isConfirmed) {
                this.disable = false;
                return;
            }

            if (this.disposed || `${this.getGameWeek?.season_id}:${this.getGameWeek?.id}` !== savedContext || `${this.$route.params.seasonID}:${this.$route.params.gameWeekID}` !== savedContext) { this.disable = false; return; }
            const teamName = result.value.trim();
            if (!teamName) {
                this.disable = false;
                return;
            }

            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/create-player-game${this.mode === 'normal' ? '-n' : ''}`, {
                    game_week_id: this.getGameWeek.id,
                    season_id: this.getGameWeek.season_id,
                    formation: this.selectedFormation,
                    name: teamName,
                    captain: this.isCaptain,
                    gkp: this.getGKP,
                    def: this.getDEF,
                    mid: this.getMID,
                    fwd: this.getFWD

                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    if (this.mode !== 'normal') this.facthTicket();
                    this.addNotification({ type: 'success', message: 'บันทึกสำเร็จ รายละเอียดอยู่ที่เมนูรายการ' });
                    let id = response.data.main_id;
                    this.disable = false;
                    this.$router.push({ name: this.mode === 'normal' ? 'pitch-detail-n' : 'pitch-detail', params: { id } });
                } else { throw new Error(response.data.error || 'กรุณาลองอีกครั้ง'); }
            } catch (error) {
                Swal.fire({
                    text: 'บันทึกไม่สำเร็จ ' + (error.response?.data?.error || error.message),
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                this.disable = false;
                console.log(error);
            }

        }


    },
    computed: {
        ...mapGetters('GameWeek', ['getGameWeek', 'getGameWeekPlayer']),
        ...mapGetters('playerSelect', ['getGKP', 'getDEF', 'getMID', 'getFWD']),
        roundState() { return gameweekState(this.getGameWeek, this.now); },
        selectedPlayers() { return [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD].filter(player => player.id); },
        captainName() { return this.selectedPlayers.find(player => player.id === this.isCaptain)?.name || 'ยังไม่ได้เลือก'; },
        positionRows() { return [
            { code: 'G', label: 'ผู้รักษาประตู', players: this.getGKP },
            { code: 'D', label: 'กองหลัง', players: this.getDEF },
            { code: 'M', label: 'กองกลาง', players: this.getMID },
            { code: 'F', label: 'กองหน้า', players: this.getFWD },
        ]; },
        groupedMatches() {
            return this.matches.reduce((groups, match) => {
                const date = match.date;
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(match);
                return groups;
            }, {});
        },
        totalPlayerCount() {
            try {
                const allPlayers = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
                const validPlayers = allPlayers.filter(player => player.id !== null);
                return validPlayers.length;
            } catch (error) {
                console.error('Error calculating total player count:', error);
                return 0;
            }
        },
        totalPrice() {
            const allPlayers = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
            const validPlayers = allPlayers.filter(player => player.id !== null);
            return validPlayers.reduce((total, player) => total + Number(player.price || 0), 0);
        },
        remainingAmount() {
            return (this.amount - this.totalPrice).toFixed(2);
        }
    },

    beforeUnmount() {
        this.disposed = true;
        clearInterval(this.clockTimer);
        this.isToggled = false;
    },
    created() {
        this.clockTimer = setInterval(() => { this.now = Date.now(); }, 30000);
        this.fetchCondition();
        this.fetchMatches();
        this.updateFormation();
    }
}
</script>
<style src="../../styles/builder.css"></style>
