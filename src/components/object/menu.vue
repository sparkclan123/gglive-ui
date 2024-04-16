<template>
    <div class="flex justify-start gap-2 mb-5">
        <button @click="$router.push('/lobby')"
            class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
            <i class="fas fa-gamepad mr-2"></i> เกมทั้งหมด
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
</template>

<script>
export default{
    data() {

    },

}
</script>