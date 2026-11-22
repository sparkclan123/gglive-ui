<template>
  <section class="auth-account-panel auth-registration">
    <header class="auth-ticket-heading auth-ticket-seam">
      <div>
        <RouterLink to="/login" class="auth-back-link">← กลับเข้าสู่ระบบ</RouterLink>
        <h1>ลืมรหัสผ่าน</h1>
      </div>
    </header>
    <div class="auth-form-panel">
      <div class="auth-form">
        <p class="auth-section-hint">ขณะนี้ยังไม่สามารถตั้งรหัสผ่านใหม่ผ่านหน้าเว็บได้</p>
      </div>
      <p class="auth-register-prompt">จำรหัสผ่านได้แล้ว? <RouterLink to="/login" class="auth-text-link">เข้าสู่ระบบ</RouterLink></p>
    </div>
  </section>
</template>
