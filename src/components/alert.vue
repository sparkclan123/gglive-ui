<template>
    <div class="fixed top-4 right-4 z-50 space-y-4">
      <transition-group name="alert" tag="div">
        <div v-for="notification in notifications" :key="notification.id" :class="alertClass(notification.type)"
             class="rounded-lg py-5 px-6 mb-4 text-base alert-notification" role="alert">
          {{ notification.message }}
        </div>
      </transition-group>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('alert', ['getNotifications']),
      notifications() {
        return this.getNotifications;
      }
    },
    methods: {
      alertClass(type) {
        switch (type) {
          case 'success':
            return 'bg-green-100 text-green-700';
          case 'error':
            return 'bg-red-100 text-red-700';
          case 'warning':
            return 'bg-yellow-100 text-yellow-700';
          default:
            return 'bg-blue-100 text-blue-700';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .fixed {
    top: 1rem;
    right: 1rem;
    z-index: 50;
  }
  
  .alert-enter-active, .alert-leave-active, .alert-move {
    transition: all 0.5s ease;
  }
  
  .alert-enter, .alert-leave-to /* .alert-leave-active in versions <=2.1.8 */ {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .alert-notification {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  
  .alert-enter-active {
    animation: slide-in 0.5s forwards;
  }
  
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  