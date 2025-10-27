<template>
  <div class="rule-container">
    <div class="rule-card">
      <div class="text-center mb-4">
        <h1 class="rule-title">📘 กติการะบบ</h1>
      </div>

      <div class="rule-content">
        <p>
          • อันดับของผู้เล่นที่ทำการจัดทีมจะถูกจัดเรียงตาม 
          <span class="highlight-green">คะแนน</span> จากสูงสุดไปยังต่ำสุด 
          ในกรณีที่ผู้เล่นหลายคนมี <span class="highlight-green">คะแนน</span> สูงสุดเท่ากัน 
          ระบบจะทำการจัดลำดับโดยพิจารณาจากจำนวนเงินที่ใช้ในการจัดทีม 
          ผู้เล่นที่ใช้เงินน้อยกว่าจะได้รับการจัดอันดับที่สูงกว่า
        </p>

        <p>
          • หากยังมีผู้เล่นที่มี <span class="highlight-green">คะแนน</span> และจำนวนเงินที่ใช้ในการจัดทีมเท่ากัน 
          ระบบจะจัดลำดับโดยยึดตามเวลาที่ทำการส่งทีมเข้าแข่งขัน 
          <span class="highlight-red">โดยการแก้ไขตัวนักเตะในทีมหลังจากที่ส่งทีมแล้ว 
          จะถือว่ามีการอัปเดตเวลาการส่งทีมเข้าแข่งขันใหม่</span>
        </p>

        <p>
          • <span class="highlight-blue">หากมีการเลือกผู้เล่นหรือใช้ตั๋วแล้ว จะไม่สามารถยกเลิกได้</span>  
          ในกรณีที่ทีมยกเลิกการแข่งขันในสัปดาห์นั้น (ยึดตามโปรแกรมของพรีเมียร์ลีก) 
          และไปแข่งขันช่วงต้นของสัปดาห์ถัดไป 
          ทางเราจะเลื่อนเวลาสรุปคะแนนเป็นหลังจากสิ้นสุดการแข่งขันของคู่สุดท้าย 
          แต่หากทีมนั้นเลื่อนไปยังไม่มีกำหนดเตะในสัปดาห์ถัดไป 
          นักเตะที่คุณเลือกจะได้รับคะแนนเป็น 0
        </p>

        <p class="thanks">
          • ขอบคุณที่สนับสนุนเรา ❤️  
          เราจะพยายามอย่างเต็มที่เพื่อให้ทุกท่านได้สนุกสนานไปกับการจัดการแข่งของท่าน
        </p>

        <div class="policy-box mt-6">
          <h2 class="policy-title">นโยบายการยินยอมและการไม่คืนเงิน</h2>
          <p>
            เมื่อท่านทำการซื้อตั๋วเข้าร่วมเล่นแล้ว 
            <span class="highlight-red">จะไม่สามารถคืนเงินได้ไม่ว่ากรณีใดๆ ก็ตาม</span>  
            ทั้งนี้ท่านยินยอมให้ทางเรามีสิทธิ์ในการเข้าถึงข้อมูลของท่านในระบบ  
            โดยทางเราขอสงวนสิทธิ์ในการไม่เปิดเผยข้อมูลส่วนตัวของท่านให้กับบุคคลภายนอก  
            เพื่อความปลอดภัยของข้อมูลและความเป็นส่วนตัวของท่าน
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🔹 โครงสร้างพื้นหลังหลัก */
.rule-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #eef2f3 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 15px;
}

/* 🔸 กล่องเนื้อหา */
.rule-card {
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 30px 24px;
  max-width: 800px;
  width: 100%;
  color: #444;
  line-height: 1.75;
  transition: all 0.3s ease;
}

.rule-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

/* 🔹 หัวข้อ */
.rule-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* 🔸 เนื้อหา */
.rule-content p {
  margin-bottom: 1.25rem;
  font-size: 1rem;
  color: #4b5563;
  text-align: justify;
}

.thanks {
  font-weight: 600;
  color: #374151;
}

/* 🔸 สีไฮไลต์ */
.highlight-green {
  color: #15803d;
  font-weight: 600;
}

.highlight-blue {
  color: #1d4ed8;
  font-weight: 600;
}

.highlight-red {
  color: #b91c1c;
  font-weight: 600;
}

/* 🔸 กล่องนโยบาย */
.policy-box {
  background: linear-gradient(145deg, #fff5f5, #ffe8e8);
  border: 1px solid #fca5a5;
  border-radius: 12px;
  padding: 16px 18px;
  color: #7f1d1d;
  font-size: 0.95rem;
  line-height: 1.7;
}

.policy-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #b91c1c;
}

/* 🔸 Responsive */
@media (max-width: 640px) {
  .rule-card {
    padding: 20px 16px;
  }
  .rule-title {
    font-size: 1.4rem;
  }
  .rule-content p {
    font-size: 0.92rem;
  }
}
</style>
