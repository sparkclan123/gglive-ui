<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
        }
    },
    created() {
        let access_token = localStorage.getItem('access_token');
        if (access_token) {
            console.log('access_token', localStorage.getItem('access_token'));
            axios.get('/user/m/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } })
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
    }
}
</script>