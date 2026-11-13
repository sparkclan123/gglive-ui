<template>
  <div class="rules-reader">
    <RouterLink to="/season-select" class="rules-back">← กลับไปเลือกการแข่งขัน</RouterLink>
    <div v-if="loading" class="rules-state" role="status">กำลังโหลดกติกาการแข่งขัน…</div>
    <div v-else-if="error" class="rules-state" role="alert"><h1>ยังโหลดกติกาไม่ได้</h1><p>{{ error }}</p><button type="button" @click="loadRules">ลองอีกครั้ง</button></div>
    <template v-else-if="rules">
      <header class="rules-heading">
        <div class="rules-book" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6c-3-2-6-2-9-1v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1m0-15v15"/></svg></div>
        <div><h1>{{ rules.title }}</h1><p>การจัดทีม การนับคะแนน และเงื่อนไขการแข่งขัน</p><time v-if="rules.updated_at" :datetime="rules.updated_at">อัปเดต {{ formatDate(rules.updated_at) }}</time></div>
      </header>
      <div class="rules-layout">
        <aside class="rules-aside">
          <nav aria-label="หัวข้อกติกา" class="rules-nav"><h2>ในหน้านี้</h2><a v-for="(section, index) in rules.sections" :key="index" :href="`#rule-section-${index}`" @click.prevent="jumpToSection(`rule-section-${index}`)">{{ section.heading }}</a><a v-if="rules.images.length" href="#rule-images" @click.prevent="jumpToSection('rule-images')">รูปประกอบกติกา</a></nav>
          <div class="rules-help"><p>มีคำถามเกี่ยวกับกติกา?</p><a :href="memberBrand.lineUrl" target="_blank" rel="noopener noreferrer">ติดต่อทีมงานทาง LINE</a></div>
        </aside>
        <div class="rules-document">
          <section v-for="(section, index) in rules.sections" :id="`rule-section-${index}`" :key="index" class="rules-section"><h2>{{ section.heading }}</h2><p v-for="(paragraph, part) in section.body.split(/\n{2,}/)" :key="part">{{ paragraph }}</p></section>
          <section v-if="rules.images.length" id="rule-images" class="rules-section rules-figures">
            <h2>รูปประกอบกติกา</h2><p class="rules-image-hint">กดที่ภาพเพื่อเปิดดูขนาดเต็ม</p>
            <figure v-for="(image, index) in rules.images" :key="image.url + index">
              <a v-if="!imageErrors[index]" :href="image.url" target="_blank" rel="noopener noreferrer" :aria-label="`เปิดภาพขนาดเต็ม: ${image.alt || 'รูปกติกา'}`"><img :src="image.url" :alt="image.alt || 'รูปประกอบกติกา'" loading="lazy" @error="imageErrors[index] = true" /></a>
              <p v-else class="rules-image-error">โหลดภาพไม่ได้ <a :href="image.url" target="_blank" rel="noopener noreferrer">ลองเปิดภาพต้นฉบับ</a></p><figcaption v-if="image.alt">{{ image.alt }}</figcaption>
            </figure>
          </section>
          <footer class="rules-footer"><span>พร้อมจัดทีมของคุณแล้ว?</span><RouterLink to="/season-select">เลือกการแข่งขัน</RouterLink></footer>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { api } from '@axios_inst';
import { memberBrand } from '../../config/memberBrand.js';
import { rulesResponse } from '../../lib/memberRules.js';
export default {
  data: () => ({ rules: null, loading: false, error: '', imageErrors: {}, memberBrand }),
  methods: {
    jumpToSection(id) { document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' }); },
    formatDate(value) { return new Date(value).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }); },
    async loadRules() {
      if (this.loading) return;
      this.loading = true; this.error = '';
      try { this.rules = rulesResponse(await api.get('/premier-league/v1/member-rules', { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })); this.imageErrors = {}; }
      catch (error) { this.error = error.response?.data?.error || 'กรุณาตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง'; }
      finally { this.loading = false; }
    }
  },
  mounted() { this.loadRules(); }
};
</script>
<style scoped>
.rules-reader{max-width:1100px;margin:0 auto;color:var(--member-text,#f4f4f5);font-family:var(--member-body,sans-serif)}
.rules-back{display:inline-flex;align-items:center;min-height:44px;color:var(--member-muted,#b5b5bd);font-size:13px;margin-bottom:12px}
.rules-heading{display:flex;align-items:flex-start;gap:20px;padding:22px 0 34px;border-bottom:1px solid var(--member-line,#333)}
.rules-heading h1{font-size:clamp(23px,3.2vw,34px);line-height:1.4;font-weight:700;max-width:28ch}.rules-heading p{color:var(--member-muted,#b5b5bd);font-size:14px;line-height:1.8;margin-top:10px}.rules-heading time{display:block;color:var(--member-muted,#b5b5bd);font-size:12px;margin-top:12px}
.rules-book{width:56px;height:64px;flex:none;display:grid;place-items:center;background:var(--member-primary,#E52520);border-radius:8px 18px 18px 8px;color:#fff}.rules-book svg{width:29px;height:29px}
.rules-layout{display:grid;grid-template-columns:210px minmax(0,1fr);gap:40px;padding-top:32px}.rules-aside{align-self:start;position:sticky;top:24px}.rules-nav h2{font-size:12px;color:var(--member-muted,#b5b5bd);margin-bottom:12px}.rules-nav a{display:block;padding:11px 0 11px 14px;border-left:2px solid var(--member-line,#333);font-size:13px;line-height:1.5;color:var(--member-muted,#b5b5bd)}.rules-nav a:hover{border-color:var(--member-primary,#E52520);color:var(--member-text,#f4f4f5)}
.rules-help{margin-top:28px;border-top:1px solid var(--member-line,#333);padding-top:20px;font-size:12px;line-height:1.8;color:var(--member-muted,#b5b5bd)}.rules-help a{display:inline-block;color:var(--member-text,#f4f4f5);text-decoration:underline;text-underline-offset:4px;margin-top:5px;min-height:36px}
.rules-document{min-width:0;border:1px solid var(--member-line,#333);border-radius:16px;background:var(--member-panel,#151515);padding:0 30px}.rules-section{padding:28px 0;border-bottom:1px solid var(--member-line,#333);scroll-margin-top:24px}.rules-section h2{font-size:19px;font-weight:600;line-height:1.5;margin-bottom:16px}.rules-section p{max-width:72ch;font-size:15px;line-height:1.95;color:var(--member-muted,#b5b5bd);white-space:pre-line;overflow-wrap:anywhere}.rules-section p+p{margin-top:16px}
.rules-figures .rules-image-hint{font-size:12px;margin-top:-8px;margin-bottom:20px}.rules-figures figure+figure{margin-top:24px}.rules-figures img{display:block;width:100%;height:auto;border-radius:8px;background:white}.rules-figures figcaption{font-size:12px;color:var(--member-muted,#b5b5bd);margin-top:10px;line-height:1.6}.rules-image-error{padding:24px;border:1px dashed var(--member-line,#333);border-radius:8px}.rules-image-error a{text-decoration:underline}
.rules-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:26px 0;font-size:13px;color:var(--member-muted,#b5b5bd)}.rules-footer a,.rules-state button{background:var(--member-primary,#E52520);border-radius:8px;padding:12px 18px;min-height:44px;color:#fff;font-weight:600;text-align:center}.rules-state{padding:48px 24px;border:1px solid var(--member-line,#333);border-radius:16px;text-align:center;color:var(--member-muted,#b5b5bd)}.rules-state h1{font-size:22px;color:var(--member-text,#f4f4f5);margin-bottom:12px}.rules-state button{margin-top:20px}.rules-reader a:focus-visible,.rules-reader button:focus-visible{outline:2px solid var(--member-primary,#E52520);outline-offset:4px}
@media(max-width:760px){.rules-layout{grid-template-columns:1fr;gap:20px;padding-top:20px}.rules-aside{position:static;min-width:0}.rules-nav{display:flex;overflow:auto;gap:8px;padding:3px 2px 10px}.rules-nav h2{display:none}.rules-nav a{border:1px solid var(--member-line,#333);border-radius:8px;padding:10px 13px;white-space:nowrap;flex:none}.rules-help{display:none}.rules-heading{gap:14px;padding-top:12px;padding-bottom:24px}.rules-book{width:44px;height:52px}.rules-book svg{width:25px}.rules-heading p{font-size:12px}.rules-document{padding:0 18px;border-radius:12px}.rules-section{padding:24px 0}.rules-section h2{font-size:18px}.rules-section p{font-size:14px}.rules-footer{align-items:stretch;flex-direction:column;gap:12px}.rules-footer a{align-self:flex-start}}
</style>
