<template>
  <section class="auth-account-panel auth-registration">
    <header class="auth-ticket-heading auth-ticket-seam">
      <div>
        <RouterLink to="/login" class="auth-back-link">← กลับเข้าสู่ระบบ</RouterLink>
        <h1>ลืมรหัสผ่าน</h1>
        <p class="auth-ticket-description">ให้ทีมงานช่วยกู้คืนบัญชีของคุณ</p>
      </div>
    </header>
    <div class="auth-form-panel">
      <div class="auth-form">
        <p class="auth-section-hint">ติดต่อแอดมินผ่าน LINE พร้อมแจ้งเบอร์โทรศัพท์ที่ใช้สมัคร ทีมงานจะตรวจสอบความเป็นเจ้าของบัญชีก่อนช่วยตั้งรหัสผ่านใหม่</p>
        <a :href="memberBrand.lineUrl" target="_blank" rel="noopener noreferrer" class="auth-submit" style="display: block; text-align: center">ติดต่อแอดมินผ่าน LINE</a>
        <p class="auth-field-hint">ไม่ต้องแจ้งรหัสผ่านเดิมให้ทีมงาน</p>
      </div>
      <p class="auth-register-prompt">จำรหัสผ่านได้แล้ว? <RouterLink to="/login" class="auth-text-link">เข้าสู่ระบบ</RouterLink></p>
    </div>
  </section>
</template>

<script>
import { memberBrand } from '../config/memberBrand.js';
export default { name: 'ResetPassword', data: () => ({ memberBrand }) };
</script>
