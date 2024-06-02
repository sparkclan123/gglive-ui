<template>
    <div>
        <div
            class="player-selection bg-color-2 p-4 shadow-lg h-full overflow-y-auto text-gray-200 mt-2 mb-4 rounded-lg shadow-xl">
            <h4 class="text-md font-bold mb-4">ตัวเลือกผู้เล่น</h4>
            <div class="flex flex-wrap gap-4 mb-4 ">
                <div class="flex-1 min-w-[100px]">
                    <label class="block mb-1 text-gray-100 text-xs">ทีม</label>
                    <select v-model="selectedTeam" @change="filterPlayers"
                        class="p-1  rounded w-full text-gray-600 focus:outline-none focus:border-blue-500 text-sm">
                        <optgroup v-for="group in options" :key="group.label" :label="group.label">
                            <option v-for="option in group.options" :key="option.value" :value="option.value">
                                {{ option.name }}
                            </option>
                        </optgroup>
                    </select>
                </div>
                <div class="flex-1 min-w-[100px]">
                    <label class="block mb-1 text-gray-100 text-xs">ตำเเหน่ง</label>
                    <select v-model="selectedPosition" @change="filterPlayers"
                        class="p-1  rounded w-full text-gray-600 focus:outline-none focus:border-blue-500 text-sm">
                        <option value="">ทุกตำเเหน่ง</option>
                        <option v-for="option in optionsPosition" :key="option.value" :value="option.value">
                            {{ option.name }}
                        </option>
                    </select>
                </div>
                <div class="flex-1 min-w-[100px]">
                    <label class="block mb-1 text-gray-100 text-xs">Sorted by</label>
                    <select v-model="sortBy" @change="sortPlayers"
                        class="p-1  rounded w-full text-gray-600 focus:outline-none focus:border-blue-500 text-sm">
                        <option value="total_points">เรียงตามปกติ</option>
                        <option value="price_m">ราคา > </option>
                        <option value="price_l">ราคา < </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-wrap gap-4 mb-4 ">
                <div class="flex-1 min-w-[100px] ">
                    <label class="block mb-1 text-gray-100 text-xs">ค้นหา..</label>
                    <input type="text" placeholder="Search for player..." v-model="searchTerm" @input="filterPlayers"
                        class="p-1 border rounded w-full text-gray-600 text-sm">
                </div>
                <div class="flex-1 min-w-[100px]">
                    <label class="block mb-1 text-gray-100 text-xs">งบไม่เกิน</label>
                    <input type="number" placeholder="Max cost" v-model="maxCost" @input="filterPlayers"
                        class="p-1 border rounded w-full text-gray-600 text-sm">
                </div>

            </div>


            <table class="min-w-full bg-gray-300 rounded-lg text-xs">
                <thead>
                    <tr>
                        <th class="w-1/12  text-left text-gray-900 border-b border-gray-400"></th>
                        <th class="w-1/4 py-1 pl-2 text-left text-gray-900 border-b border-gray-400">นักเตะ</th>
                        <!-- <th class="w-1/12 py-1 pl-2 text-left text-gray-900 border-b border-gray-400">ทีม</th> -->
                        <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">ราคา</th>
                        <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">%</th>
                        <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">🟨</th>
                        <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">🟥</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="player in filteredPlayers" :key="player.id" class="bg-gray-50"
                        :class="{ 'opacity-50': isSelected(player.id) }">
                        <td class="w-1/12 py-1 px-2 border-b border-r border-gray-400 text-gray-900"
                            @click="infoPlayer(player)">
                            <svg width="14" height="13" viewBox="0 0 6 13" v-if="!player.is_ban">
                                <path
                                    d="M2.22454008,4.81004082 C2.04454008,5.29122857 1.86734808,5.7178898 1.72391208,6.156 C1.26547608,7.55608163 0.79016808,8.95126531 0.37907208,10.3661633 C0.14141208,11.1840857 0.47704128,11.7369796 1.18250808,11.838 C1.43938008,11.8748302 1.71688008,11.8733951 1.96813608,11.8150408 C3.51877608,11.4548694 4.20733608,10.1739796 4.91521608,8.91887755 C4.76334408,9.03175959 4.64147208,9.17573878 4.51255608,9.31301633 C4.11552408,9.7358449 3.67396008,10.0969714 3.12319608,10.2887878 C3.03319608,10.3198788 2.89960008,10.305529 2.82272808,10.2548278 C2.78194728,10.228042 2.80397808,10.0725869 2.8269468,9.98313796 C2.8569468,9.86451551 2.9160096,9.75306857 2.9624148,9.63827265 C3.5652228,8.14782367 4.1759748,6.66080327 4.7638548,5.16410939 C4.865574,4.90486041 4.9325988,4.59873796 4.9058868,4.32609306 C4.8566676,3.82768898 4.3424508,3.47564816 3.7124508,3.48904408 C2.0769708,3.52348286 0.8985708,4.35097469 0.0595308,5.74002367 C0.0285936,5.79120367 0.0285936,5.86151633 0,5.98253388 C0.698436,5.45686041 1.27548,4.82070122 2.22468,4.81018286 L2.22454008,4.81004082 Z M5.82634008,1.5717551 C5.82634008,2.43941633 5.13680808,3.14302041 4.28602008,3.14302041 C3.43571208,3.14302041 2.74618008,2.43941633 2.74618008,1.5717551 C2.74618008,0.703616327 3.43571208,0 4.28602008,0 C5.13679608,0 5.82634008,0.703604082 5.82634008,1.5717551"
                                    transform="translate(0 .5)"></path>
                            </svg>
                            <svg width="16" height="19" viewBox="0 0 21 19" copnr="0" fill="#c0020d" v-else
                                class="ElementStatus__StyledStatus-sc-1bs5tgy-1 ekMARt">
                                <title>Unlikely to play</title>
                                <path
                                    d="M20.7588154,16.1639512 L12.2281283,0.988998469 C11.879948,0.378360845 11.2183513,0 10.4998191,0 C9.78128692,0 9.11969017,0.378360845 8.77150994,0.988998469 L0.240822794,16.1639512 C-0.0919261004,16.7567989 -0.0793835139,17.4770055 0.275542057,18.0585846 C0.629499774,18.6401876 1.27376405,18.9979533 1.9691369,18.9999129 L19.0053273,18.9999129 C19.7055147,19.0063793 20.357507,18.6523673 20.7182051,18.0688941 C21.0789032,17.485421 21.0943345,16.7605391 20.7587117,16.1639512 L20.7588154,16.1639512 Z">
                                </path>
                                <path fill="white"
                                    d="M10.4998191,17.0817658 C10.1005303,17.0817658 9.73983219,16.8485635 9.5874447,16.4898532 C9.43409676,16.1311524 9.51896909,15.7190817 9.80155504,15.4446556 C10.084141,15.1702295 10.5085076,15.087825 10.8778966,15.2367406 C11.2472857,15.3847163 11.4874466,15.73498 11.4874466,16.1227154 C11.4874466,16.3774574 11.3832838,16.6209548 11.1981029,16.8007727 C11.012922,16.9805906 10.762174,17.0817442 10.4998413,17.0817442 L10.4998191,17.0817658 Z M12.3390363,6.77220598 L11.5964066,13.2456505 C11.5308247,13.7860393 11.0601616,14.1934347 10.4998191,14.1934347 C9.93947659,14.1934347 9.46880862,13.7860393 9.40323163,13.2456505 L8.66060187,6.77220598 C8.62298893,6.4678342 8.72136182,6.16156835 8.93162544,5.93305576 C9.14187672,5.70360092 9.44278522,5.5724849 9.75913987,5.57341497 L11.2405477,5.57341497 C11.5568777,5.57248346 11.857801,5.70360092 12.0680622,5.93305576 C12.2783134,6.16157315 12.3766888,6.4678342 12.3390857,6.77220598 L12.3390363,6.77220598 Z">
                                </path>
                            </svg>
                        </td>
                        <td class="w-1/4 py-1 px-2 border-b border-r border-gray-400 text-gray-900"
                            @click="selectPlayer(player)">
                            <div class="flex items-center">
                                <img :src="getShirtImage(player)" alt="team logo" class="w-6 h-8 mr-2">
                                <div class="truncate">
                                    <div>{{ player.name }}</div>
                                    <div class="text-xs text-gray-600">{{ player.position }}</div>
                                </div>
                            </div>
                        </td>
                        <!-- <td class="w-1/12 py-1 px-2 border-b border-gray-400 text-gray-900">
                        <div class="flex items-center">
                            <img :src="`/public/assets/team/${player.team_code}.png`" alt="team logo" class="w-4 h-4 mr-1">
                        </div>
                    </td> -->
                        <td class="w-1/12 py-1 px-2 border-b border-gray-400 text-gray-900">12.5</td>
                        <td class="w-1/12 py-1 px-2 border-b border-gray-400 text-gray-900">20%</td>
                        <td class="w-1/12 py-1 px-2 border-b border-gray-400 text-gray-900">5</td>
                        <td class="w-1/12 py-1 px-2 border-b border-gray-400 text-gray-900">5</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['position'],
    name: 'PlayerSelection',
    data() {
        return {
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


        };
    },
    computed: {
        ...mapGetters('GameWeek', ['getGameWeekPlayer']),
        ...mapGetters('Teams', ['getTeams']),
        ...mapGetters('playerSelect', ['getGKP', 'getDEF', 'getMID', 'getFWD']),
        positionOptions() {
            return this.options.find(option => option.label === 'Positions').options;
        },
        filteredPlayers() {
            return this.getGameWeekPlayer.filter(player => {
                return (
                    (this.selectedTeam === 'view' || player.team_id === this.selectedTeam) &&
                    (this.selectedPosition === '' || player.position === this.selectedPosition) &&
                    (!this.maxCost || player.price <= this.maxCost) &&
                    (this.searchTerm === '' || player.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
                );
            }).sort((a, b) => {
                if (this.sortBy === 'total_points') {
                    return b.total_point - a.total_point;
                } else if (this.sortBy === 'price') {
                    return b.price - a.price;
                }
                return 0;
            });
        }
    },
    methods: {
        ...mapActions('playerSelect', ['addPlayer', 'removePlayer']),
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
        selectPlayer(player) {
            if (player.is_ban) {
                return;
            }

            const position = this.getPositionKey(player.position);
            const positionState = this.getPositionStateKey(player.position);

            const playersInPosition = this[position];



            const existingPlayerIndex = playersInPosition.findIndex(p => p.id === player.id);

            if (existingPlayerIndex !== -1) {

                if (confirm(`Do you want to remove player ${player.name}?`)) {
                    this.removePlayer({ player, position: positionState });
                }
            } else {
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

                    if (totalPlayersInTeam >= 3) {
                        this.$emit('showTeamLimitModal');
                        return;
                    }

                    this.addPlayer({ player, position: positionState }).then(() => {
                        this.$emit('playerAdded');
                    });
                }
            }
        },
        infoPlayer(player) {
            console.log(player);
            alert(player);
        },
        stripTeamCode(teamCode) {
            return teamCode.replace('t', '');
        },
        getShirtImage(player) {
            const teamCode = this.stripTeamCode(player.team_code);
            const suffix = player.position === 'G' ? '_1-66' : '-66';
            return `/assets/shirt/shirt_${teamCode}${suffix}.webp`;
        },
        filterPlayers() {
            this.filteredPlayers;
        },
        sortPlayers() {
            this.filteredPlayers;
        },
        updateTeamOptions() {
            const teams = this.getTeams;
            if (teams && Array.isArray(teams)) {
                this.options.find(option => option.label === 'Teams').options = teams.map(team => ({
                    name: team.name,
                    value: team.team_id
                }));
            } else {
                console.error('getTeams is null or not an array');
            }
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
        position(newPosition) {
            this.selectedPosition = newPosition === 'all' ? '' : newPosition;
            this.filterPlayers();
        }
    },
    mounted() {
        this.updateTeamOptions();
    }
};
</script>

<style scoped>
.bg-color-2 {
    background-color: #261442;
}

.bg-color-1 {
    background-color: #261442;
}
</style>
