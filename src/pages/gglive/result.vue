<template>
  <section class="results-page">
    <header class="member-page-header"><div class="member-kicker">MATCHDAY & RESULTS</div><h1>โปรแกรมและผลการแข่งขัน</h1><p>ติดตามคู่แข่งขัน ดูอันดับ และย้อนดูผลงานของแต่ละเกมวีค</p></header>
    <div class="member-mode-switch results-tabs" role="tablist" aria-label="รายการผลการแข่งขัน">
      <button v-for="tab in tabs" :key="tab.id" :id="`result-${tab.id}`" role="tab" :aria-selected="activeTab === tab.id" :class="{ 'is-selected': activeTab === tab.id }" @click="SetactiveTab(tab.id)"><MemberIcon :name="tab.icon" />{{ tab.label }}</button>
    </div>
    <div role="tabpanel" :aria-labelledby="`result-${activeTab}`" class="results-panel"><component :is="currentTabComponent" :key="activeTab" v-bind="currentTabProps" /></div>
  </section>
</template>
<script>
import Result from '../../components/result/result.vue';
import ResultGameweek from '../../components/result/gameweek.vue';
import ResultGameweekVip from '../../components/result/gameweekVip.vue';
import { api } from '@axios_inst';
import { fetchGameweeks, memberHeaders } from '../../services/gameweeks.js';
export default {
  name: 'MemberResults',
  components: { Result, ResultGameweek, ResultGameweekVip },
  data() { return {
    activeTab: 'tab1',
    tabs: [{ id: 'tab1', label: 'โปรแกรม', icon: 'clock' }, { id: 'tab2', label: 'รายการปกติ', icon: 'list' }, { id: 'tab3', label: 'รายการ VIP', icon: 'ticket' }],
    gameweekData: { datas: [], total: 0, page: 1, limit: 10, pages: 1 },
    weeksRequestedPage: 1, matches: [], selectedGameWeekId: '', matchesLoading: false, matchesError: '', weeksLoading: false, weeksError: '', matchesRevision: 0, weeksRevision: 0,
    fixtureWeeks: [], fixtureWeeksPage: 0, fixtureWeeksPages: 1, fixtureWeeksLoading: false, fixtureWeeksError: '', disposed: false,
  }; },
  computed: {
    currentTabComponent() { return this.activeTab === 'tab2' ? 'ResultGameweek' : this.activeTab === 'tab3' ? 'ResultGameweekVip' : 'Result'; },
    currentTabProps() {
      return this.activeTab === 'tab1'
        ? { matches: this.matches, selectedGameWeekId: this.selectedGameWeekId, loading: this.matchesLoading, error: this.matchesError, fetchMatches: this.fetchMatches, weeks: this.fixtureWeeks, weeksLoading: this.fixtureWeeksLoading, weeksError: this.fixtureWeeksError, hasMoreWeeks: this.fixtureWeeksPage < this.fixtureWeeksPages, loadMoreWeeks: this.fetchFixtureWeeks }
        : { data: this.gameweekData, loading: this.weeksLoading, error: this.weeksError, fetchGameWeeks: this.fetchGameWeeks };
    },
  },
  methods: {
    SetactiveTab(tab) { if (this.tabs.some(item => item.id === tab)) { this.activeTab = tab; localStorage.setItem('result-tab', tab); } },
    async fetchGameWeeks(page = this.weeksRequestedPage, limit = 10) {
      const revision = ++this.weeksRevision;
      this.weeksLoading = true; this.weeksError = ''; this.weeksRequestedPage = page;
      try {
        const data = await fetchGameweeks(page, limit);
        if (this.disposed || revision !== this.weeksRevision) return;
        this.gameweekData = { datas: data.data, total: data.total, page: data.page, limit: data.limit, pages: data.pages };
      } catch (error) { if (!this.disposed && revision === this.weeksRevision) this.weeksError = 'โหลดรายการเกมวีคไม่ได้ กรุณาลองอีกครั้ง'; }
      finally { if (!this.disposed && revision === this.weeksRevision) this.weeksLoading = false; }
    },
    async fetchFixtureWeeks() {
      if (this.fixtureWeeksLoading || this.fixtureWeeksPage >= this.fixtureWeeksPages) return;
      this.fixtureWeeksLoading = true; this.fixtureWeeksError = '';
      try {
        const data = await fetchGameweeks(this.fixtureWeeksPage + 1, 25);
        if (this.disposed) return;
        this.fixtureWeeks = [...this.fixtureWeeks, ...data.data.filter(week => !this.fixtureWeeks.some(current => current.id === week.id))];
        this.fixtureWeeksPage = Number(data.page) || 1; this.fixtureWeeksPages = Number(data.pages) || 1;
      } catch (error) { if (!this.disposed) this.fixtureWeeksError = 'โหลดตัวเลือกเกมวีคไม่ได้'; }
      finally { if (!this.disposed) this.fixtureWeeksLoading = false; }
    },
    async fetchMatches(gameWeekId = this.selectedGameWeekId) {
      const revision = ++this.matchesRevision;
      this.selectedGameWeekId = gameWeekId; this.matches = []; this.matchesLoading = true; this.matchesError = '';
      try {
        const selected = gameWeekId === '' || gameWeekId == null ? null : Number(gameWeekId);
        if (selected !== null && (!Number.isSafeInteger(selected) || selected <= 0)) throw new Error('Invalid gameweek');
        const path = selected === null ? '/premier-league/v1/result' : `/premier-league/v1/result-game-week/${selected}`;
        const { data } = await api.get(path, { headers: memberHeaders() });
        if (this.disposed || revision !== this.matchesRevision) return;
        if (!data.ok || !Array.isArray(data.matches)) throw new Error('Unable to load fixtures');
        this.matches = data.matches.map(match => ({ id: match.ID, date: match.DateVs, team1: match.Team1Name, team2: match.Team2Name, score1: match.Score1, score2: match.Score2 }));
      } catch (error) { if (!this.disposed && revision === this.matchesRevision) this.matchesError = 'โหลดโปรแกรมการแข่งขันไม่ได้ กรุณาลองอีกครั้ง'; }
      finally { if (!this.disposed && revision === this.matchesRevision) this.matchesLoading = false; }
    },
  },
  created() {
    const stored = localStorage.getItem('result-tab');
    if (this.tabs.some(tab => tab.id === stored)) this.activeTab = stored;
    this.fetchGameWeeks(); this.fetchFixtureWeeks(); this.fetchMatches();
  },
  beforeUnmount() { this.disposed = true; this.matchesRevision += 1; this.weeksRevision += 1; },
};
</script>
<style scoped>
.results-tabs{width:100%;max-width:480px}.results-tabs button{display:flex;align-items:center;justify-content:center;gap:7px;padding:10px}.results-tabs svg{height:17px;width:17px}.results-panel{margin-top:24px;min-height:260px}@media(max-width:430px){.results-tabs button{font-size:11px;padding:9px 7px}.results-tabs svg{height:15px;width:15px}}
</style>
