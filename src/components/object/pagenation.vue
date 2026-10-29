<template>
  <nav class="member-pagination" aria-label="เปลี่ยนหน้ารายการ">
    <button class="page-arrow" :disabled="disabled || currentPage <= 1" @click="previousPage" aria-label="หน้าก่อนหน้า"><MemberIcon name="back" /></button>
    <div class="pagination-pages">
      <template v-for="(pageNumber, index) in pagesToShow" :key="`${pageNumber}-${index}`">
        <span v-if="pageNumber === '...'" class="page-gap" aria-hidden="true">…</span>
        <button v-else :disabled="disabled" :aria-current="pageNumber === currentPage ? 'page' : undefined" :aria-label="`หน้า ${pageNumber}`" :class="{ 'is-current': pageNumber === currentPage }" @click="goToPage(pageNumber)">{{ pageNumber }}</button>
      </template>
    </div>
    <form class="pagination-jump" @submit.prevent="submitPage">
      <label><span class="sr-only">ไปยังหน้า</span><input v-model="jumpPage" type="number" inputmode="numeric" enterkeyhint="go" :min="1" :max="totalPages" :disabled="disabled" aria-label="ไปยังหน้า" /></label>
      <span class="pagination-total">/ {{ totalPages.toLocaleString('th-TH') }}</span>
      <button type="submit" :disabled="disabled" aria-label="ไปยังหน้าที่ระบุ">ไป</button>
    </form>
    <button class="page-arrow" :disabled="disabled || currentPage >= totalPages" @click="nextPage" aria-label="หน้าถัดไป"><MemberIcon name="back" class="next-icon" /></button>
    <span class="sr-only" aria-live="polite">หน้า {{ currentPage }} จาก {{ totalPages }}</span>
  </nav>
</template>
<script>
export default {
  props: { page: { type: Number, required: true }, pages: { type: Number, required: true }, disabled: Boolean },
  emits: ['page-change'],
  data() { return { jumpPage: this?.page || 1 }; },
  computed: {
    totalPages() { const count = Math.floor(Number(this.pages)); return Number.isSafeInteger(count) && count > 0 ? count : 1; },
    currentPage() { return Math.min(this.totalPages, Math.max(1, Math.floor(Number(this.page)) || 1)); },
    pagesToShow() {
      if (this.totalPages <= 5) return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      const numbers = [...new Set([1, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.totalPages])].filter(p => p >= 1 && p <= this.totalPages).sort((a,b) => a-b);
      const result = [];
      numbers.forEach((page, index) => { if (index && page - numbers[index - 1] > 1) result.push('...'); result.push(page); });
      return result;
    },
  },
  watch: { currentPage: { immediate: true, handler(value) { this.jumpPage = value; } } },
  methods: {
    previousPage() { this.goToPage(this.currentPage - 1); },
    nextPage() { this.goToPage(this.currentPage + 1); },
    submitPage() { this.goToPage(this.jumpPage); this.jumpPage = this.currentPage; },
    goToPage(page) {
      const target = Number(page);
      if (!this.disabled && Number.isInteger(target) && target >= 1 && target <= this.totalPages && target !== this.currentPage) this.$emit('page-change', target);
    },
  },
};
</script>
<style scoped>
.member-pagination{display:flex;align-items:center;justify-content:center;gap:6px;max-width:100%;margin:18px 0 8px;min-width:0}.pagination-pages{display:flex;gap:5px;align-items:center}.member-pagination button,.page-gap{display:grid;place-items:center;min-width:40px;height:44px;border-radius:10px;font:500 12px var(--member-body);color:var(--member-muted)}.member-pagination button{border:1px solid var(--member-line);background:var(--member-panel);padding:0 8px;cursor:pointer}.member-pagination button.is-current{background:var(--member-primary);color:#fff;border-color:transparent}.member-pagination button:disabled{opacity:.35;cursor:default}.member-pagination button:focus-visible{outline:2px solid var(--member-soft);outline-offset:3px}.member-pagination .page-arrow{min-width:44px;flex:none}.page-arrow svg{height:18px;width:18px}.next-icon{transform:rotate(180deg)}.page-gap{min-width:18px}.pagination-jump{display:none}.member-pagination button:hover:not(:disabled):not(.is-current){color:var(--member-text);border-color:var(--member-soft)}
@media(max-width:640px){.pagination-pages{display:none}.pagination-jump{display:flex;align-items:center;gap:7px;min-width:0}.pagination-jump label{min-width:0}.pagination-jump input{width:62px;min-width:0;min-height:44px;border:1px solid var(--member-line);background:var(--member-input);color:var(--member-text);border-radius:10px;text-align:center;font-size:16px;padding:8px 4px;appearance:textfield;-moz-appearance:textfield}.pagination-jump input::-webkit-inner-spin-button,.pagination-jump input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.pagination-total{font-size:11px;white-space:nowrap;color:var(--member-muted);font-variant-numeric:tabular-nums}.pagination-jump button{min-width:44px}.member-pagination{gap:7px}}
</style>
