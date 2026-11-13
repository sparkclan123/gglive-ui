<template>
  <section class="auth-account-panel auth-registration">
    <LodingSceen :loading="loading" />
    <header class="auth-ticket-heading auth-ticket-seam">
      <div>
        <RouterLink to="/login" class="auth-back-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>กลับเข้าสู่ระบบ</RouterLink>
        <h1>สมัครสมาชิก</h1>
        <p class="auth-ticket-description">สร้างทีมของคุณ แล้วลุ้นไปด้วยกัน</p>
      </div>
      <svg class="auth-ticket-pitch" viewBox="0 0 72 104" fill="none" aria-hidden="true">
        <path d="M3 3h66v98H3zM3 52h66M21 3v17h30V3M21 101V84h30v17"/>
        <circle cx="36" cy="52" r="13"/><circle cx="36" cy="52" r="1.8"/>
      </svg>
    </header>
    <div class="auth-form-panel">
      <form class="auth-form" @submit.prevent="loginform" :aria-busy="loading || confirming" novalidate>
        <fieldset class="auth-fieldset">
          <legend>เบอร์โทรศัพท์สำหรับเข้าสู่ระบบ</legend>
          <p class="auth-section-hint">ใช้เบอร์มือถือและรหัสผ่านเพื่อเข้าสู่ระบบได้เลย</p>
          <div class="auth-field">
            <label for="phone">เบอร์โทรศัพท์</label>
            <input id="phone" v-model="phonenum" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="เบอร์มือถือ 10 หลัก" maxlength="10" :aria-invalid="phoneError" :aria-describedby="phoneError ? 'phone-error' : undefined" />
            <p v-if="phoneError" id="phone-error" class="auth-field-error">กรุณากรอกเบอร์มือถือ 10 หลักให้ถูกต้อง</p>
          </div>
        </fieldset>
        <fieldset class="auth-fieldset">
          <legend>ข้อมูลบัญชี</legend>
          <div class="auth-field">
            <label for="name">ชื่อของคุณ</label>
            <input id="name" v-model="name" name="name" type="text" autocomplete="name" maxlength="50" placeholder="ชื่อที่ใช้ในบัญชี" :aria-invalid="nameError" :aria-describedby="nameError ? 'name-error' : undefined" />
            <p v-if="nameError" id="name-error" class="auth-field-error">กรุณากรอกชื่อ ไม่เกิน 50 ตัวอักษร</p>
          </div>
          <div class="auth-field">
            <label for="password">รหัสผ่าน</label>
            <input id="password" v-model="password" name="password" type="password" autocomplete="new-password" placeholder="อย่างน้อย 8 ตัวอักษร" :aria-invalid="passwordError" :aria-describedby="passwordError ? 'password-error' : undefined" />
            <p v-if="passwordError" id="password-error" class="auth-field-error">กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร (ภาษาไทยไม่เกิน 24 ตัวอักษร)</p>
          </div>
          <div class="auth-field">
            <label for="confirm_password">ยืนยันรหัสผ่าน</label>
            <input id="confirm_password" v-model="confirm_password" name="confirm-password" type="password" autocomplete="new-password" placeholder="กรอกรหัสผ่านอีกครั้ง" :aria-invalid="confirmPasswordError" :aria-describedby="confirmPasswordError ? 'confirm-password-error' : undefined" />
            <p v-if="confirmPasswordError" id="confirm-password-error" class="auth-field-error">รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง</p>
          </div>
        </fieldset>
        <p v-if="verifying" role="status" aria-live="polite" class="auth-field-hint">กำลังตรวจสอบ กรุณารอสักครู่</p>
        <button type="submit" class="auth-submit" :disabled="loading || confirming">{{ verifying ? 'กำลังตรวจสอบความปลอดภัย…' : loading ? 'กำลังสมัครสมาชิก…' : 'สมัครสมาชิก' }}</button>
      </form>
      <p class="auth-register-prompt">มีบัญชีแล้ว? <RouterLink to="/login" class="auth-text-link">เข้าสู่ระบบ</RouterLink></p>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import { solveRegistrationProof } from '../security/registrationProof.js';
export default {
    name: 'Register',
    data() {
        return { loading: false, confirming: false, verifying: false, proofController: null,
            name: '', phonenum: '', password: '', confirm_password: '', referral: 0,
            phoneError: false, passwordError: false, confirmPasswordError: false, nameError: false };
    },
    methods: {
        ...mapActions('alert', ['addNotification']),
        validateInputs() {
            this.phoneError = !/^0[689][0-9]{8}$/.test(this.phonenum);
            this.passwordError = [...this.password].length < 8 || new TextEncoder().encode(this.password).length > 72;
            this.confirmPasswordError = this.password !== this.confirm_password;
            this.nameError = !this.name.trim() || [...this.name.trim()].length > 50;
        },
        async loginform() {
            if (this.loading || this.confirming) return;
            this.validateInputs();
            if (this.phoneError || this.passwordError || this.confirmPasswordError || this.nameError) return;
            this.confirming = true;
            let result;
            try {
                result = await Swal.fire({ title: 'ยืนยันการสมัครสมาชิก', text: 'คุณต้องการสมัครสมาชิกใช่หรือไม่',
                    showCancelButton: true, confirmButtonText: 'สมัครสมาชิก', cancelButtonText: 'ยกเลิก',
                    customClass: { confirmButton: 'btn-confirm', cancelButton: 'btn-cancel', popup: 'popup-custom', title: 'text-custom', htmlContainer: 'text-custom' }, buttonsStyling: false });
            } finally { this.confirming = false; }
            if (!result.isConfirmed) return;
            this.loading = true;
            this.verifying = true;
            const controller = new AbortController();
            this.proofController = controller;
            try {
                const proof = await solveRegistrationProof(api, controller.signal);
                this.verifying = false;
                const response = await api.post('/premier-league/auth/register', {
                    phone_number: this.phonenum, password: this.password, name: this.name.trim(), ref: this.referral, ...proof
                }, { signal: controller.signal });
                if (!response.data.ok) throw new Error('สมัครสมาชิกไม่สำเร็จ กรุณาลองอีกครั้ง');
                this.addNotification({ type: 'success', message: 'สมัครสมาชิกสำเร็จ เข้าสู่ระบบได้เลย' });
                this.$router.push('/login');
            } catch (error) {
                if (!controller.signal.aborted) {
                    const retry = Number(error.response?.headers?.['retry-after']);
                    const message = error.response?.data?.error || error.message || 'ดำเนินการไม่สำเร็จ กรุณาลองอีกครั้ง';
                    this.addNotification({ type: 'error', message: retry > 0 ? `${message} (ประมาณ ${Math.ceil(retry / 60)} นาที)` : message });
                }
            } finally {
                this.loading = false; this.verifying = false; this.proofController = null;
            }
        }
    },
    mounted() {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                api.get('/premier-league/v1/check-token', { headers: { Authorization: `Bearer ${accessToken}` } })
                    .then(() => { window.location.href = '/season-select'; })
                    .catch(() => { try { localStorage.removeItem('access_token'); } catch {} });
            }
            const userParams = JSON.parse(localStorage.getItem('user_params') || 'null');
            if (userParams?.access_token) {
                localStorage.setItem('access_token', userParams.access_token);
                window.location.href = '/lobby';
            }
        } catch { /* Missing or invalid saved callback data must not block registration. */ }
        const ref = new URLSearchParams(window.location.search).get('ref');
        const referral = Number(ref);
        this.referral = Number.isSafeInteger(referral) && referral > 0 && referral <= 2147483647 ? referral : 0;
        this.loading = false;
    },
    beforeUnmount() { this.proofController?.abort(); }
};
</script>
