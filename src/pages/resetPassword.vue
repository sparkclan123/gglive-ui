<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp')">
        <LodingSceen :loading="loading" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Card -->
        <div
            class="relative z-10 w-[90%] max-w-md mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-white space-y-6">
            <!-- Logo -->
            <div class="flex justify-center mb-3">
                <img src="/public/assets/logo.webp" alt="Logo"
                    class="w-20 h-20 rounded-full border-4 border-white/40 shadow-lg" />
            </div>

            <h2 class="text-2xl font-bold text-center">รีเซ็ตรหัสผ่าน</h2>
            <p class="text-gray-300 text-center text-sm">
                กรอกข้อมูลด้านล่างเพื่อรีเซ็ตรหัสผ่านของคุณ
            </p>

            <!-- เบอร์โทร -->
            <div>
                <label for="phone" class="block text-sm mb-1 text-gray-300">เบอร์โทรศัพท์</label>
                <input id="phone" v-model="phonenum" type="tel" placeholder="08xxxxxxxx" :class="[
                    'w-full px-4 py-2 rounded-lg bg-white/20 border focus:ring-2 focus:ring-blue-400 focus:outline-none',
                    phoneError ? 'border-red-500' : 'border-gray-400'
                ]" />
                <p v-if="phoneError" class="text-red-400 text-xs mt-1">
                    กรุณากรอกเบอร์โทร 10 หลักให้ถูกต้อง
                </p>
            </div>

            <!-- ปุ่มขอ OTP -->
            <div class="mt-2">
                <p v-if="otpCountdown > 0" class="text-center text-xs text-gray-300 mb-2">
                    โปรดรอ {{ otpCountdown }} วินาทีก่อนขอรหัสใหม่
                </p>
                <button :disabled="otpCountdown > 0" @click="callOtp"
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                    ขอรหัส OTP
                </button>
            </div>

            <!-- ช่องกรอก OTP -->
            <div>
                <label for="otp" class="block text-sm mb-1 text-gray-300">OTP</label>
                <input id="otp" v-model="otp" type="tel" placeholder="รหัส OTP 6 หลัก" :class="[
                    'w-full px-4 py-2 rounded-lg bg-white/20 border focus:ring-2 focus:ring-blue-400 focus:outline-none',
                    otpError ? 'border-red-500' : 'border-gray-400'
                ]" />
                <p v-if="otpError" class="text-red-400 text-xs mt-1">
                    กรุณากรอก OTP ให้ถูกต้อง
                </p>
            </div>

            <!-- รหัสผ่านใหม่ -->
            <div>
                <label for="new_password" class="block text-sm mb-1 text-gray-300">รหัสผ่านใหม่</label>
                <input id="new_password" v-model="newPassword" type="password" placeholder="********" :class="[
                    'w-full px-4 py-2 rounded-lg bg-white/20 border focus:ring-2 focus:ring-green-400 focus:outline-none',
                    newPasswordError ? 'border-red-500' : 'border-gray-400'
                ]" />
                <p v-if="newPasswordError" class="text-red-400 text-xs mt-1">
                    กรุณากรอกรหัสผ่านใหม่ให้ถูกต้อง
                </p>
            </div>

            <!-- ยืนยันรหัสผ่านใหม่ -->
            <div>
                <label for="confirm_new_password" class="block text-sm mb-1 text-gray-300">ยืนยันรหัสผ่านใหม่</label>
                <input id="confirm_new_password" v-model="confirmNewPassword" type="password" placeholder="********"
                    :class="[
                        'w-full px-4 py-2 rounded-lg bg-white/20 border focus:ring-2 focus:ring-green-400 focus:outline-none',
                        confirmNewPasswordError ? 'border-red-500' : 'border-gray-400'
                    ]" />
                <p v-if="confirmNewPasswordError" class="text-red-400 text-xs mt-1">
                    รหัสผ่านและการยืนยันไม่ตรงกัน
                </p>
            </div>

            <!-- ปุ่มรีเซ็ตรหัส -->
            <button @click="resetPassword"
                class="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 font-semibold shadow-lg transition-all hover:scale-[1.02]">
                ยืนยันรหัสผ่านใหม่
            </button>

            <!-- กลับหน้า Login -->
            <div class="text-center text-sm mt-2">
                <router-link to="/login" class="text-blue-400 hover:text-blue-300">กลับสู่หน้า Login</router-link>
            </div>
        </div>
    </div>
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
            this.validateInputs();
            if (this.phoneError) return;

            if (this.otpCountdown > 0) return;

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
            this.validateInputs();

            if (this.phoneError || this.otpError || this.newPasswordError || this.confirmNewPasswordError) {
                return;
            }

            // Swal confirm 

            const result = await Swal.fire({
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
                    text: error.response.data.error,
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
    }
}
</script>

<style scoped>
.logo-circle {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    object-fit: cover;
}

.otp-container input {
    text-align: center;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
}

.button-save1 {
    font-size: 15px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #0e2472 0%, #0e2472 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 2em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.6em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.button-save1:active {
    box-shadow: inset 0px 0.1em 0.6em #0a1158;
    transform: translateY(0em);
}

.button-save {
    font-size: 15px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #15720e 0%, #15720e 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 2em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.6em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.button-save:active {
    box-shadow: inset 0px 0.1em 0.6em #0f580a;
    transform: translateY(0em);
}
</style>
