<template>
  <div v-if="userinfo">
    <div class="flex gap-2 w-full justify-between px-4 mobile-menu">
      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('1vs1') }"
        @click="setActive('1vs1')">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"
          class="w-4 h-4 icon-large" viewBox="25 0 250.057 230.057">
          <g>
            <g>
              <path
                d="M148.048,185.018c-0.376-7.991-7.259-14.139-15.259-14.139h-3.921c4.507-2.789,7.421-7.905,7.022-13.682    c-0.543-7.848-7.346-13.802-15.213-13.802h-10.832c0.447,5.277-1.26,12.514-5.056,16.767c-1.525,1.709-3.271,3.007-5.15,3.934    c-0.634,0.313-0.423,1.257,0.284,1.257h3.872c1.605,0,3.157,0.773,3.988,2.145c1.8,2.972-0.438,6.632-3.749,6.632h-23.66    c-0.846,0-1.674,0.244-2.384,0.702l-0.006,0.004c-3.261,2.133-5.28,5.765-5.28,9.767c0,4.001,2.019,7.632,5.28,9.766l0.002,0.001    c0.743,0.469,1.603,0.718,2.482,0.718h28.972c2.945,0,5.064,2.901,4.19,5.674c-0.598,1.897-2.471,3.103-4.46,3.103H80.467    c-0.878,0-1.739,0.249-2.482,0.718l-0.002,0.001c-3.261,2.133-5.28,5.765-5.28,9.766c0,4.001,2.019,7.633,5.28,9.767l0.002,0.001    c0.669,0.459,1.462,0.705,2.273,0.705h20.17c2.597,0,4.865,2.416,4.302,5.262c-0.412,2.082-2.348,3.515-4.47,3.515H80.449    c-0.839,0-1.671,0.223-2.378,0.676c-3.313,2.126-5.368,5.786-5.368,9.823c0,5.532,3.96,10.364,9.368,11.459h26.976    c7.867,0,14.67-5.955,15.212-13.803c0.399-5.776-2.515-10.891-7.02-13.68h4.436c7.867,0,14.67-5.955,15.212-13.803    c0.399-5.776-2.515-10.891-7.02-13.68h3.342C141.652,200.593,148.45,193.55,148.048,185.018z" />
              <path
                d="M72.82,156.484c0.471,3.379,2.391,6.358,5.25,8.194c0.705,0.453,1.536,0.676,2.374,0.676h2.473    c0.722,0,0.923-0.982,0.26-1.267c-2.317-0.997-4.514-2.386-6.462-4.124L72.82,156.484z" />
            </g>
            <path
              d="M63.926,154.856c0-1.943,0.29-3.816,0.797-5.598l-3.177-2.836c-1.544-1.379-1.782-3.851-0.312-5.499   c1.435-1.605,3.896-1.743,5.499-0.311l15.17,13.54c5.121,4.57,12.781,3.94,17.164-0.972c4.465-5.002,4.029-12.703-0.972-17.167   L71.487,112.26c-4.859-4.338-12.232-4.09-16.786,0.566l-0.115,0.112c-34.657,32.695-42.231,40.804-45.009,44.307   C2.309,166.408,0,173.196,0,183.04v30.485c0,23.178,18.856,42.034,42.034,42.034c8.484,0,16.949,0,25.408,0   c-2.208-3.258-3.517-7.288-3.517-11.459c0-5.758,2.38-11.086,6.396-14.874c-4.016-3.789-6.396-9.117-6.396-14.875   c0-5.758,2.38-11.086,6.396-14.874c-4.016-3.788-6.396-9.116-6.396-14.874c0-5.758,2.38-11.086,6.396-14.874   C66.305,165.94,63.926,160.613,63.926,154.856z" />
            <g>
              <path
                d="M227.107,164.623l0.003-0.002c2.812-1.84,4.698-4.792,5.163-8.137l-6.077,5.168c-0.834,0.745-1.693,1.389-2.569,1.937    c-0.811,0.507-0.426,1.764,0.529,1.764h0.633C225.618,165.354,226.428,165.098,227.107,164.623z" />
              <path
                d="M204.663,224.824h20.077c0.839,0,1.661-0.244,2.364-0.703l0.006-0.004c3.262-2.134,5.28-5.765,5.28-9.766    c0-4-2.019-7.632-5.28-9.765l-0.006-0.004c-0.715-0.467-1.551-0.716-2.406-0.716h-28.79c-1.603,0-3.156-0.765-3.994-2.131    c-1.816-2.961,0.413-6.646,3.739-6.646h28.861c0.914,0,1.81-0.248,2.594-0.719l0.003-0.001c3.262-2.134,5.28-5.765,5.28-9.765    c0-4.001-2.019-7.632-5.28-9.766l-0.006-0.004c-0.719-0.459-1.555-0.703-2.408-0.703h-23.637c-3.293,0-5.541-3.629-3.763-6.615    c0.822-1.38,2.373-2.163,3.98-2.163h4.794c0.991,0,1.334-1.308,0.472-1.796c-2.255-1.278-4.396-3.028-6.328-5.192    c-3.531-3.955-5.464-9.185-4.976-14.97h-10.822c-7.867,0-14.67,5.954-15.213,13.802c-0.4,5.777,2.515,10.893,7.022,13.682h-3.921    c-8,0-14.883,6.148-15.259,14.139c-0.402,8.531,6.396,15.574,14.84,15.574h3.342c-4.506,2.79-7.42,7.904-7.02,13.68    c0.543,7.848,7.345,13.803,15.212,13.803h4.436c-4.505,2.789-7.419,7.904-7.02,13.68c0.543,7.848,7.345,13.803,15.212,13.803    h26.976c5.4-1.093,9.369-5.918,9.369-11.459c0-4-2.019-7.632-5.28-9.765l-0.001-0.001c-0.717-0.478-1.559-0.733-2.42-0.733    h-19.856c-2.121,0-4.057-1.432-4.47-3.512C199.796,227.245,202.063,224.824,204.663,224.824z" />
            </g>
            <path
              d="M295.514,157.242c-0.685-1.429-1.599-2.777-2.769-3.973l-7.264-7.424l-35.091-33.019   c-4.555-4.656-11.927-4.903-16.785-0.566l-26.608,23.753c-5.013,4.476-5.45,12.152-0.974,17.166   c4.459,4.996,12.132,5.465,17.166,0.973l15.169-13.54c1.605-1.433,4.065-1.292,5.499,0.311c1.281,1.435,1.296,3.551,0.139,5.008   c-0.382,0.48-3.12,2.874-3.627,3.327c0.508,1.782,0.798,3.655,0.798,5.598c0,5.758-2.38,11.085-6.396,14.874   c4.016,3.788,6.396,9.116,6.396,14.874c0,5.758-2.38,11.086-6.396,14.874c4.017,3.788,6.396,9.116,6.396,14.874   c0,5.758-2.38,11.086-6.396,14.875c4.017,3.788,6.396,9.116,6.396,14.874c0,4.176-1.311,8.204-3.517,11.459   c8.459,0,16.929,0,25.409,0c23.178,0,42.034-18.858,42.034-42.035v-30.485C305.093,173.193,301.477,164.182,295.514,157.242z" />
            <path
              d="M160.046,122.967V57.033c0-4.143-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.357-7.5,7.5v65.934c0,4.143,3.357,7.5,7.5,7.5   C156.688,130.467,160.046,127.109,160.046,122.967z" />
            <path
              d="M115.792,126.164c1.765,3.748,6.236,5.353,9.981,3.587c3.747-1.766,5.353-6.234,3.587-9.981l-23.06-48.934   c-1.765-3.747-6.233-5.354-9.981-3.587c-3.747,1.766-5.353,6.234-3.587,9.981L115.792,126.164z" />
            <path
              d="M179.319,129.751c3.745,1.766,8.216,0.161,9.982-3.587l23.06-48.934c1.766-3.747,0.16-8.216-3.587-9.981   c-3.746-1.769-8.216-0.16-9.981,3.587l-23.06,48.934C173.967,123.517,175.572,127.985,179.319,129.751z" />
          </g>
        </svg>
        <span class="font-size-10 primary-color group-hover:text-gray-900 mt-2">1vs1</span>
      </button>

      <button class="flex-col inline-flex items-center justify-center group" :class="{ active: isActive('result') }"
        @click="setActive('result')">
        <img src="/public/assets/favicon-32x32.png" alt="result" class="w-4 h-4 group-hover:fill-blue-950" />
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">PuDee</span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group"
        :class="{ active: isActive('season-select') }" @click="setActive('season-select')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="w-4 h-4 icon-large" viewBox="0 0 230.057 230.057">
          <g>
            <path
              d="M228.579,83.315l-32.147-41.258c-7.817-10.032-19.594-15.785-32.312-15.785h-21.204c-2.939,0-5.565,1.836-6.574,4.597   c-3.257,8.909-11.822,14.895-21.313,14.895s-18.055-5.986-21.313-14.895c-1.009-2.761-3.635-4.597-6.574-4.597H65.937   c-12.717,0-24.495,5.753-32.312,15.786L1.479,83.315c-1.397,1.793-1.837,4.152-1.179,6.328c0.658,2.176,2.331,3.897,4.488,4.615   l44.558,14.845v87.682c0,3.866,3.134,7,7,7h117.366c3.866,0,7-3.134,7-7v-87.682l44.558-14.845c2.157-0.718,3.83-2.439,4.488-4.615   C230.416,87.467,229.976,85.108,228.579,83.315z M180.712,94.347V84.057c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.728H63.345V84.057   c0-3.866-3.134-7-7-7s-7,3.134-7,7v10.29l-30.736-10.24l26.059-33.444c5.146-6.604,12.897-10.391,21.269-10.391h16.681   c6.295,11.832,18.761,19.491,32.41,19.491c13.649,0,26.115-7.66,32.411-19.491h16.681c8.371,0,16.123,3.787,21.269,10.39   l26.06,33.445L180.712,94.347z" />
          </g>
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2"> จัดทีม </span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('challenge') }"
        @click="setActive('challenge')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 icon-large">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">เเข่งขัน</span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('list') }"
        @click="setActive('list')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 icon-large">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">รายการ</span>
      </button>

      <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('menu') }"
        @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 icon-large">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">เมนู</span>
      </button>
    </div>
    <transition name="slide">
      <div v-if="isMenuOpen" class="sidebar bg-white shadow-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="logo-container">
            <img :src="userinfo.ImageURL ? userinfo.ImageURL : '/public/assets/logo.webp'" alt="Logo"
              class="logo rounded-full shadow-lg">

          </div>
          <span class="text-xs">{{ truncatedUsername }}</span>
          <button @click="toggleMenu" class="close-button text-gray-600 hover:text-gray-800">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <ul class="menu-items">
          <li class="menu-item">
            <a @click="sideMenu('payments')" class="menu-link"> <i class="fas fa-ticket-alt mr-2"></i> ซื้อตั๋ว</a>
          </li>
          <li class="menu-item">
            <a @click="showRule()" class="menu-link"><i class="fas fa-book mr-2"></i> กติกาการเล่น</a>
          </li>
          <li class="menu-item">
            <a href="#" class="menu-link"> <i class="fas fa-cog mr-2"></i> ตั้งค่า</a>
          </li>
          <li class="menu-item">
            <a @click="logout()" class="menu-link-red"> <i class="fas fa-sign-out-alt mr-2"></i> logout</a>
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
import { mapGetters } from 'vuex';

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
    showRule() {
      this.isMenuOpen = !this.isMenuOpen;
      const rulesHtml = `
        <div class="rules-container">
            <div class="rule-title"><strong>กติกาการนับคะเเนน</strong></div>
            <div class="rule"><strong>-</strong> นักเตะที่ลงสนามสตาร์ทเป็นตัวจริง <span class="rule-strong"> 1 คะแนน </span></div>
            <div class="rule"><strong>-</strong> โกล์/กองหลัง ทำประตู <span class="rule-strong"> 6 คะแนน </span> , กองกลางทำประตู <span class="rule-strong"> 5 คะแนน </span>, กองหน้าทำประตู <span class="rule-strong"> 4 คะแนน</span></div>
            <div class="rule"><strong>-</strong> จ่ายบอลให้เพื่อนทำประตูได้ (Assist) <span class="rule-strong"> 3 คะแนน </span></div>
            <div class="rule"><strong>-</strong> ผู้รักษาประตูไม่เสียประตู (ไม่ถูกเปลี่ยนตัวก่อนนาทีที่ 60) <span class="rule-strong"> 4 คะแนน </span>, กองหลังไม่เสียประตู (ไม่ถูกเปลี่ยนตัวก่อนนาทีที่ 60) <span class="rule-strong"> 4 คะแนน </span>, กองกลางไม่เสียประตู (ไม่ถูกเปลี่ยนตัวก่อนนาทีที่ 60) <span class="rule-strong"> 1 คะแนน </span></div>
            <div class="rule"><strong>-</strong> ผู้รักษาประตูเซฟลูกจุดโทษได้ <span class="rule-strong"> 5 คะแนน </span>, ผู้เล่นคนไหน ยิงจุดโทษพลาด <span class="rule-strong-red"> -2 คะแนน </span></div>
            <div class="rule"><strong>-</strong> โดนใบเหลือง <span class="rule-strong-red"> -1 คะแนน </span>, โดนใบแดง <span class="rule-strong-red"> -3 คะแนน </span> (ทั้งแดงโดยตรงและใบเหลืองที่2)</div>
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
      this.activeButton = button;
      this.$router.push({ name: button });
    },
    isActive(button) {
      return this.activeButton === button;
    },
    async logout() {
      const result = await Swal.fire({
        title: 'ยืนยันออกจากระบบ!',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
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
  background-color: #dccef1;
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


</style>
