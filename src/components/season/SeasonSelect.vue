<template>
  <!-- Content for Tab 1 -->
  <!-- <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4" v-if="gameWeek">
        <div @click="selectSeason()" class="bg-color-h sha p-4 text-center bg-img cursor-pointer">
            <h2 class="text-xl font-bold mb-2 text-gray-100">
                Game Week #{{ gameWeek.week }}<br>ฤดูการ <span style="color: cornsilk" class="border-b-2 border-gray-200 inline-block ">{{
            getSeasons.label }}</span>
            </h2>
            <p style="color: lemonchiffon;">Fantasy Challenge is coming.</p>
        </div>
        
    </div> -->
  <div v-if="gameWeek">
    <div class="confetti" v-if="showConfetti">
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
    </div>

    <div class="card cursor-pointer">
      <div class="top-section  bg-img" @click="selectSeason()">
        <div class="icons">
          <div class="logo shsojvp">
            WEEK{{ gameWeek.week }}
          </div>
          <div class="social-media">
            <i class="fas fa-ticket-alt text-gray-400"></i>
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <span class="title">season {{ getSeasons.label }}</span>
        <div class="row row1">
          <div class="item">
            <span class="big-text">{{ allPlayer }}</span>
            <span class="regular-text">เข้าเเข่งขันทั้งหมด</span>
          </div>
          <div class="item">
            <span class="big-text">{{ myTeam }} <span class="regular-text">(ทีม)</span></span>
            <span class="regular-text">ทีมของคุณ</span>
          </div>
          <div class="item">
            <span class="big-text text-green-500">
              <NumberDisplay :number="gameWeek.reward" />
            </span>
            <span class="regular-text text-green-500">เงินรางลังสูงสุด</span>
          </div>
        </div>
      </div>
    </div>
    <CountDown :datenow="currentTime" :endtime="gameWeek.end_date" />
  </div>
  <div v-else class="group duration-500  ">
    <div
      class=" relative rounded-2xl  h-36   bg-gradient-to-r from-zinc-900 to-zinc-700  text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-neutral-700 before:right-3 before:top-0 before:w-72 before:h-32 before:-z-10">
      <span class="text-3xl font-bold">Comming Soon</span>
      <p class="text-amber-300 font-thin">- new game week -</p>
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
      showConfetti: true,
      gameWeek: null,
      allPlayer: 0,
      myTeam: 0,
      currentTime: null
    };
  },
  methods: {
    ...mapActions('loading', ['updateLoading']),
    ...mapActions('selectGameWeek', ['setGameWeek']),
    ...mapActions('season', ['fetchSeasons']),
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
          this.allPlayer = response.data.allPlayer;
          this.myTeam = response.data.myTeam;
          this.currentTime = response.data.currentTime;
        }
      } catch (error) {
        console.log(error);
      }
    }

  },
  computed: {
    ...mapGetters('season', ['getSeasons'])
  },
  mounted() {
    setTimeout(() => {
      this.showConfetti = false;
    }, 5000);
  },
  created() {
    this.updateLoading(true);
    Promise.all([this.fetchSeasons(), this.getGameWeek()])
      .then(() => {
        setTimeout(() => {
          this.updateLoading(false);
        }, 50);
      })
      .catch((error) => {
        setTimeout(() => {
          this.updateLoading(false);
        }, 50);
      });
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

.card {

  border-radius: 20px;
  background: #1e1037;
  padding: 5px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.card .top-section {
  height: 120px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, #5f2eb3 0%, #271447 100%);
  position: relative;
  overflow: hidden;
}

.card .top-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 160px;
  height: 90px;
  background: url('/public/assets/bgChc.png') no-repeat;
  background-size: contain;
}

.card .top-section .border {
  border-bottom-right-radius: 10px;
  height: 30px;
  width: 130px;
  background: white;
  background: #1e1037;
  position: relative;
  transform: skew(-40deg);
  box-shadow: -10px -10px 0 0 #1e1037;
}



.card .top-section .icons {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.card .top-section .icons .logo {
  height: 100%;
  aspect-ratio: 1;
  padding: 7px 0 7px 15px;
}

.card .top-section .icons .logo .top-section {
  height: 100%;
}

.card .top-section .icons .social-media {
  height: 100%;
  padding: 8px 15px;
  display: flex;
  gap: 7px;
}

.card .top-section .icons .social-media .svg {
  height: 100%;
  fill: #1e1037;
}


.card .bottom-section {
  margin-top: 1px;
  padding: 10px 5px;
}

.card .bottom-section .title {
  display: block;
  font-size: 17px;
  font-weight: bolder;
  color: white;
  text-align: center;
  letter-spacing: 2px;
}

.card .bottom-section .row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.card .bottom-section .row .item {
  flex: 30%;
  text-align: center;
  padding: 5px;
  color: rgba(170, 222, 243, 0.721);
}

.card .bottom-section .row .item .big-text {
  font-size: 12px;
  display: block;
}

.card .bottom-section .row .item .regular-text {
  font-size: 9px;
}

.card .bottom-section .row .item:nth-child(2) {
  border-left: 1px solid rgba(255, 255, 255, 0.126);
  border-right: 1px solid rgba(255, 255, 255, 0.126);
}

.shsojvp {
  font-weight: bold;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 20px;
  background-color: hsl(39, 100%, 56%);
  top: 0;
  opacity: 0;
  animation: makeItRain 3000ms infinite ease-in-out;
}

.confetti-piece:nth-child(1) {
  left: 7%;
  transform: rotate(-10deg);
  animation-delay: 182ms;
  animation-duration: 2000ms;
}

.confetti-piece:nth-child(2) {
  left: 14%;
  transform: rotate(20deg);
  animation-delay: 161ms;
  animation-duration: 2076ms;
}

.confetti-piece:nth-child(3) {
  left: 21%;
  transform: rotate(-51deg);
  animation-delay: 481ms;
  animation-duration: 2103ms;
}

.confetti-piece:nth-child(4) {
  left: 28%;
  transform: rotate(61deg);
  animation-delay: 334ms;
  animation-duration: 1008ms;
}

.confetti-piece:nth-child(5) {
  left: 35%;
  transform: rotate(-52deg);
  animation-delay: 302ms;
  animation-duration: 1776ms;
}

.confetti-piece:nth-child(6) {
  left: 42%;
  transform: rotate(38deg);
  animation-delay: 180ms;
  animation-duration: 1168ms;
}

.confetti-piece:nth-child(7) {
  left: 49%;
  transform: rotate(11deg);
  animation-delay: 395ms;
  animation-duration: 1200ms;
}

.confetti-piece:nth-child(8) {
  left: 56%;
  transform: rotate(49deg);
  animation-delay: 14ms;
  animation-duration: 1887ms;
}

.confetti-piece:nth-child(9) {
  left: 63%;
  transform: rotate(-72deg);
  animation-delay: 149ms;
  animation-duration: 1805ms;
}

.confetti-piece:nth-child(10) {
  left: 70%;
  transform: rotate(10deg);
  animation-delay: 351ms;
  animation-duration: 2059ms;
}

.confetti-piece:nth-child(11) {
  left: 77%;
  transform: rotate(4deg);
  animation-delay: 307ms;
  animation-duration: 1132ms;
}

.confetti-piece:nth-child(12) {
  left: 84%;
  transform: rotate(42deg);
  animation-delay: 464ms;
  animation-duration: 1776ms;
}

.confetti-piece:nth-child(13) {
  left: 91%;
  transform: rotate(-72deg);
  animation-delay: 429ms;
  animation-duration: 1818ms;
}

.confetti-piece:nth-child(14) {
  left: 94%;
  transform: rotate(-72deg);
  animation-delay: 429ms;
  animation-duration: 818ms;
}

.confetti-piece:nth-child(15) {
  left: 96%;
  transform: rotate(-72deg);
  animation-delay: 429ms;
  animation-duration: 2818ms;
}

.confetti-piece:nth-child(16) {
  left: 98%;
  transform: rotate(-72deg);
  animation-delay: 429ms;
  animation-duration: 2818ms;
}

.confetti-piece:nth-child(17) {
  left: 50%;
  transform: rotate(-72deg);
  animation-delay: 429ms;
  animation-duration: 2818ms;
}

.confetti-piece:nth-child(18) {
  left: 60%;
  transform: rotate(-72deg);
  animation-delay: 429ms;
  animation-duration: 1818ms;
}

.confetti-piece:nth-child(odd) {
  background-color: hsl(0, 100%, 67%);
}

.confetti-piece:nth-child(even) {
  z-index: 1;
}

.confetti-piece:nth-child(4n) {
  width: 6px;
  height: 14px;
  animation-duration: 4000ms;
  background-color: #c33764;
}

.confetti-piece:nth-child(5n) {
  width: 3px;
  height: 10px;
  animation-duration: 4000ms;
  background-color: #b06ab3;
}

.confetti-piece:nth-child(3n) {
  width: 4px;
  height: 12px;
  animation-duration: 2500ms;
  animation-delay: 3000ms;
  background-color: #dd2476;
}

.confetti-piece:nth-child(3n-7) {
  background-color: hsl(166, 100%, 37%);
}

@keyframes makeItRain {
  from {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  to {
    transform: translateY(200px);
  }
}
</style>