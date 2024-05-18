<template>
    <div class="player-selection bg-color-2 p-4 shadow-lg h-full overflow-y-auto text-gray-200 mt-2 mb-4 rounded-lg shadow-xl">
        <h2 class="text-xl font-bold mb-4">Player Selection</h2>
        <div class="mb-4">
            <input type="text" placeholder="Search for player..." class="p-2 border rounded w-full text-gray-600">
        </div>
        <div class="mb-4">
            <select class="p-2 border rounded w-full text-gray-600">
                <option>View</option>
                <option>Defenders</option>
                <option>Midfielders</option>
                <option>Forwards</option>
            </select>
        </div>
        <div class="mb-4">
            <select class="p-2 border rounded w-full text-gray-600" >
                <option>Sorted by</option>
                <option>Total points</option>
                <option>Price</option>
            </select>
        </div>
        <div class="mb-4">
            <input type="number" placeholder="Max cost" class="p-2 border rounded w-full text-gray-600">
        </div>
        <div class="player-list">
            <div class="player-item p-2 border-b flex justify-between">
                <div>White</div>
                <div>£6.1m</div>
            </div>
            <div class="player-item p-2 border-b flex justify-between">
                <div>Saliba</div>
                <div>£5.9m</div>
            </div>
            <!-- Add more players as needed -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerSelection'
}
</script>

<style>
.bg-color-2 {
    background-color: #2f4453;
}
</style>