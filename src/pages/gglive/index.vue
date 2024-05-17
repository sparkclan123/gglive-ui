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
        ...mapActions('loading', ['updateLoading']),
    },
    computed: {
        ...mapGetters('loading', ['getLoading'])
    },
    mounted() {
        this.updateLoading(false)
    }
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