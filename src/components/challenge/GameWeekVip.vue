<template>
    <div v-if="gameWeek" class="p-1">
        <div class="card cursor-pointer">
            <div class="bottom-section  ">
                <div class="flex items-center justify-center ">
                    <span class="titlesm text-sm text-yellow-300">รางวัลอันดับ 1</span>
                    <button class="bg-yellow-400 px-1 py-0 rounded text-xs ml-2" style="color: black;"
                        @click="rewardDetail">
                        คลิ๊กดูรายละเอียด
                    </button>
                </div>
                <span class="title text-green-500">
                    <NumberDisplay :number="gameWeek.reward" /> 
                </span>

                <div class="row row1">
                    <div class="item">
                        <span class="big-text text-gray-200">เกมวีค {{ gameWeek.week }} <i
                                class="fas fa-ticket-alt text-yellow-400"></i></span>
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
                    <tr v-for="data in datas" :key="i">
                        <td class="p-1 border-b border-blue-gray-50 cursor-pointer"
                            @click="seeDetail(data.id, data.user_id)">
                            <div class="flex items-center gap-3">
                                <img :src="data.image_url ? data.image_url : '/public/assets/logo.webp'" alt="userimage"
                                    class="inline-block relative object-center  rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain ">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                    {{ data.name }}</p>
                            </div>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 pl-4 text-left">
                            <p class="block antialiased text-xs leading-normal text-green-800  font-bold">
                                {{ data.total_point }}</p>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 text-left">
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
    <div v-else>
        <div v-show="showCommingSoon" class="group duration-500  ">
            <div
                class=" relative rounded-md  h-36   bg-gradient-to-r from-zinc-900 to-zinc-700  text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-neutral-700 before:right-3 before:top-0 before:w-72 before:h-32 before:-z-10">
                <span class="text-3xl font-bold">Comming Soon </span>
                <p class="text-amber-300 font-thin">- new game week -</p>
            </div>
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
            showCommingSoon: false,
            season: null,
            gameWeek: null,
            maxTotalPoint: 0,
            avgTotalPoint: 0,
            datas: [],
            total: 0,
            page: 1,
            limit: 30,
            pages: 1,
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        rewardDetail() {
            this.$router.push({ name: 'reward-detail', params: { id: this.gameWeek.id, type: "VIP" } });
        },
        async facthPlayerListGameWeek(page = 1, limit = 30) {
            this.showCommingSoon = false;
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/challenge-list`, {
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
                    this.$emit('set-loading', false);
                    if (this.gameWeek === null) {
                        setTimeout(() => {
                            this.showCommingSoon = true;
                        }, 5000);
                    }
                    // this.updateLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                this.$emit('set-loading', false);
                setTimeout(() => {
                    this.showCommingSoon = true;
                }, 1000);

                // this.updateLoading(false);
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
                console.log(response.data.ok);
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
                            name: 'challenge-detail',
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

        this.facthPlayerListGameWeek()
    }
};
</script>

<style scoped>
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