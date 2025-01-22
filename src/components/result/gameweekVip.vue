<template>
    <div class="flex flex-col items-center">
        <div class="flex justify-center w-full m-1 mt-2">
            <img class="w-8 h-8" src="/public/assets/logonew.png" />

            <span class="mt-1 font-semibold text-gray-600">Game <span class="text-yellow-500">VIP</span></span>
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 mt-1" viewBox="0 0 512 512" width="20" height="20"
                id="star">
                <polygon fill="#ffd759"
                    points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4">
                </polygon>
                <polygon fill="#fabd3b" points="256 256 6 200.5 137 320.1"></polygon>
                <polygon fill="#fabd3b" points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"></polygon>
                <polygon fill="#fabd3b" points="256 256 506 198.6 375.9 319.2"></polygon>
                <polygon fill="#fabd3b" points="255.3 17.9 256 256 329.7 178.9"></polygon>
            </svg>
        </div>
        <div class="mt-2 w-full" v-if="data.datas">
            <div class="cus-bg-card  text-gray-700  flex flex-col rounded-xl shadow-lg p-2 mb-5 mr-5 ml-5 cursor-pointer"
                v-for="data in data.datas" @click="seeDetailGameWeek(data)">
                <div class="flex items-center justify-between font-semibold">
                    <div class="flex items-center space-x-1">
                        <div class=" w-7 h-7  ">
                            <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                        </div>
                        <div class="text-sm ">season {{ data.season.label }} Game {{ data.week }} <i
                                class="fas fa-ticket-alt text-yellow-400"></i>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="mt-4 text-gray-700  text-xs space-x-4">
                        DetailGame VIP
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
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #e8b201;
    transition: box-shadow 0.3s ease;
}
</style>