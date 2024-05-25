<template>
    <div>
        <FantasyTeam />
    </div>
</template>

<script>
import FantasyTeam from '../../components/fantasy/FantasyTeam.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        FantasyTeam
    },
    methods: {


    },
    computed: {
        ...mapGetters('season', ['getSeasons']),
        ...mapGetters('selectGameWeek', ['getGameWeek'])
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