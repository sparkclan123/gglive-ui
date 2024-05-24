<template>
    <div class="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white p-2" v-if="getSeasons.label">
        <!-- Header -->
        <div class="p-4 text-center rounded-lg">
            <h1 class="text-2xl font-bold colot-h border-b-4 border-gray-800 inline-block pb-1">
                PuDee Challenge
            </h1>
        </div>


        <!-- Tabs -->
        <div class="tabs rounded-t-lg   flex">
            <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="activeTab = 'tab1'">เกมวีคปกติ</div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="activeTab = 'tab2'">เกมวีค VIP</div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="activeTab = 'tab3'">กติกา</div>
        </div>

        <!-- Content -->
        <div class="bg-white px-2 py-4 rounded-lg no-top-left-radius" >
            <!-- Card 1 -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                <div @click="selectSeason()" class="bg-color-h sha p-8 text-center bg-img cursor-pointer">
                    <h2 class="text-xl font-bold mb-2 text-gray-100">
                        Game Week ฤดูการ <span style="color: cornsilk">{{ getSeasons.label }}</span>
                    </h2>
                    <p style="color: lemonchiffon;">Fantasy Challenge is coming.</p>
                </div>
            </div>

            <!-- Tab Content -->
            <div v-if="activeTab === 'tab1'">
                <!-- Content for Tab 1 -->
                Content for Tab 1
            </div>
            <div v-if="activeTab === 'tab2'">
                <!-- Content for Tab 2 -->
                Content for Tab 2
            </div>
            <div v-if="activeTab === 'tab3'">
                <!-- Content for Tab 3 -->
                Content for Tab 3
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'FantasyChallenge',
    data() {
        return {
            activeTab: 'tab1' // Default active tab
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('season', ['fetchSeasons']),
        selectSeason() {
            let seasonID = 1;
            this.$router.push({ name: 'pitch' });
        },
        ruleSeasonChallenge() {
            // Implement your logic here
        },
        async getSeason() {
            try {
                await this.fetchSeasons();
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapGetters('season', ['getSeasons'])
    },
    created() {
        this.getSeason();
    }
};
</script>
<style scoped>
.bg-color-h {
    background-color: #532e71;
    position: relative;
    /* ต้องการสำหรับการแสดง SVG */
}

.colot-h {
    color: #1e1037;
}

.bg-img {
    flex: 1 1 0%;
    background-image: url('/public/assets/favicon-32x32.png'), url('/public/assets/bgChc.png');
    background-repeat: no-repeat, no-repeat;
    background-position: 5px 8px, right bottom;
    background-size: 35px 35px, 130px 75px; /* ปรับขนาดตามต้องการ */
}

.tabs {
    display: flex;
    font-size: 0.7rem;  
}

.tab-item {
    margin-right: 3px;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #37003c;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

}

.tab-item.active {
    background-color: white;
    color: rgb(0, 0, 0);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.no-top-left-radius {
    border-top-left-radius: 0;
}
</style>
