<template>
    <div>
        <FantasyTeam />
    </div>
</template>
<script>
import { api } from '@axios_inst';
import FantasyTeam from '../../components/fantasy/FantasyTeam.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            gameWeek: null,
            seasonID: null
        }
    },
    components: {
        FantasyTeam
    },
    methods: {
        ...mapActions('GameWeek', ['setGameWeek', 'setGameWeekPlayer']),
        ...mapActions('Teams', ['setTeams']),

        async fetchData(seasonID) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
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
    created() {
        this.seasonID = this.$route.params.seasonID;
        Promise.all([this.fetchData(this.seasonID), this.fetchDataTeams()])
            .then(() => {
                console.log('Both data fetching operations are completed');

            })
            .catch((error) => {
                console.log('Error in one of the data fetching operations:', error);
            });
    },

}
</script>


<style scoped>
.field {
    background-image: url('path-to-football-field-image.jpg');
    background-size: cover;
    background-position: center;
    height: 80vh;
}
</style>