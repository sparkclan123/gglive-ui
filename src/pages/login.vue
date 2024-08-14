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
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-500">เบอร์เข้าระบบ</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="tel" placeholder="08xxxxxxxx" v-model="username">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-500">รหัสผ่าน</label>
                    <input
                        class="mt-2 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="**********" v-model="password">
                </div>

                <div class="w-full rounded-lg  mt-2 text-white text-lg font-semibold">
                    <button type="submit" class="w-full button-save" @click="loginform()">เข้าสู่ระบบ</button>
                </div>

                <div class="flex items-center justify-between">
                    <span @click="resetPassword" class="text-blue-500 cursor-pointer"> ลืมรหัสผ่าน? </span>

                    <div class="flex items-center ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                            class="cursor-pointer" @click="route_register" id="pen-new-round">
                            <path fill="url(#paint0_linear_2461_19743)" fill-rule="evenodd"
                                d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM16.7705 2.27591C18.1384 0.908028 20.3562 0.908028 21.7241 2.27591C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27591ZM20.6634 3.33657C19.8813 2.55448 18.6133 2.55448 17.8312 3.33657L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33657ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z"
                                clip-rule="evenodd"></path>
                            <defs>
                                <linearGradient id="paint0_linear_2461_19743" x1="12" x2="12" y1="1.25" y2="22.75"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#854D9C"></stop>
                                    <stop offset="1" stop-color="#CD4ED3"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <label class="block text-sm font-medium text-green-900 cursor-pointer ml-2"
                            @click="route_register">สมัครสมาชิก</label>
                    </div>
                </div>

                <div class="">
                    <span class="text-gray-600 text-xs">หรือเข้าสู่ระบบด้วย</span>
                </div>
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
        resetPassword() {
            this.$router.push('/reset-password');
        },
        route_register() {
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