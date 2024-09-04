<template>
    <div  style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp'); background-size: cover; background-position: center; min-height: 100vh;">
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>

        <div class="flex flex-col items-center justify-center pt-20 m-2">
            <div class="w-full max-w-lg p-8 space-y-2 bg-white rounded-lg shadow-lg sm:w-96">

                <div class="container mx-auto flex justify-center">
                    <img src="/public/assets/logo.webp" alt="Logo" class="logo-circle">
                </div>

                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-500">เบอร์เข้าระบบ</label>
                    <input :class="{ 'border-red-500': phoneError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone" type="tel" placeholder="0891111111" v-model="phonenum">
                    <p v-if="phoneError" class="text-red-500 text-xs italic">กรุณากรอกเบอร์โทร 10 หลักให้ถูกต้อง</p>
                </div>

                <div class="w-full rounded-lg mt-2 text-white text-lg font-semibold">
                    <p v-if="otpCountdown > 0" class="text-center text-gray-500 text-xs mt-2 mb-2">
                        โปรดรอ {{ otpCountdown }} วินาทีก่อนที่จะขอรหัส OTP ใหม่
                    </p>
                    <button :disabled="otpCountdown > 0" type="submit" class="w-full button-save1" @click="callOtp">
                        ขอรหัส OTP
                    </button>
                </div>

                <div class="">
                    <label for="otp" class="block text-sm font-medium text-gray-500">OTP</label>

                    <input :class="{ 'border-red-500': otpError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="otp" type="tel" placeholder="OTP" v-model="otp">
                    <!-- <input v-for="(digit, index) in otpDigits" :key="index" :class="{ 'border-red-500': otpError }"
                            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            type="tel" maxlength="1" v-model="otpDigits[index]" @input="moveFocus(index, $event)"
                            @keydown.backspace="handleBackspace(index, $event)"> -->

                    <p v-if="otpError" class="text-red-500 text-xs italic">กรุณากรอก OTP ให้ถูกต้อง</p>
                </div>

                <div>
                    <label for="new_password" class="block text-sm font-medium text-gray-500">รหัสผ่านใหม่</label>
                    <input :class="{ 'border-red-500': newPasswordError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="new_password" type="password" placeholder="รหัสผ่านใหม่" v-model="newPassword">
                    <p v-if="newPasswordError" class="text-red-500 text-xs italic">กรุณากรอกรหัสผ่านใหม่ให้ถูกต้อง</p>
                </div>

                <div>
                    <label for="confirm_new_password"
                        class="block text-sm font-medium text-gray-500">ยืนยันรหัสผ่านใหม่</label>
                    <input :class="{ 'border-red-500': confirmNewPasswordError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm_new_password" type="password" placeholder="ยืนยันรหัสผ่านใหม่"
                        v-model="confirmNewPassword">
                    <p v-if="confirmNewPasswordError" class="text-red-500 text-xs italic">รหัสผ่านและการยืนยันไม่ตรงกัน
                    </p>
                </div>

                <div class="w-full rounded-lg mt-2 text-white text-lg font-semibold">
                    <button type="submit" class="w-full button-save" @click="resetPassword">ยืนยันรหัสผ่านใหม่</button>
                </div>

                <!-- กลับสู่หน้า Login -->
                <div class="text-center mt-4">
                    <router-link to="/login" class="text-sm text-blue-500 hover:text-blue-700">กลับสู่หน้า
                        Login</router-link>
                </div>

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
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #6a9ef9 0%, #0e2472 100%);
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
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #6af984 0%, #15720e 100%);
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
