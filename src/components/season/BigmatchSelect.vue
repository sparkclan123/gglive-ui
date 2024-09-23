<template>
    <!-- Content for Tab 1 -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4 animate-scale-up">
        <div class="bg-color-h p-6 text-center bg-img cursor-pointer rounded-lg shadow-inner">
            <h2 class="text-2xl mb-2 text-gray-100">
                <span>เตรียมพบกับการจัดทีมเเบบคู่</span><br/>
                <span>BIG MATCH 1vs1 เร็วๆนี้</span>
            </h2>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.bg-color-h {
    background-color: #1e293b;
    position: relative;
    border-radius: 15px;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.15);
    background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transition: background 1s ease;
}

.text-gray-100 {
    color: #f3f4f6;
}

h2 {
    font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
    letter-spacing: 0.75px;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.6; /* เพิ่ม line-height เพื่อให้ข้อความดูเป็นระเบียบ */
    word-break: break-word; /* ตัดคำหากยาวเกินไป */
}

.shadow-lg {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.shadow-inner {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
}


</style>
