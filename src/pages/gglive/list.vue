<template>
    <div>
        <!-- component -->
        <div class="cus-bg-card text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer" v-for="data in datas">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="rounded-full w-5 h-5  ">
                        <img class="w-5 h-5 rounded-full" src="/public/assets/favicon-32x32.png" />
                    </div>
                    <div class="text-md font-bold">ฤดูการ {{ data.season }} เกมวีค {{ data.week }}</div>
                </div>
                <div class="flex items-center space-x-4" v-if="data.is_vip">
                    <div class="text-orange-600 font-bold cursor-pointer">
                        VIP
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="mt-4 text-gray-800 font-bold text-sm space-x-4">
                    ชื่อทีม: {{ data.name }}
                </div>
                <div class="mt-4 text-gray-800 font-bold text-sm space-x-4">
                    คะเเนนรวม: {{ data.total_point }}
                </div>
            </div>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="fetchDataMyGameWeek" />
    </div>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            datas: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async fetchDataMyGameWeek(page = 1, limit = 10) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player-user', {
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
        },
    },
    created() {
        this.updateLoading(true);
        this.fetchDataMyGameWeek();
    },

};
</script>

<style scoped>

.cus-bg-card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    transition: box-shadow 0.3s ease; 
}
.cus-bg-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}

</style>