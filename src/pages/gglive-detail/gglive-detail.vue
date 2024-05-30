<template>
    <div>
        detail
    </div>
</template>


<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            id: null,
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async fetchGameWeekDetail() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/game-week-player-user-detail/${this.id}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                if (response.data.ok) {
                    this.datas = response.data.data;
                    this.updateLoading(false);
                }
            } catch (error) {
                console.log(error);
                this.updateLoading(false);
            }
        },

    },
    created() {
        this.id = this.$route.params.id;
        this.updateLoading(true);
        this.fetchGameWeekDetail();
    },

};
</script>
