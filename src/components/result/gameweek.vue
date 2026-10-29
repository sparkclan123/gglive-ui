<template>
  <section class="result-rounds">
    <div class="round-list-heading"><h2>{{ mode === 'vip' ? 'รายการเกมวีค VIP' : 'รายการเกมวีคปกติ' }}</h2><span>{{ Number(data.total || 0).toLocaleString() }} รอบ</span></div>
    <div v-if="loading" class="member-loading" role="status">กำลังโหลดรายการเกมวีค…</div>
    <div v-else-if="error" class="member-error" role="alert"><h2>ยังโหลดรายการไม่ได้</h2><p>{{ error }}</p><button class="member-button" @click="fetchGameWeeks()">ลองอีกครั้ง</button></div>
    <div v-else-if="!data.datas?.length" class="member-empty"><h2>ยังไม่มีเกมวีค</h2><p>รายการแข่งขันของแต่ละรอบจะแสดงที่นี่</p></div>
    <div v-else class="round-list-grid"><button v-for="week in data.datas" :key="week.id" class="result-round-card" @click="seeDetailGameWeek(week)"><div class="result-round-top"><span class="member-badge">{{ statusLabel(week) }}</span><span>{{ week.season?.label || 'ฤดูกาล ' + week.season_id }}</span></div><div class="result-round-title"><span class="round-number">{{ week.week }}</span><div><h3>เกมวีค {{ week.week_name || week.week }}</h3><p>{{ mode === 'vip' ? 'VIP' : 'ปกติ' }} · อันดับและผลการแข่งขัน</p></div><MemberIcon name="arrow" /></div><div class="result-round-bottom"><span>{{ endDate(week.end_date) }}</span><span v-if="mode === 'vip'" class="round-reward">{{ Number(week.reward || 0).toLocaleString('th-TH', { maximumFractionDigits: 1 }) }} {{ week.who_win }}</span><span v-else class="round-reward">ดูอันดับ</span></div></button></div>
    <Pagination v-if="!error && Number(data.pages) > 1" :page="Number(data.page) || 1" :pages="Number(data.pages) || 1" :disabled="loading" @page-change="fetchGameWeeks" />
  </section>
</template>
<script>
import { gameweekState, dateLabel } from '../../utils/gameweeks.js';
export default {
  props: { data: { type: Object, required: true }, fetchGameWeeks: { type: Function, required: true }, mode: { type: String, default: 'normal' }, loading: Boolean, error: String },
  methods: {
    seeDetailGameWeek(week) { this.$router.push({ name: this.mode === 'vip' ? 'result-list-gameweek' : 'result-list-gameweek-n', params: { gameWeekID: week.id } }); },
    statusLabel(week) { return { open: 'เปิดรับ', scheduled: 'รอเปิดรับ', completed: 'จบการแข่งขัน', closed: 'ปิดรับ' }[gameweekState(week)]; },
    endDate(value) { return dateLabel(value); },
  },
};
</script>
<style scoped>
.round-list-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 17px}.round-list-heading h2{font-size:16px;font-weight:600}.round-list-heading>span{font-size:11px;color:var(--member-muted)}.round-list-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.result-round-card{display:block;width:100%;text-align:left;padding:19px;border:1px solid var(--member-line);background:linear-gradient(140deg,var(--member-accent-surface),var(--member-panel) 70%);border-radius:20px;color:var(--member-text);cursor:pointer;min-width:0}.result-round-card:hover{border-color:#e5252060}.result-round-card:focus-visible{outline:2px solid var(--member-soft);outline-offset:3px}.result-round-top{display:flex;align-items:center;justify-content:space-between;gap:10px;color:var(--member-muted);font-size:10px}.result-round-top>span:last-child{text-align:right;overflow-wrap:anywhere}.result-round-title{display:flex;align-items:center;gap:13px;margin:19px 0}.round-number{font:600 37px var(--member-display);color:#e2776d;min-width:40px;flex:none}.result-round-title>div{min-width:0;flex:1}.result-round-title h3{font-size:16px;font-weight:650;line-height:1.5;overflow-wrap:anywhere}.result-round-title p{font-size:10px;color:var(--member-muted);margin-top:5px}.result-round-title>svg{width:19px;height:19px;color:var(--member-soft);flex:none}.result-round-bottom{border-top:1px solid var(--member-line);padding-top:13px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:10px;color:var(--member-muted)}.round-reward{color:var(--member-warning);text-align:right}@media(max-width:640px){.round-list-grid{grid-template-columns:1fr}.result-round-card{padding:17px}.result-round-title h3{font-size:15px}}
</style>
