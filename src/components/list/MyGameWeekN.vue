<template>
    <div>
        <div class="cus-bg-card text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer" 
            v-for="data in datas" @click="seeDetailAndEdit(data)">
            <div class="flex items-center font-semibold justify-between">
                <div class="flex items-center space-x-1">
                    <div class=" w-7 h-7  ">
                        <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                    </div>
                    <div class="text-sm ">ฤดูกาล {{ data.season }} เกมวีค {{ data.week }}
                        <DateFormatted :dateString="data.created_at" />
                    </div>
                </div>
                <div class="flex items-center space-x-4" v-if="data.is_vip">
                    <div class="text-orange-600 font-bold cursor-pointer">
                        VIP
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="mt-4 text-gray-800  text-xs space-x-4">
                    ชื่อทีม: {{ data.name }}
                </div>
                <div class="mt-4 text-gray-800 font-bold  text-sm space-x-4">
                    คะเเนนรวม: <span class="text-green-800"> {{ data.total_point }} </span>
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
    computed: {
    },
    methods: {
      
        async fetchDataMyGameWeek(page = 1, limit = 10) {
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player-user-n', {
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
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                console.log(error);
                this.$emit('set-loading', false);
            }
        },
        seeDetailAndEdit(data) {
            if (!data) {
                return;
            }
            let id = data.id;
            this.$router.push({ name: 'pitch-detail-n', params: { id } });
        },
    },
    created() {
       
        this.fetchDataMyGameWeek();
    },

};
</script>

<style scoped>
.cus-bg-card {
    background-color: #f6f6f6;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #8341ca;
    transition: box-shadow 0.3s ease;
}
</style>