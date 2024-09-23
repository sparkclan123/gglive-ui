<template>
    <div  style="background-image: url('https://pudee.sgp1.digitaloceanspaces.com/bgnew1.webp'); background-size: cover; background-position: center; min-height: 100vh;">
        <div>
            <LodingSceen :loading="loading"/>
        </div>

        <div class="flex flex-col items-center justify-center pt-20 m-2">

            <div class="w-full max-w-lg p-8 space-y-2 bg-white rounded-lg shadow-lg sm:w-96">

                <div class="container mx-auto flex justify-center">
                    <img src="/public/assets/logo.webp" alt="Logo" class="logo-circle">
                </div>
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-500">เบอร์สำหรับเข้าสู่ระบบ
                        ex:0810000000</label>
                    <input :class="{ 'border-red-500': phoneError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone" type="tel" placeholder="เบอร์โทร" v-model="phonenum">
                    <p v-if="phoneError" class="text-red-500 text-xs italic">กรุณากรอกเบอร์โทร 10 หลักให้ถูกต้อง</p>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-500">รหัสผ่าน <span
                            class="text-red-700">**ต้องมากกว่า 4 ตัว </span> </label>
                    <input :class="{ 'border-red-500': passwordError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="password" v-model="password">
                </div>
                <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-500">ยืนยันรหัสผ่าน</label>
                    <input :class="{ 'border-red-500': confirmPasswordError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm_password" type="password" placeholder="confirm_password" v-model="confirm_password">
                    <p v-if="confirmPasswordError" class="text-red-500 text-xs italic">รหัสผ่านและการยืนยันไม่ตรงกัน</p>
                </div>
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-500">ชื่อ</label>
                    <input :class="{ 'border-red-500': nameError }"
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="ชื่อ" v-model="name">
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

                <div class="w-full rounded-lg mt-2 text-white text-lg ">
                    <p v-if="otpCountdown > 0" class="text-center text-gray-500 text-xs mt-2 mb-2">
                        โปรดรอ {{ otpCountdown }} วินาทีก่อนที่จะขอรหัส OTP ใหม่
                    </p>
                    <button :disabled="otpCountdown > 0" type="submit" class="w-full button-save1" @click="callOtp">
                        ขอรหัส OTP
                    </button>

                </div>
                <div class="w-full rounded-lg mt-2 text-white text-lg ">
                    <button type="submit" class="w-full button-save" @click="loginform">สมัครสมาชิก</button>
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
    name: 'Login',
    data() {
        return {
            loading: false,
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
           
            this.validateInputs();

            if (this.phoneError || this.passwordError || this.confirmPasswordError || this.nameError || this.otpError) {
                return;
            }

            const result = await Swal.fire({
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

            // Implement form submission logic here
            // For example: await this.submitRegistration();
        },
    },
    mounted() {
        this.loading = true;
        let access_token = localStorage.getItem('access_token');
        if (access_token) {
            console.log('access_token', localStorage.getItem('access_token'));
            api.get('/premier-league/v1/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } })
                .then(response => {
                    window.location.href = '/season-select';
                })
                .catch(error => {
                    localStorage.removeItem('token');
                });
        }

        const user_params = JSON.parse(localStorage.getItem('user_params'));
        const token = user_params['access_token'];
        if (token) {
            localStorage.setItem('access_token', token);
            window.location.href = '/lobby';
        }

        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');

        this.referral = isNaN(parseInt(ref)) ? 0 : parseInt(ref);

        this.loading = false;
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

.button-save1 {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #0f580a;
    transform: translateY(-0.1em);
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

.button-save {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #0f580a;
    transform: translateY(-0.1em);
}

.button-save:active {
    box-shadow: inset 0px 0.1em 0.6em #0f580a;
    transform: translateY(0em);
}
</style>
