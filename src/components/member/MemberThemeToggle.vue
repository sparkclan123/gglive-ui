<template>
  <div class="member-theme-toggle" role="group" aria-label="ธีมหน้าจอ">
    <button type="button" :aria-pressed="theme === 'light'" @click="choose('light')"><MemberIcon name="sun"/><span>Light</span></button>
    <button type="button" :aria-pressed="theme === 'dark'" @click="choose('dark')"><MemberIcon name="moon"/><span>Dark</span></button>
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { getMemberTheme } from '../../utils/memberTheme.js';
const preference = getMemberTheme();
const theme = ref(preference.value);
const unsubscribe = preference.subscribe(value => theme.value = value);
onBeforeUnmount(unsubscribe);
function choose(value) { preference.set(value); }
</script>
<style scoped>
.member-theme-toggle{display:flex;gap:4px;padding:4px;background:var(--member-input);border:1px solid var(--member-line);border-radius:13px;flex:none}.member-theme-toggle button{display:flex;align-items:center;justify-content:center;gap:6px;min-width:76px;min-height:40px;padding:7px 10px;border:0;border-radius:9px;color:var(--member-muted);background:transparent;font:600 12px var(--member-body);touch-action:manipulation}.member-theme-toggle button[aria-pressed=true]{color:var(--member-soft);background:var(--member-panel-raised);box-shadow:0 1px 4px #0000000c}.member-theme-toggle svg{width:17px;height:17px}@media(max-width:360px){.member-theme-toggle button{min-width:66px;padding:7px}}
</style>
