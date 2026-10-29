<template>
  <div class="builder-player-selection">
    <div class="builder-picker-filters">
      <label class="builder-search">ค้นหานักเตะ<input type="search" enterkeyhint="search" autocomplete="off" placeholder="ชื่อผู้เล่น…" v-model="searchTerm" @input="filterPlayers" /></label>
      <label>สโมสร<select v-model="selectedTeam" @change="filterPlayers"><optgroup v-for="group in options" :key="group.label" :label="group.label"><option v-for="option in group.options" :key="option.value" :value="option.value">{{ option.name }}</option></optgroup></select></label>
      <label>ตำแหน่ง<select v-model="selectedPosition" @change="filterPlayers"><option value="">ทุกตำแหน่ง</option><option v-for="option in optionsPosition" :key="option.value" :value="option.value">{{ option.name }}</option></select></label>
      <label>งบไม่เกิน<input type="number" inputmode="decimal" min="0" step="0.1" placeholder="ไม่จำกัด" v-model="maxCost" @input="filterPlayers" /></label>
      <label class="builder-available"><input type="checkbox" v-model="is_check_player" />เฉพาะนักเตะพร้อมลงเล่น</label>
    </div>
    <div class="builder-picker-count"><span>{{ filteredPlayers.length }} นักเตะ</span><span>งบคงเหลือ <b>{{ remainingAmount }}</b></span></div>
    <div ref="list" class="builder-player-table-wrap">
      <table class="builder-player-table"><thead><tr><th aria-label="สถานะ"></th><th>นักเตะ</th><th>ราคา</th><th>เลือก %</th><th>🟨/🟥</th><th aria-label="เลือก"></th></tr></thead><tbody>
        <tr v-for="player in paginatedPlayers" :key="player.id" :class="{ 'is-selected': isSelected(player.id) }">
          <td><button class="builder-player-info" :class="{ 'is-unavailable': player.is_ban || player.is_injured || player.is_suspended }" :aria-label="`สถานะ ${player.name}`" @click="player.is_ban || player.is_injured || player.is_suspended ? infoPlayerBan(player) : infoPlayer(player)">{{ player.is_injured ? '+' : player.is_ban || player.is_suspended ? '!' : 'i' }}</button></td>
          <td><button class="builder-player-choice" @click="selectPlayer(player)" :disabled="!condition"><img :src="getShirtImage(player)" :alt="`เสื้อ ${player.name}`" /><span><strong :title="player.name">{{ player.name }}</strong><small>{{ player.position }} · {{ key_team[player.team_code] || player.team_code }} <em>{{ player.team_vs }}</em></small></span></button></td>
          <td class="builder-price">{{ Number(player.price).toFixed(1) }}</td><td>{{ Number(ownership[player.player_id] || 0).toFixed(1) }}%</td><td>{{ player.yellows_card || 0 }}/{{ player.reds_card || 0 }}</td>
          <td><button class="builder-add-player" :class="{ selected: isSelected(player.id) }" :aria-label="`${isSelected(player.id) ? 'ลบ' : 'เลือก'} ${player.name}`" :disabled="!condition" @click="selectPlayer(player)">{{ isSelected(player.id) ? '✓' : '+' }}</button></td>
        </tr>
      </tbody></table>
      <div v-if="!filteredPlayers.length" class="builder-no-players"><h3>ไม่พบนักเตะ</h3><p>ลองเปลี่ยนสโมสร ตำแหน่ง หรือคำค้นหา</p></div>
    </div>
    <nav class="builder-pagination" aria-label="หน้านักเตะ"><button :disabled="currentPage <= 1" @click="handlePageChange(currentPage - 1)" aria-label="หน้าก่อนหน้า">←</button><span>{{ currentPage }} / {{ totalPages }}</span><button :disabled="currentPage >= totalPages" @click="handlePageChange(currentPage + 1)" aria-label="หน้าถัดไป">→</button></nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';
import { originalShirtImage } from '../../utils/builderContext.js';
export default {
    props: { position: { type: String, default: 'all' }, remainingAmount: [String, Number], condition: Number, mode: { type: String, default: 'vip' } },
    name: 'PlayerSelection',
    data() {
        return {
            is_check_player: true,
            currentPage: 1,
            playersPerPage: 25,
            selectedTeam: 'view',
            selectedPosition: this.position == 'all' ? '' : this.position,
            sortBy: 'total_points',
            maxCost: null,
            searchTerm: '',
            options: [
                {
                    label: 'ตัวเลือก',
                    options: [
                        { name: 'ทั้งหมด', value: 'view' }
                    ]
                },
                {
                    label: 'Teams',
                    options: []
                }
            ],
            optionsPosition: [
                { name: 'GoalKeeper', value: 'G' },
                { name: 'Defenders', value: 'D' },
                { name: 'Midfielders', value: 'M' },
                { name: 'Forwards', value: 'F' }
            ],
           key_team: {
                "t1": "MUN",
                "t2": "LEE",
                "t3": "ARS",
                "t4": "NEW",
                "t5": "BLB",
                "t6": "TOT",
                "t7": "AVL",
                "t8": "CHE",
                "t9": "COV",
                "t11": "EVE",
                "t13": "LEI",
                "t14": "LIV",
                "t17": "NFO",
                "t19": "SHW",
                "t20": "SOU",
                "t21": "WHU",
                "t24": "DER",
                "t25": "MID",
                "t30": "BOL",
                "t31": "CRY",
                "t33": "CHA",
                "t35": "WBA",
                "t36": "BHA",
                "t37": "BAR",
                "t38": "HUD",
                "t39": "WOL",
                "t40": "IPS",
                "t41": "BIR",
                "t43": "MCI",
                "t45": "NOR",
                "t46": "SWI",
                "t47": "POR",
                "t49": "SHU",
                "t52": "QPR",
                "t54": "FUL",
                "t55": "BRA",
                "t56": "SUN",
                "t57": "WAT",
                "t80": "SWA",
                "t88": "HUL",
                "t90": "BUR",
                "t91": "BOU",
                "t92": "BLP",
                "t94": "BRE",
                "t97": "CAR",
                "t102": "LUT",
                "t105": "OLD",
                "t108": "RDG",
                "t110": "STK",
                "t111": "WIG",
                "t1736": "WIM",

                "t505": "AND",
                "t509": "ARG",
                "t510": "ARM",
                "t520": "BEL",
                "t525": "BOL",
                "t528": "BRA",
                "t531": "BUL",
                "t541": "CHI",
                "t554": "DEN",
                "t559": "ECU",
                "t562": "ENG",
                "t565": "EST",
                "t570": "FIN",
                "t571": "FRA",
                "t574": "GEO",
                "t575": "GER",
                "t588": "HUN",
                "t589": "ISL",
                "t594": "ISR",
                "t595": "ITA",
                "t598": "JPN",
                "t600": "KAZ",
                "t611": "LIE",
                "t612": "LTU",
                "t623": "MEX",
                "t628": "MAR",
                "t633": "NED",
                "t641": "NIR",
                "t642": "NOR",
                "t648": "PAR",
                "t649": "PER",
                "t651": "POL",
                "t652": "POR",
                "t665": "SCO",
                "t668": "SRB",
                "t672": "SVK",
                "t676": "RSA",
                "t677": "KOR",
                "t679": "ESP",
                "t683": "SWE",
                "t684": "SUI",
                "t689": "THA",
                "t694": "TUR",
                "t698": "UKR",
                "t700": "USA",
                "t701": "URU",
                "t705": "VEN",
                "t707": "WAL",

                  "t503": "ALG",
                "t512": "AUS",
                "t513": "AUT",
                "t526": "BIH",
                "t536": "CAN",
                "t537": "CPV",
                "t544": "COL",
                "t549": "CRO",
                "t551": "CUW",
                "t553": "CZE",
                "t558": "COD",
                "t560": "EGY",
                "t576": "GHA",
                "t585": "HAI",
                "t592": "IRN",
                "t593": "IRQ",
                "t596": "CIV",
                "t599": "JOR",
                "t634": "NZL",
                "t646": "PAN",
                "t654": "QAT",
                "t664": "KSA",
                "t667": "SEN",
                "t693": "TUN",
                "t703": "UZB",

                "t718": "ATM",
                "t727": "BVB",
                "t720": "BAR",
                "t722": "BAY",
                "t826": "COM",
                "t749": "FEY",
                "t755": "GAL",
                "t758": "INT",
                "t791": "RBL",
                "t765": "LEN",
                "t767": "LIL",
                "t779": "NAP",
                "t787": "PSV",
                "t785": "PSG",
                "t818": "POR",
                "t792": "BET",
                "t793": "RMA",
                "t796": "ROM",
                "t799": "SHK",
                "t800": "SLA",
                "t803": "SPO",
                "t810": "STU",
                "t812": "VIL",
                "t819": "AEK",
                "t725": "BOD",
                "t737": "CBR",
                "t747": "FB",
                "t841": "LASK",
                "t856": "SAB",
                "t801": "SLB",
                "t863": "VIK",
                }


        };
    },
    computed: {
        ...mapGetters('GameWeek', ['getGameWeekPlayer', 'getGameWeekPercentPlayer', 'getGameWeekPercentPlayerN']),
        ...mapGetters('Teams', ['getTeams']),
        ...mapGetters('playerSelect', ['getGKP', 'getDEF', 'getMID', 'getFWD']),
        ownership() { return (this.mode === 'normal' ? this.getGameWeekPercentPlayerN : this.getGameWeekPercentPlayer) || {}; },
        filteredPlayers() {
            return (this.getGameWeekPlayer || []).filter(player => (
                (this.selectedTeam === 'view' || Number(player.team_id) === Number(this.selectedTeam)) &&
                (!this.selectedPosition || player.position === this.selectedPosition) &&
                (!this.maxCost || Number(this.maxCost) < 1 || Number(player.price) <= Number(this.maxCost)) &&
                (!this.is_check_player || (!player.is_ban && !player.is_injured && !player.is_suspended)) &&
                (!this.searchTerm.trim() || player.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()))
            )).sort((a, b) => Number(b.price) - Number(a.price));
        },
        paginatedPlayers() {
            const start = (this.currentPage - 1) * this.playersPerPage;
            const end = start + this.playersPerPage;
            return this.filteredPlayers.slice(start, end);
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.filteredPlayers.length / this.playersPerPage));
        },
    },
    methods: {
        ...mapActions('playerSelect', ['addPlayer', 'removePlayer']),

        truncateText(text) {
            if (text.length > 13) {
                return text.slice(0, 13) + '...';
            } else {
                return text;
            }
        },
        handlePageChange(page) {
            this.currentPage = Math.min(Math.max(1, page), this.totalPages);
            this.$refs.list?.scrollIntoView({ block: 'nearest' });

        },
        getPositionKey(position) {
            switch (position) {
                case 'G': return 'getGKP';
                case 'D': return 'getDEF';
                case 'M': return 'getMID';
                case 'F': return 'getFWD';
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
        async selectPlayer(player) {
            if (!this.condition) return;
            // An old sheet must never add a snapshot from a round that has been replaced.
            if (!(this.getGameWeekPlayer || []).some(current => current.id === player.id)) return;

            if (player.is_injured) {
                Swal.fire({
                    text: player.name + ' บาดเจ็บ',
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
            if (player.is_ban || player.is_suspended) {
                Swal.fire({
                    text: player.name + ' ไม่พร้อมลงเล่น',
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

            const position = this.getPositionKey(player.position);
            const positionState = this.getPositionStateKey(player.position);

            const playersInPosition = this[position];



            const existingPlayerIndex = playersInPosition.findIndex(p => p.id === player.id);

            if (existingPlayerIndex !== -1) {
                const result = await Swal.fire({
                    text: 'คุณต้องการลบนักเตะใช่หรือไม่? ' + player.name,
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    confirmButtonText: 'ลบ',
                    customClass: {
                        confirmButton: 'btn-confirm',
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                if (result.isConfirmed && (this.getGameWeekPlayer || []).some(current => current.id === player.id)) {
                    this.removePlayer({ player, position: positionState });
                    this.$emit('remove-player', player.id);
                }
            } else {
                const roster = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD].filter(p => p.id);
                if (roster.length >= 11) { this.$emit('showTeamAllLimitModal'); return; }
                const emptySpotIndex = playersInPosition.findIndex(p => p.id === null);
                if (emptySpotIndex === -1) {
                    this.$emit('showPositionFullModal');

                } else {
                    // ตรวจสอบว่า มีผู้เล่นในทีมเดียวกันมากกว่า 3 คนหรือไม่
                    const totalPlayersInTeam = [
                        ...this.getGKP,
                        ...this.getDEF,
                        ...this.getMID,
                        ...this.getFWD
                    ].filter(p => p.team_id === player.team_id).length;

                    if (totalPlayersInTeam >= this.condition) {
                      
                        this.$emit('showTeamLimitModal', this.condition);
                        return;
                    }

                    this.addPlayer({ player, position: positionState }).then(() => {
                        this.$emit('playerAdded');
                    });
                }
            }

        },
        infoPlayer(player) {
            Swal.fire({
                text: player.name,
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
        infoPlayerBan(player) {
            let status = '';
            if (player.is_ban || player.is_suspended) {
                status = 'ผู้เล่นโดนเเบน';
            }
            if (player.is_injured) {
                status = 'ผู้เล่นบาดเเจ็บ';
            }

            Swal.fire({
                text: player.name + ' ' + status,
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

        getShirtImage: originalShirtImage,
        filterPlayers() { this.currentPage = 1; },
        updateTeamOptions() {
            this.options.find(option => option.label === 'Teams').options = (this.getTeams || []).map(team => ({ name: team.name, value: team.team_id }));
            if (this.selectedTeam !== 'view' && !(this.getTeams || []).some(team => Number(team.team_id) === Number(this.selectedTeam))) this.selectedTeam = 'view';
        },
        isSelected(playerId) {
            return [
                ...this.getGKP,
                ...this.getDEF,
                ...this.getMID,
                ...this.getFWD
            ].some(p => p.id === playerId);
        }
    },
    watch: {
        position(newPosition) { this.selectedPosition = newPosition === 'all' ? '' : newPosition; this.filterPlayers(); },
        is_check_player() { this.filterPlayers(); },
        getTeams: { immediate: true, handler() { this.updateTeamOptions(); } },
        getGameWeekPlayer() { this.currentPage = 1; this.selectedTeam = 'view'; },
    },
};
</script>
<style src="../../styles/builder.css"></style>
