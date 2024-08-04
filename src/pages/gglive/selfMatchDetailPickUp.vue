<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div class="contant_style">
            <div class="back-button" @click="route_back()">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
                    class="svg-white mr-1">
                    <path
                        d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                        fill="black" transform="matrix(-1 0 0 1 24 0)"></path>
                </svg>
                <span class="text-gray-200 font-bold text-xs">กลับ</span>
            </div>
            <div class="mt-5">
                <div class="text-gray-200 font-bold text-xs">รายละเอียดการเเข่งขันของคุณ</div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            gameWeekID: null,
            matchID: null,
            loading: false,
            games: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
            selfMatch: {},
            isNavigating: false,
            gameWeek: null,
            season: null,
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
};
</script>

<style scoped>
.contant_style {
    position: relative;
    background-color: white;
    border-radius: 10px;
    padding: 5px;
}

.back-button {
    position: absolute;
    top: 0;
    left: 0;
    margin: 3px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #cccccc;
}

.back-button svg {
    margin-right: 5px;
}

.text-gray-200 {
    color: #0d0d0d; /* เปลี่ยนเป็นสีที่เหมาะสม */
}

.font-bold {
    font-weight: bold;
}

.text-xs {
    font-size: 0.75rem;
}
</style>
