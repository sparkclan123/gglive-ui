<template>
    <div v-if="gameWeek">
        <div class="w-full rounded-b-lg p-1 shadow-md relative">
            <div class="text-center">

                <div class="flex justify-between mt-1">
                    <div class="text-center mx-2">

                    </div>
                    <div class="text-center mx-2">
                        <div class="flex justify-center items-center mt-2 text-lg font-bold text-green-800">
                            <p class="text-md mr-2">เงินรางวัลที่ 1</p>
                            <div
                                class="bg-yellow-500 text-white py-1 px-2 rounded-md text-sm mr-2 shadow-lg transform transition-transform duration-200 hover:scale-105 glow-border">
                                ฤดูการ {{ season.label }}</div>
                        </div>
                        <p class="text-xs font-bold text-gray-600">เกมวีค {{gameWeek.week }} </p><p class="text-lg font-bold text-green-600"> {{gameWeek.reward}} บาท</p>
                    </div>
                    <div class="text-center mx-2">

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
                        <td class="p-1 border-b border-blue-gray-50">
                            <div class="flex items-center gap-3">
                                <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg" alt="Spotify"
                                    class="inline-block relative object-center !rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                    {{data.name}}</p>
                            </div>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 pl-4">
                            <p
                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                {{data.total_point}}</p>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50">
                            <p
                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                 <DateFormatted :dateString="data.created_at"/></p>
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
            season : null,
            gameWeek: null,
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
                    this.updateLoading(false);
                }
            } catch (error) {
                console.log(error);
                this.updateLoading(false);
            }
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