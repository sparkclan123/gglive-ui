<template>
  <div class="member-support member-game-rules rules-container">
    <div class="rule-title">
      <strong>กติกา {{ $memberBrand.name }} Fantasy 2026-2027</strong>
    </div>

    <div class="section">
      <div class="section-title"><strong>การจัดตัวผู้เล่น</strong></div>
      <div class="rule">
        - สามารถจัดตัวผู้เล่นได้ <span class="rule-strong">11 คน</span> / กัปตันทีม <span class="rule-strong">1 คน</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title"><strong>การนับคะแนน</strong></div>
      <div class="rule">
        - รายการ <strong>Premier League</strong> ใช้คะแนนจากแอพพลิเคชั่น <span class="rule-strong">PL 100%</span>
      </div>
      <div class="rule">
        - รายการ <strong>UCL</strong> ใช้คะแนนจากแอพพลิเคชั่น <span class="rule-strong">Champion League 100%</span>
      </div>
      <div class="rule">
        - รายการอื่นๆ ใช้คะแนนจากตารางการคิดคะแนน <strong>Fantasy {{ $memberBrand.name }} Club</strong>
      </div>
    </div>

    <div class="section">
      <div class="section-title"><strong>รางวัล</strong></div>
      
      <div class="rule rule-sub-title">
        <strong>เกม VIP</strong>
      </div>
      <div class="rule">- ที่ 1 การันตีตามการประกาศแต่ละ Game Week</div>
      <div class="rule">- ที่ 2 รับ <span class="rule-strong">10%</span> ของรางวัลที่ 1</div>
      <div class="rule">- ที่ 3 รับ <span class="rule-strong">6%</span> ของรางวัลที่ 1</div>
      <div class="rule">- ที่ 4-5 รับ <span class="rule-strong">1%</span> ของรางวัลที่ 1</div>
      <div class="rule">- ที่ 6-10 รับ <span class="rule-strong">0.5%</span> ของรางวัลที่ 1</div>
      <div class="rule">
        <span class="rule-note">(ทุกรางวัลหากไม่เกิน 100 บาท จะเปลี่ยนเป็นตั๋ว VIP สำหรับเล่นเกม)</span>
      </div>

      <div class="rule rule-sub-title" style="margin-top: 14px;">
        <strong>เกมฟรี</strong>
      </div>
      <div class="rule"><strong>- Premier League รับตั๋ว VIP</strong></div>
      <div class="rule rule-indent">~ ที่ 1 รับ 3 ใบ</div>
      <div class="rule rule-indent">~ ที่ 2 รับ 2 ใบ</div>
      <div class="rule rule-indent">~ ที่ 3 รับ 1 ใบ</div>
      <div class="rule"><strong>- รายการอื่น รับตั๋ว VIP</strong></div>
      <div class="rule rule-indent">~ ที่ 1 รับ 2 ใบ</div>
      <div class="rule rule-indent">~ ที่ 2 รับ 1 ใบ</div>
      <div class="rule" style="margin-top: 6px;">
        <span class="rule-strong-red">(ยกเว้น Game Week…/2 จะไม่การันตีเงินรางวัล และไม่มีรางวัลเกมฟรี)</span>
      </div>
    </div>

    <!-- รูปประกอบกติกา -->
    <div class="section">
      <div class="section-title"><strong>รูปประกอบกติกา</strong></div>
      <div class="rule-images">
        <img
          class="rule-img"
          src="https://pudee.sgp1.digitaloceanspaces.com/rule1.jpg"
          alt="รูปประกอบกติกา"
          loading="lazy"
        />
      </div>
    </div>

    <div class="section">
      <div class="section-title"><strong>ข้อกำหนดอื่น ๆ</strong></div>
      <div class="rule">
        - การตัดสินของทีมงาน <span class="rule-strong-red">{{ $memberBrand.name }} ถือเป็นที่สิ้นสุด</span>ในทุกกรณี.
      </div>
    </div>
  </div>
</template>

<style src="../../styles/member-support.css"></style>

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
.rule-note { font-style: italic; color: #6b21a8; }
.rule-indent { padding-left: 18px; margin-bottom: 6px; }
.rule strong { color: #581c86; }
.rule-sub-title { margin-top: 10px; margin-bottom: 6px; }

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
