<template>
  <div class="member-competition"><header class="member-competition-title"><h1>สนามแข่งขัน</h1><div class="member-mode-switch" aria-label="ประเภทอันดับ"><button :class="{'is-selected':mode==='normal'}" @click="setMode('normal')">ปกติ</button><button :class="{'is-selected':mode==='vip'}" @click="setMode('vip')">VIP ✦</button></div></header>
    <div v-if="loading" class="member-loading" role="status">กำลังโหลดรอบการแข่งขัน…</div>
    <div v-else-if="error" class="member-error"><h2>โหลดรอบการแข่งขันไม่สำเร็จ</h2><button class="member-button" @click="loadWeeks">ลองอีกครั้ง</button></div>
    <template v-else><label for="ranking-gameweek" class="sr-only">เลือก Gameweek</label><select id="ranking-gameweek" v-if="weeks.length" class="member-week-select" v-model.number="selectedID" @change="selectWeek"><option v-for="week in weeks" :key="week.id" :value="week.id">{{week.week_name || `Gameweek ${week.week}`}} · {{week.status==='active'?'รอบปัจจุบัน':'ย้อนหลัง'}}</option></select><button v-if="hasMore" class="member-text-button" @click="loadOlder" :disabled="loadingOlder">{{loadingOlder?'กำลังโหลด…':'โหลดรอบก่อนหน้า'}}</button>
      <component v-if="selectedID" :is="mode==='vip'?'ChallengeGameWeekVip':'ChallengeGameWeek'" :key="`${mode}-${selectedID}`" :game-week-id="selectedID"/>
      <div v-else class="member-empty"><h2>ยังไม่มี Gameweek</h2><p>อันดับจะแสดงเมื่อมีการแข่งขัน</p></div>
    </template>
    <RouterLink class="member-text-button" :to="{name:'rule'}">กติกาการแข่งขัน <MemberIcon name="arrow"/></RouterLink>
  </div>
</template>
<script>
import ChallengeGameWeek from '../../components/challenge/GameWeek.vue';
import ChallengeGameWeekVip from '../../components/challenge/GameWeekVip.vue';
import {fetchGameweeks,fetchGameweek,rememberGameweek,rememberedGameweek} from '../../services/gameweeks.js';
import {preferredGameweek} from '../../utils/gameweeks.js';
export default {
  components:{ChallengeGameWeek,ChallengeGameWeekVip},
  data(){return {weeks:[],selectedID:null,mode:this.$route.query.mode==='vip'||(!this.$route.query.mode&&localStorage.getItem('challenge-tab')==='tab2')?'vip':'normal',loading:true,error:false,page:1,hasMore:false,loadingOlder:false,request:0}},
  methods:{
    async loadWeeks(){const request=++this.request;this.loading=true;this.error=false;try{const response=await fetchGameweeks(1,100);if(request!==this.request)return;this.weeks=response.data;this.page=1;this.hasMore=response.page<response.pages;const requested=Number(this.$route.query.game_week_id)||rememberedGameweek();let selected=preferredGameweek(this.weeks,requested);if(requested&&!this.weeks.some(w=>Number(w.id)===requested)){
        try {selected=await fetchGameweek(requested);if(request!==this.request)return;this.weeks.push(selected)}
        catch {if(this.$route.query.game_week_id)throw new Error('Round not found')}
      }this.selectedID=selected?.id||null}catch{if(request===this.request)this.error=true}finally{if(request===this.request)this.loading=false}},
    async loadOlder(){this.loadingOlder=true;try{const response=await fetchGameweeks(this.page+1,100);this.weeks=[...this.weeks,...response.data.filter(w=>!this.weeks.some(existing=>existing.id===w.id))];this.page=response.page;this.hasMore=response.page<response.pages}catch{this.error=true}finally{this.loadingOlder=false}},
    selectWeek(){rememberGameweek({id:this.selectedID});this.$router.replace({name:'challenge',query:{game_week_id:this.selectedID,mode:this.mode}})},
    setMode(mode){this.mode=mode;localStorage.setItem('challenge-tab',mode==='vip'?'tab2':'tab1');this.$router.replace({name:'challenge',query:{game_week_id:this.selectedID,mode}})}
  },mounted(){this.loadWeeks()},beforeUnmount(){this.request++}
};
</script>
