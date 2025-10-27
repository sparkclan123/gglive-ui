<template>
  <div v-if="gameWeek" class="relative flex flex-col items-center mt-3 px-3">
    <!-- Confetti -->
    <div v-if="showConfetti" class="confetti pointer-events-none">
      <div v-for="n in 20" :key="n" class="confetti-piece"></div>
    </div>

    <!-- VIP CARD -->
    <div
      class="relative w-full max-w-md bg-gradient-to-b from-[#2b0a3d] to-[#1a0b2d] text-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl transform transition-all duration-500 hover:scale-[1.02]">
      <!-- Top Banner -->
      <div class="relative h-56 md:h-80 cursor-pointer group" @click="selectSeason">
        <img :src="webpSrcpromo" class="absolute inset-0 w-full h-full object-cover" alt="VIP Promo Banner" />

        <!-- Week Label -->
        <div
          class="absolute top-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
         
          WEEK <span class="text-yellow-300 ml-1">#{{ gameWeek.week_name || gameWeek.week }}</span>
        </div>

        <!-- Ticket Icon -->
        <div class="absolute top-3 right-4 text-yellow-300">
          <i class="fas fa-ticket-alt text-lg drop-shadow-md"></i>
        </div>

        <!-- CTA Button (เข้าเล่นตอนนี้) -->
        <div class="absolute inset-x-0 bottom-5 flex justify-center">
          <button
            class="play-btn px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 font-extrabold rounded-full shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            @click.stop="selectSeason">
            เข้าเล่นตอนนี้
          </button>
        </div>
      </div>

      <!-- Bottom Stats Section -->
      <div class="p-4 text-center">
        <!-- <h3 class="text-lg font-bold tracking-wide mb-1">
          ฤดูกาล {{ getSeasons.label }}
        </h3> -->

        <button
          class="mt-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg font-semibold text-xs hover:bg-yellow-300 transition"
          @click="rewardDetail">
          🎁 รายละเอียดรางวัล
        </button>

        <!-- Stats -->
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
              <NumberDisplay :number="gameWeek.reward" />
            </p>
            <p class="text-xs text-green-300">เงินรางวัลรวม</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Countdown -->
    <div class="flex flex-col items-center mt-3 text-center">
      <template v-if="gameWeek.start_date > currentTime">
        <span class="text-red-800 font-semibold text-sm">⏰ เริ่มจัดทีมได้ในอีก</span>
        <CountDown :datenow="currentTime" :endtime="gameWeek.start_date" @time-up="handleTimeUp"
          :classadj="'text-red-900 font-bold text-lg'" />
      </template>
      <template v-else>
        <span class="text-green-800 font-semibold text-sm">⏳ เหลือเวลาจัดทีมอีก</span>
        <CountDown :datenow="currentTime" :endtime="gameWeek.end_date" @time-up="handleTimeUp"
          :classadj="'text-green-900 font-bold text-lg'" />
      </template>
    </div>
  </div>

  <!-- Coming Soon -->
  <div v-else class="flex flex-col items-center justify-center mt-8 text-gray-500">
    <!-- <img :src="commingSoon" class="rounded-xl shadow-lg w-64 opacity-90" alt="Coming Soon" /> -->
    <p class="text-sm mt-3">🎯 เกม VIP รอบต่อไปกำลังจะมา!</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { api } from "@axios_inst";
import Swal from "sweetalert2";
export default {
  name: "CardSeasonVIP",
  data() {
    return {
      showConfetti: true,
      gameWeek: null,
      allPlayer: 0,
      myTeam: 0,
      currentTime: null,
      is_time_up: false,
      webpSrcpromo: "https://pudee.sgp1.digitaloceanspaces.com/newpromo.jpeg",
      commingSoon: "https://pudee.sgp1.digitaloceanspaces.com/commingsoon.webp",
    };
  },
  methods: {
    ...mapActions("loading", ["updateLoading"]),
    ...mapActions("season", ["fetchSeasons"]),
    ...mapActions("ticket", ["facthTicket"]),
    ...mapActions("selectGameWeek", ["setGameWeek"]),
    handleTimeUp() {
      this.is_time_up = true;
    },
    rewardDetail() {
      this.$router.push({
        name: "reward-detail",
        params: { id: this.gameWeek.id, type: "VIP" },
      });
    },
    selectSeason() {
      this.facthTicket();
      if (this.is_time_up) {
        Swal.fire({
          title: "หมดเวลาจัดทีม",
          text: "โปรดเข้าร่วมสัปดาห์ถัดไป",
          icon: "error",
          confirmButtonText: "ตกลง",
          customClass: { confirmButton: "btn-confirm" },
          buttonsStyling: false,
        });
        return;
      }
      if (this.getTicket === 0) {
        Swal.fire({
          title: "ไม่มีตั๋วเหลืออยู่ 🎫",
          text: "ไปสนับสนุนเราเพื่อรับตั๋วเพิ่มได้เลย!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ไปหน้าเติมเงิน",
          cancelButtonText: "ยกเลิก",
          customClass: {
            confirmButton: "btn-confirm",
            cancelButton: "btn-cancel",
          },
          buttonsStyling: false,
        }).then((res) => {
          if (res.isConfirmed) this.$router.push({ name: "payments" });
        });
        return;
      }
      this.$router.push({
        name: "pitch",
        params: { seasonID: this.getSeasons.id, gameWeekID: this.gameWeek.id },
      });
    },
    async getGameWeek() {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/premier-league/v1/game-week", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.ok) {
          this.gameWeek = res.data.gameWeek;
          this.allPlayer = res.data.allPlayer;
          this.myTeam = res.data.myTeam;
          this.currentTime = res.data.currentTime;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters("season", ["getSeasons"]),
    ...mapGetters("ticket", ["getTicket"]),
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
    box-shadow: 0 0 0px rgba(255, 215, 0, 0.2);
  }

  50% {
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
  }
}

/* Confetti Effect */
.confetti-piece {
  position: absolute;
  width: 8px;
  height: 14px;
  border-radius: 2px;
  top: 0;
  opacity: 0;
  animation: rain 3s infinite ease-in-out;
}

.confetti-piece:nth-child(odd) {
  background-color: #ffd93d;
}

.confetti-piece:nth-child(even) {
  background-color: #ff5e5e;
}

.confetti-piece:nth-child(3n) {
  background-color: #4cd964;
}

@keyframes rain {
  0% {
    transform: translateY(0) rotate(0);
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
