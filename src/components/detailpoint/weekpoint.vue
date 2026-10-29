<template>
  <section class="player-point-rounds" :aria-busy="loading">
    <div class="point-round-heading"><h2><MemberIcon name="chart" />เลือกเกมวีค</h2><span>{{ Number(gameweekData.total || 0).toLocaleString() }} รอบ</span></div>
    <div v-if="loading" class="member-loading" role="status">กำลังโหลดเกมวีค…</div>
    <div v-else-if="error" class="member-error" role="alert"><h2>ยังโหลดเกมวีคไม่ได้</h2><p>{{ error }}</p><button class="member-button" @click="fetchGameWeeks(requestedPage)">ลองอีกครั้ง</button></div>
    <div v-else-if="!gameweekData.datas.length" class="member-empty"><h2>ยังไม่มีคะแนนนักเตะ</h2><p>เกมวีคที่มีข้อมูลจะแสดงที่นี่เมื่อเริ่มการแข่งขัน</p></div>
    <div v-else class="point-round-grid"><button v-for="week in gameweekData.datas" :key="week.id" class="point-round-card" @click="seeDetailGameWeek(week)"><div class="point-round-top"><span class="member-badge">{{ statusLabel(week) }}</span><span>{{ week.season?.label || 'ฤดูกาล ' + week.season_id }}</span></div><div class="point-round-body"><div class="point-round-icon"><MemberIcon name="chart" /></div><div><h3>เกมวีค {{ week.week_name || week.week }}</h3><p>คะแนนและผลงานนักเตะ</p></div><MemberIcon name="arrow" /></div><div class="point-round-bottom"><span>{{ endDate(week.end_date) }}</span><span>ดูคะแนน</span></div></button></div>
    <Pagination v-if="!error && Number(gameweekData.pages) > 1" :page="Number(gameweekData.page) || 1" :pages="Number(gameweekData.pages) || 1" :disabled="loading" @page-change="fetchGameWeeks" />
  </section>
</template>
<script>
import { fetchGameweeks } from '../../services/gameweeks.js';
import { gameweekState, dateLabel } from '../../utils/gameweeks.js';
export default {
  data() { return { loading: false, error: '', revision: 0, disposed: false, requestedPage: 1, gameweekData: { datas: [], total: 0, page: 1, limit: 10, pages: 1 } }; },
  methods: {
    seeDetailGameWeek(week) { this.$router.push({ name: 'player-detail-point-table', params: { id: week.id, seasonID: week.season_id } }); },
    statusLabel(week) { return { open: 'เปิดรับ', scheduled: 'รอเปิดรับ', completed: 'จบการแข่งขัน', closed: 'ปิดรับ' }[gameweekState(week)]; },
    endDate(value) { return dateLabel(value); },
    async fetchGameWeeks(page = 1, limit = 10) {
      const revision = ++this.revision;
      this.loading = true; this.error = ''; this.requestedPage = page;
      try {
        const data = await fetchGameweeks(page, limit);
        if (this.disposed || revision !== this.revision) return;
        this.gameweekData = { datas: data.data, total: data.total, page: data.page, limit: data.limit, pages: data.pages };
      } catch (error) { if (!this.disposed && revision === this.revision) this.error = 'โหลดรายการเกมวีคไม่ได้ กรุณาลองอีกครั้ง'; }
      finally { if (!this.disposed && revision === this.revision) this.loading = false; }
    },
  },
  mounted() { this.fetchGameWeeks(); },
  beforeUnmount() { this.disposed = true; this.revision += 1; },
};
</script>
<style scoped>
.point-round-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}.point-round-heading h2{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600}.point-round-heading h2>svg{width:18px;height:18px;color:var(--member-soft)}.point-round-heading>span{color:var(--member-muted);font-size:11px}.point-round-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.point-round-card{display:block;width:100%;text-align:left;border:1px solid var(--member-line);border-radius:20px;padding:19px;background:var(--member-panel);color:var(--member-text);cursor:pointer;min-width:0}.point-round-card:hover{border-color:#e5252070}.point-round-card:focus-visible{outline:2px solid var(--member-soft);outline-offset:3px}.point-round-top{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:10px;color:var(--member-muted)}.point-round-top>span:last-child{text-align:right;overflow-wrap:anywhere}.point-round-body{display:flex;align-items:center;gap:13px;margin:19px 0}.point-round-icon{display:grid;place-items:center;flex:none;width:44px;height:44px;background:#4a201c;border-radius:13px;color:#eea08d}.point-round-icon svg{width:24px;height:24px}.point-round-body>div:nth-child(2){min-width:0;flex:1}.point-round-body h3{font-size:16px;font-weight:650;line-height:1.5;overflow-wrap:anywhere}.point-round-body p{font-size:10px;color:var(--member-muted);margin-top:5px}.point-round-body>svg{width:18px;height:18px;flex:none;color:var(--member-soft)}.point-round-bottom{display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid var(--member-line);padding-top:13px;font-size:10px;color:var(--member-muted)}.point-round-bottom>span:last-child{color:var(--member-soft)}@media(max-width:640px){.point-round-grid{grid-template-columns:1fr}.point-round-card{padding:17px}.point-round-body h3{font-size:15px}}
</style>
