<template>
  <div v-if="gameWeek" class="flex flex-col items-center px-3 mt-3">
    <!-- Confetti -->
    <div v-if="showConfetti" class="confetti pointer-events-none">
      <div v-for="n in 20" :key="n" class="confetti-piece"></div>
    </div>

    <!-- CARD -->
    <div
      class="relative w-full max-w-md bg-gradient-to-b from-[#2b0a3d] to-[#1a0b2d] text-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl transform transition-all duration-500 hover:scale-[1.02]">
      <!-- Top Section -->
      <div class="relative h-52 md:h-72 overflow-hidden cursor-pointer" @click="selectSeason">
        <img :src="webpSrc" alt="Banner" class="absolute inset-0 w-full h-full object-cover" />
        <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-[#2b0b55]/60 to-transparent"></div> -->

        <!-- WEEK label -->
        <div
          class="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
          WEEK {{ gameWeek.week_name || gameWeek.week }}
        </div>

        <!-- CTA Button -->
        <div class="absolute inset-x-0 bottom-5 flex justify-center">
          <button
            class="play-btn px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-extrabold rounded-full shadow-lg hover:shadow-cyan-300/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            @click.stop="selectSeason">
            เข้าเล่นตอนนี้
          </button>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="p-4 text-center">
        <button
          class="mt-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg font-semibold text-xs hover:bg-yellow-300 transition"
          @click="rewardDetail">
          🎁 รายละเอียดรางวัล
        </button>

        <!-- Stats Row -->
        <div class="grid grid-cols-3 mt-4 text-center divide-x divide-white/10">
          <div>
            <p class="text-1xl font-extrabold text-white drop-shadow-md">{{ allPlayer }}</p>
            <p class="text-xs text-gray-300">ผู้เข้าแข่งขัน</p>
          </div>
          <div>
            <p class="text-1xl font-extrabold text-indigo-200">{{ myTeam }}</p>
            <p class="text-xs text-gray-300">ทีมของคุณ</p>
          </div>
          <div>
            <p class="text-1xl font-extrabold text-green-400">
              <NumberDisplay :number="gameWeek.reward2" />
            </p>
            <p class="text-xs text-green-300">เงินรางวัลรวม</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Countdown Section -->
    <div class="flex flex-col items-center mt-4 text-center">
      <template v-if="gameWeek.start_date > currentTime">
        <span class="text-red-800 text-sm font-semibold">⏰ เริ่มจัดทีมได้ในอีก</span>
        <CountDown :datenow="currentTime" :endtime="gameWeek.start_date" @time-up="handleTimeUp"
          :classadj="'text-red-900 font-bold text-lg'" />
      </template>
      <template v-else>
        <span class="text-green-800 text-sm font-semibold">⏳ เหลือเวลาจัดทีมอีก</span>
        <CountDown :datenow="currentTime" :endtime="gameWeek.end_date" @time-up="handleTimeUp"
          :classadj="'text-green-900 font-bold text-lg'" />
      </template>
    </div>
  </div>

  <!-- No GameWeek -->
  <div v-else class="flex flex-col items-center justify-center text-gray-500 mt-8">
    <!-- <img :src="commingSoon" alt="Coming soon" class="rounded-xl shadow-lg w-64 opacity-90" /> -->
    <p class="text-sm mt-3">รอประกาศเกมวีคใหม่เร็ว ๆ นี้</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
  name: 'CardSeason',
  data() {
    return {
      showConfetti: true,
      gameWeek: null,
      allPlayer: 0,
      myTeam: 0,
      currentTime: null,
      is_time_up: false,
      webpSrc: 'https://pudee.sgp1.digitaloceanspaces.com/newpromo.jpeg',
      commingSoon: 'https://pudee.sgp1.digitaloceanspaces.com/commingsoon.webp',
    };
  },
  methods: {
    ...mapActions('loading', ['updateLoading']),
    ...mapActions('selectGameWeek', ['setGameWeek']),
    ...mapActions('season', ['fetchSeasons']),
    handleTimeUp() {
      this.is_time_up = true;
    },
    rewardDetail() {
      this.$router.push({ name: 'reward-detail', params: { id: this.gameWeek.id, type: 'N' } });
    },
    selectSeason() {
      if (this.is_time_up) {
        Swal.fire({
          title: 'เวลาจัดทีมหมดแล้ว',
          text: 'กรุณาเข้าร่วมการแข่งขันในครั้งถัดไป',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          customClass: { confirmButton: 'btn-confirm' },
          buttonsStyling: false,
        });
        return;
      }
      if (this.myTeam > 0) {
        Swal.fire({
          text: 'คุณได้สร้างทีมของสัปดาห์นี้แล้ว',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          showConfirmButton: false,
          customClass: { cancelButton: 'btn-cancel' },
          buttonsStyling: false,
        });
        return;
      }
      let seasonID = this.getSeasons.id;
      let gameWeekID = this.gameWeek.id;
      this.$router.push({ name: 'pitch-n', params: { seasonID, gameWeekID } });
    },
    async getGameWeek() {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await api.get('/premier-league/v1/game-week-n', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (response.data.ok) {
          this.gameWeek = response.data.gameWeek;
          this.allPlayer = response.data.allPlayer;
          this.myTeam = response.data.myTeam;
          this.currentTime = response.data.currentTime;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters('season', ['getSeasons']),
  },
  mounted() {
    setTimeout(() => (this.showConfetti = false), 5000);
  },
  created() {
    this.updateLoading(true);
    Promise.all([this.fetchSeasons(), this.getGameWeek()]).finally(() =>
      setTimeout(() => this.updateLoading(false), 50)
    );
  },
};
</script>

<style scoped>
.play-btn {
  animation: pulseGlow 2.5s infinite ease-in-out;
}

@keyframes pulseGlow {

  0%,
  100% {
    box-shadow: 0 0 0px rgba(0, 255, 255, 0.2);
  }

  50% {
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  }
}

.confetti-piece {
  position: absolute;
  width: 8px;
  height: 14px;
  border-radius: 2px;
  top: 0;
  opacity: 0;
  animation: fall 3s infinite ease-in-out;
}

.confetti-piece:nth-child(odd) {
  background-color: #4cd9ff;
}

.confetti-piece:nth-child(even) {
  background-color: #00ffbf;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  100% {
    transform: translateY(300px) rotate(360deg);
    opacity: 0;
  }
}
</style>
