<template>
  <div v-if="userinfo">
    <!-- bottom nav -->
    <div
      class="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-md py-2 z-50 rounded-t-2xl">
      <button class="flex flex-col items-center justify-center text-xs transition-all duration-200"
        :class="isActive('player-detail-point') ? 'text-blue-500 scale-110' : 'text-gray-700 hover:text-blue-600'"
        @click="setActive('player-detail-point')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        คะเเนน
      </button>

      <button class="flex flex-col items-center justify-center text-xs transition-all duration-200"
        :class="isActive('result') ? 'text-blue-500 scale-110' : 'text-gray-700 hover:text-blue-600'"
        @click="setActive('result')">
        <img src="/public/assets/logonew32x32.png" alt="result" class="w-4 h-4 mb-1" />
        ย้อนหลัง
      </button>

      <button class="flex flex-col items-center justify-center text-xs transition-all duration-200"
        :class="isActive('season-select') ? 'text-blue-500 scale-110' : 'text-gray-700 hover:text-blue-600'"
        @click="setActive('season-select')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="w-4 h-4 mb-1" viewBox="0 0 230.057 230.057">
          <g>
            <path
              d="M228.579,83.315l-32.147-41.258c-7.817-10.032-19.594-15.785-32.312-15.785h-21.204c-2.939,0-5.565,1.836-6.574,4.597   c-3.257,8.909-11.822,14.895-21.313,14.895s-18.055-5.986-21.313-14.895c-1.009-2.761-3.635-4.597-6.574-4.597H65.937   c-12.717,0-24.495,5.753-32.312,15.786L1.479,83.315c-1.397,1.793-1.837,4.152-1.179,6.328c0.658,2.176,2.331,3.897,4.488,4.615   l44.558,14.845v87.682c0,3.866,3.134,7,7,7h117.366c3.866,0,7-3.134,7-7v-87.682l44.558-14.845c2.157-0.718,3.83-2.439,4.488-4.615   C230.416,87.467,229.976,85.108,228.579,83.315z M180.712,94.347V84.057c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.728H63.345V84.057   c0-3.866-3.134-7-7-7s-7,3.134-7,7v10.29l-30.736-10.24l26.059-33.444c5.146-6.604,12.897-10.391,21.269-10.391h16.681   c6.295,11.832,18.761,19.491,32.41,19.491c13.649,0,26.115-7.66,32.411-19.491h16.681c8.371,0,16.123,3.787,21.269,10.39   l26.06,33.445L180.712,94.347z" />
          </g>
        </svg>
        จัดทีม
      </button>

      <button class="flex flex-col items-center justify-center text-xs transition-all duration-200"
        :class="isActive('challenge') ? 'text-blue-500 scale-110' : 'text-gray-700 hover:text-blue-600'"
        @click="setActive('challenge')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
        แข่งขัน
      </button>

      <button class="flex flex-col items-center justify-center text-xs transition-all duration-200"
        :class="isActive('list') ? 'text-blue-500 scale-110' : 'text-gray-700 hover:text-blue-600'"
        @click="setActive('list')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
          class="w-4 h-4 mb-1">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

        รายการ
      </button>


      <button class="flex flex-col items-center justify-center text-xs transition-all duration-200"
        :class="isActive('menu') ? 'text-blue-500 scale-110' : 'text-gray-700 hover:text-blue-600'" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        เมนู
      </button>
    </div>

    <!-- sidebar -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#fafafa]/95 to-[#e9e9e9]/90
           backdrop-blur-2xl shadow-[8px_0_25px_rgba(0,0,0,0.25)] p-6 z-[60] rounded-r-3xl
           border-r border-white/40 transition-all duration-300 ease-out">
        <!-- header -->
        <div class="flex items-center justify-between mb-6 border-b border-gray-300/50 pb-4">
          <div class="flex items-center space-x-3">
            <img :src="userinfo.ImageURL ? userinfo.ImageURL : '/public/assets/logo.webp'"
              class="w-12 h-12 rounded-full ring-2 ring-purple-400 shadow-md" alt="Logo" />
            <div class="text-sm font-semibold text-gray-700 truncate w-28">{{ truncatedUsername }}</div>
          </div>
          <button @click="toggleMenu"
            class="text-gray-400 hover:text-gray-700 hover:rotate-90 transition-transform duration-200">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <!-- menu list -->
        <ul class="space-y-2 text-[0.9rem] font-medium">
          <li>
            <a @click="sideMenu('payments')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200">
              <i class="fas fa-ticket-alt w-5 text-yellow-600"></i>
              สนับสนุนเรา
            </a>
          </li>
          <li>
            <a @click="sideMenu('history')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200">
              <i class="fas fa-history w-5 text-gray-600"></i>
              ประวัติการทำรายการ
            </a>
          </li>
          <li>
            <a @click="sideMenu('rule')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200">
              <i class="fas fa-book w-5 text-gray-600"></i>
              กติการะบบ
            </a>
          </li>
          <li>
            <a @click="sideMenu('setting')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200">
              <i class="fas fa-cog w-5 text-gray-600"></i>
              ตั้งค่า
            </a>
          </li>
          <li>
            <a @click="logout()"
              class="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-sm transition-all duration-200">
              <i class="fas fa-sign-out-alt w-5"></i>
              ออกจากระบบ
            </a>
          </li>
        </ul>

        <!-- contact -->
        <div class="mt-8 text-center">
          <p class="text-sm text-green-700 font-semibold mb-3">ID: @pudee</p>
          <div class="flex justify-center gap-4">
            <a href="https://lin.ee/bltN2Lk" class="transition-transform hover:scale-110">
              <svg version="1.1" viewBox="0 0 512 512" width="40" height="40" class="fill-current">
                <g id="_x32_00-line">
                  <g>
                    <path
                      d="M475.999,116.242v280.204c-0.098,44-36.142,79.65-80.24,79.553H115.555    c-44.001-0.098-79.652-36.24-79.554-80.241V115.554c0.099-43.999,36.241-79.65,80.241-79.553h280.205    C440.445,36.1,476.098,72.144,475.999,116.242z"
                      style="fill:#39AE41;" />
                    <path
                      d="M415.501,236.651c0-71.695-71.895-130.034-160.188-130.034    c-88.295,0-160.188,58.339-160.188,130.034c0,64.231,56.965,118.054,133.963,128.269c18.76,4.025,16.599,10.902,12.376,36.141    c-0.688,4.027-3.241,15.814,13.848,8.646c17.089-7.171,92.223-54.313,125.91-93.01    C404.401,291.159,415.501,265.331,415.501,236.651z"
                      style="fill:#FEFEFE;" />
                    <g>
                      <path
                        d="M300,202.081h-11.194c-1.771,0-3.145,1.375-3.145,3.143v41.446l-32.018-43.214     c-0.492-0.884-1.571-1.375-2.553-1.375h-11.098c-1.768,0-3.143,1.375-3.143,3.143v69.831c0,1.767,1.375,3.144,3.143,3.144h11.195     c1.769,0,3.143-1.377,3.143-3.144v-41.447l32.018,43.214c0.493,0.688,1.476,1.276,2.555,1.276h11.196     c1.768,0,3.143-1.375,3.143-3.144v-69.828C303.241,203.456,301.769,201.982,300,202.081z"
                        style="fill:#39AE41;" />
                      <path
                        d="M222.705,201.982H211.51c-1.769,0-3.143,1.375-3.143,3.144v69.828     c0,1.769,1.375,3.144,3.143,3.144h11.195c1.769,0,3.143-1.375,3.143-3.144v-69.828     C225.848,203.456,224.474,201.982,222.705,201.982z"
                        style="fill:#39AE41;" />
                      <path
                        d="M195.697,260.52h-30.544v-55.394c0-1.769-1.375-3.144-3.144-3.144h-11.196     c-1.769,0-3.143,1.375-3.143,3.144v69.828c0,0.886,0.295,1.573,0.883,2.16c0.59,0.493,1.277,0.887,2.161,0.887H195.6     c1.767,0,3.142-1.375,3.142-3.144V263.66C198.742,261.99,197.366,260.52,195.697,260.52z"
                        style="fill:#39AE41;" />
                      <path
                        d="M362.169,219.464c1.77,0,3.143-1.374,3.143-3.142v-11.196c-0.098-1.67-1.472-3.144-3.143-3.144     h-44.884c-1.669,0-3.142,1.375-3.142,3.144v69.828c0,1.672,1.374,3.144,3.142,3.144h44.884c1.77,0,3.143-1.375,3.143-3.144     V263.76c0-1.77-1.373-3.144-3.143-3.144h-30.543V248.83h30.543c1.77,0,3.143-1.375,3.143-3.143v-11.295     c0-1.767-1.373-3.143-3.143-3.143h-30.543v-11.786H362.169z"
                        style="fill:#39AE41;" />
                    </g>
                  </g>
                </g>
                <g id="Layer_1" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61563548004280"
              class="transition-transform hover:scale-110 mt-1">
              <svg viewBox="0 0 32 32" width="32" height="32">
                <path fill="#3B5998"
                  d="M32,30c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h28c1.104,0,2,0.896,2,2V30z" />
                <path fill="#FFFFFF"
                  d="M22,32V20h4l1-5h-5v-2c0-2,1.002-3,3-3h2V5c-1,0-2.24,0-4,0c-3.675,0-6,2.881-6,7v3h-4v5h4v12H22z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </transition>


    <!-- overlay -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" @click="toggleMenu"></div>
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
      - ไม่สามารถดูนักเตะจากทีมอื่นได้ นอกจากทีมตัวเองจนกว่าจะสิ้นสุดเวลาจัดทีม<br>
      - เเก้ไขราคาเเสดงโชวหน้าเลือกนักเตะเเละเเก้ไขนักเตะ<br>
      - เพิ่ม function ในการดูรายละเอียดคะเเนนนักเตะหลังมีการใส่คะเเนน<br>
      
      <strong>Version 1.0.10:</strong><br>
      - การอัปเดตจัดทีมเเบบสามารถเลือกตำเเหน่งได้เอง<br>
      - การแก้ไขนักเตะสามารถแก้ไขตำเเหน่งได้<br>
      - เพิ่มราคาคงเหลือขณะเลือกนักเตะ<br>
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
      this.facthTicket();
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
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.2));
  border-left: 3px solid #6366f1;
  color: #1e1e1e !important;
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
