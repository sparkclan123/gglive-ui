<template>
    <div>
        <div class="cus-bg-card text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer"
            v-for="data in datas" @click="seeDetailAndEdit(data)">
            <div class="flex items-center font-semibold justify-between">
                <div class="flex items-center space-x-1">
                    <div class=" w-7 h-7  ">
                        <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                    </div>
                    <div class="text-xs ">season {{ data.season }} Game {{ data.week }}
                        <DateFormatted :dateString="data.created_at" class="font-thin text-[10px]" />
                    </div>

                </div>
                <div class="flex items-center">
                    <button v-if="gameWeek && gameWeek.id == data.week_id"
                        class="text-gray-600 bg-orange-300 font-bold text-[8px] px-1 py-1 rounded-full shadow-lg hover:bg-orange-500 cursor-pointer mr-1"
                        @click.stop="edit(data.id)">
                        EditFast
                    </button>
                    <button v-if="gameWeek && gameWeek.id == data.week_id"
                        class="text-gray-600 bg-red-300 font-bold text-[8px] px-2 py-1 rounded-full shadow-lg hover:bg-red-500 cursor-pointer"
                        @click.stop="edit_new(data.id)">
                        EditDetail
                    </button>
                </div>
                <!-- <svg  @click.stop="edit_new(data.id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" id="edit">
                    <path fill="#5E94FF" fill-rule="evenodd"
                        d="M4 4.75C3.30964 4.75 2.75 5.30964 2.75 6V20C2.75 20.6904 3.30964 21.25 4 21.25H18C18.6904 21.25 19.25 20.6904 19.25 20V9.5C19.25 9.08579 19.5858 8.75 20 8.75C20.4142 8.75 20.75 9.08579 20.75 9.5V20C20.75 21.5188 19.5188 22.75 18 22.75H4C2.48122 22.75 1.25 21.5188 1.25 20V6C1.25 4.48122 2.48122 3.25 4 3.25H14.5C14.9142 3.25 15.25 3.58579 15.25 4C15.25 4.41421 14.9142 4.75 14.5 4.75H4Z"
                        clip-rule="evenodd"></path>
                    <path fill="#5E94FF"
                        d="M20.5303 1.46967C20.2375 1.17678 19.7626 1.17678 19.4697 1.46967L11.4697 9.46967C11.3874 9.552 11.3253 9.65237 11.2885 9.76283L10.2885 12.7628C10.1987 13.0323 10.2688 13.3295 10.4697 13.5303C10.6706 13.7312 10.9677 13.8013 11.2372 13.7115L14.2372 12.7115C14.3476 12.6747 14.448 12.6127 14.5304 12.5303L22.5303 4.53033C22.8232 4.23744 22.8232 3.76256 22.5303 3.46967L20.5303 1.46967Z">
                    </path>
                    <path fill="#5485E5" fill-rule="evenodd"
                        d="M21.5303 2.46966L20.5303 1.46967C20.2375 1.17678 19.7626 1.17678 19.4697 1.46967L11.4697 9.46967C11.3874 9.552 11.3253 9.65237 11.2885 9.76283L10.2885 12.7628C10.1987 13.0323 10.2688 13.3295 10.4697 13.5303L21.5303 2.46966Z"
                        clip-rule="evenodd"></path>
                    <path fill="#5485E5" fill-rule="evenodd"
                        d="M12 21.25V22.75H4C2.48122 22.75 1.25 21.5188 1.25 20V6C1.25 4.48122 2.48122 3.25 4 3.25H12V4.75H4C3.30964 4.75 2.75 5.30964 2.75 6V20C2.75 20.6904 3.30964 21.25 4 21.25H12Z"
                        clip-rule="evenodd"></path>
                </svg> -->
                <div class="flex items-center space-x-4" v-if="data.is_vip">
                    <div class="text-orange-600 font-bold cursor-pointer">
                        VIP
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="mt-4 text-gray-800  text-xs space-x-4">
                    name: {{ data.name }}
                </div>
                <div class="mt-4 text-gray-800   text-sm space-x-4">
                    pointรวม: <span class="text-green-800"> {{ data.total_point }} </span>
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
    props: ['gameWeek'],
    data() {
        return {
            datas: [],
            total: 0,
            page: 1,
            limit: 50,
            pages: 1,
        };
    },
    computed: {
    },
    methods: {
        edit(id) {
            this.$router.push({ name: 'pitch-detail-edit', params: { id: id, type: "N" } });
        },
        edit_new(id) {
            this.$router.push({ name: 'pitch-detail-edit-new', params: { id: id, type: "N" } });
        },
        async fetchDataMyGameWeek(page = 1, limit = 50) {
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
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #3e434b;
    transition: box-shadow 0.3s ease;
}
</style>