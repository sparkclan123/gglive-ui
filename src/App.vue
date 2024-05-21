<template>
  <div>
    <Alert />
    <router-view></router-view>
  </div>
</template>

<script>
import Alert from './components/alert.vue';
export default {
  name: 'App',
  components: {
    Alert
  }
}
</script>
