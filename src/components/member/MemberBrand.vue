<template><span class="member-brand"><img class="member-brand-logo" :src="brand.logo" :srcset="`${brand.logoSmall} 160w, ${brand.logo} 512w, ${brand.logoLarge} 768w`" sizes="(max-width: 640px) 54px, 64px" :alt="brand.name" width="160" height="160" fetchpriority="high" decoding="async" /></span></template>
<script setup>import { memberBrand as brand } from '../../config/memberBrand.js';</script>
