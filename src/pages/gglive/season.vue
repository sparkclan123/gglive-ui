<template>
    <div class="min-h-screen rounded-xl bg-cover bg-center text-white p-2"
        style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp');">
        <!-- Header -->
        <div class="p-4 text-center rounded-lg">
            <h1 class="text-2xl font-bold colot-h inline-block pb-1">
                <span class="text-gray-200">PuDee Challenge</span>
            </h1>
        </div>

        <!-- Tabs -->
        <div class="tabs rounded-t-lg flex">
            <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="SetactiveTab('tab1')">เกมวีคปกติ
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="SetactiveTab('tab2')">
                เกมวีค VIP <i class="fas fa-ticket-alt text-yellow-400"></i>
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="SetactiveTab('tab3')">กติกา</div>
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
                <SeasonSelectVip />
                <div class="mt-5 flex justify-center">
                    <img :src="activity" class="video-banner2" alt="Animated Banner" @click="clickactivity" />
                </div>


            </div>
            <div v-if="activeTab === 'tab3'">
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
import Rule from '../../components/rule/rule.vue';
import Swal from 'sweetalert2';
export default {
    name: 'Season',
    components: {
        SeasonSelect,
        SeasonSelectVip,
        Rule
    },
    data() {
        return {
            activeTab: 'tab1', // Default active tab
            activity: 'https://pudee.sgp1.digitaloceanspaces.com/activity2.webp'
        };
    },
    methods: {
        clickactivity() {
            Swal.fire({
                title: 'กิจกรรม',
                text: 'กิจกรรม จะเริ่มเร็วๆนี้ จะมีการประกาศล่วงหน้า',
                confirmButtonText: 'ตกลง',
                customClass: {
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });
            return;
        },
        SetactiveTab(tab) {
            this.activeTab = tab;
            localStorage.setItem('season-select-tab', tab);
        },
        resetWebPs() {
            this.activity = "";
            this.$nextTick(() => {
                this.activity = `https://pudee.sgp1.digitaloceanspaces.com/activity2.webp?${new Date().getTime()}`;
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
