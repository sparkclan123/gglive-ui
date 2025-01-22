<template>
    <div class="rules-container m-2">
        <div class="rule-title">
            <strong>Ruleการสะสมและแลกคะแนน</strong>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>การสะสมคะแนน</strong>
            </div>
            <div class="rule">
                <strong>-</strong> คะแนนที่คุณสะสมจะไม่มีวันหมดอายุและสามารถสะสมได้จากการจัดteamแฟนตาซี
            </div>
            <div class="rule">
                <strong>-</strong> หากคุณได้อันดับที่ 1 ของวีคในโหมดปกติ คุณจะได้รับ <span class="rule-strong">20 คะแนน</span>
            </div>
            <div class="rule">
                <strong>-</strong> หากคุณได้อันดับที่ 1 ของวีคในโหมด VIP คุณจะได้รับ <span class="rule-strong">50 คะแนน</span>
            </div>
            <div class="rule">
                <strong>-</strong> คุณสามารถสะสมคะแนนaddเติมผ่านการเล่นเกมเก็บคะแนนต่าง ๆ
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>การแลกคะแนน</strong>
            </div>
            <div class="rule">
                <strong>-</strong> เมื่อคุณแลกคะแนน ระบบจะให้กรอกชื่อ ที่อยู่ และเบอร์โทรศัพท์ เพื่อใช้ในการจัดส่งของรางวัล
            </div>
            <div class="rule">
                <strong>-</strong> หลังจากแลกคะแนนและConfirmข้อมูลการจัดส่งแล้ว เราจะจัดส่งของรางวัลให้ท่านภายใน <span class="rule-strong">1 วันทำการ</span> และจะส่งเลขพัสดุให้ท่านเพื่อตรวจสอบสถานะการจัดส่ง
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <strong>นโยบายความเป็นส่วนตัว</strong>
            </div>
            <div class="rule">
                <strong>-</strong> ทางเราขอสงวนสิทธิ์ในการปกปิดข้อมูลส่วนบุคคลของท่าน ไม่ว่าจะเป็นชื่อ ที่อยู่ หรือเบอร์โทรศัพท์ เพื่อรักษาความปลอดภัยและความเป็นส่วนตัว
            </div>
            <div class="rule">
                <strong>-</strong> หลังจากทำการจัดส่งของรางวัลแล้ว ทางเราจะลบข้อมูลส่วนบุคคลของท่านออกจากระบบ เพื่อป้องกันการนำข้อมูลไปใช้ในทางที่ไม่เหมาะสม
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
