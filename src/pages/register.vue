<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>

        <div class="flex flex-col items-center justify-center pt-20 m-2">

            <div class="w-full max-w-lg p-8 space-y-2 bg-white rounded-lg shadow-lg sm:w-96">

                <div class="container mx-auto flex justify-center">
                    <img src="/public/assets/logo.webp" alt="Logo" class="logo-circle">
                </div>
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-500">ชื่อ</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="ชื่อ" v-model="name">
                </div>
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-500">เบอร์สำหรับเข้าสู่ระบบ</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone" type="tel" placeholder="เบอร์โทร" v-model="phonenum">
                </div>
                <div>
                    <label for="otp" class="block text-sm font-medium text-gray-500">OTP</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="otp" type="tal" placeholder="**********" v-model="otp">
                </div>
                <div class="w-full rounded-lg  mt-2 text-white text-lg font-semibold">
                    <button type="submit" class="w-full button-save1" @click="callOtp()">sendOTP</button>
                </div>
                <div class="w-full rounded-lg  mt-2 text-white text-lg font-semibold">
                    <button type="submit" class="w-full button-save" @click="loginform()">เข้าสู่ระบบ</button>
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
import { api, apiMine } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    name: 'Login',
    data() {
        return {
            loading: false,
            name: '',
            phonenum: '',
            otp: '',
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('alert', ['addNotification']),
        async loginform() {

            if (!this.username || !this.password) {
                this.addNotification({ type: 'error', message: 'Please fill in all fields' });
                return;
            }
            this.loading = true;
            try {
                const response = await api.post('/premier-league/v1/login', {
                    username: this.username,
                    password: this.password,
                    app_key: 'pudee'
                });
                this.loading = false;
                this.addNotification({ type: 'success', message: 'Login successful' });
                localStorage.setItem('access_token', response.data.tokenString);
                window.location.href = '/season-select';
            } catch (error) {
                this.loading = false;
                this.addNotification({ type: 'error', message: error.response.data.error });
                localStorage.removeItem('access_token');
            }
        },
        login() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
        },
        loginWithGoogle() {
            this.loading = true;
            window.location.href = 'https://api-service.pudee-club.com/api/premier-league/auth/login';
            // window.location.href = 'http://127.0.0.1:8010/api/premier-league/auth/login';
        },
        loginWithFacebook() {
            Swal.fire({
                text: 'เปิด login ได้เเค่ google กับ line เท่านั้น',
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
            // window.location.href = 'https://api-service.pudee-club.com/api/premier-league/auth/facebook/login';
            // window.location.href = 'http://127.0.0.1:8010/api/premier-league/auth/facebook/login';
        },
        loginWithLine() {

            this.loading = true;
            window.location.href = `https://api-service.pudee-club.com/api/premier-league/auth/line/login`;

            // window.location.href = 'https://api-service.pudee-club.com/api/premier-league/auth/line/login';
            // window.location.href = 'http://127.0.0.1:8010/api/premier-league/auth/line/login';
        },
        generateState() {
            return Math.random().toString(36).substring(2);
        },

        async callOtp() {
            this.updateLoading(true);
            try {
                const response = await api.post('/premier-league/auth/callotp', {
                    phone_number: this.phonenum,
                });

                this.updateLoading(false);

            } catch (error) {

                this.updateLoading(false);
            }
        },
        async loginuuid(uuid, username) {
            this.updateLoading(true);
            try {
                const response = await api.post('/premier-league/v1/login-uuid', {
                    uuid: uuid,
                    username: username,
                    app_key: 'pudee'
                });
                this.addNotification({ type: 'success', message: 'Login successful' });
                localStorage.setItem('access_token', response.data.tokenString);
                this.updateLoading(false);
                window.location.href = '/season-select';
            } catch (error) {
                this.addNotification({ type: 'error', message: error.response.data.error });
                localStorage.removeItem('access_token');
                this.updateLoading(false);
            }
        },
        async logVisit() {
            try {
                await api.post('/premier-league/log-visit', {
                    page: 'login'
                });
            } catch (error) {
                console.error('Error logging visit:', error);
            }
        },
        getVisit() {
            api.get('/premier-league/log-visit').then(response => {
                console.log('visit', response.data);
            }).catch(error => {
                console.error('Error getting visit:', error);
            });
        }
    },
    mounted() {
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
        const uuid = urlParams.get('uuid');
        const username = urlParams.get('username');
        const has_token = urlParams.get('token');
        if (uuid && username) {
            this.loginuuid(uuid, username);
        }



        this.updateLoading(false);
    }

}
</script>

<style scoped>
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

.button-save1 {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #0f580a;
    transform: translateY(-0.1em);
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

.button-save {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #0f580a;
    transform: translateY(-0.1em);
}

.button-save:active {
    box-shadow: inset 0px 0.1em 0.6em #0f580a;
    transform: translateY(0em);
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* ปรับให้ container สูงเต็มหน้าจอ */
    overflow: hidden;
    /* ป้องกันการล้น */
}

.responsive-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 15px;
    /* เพิ่มมุมโค้ง */
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.8),
        /* เงาด้านล่าง */
        -10px -10px 20px rgba(255, 255, 255, 0.3);
    /* เงาด้านบน */
    border: 1px solid rgba(255, 255, 255, 0.3);
    /* เพิ่มขอบบางๆ เพื่อความสมจริง */
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    /* เพิ่มเอฟเฟกต์ 3D */
}

.social-icons {
    display: flex;
    justify-content: center;
}

.social-icons .icon {
    border-radius: 0.125rem;
    padding: 0.75rem;
    border: none;
    background-color: transparent;
    margin-left: 8px;
}

.social-icons .icon svg {
    fill: #202020;
}

.signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgb(67, 68, 69);
}

.logo-circle {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    object-fit: cover;
}

.st0 {
    fill: #1A73E8;
}

.st1 {
    fill: #EA4335;
}

.st2 {
    fill: #4285F4;
}

.st3 {
    fill: #FBBC04;
}

.st4 {
    fill: #34A853;
}

.st5 {
    fill: #4CAF50;
}

.st6 {
    fill: #1E88E5;
}

.st7 {
    fill: #E53935;
}

.st8 {
    fill: #C62828;
}

.st9 {
    fill: #FBC02D;
}

.st10 {
    fill: #1565C0;
}

.st11 {
    fill: #2E7D32;
}

.st12 {
    fill: #F6B704;
}

.st13 {
    fill: #E54335;
}

.st14 {
    fill: #4280EF;
}

.st15 {
    fill: #34A353;
}

.st16 {
    clip-path: url(#SVGID_2_);
}

.st17 {
    fill: #188038;
}

.st18 {
    opacity: 0.2;
    fill: #FFFFFF;
    enable-background: new;
}

.st19 {
    opacity: 0.3;
    fill: #0D652D;
    enable-background: new;
}

.st20 {
    clip-path: url(#SVGID_4_);
}

.st21 {
    opacity: 0.3;
    fill: url(#_45_shadow_1_);
    enable-background: new;
}

.st22 {
    clip-path: url(#SVGID_6_);
}

.st23 {
    fill: #FA7B17;
}

.st24 {
    opacity: 0.3;
    fill: #174EA6;
    enable-background: new;
}

.st25 {
    opacity: 0.3;
    fill: #A50E0E;
    enable-background: new;
}

.st26 {
    opacity: 0.3;
    fill: #E37400;
    enable-background: new;
}

.st27 {
    fill: url(#Finish_mask_1_);
}

.st28 {
    fill: #FFFFFF;
}

.st29 {
    fill: #0C9D58;
}

.st30 {
    opacity: 0.2;
    fill: #004D40;
    enable-background: new;
}

.st31 {
    opacity: 0.2;
    fill: #3E2723;
    enable-background: new;
}

.st32 {
    fill: #FFC107;
}

.st33 {
    opacity: 0.2;
    fill: #1A237E;
    enable-background: new;
}

.st34 {
    opacity: 0.2;
}

.st35 {
    fill: #1A237E;
}

.st36 {
    fill: url(#SVGID_7_);
}

.st37 {
    fill: #FBBC05;
}

.st38 {
    clip-path: url(#SVGID_9_);
    fill: #E53935;
}

.st39 {
    clip-path: url(#SVGID_11_);
    fill: #FBC02D;
}

.st40 {
    clip-path: url(#SVGID_13_);
    fill: #E53935;
}

.st41 {
    clip-path: url(#SVGID_15_);
    fill: #FBC02D;
}

.cls-1 {
    fill: #00cf2e;
}

.cls-2 {
    fill: #fff;
}
</style>