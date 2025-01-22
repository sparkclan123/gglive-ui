<template>
    <div>
        <div class="flex justify-end mb-5" v-if="getUsername != null">
            <div @click="callalance()"
                class="flex items-center bg-white bg-opacity-30 hover:bg-opacity-100 backdrop-filter backdrop-blur-sm rounded-lg shadow-xl px-5 py-2 text-gray-600 text-xs mr-2">
                <span class="text-gray-800 text-xs mr-1">{{ getUsername }}:</span>
                <span class="text-yellow-700 text-xs font-bold">C
                    <Numberformat :value="getBalance" :decimal="2" />
                </span>
            </div>
        </div>

        <div class="flex justify-start gap-2 mb-5">

            <button @click="$router.push('/lobby')"
                class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                <i class="fas fa-gamepad mr-2"></i> เกมall
            </button>
            <button
                class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                <i class="fas fa-fire mr-2"></i> เกมสุดฮ๊อท
            </button>
            <button @click="$router.push('/history')"
                class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                <i class="fas fa-history mr-2"></i> ประวัติ
            </button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            loadmenu: false,

        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        // ...mapActions('balance', ['facthBalance']),
        callalance() {
            this.facthBalance()
        }
    },
    computed: {
        ...mapGetters('balance', ['getBalance', 'getUsername'])
    },



}
</script>