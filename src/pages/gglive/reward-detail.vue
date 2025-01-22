<template>
  <div>
    <div>
      <LodingSceen :loading="loading" />
    </div>
    <div class="contant_style relative" v-if="gameWeek && gameWeekID > 6">
      <!-- ปุ่มback -->
      <div class="absolute top-0 left-0 m-3 flex items-center cursor-pointer shsojvp text-gray-200"
        @click="route_back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
          class="svg-white mr-1 ml-2 mt-1">
          <path
            d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
            fill="black" transform="matrix(-1 0 0 1 24 0)"></path>
        </svg>
        <span class="text-gray-800 font-bold text-xs mt-1">back</span>
      </div>

      <!-- VIP Rewards -->
      <div class="justify-center items-center h-74 mt-3" v-if="type === 'VIP'">
        <div>
          <span class="text-gray-800 text-xl font-bold">Reward Detail <span class="text-yellow-400">VIP</span></span>
          <p class="m-1 text-xs">
            <span class="font-semibold text-yellow-900">Please Note:</span>
            <span class="font-semibold text-purple-900">
              Rewards may increase at any time depending on the number of players supporting us.
            </span>
          </p>
          <table class="table-auto text-xs w-full mt-1 text-gray-600">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Rank</th>
                <th class="px-4 py-2 text-left">Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Rank 1</td>
                <td class="border px-4 py-2">{{ gameWeek.reward.toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 2</td>
                <td class="border px-4 py-2">{{ (gameWeek.reward * 0.1).toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 3</td>
                <td class="border px-4 py-2">{{ (gameWeek.reward * 0.05).toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 4</td>
                <td class="border px-4 py-2">100.00</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 5</td>
                <td class="border px-4 py-2">100.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- N Rewards -->
      <div class="justify-center items-center h-74 mt-3" v-if="type === 'N'">
        <div>
          <span class="text-gray-800 text-xl font-bold">Reward Details <span
              class="text-gray-400">(Normal)</span></span>
          <table class="table-auto text-xs w-full mt-1 text-gray-600">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Rank</th>
                <th class="px-4 py-2 text-left">Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Rank 1</td>
                <td class="border px-4 py-2">{{ gameWeek.reward2 }} tickets</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 2</td>
                <td class="border px-4 py-2">2 tickets</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 3</td>
                <td class="border px-4 py-2">1 ticket</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 4</td>
                <td class="border px-4 py-2">1 ticket</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Rank 5</td>
                <td class="border px-4 py-2">1 ticket</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="contant_style relative" v-if="gameWeekID <= 6">
      <div class="absolute top-0 left-0 m-3 flex items-center cursor-pointer shsojvp text-gray-200"
        @click="route_back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
          class="svg-white mr-1 ml-2 mt-1">
          <path
            d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
            fill="black" transform="matrix(-1 0 0 1 24 0)"></path>
        </svg>
        <span class="text-gray-800 font-bold text-xs mt-1">back</span>
      </div>

      <div class=" justify-center items-center h-74 mt-3" v-if="type == 'VIP'">
        <div>
          <span class="text-gray-800 text-2xl font-bold">Reward Detail <span class="text-yellow-400"> VIP
            </span></span>
          <div class="mt-4 px-6 text-gray-600">
            <p>
              สำหรับGame VIP รางวัลที่ 1 จะได้รับเงินรางวัลเต็มจำนวนที่ปรากฏอยู่หน้าGameนั้น ๆ
            </p>
            <p class="mt-2">
              รางวัลที่ 2 จะได้รับ 10% ของรางวัลที่ 1 และรางวัลที่ 3 จะได้รับ 5% ของรางวัลที่ 1
            </p>
            <p class="mt-4 text-sm text-blue-600 font-medium">ยกตัวอย่าง:</p>
            <p class="mt-2">
              รางวัลที่ 1: <span class="font-semibold text-green-900">500,000 </span><br />
              รางวัลที่ 2: <span class="font-semibold text-green-900">50,000 </span><br />
              รางวัลที่ 3: <span class="font-semibold text-green-900">25,000 </span>
            </p>
            <p class="mt-4">
              <span class="font-semibold text-yellow-900 ">โปรดทราบว่า </span> <span
                class="font-semibold text-purple-900 "> รางวัลอาจมีการaddขึ้นได้ตลอดเวลา
                ขึ้นอยู่กับจำนวนผู้เล่นที่เข้ามาร่วมสนับสนุนเรา</span>
            </p>
            <p class="mt-2 text-gray-600">
              ทางเราเป็นน้องใหม่ในวงการและอาจไม่ได้มีทุนมาก จึงขออภัยหากไม่สามารถ ตั้งต้น เงินรางวัลได้สูง
              เราพร้อมที่จะพัฒานาเพื่อให้ทุกท่านได้รับประสบการณ์ที่ดีที่สุด ครับ
            </p>
            <p class="mt-4 font-semibold">
              <span class="font-semibold text-purple-900 ">ขอบพระคุณเป็นอย่างยิ่งที่สนับสนุนเรา </span>
            </p>
          </div>
        </div>
      </div>
      <div class=" justify-center items-center h-74 mt-3" v-if="type == 'N'">
        <div>
          <span class="text-gray-800 text-2xl font-bold">Reward Detail <span class="text-gray-400"> (ปกติ)
            </span></span>
          <div class="mt-4 px-6 text-gray-600">
            <p>
              สำหรับGame ปกติ รางวัลที่ 1 จะได้รับเป็นตั๋วการเเข่ง VIP เต็มจำนวนที่ปรากฏอยู่หน้าGameนั้น ๆ
            </p>

            <p class="mt-4 text-sm text-blue-600 font-medium">ยกตัวอย่าง:</p>
            <p class="mt-2">
              รางวัลที่ 1: <span class="font-semibold text-green-900">4 </span><br />
              รางวัลที่ 2: <span class="font-semibold text-green-900">2 </span><br />
              รางวัลที่ 3: <span class="font-semibold text-green-900">1 </span>
            </p>
            <p class="mt-4">
              <span class="font-semibold text-yellow-900 ">โปรดทราบว่า </span> <span
                class="font-semibold text-purple-900 "> รางวัลGame free จากตั๋ว VIP อาจมีการเปลี่ยนเเปลงเป็น เงินรางวัล
                ได้ในอนาคต ขึ้นอยู่กับจำนวนผู้เล่นที่เข้ามาร่วมสนับสนุนเราครับ</span>
            </p>
            <p class="mt-2 text-gray-600">
              ทางเราเป็นน้องใหม่ในวงการและอาจไม่ได้มีทุนมาก จึงขออภัยหากไม่สามารถ ตั้งต้น เงินรางวัลได้สูง
              เราพร้อมที่จะพัฒานาเพื่อให้ทุกท่านได้รับประสบการณ์ที่ดีที่สุด ครับ
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
import { api } from '@axios_inst';
export default {
  data() {
    return {
      loading: false,
      isNavigating: false,
      type: null,
      gameWeek: null,
      gameWeekID: null,
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
    async getGameWeekByid(gameWeekID) {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await api.get(`/premier-league/v1/game-week/${gameWeekID}`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
        });
        if (response.data.ok) {
          this.gameWeek = response.data.gameWeek;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.type = this.$route.params.type;
    this.gameWeekID = this.$route.params.id;
    this.getGameWeekByid(this.gameWeekID);
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

.table-auto {
  border-collapse: collapse;
  width: 100%;
}

.border {
  border: 1px solid #dddddd;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.text-left {
  text-align: left;
}

.shsojvp {
  position: absolute;
  top: 0;
  left: 0;
}
</style>