<template>
    <div class="flex flex-col items-center justify-center pt-20">

        <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg sm:w-96">
            <div class="container mx-auto flex justify-center">
                <img src="/public/assets/logo.webp" alt="Logo" class="h-12">
            </div>
            <div>
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
            <button @click="loginform()"
                class="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-800 focus:outline-none focus:shadow-outline">
                เข้าสู่ระบบ
            </button>
        </div>
        <div class="footer-login mt-10">
            <div class="flex justify-items-center items-center flex-col mt-4">
                <img class="h-16 w-16 object-cover" src="/assets/qr.png" alt="" />
                <div class="develop-text mt-3">
                    <span class="text-gray-700 text-sm">หากท่านต้องการเข้าใช้งานระบบผ่าน
                        api กรุณาติดต่อ@PuDee</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions } from 'vuex'
import { api, apiMine } from '@axios_inst';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('alert', ['addNotification']),
        async loginform() {
            this.addNotification({ type: 'error', message: 'Login failed' });
            try {
                await api.post('/premier-league/v1/login', {
                    username: this.username,
                    password: this.password,
                    app_key: 'pudee'
                })
                    .then(response => {
                        console.log(response.data);
                        // localStorage.setItem('access_token', response.data.access_token);
                    })
                    .catch(error => {
                        localStorage.removeItem('token');
                    });
            } catch (error) {

            }
        },
        login() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
        }
    },
    mounted() {
        let access_token = localStorage.getItem('access_token');
        if (access_token) {
            console.log('access_token', localStorage.getItem('access_token'));
            api.get('/user/m/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } })
                .then(response => {
                    window.location.href = '/lobby';
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
        this.updateLoading(false);
    }
}
</script>