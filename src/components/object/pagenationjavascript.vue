<template>
  <div class="w-full flex justify-center">
    <div class="flex items-center space-x-2 text-gray-700 select-none">

      <!-- ปุ่มก่อนหน้า -->
      <button
        @click="previousPage"
        class="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-purple-200 to-purple-300 text-purple-700 hover:from-purple-400 hover:to-purple-500 hover:text-white shadow-sm transition-all duration-200"
        :class="{ 'opacity-40 cursor-not-allowed hover:from-purple-200 hover:to-purple-300 hover:text-purple-700': page === 1 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- หมายเลขหน้า -->
      <div class="flex items-center space-x-1 bg-purple-50 rounded-full px-3 py-1 shadow-inner">
        <template v-for="pageNumber in pagesToShow" :key="pageNumber">
          <div
            v-if="pageNumber === '...'"
            class="w-8 h-8 flex items-center justify-center text-gray-400"
          >
            ...
          </div>
          <button
            v-else
            @click="goToPage(pageNumber)"
            class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200"
            :class="pageNumber === page
              ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg scale-105'
              : 'text-gray-700 hover:bg-purple-200 hover:text-purple-800'"
          >
            {{ pageNumber }}
          </button>
        </template>
      </div>

      <!-- ปุ่มถัดไป -->
      <button
        @click="nextPage"
        class="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-purple-200 to-purple-300 text-purple-700 hover:from-purple-400 hover:to-purple-500 hover:text-white shadow-sm transition-all duration-200"
        :class="{ 'opacity-40 cursor-not-allowed hover:from-purple-200 hover:to-purple-300 hover:text-purple-700': page === pages }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: { type: Number, required: true },
    pages: { type: Number, required: true },
  },
  computed: {
    pagesToShow() {
      const range = [];
      const displayRange = 3;
      const halfRange = Math.floor(displayRange / 2);

      if (this.pages <= displayRange) {
        for (let i = 1; i <= this.pages; i++) range.push(i);
      } else {
        if (this.page <= halfRange + 1) {
          for (let i = 1; i <= displayRange; i++) range.push(i);
          range.push('...', this.pages);
        } else if (this.page >= this.pages - halfRange) {
          range.push(1, '...');
          for (let i = this.pages - displayRange + 1; i <= this.pages; i++) range.push(i);
        } else {
          range.push(1, '...');
          for (let i = this.page - halfRange; i <= this.page + halfRange; i++) range.push(i);
          range.push('...', this.pages);
        }
      }
      return range;
    },
  },
  methods: {
    previousPage() {
      if (this.page > 1) this.$emit('page-change', this.page - 1);
    },
    nextPage() {
      if (this.page < this.pages) this.$emit('page-change', this.page + 1);
    },
    goToPage(page) {
      if (page !== '...') this.$emit('page-change', page);
    },
  },
};
</script>

<style scoped>
button:focus {
  outline: none;
  box-shadow: none;
}
.cursor-not-allowed {
  pointer-events: none;
  opacity: 0.5;
}
</style>
