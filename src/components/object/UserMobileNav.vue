<template>
  <div v-if="userinfo">
    <div class="flex justify-around w-full justify-between mobile-menu">
      <button class="inline-flex flex-col items-center justify-center group"
        :class="{ active: isActive('player-detail-point') }" @click="setActive('player-detail-point')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 icon-large" fill="none" viewBox="0 0 24 24"
          id="cup-first">
          <path fill="#111" fill-rule="evenodd"
            d="M12.787 5.80709C13.0673 5.92318 13.25 6.19665 13.25 6.5V10.5C13.25 10.9142 12.9142 11.25 12.5 11.25 12.0858 11.25 11.75 10.9142 11.75 10.5V8.31066L11.5303 8.53033C11.2374 8.82322 10.7626 8.82322 10.4697 8.53033 10.1768 8.23744 10.1768 7.76256 10.4697 7.46967L11.9697 5.96967C12.1842 5.75517 12.5068 5.691 12.787 5.80709zM19.7115 6.02772L18.7628 5.71151 19.2372 4.28849 20.1858 4.6047C20.1983 4.60885 20.2107 4.613 20.2231 4.61713 20.6862 4.77147 21.0921 4.90675 21.4142 5.05657 21.7623 5.21853 22.0814 5.42714 22.3253 5.76556 22.5692 6.10397 22.6662 6.47262 22.7097 6.85412 22.75 7.20701 22.75 7.63489 22.7499 8.12306L22.7499 8.23489C22.7499 8.24605 22.7499 8.25719 22.7499 8.26829 22.75 8.67009 22.75 9.02498 22.7203 9.3218 22.6882 9.64348 22.617 9.95621 22.4391 10.2584 22.2613 10.5607 22.0225 10.7748 21.7569 10.9591 21.5118 11.1292 21.2016 11.3015 20.8503 11.4966L17.8642 13.1556 17.1358 11.8444 20.0927 10.2016C20.4818 9.98542 20.7255 9.84906 20.9017 9.7268 21.0641 9.61408 21.117 9.54762 21.1463 9.49774 21.1757 9.44786 21.2081 9.36935 21.2277 9.17263 21.2491 8.95925 21.2499 8.68003 21.2499 8.23485L21.2499 8.16232C21.25 7.62324 21.2488 7.28191 21.2194 7.02423 21.1922 6.78571 21.1476 6.69704 21.1084 6.6426 21.0692 6.58817 20.9992 6.51786 20.7815 6.4166 20.5463 6.30721 20.2229 6.19819 19.7115 6.02772zM3.81415 4.6047L4.76278 4.28849 5.23712 5.71151 4.28849 6.02772C3.77708 6.19819 3.45362 6.30721 3.21847 6.4166 3.0008 6.51786 2.93077 6.58817 2.89154 6.6426 2.85231 6.69704 2.80775 6.78571 2.78053 7.02423 2.75111 7.28191 2.74999 7.62324 2.75001 8.16232L2.75001 8.23485C2.75002 8.68003 2.75089 8.95925 2.77221 9.17263 2.79187 9.36935 2.82428 9.44786 2.85363 9.49774 2.88298 9.54762 2.93588 9.61408 3.09829 9.7268 3.27447 9.84906 3.51814 9.98542 3.90729 10.2016L6.86419 11.8444 6.13571 13.1556 3.14962 11.4966C2.79836 11.3015 2.48813 11.1292 2.24307 10.9591 1.97748 10.7748 1.73867 10.5607 1.56083 10.2584 1.38299 9.95621 1.3118 9.64348 1.27965 9.3218 1.24999 9.02498 1.25 8.67009 1.25001 8.26828 1.25001 8.25718 1.25001 8.24605 1.25001 8.23489L1.25001 8.16236C1.25 8.14921 1.25 8.13611 1.25 8.12305 1.24996 7.63488 1.24992 7.20701 1.2902 6.85412 1.33375 6.47262 1.43076 6.10397 1.67466 5.76556 1.91857 5.42714 2.23762 5.21853 2.58577 5.05657 2.90781 4.90675 3.31373 4.77147 3.77686 4.61712 3.78925 4.613 3.80168 4.60885 3.81415 4.6047zM12 15.25C12.4142 15.25 12.75 15.5858 12.75 16V19C12.75 19.4142 12.4142 19.75 12 19.75 11.5858 19.75 11.25 19.4142 11.25 19V16C11.25 15.5858 11.5858 15.25 12 15.25z"
            clip-rule="evenodd"></path>
          <path fill="#111" fill-rule="evenodd"
            d="M8.10379 20.1568C8.26739 19.3388 8.98562 18.75 9.81981 18.75H14.1802C15.0144 18.75 15.7326 19.3388 15.8962 20.1568L16.2354 21.8529C16.2795 22.0732 16.2225 22.3017 16.08 22.4755C15.9376 22.6493 15.7247 22.75 15.5 22.75H8.5C8.27531 22.75 8.06245 22.6493 7.92 22.4755C7.77754 22.3017 7.7205 22.0732 7.76457 21.8529L8.10379 20.1568ZM9.81981 20.25C9.70064 20.25 9.59803 20.3341 9.57466 20.451L9.41486 21.25H14.5852L14.4253 20.451C14.402 20.3341 14.2994 20.25 14.1802 20.25H9.81981Z"
            clip-rule="evenodd"></path>
          <path fill="#111" fill-rule="evenodd"
            d="M5.25 22C5.25 21.5858 5.58579 21.25 6 21.25H18C18.4142 21.25 18.75 21.5858 18.75 22 18.75 22.4142 18.4142 22.75 18 22.75H6C5.58579 22.75 5.25 22.4142 5.25 22zM7.4984 1.60719C8.66129 1.41099 10.1724 1.25 12.0002 1.25 12.7361 1.25 13.4208 1.27611 14.0522 1.32011 14.4654 1.34891 14.777 1.70723 14.7482 2.12044 14.7194 2.53365 14.3611 2.84528 13.9479 2.81648 13.3506 2.77485 12.7007 2.75 12.0002 2.75 10.2608 2.75 8.8332 2.90319 7.74796 3.08629 6.54105 3.28992 6.28751 3.3661 6.02161 3.69358 5.75957 4.01632 5.73468 4.32156 5.78848 5.67672 5.87816 7.93537 6.1761 10.3727 7.09884 12.2264 7.55432 13.1414 8.14983 13.8887 8.92569 14.409 9.69656 14.9261 10.6909 15.25 12 15.25 13.3091 15.25 14.3038 14.9261 15.0746 14.409 15.8505 13.8887 16.446 13.1414 16.9015 12.2264 17.8242 10.3727 18.1222 7.93537 18.2118 5.67672 18.2656 4.32156 18.2407 4.01632 17.9787 3.69358 17.7717 3.43865 17.5559 3.32558 16.8594 3.19268 16.4525 3.11503 16.1857 2.72226 16.2633 2.31539 16.3409 1.90851 16.7337 1.64162 17.1406 1.71926 17.9271 1.86936 18.5904 2.06732 19.1432 2.74808 19.8003 3.55739 19.7628 4.46863 19.7173 5.57222 19.7151 5.62642 19.7128 5.68108 19.7106 5.73622 19.6196 8.03065 19.3169 10.74 18.2443 12.8949 17.7021 13.9841 16.9512 14.9565 15.9101 15.6548 14.8641 16.3564 13.5711 16.75 12.0002 16.75 10.4293 16.75 9.13626 16.3564 8.09017 15.6548 7.04908 14.9565 6.29821 13.9841 5.75601 12.8949 4.68338 10.74 4.38076 8.03065 4.28966 5.73622 4.28748 5.68108 4.28522 5.62642 4.28299 5.57222 4.23754 4.46863 4.20001 3.55739 4.85713 2.74808 5.51366 1.93949 6.35333 1.79893 7.36355 1.62983 7.40817 1.62236 7.45312 1.61484 7.4984 1.60719z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="font-size-10 primary-color group-hover:text-gray-900 mt-2">point</span>
      </button>

      <button class="flex-col inline-flex items-center justify-center group" :class="{ active: isActive('result') }"
        @click="setActive('result')">
        <img src="/public/assets/logonew32x32.png" alt="result" class="w-4 h-4 group-hover:fill-blue-950" />
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">History</span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group"
        :class="{ active: isActive('season-select') }" @click="setActive('season-select')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="w-4 h-4 icon-large" viewBox="0 0 230.057 230.057">
          <g>
            <path
              d="M228.579,83.315l-32.147-41.258c-7.817-10.032-19.594-15.785-32.312-15.785h-21.204c-2.939,0-5.565,1.836-6.574,4.597   c-3.257,8.909-11.822,14.895-21.313,14.895s-18.055-5.986-21.313-14.895c-1.009-2.761-3.635-4.597-6.574-4.597H65.937   c-12.717,0-24.495,5.753-32.312,15.786L1.479,83.315c-1.397,1.793-1.837,4.152-1.179,6.328c0.658,2.176,2.331,3.897,4.488,4.615   l44.558,14.845v87.682c0,3.866,3.134,7,7,7h117.366c3.866,0,7-3.134,7-7v-87.682l44.558-14.845c2.157-0.718,3.83-2.439,4.488-4.615   C230.416,87.467,229.976,85.108,228.579,83.315z M180.712,94.347V84.057c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.728H63.345V84.057   c0-3.866-3.134-7-7-7s-7,3.134-7,7v10.29l-30.736-10.24l26.059-33.444c5.146-6.604,12.897-10.391,21.269-10.391h16.681   c6.295,11.832,18.761,19.491,32.41,19.491c13.649,0,26.115-7.66,32.411-19.491h16.681c8.371,0,16.123,3.787,21.269,10.39   l26.06,33.445L180.712,94.347z" />
          </g>
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2"> Play </span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('challenge') }"
        @click="setActive('challenge')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 icon-large">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">Challenge</span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('list') }"
        @click="setActive('list')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 icon-large">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">List</span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('menu') }"
        @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 icon-large">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">Menu</span>
      </button>
    </div>
    <transition name="slide">
      <div v-if="isMenuOpen" class="sidebar bg-white shadow-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="logo-container">
            <img :src="userinfo.ImageURL ? userinfo.ImageURL : '/public/assets/logo.webp'" alt="Logo"
              class="logo rounded-full shadow-lg">

          </div>

          <!-- <a @click="sideMenu('aff-my')" class="menu-link2 cursor-pointer"> <i class="fas fa-users mr-1"></i>พันธมิตร</a> -->

          <button @click="toggleMenu" class="close-button text-gray-600 hover:text-gray-800">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <ul class="menu-items">
          <!-- <li class="menu-item">
            <a @click="sideMenu('game')" class="menu-link cursor-pointer"> <i class="fas fa-gamepad mr-2"></i> เกมเก็บpoint</a>
          </li>
          <li class="menu-item">
            <a @click="sideMenu('exchangereward')" class="menu-link cursor-pointer"> <i class="fa fa-star mr-2"></i> เเลกของรางวัล</a>
          </li> -->
          <li class="menu-item">
            <a @click="sideMenu('payments')" class="menu-link cursor-pointer"> <i
                class="fas fa-ticket-alt text-yellow-700 mr-2"></i>
              Connect Wallet</a>
          </li>
          <li class="menu-item">
            <a @click="sideMenu('history')" class="menu-link cursor-pointer"> <i
                class="fas fa-history mr-2"></i>HistoryTransection</a>
          </li>
          <li class="menu-item">
            <a @click="sideMenu('rule')" class="menu-link cursor-pointer"><i class="fas fa-book mr-2"></i> Rule</a>
          </li>

          <li class="menu-item">
            <a @click="sideMenu('setting')" class="menu-link cursor-pointer"> <i class="fas fa-cog mr-2"></i>
              Setting</a>
          </li>
          <!-- <li class="menu-item">
            <a @click="versionInfo" class="menu-link cursor-pointer"> <i class="fas fa-info mr-2"></i> version update</a>
          </li> -->
          <li class="menu-item">
            <a @click="logout()" class="menu-link-red cursor-pointer"> <i class="fas fa-sign-out-alt mr-2"></i>
              Logout</a>
          </li>

        </ul>
       
      </div>
    </transition>
    <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { api } from '@axios_inst';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserMobileNav',
  data() {
    return {
      isMenuOpen: false,
      activeButton: this.$route.name, // ค่าเริ่มต้น
    }
  },
  computed: {
    ...mapGetters('auth', ['userinfo']),
    truncatedUsername() {
      return this.userinfo.Email.length > 10
        ? this.userinfo.Email.substring(0, 10) + '..'
        : this.userinfo.Email;
    },
  },
  methods: {
    ...mapActions('ticket', ['facthTicket']),
    versionInfo() {
      Swal.fire({
        title: 'Version Updates',
        html: `
         <strong>Version 1.0.12:</strong><br>
      - สามารถสมัคสมาชิคได้ผ่านเบอร์โทร<br>

      <strong>Version 1.0.11:</strong><br>
      - ไม่สามารถดูจากteamอื่นได้ นอกจากteamตัวเองจนกว่าจะสิ้นสุดเวลาจัดteam<br>
      - เเก้ไขpriceเเสดงโชวหน้าเลือกเเละเเก้ไข<br>
      - add function ในการดูDetailPlayerScoresหลังมีการใส่point<br>
      
      <strong>Version 1.0.10:</strong><br>
      - การอัปเดตจัดteamเเบบสามารถเลือกpositionได้เอง<br>
      - การแก้ไขสามารถแก้ไขpositionได้<br>
      - addpriceคงเหลือขณะเลือก<br>
      - Fix bug
    `,
        confirmButtonText: 'ปิด',
        customClass: {
          cancelButton: 'btn-cancel',
          popup: 'popup-custom',
          title: 'text-custom',
          htmlContainer: 'text-custom'
        },
      });
    },
    showRule() {
      this.isMenuOpen = !this.isMenuOpen;
      const rulesHtml = `
        <div class="rules-container">
            <div class="rule-title"><strong>Ruleการนับpoint</strong></div>
            <div class="rule"><strong>-</strong> ที่ลงสนามสตาร์ทเป็นตัวจริง <span class="rule-strong"> 1 คะแนน </span></div>
            <div class="rule"><strong>-</strong> โกล์/กองหลัง ทำประตู <span class="rule-strong"> 6 คะแนน </span> , กองกลางทำประตู <span class="rule-strong"> 5 คะแนน </span>, กองหน้าทำประตู <span class="rule-strong"> 4 คะแนน</span></div>
            <div class="rule"><strong>-</strong> จ่ายบอลให้เพื่อนทำประตูได้ (Assist) <span class="rule-strong"> 3 คะแนน </span></div>
            <div class="rule"><strong>-</strong> ผู้รักษาประตูไม่เสียประตู (ไม่ถูกChangeก่อนนาทีที่ 60) <span class="rule-strong"> 4 คะแนน </span>, กองหลังไม่เสียประตู (ไม่ถูกChangeก่อนนาทีที่ 60) <span class="rule-strong"> 4 คะแนน </span>, กองกลางไม่เสียประตู (ไม่ถูกChangeก่อนนาทีที่ 60) <span class="rule-strong"> 1 คะแนน </span></div>
            <div class="rule"><strong>-</strong> ผู้รักษาประตูเซฟลูกจุดโทษได้ <span class="rule-strong"> 5 คะแนน </span>, ผู้เล่นคนไหน ยิงจุดโทษพลาด <span class="rule-strong-red"> -2 คะแนน </span></div>
            <div class="rule"><strong>-</strong> โดนเหลือง <span class="rule-strong-red"> -1 คะแนน </span>, โดนแดง <span class="rule-strong-red"> -3 คะแนน </span> (ทั้งแดงโดยตรงและเหลืองที่2)</div>
            <div class="rule"><strong>-</strong> ยิงเข้าประตูตัวเอง <span class="rule-strong-red"> -2 คะแนน </span></div>
            <div class="rule"><strong>-</strong> ทุกๆการเสีย 2 ประตูของโกล์/กองหลัง <span class="rule-strong-red"> -1 คะแนน</span></div>
        </div>
      `;

      Swal.fire({
        html: rulesHtml,
        confirmButtonText: 'ปิด',
        customClass: {
          cancelButton: 'btn-cancel',
          popup: 'popup-custom',
          title: 'text-custom',
          htmlContainer: 'text-custom'
        },
      });
    },
    sideMenu(page) {
      if (page === 'payments') {
        Swal.fire({
          title: 'comming soon!',
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
        });
        return;
      }
      if (page === 'setting') {
        Swal.fire({
          title: 'comming soon!',
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
        });
        return;
      }
      if (page === 'history') {
        Swal.fire({
          title: 'comming soon!',
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
        });
        return;
      }
      this.activeButton = page;
      this.isMenuOpen = !this.isMenuOpen;
      this.$router.push({ name: page });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    setActive(button) {
      if (button === '1vs1') {
        Swal.fire({
          title: 'comming soon!',
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
        });
        return;
      }
      this.facthTicket();
      this.activeButton = button;
      this.$router.push({ name: button });
    },
    isActive(button) {
      return this.activeButton === button;
    },
    async logout() {
      const result = await Swal.fire({
        title: 'Confirm Logout!',
        showCancelButton: true,
        cancelButtonText: 'cancel',
        confirmButtonText: 'Confirm',
        customClass: {
          confirmButton: 'btn-confirm',
          cancelButton: 'btn-cancel',
          popup: 'popup-custom',
          title: 'text-custom',
          htmlContainer: 'text-custom'
        },
        buttonsStyling: false,
      });
      if (!result.isConfirmed) {
        return;
      }
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await api.post('/premier-league/v1/logout', {}, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });
        if (response.data.ok) {
          localStorage.removeItem('access_token');
          this.$router.push({ name: 'login' });
        }
      } catch (error) {

      }

    },
  },
}
</script>
<style scoped>
.rounded-t-mobile {
  border-radius: 15px 15px 0 0;
  padding: 8px 8px 10px;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: #fff;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.mobile-menu a {
  color: #1d242d !important;
}

.primary-color {
  color: #360c3a;
}

.font-size-10 {
  font-size: 10px;
}

/* สไตล์สำหรับปุ่ม */
button {
  padding: 8px;
  position: relative;
}

/* สไตล์สำหรับปุ่ม active */
.active {
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 8px;
}

/* ขยายขนาดของไอคอนและทำให้มันล้นออกมา */
.icon-large {
  width: 16px;
  height: 16px;
  overflow: visible;
}

/* CSS สำหรับ sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 1000;
  border-radius: 5px;

}

/* Animation สำหรับ sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.menu-items {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding-right: 10px;
}

.menu-item {
  margin-bottom: 1rem;
}

.menu-link {
  display: block;
  padding: 0.5rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 200;
  color: #333;
  border-radius: 0.25rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: #d3d2d2;
}

.menu-link:hover {
  background-color: #47395b;
  color: #fff;
}

.menu-link-red {
  display: block;
  padding: 0.5rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 200;
  color: #f8f7f7;
  border-radius: 0.25rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: #da3a3a;
}

.menu-link-red:hover {
  background-color: #612f2f;
  color: #fff;
}


.menu-link2 {
  display: block;
  padding: 0.5rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 200;
  color: #fcfcfc;
  border-radius: 0.25rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: #410561;
}

.menu-link2:hover {
  background-color: #4f396d;
  color: #fff;
}


.close-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
}

.logo-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.contact-us {
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 10px; */
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-icon img {
  width: 40px;
  height: 40px;
  transition: transform 0.2s;
}

.contact-icon img:hover {
  transform: scale(1.1);
}
</style>
