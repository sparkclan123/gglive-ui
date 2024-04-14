<template>
	<div class="space-x-4">
		<!-- Open Ring Spinner s1 -->
		<div class="w-12 h-12 rounded-full spinner_forloading
	                    border-8 border-solid border-gray-200 border-t-transparent shadow-lg "></div>
	</div>
</template>

<style>
  @keyframes fancy-spin {
    0% {
      transform: rotate(0turn) scale(1);
    }
    25% {
      transform: rotate(1turn) scale(1);
    }
    50% {
      transform: rotate(1turn) scale(1.5);
    }
    75% {
      transform: rotate(0turn) scale(1.5);
    }
    100% {
      transform: rotate(0turn) scale(1);
    }
  }

  .spinner_forloading {
    animation: fancy-spin 2000ms;
    animation-iteration-count: infinite;
  }
</style>

