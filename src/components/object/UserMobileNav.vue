<template>
  <div class="flex gap-2 w-full justify-between px-4 mobile-menu">
    <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('news') }" @click="setActive('news')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a"
        class="w-4 h-4 icon-large">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
      <span class="font-size-10 primary-color group-hover:text-gray-900 mt-2">ข่าว</span>
    </button>

    <button class="flex-col inline-flex items-center justify-center group" :class="{ active: isActive('lottery') }" @click="setActive('lottery')">
      <img src="/public/assets/favicon-32x32.png" alt="lottery" class="w-4 h-4 group-hover:fill-blue-950" />
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">P.L</span>
    </button>

    <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('team') }" @click="setActive('team')">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" class="w-4 h-4 icon-large" viewBox="0 0 230.057 230.057">
        <g>
          <path d="M228.579,83.315l-32.147-41.258c-7.817-10.032-19.594-15.785-32.312-15.785h-21.204c-2.939,0-5.565,1.836-6.574,4.597   c-3.257,8.909-11.822,14.895-21.313,14.895s-18.055-5.986-21.313-14.895c-1.009-2.761-3.635-4.597-6.574-4.597H65.937   c-12.717,0-24.495,5.753-32.312,15.786L1.479,83.315c-1.397,1.793-1.837,4.152-1.179,6.328c0.658,2.176,2.331,3.897,4.488,4.615   l44.558,14.845v87.682c0,3.866,3.134,7,7,7h117.366c3.866,0,7-3.134,7-7v-87.682l44.558-14.845c2.157-0.718,3.83-2.439,4.488-4.615   C230.416,87.467,229.976,85.108,228.579,83.315z M180.712,94.347V84.057c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.728H63.345V84.057   c0-3.866-3.134-7-7-7s-7,3.134-7,7v10.29l-30.736-10.24l26.059-33.444c5.146-6.604,12.897-10.391,21.269-10.391h16.681   c6.295,11.832,18.761,19.491,32.41,19.491c13.649,0,26.115-7.66,32.411-19.491h16.681c8.371,0,16.123,3.787,21.269,10.39   l26.06,33.445L180.712,94.347z" />
        </g>
      </svg>
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">จัดทีม</span>
    </button>

    <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('competition') }" @click="setActive('competition')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a" class="w-4 h-4 icon-large">
        <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">เเข่งขัน</span>
    </button>

    <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('list') }" @click="setActive('list')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a" class="w-4 h-4 icon-large">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">รายการ</span>
    </button>

    <button class="inline-flex flex-col items-center justify-center group" :class="{ active: isActive('menu') }" @click="setActive('menu')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#360c3a" class="w-4 h-4 icon-large">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">เมนู</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserMobileNav',
  data() {
    return {
      activeButton: 'news', // ค่าเริ่มต้น
    }
  },
  methods: {
    setActive(button) {
      this.activeButton = button;
    },
    isActive(button) {
      return this.activeButton === button;
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
  padding: 8px; /* ระยะของปุ่มทุกสถานะ */
  position: relative; /* เพื่อให้ไอคอนสามารถล้นออกมา */
}

/* สไตล์สำหรับปุ่ม active */
.active {
  background-color: rgba(128, 128, 128, 0.3); /* สีพื้นหลังเทาโปร่งแสง */
  border-radius: 8px; /* ขอบโค้งทั้ง 4 มุม */
}

/* ขยายขนาดของไอคอนและทำให้มันล้นออกมา */
.icon-large {
  width: 16px; /* ปรับขนาดที่ต้องการ */
  height: 16px; /* ปรับขนาดที่ต้องการ */
  overflow: visible;
}
</style>
