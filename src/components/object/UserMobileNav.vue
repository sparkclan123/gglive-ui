<template>
  <div class="flex gap-2 w-full justify-between px-4 mobile-menu">
    <button class="inline-flex flex-col items-center justify-center group">
      <IconHomeSvg :fill="'#A3ADBB'" />
      <span class="font-size-10 primary-color group-hover:text-gray-900 mt-2">หน้าหลัก</span>
    </button>

    <button class=" flex-col inline-flex items-center justify-center  group">
      <IconBingoSvg class=" group-hover:fill-blue-950" :fill="'#A3ADBB'" />
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">แทงหวย</span>
    </button>
    <button class="inline-flex flex-col items-center justify-center  group">
      <IconMenuTwoSvg class=" group-hover:fill-blue-950" :fill="'#A3ADBB'" />
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">รายการเเทง</span>
    </button>
    <button class="inline-flex flex-col items-center justify-center group">
      <IconFirstPlaceSvg class=" group-hover:fill-blue-950" :fill="'#A3ADBB'" />
      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">ผลรางวัล</span>
    </button>
    <button class="inline-flex flex-col items-center justify-center group">
      <IconGameControllerSvg class=" group-hover:fill-blue-950" :fill="'#A3ADBB'" />

      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">เกมส์</span>
    </button>

    <button class="inline-flex flex-col items-center justify-center group">
      <IconMenuSvg class="group-hover:fill-blue-950" />

      <span class="font-size-10 primary-color group-hover:text-blue-950 mt-2">เมนู</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserMobileNav',
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },
  },
}
</script>

<style scoped>
.rounded-t-mobile {
  border-radius: 24px 24px 0 0;
  padding: 16px 16px 24px;
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
  color: #1d5d9b;
}

.font-size-10 {
  font-size: 10px;
}
</style>