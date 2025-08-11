<template>
  <div class="rules-container">
    <div class="rule-title">
      <strong>กติกา PuDee Fantasy Football</strong>
    </div>

    <div class="section">
      <div class="section-title"><strong>การจัดตัวผู้เล่น</strong></div>
      <div class="rule">
        - ผู้เล่นสามารถจัดตัวได้ <span class="rule-strong">11 คน</span> ต่อรอบการแข่งขัน (Game Week/Match Day).
      </div>
    </div>

    <div class="section">
      <div class="section-title"><strong>การนับคะแนน</strong></div>
      <div class="rule">
        - <strong>EPL</strong> : การให้คะแนนอ้างอิงจากระบบ Fantasy ของ <span class="rule-strong">Fantasy Premier League (FPL)</span>.
      </div>
      <div class="rule">
        - <strong>UCL</strong> : การให้คะแนนอ้างอิงจากระบบ Fantasy ของ <span class="rule-strong">UEFA Gaming</span>.
      </div>
      <div class="rule">
        - <strong>FA Cup, FIFA Day และรายการอื่น ๆ</strong> :
        การให้คะแนนคิดตาม <span class="rule-strong">ตารางการคิดคะแนนที่กำหนดโดย PuDee</span>
        โดยยึดผลการแข่งขันจากแอปพลิเคชัน <span class="rule-strong">FotMob</span>.
      </div>
      <div class="rule">
        - หากมีการเปลี่ยนแปลงคะแนนจากแหล่งอ้างอิงหลังจากที่ PuDee ประกาศผลแล้ว
        <span class="rule-strong-red">จะยึดผลที่ PuDee ประกาศไว้เป็นที่สิ้นสุด</span>.
      </div>
      <div class="rule">- จะไม่มีการแก้ไขคะแนนหรือผลรางวัลย้อนหลังหลังจากการประกาศ.</div>
    </div>

    <!-- รูปประกอบกติกา -->
    <div class="section">
      <div class="section-title"><strong>รูปประกอบกติกา</strong></div>
      <div class="rule-images">
        <img
          class="rule-img"
          src="https://pudee.sgp1.digitaloceanspaces.com/rule2.jpg"
          alt="รูปประกอบกติกา 1"
          loading="lazy"
        />
        <img
          class="rule-img"
          src="https://pudee.sgp1.digitaloceanspaces.com/rule1.jpg"
          alt="รูปประกอบกติกา 2"
          loading="lazy"
        />
        <img
          class="rule-img"
          src="https://pudee.sgp1.digitaloceanspaces.com/rule3.jpg"
          alt="รูปประกอบกติกา 3"
          loading="lazy"
        />
      </div>
    </div>

    <div class="section">
      <div class="section-title"><strong>ข้อกำหนดอื่น ๆ</strong></div>
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

.rule-strong { font-weight: bold; color: #1c8625; }
.rule-strong-red { font-weight: bold; color: #861c1c; }
.rule strong { color: #581c86; }

.rule-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #3b1956;
  font-weight: bold;
  text-align: center;
}

/* รูปประกอบกติกา: เรียงลงด้านล่างทีละภาพ ปรับขนาดเหมาะสม */
.rule-images {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center; /* จัดรูปให้อยู่กึ่งกลาง */
}

.rule-img {
  width: 100%;
  max-width: 860px;     /* ขนาดสูงสุดบนจอใหญ่ */
  height: auto;         /* รักษาอัตราส่วนภาพ */
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  object-fit: contain;
}
</style>
