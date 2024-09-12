<template>
    <div>
        <LodingSceen :loading="loading"/>
        <div class="rounded-xl shadow-lg min-h-screen bg-fixcolor-p tab-container p-4">
            <div class="flex flex-col items-center">
                <div class="overflow-x-auto w-full">
                    <table class="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                        <thead class="bg-colorhead text-gray-100">
                            <tr class="rounded-t-lg overflow-hidden border-b border-gray-200">
                                <th class="py-1 px-1 text-left text-xs border-gray-200">#</th>
                                <th class="py-1 px-1 text-left text-xs border-gray-200">TEAM</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">P</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">W</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">D</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">L</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">F</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">A</th>
                                <th class="py-1 px-1 text-center text-xs border-gray-200">GD</th>
                                <th class="py-1 px-1 text-center text-xs">PTS</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 text-gray-700">
                            <tr v-for="(team, index) in tablepoint" :key="team.ID">
                                <td class="py-1 px-1 text-xs border-gray-200 relative">
                                    {{ team.rank }}
                                    <span
                                          :class="['uu', {'light-blue': team.rank === 1 ||  team.rank === 2 ||  team.rank === 3 ||  team.rank === 4, 'light-red': team.rank === 18 || team.rank === 19 || team.rank === 20}]">
                                    </span>
                                </td>
                                <td class="py-1 px-1 text-xs border-gray-200">{{ team.name }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.played }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.wins }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.draws }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.losses }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.goalsFor }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.goalsAgainst }}</td>
                                <td class="py-1 px-1 text-center text-xs border-gray-200">{{ team.goalsDiff }}</td>
                                <td class="py-1 px-1 text-center text-xs">{{ team.points }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
export default {
    data() {
        return {
            loading: false,
            tablepoint: [],
        }
    },
    methods: {
        async fetchTablePoint(page = 1, limit = 10) {
            this.loading = true;
            let season_id = 719;
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/get-point-table/${season_id}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.tablepoint = response.data.data.sort((a, b) => a.rank - b.rank);
                    this.loading = false;
                }else{
                    this.loading = false;
                }
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
    },
    async mounted() {
        await this.fetchTablePoint();
    }
};
</script>

<style scoped>
.cus-bg-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #ca5141;
    transition: box-shadow 0.3s ease;
}

.bg-colorhead {
    background-color: #38003c;
}

.bg-color-accent {
    background-color: #fef5ff;
}

.bg-fixcolor-p {
    background-color: #f6f6f8;
}

.uu {
    display: table-cell;
    border-top-right-radius: 5px;
    height: 5px;
    width: 20px;
    margin-left: 5px;
}

.light-blue {
    background-color: #0075ff;
}

.light-oregen {
    background-color: #a75b28;
}

.light-red {
    background-color: #9f202d;
}
</style>
