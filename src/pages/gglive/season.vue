<template>
    <div class="min-h-screen rounded-xl bg-cover bg-center text-white p-2"
        style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp');">
        <!-- Header -->
        <div class="p-1 text-center rounded-lg relative">
            <h1 class="text-2xl font-bold inline-block pb-1"
                style="margin-top: -30px;width: 240px;margin-bottom: -10px;">
                <img src="https://pudee.sgp1.digitaloceanspaces.com/1.webp" class="logo-img" />
            </h1>
            <div class="absolute top-1 right-0">
                <button @click="SetactiveTab('tab4')" class="bg-gray-400 text-gray-800 font-semibold text-xs p-1 rounded-lg">
                   กติกา
                </button>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs rounded-t-lg flex">
            <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="SetactiveTab('tab1')">เกมวีคปกติ
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="SetactiveTab('tab2')">
                เกมวีค VIP <i class="fas fa-ticket-alt text-yellow-400"></i>
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="SetactiveTab('tab3')">BigMatch
            </div>
        </div>

        <!-- Content -->
        <div class="bg-white px-2 py-4 rounded-lg no-top-left-radius">
            <!-- Card 1 -->

            <!-- Tab Content -->
            <div v-if="activeTab === 'tab1'">
                <SeasonSelect />
                <div class="mt-5 flex justify-center">
                    <img :src="activity" class="video-banner2" alt="Animated Banner" @click="clickactivity" />
                </div>


            </div>
            <div v-if="activeTab === 'tab2'">
                <!-- <span class="text-red-800" style="font-size: 12px;">**เงื่อนไข ต้องใช้ตั๋วที่ได้จากการซื้อโปรโมชั่นให้หมดภายใน week19</span> -->
                <SeasonSelectVip />
                <div class="mt-5 flex justify-center">
                    <img :src="activity" class="video-banner2" alt="Animated Banner" @click="clickactivity" />
                </div>
             
                <!-- newpromo -->
            </div>
            <div v-if="activeTab === 'tab3'">
                <!-- Content for Tab 3 -->
                <BigMatch />
            </div>
            <div v-if="activeTab === 'tab4'">
                <!-- Content for Tab 3 -->
                <Rule />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SeasonSelect from '../../components/season/SeasonSelect.vue';
import SeasonSelectVip from '../../components/season/SeasonSelectVip.vue';
import BigMatch from '../../components/season/BigmatchSelect.vue';
import Rule from '../../components/rule/rule.vue';
import Swal from 'sweetalert2';
export default {
    name: 'Season',
    components: {
        SeasonSelect,
        SeasonSelectVip,
        BigMatch,
        Rule
    },
    data() {
        return {
            activeTab: 'tab1', // Default active tab
            activity: 'https://pudee.sgp1.digitaloceanspaces.com/activity.webp'
        };
    },
    methods: {
        clickactivity() {
            this.$router.push({ name: 'activity' });
        },
        SetactiveTab(tab) {
            this.activeTab = tab;
            localStorage.setItem('season-select-tab', tab);
        },
        resetWebPs() {
            this.activity = "";
            this.$nextTick(() => {
                this.activity = `https://pudee.sgp1.digitaloceanspaces.com/activity.webp?${new Date().getTime()}`;
            });
        },
    },
    mounted() {
        this.resetWebPs();
    },
    created() {

        let has_result_tab = localStorage.getItem('season-select-tab');
        if (has_result_tab) {
            this.activeTab = has_result_tab;
        }
    }
};
</script>

<style scoped>
.video-banner2 {

    border-radius: 5px;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
    /* เพื่อให้ครอบคลุมทั้งพื้นที่ */
}

.colot-h {
    color: #1e1037;
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

.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}
</style>
