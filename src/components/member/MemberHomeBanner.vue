<template>
  <h1 v-if="banner && !failed" class="sr-only">เลือก Gameweek เพื่อจัดทีม</h1>
  <component v-if="banner && !failed" :is="banner.link_url ? 'a' : 'div'" class="member-campaign" :href="banner.link_url || undefined" :aria-label="banner.link_url ? banner.alt_text : undefined">
    <picture>
      <source v-if="banner.mobile_image_url && !mobileFailed" media="(max-width: 640px)" :srcset="banner.mobile_image_url" />
      <img :src="banner.image_url" :alt="banner.alt_text" fetchpriority="high" decoding="async" @error="imageError" />
    </picture>
  </component>
  <section v-else class="member-hero">
    <div class="member-hero-copy"><div class="member-hero-label">{{brand.name}} {{brand.tagline}}</div><h1 class="member-hero-title">YOUR XI.<br>YOUR GAME.</h1><p>เลือกเกมวีคที่ใช่<br>แล้วจัดทีมในสไตล์คุณ</p><span class="member-hero-footer">11 คน เปลี่ยนเกมได้</span></div>
    <img :src="brand.hero" alt="ภาพประกอบนักฟุตบอลในเสื้อสีแดง" fetchpriority="high" />
  </section>
</template>
<script>
import {memberBrand} from '../../config/memberBrand.js';
import {fetchMemberBanner} from '../../services/memberBanner.js';
import {bannerAfterImageError} from '../../utils/memberBanner.js';
export default {
  data:()=>({brand:memberBrand,banner:null,failed:false,mobileFailed:false,disposed:false}),
  methods:{
    imageError(event){Object.assign(this,bannerAfterImageError(this.banner,this.mobileFailed,event.target.currentSrc))},
    async load(){try{const banner=await fetchMemberBanner();if(!this.disposed)this.banner=banner}catch{if(!this.disposed)this.banner=null}},
  },
  mounted(){this.load()},
  beforeUnmount(){this.disposed=true},
};
</script>
<style scoped>
.member-campaign{display:block;width:100%;overflow:hidden;border-radius:24px;background:var(--member-panel);border:1px solid var(--member-line);text-decoration:none;color:inherit;}
.member-campaign picture,.member-campaign img{display:block;width:100%;height:auto;}
.member-campaign:focus-visible{outline:2px solid var(--member-soft);outline-offset:4px;}
@media(max-width:640px){.member-campaign{border-radius:18px;}}
</style>
