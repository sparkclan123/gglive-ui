<template>
  <div class="flex flex-col items-center justify-center mt-4 space-y-3" :class="classadj">
    <div class="flex flex-row gap-3 sm:gap-5 bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl p-4 shadow-xl backdrop-blur-md border border-gray-700/40">
      <div v-for="(label, idx) in ['วัน','ชั่วโมง','นาที','วินาที']" :key="idx" class="text-center">
        <div class="countdown-box">
          <span class="digit text-cyan-300 drop-shadow-md">
            {{ [days, hours, minutes, seconds][idx] }}
          </span>
          <span class="label text-gray-300">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datenow: String,
    endtime: String,
    classadj: { type: String, default: '' },
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
      this.currentTime += 1000;
      const distance = this.targetTime - this.currentTime;
      if (distance > 0) {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      } else {
        this.days = this.hours = this.minutes = this.seconds = 0;
        this.$emit('time-up');
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&display=swap');

.countdown-box {
  width: 70px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(145deg, #1f2937, #111827);
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.08),
    0 4px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.countdown-box:hover {
  transform: scale(1.06);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.25);
}

.digit {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #00e0ff;
}

.label {
  margin-top: 2px;
  font-size: 0.75rem;
  color: #ccc;
  letter-spacing: 0.5px;
}
</style>
