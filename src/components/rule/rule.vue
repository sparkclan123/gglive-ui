<template>
  <div class="rules-container">
    <div class="rule-title">
      <strong>กติกา PuDee Fantasy FIFA World Cup 2026</strong>
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
        - <strong>FIFA World Cup 2026</strong> : การให้คะแนนคิดตาม Fantasy ของ <span class="rule-strong">FIFA Official APP</span>.
      </div>
      <div class="rule rule-sub-title">
        <strong>การคิด Match Day (MD)</strong>
      </div>
      <div class="rule">- MD.1 : 12 คู่แรกของรอบแรก นัดที่ 1</div>
      <div class="rule">- MD.2 : 12 คู่หลังของรอบแรก นัดที่ 1</div>
      <div class="rule">- MD.3 : 12 คู่แรกของรอบแรก นัดที่ 2</div>
      <div class="rule">- MD.4 : 12 คู่หลังของรอบแรก นัดที่ 2</div>
      <div class="rule">- MD.5 : 12 คู่แรกของรอบแรก นัดที่ 3</div>
      <div class="rule">- MD.6 : 12 คู่หลังของรอบแรก นัดที่ 3</div>
      <div class="rule">- MD.7 : 8 คู่แรกของรอบที่ 2</div>
      <div class="rule">- MD.8 : 8 คู่หลังของรอบที่ 2</div>
      <div class="rule">- MD.9 : 8 คู่ของรอบที่ 3</div>
      <div class="rule">- MD.10 : 4 คู่ของรอบก่อนรองชนะเลิศ</div>
      <div class="rule">- MD.11 : 2 คู่ของรอบรองชนะเลิศ</div>
      <div class="rule">- MD.12 : 2 คู่ของนัดชิงที่ 3 และชิงชนะเลิศ</div>
      <div class="rule rule-sub-title">
        <strong>รางวัล Match Day ละ 10 รางวัล</strong>
      </div>
      <div class="rule">- รางวัลที่ 1 รับ <span class="rule-strong">50%</span> ของค่าสมัคร แต่ไม่ต่ำกว่า <span class="rule-strong">20,000 บาท</span></div>
      <div class="rule">- รางวัลที่ 2 รับ <span class="rule-strong">10%</span> ของรางวัลที่ 1</div>
      <div class="rule">- รางวัลที่ 3 รับ <span class="rule-strong">5%</span> ของรางวัลที่ 1</div>
      <div class="rule">- รางวัลที่ 4 รับ <span class="rule-strong">3%</span> ของรางวัลที่ 1</div>
      <div class="rule">- รางวัลที่ 5-10 รับ <span class="rule-strong">1%</span> ของรางวัลที่ 1</div>
      <div class="rule">
        <span class="rule-strong-red">* ยกเว้น Match Day พิเศษ (เช่น Match Day 1/2 จะไม่การันตีเงินรางวัล)</span>
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
.rule-sub-title { margin-top: 10px; margin-bottom: 4px; }

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
