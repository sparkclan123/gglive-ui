<template>
    <div class="rules-container">
        <div class="rule-title">
            <strong>กติกาการนับคะเเนน</strong>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>คะแนนลงเล่น</strong>
            </div>
            <div class="rule">
                <strong>-</strong> ถ้าลงเล่น 1-59 นาที <span class="rule-strong"> 1 คะแนน </span>
            </div>
            <div class="rule">
                <strong>-</strong> ถ้าลงเล่น 60 นาทีขึ้นไป <span class="rule-strong"> เพิ่มอีก 1 คะแนน </span>
            </div>
            <div class="rule">
                <strong>-</strong> คะแนนโบนัสสำหรับนักเตะที่เล่นดี แมนออฟเดอะแมทต์จะได้ <span class="rule-strong"> 3
                    คะแนน (เราอ้างอิงจากเว็ป whoscored)</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>คะแนนทำประตู</strong>
            </div>
            <div class="rule">
                <strong>-</strong> ผู้รักษาประตูหรือกองหลังทำประตูได้ จะได้ลูกละ <span class="rule-strong"> 6 คะแนน
                </span>
            </div>
            <div class="rule">
                <strong>-</strong> กองกลางทำประตูได้ จะได้ลูกละ <span class="rule-strong"> 5 คะแนน </span>
            </div>
            <div class="rule">
                <strong>-</strong> กองหน้าทำประตูได้ จะได้ลูกละ <span class="rule-strong"> 4 คะแนน</span>
            </div>
            <div class="rule">
                <strong>-</strong> แอสซิสให้เพื่อนทำประตู จะได้ลูกละ <span class="rule-strong"> 3 คะแนน </span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>คะแนนไม่เสียประตู</strong>
            </div>
            <div class="rule">
                <strong>-</strong> ผู้รักษาประตูหรือกองหลังไม่เสียประตู (และลงเล่นเกิน 60 นาที) จะได้ <span
                    class="rule-strong"> 4 คะแนน </span>ต่อคน
            </div>
            <div class="rule">
                <strong>-</strong> กองกลางไม่เสียประตู (และลงเล่นเกิน 60 นาที) จะได้ <span class="rule-strong"> 1 คะแนน
                </span>ต่อคน
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>คะแนนจุดโทษ</strong>
            </div>
            <div class="rule">
                <strong>-</strong> ผู้รักษาประตูเซฟลูกโทษ จะได้ <span class="rule-strong"> 5 คะแนน </span>
            </div>
            <div class="rule">
                <strong>-</strong> ยิงลูกโทษไม่เข้า โดนหัก <span class="rule-strong-red"> 2 คะแนน </span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>คะแนนเสียประตู</strong>
            </div>
            <div class="rule">
                <strong>-</strong> ผู้รักษาประตูหรือกองหลังหากเสียประตูทุก 2 ลูก จะโดนหัก <span class="rule-strong-red">
                    1 คะแนน</span>
            </div>
            <div class="rule">
                <strong>-</strong> ทำเข้าประตูตัวเอง จะโดนหัก <span class="rule-strong-red"> 2 คะแนน </span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>คะแนนใบเหลือง</strong>
            </div>
            <div class="rule">
                <strong>-</strong>โดนใบเหลือง จะโดนหัก <span class="rule-strong-red"> 1 คะแนน </span>
            </div>
            <div class="rule">
                <strong>-</strong> โดนใบแดง จะโดนหัก <span class="rule-strong-red"> 3 คะแนน </span>
                (ทั้งแดงโดยตรงและใบเหลืองที่ 2)
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>กรณีกับตันทีม x2</strong>
            </div>
            <div class="rule">
                <strong>-</strong> หากได้คะเเนนมากกว่า 0 จะทำการ x2 กรณีตั้งนักเเตะเป็นกับตันทีม
            </div>
            <div class="rule">
                <strong>-</strong> หากเป็นคะเเนนติดลบ จะไม่ถูก x2 ติดลบ กรณีตั้งนักเเตะเป็นกับตันทีม, แต่จะถูกหักคะเเนนตามปกติ
            </div>
        </div>
    </div>
</template>

<style scoped>
.rules-container {
    font-size: 13px;
    line-height: 1.6;
    padding: 5px;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.section {
    margin-bottom: 20px;
}

.section-title {
    font-size: 14px;
    margin-bottom: 10px;
    color: #3b1956;
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
