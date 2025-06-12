<template>
  <div class="rules-container">
    <div class="rule-title">
      <strong>กติกา Fantasy FIFA Club World Cup 2025</strong>
    </div>

    <div class="section">
      <div class="section-title">
        <strong>การจัดตัวผู้เล่น</strong>
      </div>
      <div class="rule">
        - ผู้เล่นสามารถจัดตัวได้ <span class="rule-strong">11 คน</span> ต่อ Match Day.
      </div>
      <div class="rule">
        - จำกัดจำนวนผู้เล่นจากสโมสรเดียวกันในแต่ละรอบ ดังนี้:
        <ul>
          <li>Match Day 1–3 (รอบแรก): สโมสรละไม่เกิน <strong>3 คน</strong></li>
          <li>Match Day 4 (รอบ 16 ทีม): สโมสรละไม่เกิน <strong>3 คน</strong></li>
          <li>Match Day 5 (รอบ 8 ทีม): สโมสรละไม่เกิน <strong>4 คน</strong></li>
          <li>Match Day 6 (รอบรองชนะเลิศ): สโมสรละไม่เกิน <strong>5 คน</strong></li>
          <li>Match Day 7 (รอบชิงชนะเลิศ): สโมสรละไม่เกิน <strong>7 คน</strong></li>
        </ul>
      </div>
    </div>

    <div class="section">
      <div class="section-title">
        <strong>การนับคะแนน</strong>
      </div>
      <div class="rule">
        - การให้คะแนนจะอิงจาก <span class="rule-strong">ระบบ Fantasy ของ FIFA Club World Cup 2025</span>.
      </div>
      <div class="rule">
        - หากมีการเปลี่ยนแปลงคะแนนจากแหล่งอ้างอิงหลังจากที่ PuDee ประกาศผลแล้ว <span class="rule-strong-red">จะยึดผลที่ PuDee ประกาศไว้เป็นที่สิ้นสุด</span>.
      </div>
      <div class="rule">
        - จะไม่มีการแก้ไขคะแนนหรือผลรางวัลย้อนหลังหลังจากการประกาศ.
      </div>
    </div>

    <div class="section">
      <div class="section-title">
        <strong>ข้อกำหนดอื่น ๆ</strong>
      </div>
      <div class="rule">
        - การตัดสินของทีมงาน <span class="rule-strong-red">PuDee ถือเป็นที่สิ้นสุด</span>ในทุกกรณี.
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
