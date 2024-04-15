<template>
    <div class="container mx-auto p-4 mt-2">
        <!-- Top row for buttons -->
        <div class="flex justify-start gap-2 mb-5">
            <button
                class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                <i class="fas fa-gamepad mr-2"></i> เกมทั้งหมด
            </button>
            <button
                class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                <i class="fas fa-fire mr-2"></i> เกมสุดฮ๊อท
            </button>
            <button
                class="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                <i class="fas fa-history mr-2"></i> ประวัติ
            </button>
        </div>

        <!-- Existing card grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <div class="card relative bg-white rounded-lg overflow-hidden" v-for="card in cards" :key="card.id">
                <!-- Red tag and heart icon -->
                <div class="absolute top-0 left-0 bg-red-500 text-white text-xs uppercase font-semibold px-2 py-1">
                    New!
                </div>
                <div class="absolute top-2 right-2 flex flex-col items-center">
                    <i class="fa fa-heart text-white text-lg shadow-md"></i>
                    <span class="text-white text-xs">{{ card.likes }}</span>
                </div>

                <!-- Image with rounded corners -->
                <img class="w-full h-48 object-cover rounded-lg" :src="card.image" alt="Card image">

                <!-- Button with reduced font weight -->
                <button
                    class="absolute inset-x-2 bottom-2 mx-auto block w-auto bg-white bg-opacity-30 hover:bg-opacity-50 text-white py-2 px-2 border border-white border-opacity-20 rounded transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs font-semibold">
                    เล่นทันที
                </button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            cards: [
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                {
                    id: 1,
                    image: 'https://public.aty7j.com/pages/static/image/en/NewWebGameBg/mahjong-ways/WGBG-1d97f008.jpg',
                    likes: 152
                },
                // ... add more card objects here
            ]
        }
    }
}
</script>
<style></style>