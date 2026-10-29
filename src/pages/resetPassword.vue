<template>
  <section class="auth-account-panel auth-recovery">
    <LodingSceen :loading="loading" />
    <header class="auth-ticket-heading auth-ticket-seam">
      <div>
        <RouterLink to="/login" class="auth-back-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>กลับเข้าสู่ระบบ</RouterLink>
        <h1>ตั้งรหัสผ่านใหม่</h1>
        <p class="auth-ticket-description">ยืนยันเบอร์โทรศัพท์ เพื่อกลับเข้าสู่ทีมของคุณ</p>
      </div>
      <svg class="auth-ticket-pitch" viewBox="0 0 72 104" fill="none" aria-hidden="true">
        <path d="M3 3h66v98H3zM3 52h66M21 3v17h30V3M21 101V84h30v17"/>
        <circle cx="36" cy="52" r="13"/><circle cx="36" cy="52" r="1.8"/>
      </svg>
    </header>
    <div class="auth-form-panel">
      <form class="auth-form" @submit.prevent="resetPassword" :aria-busy="loading || confirming" novalidate>
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
        <div class="auth-field">
          <label for="new_password">รหัสผ่านใหม่</label>
          <input id="new_password" v-model="newPassword" name="password" type="password" autocomplete="new-password" placeholder="อย่างน้อย 4 ตัวอักษร" :aria-invalid="newPasswordError" :aria-describedby="newPasswordError ? 'password-error' : undefined" />
          <p v-if="newPasswordError" id="password-error" class="auth-field-error">กรุณากรอกรหัสผ่านอย่างน้อย 4 ตัวอักษร</p>
        </div>
        <div class="auth-field">
          <label for="confirm_new_password">ยืนยันรหัสผ่านใหม่</label>
          <input id="confirm_new_password" v-model="confirmNewPassword" name="confirm-password" type="password" autocomplete="new-password" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง" :aria-invalid="confirmNewPasswordError" :aria-describedby="confirmNewPasswordError ? 'confirm-password-error' : undefined" />
          <p v-if="confirmNewPasswordError" id="confirm-password-error" class="auth-field-error">รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง</p>
        </div>
        <button type="submit" class="auth-submit" :disabled="loading || confirming">{{ loading ? 'กำลังบันทึกรหัสผ่าน…' : 'ยืนยันรหัสผ่านใหม่' }}</button>
      </form>
      <p class="auth-register-prompt"><RouterLink to="/login" class="auth-text-link">กลับเข้าสู่ระบบ</RouterLink></p>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { api } from '@axios_inst';
import Swal from 'sweetalert2';

export default {
    name: 'ForgotPassword',
    data() {
        return {
            loading: false,
            confirming: false,
            phonenum: '',
            otpDigits: ['', '', '', '', '', ''],
            otp: '',
            newPassword: '',
            confirmNewPassword: '',
            phoneError: false,
            otpError: false,
            newPasswordError: false,
            confirmNewPasswordError: false,
            otpCountdown: 0,
            countdownTimer: null
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
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
        validateInputs() {
            this.phoneError = this.phonenum.length !== 10;
            this.otpError = this.otp === '' || this.otp.length !== 6;
            this.newPasswordError = this.newPassword === '' || this.newPassword.length < 4;
            this.confirmNewPasswordError = this.newPassword !== this.confirmNewPassword;
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
                const response = await api.post('/premier-league/auth/callotpreset', {
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
        async resetPassword() {
            if (this.loading || this.confirming) return;
            this.validateInputs();

            if (this.phoneError || this.otpError || this.newPasswordError || this.confirmNewPasswordError) {
                return;
            }

            this.confirming = true;
            let result;
            try {
                result = await Swal.fire({
                    title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
                    text: 'คุณต้องการเปลี่ยนรหัสผ่านใช่หรือไม่',
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
                const response = await api.post('/premier-league/auth/reset-password', {
                    phone_number: this.phonenum,
                    otp: this.otp,
                    password: this.newPassword,
                });

                if (response.data.ok) {
                    this.addNotification({
                        type: 'success',
                        message: 'รีเซ็ตรหัสผ่านสำเร็จ',
                    });
                    this.$router.push('/login');
                } else {
                    this.addNotification({
                        type: 'error',
                        message: 'รีเซ็ตรหัสผ่านไม่สำเร็จ',
                    });
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
        }
    },
    beforeUnmount() {
        if (this.countdownTimer) clearInterval(this.countdownTimer);
    }
}
</script>
