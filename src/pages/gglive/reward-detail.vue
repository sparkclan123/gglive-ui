<template>
  <div>
    <div v-show="loading">
      <LodingSceen style="display: flex; justify-content: space-around;" />
    </div>
    <div class="contant_style relative">
      <div class="absolute top-0 left-0 m-3 flex items-center cursor-pointer shsojvp text-gray-200"
        @click="route_back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
          class="svg-white mr-1 ml-2 mt-1">
          <path
            d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
            fill="black" transform="matrix(-1 0 0 1 24 0)"></path>
        </svg>
        <span class="text-gray-800 font-bold text-xs mt-1">กลับ</span>
      </div>

      <div class=" justify-center items-center h-74 mt-3" v-if="type == 'VIP'">
        <div>
          <span class="text-gray-800 text-2xl font-bold">รายละเอียดรางวัล  <span class="text-yellow-400"> VIP </span></span>
          <div class="mt-4 px-6 text-gray-600">
            <p>
              สำหรับเกมวีค VIP รางวัลที่ 1 จะได้รับเงินรางวัลเต็มจำนวนที่ปรากฏอยู่หน้าเกมวีคนั้น ๆ
            </p>
            <p class="mt-2">
              รางวัลที่ 2 จะได้รับ 10% ของรางวัลที่ 1 และรางวัลที่ 3 จะได้รับ 5% ของรางวัลที่ 1
            </p>
            <p class="mt-4 text-sm text-blue-600 font-medium">ยกตัวอย่าง:</p>
            <p class="mt-2">
              รางวัลที่ 1: <span class="font-semibold text-green-900">500,000 บาท</span><br />
              รางวัลที่ 2: <span class="font-semibold text-green-900">50,000 บาท</span><br />
              รางวัลที่ 3: <span class="font-semibold text-green-900">25,000 บาท</span>
            </p>
            <p class="mt-4">
              <span class="font-semibold text-yellow-900 ">โปรดทราบว่า </span> <span class="font-semibold text-purple-900 ">  รางวัลอาจมีการเพิ่มขึ้นได้ตลอดเวลา
                ขึ้นอยู่กับจำนวนผู้เล่นที่เข้ามาร่วมสนับสนุนเรา</span>
            </p>
            <p class="mt-2 text-gray-600">
              ทางเราเป็นน้องใหม่ในวงการและอาจไม่ได้มีทุนมาก จึงขออภัยหากไม่สามารถ ตั้งต้น เงินรางวัลได้สูง เราพร้อมที่จะพัฒานาเพื่อให้ทุกท่านได้รับประสบการณ์ที่ดีที่สุด ครับ
            </p>
            <p class="mt-4 font-semibold">
              <span class="font-semibold text-purple-900 ">ขอบพระคุณเป็นอย่างยิ่งที่สนับสนุนเรา </span>
            </p>
          </div>
        </div>
      </div>
      <div class=" justify-center items-center h-74 mt-3" v-if="type == 'N'">
        <div>
          <span class="text-gray-800 text-2xl font-bold">รายละเอียดรางวัล <span class="text-gray-400"> (ปกติ) </span></span>
          <div class="mt-4 px-6 text-gray-600">
            <p>
              สำหรับเกมวีค ปกติ รางวัลที่ 1 จะได้รับเป็นตั๋วการเเข่ง VIP เต็มจำนวนที่ปรากฏอยู่หน้าเกมวีคนั้น ๆ
            </p>
  
            <p class="mt-4 text-sm text-blue-600 font-medium">ยกตัวอย่าง:</p>
            <p class="mt-2">
              รางวัลที่ 1: <span class="font-semibold text-green-900">4 ใบ</span><br />
              รางวัลที่ 2: <span class="font-semibold text-green-900">2 ใบ</span><br />
              รางวัลที่ 3: <span class="font-semibold text-green-900">1 ใบ</span>
            </p>
            <p class="mt-4">
              <span class="font-semibold text-yellow-900 ">โปรดทราบว่า </span> <span class="font-semibold text-purple-900 "> รางวัลเกมวีคปกติ จากตั๋ว VIP อาจมีการเปลี่ยนเเปลงเป็น เงินรางวัล ได้ในอนาคต ขึ้นอยู่กับจำนวนผู้เล่นที่เข้ามาร่วมสนับสนุนเราครับ</span>
            </p>
            <p class="mt-2 text-gray-600">
              ทางเราเป็นน้องใหม่ในวงการและอาจไม่ได้มีทุนมาก จึงขออภัยหากไม่สามารถ ตั้งต้น เงินรางวัลได้สูง เราพร้อมที่จะพัฒานาเพื่อให้ทุกท่านได้รับประสบการณ์ที่ดีที่สุด ครับ
            </p>
            <p class="mt-4 font-semibold">
              <span class="font-semibold text-purple-900 ">ขอบพระคุณเป็นอย่างยิ่งที่สนับสนุนเรา </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isNavigating: false,
      type: null,
    };
  },
  methods: {
    route_back() {
      if (!this.isNavigating) {
        this.isNavigating = true;
        this.$router.go(-1);
        setTimeout(() => {
          this.isNavigating = false;
        }, 1000);
      }
    },
  },
  created() {
    this.type = this.$route.params.type;
  },
}
</script>

<style scoped>
.contant_style {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.shsojvp {
  position: absolute;
  top: 0;
  left: 0;
  margin: 3px;
}

.text-gray-800 {
  color: #2d3748;
}

.text-gray-600 {
  color: #718096;
}

.text-blue-600 {
  color: #3182ce;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.text-sm {
  font-size: 0.875rem;
}
</style>
