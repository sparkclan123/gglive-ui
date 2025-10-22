<template>
  <div class="p-4">
    <LodingSceen :loading="loading" />

    <!-- Header -->
    <div class="flex justify-center items-center space-x-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28" class="text-yellow-500">
        <path
          fill="currentColor"
          d="M100.083,173.827V0h311.834v24.443v149.384c0,85.755-70.162,155.918-155.917,155.918S100.083,259.582,100.083,173.827z"
        />
      </svg>
      <span class="font-semibold text-gray-700 text-base">รายละเอียดคะเเนนนักเตะ</span>
    </div>

    <!-- Gameweek List -->
    <div v-if="gameweekData.datas.length > 0" class="space-y-4">
      <div
        v-for="data in gameweekData.datas"
        :key="data.id"
        @click="seeDetailGameWeek(data)"
        class="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 cursor-pointer p-4 border border-gray-100"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  fill="currentColor"
                  d="M29.872,23.93c3.804-1.556,6.494-5.146,6.865-9.227C36.854,13.435,35.785,12.25,34.5,12.25h-1.036 c0.14-1.571-1.138-3-2.729-3H19.266c-1.587,0-2.871,1.426-2.729,3H13.5c-1.305,0-2.355,1.16-2.237,2.458 c0.371,4.08,3.06,7.67,6.865,9.227c0.811,1.004,1.872,1.792,3.081,2.276c-0.125,1.773-0.683,3.496-1.629,5.04H18 c-0.366,0-0.68,0.265-0.74,0.626c0,0-1,6-1,6C16.185,38.329,16.539,38.75,17,38.75h14c0.459,0,0.816-0.419,0.74-0.874l-1-6 c-0.061-0.361-0.374-0.626-0.74-0.626h-1.586c-0.964-1.529-1.525-3.25-1.637-5.034C27.992,25.733,29.058,24.943,29.873,23.935z"
                />
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-800">
                เกมวีค {{ data.week_name }}
              </div>
              <div class="text-xs text-gray-500 mt-1">รายละเอียดคะเเนนนักเตะของเกมวีคนี้</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pt-4">
        <Pagination :page="gameweekData.page" :pages="gameweekData.pages" @page-change="fetchGameWeeks" />
      </div>
    </div>

    <div v-else class="text-center text-gray-400 text-sm py-10">ไม่พบข้อมูลเกมวีค</div>
  </div>
</template>

<script>
import { api } from "@axios_inst";
export default {
  data() {
    return {
      loading: false,
      gameweekData: {
        datas: [],
        total: 0,
        page: 1,
        limit: 10,
        pages: 1,
      },
    };
  },
  methods: {
    seeDetailGameWeek(data) {
      this.$router.push({
        name: "player-detail-point-table",
        params: { id: data.id, seasonID: data.season_id },
      });
    },
    async fetchGameWeeks(page = 1, limit = 10) {
      this.loading = true;
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await api.get(`/premier-league/v1/game-week-all`, {
          headers: { Authorization: `Bearer ${access_token}` },
          params: { page, limit },
        });
        if (response.data.ok) {
          this.gameweekData = {
            datas: response.data.data,
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
            pages: response.data.pages,
          };
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchGameWeeks();
  },
};
</script>

<style scoped>
</style>
