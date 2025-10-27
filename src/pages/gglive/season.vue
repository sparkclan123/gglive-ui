<template>
    <!-- <div class="min-h-screen bg-cover bg-center text-white flex flex-col items-center"
        style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp');"> -->
    <div class="min-h-screen bg-cover bg-center text-white flex flex-col items-center"
        style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp');">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-[#2b0b55]/60 to-transparent pointer-events-none"></div>

        <!-- Header -->
        <div class="relative w-full max-w-md text-center pt-8 pb-3">
            <img src="https://pudee.sgp1.digitaloceanspaces.com/1.webp" alt="Pudee Logo"
                class="w-40 mx-auto drop-shadow-lg" />

            <button @click="SetactiveTab('tab4')"
                class="absolute top-3 right-3 bg-white/90 text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-white transition-all shadow-sm">
                🧾 กติกา
            </button>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center gap-2 w-full max-w-md mt-2 px-3">
            <div class="tab-item flex-1 text-center py-2 rounded-t-lg font-semibold cursor-pointer transition-all duration-200"
                :class="{
                    'bg-white text-gray-900 shadow-md': activeTab === 'tab1',
                    'bg-black/40 text-white hover:bg-black/60': activeTab !== 'tab1'
                }" @click="SetactiveTab('tab1')">
                เกมวีคปกติ
            </div>

            <div class="tab-item flex-1 text-center py-2 rounded-t-lg font-semibold cursor-pointer transition-all duration-200"
                :class="{
                    'bg-white text-gray-900 shadow-md': activeTab === 'tab2',
                    'bg-black/40 text-white hover:bg-black/60': activeTab !== 'tab2'
                }" @click="SetactiveTab('tab2')">
                เกมวีค VIP <i class="fas fa-ticket-alt text-yellow-400"></i>
            </div>
        </div>

        <!-- Content Card -->
        <div
            class="w-full max-w-md bg-white/95 text-gray-800 rounded-b-2xl rounded-t-lg shadow-xl backdrop-blur-sm p-4 mt-0">
            <transition name="fade" mode="out-in">
                <div :key="activeTab">
                    <div v-if="activeTab === 'tab1'">
                        <SeasonSelect />

                    </div>

                    <div v-else-if="activeTab === 'tab2'">
                        <SeasonSelectVip />

                    </div>

                    <div v-else-if="activeTab === 'tab3'">
                        <BigMatch />
                    </div>

                    <div v-else-if="activeTab === 'tab4'">
                        <Rule />
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import SeasonSelect from '../../components/season/SeasonSelect.vue'
import SeasonSelectVip from '../../components/season/SeasonSelectVip.vue'
import BigMatch from '../../components/season/BigmatchSelect.vue'
import Rule from '../../components/rule/rule.vue'

export default {
    name: 'Season',
    components: { SeasonSelect, SeasonSelectVip, BigMatch, Rule },
    data() {
        return {
            activeTab: 'tab1',
            activity: 'https://pudee.sgp1.digitaloceanspaces.com/activity.webp'
        }
    },
    methods: {
        clickactivity() {
            this.$router.push({ name: 'activity' })
        },
        SetactiveTab(tab) {
            this.activeTab = tab
            localStorage.setItem('season-select-tab', tab)
        },
        resetWebPs() {
            this.activity = ''
            this.$nextTick(() => {
                this.activity = `https://pudee.sgp1.digitaloceanspaces.com/activity.webp?${Date.now()}`
            })
        }
    },
    mounted() {
        this.resetWebPs()
        const savedTab = localStorage.getItem('season-select-tab')
        if (savedTab) this.activeTab = savedTab
    }
}
</script>

<style scoped>
.video-banner2 {
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 350px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
