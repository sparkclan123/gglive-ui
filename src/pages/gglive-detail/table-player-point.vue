<template>
    <div class="contant_style">
        <div class="fixcontant">

            <div class="card cursor-pointer">
                <div class="top-section">
                    <div class="icons">
                        <div class="absolute top-0 left-0 m-3 flex items-center cursor-pointer shsojvp text-gray-200"
                            @click="route_back()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
                                class="svg-white mr-1">
                                <path
                                    d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                                    fill="white" transform="matrix(-1 0 0 1 24 0)"></path>
                            </svg>

                            <span class="text-gray-200 font-bold text-xs">กลับ</span>
                        </div>

                    </div>
                </div>
                <div class="bottom-section">

                    <span class="titlesm text-sm text-yellow-300">รายละเอียดคะเเนนนักเตะ</span>

                </div>
            </div>
            <div class="p-4 overflow-scroll px-0" v-if="getGameWeekPlayer">
                <div class="flex flex-wrap gap-4 mb-1 ">
                    <div class="flex-1 min-w-[100px] ml-1 ">
                        <label class="block mb-1 text-gray-800 text-xs">ค้นหา..ชื่อนักเตะ</label>
                        <input type="text" placeholder="Search for player..." v-model="searchTerm"
                            @input="filterPlayers" class="p-1 border rounded w-full text-gray-600 text-sm">
                    </div>

                    <div class="flex-1 min-w-[100px]">
                        <label class="block mb-1 text-gray-800 text-xs">เลือกทีม</label>
                        <select v-model="selectedTeam" @change="filterPlayers"
                            class="p-1 border rounded w-full text-gray-600 text-sm">
                            <optgroup v-for="group in options" :key="group.label" :label="group.label">
                                <option v-for="option in group.options" :key="option.value" :value="option.value">
                                    {{ option.name }}
                                </option>
                            </optgroup>
                        </select>
                    </div>


                </div>
                <table class="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <!-- ไอคอนเสื้อไม่ต้องการ sorting -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center"></th>

                            <!-- ชื่อนักเตะ -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'name' && sortDirection === 'asc'" @click="sortBy('name')"
                                        class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'name' && sortDirection === 'desc'" @click="sortBy('name')"
                                        class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'name'"
                                        @click="sortBy('name', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        ชื่อนักเตะ
                                    </p>
                                </div>
                            </th>

                            <!-- รวม -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'sum' && sortDirection === 'asc'" @click="sortBy('sum')"
                                        class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'sum' && sortDirection === 'desc'" @click="sortBy('sum')"
                                        class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'sum'"
                                        @click="sortBy('sum', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        รวม
                                    </p>
                                </div>
                            </th>

                            <!-- MVP -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'mvp' && sortDirection === 'asc'" @click="sortBy('mvp')"
                                        class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'mvp' && sortDirection === 'desc'" @click="sortBy('mvp')"
                                        class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'mvp'"
                                        @click="sortBy('mvp', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        MVP
                                    </p>
                                </div>
                            </th>

                            <!-- ลงเล่น -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'play_point' && sortDirection === 'asc'"
                                        @click="sortBy('play_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'play_point' && sortDirection === 'desc'"
                                        @click="sortBy('play_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'play_point'"
                                        @click="sortBy('play_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        ลงเล่น
                                    </p>
                                </div>
                            </th>

                            <!-- ทำประตู -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'goal_point' && sortDirection === 'asc'"
                                        @click="sortBy('goal_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'goal_point' && sortDirection === 'desc'"
                                        @click="sortBy('goal_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'goal_point'"
                                        @click="sortBy('goal_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        ทำประตู
                                    </p>
                                </div>
                            </th>

                            <!-- แอสซิส -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'assist_point' && sortDirection === 'asc'"
                                        @click="sortBy('assist_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'assist_point' && sortDirection === 'desc'"
                                        @click="sortBy('assist_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'assist_point'"
                                        @click="sortBy('assist_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        แอสซิส
                                    </p>
                                </div>
                            </th>

                            <!-- Clean Sheet -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'clean_sheet' && sortDirection === 'asc'"
                                        @click="sortBy('clean_sheet')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'clean_sheet' && sortDirection === 'desc'"
                                        @click="sortBy('clean_sheet')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'clean_sheet'"
                                        @click="sortBy('clean_sheet', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        Clean Sheet
                                    </p>
                                </div>
                            </th>

                            <!-- จุดโทษ -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'free_kick_point' && sortDirection === 'asc'"
                                        @click="sortBy('free_kick_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'free_kick_point' && sortDirection === 'desc'"
                                        @click="sortBy('free_kick_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'free_kick_point'"
                                        @click="sortBy('free_kick_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        จุดโทษ
                                    </p>
                                </div>
                            </th>

                            <!-- ใบเหลือง/แดง -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'card_point' && sortDirection === 'asc'"
                                        @click="sortBy('card_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'card_point' && sortDirection === 'desc'"
                                        @click="sortBy('card_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'card_point'"
                                        @click="sortBy('card_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        ใบเหลือง/แดง
                                    </p>
                                </div>
                            </th>

                            <!-- ยิงประตูตัวเอง -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'self_goal_point' && sortDirection === 'asc'"
                                        @click="sortBy('self_goal_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'self_goal_point' && sortDirection === 'desc'"
                                        @click="sortBy('self_goal_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'self_goal_point'"
                                        @click="sortBy('self_goal_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        ยิงประตูตัวเอง
                                    </p>
                                </div>
                            </th>

                            <!-- เสียประตู -->
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <div class="flex items-center">
                                    <img src="/public/assets/arrowup.png"
                                        v-if="sortColumn === 'lose_goal_point' && sortDirection === 'asc'"
                                        @click="sortBy('lose_goal_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowdown.png"
                                        v-if="sortColumn === 'lose_goal_point' && sortDirection === 'desc'"
                                        @click="sortBy('lose_goal_point')" class="w-4 cursor-pointer">
                                    <img src="/public/assets/arrowup.png" v-if="sortColumn !== 'lose_goal_point'"
                                        @click="sortBy('lose_goal_point', 'asc')" class="w-4 cursor-pointer">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 ml-2">
                                        เสียประตู
                                    </p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="player in paginatedPlayers" :key="player">

                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <img :src="getShirtImage(player)" class="w-4 h-4" />

                            </td>
                            <td class="p-1 border-b border-blue-gray-50  ">
                                <p class="block antialiased text-xs leading-normal text-blue-gray-900  font-bold">
                                    {{ truncateText(player.name) }}</p>

                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold">
                                    {{ sumPoint(player) }} </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold"
                                    v-if="player.play_point > 2">
                                    3</p>
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold" v-else>
                                    0</p>

                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold"
                                    v-if="player.play_point > 2">
                                    {{ player.play_point - 3 }}</p>
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold" v-else>
                                    {{ player.play_point }}</p>

                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold">
                                    {{ player.goal_point }}</p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold">
                                    {{ player.assist_point }}</p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased font-sans text-xs leading-normal text-green-800 font-bold">
                                    {{ player.clean_sheet }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased font-sans text-xs leading-normal text-yellow-800 font-bold">
                                    {{ player.free_kick_point }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased font-sans text-xs leading-normal text-red-800 font-bold">
                                    {{ player.card_point }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased font-sans text-xs leading-normal text-red-800 font-bold">
                                    {{ player.self_goal_point }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased font-sans text-xs leading-normal text-red-800 font-bold">
                                    {{ player.lose_goal_point }}
                                </p>
                            </td>


                        </tr>
                    </tbody>
                </table>
            </div>
            <PaginationJavascript :page="currentPage" :pages="totalPages" @page-change="handlePageChange" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
export default {
    data() {
        return {
            selectedTeam: 'view',
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
            currentPage: 1,
            playersPerPage: 100,
            getGameWeekPlayer: null,

            gameWeekID: this.$route.params.id,
            seasonID: this.$route.params.seasonID,
            isNavigating: false,

            sortColumn: 'sum',
            sortDirection: 'desc',
            searchTerm: '',
            getTeams: []
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        sortBy(column, direction = 'asc') {
            if (this.sortColumn === column) {
                // Toggle the sorting direction if the same column is clicked again
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = direction;
            }

        },
        sumPoint(player) {
            return player.play_point + player.goal_point + player.assist_point + player.clean_sheet + player.free_kick_point + player.card_point + player.self_goal_point + player.lose_goal_point;
        },
        truncateText(text) {
            if (text.length > 13) {
                return text.slice(0, 13) + '...';
            } else {
                return text;
            }
        },
        getShirtImage(player) {
            const teamCode = this.stripTeamCode(player.team_code);
            const suffix = player.position === 'G' ? '_1-66' : '-66';
            return `https://pudee.sgp1.digitaloceanspaces.com/shirt_${teamCode}${suffix}.webp`;
        },
        stripTeamCode(teamCode) {
            return teamCode.replace('t', '');
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
        handlePageChange(page) {
            this.currentPage = page;
        },
        async facthPlayerListGameWeekPoint(page = 1, limit = 30) {

            try {
                const intSeasonID = parseInt(this.seasonID, 10);
                const intGameWeekID = parseInt(this.gameWeekID, 10);

                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        seasonID: intSeasonID,
                        gameWeekID: intGameWeekID
                    }
                });
                if (response.data.ok) {
                    this.getGameWeekPlayer = response.data.players;

                }
            } catch (error) {
                console.log(error);

            }

        },
        async fetchDataTeams() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/teams', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.getTeams = response.data.teams;
                    this.updateTeamOptions()
                } else {
                    console.error('Failed to fetch teams data');
                }
            } catch (error) {
                console.log(error);
            }
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

    },
    computed: {

        filteredPlayers() {
            if (!this.getGameWeekPlayer) return [];
            return this.getGameWeekPlayer.filter(player => {
                return (
                    (this.selectedTeam === 'view' || player.team_id === this.selectedTeam) &&
                    (this.is_check_player ? player.is_ban === false && player.is_injured === false : true) &&
                    (this.searchTerm === '' || player.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
                );
            }).sort((a, b) => {
                let modifier = this.sortDirection === 'asc' ? 1 : -1;
                if (this.sortColumn === 'name') {
                    return a.name.localeCompare(b.name) * modifier;
                } else if (this.sortColumn === 'sum') {
                    return (this.sumPoint(a) - this.sumPoint(b)) * modifier;
                } else if (this.sortColumn === 'mvp') {
                    return (a.play_point > 2 ? 3 : 0) * modifier;
                } else if (this.sortColumn === 'play_point') {
                    return (a.play_point - (a.play_point > 2 ? 3 : 0)) * modifier;
                } else if (this.sortColumn === 'goal_point') {
                    return (a.goal_point - b.goal_point) * modifier;
                } else if (this.sortColumn === 'assist_point') {
                    return (a.assist_point - b.assist_point) * modifier;
                } else if (this.sortColumn === 'clean_sheet') {
                    return (a.clean_sheet - b.clean_sheet) * modifier;
                } else if (this.sortColumn === 'free_kick_point') {
                    return (a.free_kick_point - b.free_kick_point) * modifier;
                } else if (this.sortColumn === 'card_point') {
                    return (a.card_point - b.card_point) * modifier;
                } else if (this.sortColumn === 'self_goal_point') {
                    return (a.self_goal_point - b.self_goal_point) * modifier;
                } else if (this.sortColumn === 'lose_goal_point') {
                    return (a.lose_goal_point - b.lose_goal_point) * modifier;
                }
            });

        },
        paginatedPlayers() {
            const start = (this.currentPage - 1) * this.playersPerPage;
            const end = start + this.playersPerPage;
            return this.filteredPlayers.slice(start, end);
        },
        totalPages() {
            if (!this.filteredPlayers) return 0;
            return Math.ceil(this.filteredPlayers.length / this.playersPerPage);
        },

    },
    async created() {
        await this.updateLoading(true);
        await this.facthPlayerListGameWeekPoint()
        await this.fetchDataTeams();
        await this.updateLoading(false);
    }
};
</script>

<style scoped>
.contant_style {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
}

.fixcontant {
    position: relative;
    background-color: white;
    padding-bottom: 1px;
    border-radius: 11px;
}

.card {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(to bottom, #1e1037, #432b6e);
    padding: 5px;
    overflow: hidden;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.card .top-section .icons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
}

.card .top-section .icons .logo {
    height: 100%;
    aspect-ratio: 1;
    padding: 7px 0 7px 15px;
}

.card .top-section .icons .logo .top-section {
    height: 100%;
}

.card .top-section .icons .social-media {
    height: 100%;
    padding: 8px 15px;
    display: flex;
    gap: 7px;
}

.card .top-section .icons .social-media .svg {
    height: 100%;
    fill: #1e1037;
}


.card .bottom-section {
    margin-top: 1px;
    padding: 10px 5px;
}

.card .bottom-section .titlesm {
    display: block;
    font-size: 10px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 1px;
}

.card .bottom-section .title {
    display: block;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 1px;
}

.card .bottom-section .row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.card .bottom-section .row .item {
    flex: 30%;
    text-align: center;
    padding: 5px;
    color: rgba(255, 255, 255, 0.721);
}

.card .bottom-section .row .item .big-text {
    font-size: 15px;
    display: block;
}

.card .bottom-section .row .item .regular-text {
    font-size: 12px;
}

.card .bottom-section .row .item:nth-child(2) {
    border-left: 1px solid rgba(255, 255, 255, 0.126);
    border-right: 1px solid rgba(255, 255, 255, 0.126);
}

.shsojvp {
    font-weight: bold;
}
</style>