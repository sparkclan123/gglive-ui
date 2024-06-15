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

    <div class="card cursor-pointer" v-if="gameWeek" >
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
                <span class="big-text">2626</span>
                <span class="regular-text">ผู้เข้าเเข่งขันทั้งหมด</span>
            </div>
            <div class="item">
                <span class="big-text">0  <span class="regular-text">(ทีม)</span></span>
                <span class="regular-text">ทีมของคุณ</span>
            </div>
            <div class="item">
                <span class="big-text text-green-500">38,631</span>
                <span class="regular-text text-green-500">เงินรางลังสูงสุด</span>
            </div>
            </div>
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
            gameWeek: null
        };
    },
    methods: {
        ...mapActions('selectGameWeek', ['setGameWeek']),
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
                }
            } catch (error) {
                console.log(error);
            }
        }

    },
    computed: {
        ...mapGetters('season', ['getSeasons'])
    },
    created() {
        this.getGameWeek();
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
</style>