<template>
    <div>
        <div class="cus-bg-card text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer"
            v-for="data in datas">
            <div class="flex items-center font-semibold justify-between">
                <div class="flex items-center space-x-1">
                    <div class=" w-7 h-7  ">
                        <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                    </div>
                    <div class="text-sm ">season {{ data.season }} Game {{ data.week }} <i
                            class="fas fa-ticket-alt text-yellow-400"></i>
                        <DateFormatted :dateString="data.created_at" class="font-thin " />
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
                    name: {{ data.name }}
                </div>

            </div>
            <div class="flex items-center justify-between">

                <div class="mt-1 text-gray-800   text-sm space-x-1">
                    <!-- @click="selectSelf(data.id)" -->
                    <button @click="selectSelf(data.id, 'VIP', data.name)"
                        class="bg-green-800 text-white px-2 py-1 rounded text-xs">Select</button>
                    <button @click="seeDetailAndEdit(data)"
                        class="bg-yellow-800 text-white px-2 py-1 rounded text-xs">Detail</button>
                </div>
            </div>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="fetchDataMyGameWeek" />
    </div>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            datas: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
            matchID: null
        };
    },
    computed: {
    },
    methods: {
        async selectSelf(id, type, name) {
            
            const result = await Swal.fire({
                title: 'Select',
                text: 'you want to select : ' + name + ' ?',
                showCancelButton: true,
                confirmButtonText: 'yes',
                cancelButtonText: 'cancel',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });

            if (!result.isConfirmed) {
                return;
            }


           
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/self_match_sub-pick`,
                    {
                        game_main_id: id,
                        type: type,
                        self_match_id:  parseInt(this.matchID)

                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    }
                );
                if (response.data.ok) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Select Success',
                        timer: 1500,
                        showConfirmButton: false,
                        customClass: {
                            cancelButton: 'btn-cancel',
                            confirmButton: 'btn-confirm',
                            popup: 'popup-custom',
                            title: 'text-custom',
                            htmlContainer: 'text-custom'
                        },
                    });
                    this.$emit('set-loading', false);
                    this.$emit('router-back');
                    
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: error.response.data.error,
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        confirmButton: 'btn-confirm',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                });

                this.$emit('set-loading', false);
            }
        },
        async fetchDataMyGameWeek(page = 1, limit = 10) {
            try {
                this.$emit('set-loading', true);
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
            this.$router.push({ name: 'pitch-detail', params: { id } });
        },
    },
    created() {
        this.matchID = this.$route.params.id;
        this.fetchDataMyGameWeek();
    },

};
</script>

<style scoped>
.cus-bg-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #e8b201;
}
</style>