<template>
  <div class="member-app" :class="{'has-pitch-pattern': hasPitchPattern}">
    <header class="member-topbar">
      <RouterLink :to="{name:'season-select'}" class="member-home-link" :aria-label="`${brand.name} หน้าหลัก`"><MemberBrand /><span class="member-desktop-tag">Fantasy football</span></RouterLink>
      <div class="member-top-actions">
        <button class="member-ticket" @click="openTickets" aria-label="ตั๋ว VIP และการสนับสนุน"><MemberIcon name="ticket"/><strong>{{ getTicket ?? 0 }}</strong><span>ตั๋ว VIP</span></button>
        <button class="member-menu-trigger" aria-haspopup="dialog" aria-controls="member-menu" @click="$refs.memberNav.toggleMenu()" aria-label="เมนู">เมนู</button>
      </div>
    </header>
    <main class="member-content">
      <LodingSceen :loading="getLoading" />
      <router-view :key="$route.fullPath" :style="getLoading ? 'visibility:hidden' : ''" />
    </main>
    <UserMobileNav ref="memberNav" />
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import UserMobileNav from '../components/object/UserMobileNav.vue';
import MemberBrand from '../components/member/MemberBrand.vue';
import MemberIcon from '../components/member/MemberIcon.vue';
import {memberBrand} from '../config/memberBrand.js';
export default {
  components:{UserMobileNav,MemberBrand,MemberIcon},
  data:()=>({brand:memberBrand}),
  computed:{hasPitchPattern(){return ['season-select','pitch','pitch-n','pitch-detail-edit','pitch-detail-edit-new'].includes(this.$route.name)},...mapGetters('loading',['getLoading']),...mapGetters('ticket',['getTicket']),...mapGetters('auth',['userinfo'])},
  methods:{...mapActions('loading',['updateLoading']),...mapActions('ticket',['facthTicket']),...mapActions('auth',['facthUserInfo']),openTickets(){this.facthTicket();this.$router.push({name:'payments'})}},
  mounted(){this.updateLoading(false);this.facthTicket();this.facthUserInfo()}
};
</script>
