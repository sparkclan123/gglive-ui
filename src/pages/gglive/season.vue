<template>
    <div class="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white p-2">
        <!-- Header -->
        <div class=" p-4 text-center rounded-lg">
            <h1 class="text-2xl font-bold colot-h">PuDee Challenge <span
                    class="text-sm text-white bg-black px-2 py-1 rounded">กติกา</span></h1>
        </div>

        <!-- Content -->
        <div class="bg-white px-2 py-4 rounded-lg">
            <!-- Card 1 -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4 ">
                <div class="bg-color-h sha p-8 text-center bg-img-h cursor-pointer">
                    <h2 class="text-xl font-bold mb-2">The 2023/24 Season has finished</h2>
                    <p>Fantasy Challenge will be back in July 2024.</p>
                </div>
            </div>

             <!-- Card 1 -->
             <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4 ">
                <div class="bg-color-h sha p-8 text-center bg-img-h">
                    <h2 class="text-xl font-bold mb-2">The 2023/24 Season has finished</h2>
                    <p>Fantasy Challenge will be back in July 2024.</p>
                </div>
            </div>

             <!-- Card 1 -->
             <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4 ">
                <div class="bg-color-h sha p-8 text-center bg-img-h">
                    <h2 class="text-xl font-bold mb-2">The 2023/24 Season has finished</h2>
                    <p>Fantasy Challenge will be back in July 2024.</p>
                </div>
            </div>

             <!-- Card 1 -->
             <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4 ">
                <div class="bg-color-h sha p-8 text-center bg-img-h">
                    <h2 class="text-xl font-bold mb-2">The 2023/24 Season has finished</h2>
                    <p>Fantasy Challenge will be back in July 2024.</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'FantasyChallenge',
};
</script>



<style scoped>
.bg-color-h {
    background-color: #1e1037;
}

.colot-h {
    color: #1e1037;
}

.bg-img-h {
    flex: 1 1 0%;
    background-image: url(/public/assets/bgChc.png);
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 198px 131px;
}
</style>