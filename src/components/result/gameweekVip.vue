<template>
    <div class="flex flex-col items-center">
        <div class="flex justify-center w-full m-1">
            <img class="w-8 h-8" src="/public/assets/logonew.png" /><span class="mt-1 font-semibold text-gray-600">เกมวีค <span class="text-yellow-500">VIP</span></span> 
        </div>
        <div class="mt-2 w-full" v-if="data.datas">
            <div class="cus-bg-card font-semibold text-gray-700  flex flex-col rounded-xl shadow-lg p-2 mb-5 mr-5 ml-5 cursor-pointer"
                 v-for="data in data.datas" @click="seeDetailGameWeek(data)">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-1">
                        <div class=" w-7 h-7  ">
                            <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                        </div>
                        <div class="text-sm ">ฤดูกาล {{ data.season.label }} เกมวีค {{ data.week }} <i class="fas fa-ticket-alt text-yellow-400"></i>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="mt-4 text-gray-700  text-xs space-x-4">
                        รายละเอียดเกมวีค VIP 
                    </div>
                    <div class="mt-4 text-gray-700 font-bold  text-sm space-x-4">
                         <Numberformat class="text-green-400" :value="data.reward" :decimal="1" /> {{ data.who_win }}
                    </div>
                </div>

            </div>
            <Pagination :page="data.page" :pages="data.pages" @page-change="fetchGameWeeks" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        fetchGameWeeks: {
            type: Function,
            required: true
        }
    },
    methods: {
        seeDetailGameWeek(data) {
            this.$router.push({
                name: 'result-list-gameweek',
                params: {
                    gameWeekID: data.id
                }
            });
        }
    }
};
</script>
<style scoped>
.cus-bg-card {
    background-color: #f6f6f6;
    border-radius: 10px;
    box-shadow: 2px 4px 2px #e8b201;
    transition: box-shadow 0.3s ease;
}
</style>