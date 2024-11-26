<template>
    <div class="rules-container">
        <div class="rule-title">
            <strong>กติกาการนับคะแนน</strong>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>ปรับกติกาตั่งเเต่วีค 13 เป็นต้นไป</strong>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>การเปลี่ยนแปลงคะแนน</strong>
            </div>3. เปลี่ยนแปลงกติกาการให้คะแนน จะอ้างอิงคะแนนจาก Fantasy Premier League (รวมคะแนนโบนัสด้วย) และหาก Fantasy Premier League มีการเปลี่ยนแปลงคะแนน หลังจากประกาศผลการแข่งขันประจำสัปดาห์ไปแล้ว จะถือการตัดสินของ PuDee เป็นที่สิ้นสุด จะไม่มีการเปลี่ยนแปลงคะแนนและผลรางวัลใหม่
            <div class="rule">
                <strong>-</strong>  <span class="">เปลี่ยนแปลงกติกาการให้คะแนน จะอ้างอิงคะแนนจาก Fantasy Premier League (รวมคะแนนโบนัสด้วย)</span>.
            </div>
            <div class="rule">
                <strong>-</strong> หาก Fantasy Premier League มีการเปลี่ยนแปลงคะแนน <span class="rule-strong-red">หลังจากที่ PuDee</span> ประกาศผลการแข่งขันประจำสัปดาห์แล้ว <span class="rule-strong-red">การตัดสินของ PuDee จะถือเป็นที่สิ้นสุด</span>.
            </div>
            <div class="rule">
                <strong>-</strong> จะไม่มีการเปลี่ยนแปลงคะแนนและผลรางวัลใหม่หลังการตัดสินสิ้นสุด.
            </div>
        </div>
    </div>
</template>

<style scoped>
.rules-container {
    font-size: 14px;
    line-height: 1.6;
    padding: 15px;
    border-radius: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
}

.section {
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.section-title {
    font-size: 16px;
    margin-bottom: 10px;
    color: #3b1956;
    font-weight: bold;
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
    font-size: 18px;
    margin-bottom: 10px;
    color: #3b1956;
    font-weight: bold;
    text-align: center;
}
</style>
