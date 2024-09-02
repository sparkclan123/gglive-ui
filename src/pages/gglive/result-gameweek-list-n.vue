<template>
    <div class="contant_style">
        <div v-if="gameWeek" class="fixcontant">

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
                <div class="bottom-section ">

                    <div class="flex items-center justify-center mt-2">
                        <span class="titlesm text-sm text-yellow-300">รางวัลอันดับ 1</span>
                        <button class="bg-yellow-400 px-1 py-0 rounded text-xs ml-2" style="color: black;"
                            @click="rewardDetail">
                            ดูรายละเอียด
                        </button>
                    </div>
                    <span class="title text-green-500">
                        <NumberDisplay :number="gameWeek.reward2" /> ใบ
                    </span>
                    <div class="row row1">
                        <div class="item">
                            <span class="big-text text-gray-200">เกมวีค {{ gameWeek.week }}</span>
                            <span class="regular-text text-gray-200">
                                <Numberformat :value="total" :decimal="0" /> (ทีม)
                            </span>
                        </div>
                        <div class="item">
                            <span class="big-text text-green-400">{{ maxTotalPoint }} สูงสุด</span>
                            <span class="regular-text text-yellow-400">{{ avgTotalPoint }} เฉลี่ย</span>
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
                            <th
                                class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 text-center font-normal opacity-7 text-xs">
                                #
                            </th>
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
                        <tr v-for="(data, i) in datas" :key="i"
                            :class="data.user_id == userinfo.UserID ? 'bg-blue-100' : ''">
                            <td class="p-0 border-b border-blue-gray-50 text-center">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
                                    {{ (page - 1) * limit + i + 1 }}
                                </p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50 cursor-pointer"
                                @click="seeDetail(data.id, data.user_id)">
                                <div class="flex items-center gap-3">
                                    <div class="relative inline-block w-8 h-8">
                                        <!-- รูปโปรไฟล์หลัก -->
                                     
                                        <img :src="data.image_url ? data.image_url : '/public/assets/logo.webp'"
                                            alt="userimage"
                                            class="  w-8 h-8  border border-blue-gray-50  object-contain">

                                        <!-- กรอบโปรไฟล์ (อยู่ทับบนรูปโปรไฟล์หลัก) -->
                                        <img v-if="data.rank_p != ''"
                                            :src="'https://pudee.sgp1.digitaloceanspaces.com/' + data.rank_p + '.png'" alt="rankframe"
                                            class="absolute inset-0 w-full h-full object-contain">
                                    </div>
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
            <Pagination :page="page" :pages="pages" @page-change="facthPlayerListGameWeek" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            season: null,
            gameWeek: null,
            maxTotalPoint: 0,
            avgTotalPoint: 0,
            datas: [],
            total: 0,
            page: 1,
            limit: 100,
            pages: 1,
            gameWeekID: this.$route.params.gameWeekID,
            isNavigating: false
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        rewardDetail() {
            this.$router.push({ name: 'reward-detail', params: { id: this.gameWeek.id, type: "N" } });
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
        async facthPlayerListGameWeek(page = 1, limit = 100) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/result-gameweek-n/${this.gameWeekID}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.datas = response.data.data;
                    this.gameWeek = response.data.gameWeek;
                    this.season = response.data.season;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.maxTotalPoint = response.data.maxTotalPoint;
                    this.avgTotalPoint = response.data.avgTotalPoint;
                    this.updateLoading(false);
                }
            } catch (error) {
                console.log(error);
                this.updateLoading(false);
            }
        },
        async seeDetail(id, user_id) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/time-now-server`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });

                if (response.data.ok) {
                    const timeNow = new Date(response.data.date_now);
                    const timeEnd = new Date(this.gameWeek.end_date);

                    if (timeEnd >= timeNow && user_id != this.userinfo.UserID) {
                        Swal.fire({
                            title: 'ไม่สามารถดูข้อมูลได้',
                            text: 'กรุณารอสิ้นสุดการจัดทีมเพื่อดูนักเตะของทีมอื่น',
                            customClass: {
                                cancelButton: 'btn-cancel',
                                popup: 'popup-custom',
                                title: 'text-custom',
                                htmlContainer: 'text-custom'
                            },
                        });
                        return;
                    } else {
                        this.$router.push({
                            name: 'challenge-detail-n',
                            params: {
                                id: id
                            }
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                });
            }

        }
    },
    computed: {
        ...mapGetters('auth', ['userinfo']),
    },
    created() {
        this.updateLoading(true);
        this.facthPlayerListGameWeek()
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