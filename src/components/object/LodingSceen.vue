<template>
  <div v-if="loading" class="loading-overlay">
      <svg class="spinner" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
  </div>
</template>

<script>
export default {
  props: {
      loading: {
          type: Boolean,
          required: true
      }
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  animation: spin 1s linear infinite;
  width: 50px;
  height: 50px;
}

.path {
  stroke: #ffffff;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}
</style>
