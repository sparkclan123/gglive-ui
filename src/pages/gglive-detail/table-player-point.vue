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
                <table class="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                                <div class="flex items-center">

                                </div>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    ชื่อนักเตะ</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    รวม</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    MVP</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    ลงเล่น</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    ทำประตู</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    แอสซิส</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    Clean Sheet</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    จุดโทษ</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    ใบเหลือง/เเดง</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    ยิงประตูตัวเอง</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    เสียประตู</p>
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
                                    {{ sumPoint(player)    }} </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold"
                                    v-if="player.play_point > 2">
                                    3</p>
                                <p class="block antialiased text-xs leading-normal text-green-800  font-bold"
                                    v-else>
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
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-green-800 font-bold">
                                    {{ player.clean_sheet }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-yellow-800 font-bold">
                                    {{ player.free_kick_point }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-red-800 font-bold">
                                    {{ player.card_point }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-red-800 font-bold">
                                    {{ player.self_goal_point }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50  text-center">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-red-800 font-bold">
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
            currentPage: 1,
            playersPerPage: 100,
            getGameWeekPlayer: null,

            gameWeekID: this.$route.params.id,
            seasonID: this.$route.params.seasonID,
            isNavigating: false
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
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
            return `/assets/shirt/shirt_${teamCode}${suffix}.webp`;
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
                    this.updateLoading(false);
                }
            } catch (error) {
                console.log(error);
                this.updateLoading(false);
            }

        },

    },
    computed: {
        filteredPlayers() {
            return this.getGameWeekPlayer
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
    created() {
        this.updateLoading(true);
        this.facthPlayerListGameWeekPoint()
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