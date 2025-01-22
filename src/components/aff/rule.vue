<template>
    <div class="rules-container m-5">
        <div class="rule-title">
            <strong>Ruleพันธมิตร</strong>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>ส่วนลดพิเศษสำหรับลูกteam</strong>
            </div>
            <div class="rule">
                <strong>-</strong> หากหัวหน้าteamของคุณชนะเป็นอันดับที่ 1 ในหมวด VIP ลูกteamจะได้รับส่วนลด <span
                    class="rule-strong">10%</span> สำหรับการสนับสนุนตั๋ว VIP ในGameถัดไป
            </div>
            <div class="rule">
                <strong>-</strong> หากหัวหน้าteamของคุณชนะเป็นอันดับที่ 2 ในหมวด VIP ลูกteamจะได้รับส่วนลด <span
                    class="rule-strong">5%</span> สำหรับการสนับสนุนตั๋ว VIP ในGameถัดไป
            </div>
            <div class="rule">
                <strong>-</strong> หากหัวหน้าteamของคุณชนะเป็นอันดับที่ 3 ในหมวด VIP ลูกteamจะได้รับส่วนลด <span
                    class="rule-strong">2%</span> สำหรับการสนับสนุนตั๋ว VIP ในGameถัดไป
            </div>
            <div class="rule">
                <strong>-</strong> ส่วนลดนี้จะสิ้นสุดเมื่อGameถัดไปปิดการจัดteam
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>เเต้มสะสมสำหรับหัวหน้าteam</strong>
            </div>
            <div class="rule">
                <strong>-</strong> หัวหน้าteamจะได้รับ <span class="rule-strong">1 แต้ม</span>
                สำหรับทุกตั๋วที่สมาชิกสนับสนุน
            </div>
            <div class="rule">
                <strong>-</strong> เมื่อสะสมครบ <span class="rule-strong">100 แต้มขึ้นไป</span> สามารถแลกเปลี่ยนเป็นตั๋ว
                VIP ได้ หรือสามารถสอบถามข้อมูลaddเติมเกี่ยวกับของรางวัลอื่น ๆ ที่มีมูลค่าเทียบเท่ากับจำนวนแต้ม
                โดยไม่จำกัดประเภทของรางวัล โดยติดต่อteamงานผ่านทาง <span class="rule-strong">Line</span> หรือ <span
                    class="rule-strong">Facebook Fanpage</span>
              
            </div>

            <div class="rule">
                <strong>-</strong> <strong>เมื่อเลือกหัวหน้าteamเเล้วจะไม่สามารถเปลี่ยนเเปลงได้</strong>
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
