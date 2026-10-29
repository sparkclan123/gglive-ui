<template><div>
  <header class="member-page-header"><p class="member-kicker">{{ $memberBrand.name }} {{ $memberBrand.tagline }}</p><h1>ทีมของฉัน</h1><p>ทุกทีม ทุก Gameweek อยู่ที่นี่</p></header>
  <div class="tabs" aria-label="รายการของฉัน"><button class="tab-item" :class="{active:activeTab==='tab1'}" @click="setTab('tab1')">เกมวีคปกติ</button><button class="tab-item" :class="{active:activeTab==='tab2'}" @click="setTab('tab2')">VIP ✦</button><button class="tab-item" :class="{active:activeTab==='tab3'}" @click="setTab('tab3')">จัดแข่งเอง</button></div>
  <div v-if="filterGameweekId && activeTab!=='tab3'" class="member-entry-meta"><span>รายการของ Gameweek {{filterGameweekId}}</span><button class="member-text-button" @click="showAll">ดูทุกรอบ</button></div>
  <div v-if="roundsError" class="member-error"><p>โหลดสิทธิ์แก้ไขทีมไม่สำเร็จ</p><button class="member-button is-secondary" @click="loadRounds">ลองอีกครั้ง</button></div>
  <component :is="currentTabComponent" :key="`${activeTab}-${filterGameweekId}`" :active-gameweeks="activeGameweeks" :filter-gameweek-id="filterGameweekId" />
</div></template>
<script>
import MyGameWeekN from '../../components/list/MyGameWeekN.vue';
import MyGameWeek from '../../components/list/MyGameWeek.vue';
import SelfMatch from '../../components/list/SelfMatch.vue';
import {fetchActiveGameweeks} from '../../services/gameweeks.js';
export default {
 components:{MyGameWeek,MyGameWeekN,SelfMatch},
 data(){const saved=localStorage.getItem('list-tab');return {activeTab:this.$route.query.mode?this.$route.query.mode==='self'?'tab3':this.$route.query.mode==='vip'?'tab2':'tab1':['tab1','tab2','tab3'].includes(saved)?saved:'tab1',activeGameweeks:[],roundsError:false,filterGameweekId:Number(this.$route.query.game_week_id)||null}},
 computed:{currentTabComponent(){return {tab1:'MyGameWeekN',tab2:'MyGameWeek',tab3:'SelfMatch'}[this.activeTab]}},
 methods:{setTab(tab){this.activeTab=tab;localStorage.setItem('list-tab',tab);this.$router.replace({name:'list',query:{...this.$route.query,mode:{tab1:'normal',tab2:'vip',tab3:'self'}[tab]}})},showAll(){this.$router.replace({name:'list',query:{mode:this.activeTab==='tab2'?'vip':'normal'}})},async loadRounds(){this.roundsError=false;try{const response=await fetchActiveGameweeks();this.activeGameweeks=response.data}catch{this.roundsError=true}}},mounted(){this.loadRounds()}
};
</script>
