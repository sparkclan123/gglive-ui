<template>
  <section class="matchday-fixtures">
    <div class="fixture-controls"><label for="fixture-week">เกมวีค<select id="fixture-week" class="member-week-select" :value="selectedGameWeekId" @change="fetchMatches($event.target.value)"><option value="">โปรแกรมทั้งหมด</option><option v-for="week in weeks" :key="week.id" :value="week.id">{{ week.season?.label || 'ฤดูกาล ' + week.season_id }} · เกมวีค {{ week.week_name || week.week }}</option></select></label><button v-if="hasMoreWeeks || weeksError" class="member-text-button" :disabled="weeksLoading" @click="loadMoreWeeks">{{ weeksLoading ? 'กำลังโหลดรอบ…' : weeksError ? 'ลองโหลดรอบอีกครั้ง' : 'โหลดรอบก่อนหน้า' }}</button></div>
    <p v-if="weeksError" class="fixture-options-error" role="status">{{ weeksError }}</p>
    <div v-if="loading" class="member-loading" role="status">กำลังโหลดโปรแกรมการแข่งขัน…</div>
    <div v-else-if="error" class="member-error" role="alert"><h2>ยังโหลดโปรแกรมไม่ได้</h2><p>{{ error }}</p><button class="member-button" @click="fetchMatches(selectedGameWeekId)">ลองอีกครั้ง</button></div>
    <div v-else-if="!matches.length" class="member-empty"><MemberIcon name="clock" /><h2>รอโปรแกรมการแข่งขัน</h2><p>{{ selectedGameWeekId ? 'ยังไม่มีโปรแกรมในเกมวีคนี้ ลองเลือกเกมวีคอื่น' : 'โปรแกรมและผลจะแสดงที่นี่เมื่อมีข้อมูล' }}</p></div>
    <template v-else>
      <div class="fixture-count"><span>{{ matches.length }} คู่แข่งขัน</span><span>MATCHDAY</span></div>
      <section v-for="(fixtures, date) in groupedMatches" :key="date" class="fixture-date-group"><h2><MemberIcon name="clock" /><time :datetime="date">{{ formatDate(date) }}</time></h2>
        <article v-for="match in fixtures" :key="match.id" class="fixture-match" :aria-label="`${match.team1} ${match.score1 ?? 'รอผล'} ต่อ ${match.score2 ?? 'รอผล'} ${match.team2}`"><div class="fixture-club"><span class="fixture-initials" aria-hidden="true">{{ initials(match.team1) }}</span><strong>{{ match.team1 }}</strong></div><div class="fixture-score"><b>{{ match.score1 ?? '–' }}</b><span>:</span><b>{{ match.score2 ?? '–' }}</b></div><div class="fixture-club fixture-away"><span class="fixture-initials" aria-hidden="true">{{ initials(match.team2) }}</span><strong>{{ match.team2 }}</strong></div></article>
      </section>
    </template>
  </section>
</template>
<script>
export default {
  props: { matches: { type: Array, default: () => [] }, weeks: { type: Array, default: () => [] }, selectedGameWeekId: [String, Number], loading: Boolean, error: String, weeksLoading: Boolean, weeksError: String, hasMoreWeeks: Boolean, fetchMatches: { type: Function, required: true }, loadMoreWeeks: { type: Function, required: true } },
  computed: {
    groupedMatches() { return this.matches.reduce((groups, match) => { const key = match.date; (groups[key] ||= []).push(match); return groups; }, {}); },
  },
  methods: {
    initials(name) { const words = String(name || '').trim().split(/\s+/); return (words.length > 1 ? words.map(word => Array.from(word)[0]).slice(0, 3).join('') : Array.from(words[0]).slice(0, 3).join('')).toUpperCase(); },
    formatDate(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'รอวันแข่งขัน' : date.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }); },
  },
};
</script>
<style scoped>
.fixture-controls{display:flex;align-items:flex-end;gap:16px}.fixture-controls label{flex:1;font-size:11px;color:var(--member-muted);min-width:0}.fixture-controls .member-week-select{margin:7px 0 0}.fixture-controls .member-text-button{white-space:nowrap;font-size:10px;flex:none}.fixture-options-error{color:var(--member-soft);font-size:11px;margin-top:10px}.fixture-count{display:flex;justify-content:space-between;color:var(--member-muted);font-size:11px;margin:24px 0 8px}.fixture-count>span:last-child{font-family:var(--member-display);letter-spacing:2px}.fixture-date-group{margin:20px 0 26px}.fixture-date-group h2{display:flex;align-items:center;gap:8px;color:var(--member-muted);font-size:11px;font-weight:400;margin-bottom:12px}.fixture-date-group h2 svg{width:14px;height:14px}.fixture-match{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:18px;background:var(--member-panel);border:1px solid var(--member-line);padding:19px;border-radius:16px;margin:8px 0}.fixture-club{display:flex;align-items:center;gap:11px;min-width:0}.fixture-club strong{font-size:12px;font-weight:500;line-height:1.6;overflow-wrap:anywhere}.fixture-initials{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:50%;border:1px solid var(--member-line);background:var(--member-subtle);font:600 13px var(--member-display);color:var(--member-muted)}.fixture-away{flex-direction:row-reverse;text-align:right}.fixture-score{display:flex;align-items:center;gap:9px;font:600 26px var(--member-display);color:var(--member-text);white-space:nowrap}.fixture-score>span{font-size:13px;color:var(--member-muted)}.fixture-score b{min-width:16px;text-align:center}.member-empty>svg{width:28px;height:28px;color:var(--member-soft);margin:0 auto 15px}@media(max-width:640px){.fixture-match{gap:10px;padding:15px 12px}.fixture-club{flex-direction:column;gap:7px;text-align:center}.fixture-away{flex-direction:column}.fixture-club strong{font-size:11px}.fixture-initials{width:33px;height:33px;font-size:12px}.fixture-score{font-size:26px;gap:7px}.fixture-controls{flex-direction:column;align-items:stretch;gap:2px}.fixture-controls .member-text-button{align-self:flex-end;min-height:32px}}
</style>
