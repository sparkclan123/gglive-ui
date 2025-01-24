<template>

    <div class="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed"
        style="background-image: url('header.png');">
        <div class="h-full">
            <!--Nav-->
            <div class="w-full container mx-auto">
                <div class="w-full flex items-center justify-between">
                    <a class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                        href="#">
                        PuDee <span
                            class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">Fantasy</span>
                    </a>

                    <div class="flex w-1/2 justify-end content-center">
                        <a class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                            href="https://twitter.com/intent/tweet?url=#">
                            <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path
                                    d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z">
                                </path>
                            </svg>
                        </a>
                        <a class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                            href="https://www.facebook.com/sharer/sharer.php?u=#">
                            <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!--Main-->
            <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <!--Left Col-->
                <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                    <h1
                        class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                        Main
                        <span
                            class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                            Hero Message
                        </span>
                        to sell yourself!
                    </h1>
                    <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                        Sub-hero message, not too long and not too short. Make it just right!
                    </p>

                    <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                                Username:
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                id="emailaddress" type="text" placeholder="you username" v-model="username" />
                            <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                                Password:
                            </label>
                            <input v-model="password"
                                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                id="emailaddress" type="text" placeholder="password" />
                        </div>

                        <div class="flex items-center justify-between pt-4">
                            <button @click="loginform()"
                                class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                type="button">
                                Login
                            </button>
                        </div>
                    </form>
                </div>



                <!-- Header -->
                <div class="text-center">
                    <h1 class="text-4xl font-bold mb-4">PuDee Fantasy Project Phases</h1>
                    <p class="text-lg text-gray-300">See how our Football Fantasy platform evolves step by step!
                    </p>
                </div>

                <!-- Phase 1 -->
                <div class="container mx-auto px-6 py-10">
                    <div class="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-semibold text-indigo-400 mb-4">Phase 1: Launch and Awareness
                        </h2>
                        <p class="text-gray-300 mb-4">Duration: 1-3 months</p>
                        <ul class="list-disc list-inside text-gray-300">
                            <li>Create a landing page with project details and token information.</li>
                            <li>Launch the PuDee Token with clear Tokenomics:</li>
                            <ul class="list-disc pl-6 text-gray-300">
                                <li>Total Supply: 100 billion tokens.</li>
                                <li>20% allocated for developers.</li>
                                <li>10% allocated for marketing.</li>
                                <li>70% reserved for liquidity and community incentives.</li>
                            </ul>
                            <li>Set up a Liquidity Pool on a DEX (e.g., QuickSwap).</li>
                            <li>Build a community on social platforms like Twitter, Telegram, and Discord.</li>
                        </ul>
                    </div>
                </div>

                <!-- Phase 2 -->
                <div class="container mx-auto px-6 py-10">
                    <div class="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-semibold text-indigo-400 mb-4">Phase 2: Beta Launch and
                            Engagement</h2>
                        <p class="text-gray-300 mb-4">Duration: 3-6 months</p>
                        <ul class="list-disc list-inside text-gray-300">
                            <li>Introduce the Fantasy Football system with player selection and scoring.</li>
                            <li>Add visuals like screenshots and a project roadmap to the landing page.</li>
                            <li>Host special events and competitions using the token.</li>
                            <li>Highlight user testimonials to build trust.</li>
                        </ul>
                    </div>
                </div>

                <!-- Phase 3 -->
                <div class="container mx-auto px-6 py-10">
                    <div class="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-semibold text-indigo-400 mb-4">Phase 3: Full Launch and
                            Expansion</h2>
                        <p class="text-gray-300 mb-4">Duration: 6-12 months</p>
                        <ul class="list-disc list-inside text-gray-300">
                            <li>Launch the platform fully with token-based payments.</li>
                            <li>Add advanced features like player analytics and a marketplace for in-game items.
                            </li>
                            <li>List the PuDee Token on centralized exchanges (e.g., KuCoin, Gate.io).</li>
                            <li>Submit the token to platforms like CoinMarketCap and CoinGecko for visibility.
                            </li>
                            <li>Launch the platform in time for the next Premier League season.</li>
                        </ul>
                    </div>
                </div>

                <!-- Phase 4 -->
                <div class="container mx-auto px-6 py-10">
                    <div class="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-semibold text-indigo-400 mb-4">Phase 4: Scaling and Global
                            Outreach</h2>
                        <p class="text-gray-300 mb-4">Duration: 12+ months</p>
                        <ul class="list-disc list-inside text-gray-300">
                            <li>Expand the platform to include other sports like basketball, esports, and
                                boxing.</li>
                            <li>Introduce advanced features such as AI-based team suggestions.</li>
                            <li>Host international competitions to attract a global audience.</li>
                            <li>Establish a DAO (Decentralized Autonomous Organization) for token holders to
                                vote on decisions.</li>
                        </ul>
                    </div>


                
                </div>




                <div class="mx-auto md:pt-16">
                    <p class="text-blue-400 font-bold pb-8 lg:pb-6 text-center">
                        PuDee Fantasy Demo page:
                    </p>
                    <div class="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
                        <img src="/public/assets/l2.png" style="height: 520px;"
                            class=" pr-12 transform hover:scale-125 duration-300 ease-in-out" />

                        <img src="/public/assets/l1.png" style="height: 520px;"
                            class="pr-12  transform hover:scale-125 duration-300 ease-in-out" />
                        <img src="/public/assets/l4.png" style="height: 520px;"
                            class=" pr-12 transform hover:scale-125 duration-300 ease-in-out" />
                        <img src="/public/assets/l3.png" style="height: 520px;"
                            class="pr-12 transform hover:scale-125 duration-300 ease-in-out" />
                        <img src="/public/assets/l5.png" style="height: 520px;"
                            class="transform hover:scale-125 duration-300 ease-in-out" />
                    </div>
                </div>

                <!--Footer-->
                <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                    <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; App 2025</a>
                    <p class="text-gray-400">&copy; 2025 PuDee Fantasy. All rights reserved.</p>

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
            // Swal.fire({
            //     text: 'Currently under development and will be completed in Phase 2.',
            //     showCancelButton: true,
            //     cancelButtonText: 'cancel',
            //     showConfirmButton: false,
            //     customClass: {
            //         cancelButton: 'btn-cancel',
            //         popup: 'popup-custom',
            //         title: 'text-custom',
            //         htmlContainer: 'text-custom'
            //     },
            //     buttonsStyling: false,
            // });
            // return;
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

        loginWithGoogle() {
            Swal.fire({
                text: 'Currently under development and will be completed in Phase 2.',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                showConfirmButton: false,
                customClass: {
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });
            return;
            this.loading = true;
            window.location.href = 'https://api-service.pudee-club.com/api/premier-league/auth/login';
            // window.location.href = 'http://127.0.0.1:8010/api/premier-league/auth/login';
        },

        generateState() {
            return Math.random().toString(36).substring(2);
        },
        async loginuuid(uuid, username) {
            Swal.fire({
                text: 'Currently under development and will be completed in Phase 2.',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                showConfirmButton: false,
                customClass: {
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });
            return;

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

    },
    mounted() {
        // let access_token = localStorage.getItem('access_token');
        // if (access_token) {
        //     console.log('access_token', localStorage.getItem('access_token'));
        //     api.get('/premier-league/v1/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } })
        //         .then(response => {
        //             window.location.href = '/season-select';
        //         })
        //         .catch(error => {
        //             localStorage.removeItem('token');
        //         });
        // }

        // const user_params = JSON.parse(localStorage.getItem('user_params'));
        // const token = user_params['access_token'];
        // if (token) {
        //     localStorage.setItem('access_token', token);
        //     window.location.href = '/lobby';
        // }

        // const urlParams = new URLSearchParams(window.location.search);
        // const uuid = urlParams.get('uuid');
        // const username = urlParams.get('username');
        // const has_token = urlParams.get('token');
        // if (uuid && username) {
        //     this.loginuuid(uuid, username);
        // }

        // if (has_token == "0632724459") {
        //     this.check_token = true;
        // }

        // this.logVisit();
        // this.getVisit();

        this.updateLoading(false);
    }

}
</script>

<style scoped>
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
    /* addมุมโค้ง */
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.8),
        /* เงาด้านล่าง */
        -10px -10px 20px rgba(255, 255, 255, 0.3);
    /* เงาด้านบน */
    border: 1px solid rgba(255, 255, 255, 0.3);
    /* addขอบบางๆ เพื่อความสมจริง */
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    /* addเอฟเฟกต์ 3D */
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