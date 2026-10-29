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
          <legend>ยืนยันเบอร์โทรศัพท์</legend>
          <p class="auth-section-hint">รับรหัส OTP ทาง SMS เพื่อยืนยันว่าเป็นคุณ</p>
          <div class="auth-field">
            <label for="phone">เบอร์โทรศัพท์</label>
            <div class="auth-phone-row">
              <input id="phone" v-model="phonenum" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="เบอร์โทรศัพท์ 10 หลัก" maxlength="10" :aria-invalid="phoneError" :aria-describedby="phoneError ? 'phone-error' : undefined" />
              <button type="button" class="auth-otp-button" :disabled="loading || confirming || otpCountdown > 0" @click="callOtp">{{ otpCountdown > 0 ? `รอ ${otpCountdown} วินาที` : 'ขอรหัส OTP' }}</button>
            </div>
            <p v-if="phoneError" id="phone-error" class="auth-field-error">กรุณากรอกเบอร์โทรศัพท์ 10 หลักให้ถูกต้อง</p>
            <p v-if="otpCountdown > 0" class="auth-field-hint">ส่งรหัสแล้ว ตรวจสอบ SMS ในโทรศัพท์ของคุณ</p>
          </div>
          <div class="auth-field">
            <label for="otp">รหัส OTP</label>
            <input id="otp" v-model="otp" name="otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="รหัส 6 หลักจาก SMS" :aria-invalid="otpError" :aria-describedby="otpError ? 'otp-error' : undefined" />
            <p v-if="otpError" id="otp-error" class="auth-field-error">กรุณากรอกรหัส OTP 6 หลักให้ถูกต้อง</p>
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
            <input id="password" v-model="password" name="password" type="password" autocomplete="new-password" placeholder="อย่างน้อย 4 ตัวอักษร" :aria-invalid="passwordError" :aria-describedby="passwordError ? 'password-error' : undefined" />
            <p v-if="passwordError" id="password-error" class="auth-field-error">กรุณากรอกรหัสผ่านอย่างน้อย 4 ตัวอักษร</p>
          </div>
          <div class="auth-field">
            <label for="confirm_password">ยืนยันรหัสผ่าน</label>
            <input id="confirm_password" v-model="confirm_password" name="confirm-password" type="password" autocomplete="new-password" placeholder="กรอกรหัสผ่านอีกครั้ง" :aria-invalid="confirmPasswordError" :aria-describedby="confirmPasswordError ? 'confirm-password-error' : undefined" />
            <p v-if="confirmPasswordError" id="confirm-password-error" class="auth-field-error">รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง</p>
          </div>
        </fieldset>
        <button type="submit" class="auth-submit" :disabled="loading || confirming">{{ loading ? 'กำลังสมัครสมาชิก…' : 'สมัครสมาชิก' }}</button>
      </form>
      <p class="auth-register-prompt">มีบัญชีแล้ว? <RouterLink to="/login" class="auth-text-link">เข้าสู่ระบบ</RouterLink></p>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    name: 'Register',
    data() {
        return {
            loading: false,
            confirming: false,
            name: '',
            phonenum: '',
            password: '',
            confirm_password: '',
            otpDigits: ['', '', '', '', '', ''],
            otp: '',
            phoneError: false,
            passwordError: false,
            confirmPasswordError: false,
            nameError: false,
            otpError: false,
            otpCountdown: 0,
            countdownTimer: null,
            referral: 0
        }
    },
    methods: {
        ...mapActions('alert', ['addNotification']),

        moveFocus(index, event) {
            const nextInput = event.target.nextElementSibling;
            if (nextInput && event.target.value) {
                nextInput.focus();
            }
            this.otp = this.otpDigits.join('');
        },
        handleBackspace(index, event) {
            const prevInput = event.target.previousElementSibling;
            if (prevInput && !event.target.value) {
                prevInput.focus();
            }
        },
        validateOtp() {
            this.otpError = this.otpDigits.includes('');

        },
        validateInputs() {
            this.phoneError = this.phonenum.length !== 10;
            this.passwordError = this.password === '' || this.password.length < 4;
            this.confirmPasswordError = this.password !== this.confirm_password;
            this.nameError = this.name === '' || this.name.length > 50;
            this.otpError = this.otp === '' || this.otp.length !== 6;
        },
        startOtpCountdown() {
            if (this.countdownTimer) clearInterval(this.countdownTimer);
            this.otpCountdown = 300; // 5 minutes in seconds
            this.countdownTimer = setInterval(() => {
                if (this.otpCountdown > 0) {
                    this.otpCountdown--;
                } else {
                    clearInterval(this.countdownTimer);
                    this.countdownTimer = null;
                }
            }, 1000);
        },
        async callOtp() {
            if (this.loading || this.confirming || this.otpCountdown > 0) return;
            this.phoneError = this.phonenum.length !== 10;
            if (this.phoneError) return;


            this.loading = true;
            try {
                const response = await api.post('/premier-league/auth/callotp', {
                    phone_number: this.phonenum,
                });

                if (response.data.ok) {
                    this.addNotification({
                        type: 'success',
                        message: 'ส่ง OTP สำเร็จ',
                    });
                    this.startOtpCountdown();
                } else {
                    this.addNotification({
                        type: 'error',
                        message: 'ส่ง OTP ไม่สำเร็จ',
                    });
                }

                this.loading = false;

            } catch (error) {
                this.addNotification({
                    type: 'error',
                    message: error.response?.data?.error || 'เกิดข้อผิดพลาดในการส่ง OTP',
                });
                this.loading = false;
            }

        },
        async loginform() {
            if (this.loading || this.confirming) return;

            this.validateInputs();

            if (this.phoneError || this.passwordError || this.confirmPasswordError || this.nameError || this.otpError) {
                return;
            }

            this.confirming = true;
            let result;
            try {
                result = await Swal.fire({
                    title: 'ยืนยันการสมัครสมาชิก',
                    text: 'คุณต้องการสมัครสมาชิกใช่หรือไม่',
                    showCancelButton: true,
                    confirmButtonText: 'ใช่',
                    cancelButtonText: 'ไม่ใช่',
                    customClass: {
                        confirmButton: 'btn-confirm',
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
            } finally {
                this.confirming = false;
            }

            if (!result.isConfirmed) {
                return;
            }
            this.loading = true;
            try {
                const response = await api.post('/premier-league/auth/registerOtp', {
                    phone_number: this.phonenum,
                    password: this.password,
                    name: this.name,
                    otp: this.otp,
                    ref: this.referral
                });

                if (response.data.ok) {
                    this.addNotification({
                        type: 'success',
                        message: 'สมัครสมาชิกสำเร็จ',
                    });
                    this.$router.push('/login');
                }

                this.loading = false;

            } catch (error) {
                Swal.fire({
                    text: error.response?.data?.error || 'ดำเนินการไม่สำเร็จ กรุณาลองอีกครั้ง',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                this.loading = false;
            }

        },
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
        this.referral = isNaN(parseInt(ref)) ? 0 : parseInt(ref);
        this.loading = false;
    },
    beforeUnmount() {
        if (this.countdownTimer) clearInterval(this.countdownTimer);
    }
}
</script>
