<template>
  <div v-if="gameWeek" class="flex flex-col items-center px-3 mt-3">

    <div
      class="w-full max-w-2xl mb-5 overflow-hidden rounded-3xl bg-[#0f172a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">

      <div class="absolute inset-0 z-0">
        <img src="https://pudee.sgp1.digitaloceanspaces.com/pudeexkapu.webp"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Background" />
        <div class="absolute inset-0 bg-slate-900/90"></div>
      </div>

      <div class="relative p-7">
        <div class="flex items-center gap-5 mb-5">

          <!-- ✅ 1) เปลี่ยนจากโลโก้ใหญ่ -> เป็นรูป capture หน้าจอ -->
          <a href="https://kapu.club/" target="_blank"
            class="relative w-28 h-58 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/20">
            <!-- ใส่รูป capture ของจริงตรงนี้ -->
            <img src="/public/assets/screenkapu.webp" alt="App Screenshot" class="w-full h-full object-cover" />
            <!-- เงานิดๆให้ดูแพง -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </a>

          <div class="flex-1">
            <h6 class="text-xl font-black text-white leading-tight flex items-center gap-2 flex-wrap">

              <!-- ✅ 2) โลโก้เล็กๆ อยู่ด้านหน้า KAPU FANTASY -->
              <img src="/public/assets/icon.png" alt="KAPU Logo"
                class="w-6 h-6 rounded-md object-cover shadow border border-white/15" />

              <span style="color: #F54927;">KAPU </span> FANTASY

              <span class="bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded shadow-sm">
                แอฟน้อง <span style="color: #8427F5;">PuDee</span>!
              </span>
            </h6>

            <p class="text-[12px] text-gray-300 font-medium leading-relaxed mt-2">
              ร่วมสนุกฟรี! <span class="text-green-400 font-bold">รับรางวัลเงินสด</span> ทุกรายการแข่งขัน<br>
              <span class="text-yellow-400">**รางวัลเฉพาะ Gameweek ฟรีเท่านั้น**</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-3">
          <a href="https://apps.apple.com/th/app/kapu-fantasy/id6756671647" target="_blank"
            class="group relative flex items-center justify-center h-12 bg-black border border-white/10 rounded-xl hover:bg-zinc-900 transition-all active:scale-95 overflow-hidden">
            <img src="/public/assets/apple_download.svg" alt="App Store" class="h-7 relative z-10" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.kapu.fantasy" target="_blank"
            class="group relative flex items-center justify-center h-12 bg-black border border-white/10 rounded-xl hover:bg-zinc-900 transition-all active:scale-95 overflow-hidden">
            <img src="/public/assets/playstore_download.png" alt="Play Store" class="h-7 relative z-10" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
          </a>
        </div>

        <div
          class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent w-full opacity-50">
        </div>
      </div>
    </div>

    <div
      class="relative w-full max-w-md bg-gradient-to-b from-[#2b0a3d] to-[#1a0b2d] text-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl transform transition-all duration-500 hover:scale-[1.02]">
      <div class="relative h-52 md:h-72 overflow-hidden cursor-pointer" @click="selectSeason">
        <img :src="webpSrc" alt="Banner" class="absolute inset-0 w-full h-full object-cover" />
        <div
          class="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
          WEEK {{ gameWeek.week_name || gameWeek.week }}
        </div>

        <div class="absolute inset-x-0 bottom-5 flex justify-center">
          <button
            class="play-btn px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-extrabold rounded-full shadow-lg hover:shadow-cyan-300/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            @click.stop="selectSeason">
            เข้าเล่นตอนนี้
          </button>
        </div>
      </div>

      <div class="p-4 text-center">
        <button
          class="mt-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg font-semibold text-xs hover:bg-yellow-300 transition"
          @click="rewardDetail">
          🎁 รายละเอียดรางวัล
        </button>

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

  <div v-else class="flex flex-col items-center justify-center text-gray-500 mt-8">
    <div
      class="w-full max-w-md mb-5 overflow-hidden rounded-3xl bg-[#0f172a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">

      <div class="absolute inset-0 z-0">
        <img src="https://pudee.sgp1.digitaloceanspaces.com/pudeexkapu.webp"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Background" />
        <div class="absolute inset-0 bg-slate-900/90"></div>
      </div>
      <div class="relative p-5">
        <div class="flex items-center gap-4 mb-4">
          <a href="https://kapu.club/" target="_blank"
            class="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
            <img src="/public/assets/icon.png" alt="App Logo" class="w-full h-full object-cover scale-125" />
          </a>
          <div class="flex-1">
            <h6 class="text-lg font-black text-white leading-tight flex items-center gap-2">
              <span style="color: #8427F5;">PUDEE</span> X <span style="color: #F54927;">KAPU</span>
              <span class="bg-yellow-400 text-black text-[10px] px-1.5 py-0.5 rounded shadow-sm">FREE!</span>
            </h6>
            <p class="text-[11px] text-gray-300 font-medium leading-relaxed mt-1">
              ร่วมสนุกฟรี! <span class="text-green-400 font-bold">รับรางวัลเงินสด</span> ทุกรายการแข่งขัน<br>
              <span class="text-yellow-400 ">**รางวัลเฉพาะ Gameweek ฟรีเท่านั้น**</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-2">
          <a href="https://apps.apple.com/th/app/kapu-fantasy/id6756671647" target="_blank"
            class="group relative flex items-center justify-center h-12 bg-black border border-white/10 rounded-xl hover:bg-zinc-900 transition-all active:scale-95 overflow-hidden">
            <img src="/public/assets/apple_download.svg" alt="App Store" class="h-7 relative z-10" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.kapu.fantasy" target="_blank"
            class="group relative flex items-center justify-center h-12 bg-black border border-white/10 rounded-xl hover:bg-zinc-900 transition-all active:scale-95 overflow-hidden">
            <img src="/public/assets/playstore_download.png" alt="Play Store" class="h-7 relative z-10" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
          </a>
        </div>

        <div
          class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent w-full opacity-50">
        </div>
      </div>
    </div>
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
      kapuicon: '/public/assets/icon.png',
      webpSrc: 'https://pudee.sgp1.digitaloceanspaces.com/newpromo.jpeg',
      commingSoon: 'https://pudee.sgp1.digitaloceanspaces.com/commingsoon.webp',

      iosLink: 'https://apps.apple.com/th/app/kapu-fantasy/id6756671647',
      androidLink: 'https://play.google.com/store/apps/details?id=com.kapu.fantasy'
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
  animation: pulseGlow 2s infinite ease-in-out;
}

@keyframes pulseGlow {

  0%,
  100% {
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
    transform: scale(1);
  }

  50% {
    box-shadow: 0 0 25px rgba(34, 211, 238, 0.6);
    transform: scale(1.05);
  }
}

.download-btn {
  animation: bounce 3s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-5px);
  }

  60% {
    transform: translateY(-3px);
  }
}

/* เอฟเฟกต์แสงวิ่งผ่านปุ่ม */
.shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: none;
  animation: shine-anim 2s infinite;
}

@keyframes shine-anim {
  0% {
    left: -100%;
  }

  100% {
    left: 200%;
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