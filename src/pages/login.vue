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
    }
}
</script>