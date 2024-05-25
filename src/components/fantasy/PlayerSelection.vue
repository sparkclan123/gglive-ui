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
        <table class="min-w-full bg-gray-700 rounded-lg text-sm">
            <thead>
                <tr>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">นักเตะ</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">ทีม</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">คะแนน</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">ราคา</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">%</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">⚽</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">🟨</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">🟥</th>
                    <th class="w-1/12 py-1 text-left text-gray-100 border-b border-gray-700">คลีน</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in filteredPlayers" :key="player.id" class="bg-gray-900 hover:bg-gray-700">
                    <td class="py-1 px-2 border-b border-gray-700">
                        <div class="flex items-center">
                            <img :src="getShirtImage(player)" alt="team logo" class="w-4 h-4 mr-1">
                            <div>{{ player.name }}</div>
                        </div>
                    </td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.team_code }} vs {{ player.opponent }}</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.total_point }}</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.price }}</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.percentage }}%</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.goals }}</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.yellow_cards }}</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.red_cards }}</td>
                    <td class="py-1 px-2 border-b border-gray-700">{{ player.clean_sheets }}</td>
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
</style>
