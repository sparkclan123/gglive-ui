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
        async fetchData(seasonID) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.gameWeek = response.data;
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
        this.fetchData(this.seasonID);
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