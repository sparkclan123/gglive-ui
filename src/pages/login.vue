<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <!-- <div class="image-container p-2" v-if="!check_token">
            <img src="/public/assets/first.jpeg" alt="Logo" class="responsive-image">
        </div> -->
        <div class="flex flex-col items-center justify-center pt-20 m-2">

            <div class="w-full max-w-lg p-8 space-y-2 bg-white rounded-lg shadow-lg sm:w-96">

                <div class="container mx-auto flex justify-center">
                    <img src="/public/assets/logo.webp" alt="Logo" class="logo-circle">
                </div>
                <!-- <div>
                    <label for="username" class="block text-sm font-medium text-gray-500">ชื่อผู้ใช้งาน</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="username" v-model="username">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-500">รหัสผ่าน</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="**********" v-model="password">
                </div>
                
                <div class="w-full rounded-lg  mt-2 text-white text-lg font-semibold">
                    <button type="submit" class="w-full button-save" @click="loginform()">เข้าสู่ระบบ</button>
                </div> -->

                <div>
                    <label class="block text-sm font-medium text-red-500">**ระบบสมัคสมาชิกจะเปิดทำการภายในวันที่ 13-15 นี้ครับ</label>
                </div>

                <div>
                    <label class="block text-sm font-medium text-green-800">**ท่านสามารถ login ผ่าน google,line เพื่อเข้าระบบก่อนได้ครับ</label>
                </div>
                
                <!-- <div>
                    <label class="block text-sm font-medium text-gray-500" @click="route_register">สมัคสมาชิก</label>
                </div> -->
                <div class="social-icons">
                    <button aria-label="Log in with Google" class="icon" @click="loginWithGoogle">
                        <svg version="1.1" viewBox="0 0 150 150" width="50" height="50" class="fill-current">
                            <g>
                                <path class="st14"
                                    d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5   C115,101.8,120,90,120,76.1L120,76.1z" />
                                <path class="st15"
                                    d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9   L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z" />
                                <path class="st12"
                                    d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z" />
                                <path class="st13"
                                    d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3   l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z" />
                            </g>
                        </svg>
                    </button>
                    <button aria-label="Log in with GitHub" class="icon" @click="loginWithLine">
                        <svg version="1.1" viewBox="0 0 512 512" width="40" height="40" class="fill-current">
                            <g id="_x32_00-line">
                                <g>
                                    <path
                                        d="M475.999,116.242v280.204c-0.098,44-36.142,79.65-80.24,79.553H115.555    c-44.001-0.098-79.652-36.24-79.554-80.241V115.554c0.099-43.999,36.241-79.65,80.241-79.553h280.205    C440.445,36.1,476.098,72.144,475.999,116.242z"
                                        style="fill:#39AE41;" />
                                    <path
                                        d="M415.501,236.651c0-71.695-71.895-130.034-160.188-130.034    c-88.295,0-160.188,58.339-160.188,130.034c0,64.231,56.965,118.054,133.963,128.269c18.76,4.025,16.599,10.902,12.376,36.141    c-0.688,4.027-3.241,15.814,13.848,8.646c17.089-7.171,92.223-54.313,125.91-93.01    C404.401,291.159,415.501,265.331,415.501,236.651z"
                                        style="fill:#FEFEFE;" />
                                    <g>
                                        <path
                                            d="M300,202.081h-11.194c-1.771,0-3.145,1.375-3.145,3.143v41.446l-32.018-43.214     c-0.492-0.884-1.571-1.375-2.553-1.375h-11.098c-1.768,0-3.143,1.375-3.143,3.143v69.831c0,1.767,1.375,3.144,3.143,3.144h11.195     c1.769,0,3.143-1.377,3.143-3.144v-41.447l32.018,43.214c0.493,0.688,1.476,1.276,2.555,1.276h11.196     c1.768,0,3.143-1.375,3.143-3.144v-69.828C303.241,203.456,301.769,201.982,300,202.081z"
                                            style="fill:#39AE41;" />
                                        <path
                                            d="M222.705,201.982H211.51c-1.769,0-3.143,1.375-3.143,3.144v69.828     c0,1.769,1.375,3.144,3.143,3.144h11.195c1.769,0,3.143-1.375,3.143-3.144v-69.828     C225.848,203.456,224.474,201.982,222.705,201.982z"
                                            style="fill:#39AE41;" />
                                        <path
                                            d="M195.697,260.52h-30.544v-55.394c0-1.769-1.375-3.144-3.144-3.144h-11.196     c-1.769,0-3.143,1.375-3.143,3.144v69.828c0,0.886,0.295,1.573,0.883,2.16c0.59,0.493,1.277,0.887,2.161,0.887H195.6     c1.767,0,3.142-1.375,3.142-3.144V263.66C198.742,261.99,197.366,260.52,195.697,260.52z"
                                            style="fill:#39AE41;" />
                                        <path
                                            d="M362.169,219.464c1.77,0,3.143-1.374,3.143-3.142v-11.196c-0.098-1.67-1.472-3.144-3.143-3.144     h-44.884c-1.669,0-3.142,1.375-3.142,3.144v69.828c0,1.672,1.374,3.144,3.142,3.144h44.884c1.77,0,3.143-1.375,3.143-3.144     V263.76c0-1.77-1.373-3.144-3.143-3.144h-30.543V248.83h30.543c1.77,0,3.143-1.375,3.143-3.143v-11.295     c0-1.767-1.373-3.143-3.143-3.143h-30.543v-11.786H362.169z"
                                            style="fill:#39AE41;" />
                                    </g>
                                </g>
                            </g>
                            <g id="Layer_1" />
                        </svg>
                    </button>
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
            username: '',
            password: '',
            check_token: false
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('alert', ['addNotification']),
        route_register(){
            this.$router.push('/register');
        },
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

        if (has_token == "0632724459") {
            this.check_token = true;
        }

        // this.logVisit();
        // this.getVisit();

        this.updateLoading(false);
    }

}
</script>

<style scoped>
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