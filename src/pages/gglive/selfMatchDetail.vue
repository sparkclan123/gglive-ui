<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div class="contant_style">
            <div v-if="selfMatch && gameWeek" class="fixcontant">
                <div class="card cursor-pointer">
                    <div class="top-section">
                        <div class="icons">
                            <div class="absolute top-0 left-0 m-3 flex items-center cursor-pointer shsojvp text-gray-200"
                                @click="route_back()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
                                    class="svg-white mr-1">
                                    <path
                                        d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                                        fill="white" transform="matrix(-1 0 0 1 24 0)"></path>
                                </svg>

                                <span class="text-gray-200 font-bold text-xs">กลับ</span>
                            </div>

                        </div>
                    </div>
                    <div class="bottom-section">

                        <span class="titlesm text-sm text-yellow-300">{{ selfMatch.name }}
                        </span>
                        <span class="title text-green-500">
                            <!-- <NumberDisplay :number="gameWeek.reward" /> บาท -->
                        </span>
                        <div class="row row1">
                            <div class="item">
                                <span class="big-text text-gray-200">เกมวีค {{ gameWeek.week }} </span>
                                <span class="regular-text text-gray-200">(คะเเนน)</span>
                            </div>
                            <div class="item_2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" width="36" height="36"
                                    fill="none" @click="addTeamInMatch" viewBox="0 0 183 183" id="add">
                                    <g filter="url(#filter0_iiii_2_67)">
                                        <path fill="url(#paint0_linear_2_67)"
                                            d="M125.29 0H57.7102C25.886 0 0 25.9278 0 57.7521V125.29C0 157.114 25.886 183 57.7102 183H125.29C157.114 183 183 157.114 183 125.29V57.7521C183 25.9278 157.114 0 125.29 0V0ZM131.897 98.9438C131.897 99.7383 131.27 100.407 130.475 100.407H100.031C99.2365 100.407 98.5674 101.035 98.5674 101.829V132.274C98.5674 133.068 97.9401 133.737 97.1456 133.737H86.6908C85.8963 133.737 85.2271 133.068 85.2271 132.274V101.829C85.2271 101.035 84.5999 100.407 83.8053 100.407H53.3611C52.5665 100.407 51.9392 99.7383 51.9392 98.9438V88.489C51.9392 87.6945 52.5665 87.0672 53.3611 87.0672H83.8053C84.5999 87.0672 85.2271 86.4399 85.2271 85.6453V55.2011C85.2271 54.4065 85.8963 53.7374 86.6908 53.7374H97.1456C97.9401 53.7374 98.5674 54.4065 98.5674 55.2011V85.6453C98.5674 86.4399 99.2365 87.0672 100.031 87.0672H130.475C131.27 87.0672 131.897 87.6945 131.897 88.489V98.9438Z">
                                        </path>
                                    </g>
                                    <defs>
                                        <linearGradient id="paint0_linear_2_67" x1="28.03" x2="95.248" y1="22.752"
                                            y2="170.035" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#50F"></stop>
                                            <stop offset="1" stop-color="#EB01FF"></stop>
                                        </linearGradient>
                                        <filter id="filter0_iiii_2_67" width="200" height="197" x="-7" y="-4"
                                            color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape">
                                            </feBlend>
                                            <feColorMatrix in="SourceAlpha" result="hardAlpha"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                            <feOffset dx="5" dy="5"></feOffset>
                                            <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                                            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic">
                                            </feComposite>
                                            <feColorMatrix
                                                values="0 0 0 0 0.995833 0 0 0 0 0.951851 0 0 0 0 0.951851 0 0 0 0.25 0">
                                            </feColorMatrix>
                                            <feBlend in2="shape" result="effect1_innerShadow_2_67"></feBlend>
                                            <feColorMatrix in="SourceAlpha" result="hardAlpha"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                            <feOffset dx="-7" dy="-4"></feOffset>
                                            <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                                            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic">
                                            </feComposite>
                                            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0">
                                            </feColorMatrix>
                                            <feBlend in2="effect1_innerShadow_2_67" result="effect2_innerShadow_2_67">
                                            </feBlend>
                                            <feColorMatrix in="SourceAlpha" result="hardAlpha"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                            <feOffset dx="10" dy="10"></feOffset>
                                            <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
                                            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic">
                                            </feComposite>
                                            <feColorMatrix
                                                values="0 0 0 0 0.895833 0 0 0 0 0.73309 0 0 0 0 0.73309 0 0 0 0.25 0">
                                            </feColorMatrix>
                                            <feBlend in2="effect2_innerShadow_2_67" result="effect3_innerShadow_2_67">
                                            </feBlend>
                                            <feColorMatrix in="SourceAlpha" result="hardAlpha"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                            <feOffset dx="10" dy="10"></feOffset>
                                            <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                                            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic">
                                            </feComposite>
                                            <feColorMatrix
                                                values="0 0 0 0 0.941667 0 0 0 0 0.745486 0 0 0 0 0.745486 0 0 0 0.2 0">
                                            </feColorMatrix>
                                            <feBlend in2="effect3_innerShadow_2_67" result="effect4_innerShadow_2_67">
                                            </feBlend>
                                        </filter>
                                    </defs>
                                </svg>

                                <!-- <span class="regular-text text-gray-200">เพิ่มทีม</span> -->
                            </div>
                            <div class="item">
                                <span class="big-text text-gray-200">{{ season.label }}</span>
                                <span class="regular-text text-gray-200">ฤดูกาล</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="p-4 overflow-scroll px-0">
                    <table class="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                                    <div class="flex items-center">
                                        <img class="w-4 h-4" src="/public/assets/logonew32x32.png" />
                                        <p
                                            class="ml-2 block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                            ชื่อทีม
                                        </p>
                                    </div>
                                </th>
                                <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                        คะเเนน</p>
                                </th>
                                <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                                    <p
                                        class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                        วันที่</p>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in games" :key="i">
                                <td class="p-1 border-b border-blue-gray-50 cursor-pointer">
                                    <div class="flex items-center gap-3">
                                        <img :src="data.image_url ? data.image_url : '/public/assets/logo.webp'"
                                            alt="userimage"
                                            class="inline-block relative object-center  rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain ">
                                        <p
                                            class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                            {{ data.name }}</p>
                                    </div>
                                </td>
                                <td class="p-1 border-b border-blue-gray-50 pl-4">
                                    <p class="block antialiased text-xs leading-normal text-green-800  font-bold">
                                        {{ data.total_point }}</p>
                                </td>
                                <td class="p-1 border-b border-blue-gray-50">
                                    <p
                                        class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                        <DateFormatted :dateString="data.created_at" />
                                    </p>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination :page="page" :pages="pages" @page-change="fetchSelfMatchSubByID" />
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
        async addTeamInMatch() {
            this.$router.push({ name: 'self-match-detail-pick' });
        },
        route_back() {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.$router.go(-1);
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            }
        },
        async fetchSelfMatchSubByID(page = 1, limit = 10) {
            try {
                this.loading = true;
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/self_match/${this.matchID}/${this.gameWeekID}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.games = response.data.games;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.selfMatch = response.data.selfMatch;
                    this.gameWeek = response.data.gameWeek;
                    this.season = response.data.season;
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        copyToClipboard(code) {
            navigator.clipboard.writeText(code).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    text: 'The code has been copied to clipboard.',
                    timer: 1500,
                    showConfirmButton: false
                });
            }).catch(err => {
                console.log('Something went wrong', err);
            });
        },

    },
    created() {
        this.matchID = this.$route.params.id;
        this.gameWeekID = this.$route.params.gameWeekID;
        this.fetchSelfMatchSubByID();
    }
};
</script>


<style scoped>
.contant_style {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
}

.fixcontant {
    position: relative;
    background-color: white;
    padding-bottom: 1px;
    border-radius: 11px;
}

.card {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(to bottom, #1e1037, #432b6e);
    padding: 5px;
    overflow: hidden;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.card .top-section .icons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
}

.card .top-section .icons .logo {
    height: 100%;
    aspect-ratio: 1;
    padding: 7px 0 7px 15px;
}

.card .top-section .icons .logo .top-section {
    height: 100%;
}

.card .top-section .icons .social-media {
    height: 100%;
    padding: 8px 15px;
    display: flex;
    gap: 7px;
}

.card .top-section .icons .social-media .svg {
    height: 100%;
    fill: #1e1037;
}


.card .bottom-section {
    margin-top: 1px;
    padding: 10px 5px;
}

.card .bottom-section .titlesm {
    display: block;
    font-size: 10px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 1px;
}

.card .bottom-section .title {
    display: block;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 1px;
}

.card .bottom-section .row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.card .bottom-section .row .item {
    flex: 30%;
    text-align: center;
    padding: 5px;
    color: rgba(255, 255, 255, 0.721);
}

.card .bottom-section .row .item_2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
}

.card .bottom-section .row .item_2 .regular-text {
    font-size: 12px;
}


.card .bottom-section .row .item .big-text {
    font-size: 15px;
    display: block;
}

.card .bottom-section .row .item .regular-text {
    font-size: 12px;
}

.card .bottom-section .row .item:nth-child(2) {
    border-left: 1px solid rgba(255, 255, 255, 0.126);
    border-right: 1px solid rgba(255, 255, 255, 0.126);
}

.shsojvp {
    font-weight: bold;
}
</style>