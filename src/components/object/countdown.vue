<template>
  <div class="flex flex-col items-center justify-center mt-2" :class="classadj">
    <div class="" :class="classadj">
      <div class="flex flex-row gap-4">
        <div class="text-center">
          <div class="countdown-number">
            <span class="top">{{ days }}</span>
            <span class="bottom">Day</span>
          </div>
        </div>
        <div class="text-center">
          <div class="countdown-number">
            <span class="top">{{ hours }}</span>
            <span class="bottom">Hr</span>
          </div>
        </div>
        <div class="text-center">
          <div class="countdown-number">
            <span class="top">{{ minutes }}</span>
            <span class="bottom">Mi</span>
          </div>
        </div>
        <div class="text-center">
          <div class="countdown-number">
            <span class="top">{{ seconds }}</span>
            <span class="bottom">Sc</span>
          </div>
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
    classadj: {
      type: String,
      default: '',
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
      this.currentTime += 1000; // addเวลาปัจจุบันทีละ 1 วินาที
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
        this.$emit('time-up');
      }
    },
  },
};
</script>

<style scoped>
.countdown-number {
  position: relative;
  height: 60px;
  width: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font: bold 2em 'Orbitron', sans-serif;
}

.countdown-number .top,
.countdown-number .bottom {
  position: absolute;
  width: 100%;
  text-align: center;
}

.countdown-number .top {
  top: 0;
}

.countdown-number .bottom {
  bottom: 0;
  margin-bottom: 4px;
  font-size: 12px;
}
</style>
