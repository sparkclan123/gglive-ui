<template>
  <section class="member-builder-page" :aria-busy="loading">
    <div v-if="loading" class="builder-state" role="status"><span class="builder-loader"></span><h2>กำลังเตรียมสนาม</h2><p>โหลดนักเตะและสโมสรของเกมวีคนี้</p></div>
    <div v-else-if="error" class="builder-state" role="alert"><h2>ยังโหลดเกมวีคไม่ได้</h2><p>{{ error }}</p><button class="builder-button" @click="loadContext">ลองอีกครั้ง</button></div>
    <FantasyTeam v-else-if="ready" :key="contextKey" />
  </section>
</template>
<script>
import { api } from '@axios_inst';
import FantasyTeam from '../../components/fantasyN/FantasyTeam.vue';
import { createBuilderLoader } from '../../utils/builderContext.js';
import Swal from 'sweetalert2';
export default {
  components: { FantasyTeam },
  data() { return { loading: true, ready: false, error: '', loadRevision: 0, loader: null }; },
  computed: {
    contextKey() { return `${this.$route.params.seasonID}:${this.$route.params.gameWeekID}:normal`; },
  },
  watch: { contextKey() { this.loadContext(); } },
  created() {
    this.loader = createBuilderLoader({
      request: async (path, params) => {
        const { data } = await api.get(path, { params, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
        return data;
      },
      reset: () => {
        this.ready = false;
        this.$store.dispatch('GameWeek/setGameWeek', null);
        this.$store.dispatch('GameWeek/setGameWeekPlayer', []);
        this.$store.dispatch('GameWeek/setGameWeekPlayerPercent', {});
        this.$store.dispatch('GameWeek/setGameWeekPlayerPercentN', {});
        this.$store.dispatch('Teams/setTeams', []);
        this.$store.dispatch('playerSelect/setFormation', '1-5-5-3');
      },
      apply: ({ gameWeek, players, teams, ownership }) => {
        this.$store.dispatch('GameWeek/setGameWeek', gameWeek);
        this.$store.dispatch('GameWeek/setGameWeekPlayer', players);
        this.$store.dispatch('Teams/setTeams', teams);
        this.$store.dispatch('GameWeek/setGameWeekPlayerPercentN', ownership);
      },
    });
    this.loadContext();
  },
  beforeUnmount() { this.loadRevision += 1; this.loader.dispose(); },
  async beforeRouteUpdate(to, from) {
    if (to.params.gameWeekID !== from.params.gameWeekID || to.params.seasonID !== from.params.seasonID) return this.confirmRoundChange();
  },
  async beforeRouteLeave(to) {
    if (['pitch-detail', 'pitch-detail-n'].includes(to.name)) return true;
    return this.confirmRoundChange();
  },
  methods: {
    async loadContext() {
      const revision = ++this.loadRevision;
      this.loading = true;
      this.error = '';
      try {
        const result = await this.loader.load(this.$route.params, 'normal');
        if (revision === this.loadRevision) this.ready = Boolean(result);
      } catch (error) {
        if (revision === this.loadRevision) this.error = 'ตรวจสอบรอบและฤดูกาลที่เลือก แล้วลองโหลดอีกครั้ง';
      } finally { if (revision === this.loadRevision) this.loading = false; }
    },
    async confirmRoundChange() {
      const roster = ['getGKP', 'getDEF', 'getMID', 'getFWD'].flatMap(key => this.$store.getters[`playerSelect/${key}`] || []);
      if (!roster.some(player => player.id)) return true;
      const result = await Swal.fire({ title: 'ออกจากทีมที่กำลังจัด?', text: 'รายชื่อนักเตะและกัปตันที่ยังไม่บันทึกจะถูกล้าง', showCancelButton: true, confirmButtonText: 'ออกและล้างทีม', cancelButtonText: 'จัดทีมต่อ', customClass: { popup: 'popup-custom', confirmButton: 'btn-confirm', cancelButton: 'btn-cancel' }, buttonsStyling: false });
      return result.isConfirmed;
    },
  },
};
</script>
<style src="../../styles/builder.css"></style>
