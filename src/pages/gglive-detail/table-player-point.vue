<template>
    <div class="contant_style">

        <div class="fixcontant">

            <div class="card">
  
                <div class="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-200"
                    @click="route_back">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-white text-sm font-semibold tracking-wide">กลับ</span>
                </div>


                <div class="text-center">
                    <h1 class="titlesm text-base sm:text-lg text-yellow-300 font-semibold drop-shadow">
                        รายละเอียดคะแนนนักเตะ
                    </h1>
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
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- ลงเล่น -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- ทำประตู -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- แอสซิส -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- Clean Sheet -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- จุดโทษ -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- ใบเหลือง/แดง -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- ยิงประตูตัวเอง -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->

                            <!-- เสียประตู -->
                            <!-- <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
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
                            </th> -->
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
                            <!-- <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold"
                                    v-if="player.play_point > 2">
                                    3</p>
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold" v-else>
                                    0</p>

                            </td> -->
                            <!-- <td class="p-1 border-b border-blue-gray-50  text-center">
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
                            </td> -->


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
    background-color: #f8fafc;
    border-radius: 1rem;
    padding: 0.5rem;
    min-height: 100vh;
    font-family: 'Sarabun', sans-serif;
}

.fixcontant {
    position: relative;
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* ─────────────── HEADER CARD ─────────────── */
.card {
    position: relative;
    background: linear-gradient(135deg, #3b0764 0%, #5b21b6 50%, #7c3aed 100%);
    color: white;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    padding-top: 48px;
}

/* ─────────────── BACK BUTTON ─────────────── */
.card .back-button {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    backdrop-filter: blur(8px);
    cursor: pointer;
    transition: all 0.25s ease-in-out;
}

.card .back-button:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
}

.card .back-button svg {
    color: #fde68a;
}

.card .back-button span {
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    letter-spacing: 0.5px;
}

/* ─────────────── HEADER TEXT ─────────────── */
.titlesm {
    display: block;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    color: #fde68a;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* ─────────────── SEARCH / SELECT ─────────────── */
input[type='text'],
select {
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    color: #374151;
    background-color: #f9fafb;
    transition: all 0.2s ease-in-out;
}

input[type='text']:focus,
select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* ─────────────── TABLE ─────────────── */
table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.8rem;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
}

th {
    background-color: #f3f4f6;
    text-align: left;
    padding: 0.5rem;
    font-weight: 600;
    color: #374151;
    white-space: nowrap;
}

td {
    padding: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    color: #374151;
}

tr:hover td {
    background-color: #f9fafb;
}

td p {
    font-size: 0.75rem;
}

/* ─────────────── PAGINATION ─────────────── */
.pagination {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}

.pagination button {
    background-color: white;
    border: 1px solid #e5e7eb;
    color: #374151;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    margin: 0 0.2rem;
    transition: all 0.2s ease-in-out;
}

.pagination button:hover {
    background-color: #f3f4f6;
    color: #111827;
}

/* ─────────────── RESPONSIVE ─────────────── */
@media (max-width: 768px) {
    .titlesm {
        font-size: 0.9rem;
    }

    th,
    td {
        padding: 0.4rem;
    }

    input[type='text'],
    select {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .titlesm {
        font-size: 0.8rem;
    }

    td p {
        font-size: 0.7rem;
    }
}
</style>