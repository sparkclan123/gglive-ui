<script setup>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="relative min-h-screen pb-16">

    <MenuScreen />
    <div class="container mx-auto p-4 mt-2">
      <div v-if="getLoading" class="loading-overlay">
        <LodingSceen style="display: flex; justify-content: space-around;" />
      </div>
      <router-view :style="getLoading ? 'visibility: hidden' : 'visibility: visible'" class="bg-color-1" />
    </div>

    <UserMobileNav class="fixed inset-x-0 bottom-0 bg-white rounded-t-mobile w-full h-16" />

  </div>
</template>

<script>
import UserMobileNav from './components/object/UserMobileNav.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    UserMobileNav
  },
  methods: {
    ...mapActions('loading', ['updateLoading']),
    ...mapActions('balance', ['facthBalance']),
  },
  computed: {
    ...mapGetters('loading', ['getLoading'])
  },
  mounted() {
    this.updateLoading(true)
    this.facthBalance()
  }
}
</script>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
.bg-color-1 {
  background-color: #1a2c38;
  border-radius: 0.5rem;
}

.user-mobile-nav {
  height: 60px;
  /* Set the height of the UserMobileNav */
}
</style>
