<template>
    <div class="rules-container">
        <div class="rule-title">
            <strong>กติกาการนับคะเเนน</strong>
        </div>
        
        <div class="rule">
            <strong>-</strong> นักเตะที่ลงสนามสตาร์ทเป็นตัวจริง <span class="rule-strong"> 1 คะแนน </span>
        </div>
        <div class="rule">
            <strong>-</strong> โกล์/กองหลัง ทำประตู <span class="rule-strong"> 6 คะแนน </span> , กองกลางทำประตู <span
                class="rule-strong"> 5 คะแนน </span>, กองหน้าทำประตู <span class="rule-strong"> 4 คะแนน</span>
        </div>
        <div class="rule">
            <strong>-</strong> จ่ายบอลให้เพื่อนทำประตูได้ (Assist) <span class="rule-strong"> 3 คะแนน </span>
        </div>
        <div class="rule">
            <strong>-</strong> ผู้รักษาประตูไม่เสียประตู (ไม่ถูกเปลี่ยนตัวก่อนนาทีที่ 60) <span class="rule-strong"> 4
                คะแนน </span>,
            กองหลังไม่เสียประตู (ไม่ถูกเปลี่ยนตัวก่อนนาทีที่ 60) <span class="rule-strong"> 4 คะแนน </span>,
            กองกลางไม่เสียประตู
            (ไม่ถูกเปลี่ยนตัวก่อนนาทีที่ 60) <span class="rule-strong"> 1 คะแนน </span>
        </div>
        <div class="rule">
            <strong>-</strong> ผู้รักษาประตูเซฟลูกจุดโทษได้ <span class="rule-strong"> 5 คะแนน </span>, ผู้เล่นคนไหน
            ยิงจุดโทษพลาด <span class="rule-strong-red"> -2 คะแนน </span>
        </div>
        <div class="rule">
            <strong>-</strong> โดนใบเหลือง <span class="rule-strong-red"> -1 คะแนน </span>, โดนใบแดง <span
                class="rule-strong-red"> -3 คะแนน </span> (ทั้งแดงโดยตรงและใบเหลืองที่2)
        </div>
        <div class="rule">
            <strong>-</strong> ยิงเข้าประตูตัวเอง <span class="rule-strong-red"> -2 คะแนน </span>
        </div>
        <div class="rule">
            <strong>-</strong> ทุกๆการเสีย 2 ประตูของโกล์/กองหลัง <span class="rule-strong-red"> -1 คะแนน</span>
        </div>
    </div>
</template>

<style scoped>
.rules-container {
    font-size: 13px;
    line-height: 1.6;
    /* margin: 10px; */
    padding: 5px;
    /* border: 1px solid #ccc; */
    border-radius: 10px;
    background-color: #f9f9f9;
}

.rule {
    margin-bottom: 10px;
    color: #581c86;
}

.rule-strong {
    font-weight: bold;
    color: #1c8625;
}

.rule-strong-red {
    font-weight: bold;
    color: #861c1c;
}

.rule strong {
    color: #581c86;
}

.rule-title {
    font-size: 16px;
    margin-bottom: 10px;
    color: #3b1956;
}
</style>