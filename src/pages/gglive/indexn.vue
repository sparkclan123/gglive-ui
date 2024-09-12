<template>
    <div class="bg-color-1" >
        <FantasyTeamN />
    </div>
</template>
<script>
import { api } from '@axios_inst';
import FantasyTeamN from '../../components/fantasyN/FantasyTeam.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            gameWeek: null,
            seasonID: null,
            gameWeekID: null
        }
    },
    components: {
        FantasyTeamN
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('GameWeek', ['setGameWeek', 'setGameWeekPlayer', 'setGameWeekPlayerPercentN']),
        ...mapActions('Teams', ['setTeams']),

        async fetchData(seasonID, gameWeekID) {
            try {
                // แปลง seasonID และ gameWeekID เป็น integer
                const intSeasonID = parseInt(seasonID, 10);
                const intGameWeekID = parseInt(gameWeekID, 10);

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
                    this.setGameWeek(response.data.gameWeek);
                    this.setGameWeekPlayer(response.data.players);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async fetchDataPlayerPercent(seasonID, gameWeekID) {
            try {
                // แปลง seasonID และ gameWeekID เป็น integer
                const intSeasonID = parseInt(seasonID, 10);
                const intGameWeekID = parseInt(gameWeekID, 10);

                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player-percent-n', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        seasonID: intSeasonID,
                        gameWeekID: intGameWeekID
                    }
                });
                if (response.data.ok) {
                    this.setGameWeekPlayerPercentN(response.data.players);
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
                    this.setTeams(response.data.teams);
                } else {
                    console.error('Failed to fetch teams data');
                }
            } catch (error) {
                console.log(error);
            }
        },
    },

    computed: {
        ...mapGetters('season', ['getSeasons']),
        ...mapGetters('selectGameWeek', ['getGameWeek'])
    },
    async created() {
        this.updateLoading(true);

        this.seasonID = this.$route.params.seasonID;
        this.gameWeekID = this.$route.params.gameWeekID;
        try {
            await Promise.all([
                this.fetchData(this.seasonID, this.gameWeekID),
                this.fetchDataTeams(),
                this.fetchDataPlayerPercent(this.seasonID, this.gameWeekID),
            ]);
        } catch (error) {
            console.log('Error loading data:', error);
            setTimeout(() => {
                this.updateLoading(false);
            }, 50);
        } finally {
            setTimeout(() => {
                this.updateLoading(false);
            }, 50);
        }
    },

}
</script>


<style scoped>
.bg-color-1 {
    background-color: #ffffff;
    border-radius: 0.5rem;
}

.field {
    background-image: url('path-to-football-field-image.jpg');
    background-size: cover;
    background-position: center;
    height: 80vh;
}
</style>