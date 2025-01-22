<template>

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
    <div class="card ">
     
      <!-- <div class="top-section  bg-img cursor-pointer" @click="selectSeason()"> -->
      <div class="top-section cursor-pointer" @click="selectSeason()">
        <!-- <img :src="webpSrc" class="video-banner" alt="Animated Banner" /> -->
        <img :src="webpSrcpromo" class="video-banner" alt="Animated Banner" />

        <div class="icons">
          <div class="logo shsojvp text-yellow-50" style="display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" style="margin-left: -8px;" viewBox="0 0 512 512"
              width="20" height="20" id="star">
              <polygon fill="#ffd759"
                points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4">
              </polygon>
              <polygon fill="#fabd3b" points="256 256 6 200.5 137 320.1"></polygon>
              <polygon fill="#fabd3b" points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"></polygon>
              <polygon fill="#fabd3b" points="256 256 506 198.6 375.9 319.2"></polygon>
              <polygon fill="#fabd3b" points="255.3 17.9 256 256 329.7 178.9"></polygon>
            </svg>
            WEEK
            <span class="text-yellow-400">
              #{{ gameWeek.week }}</span>
          </div>
          <div class="social-media">
            <i class="fas fa-ticket-alt text-yellow-400"></i>
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <span class="title">season {{ getSeasons.label }}</span>
        <button class="titlebtn bg-yellow-400  px-3 py-1 rounded text-xs" style="color: black;"
          @click="rewardDetail">Reward Detail</button>
        <div class="row row1">
          <div class="item">
            <span class="big-text">{{ allPlayer }}</span>
            <span class="regular-text">all team</span>
          </div>
          <div class="item">
            <span class="big-text">{{ myTeam }} <span class="regular-text">(team)</span></span>
            <span class="regular-text">you team</span>
          </div>
          <div class="item">
            <span class="big-text2 text-green-500">
              <NumberDisplay :number=" gameWeek.reward + (gameWeek.reward * 0.1) + (gameWeek.reward * 0.05) + 200" />
            </span>
            <span class="regular-text2 text-green-500">Total Reward</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center mt-1">
      <div v-if="gameWeek.start_date > currentTime" class="flex flex-col items-center">
        <span class="text-red-900 text-md text-shadow-md">You can start creating your team in...</span>
        <CountDown :datenow="currentTime" :endtime="gameWeek.start_date" @time-up="handleTimeUp"
          :classadj="'text-red-900'" />
      </div>
      <div v-else class="flex flex-col items-center">
        <span class="text-green-900 text-shadow-md text-md">Team setup closes in</span>
        <CountDown :datenow="currentTime" :endtime="gameWeek.end_date" @time-up="handleTimeUp"
          :classadj="'text-green-900'" />
      </div>
    </div>

  </div>
  <div v-else class="group duration-500  ">
    <!-- <div class="flex justify-center">
      <img :src="commingSoon" class="video-banner2" alt="Animated Banner" />
    </div> -->
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
      videoPlaying: true,
      showConfetti: true,
      gameWeek: null,
      allPlayer: 0,
      myTeam: 0,
      currentTime: null,
      is_time_up: false,   
      webpSrcpromo: "https://pudee.sgp1.digitaloceanspaces.com/newpromo.jpeg",
      // webpSrc: "https://pudee.sgp1.digitaloceanspaces.com/banner_select.webp",
      commingSoon: "https://pudee.sgp1.digitaloceanspaces.com/commingsoon.webp"
    };
  },
  methods: {
    ...mapActions('loading', ['updateLoading']),
    ...mapActions('selectGameWeek', ['setGameWeek']),
    ...mapActions('season', ['fetchSeasons']),
    ...mapActions('ticket', ['facthTicket']),
    resetWebP() {
      this.webpSrc = "";
      this.$nextTick(() => {
        this.webpSrc = `https://pudee.sgp1.digitaloceanspaces.com/banner_select.webp?${new Date().getTime()}`;
      });
    },
    resetWebPs() {
      this.commingSoon = "";
      this.$nextTick(() => {
        this.commingSoon = `https://pudee.sgp1.digitaloceanspaces.com/commingsoon.webp?${new Date().getTime()}`;
      });
    },
    handleVideoEnd() {
      this.videoPlaying = false;
    },
    handleTimeUp() {
      this.is_time_up = true;
    },
    rewardDetail() {
      this.$router.push({ name: 'reward-detail', params: { id: this.gameWeek.id, type: "VIP" } });
    },
    selectSeason() {
      this.facthTicket();
      if (this.is_time_up) {
        Swal.fire({
          title: 'The team setup time has ended.',
          text: 'Please join the next competition.',
          icon: 'error',
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
      }
     
      if (this.getTicket == 0) {
        Swal.fire({
          title: 'ไม่มีตั๋วเหลืออยู่',
          html: `
                <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
                  <svg viewBox="0 0 256 256" width="68" height="68"
                        id="ticket">
                        <linearGradient id="a" x1="127.999" x2="127.999" y1="21.35" y2="238.728"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#f9aa2d"></stop>
                            <stop offset="1" stop-color="#e09115"></stop>
                        </linearGradient>
                        <path fill="url(#a)"
                            d="m253.866 94.906-15.84-20.814c-9.74 3.675-21.12.735-27.75-7.97-6.62-8.71-6.42-20.46-.28-28.865l-16.539-21.735c-3.5-4.6-10.13-5.505-14.73-2l-23.919 18.2c.3.165.569.385.79.67a2.48 2.48 0 0 1-.48 3.475c-1.09.83-2.64.62-3.47-.47-.22-.29-.36-.61-.43-.94L4.134 146.36c-4.6 3.5-5.5 10.13-2 14.73l16.535 21.739c9.74-3.68 21.12-.74 27.745 7.96 6.625 8.71 6.425 20.47.28 28.87l15.84 20.819c3.505 4.6 10.135 5.5 14.735 2l147.148-111.959a2.487 2.487 0 0 1-.97-.75 2.488 2.488 0 0 1 .47-3.475 2.483 2.483 0 0 1 3.48.47c.26.345.41.735.47 1.135l24-18.26c4.599-3.498 5.499-10.128 1.999-14.733zm-93.638-52.329a2.487 2.487 0 0 1-3.48-.475 2.485 2.485 0 0 1 .48-3.47c1.08-.83 2.64-.62 3.47.47a2.48 2.48 0 0 1-.47 3.475zm5.099 6.705a2.479 2.479 0 0 1-3-3.945 2.487 2.487 0 0 1 3.48.475c.83 1.09.61 2.645-.48 3.47zm5.111 6.71c-1.091.83-2.65.62-3.48-.47s-.62-2.645.47-3.475a2.49 2.49 0 0 1 3.48.47 2.49 2.49 0 0 1-.47 3.475zm5.099 6.71c-1.09.83-2.65.62-3.47-.475a2.473 2.473 0 0 1 .47-3.47 2.479 2.479 0 0 1 3 3.945zm5.109 6.71a2.488 2.488 0 0 1-3.479-.475 2.472 2.472 0 0 1 .48-3.475 2.48 2.48 0 0 1 2.999 3.95zm5.591 7.35c-1.091.83-2.65.62-3.48-.47a2.49 2.49 0 0 1 .48-3.475 2.47 2.47 0 0 1 3.47.475c.83 1.085.62 2.64-.47 3.47zm5.1 6.71a2.477 2.477 0 1 1-3-3.945 2.484 2.484 0 0 1 3.479.47 2.48 2.48 0 0 1-.479 3.475zm5.109 6.71a2.477 2.477 0 0 1-3.47-.475 2.479 2.479 0 0 1 .47-3.475 2.48 2.48 0 0 1 3 3.95zm5.101 6.704a2.479 2.479 0 0 1-3-3.945 2.474 2.474 0 0 1 3.47.475 2.473 2.473 0 0 1-.47 3.47zm5.109 6.71a2.488 2.488 0 0 1-3.479-.47c-.83-1.09-.62-2.65.479-3.475a2.475 2.475 0 0 1 3.471.47 2.488 2.488 0 0 1-.471 3.475zm5.101 6.705c-1.09.83-2.65.62-3.471-.47a2.474 2.474 0 0 1 .471-3.47c1.09-.83 2.64-.62 3.47.47.83 1.09.62 2.645-.47 3.47zm4.96 6.525a2.47 2.47 0 0 1-3.471-.475 2.472 2.472 0 0 1 .471-3.47c1.09-.83 2.64-.62 3.479.47a2.488 2.488 0 0 1-.479 3.475zm5.109 6.705c-1.1.83-2.649.62-3.479-.47a2.477 2.477 0 1 1 3.94-3 2.472 2.472 0 0 1-.461 3.47z">
                        </path>
                        <path fill="#2C2C2C"
                            d="M46.414 186.46c-6.625-8.71-18.005-11.64-27.745-7.97L2.134 156.761c-.97-1.28-1.59-2.71-1.9-4.19-.605 2.88-.015 6 1.9 8.521l16.535 21.739c9.74-3.68 21.12-.74 27.745 7.96 2.85 3.75 4.43 8.06 4.825 12.42a24.05 24.05 0 0 0-4.825-16.751zm177.032-56.689a2.474 2.474 0 0 1-.19-2.694L77.268 238.149c-4.6 3.5-11.23 2.6-14.735-2l-14.34-18.85c-.455.81-.945 1.6-1.5 2.36l15.84 20.819c3.505 4.6 10.135 5.5 14.735 2l147.148-111.959a2.482 2.482 0 0 1-.97-.748zm.8-3.68c1.061-.57 2.4-.31 3.15.675.26.345.41.735.47 1.135l24-18.26c3.319-2.53 4.699-6.69 3.899-10.54a10.49 10.49 0 0 1-3.899 6.21l-24 18.254-3.62 2.526z"
                            opacity=".2"></path>
                        <linearGradient id="b" x1="47.336" x2="194.75" y1="136.906" y2="136.906"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#fee587"></stop>
                            <stop offset="1" stop-color="#f2d972"></stop>
                        </linearGradient>
                        <path fill="url(#b)"
                            d="M193.687 118.396c1.75 2.3 1.29 5.615-1.01 7.365L91.198 202.979a5.27 5.27 0 0 1-7.37-1.01L48.404 155.42c-1.75-2.311-1.3-5.62 1-7.37l101.494-77.214c2.29-1.755 5.609-1.3 7.359 1l35.43 46.56z">
                        </path><text fill="#2C330D" font-family="'ArialRoundedMTBold'" font-size="34.732"
                            transform="matrix(.8163 -.6453 .6202 .7845 87.393 181.58)">PuDee</text>
                    </svg>
                    <p style="margin-top: 10px;">คุณไม่มีตั๋วในการjoinการแข่งขัน</p>
                </div>
            `,
          showCancelButton: true,
          cancelButtonText: 'cancel',
          confirmButtonText: 'ไปสนับสนุนเรา',
          customClass: {
            confirmButton: 'btn-confirm',
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'payments' });
          }
        });
        return;
      }
      let seasonID = this.getSeasons.id;
      let gameWeekID = this.gameWeek.id;
      this.$router.push({ name: 'pitch', params: { seasonID, gameWeekID } })
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
    ...mapGetters('season', ['getSeasons']),
    ...mapGetters('ticket', ['getTicket']),
  },
  mounted() {
    this.resetWebP();
    // this.resetWebPs();
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
  background-image: url('/public/assets/logonew32x32.png'), url('/public/assets/bgChc.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 5px 8px, right bottom;
  background-size: 35px 35px, 130px 75px;
  /* ปรับขนาดตามต้องการ */
}

.card {

  border-radius: 20px;
  background: #191919;
  /* background: #191919; */
  padding: 5px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.card .top-section {
  height: 250px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, #0a3844 0%, #123938 100%);
  position: relative;
  overflow: hidden;
}

.video-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  /* เพื่อให้ครอบคลุมทั้งพื้นที่ */
}

@media (min-width: 410px) {
  .card .top-section {
    height: 250px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(45deg, #0a3844 0%, #123938 100%);
    position: relative;
    overflow: hidden;
  }

}

@media (min-width: 768px) {
  .card .top-section {
    height: 320px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(45deg, #0a3844 0%, #123938 100%);
    position: relative;
    overflow: hidden;
  }


}

.video-banner2 {
  border-radius: 5px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
}

.card .top-section .border {
  border-bottom-right-radius: 10px;
  height: 30px;
  width: 130px;
  background: white;
  background: #191919;
  position: relative;
  transform: skew(-40deg);
  box-shadow: -10px -10px 0 0 #191919;
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
  width: 200px;
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
  fill: #191919;
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

.card .bottom-section .titlebtn {
  display: block;
  color: white;
  text-align: center;
  letter-spacing: 1px;
  margin: 10px auto;
  /* add margin เพื่อให้อยู่ตรงกลาง */
  width: fit-content;
  /* ปรับความกว้างให้เหมาะสม */
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

.card .bottom-section .row .item .big-text2 {
  font-size: 14px;
  display: block;
}


.card .bottom-section .row .item .regular-text {
  font-size: 9px;
}

.card .bottom-section .row .item .regular-text2 {
  font-size: 10px;
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
  background-color: hsl(39, 100%, 69%);
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
  background-color: hsl(51, 100%, 72%);
}

.confetti-piece:nth-child(even) {
  z-index: 1;
}

.confetti-piece:nth-child(4n) {
  width: 6px;
  height: 14px;
  animation-duration: 4000ms;
  background-color: #b7ad15;
}

.confetti-piece:nth-child(5n) {
  width: 3px;
  height: 10px;
  animation-duration: 4000ms;
  background-color: #e9ff20;
}

.confetti-piece:nth-child(3n) {
  width: 4px;
  height: 12px;
  animation-duration: 2500ms;
  animation-delay: 3000ms;
  background-color: #c6e616;
}

.confetti-piece:nth-child(3n-7) {
  background-color: hsl(61, 100%, 37%);
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