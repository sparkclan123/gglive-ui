<template>
    <div>
        <div class="tabs rounded-t-lg ml-3 text-white  flex">
            <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="activeTab = 'tab1'">เกมวีคปกติ
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="activeTab = 'tab2'">เกมวีค VIP
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="activeTab = 'tab3'">กติกา</div>
        </div>
        <div class=" rounded-xl shadow-lg  min-h-screen  bg-white">

            <div class="">
                <div v-if="activeTab === 'tab1'">
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
                                            ฤดูการ</div>
                                    </div>
                                    <p class="text-lg font-bold text-green-600">100,000 บาท</p>
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
                                            Transaction</p>
                                    </th>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p
                                            class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                            Amount</p>
                                    </th>
                                    <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p
                                            class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                            Date</p>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="p-1 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg"
                                                alt="Spotify"
                                                class="inline-block relative object-center !rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1">
                                            <p
                                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                                Spotify</p>
                                        </div>
                                    </td>
                                    <td class="p-1 border-b border-blue-gray-50">
                                        <p
                                            class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                            $2,500</p>
                                    </td>
                                    <td class="p-1 border-b border-blue-gray-50">
                                        <p
                                            class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                            Wed 3:00pm</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td class="p-1 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <img src="https://docs.material-tailwind.com/img/logos/logo-amazon.svg"
                                                alt="Amazon"
                                                class="inline-block relative object-center !rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1">
                                            <p
                                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                                Amazon</p>
                                        </div>
                                    </td>
                                    <td class="p-1 border-b border-blue-gray-50">
                                        <p
                                            class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                            $5,000</p>
                                    </td>
                                    <td class="p-1 border-b border-blue-gray-50">
                                        <p
                                            class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                            Wed 1:00pm</p>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if="activeTab === 'tab2'">
                    <!-- Content for Tab 2 -->
                    Content for Tab 2
                </div>
                <div v-if="activeTab === 'tab3'">
                    <!-- Content for Tab 3 -->
                    Content for Tab 3
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
export default {
    name: 'challenge',

    data() {
        return {
            activeTab: 'tab1'
        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async facthPlayerListGameWeek() {
            // try {
            //     const access_token = localStorage.getItem('access_token');
            //     const response = await api.get(`/premier-league/v1/game-week-player-user-detail/${this.id}`, {
            //         headers: {
            //             'Authorization': `Bearer ${access_token}`
            //         },
            //     });
            //     if (response.data.ok) {
            //         const datas = response.data.playerGame;
            //         this.getGKP = datas.filter(player => player.position === 'G').sort((a, b) => a.sort - b.sort);
            //         this.getDEF = datas.filter(player => player.position === 'D').sort((a, b) => a.sort - b.sort);
            //         this.getMID = datas.filter(player => player.position === 'M').sort((a, b) => a.sort - b.sort);
            //         this.getFWD = datas.filter(player => player.position === 'F').sort((a, b) => a.sort - b.sort);
            //         this.getMain = response.data.playerGameMain;
            //         this.updateLoading(false);
            //     }
            // } catch (error) {
            //     console.log(error);
            //     this.updateLoading(false);
            // }
        }

    },
    computed: {

    },
    created() {
        this.updateLoading(false);
        this.facthPlayerListGameWeek()
    }
};
</script>

<style scoped>
.colot-h {
    color: #1e1037;
}


.tabs {
    display: flex;
    font-size: 0.7rem;
}

.tab-item {
    margin-right: 3px;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #37003c;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

}

.tab-item.active {
    background-color: white;
    color: rgb(0, 0, 0);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.no-top-left-radius {
    border-top-left-radius: 0;
}

.glow-border {
    position: relative;
}

.glow-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, rgba(255, 255, 0, 0.6), rgba(255, 255, 0, 0.3));
    z-index: -1;
    filter: blur(4px);
    opacity: 0.75;
    border-radius: inherit;
}
</style>
