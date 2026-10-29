<template>
  <nav class="member-bottom-nav" aria-label="เมนูหลัก">
    <button v-for="item in navigation" :key="item.name" :class="{'is-current':isActive(item.name),'member-pitch-nav':item.name==='season-select'}" :aria-current="isActive(item.name)?'page':undefined" @click="setActive(item.name)"><MemberIcon :name="item.icon"/><span>{{ item.label }}</span></button>
  </nav>
  <Teleport to="body"><div v-if="isMenuOpen" class="member-sheet-backdrop" @click.self="toggleMenu" @keydown.esc="toggleMenu">
    <section v-member-dialog id="member-menu" ref="menuSheet" class="member-sheet member-menu" role="dialog" aria-modal="true" aria-labelledby="member-menu-title" tabindex="-1">
      <div class="member-sheet-handle"></div>
      <header class="member-sheet-header"><h2 id="member-menu-title">เมนูของคุณ</h2><button class="member-close" aria-label="ปิดเมนู" @click="toggleMenu"><MemberIcon name="close"/></button></header>
      <div class="member-menu-profile"><img :src="userinfo?.ImageURL || brand.avatarFallback" alt=""/><div><strong>{{ truncatedUsername || 'สมาชิก' }}</strong><p>{{ brand.name }} {{ brand.tagline }}</p></div></div>
      <div class="member-menu-theme"><div><strong>ธีมหน้าจอ</strong><small>จำไว้ในเครื่องนี้</small></div><MemberThemeToggle /></div>
      <button v-for="item in menuItems" :key="item.name" class="member-menu-item" @click="sideMenu(item.name)"><MemberIcon :name="item.icon"/><span>{{item.label}}</span><MemberIcon name="arrow"/></button>
      <button class="member-menu-item" :disabled="loggingOut" @click="logout"><MemberIcon name="back"/><span>ออกจากระบบ</span><MemberIcon name="arrow"/></button>
      <div class="member-contacts"><span>ติดต่อทีมงาน</span><a :href="brand.lineUrl" target="_blank" rel="noopener noreferrer">LINE {{brand.lineLabel}}</a><a :href="brand.facebookUrl" target="_blank" rel="noopener noreferrer">Facebook</a></div>
    </section>
  </div></Teleport>
</template>

<script>
import MemberIcon from '../member/MemberIcon.vue';
import { memberBrand } from '../../config/memberBrand.js';
import Swal from 'sweetalert2';
import { api } from '@axios_inst';
import { logoutMember } from '../../utils/memberSession.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserMobileNav',
  components: {MemberIcon},
  data() {
    return {
      isMenuOpen: false,
      loggingOut: false,
      brand: memberBrand,
      navigation: [{name:'player-detail-point',label:'คะแนน',icon:'chart'},{name:'result',label:'ย้อนหลัง',icon:'clock'},{name:'season-select',label:'จัดทีม',icon:'shirt'},{name:'challenge',label:'แข่งขัน',icon:'trophy'},{name:'list',label:'รายการ',icon:'list'}],
      menuItems: [{name:'payments',label:'สนับสนุนเรา',icon:'ticket'},{name:'history',label:'ประวัติการทำรายการ',icon:'clock'},{name:'rule',label:'กติการะบบ',icon:'book'},{name:'setting',label:'ตั้งค่า',icon:'gear'}],
      activeButton: this.$route.name, // ค่าเริ่มต้น
    }
  },
  computed: {
    ...mapGetters('auth', ['userinfo']),
    truncatedUsername() {
      return this.userinfo?.Email || this.userinfo?.Username || '';
    },
  },
  watch: { '$route.fullPath'() { this.isMenuOpen = false; } },
  methods: {
    ...mapActions('ticket', ['facthTicket']),
    sideMenu(page) {

      this.activeButton = page;
      this.isMenuOpen = !this.isMenuOpen;
      this.$router.push({ name: page });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    setActive(button) {
      if (button === '1vs1') {
        Swal.fire({
          title: 'comming soon!',
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
        });
        return;
      }
      this.facthTicket();
      this.activeButton = button;
      this.$router.push({ name: button });
    },
    isActive(button) {
      const name = String(this.$route.name || '');
      const groups = {'season-select':['home','season-select','pitch','pitch-n'],'player-detail-point':['player-detail-point','player-detail-point-table'],'result':['result','result-list-gameweek','result-list-gameweek-n'],'challenge':['challenge','challenge-detail','challenge-detail-n'],'list':['list','pitch-detail','pitch-detail-n','pitch-detail-edit','pitch-detail-edit-new','self-match-detail','self-match-detail-pick']};
      return groups[button]?.includes(name) || name === button;
    },
    async logout() {
      if (this.loggingOut) return;
      this.loggingOut = true;
      try {
        const result = await Swal.fire({
          title: 'ออกจากระบบ?', text: 'กลับมาเข้าสู่ระบบเพื่อจัดทีมต่อได้ทุกเมื่อ',
          showCancelButton: true, cancelButtonText: 'อยู่ต่อ', confirmButtonText: 'ออกจากระบบ',
          customClass: {confirmButton: 'btn-confirm', cancelButton: 'btn-cancel', popup: 'popup-custom', title: 'text-custom', htmlContainer: 'text-custom'},
          buttonsStyling: false,
        });
        if (!result.isConfirmed) return;
        this.isMenuOpen = false;
        await logoutMember({api, storage: localStorage, session: sessionStorage, store: this.$store, router: this.$router});
      } finally { this.loggingOut = false; }

    },
  },
}
</script>
