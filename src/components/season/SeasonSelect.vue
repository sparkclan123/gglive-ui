<template>
    <!-- Content for Tab 1 -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        <div @click="selectSeason()" class="bg-color-h sha p-4 text-center bg-img cursor-pointer">
            <h2 class="text-xl font-bold mb-2 text-gray-100">
                Game Week #1<br>ฤดูการ <span style="color: cornsilk" class="border-b-2 border-gray-200 inline-block ">{{
            getSeasons.label }}</span>
            </h2>
            <p style="color: lemonchiffon;">Fantasy Challenge is coming.</p>
        </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CardSeason',
    data() {
        return {

        };
    },
    methods: {
        selectSeason() {
            let seasonID = 1;
            this.$router.push({ name: 'pitch' });
        },
        ruleSeasonChallenge() {
            // Implement your logic here
        },

    },
    computed: {
        ...mapGetters('season', ['getSeasons'])
    },

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