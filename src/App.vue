<script setup>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->

  <div class="container mx-auto p-4 mt-2 ">
    <MenuScreen />
    <div v-if="getLoading" class="loading-overlay">
      <LodingSceen style="display: flex;justify-content: space-around;" />
    </div>
    <router-view :style="getLoading ? 'visibility: hidden' : 'visibility: visible'"  class="bg-color-1"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
</style>
