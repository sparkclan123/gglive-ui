<template>
    <!-- Content for Tab 1 -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4" v-if="gameWeek">
        <div @click="selectSeason()" class="bg-color-h sha p-4 text-center bg-img cursor-pointer">
            <h2 class="text-xl font-bold mb-2 text-gray-100">
                Game Week #{{ gameWeek.week }}<br>ฤดูการ <span style="color: cornsilk" class="border-b-2 border-gray-200 inline-block ">{{
            getSeasons.label }}</span>
            </h2>
            <p style="color: lemonchiffon;">Fantasy Challenge is coming.</p>
        </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
export default {
    name: 'CardSeason',
    data() {
        return {
            gameWeek: null
        };
    },
    methods: {
        ...mapActions('selectGameWeek', ['setGameWeek']),
        selectSeason() {
            let seasonID = this.getSeasons.id;
            this.$router.push({ name: 'pitch', params: { seasonID } })
        },
        ruleSeasonChallenge() {
            // Implement your logic here
        },
        async getGameWeek() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.gameWeek = response.data.gameWeek;
                }
            } catch (error) {
                console.log(error);
            }
        }

    },
    computed: {
        ...mapGetters('season', ['getSeasons'])
    },
    created() {
        this.getGameWeek();
    }

};
</script>

<style scoped>
.bg-color-h {
    background-color: #532e71;
    position: relative;
    /* ต้องการสำหรับการแสดง SVG */
}

.bg-img {
    flex: 1 1 0%;
    background-image: url('/public/assets/favicon-32x32.png'), url('/public/assets/bgChc.png');
    background-repeat: no-repeat, no-repeat;
    background-position: 5px 8px, right bottom;
    background-size: 35px 35px, 130px 75px;
    /* ปรับขนาดตามต้องการ */
}
</style>