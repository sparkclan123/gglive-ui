<template>
  <Teleport to="body">
    <Transition>
      <div v-if="loading"
        class="fixed inset-0 bg-gradient-to-b shadow-[0px_0px_30px_1px_rgb(var(--primary-500)/0.4)_inset] from-black/80 via-black/50 to-black/80 flex items-center justify-center z-[1000]">
        <div class="flex flex-col text-center text-white gap-3">
          <div class="relative flex items-center justify-center">
            <div class="loader z-10" />
            <div class="absolute w-16 h-16 bg-yellow-400 rounded-full animate-ping filter blur-sm" />
            <div class="absolute w-16 h-16 bg-yellow-400 rounded-full animate-ping filter blur-xl" />

          </div>
          <p>Loading...</p>
        </div>
      </div>
    </Transition>
  </Teleport>
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
/* transition */
.v-enter-active,
.v-leave-active {
  @apply duration-300;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}

/* coin loader */
.loader {
  transform: translateZ(1px);
}

.loader:after {
  content: "OP";
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 32px;
  font-weight: bold;
  background: #2e343c;
  color: rgba(var(--primary-500));
  border: 4px double;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  animation: coin-flip 10s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes coin-flip {

  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }

  0% {
    transform: rotateY(0deg);
  }

  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }

  100% {
    transform: rotateY(3600deg);
  }
}
</style>
