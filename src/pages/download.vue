<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">


    <!-- Title -->
    <h1 class="text-3xl md:text-4xl font-extrabold mb-3 text-center">
      Pudee Club App
    </h1>

    <p class="text-gray-300 text-center mb-8 max-w-md">
      ดาวน์โหลดแอปเวอร์ชันล่าสุดสำหรับ Android
      <br />
      จัดการทีมของคุณได้ทุกที่ทุกเวลา! PuDee Club Fantasy Football
    </p>

    <!-- Download Button -->
    <a
      href="https://pudee.sgp1.digitaloceanspaces.com/app-pudee.apk"
      download
      class="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
        />
      </svg>
      ดาวน์โหลด APK
    </a>

    <!-- Note -->
    <p class="text-sm text-gray-400 mt-8 text-center px-4 max-w-sm leading-relaxed">
      ⚠️ หากติดตั้งไม่ได้ ให้ไปที่
      <span class="font-medium text-white">“การตั้งค่า → ความปลอดภัย”</span>
      แล้วเปิด
      <span class="font-medium text-white">“อนุญาตติดตั้งจากแหล่งที่ไม่รู้จัก”</span>
    </p>

    <!-- Footer -->
    <footer class="mt-10 text-gray-500 text-xs text-center">
      © 2025 Pudee Club. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
// ไม่มี script logic พิเศษ
</script>
