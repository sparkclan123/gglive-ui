<template>
    <div v-if="gameWeek">
        <div class="card cursor-pointer">
            <div class="bottom-section">
                <span class="titlesm text-sm text-yellow-300">เงินรางวัลอันดับ 1</span>
                <span class="title text-green-500">
                    <NumberDisplay :number="gameWeek.reward" /> บาท
                </span>
                <div class="row row1">
                    <div class="item">
                        <span class="big-text text-gray-200">เกมวีค {{ gameWeek.week }}</span>
                        <span class="regular-text text-gray-200">(คะเเนน)</span>
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
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                ชื่อทีม</p>
                        </th>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                คะเเนน</p>
                        </th>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                วันที่</p>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in datas" :key="i">
                        <td class="p-1 border-b border-blue-gray-50 cursor-pointer" @click="seeDetail(data.id)">
                            <div class="flex items-center gap-3">
                                <img :src="data.image_url ? data.image_url : '/public/assets/logo.webp'" alt="userimage"
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
        <Pagination :page="page" :pages="pages" @page-change="facthPlayerListGameWeek" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
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
            limit: 10,
            pages: 1,
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async facthPlayerListGameWeek(page = 1, limit = 10) {
            try {
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
                    this.updateLoading(false);
                }
            } catch (error) {
                console.log(error);
                this.updateLoading(false);
            }
        },
        seeDetail(id) {
            this.$router.push({
                name: 'challenge-detail',
                params: {
                    id: id
                }
            });
        }
    },
    computed: {

    },
    created() {
        this.updateLoading(true);
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