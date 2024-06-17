<template>
    <div class="flex flex-col items-center justify-center mt-2">
      <div class="bg-white p-4 rounded-lg shadow-lg text-gray-800">
        <div class="flex flex-row gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold countdown-number">{{ days }}</div>
            <div class="text-sm">วัน</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold countdown-number">{{ hours }}</div>
            <div class="text-sm">ชั่วโมง</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold countdown-number">{{ minutes }}</div>
            <div class="text-sm">นาที</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold countdown-number">{{ seconds }}</div>
            <div class="text-sm">วินาที</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      datenow: {
        type: String,
        required: true,
      },
      endtime: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        targetTime: null,
        currentTime: null,
      };
    },
    mounted() {
      this.currentTime = new Date(this.datenow).getTime();
      this.targetTime = new Date(this.endtime).getTime();
      this.updateCountdown();
      setInterval(this.updateCountdown, 1000);
    },
    methods: {
      updateCountdown() {
        this.currentTime += 1000; // เพิ่มเวลาปัจจุบันทีละ 1 วินาที
        const distance = this.targetTime - this.currentTime;
  
        if (distance > 0) {
          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        } else {
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .countdown-number {
    transition: transform 1s ease-out;
  }
  </style>
  