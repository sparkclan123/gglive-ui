<template>
    <div
        class="player-selection bg-color-2 p-4 shadow-lg h-full overflow-y-auto text-gray-200 mt-2 mb-4 rounded-lg shadow-xl">
        <h2 class="text-xl font-bold mb-4">Player Selection</h2>
        <div class="flex flex-wrap gap-4 mb-4">
            <div class="flex-1 min-w-[100px]">
                <label class="block mb-1 text-gray-100">View</label>
                <select v-model="selectedTeam" @change="filterPlayers"
                    class="p-2 border-b-2 border-gray-300 rounded w-full text-gray-600 focus:outline-none focus:border-blue-500">
                    <optgroup v-for="group in options" :key="group.label" :label="group.label">
                        <option v-for="option in group.options" :key="option.value" :value="option.value">
                            {{ option.name }}
                        </option>
                    </optgroup>
                </select>
            </div>
            <div class="flex-1 min-w-[100px]">
                <label class="block mb-1 text-gray-100">Position</label>
                <select v-model="selectedPosition" @change="filterPlayers"
                    class="p-2 border-b-2 border-gray-300 rounded w-full text-gray-600 focus:outline-none focus:border-blue-500">
                    <option value="">All Positions</option>
                    <option v-for="option in optionsPosition" :key="option.value" :value="option.value">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="flex-1 min-w-[100px]">
                <label class="block mb-1 text-gray-100">Sorted by</label>
                <select v-model="sortBy" @change="sortPlayers"
                    class="p-2 border-b-2 border-gray-300 rounded w-full text-gray-600 focus:outline-none focus:border-blue-500">
                    <option value="total_points">Total points</option>
                    <option value="price">Price</option>
                </select>
            </div>
        </div>

        <div class="mb-4">
            <input type="number" placeholder="Max cost" v-model="maxCost" @input="filterPlayers"
                class="p-2 border rounded w-full text-gray-600">
        </div>
        <div class="mb-4 p-2 border-b flex justify-between">
            <input type="text" placeholder="Search for player..." v-model="searchTerm" @input="filterPlayers"
                class="p-2 border rounded w-full text-gray-600">
        </div>

        <div class="ElementList__ElementTypeButtonWrap-j2itt6-2 lhOTVB">
            <button class="ElementList__ElementTypeButton-j2itt6-3 ffmiMs">
                <div class="TabHeading__TabHeadingOuter-sc-1wos76v-0 dbiWsa">
                    <div class="TabHeading__TabHeadingInner-sc-1wos76v-1 jhdCIq">
                        <h3 class="TabHeading__TabHeadingTitle-sc-1wos76v-2 kVZXCD">Defenders</h3>
                    </div>
                </div>
            </button>
        </div>
        <table class="min-w-full bg-gray-300 rounded-lg text-xs">
            <thead>
                <tr>
                    <th class="w-1/12 py-1 pl-7 text-left text-gray-900 border-b border-gray-400"></th>
                    <th class="w-1/4 py-1 text-left text-gray-900 border-b border-gray-400">นักเตะ</th>
                    <!-- <th class="w-1/12 py-1 pl-2 text-left text-gray-900 border-b border-gray-400">ทีม</th> -->
                    <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">ราคา</th>
                    <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">%</th>
                    <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">🟨</th>
                    <th class="w-1/12 py-1  pl-2 text-left text-gray-900 border-b border-gray-400">🟥</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in filteredPlayers" :key="player.id" class="bg-gray-50">
                    <td class="w-1/12 py-1 px-2 border-b border-r border-gray-400 text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 8a.5.5 0 0 1 .5-.5H7v4H4.5a.5.5 0 0 1 0-1H6V8.5H5a.5.5 0 0 1-.5-.5zm1.5-4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                        </svg>
                    </td>
                    <td class="w-1/4 py-1 px-2 border-b border-r border-gray-400 text-gray-900">
                        <div class="flex items-center">
                            <img :src="getShirtImage(player)" alt="team logo" class="w-8 h-8 mr-2">
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
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PlayerSelection',
    data() {
        return {
            selectedTeam: 'view',
            selectedPosition: '',
            sortBy: 'total_points',
            maxCost: null,
            searchTerm: '',
            options: [
                {
                    label: 'View',
                    options: [
                        { name: 'View', value: 'view' }
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
            ]
        };
    },
    computed: {
        ...mapGetters('GameWeek', ['getGameWeekPlayer']),
        ...mapGetters('Teams', ['getTeams']),
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
        stripTeamCode(teamCode) {
            return teamCode.replace('t', '');
        },
        getShirtImage(player) {
            const teamCode = this.stripTeamCode(player.team_code);
            const suffix = player.position === 'G' ? '_1-66' : '-66';
            return `/public/assets/shirt/shirt_${teamCode}${suffix}.webp`;
        },
        filterPlayers() {
            this.filteredPlayers;
        },
        sortPlayers() {
            this.filteredPlayers;
        },
        updateTeamOptions() {
            this.options.find(option => option.label === 'Teams').options = this.getTeams.map(team => ({
                name: team.name,
                value: team.team_id
            }));
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
