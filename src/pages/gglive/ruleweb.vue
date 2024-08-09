<template>
    <div>
        <div class="content-style">
            <div class="flex justify-center items-center h-8">
                <span class="text-gray-800 text-2xl font-bold">กติกาการจัดอันดับผู้เล่น</span>
            </div>
            <div class="mt-4 px-6 text-gray-600">
                <p>
                    - อันดับของผู้เล่นที่ทำการจัดทีมจะถูกจัดเรียงตาม  <span class="text-green-900"> คะแนน </span>จากสูงสุดไปยังต่ำสุด ในกรณีที่ผู้เล่นหลายคนมี<span class="text-green-900"> คะแนน </span>สูงสุดเท่ากัน ระบบจะทำการจัดลำดับโดยพิจารณาจากจำนวนเงินที่ใช้ในการจัดทีม ผู้เล่นที่ใช้เงินน้อยกว่าจะได้รับการจัดอันดับที่สูงกว่า
                </p>
                <p class="mt-4">
                    - หากยังมีผู้เล่นที่มี<span class="text-green-900"> คะแนน </span>และจำนวนเงินที่ใช้ในการจัดทีมเท่ากัน ระบบจะจัดลำดับโดยยึดตามเวลาที่ทำการส่งทีมเข้าแข่งขัน <span class="text-red-900"> โดยการแก้ไขตัวนักเตะในทีมหลังจากที่ส่งทีมแล้วจะถือว่ามีการอัปเดตเวลาการส่งทีมเข้าแข่งขันใหม่ </span>
                </p>
                <p class="mt-4 font-semibold">
                    - ขอบคุณที่สนับสนุนเรา เราจะพยายามอย่างเต็มที่เพื่อให้ทุกท่านได้สนุกสนานไปกับการจัดการแข่งของท่าน
                </p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.content-style {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
}

.text-gray-800 {
    color: #2d3748;
}

.text-gray-600 {
    color: #718096;
}

.font-bold {
    font-weight: 700;
}

.font-semibold {
    font-weight: 600;
}

.mt-4 {
    margin-top: 1rem;
}

.px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}
</style>
