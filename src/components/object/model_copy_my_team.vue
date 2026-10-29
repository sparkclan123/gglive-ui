<template>
  <Teleport to="body">
    <div v-if="showCopyTeamModal" class="builder-modal-backdrop" @click.self="close" @keydown.esc="close">
      <section v-member-dialog ref="dialog" role="dialog" aria-modal="true" aria-label="คัดลอกทีมในเกมวีคนี้" class="builder-modal builder-copy-modal" :aria-busy="isLoading || copying">
        <div class="builder-modal-handle" aria-hidden="true"></div>
        <header class="builder-copy-heading"><div><p class="builder-eyebrow">YOUR TEAMS</p><h2>คัดลอกทีม</h2></div><button ref="close" class="builder-close" @click="close" aria-label="ปิด">×</button></header>
        <p>เฉพาะทีมในเกมวีคนี้ · เลือกกัปตันใหม่หลังคัดลอก</p>
        <div v-if="isLoading" class="builder-state" role="status">กำลังโหลดทีมของคุณ…</div>
        <div v-else-if="error" class="builder-state" role="alert"><p>{{ error }}</p><button class="builder-button" @click="facthAllMyteam">ลองอีกครั้ง</button></div>
        <div v-else class="builder-copy-groups">
          <section v-for="group in groups" :key="group.type"><h3>{{ group.label }} <span>{{ group.teams.length }} ทีม</span></h3>
            <p v-if="!group.teams.length" class="builder-copy-empty">ยังไม่มีทีม{{ group.label }}ในเกมวีคนี้</p>
            <button v-for="team in group.teams" :key="team.id" class="builder-copy-team" :disabled="copying" @click="copy(team, group.type)"><span class="builder-copy-symbol">XI</span><span><strong>{{ team.name }}</strong><small>{{ formatDate(team.created_at) }}</small></span><b>↗</b></button>
          </section>
        </div>
      </section>
    </div>
  </Teleport>
</template>
<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
  props: { showCopyTeamModal: Boolean, gameWeekId: { type: [Number, String], required: true } },
  emits: ['close-modal', 'copy-player'],
  data() { return { isLoading: false, copying: false, error: '', data_vip: [], data_n: [], revision: 0 }; },
  computed: { groups() { return [{ type: 'vip', label: 'VIP', teams: this.data_vip }, { type: 'n', label: 'ปกติ', teams: this.data_n }]; } },
  watch: {
    showCopyTeamModal: { immediate: true, handler(open) {
      if (open) {
        this.facthAllMyteam();
      } else { this.revision += 1; this.copying = false; }
    } },
    gameWeekId() { this.revision += 1; this.data_vip = []; this.data_n = []; if (this.showCopyTeamModal) this.facthAllMyteam(); },
  },
  beforeUnmount() { this.revision += 1; },
  methods: {
    close() { this.$emit('close-modal'); },
    formatDate(date) { return new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }); },
    async facthAllMyteam() {
      const revision = ++this.revision, week = Number(this.gameWeekId);
      this.isLoading = true; this.error = ''; this.data_vip = []; this.data_n = [];
      try {
        if (!Number.isSafeInteger(week) || week <= 0) throw new Error('Invalid gameweek');
        const { data } = await api.get('/premier-league/v1/get-all-my-teams', { params: { game_week_id: week }, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
        if (revision !== this.revision || !this.showCopyTeamModal) return;
        if (!data.ok || Number(data.gameWeek?.id) !== week) throw new Error('Gameweek does not match');
        this.data_vip = (data.mygamemain || []).filter(team => Number(team.week_id) === week);
        this.data_n = (data.mygamemainN || []).filter(team => Number(team.week_id) === week);
      } catch (error) { if (revision === this.revision) this.error = 'โหลดทีมในเกมวีคนี้ไม่ได้ กรุณาลองอีกครั้ง'; }
      finally { if (revision === this.revision) this.isLoading = false; }
    },
    async copy(team, type) {
      if (this.copying || Number(team.week_id) !== Number(this.gameWeekId)) return;
      const week = Number(this.gameWeekId), revision = this.revision;
      const result = await Swal.fire({ title: `ทีม ${team.name}`, text: 'แทนที่รายชื่อนักเตะปัจจุบันด้วยทีมนี้?', showCancelButton: true, confirmButtonText: 'คัดลอกทีม', cancelButtonText: 'ยกเลิก', customClass: { popup: 'popup-custom', confirmButton: 'btn-confirm', cancelButton: 'btn-cancel' }, buttonsStyling: false });
      if (!result.isConfirmed || revision !== this.revision || !this.showCopyTeamModal) return;
      this.copying = true; this.error = '';
      try {
        const { data } = await api.post('/premier-league/v1/copy-my-team', { main_id: team.id, type, game_week_id: week }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
        if (revision !== this.revision || !this.showCopyTeamModal) return;
        if (!data.ok || !Array.isArray(data.data) || !data.data.length || data.data.some(player => Number(player.game_week_id) !== week)) throw new Error('Copy gameweek does not match');
        this.$emit('copy-player', data.data);
      } catch (error) { if (revision === this.revision) this.error = 'คัดลอกทีมไม่ได้ กรุณาลองอีกครั้ง'; }
      finally { if (revision === this.revision) this.copying = false; }
    },
  },
};
</script>
<style src="../../styles/builder.css"></style>
