<template>
  <Teleport to="body">
    <Transition name="kick-loading">
      <div v-if="loading" class="kick-loading-screen" role="status" aria-live="polite" aria-atomic="true">
        <div class="kick-loading-content">
          <img class="kick-loading-logo" :src="$memberBrand.logoSmall" :srcset="`${$memberBrand.logoSmall} 160w, ${$memberBrand.logo} 512w`" sizes="96px" :alt="$memberBrand.name" width="96" height="96" />
          <div class="loader kick-loading-pitch" aria-hidden="true">
            <svg class="kick-loading-field" viewBox="0 0 240 136" fill="none">
              <rect x="8" y="8" width="224" height="120" rx="4"/><path d="M120 8v120M8 38h34v60H8m224-60h-34v60h34"/><circle cx="120" cy="68" r="26"/><circle cx="120" cy="68" r="2"/>
            </svg>
            <span class="kick-loading-ball">
              <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14.5" fill="var(--member-panel)" stroke="currentColor" stroke-width="1.5"/><path d="m16 9 6.7 4.9-2.5 7.9h-8.4l-2.5-7.9L16 9Zm0 0V2M9.3 13.9l-6.9-2.3m9.4 10.2-4.4 6.1m12.8-6.1 4.4 6.1m-1.9-14 6.9-2.3" stroke="currentColor" stroke-width="1.5"/><path d="m16 9 6.7 4.9-2.5 7.9h-8.4l-2.5-7.9L16 9Z" fill="currentColor"/></svg>
            </span>
          </div>
          <p>กำลังเตรียมสนาม<span class="kick-loading-ellipsis" aria-hidden="true">…</span></p>
          <span class="kick-loading-hint">อีกนิดเดียว พร้อมลุย</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  props: { loading: { type: Boolean, required: true } }
};
</script>

<style scoped>
.kick-loading-screen{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:color-mix(in srgb,var(--member-bg) 96%,transparent);backdrop-filter:blur(10px);color:var(--member-text)}
.kick-loading-content{display:flex;flex-direction:column;align-items:center;text-align:center;width:min(100%,300px)}
.kick-loading-logo{width:96px;height:96px;object-fit:contain}
.kick-loading-pitch{position:relative;width:240px;height:136px;margin:20px 0 23px;border-radius:15px;background:var(--member-panel);box-shadow:var(--member-shadow);overflow:hidden}
.kick-loading-field{width:100%;height:100%;stroke:var(--member-line);stroke-width:1.5}
.kick-loading-ball{position:absolute;top:52px;left:24px;width:32px;height:32px;color:var(--member-primary);animation:kick-pass 2.4s ease-in-out infinite}
.kick-loading-ball svg{width:100%;height:100%;animation:kick-roll 2.4s ease-in-out infinite}
.kick-loading-content p{font-size:16px;font-weight:600;margin:0 0 7px;color:var(--member-text)}
.kick-loading-hint{font-size:12px;color:var(--member-muted)}
.kick-loading-enter-active,.kick-loading-leave-active{transition:opacity .18s ease}
.kick-loading-enter-from,.kick-loading-leave-to{opacity:0}
@keyframes kick-pass{0%,10%,100%{transform:translateX(0)}45%,60%{transform:translateX(160px)}}
@keyframes kick-roll{0%,10%,100%{transform:rotate(0)}45%,60%{transform:rotate(450deg)}}
@media(prefers-reduced-motion:reduce){.kick-loading-ball{animation:none;left:104px}.kick-loading-ball svg{animation:none}.kick-loading-enter-active,.kick-loading-leave-active{transition:none}}
</style>
