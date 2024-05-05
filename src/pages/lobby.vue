<template>


    <!-- <img src="/public/assets/loading.svg" alt="Loading" /> -->
    <!-- Top row for buttons -->
    <!-- Existing card grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <div class="card relative bg-white rounded-lg overflow-hidden shadow-xl" v-for="game in gameList"
            :key="game.id">
            <!-- Red tag and heart icon -->
            <div class="absolute top-0 left-0 bg-red-500 text-white text-xs uppercase font-semibold px-2 py-1">
                New!
            </div>
            <div class="absolute top-2 right-2 flex flex-col items-center">
                <i class="fa fa-heart text-white text-lg shadow-md"></i>
                <span class="text-white text-xs">{{ game.likes }}</span>
            </div>

            <!-- Image with rounded corners -->
            <img class="w-full h-48 object-cover rounded-lg" :src="game.property" alt="Card image">

            <!-- Button with reduced font weight -->
            <button @click="openGame(game)"
                class="absolute inset-x-2 bottom-2 mx-auto block w-auto bg-white bg-opacity-30 hover:bg-opacity-50 text-white py-2 px-2 border border-white border-opacity-20 rounded transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs font-semibold">
                เล่นทันที
            </button>
        </div>
    </div>

</template>


<script>

import { mapGetters, mapActions } from 'vuex'
import { api, apiMine } from '@axios_inst';
export default {
    data() {
        return {
            gameList: [],
            openedWindow: null,
            startGame: false
        }
    },
    computed: {
        ...mapGetters('balance', ['getUsername'])
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async getGamelists() {
            this.updateLoading(true);
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                await api.get('/user/m/game-list', {
                    headers: { 'Authorization': `Bearer ${access_token}` },
                })
                    .then(response => {
                        this.updateLoading(false);
                        if (response.data.status === 'ok') {

                            const sortedData = response.data.data.sort((a, b) => {
                                return a.sort_order - b.sort_order;
                            });

                            this.gameList = sortedData;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching game list:', error);
                        this.updateLoading(false);
                    });
            } else {
                this.updateLoading(false);
            }
        },
        async openGame(game) {
            if (this.startGame) {
                return;
            }
            this.startGame = true;

            let data = {
                game_id: game.id
            }
            let gameUrl = null;
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                switch (game.name_en) {
                    case 'mine':

                        await apiMine.post('/mine/create-validate-token', data, {
                            headers: { 'Authorization': `Bearer ${access_token}` },
                        })
                            .then(response => {
                                if (response.data.status === 'ok') {
                                    gameUrl = `${game.url}?username=${this.getUsername}&uuid=${response.data.uuid}`;
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching open game:' + game.name_en, error);

                            });
                        break;
                    case 'fish':
                        apicall = apiMine;
                        break;
                    default:
                        apicall = apiMine;
                        break;
                }

                if (gameUrl) {

                    window.open(gameUrl, '_blank');
                    setTimeout(() => {
                        this.startGame = false;
                    }, 2000);
                }else{
                    this.startGame = false;
                }


            } else {

            }

            // if (this.startGame) {
            //     return;
            // }
            // this.startGame = true;

            // const gameUrl = `${game.url}?token=${encodeURIComponent(access_token)}`;

            // window.open(gameUrl, '_blank');
            // setTimeout(() => {
            //     this.startGame = false;
            // }, 2000);

        }

    },
    created() {
        this.updateLoading(true);
        this.getGamelists();
    }
}
</script>
<style></style>