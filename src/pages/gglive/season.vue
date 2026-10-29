<template>
  <div class="member-season">
    <MemberHomeBanner />
    <div class="member-round-controls"><div class="member-mode-switch" aria-label="ประเภทเกม"><button :class="{'is-selected':mode==='normal'}" @click="setMode('normal')">เกมวีคปกติ</button><button :class="{'is-selected':mode==='vip'}" @click="setMode('vip')">VIP ✦</button></div><RouterLink :to="{name:'rule'}" class="member-text-button">กติกาการจัดทีม</RouterLink></div>
    <div v-if="loading" class="member-loading" role="status">กำลังโหลด Gameweek…</div>
    <div v-else-if="error" class="member-error" role="alert"><h2>โหลดรอบการแข่งขันไม่สำเร็จ</h2><p>ลองโหลดใหม่อีกครั้งเพื่อดูรอบที่เปิดรับ</p><button class="member-button" @click="load">ลองอีกครั้ง</button></div>
    <template v-else>
      <section v-if="rounds.length" class="member-round-grid" aria-label="Gameweek ที่เปิดใช้งาน">
        <article v-for="round in rounds" :key="round.id" class="member-round-card">
          <div class="member-round-meta"><span>Gameweek {{round.week}}</span><span class="member-badge" :class="{'is-open':state(round)==='open','is-upcoming':state(round)==='scheduled'}">{{statusLabel(round)}}</span></div>
          <h2>{{round.week_name || `Gameweek ${round.week}`}}</h2><p class="member-round-season">{{round.season?.label}}<span v-if="round.teams?.length"> · {{round.teams.length}} สโมสร</span></p>
          <div class="member-club-list"><span v-for="team in round.teams" :key="team.team_id" class="member-club-abbr" :title="team.name">{{team.club_abbr || team.short_name}}</span></div>
          <div class="member-round-stats"><div><small>รางวัลอันดับ 1</small><strong class="member-reward">{{mode==='vip'?'฿'+format(round.reward):format(round.reward2)+' ตั๋ว'}}</strong></div><div><small>ทีมเข้าแข่งขัน</small><strong>{{format(round[mode]?.allPlayer)}}</strong></div><div><small>ปิดรับ</small><strong class="member-date">{{dateLabel(round.end_date)}}</strong></div></div>
          <div class="member-round-actions"><button class="member-button" :disabled="state(round)!=='open' || entering===round.id" @click="enter(round)">{{buttonLabel(round)}}<MemberIcon name="arrow"/></button><RouterLink class="member-button is-secondary" :to="{name:'reward-detail',params:{id:round.id,type:mode==='vip'?'VIP':'N'}}" :aria-label="`ดูรางวัล Gameweek ${round.week}`"><MemberIcon name="trophy"/></RouterLink></div>
          <div class="member-round-footer"><RouterLink :to="{name:'challenge',query:{game_week_id:round.id,mode}}" @click="rememberGameweek(round)">ดูอันดับการแข่งขัน</RouterLink><span>ทีมของฉัน {{format(round[mode]?.myTeam)}}</span></div>
        </article>
      </section>
      <section v-else class="member-empty"><h2>เตรียมทีมสำหรับรอบถัดไป</h2><p>ยังไม่มี Gameweek เปิดรับในขณะนี้<br>ดูคะแนนและอันดับรอบที่ผ่านมาได้ด้านล่าง</p><RouterLink class="member-button is-secondary" :to="{name:'challenge'}">ดูอันดับล่าสุด <MemberIcon name="trophy"/></RouterLink></section>
    </template>
    <section v-if="recent.length"><div class="member-section-heading"><h2>รอบที่ผ่านมา</h2><RouterLink :to="{name:'result'}">ดูทั้งหมด</RouterLink></div><article v-for="round in recent" :key="round.id" class="member-recent-row"><div><strong>{{round.week_name || `Gameweek ${round.week}`}}</strong><p>{{dateLabel(round.end_date)}}</p></div><RouterLink class="member-button is-secondary" :to="{name:mode==='vip'?'result-list-gameweek':'result-list-gameweek-n',params:{gameWeekID:round.id}}">ดูอันดับ <MemberIcon name="arrow"/></RouterLink></article></section>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import Swal from 'sweetalert2';
import {memberBrand} from '../../config/memberBrand.js';
import MemberHomeBanner from '../../components/member/MemberHomeBanner.vue';
import {fetchActiveGameweeks,fetchGameweeks,rememberGameweek} from '../../services/gameweeks.js';
import {gameweekState,pitchDestination,dateLabel} from '../../utils/gameweeks.js';
export default {
  components:{MemberHomeBanner},
  data:()=>({brand:memberBrand,mode:localStorage.getItem('season-select-tab')==='tab2'?'vip':'normal',rounds:[],recent:[],loading:true,error:false,entering:null,now:Date.now(),offset:0,clock:null,request:0}),
  computed:{...mapGetters('ticket',['getTicket'])},
  methods:{...mapActions('ticket',['facthTicket']),dateLabel,rememberGameweek,
    setMode(mode){this.mode=mode;localStorage.setItem('season-select-tab',mode==='vip'?'tab2':'tab1')},
    state(round){return gameweekState(round,this.now)},
    statusLabel(round){return {open:'เปิดจัดทีม',scheduled:'ยังไม่ถึงเวลาเปิด',closed:'ปิดรับแล้ว',completed:'สรุปผลแล้ว'}[this.state(round)]},
    buttonLabel(round){if(this.entering===round.id)return 'กำลังตรวจสอบ…';if(this.state(round)==='scheduled')return 'เปิด '+dateLabel(round.start_date);if(this.state(round)!=='open')return 'ปิดรับทีมแล้ว';return this.mode==='normal'&&Number(round.normal?.myTeam)>0?'ดูทีมของฉัน':'จัดทีม'+(this.mode==='vip'?' VIP':'')},
    format(n){return Number(n||0).toLocaleString('th-TH')},
    async load(){const request=++this.request;this.loading=true;this.error=false;const [active,history]=await Promise.allSettled([fetchActiveGameweeks(),fetchGameweeks(1,6)]);if(request!==this.request)return;if(active.status==='fulfilled'){this.rounds=active.value.data;this.offset=new Date(active.value.currentTime).getTime()-Date.now();if(!Number.isFinite(this.offset))this.offset=0;this.now=Date.now()+this.offset}else{this.error=true;this.rounds=[]}if(history.status==='fulfilled')this.recent=history.value.data.filter(w=>w.status!=='active').slice(0,3);this.loading=false},
    async enter(round){if(this.state(round)!=='open')return;rememberGameweek(round);if(this.mode==='normal'&&Number(round.normal?.myTeam)>0){this.$router.push({name:'list',query:{game_week_id:round.id,mode:'normal'}});return}this.entering=round.id;try{if(this.mode==='vip'){await this.facthTicket();if(Number(this.getTicket)<=0){const result=await Swal.fire({title:'ตั๋ว VIP ไม่เพียงพอ',text:'ใช้ 1 ตั๋วสำหรับจัดทีม VIP',showCancelButton:true,confirmButtonText:'สนับสนุนเรา',cancelButtonText:'กลับ'});if(result.isConfirmed)this.$router.push({name:'payments'});return}}const destination=pitchDestination(round,this.mode);if(destination)this.$router.push(destination)}finally{this.entering=null}}
  },
  mounted(){this.load();this.clock=setInterval(()=>{this.now=Date.now()+this.offset},1000)},
  beforeUnmount(){this.request++;clearInterval(this.clock)}
};
</script>
<style scoped>.member-round-footer{display:flex;justify-content:space-between;gap:10px;font-size:11px;margin-top:15px;color:var(--member-muted)}.member-round-footer a{color:var(--member-soft);min-height:28px;display:inline-flex;align-items:center}</style>
