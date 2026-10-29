<template>
  <section class="member-ranking" :aria-busy="loading">
    <div v-if="loading && !gameWeek" class="member-loading" role="status">กำลังโหลดอันดับ…</div>
    <div v-else-if="error" class="member-error" role="alert"><h2>โหลดอันดับไม่สำเร็จ</h2><p>ลองโหลดอีกครั้งเพื่อดูผลการแข่งขัน</p><button class="member-button" @click="$emit('retry')">ลองอีกครั้ง</button></div>
    <template v-else-if="gameWeek">
      <header class="member-ranking-heading" :class="{'is-compact':compact}"><div><p class="member-kicker">Gameweek {{gameWeek.week}} · {{mode==='vip'?'VIP':'ปกติ'}}</p><h2 v-if="!compact">{{gameWeek.week_name || `Gameweek ${gameWeek.week}`}}</h2><p>{{season?.label}} · ปิดรับ {{dateLabel(gameWeek.end_date)}}</p></div><button class="member-button is-secondary" @click="$emit('reward')"><MemberIcon name="trophy"/>รางวัล</button></header>
      <div class="member-stat-strip"><div><strong>{{number(total)}}</strong><small>ทีมเข้าแข่งขัน</small></div><div><strong>{{number(maxTotalPoint)}}</strong><small>คะแนนสูงสุด</small></div><div><strong>{{number(avgTotalPoint)}}</strong><small>คะแนนเฉลี่ย</small></div></div>
      <p v-if="loading" class="member-ranking-updating" role="status">กำลังโหลดอันดับ…</p>
      <table ref="rankingTable" tabindex="-1" v-if="numberedRows.length" class="member-ranking-table"><thead><tr><th scope="col">อันดับ</th><th scope="col">ทีม</th><th scope="col">คะแนน</th><th scope="col" class="member-date-column">วันที่ส่งทีม</th></tr></thead><tbody><tr v-for="row in numberedRows" :key="`${row.id}-${row.position}`" :class="{'is-own':Number(row.user_id)===Number(userId)}"><td class="member-rank">{{row.position}}</td><td><button class="member-team-link" :disabled="loading" @click="$emit('view',row.id,row.user_id)"><span class="member-profile-frame"><img :src="row.image_url || $memberBrand.avatarFallback" alt="" @error="fallbackImage"/><img v-if="row.rank_p" :src="`https://pudee.sgp1.digitaloceanspaces.com/${row.rank_p}.png`" class="member-profile-badge" alt="" @error="hideImage"/></span><span>{{row.name}}<small v-if="Number(row.user_id)===Number(userId)" class="member-own-label">ทีมของคุณ</small></span></button></td><td class="member-points">{{row.total_point ?? 0}}</td><td class="member-date-cell">{{dateLabel(row.created_at)}}</td></tr></tbody></table>
      <div v-else class="member-empty"><h2>ยังไม่มีทีมในรอบนี้</h2><p>ทีมที่ส่งเข้าร่วมจะแสดงในตารางอันดับนี้</p></div>
      <Pagination v-if="pages>1" :disabled="loading" :page="page" :pages="pages" @page-change="$emit('page-change',$event)" />
    </template>
    <div v-else class="member-empty"><h2>ยังไม่มีข้อมูลการแข่งขัน</h2><p>เลือกรอบอื่นเพื่อดูอันดับ</p></div>
  </section>
</template>
<script setup>
import {computed,ref,watch,nextTick} from 'vue';
import {rankingRows,dateLabel} from '../../utils/gameweeks.js';
import {memberBrand} from '../../config/memberBrand.js';
const props=defineProps({rows:{type:Array,default:()=>[]},page:{type:Number,default:1},limit:{type:Number,default:100},pages:{type:Number,default:1},gameWeek:Object,season:Object,total:{type:Number,default:0},maxTotalPoint:{type:Number,default:0},avgTotalPoint:{type:Number,default:0},userId:[String,Number],mode:{type:String,default:'normal'},loading:Boolean,error:Boolean,compact:Boolean});
defineEmits(['view','reward','page-change','retry']);
const numberedRows=computed(()=>rankingRows(props.rows,props.page,props.limit));
const rankingTable=ref(null);
watch(()=>props.page,async(page,previous)=>{
  if(page===previous)return;
  await nextTick();
  rankingTable.value?.focus({preventScroll:true});
  rankingTable.value?.scrollIntoView({block:'start',behavior:'auto'});
});
const number=value=>Number(value||0).toLocaleString('th-TH');
function fallbackImage(event){event.target.onerror=null;event.target.src=memberBrand.avatarFallback}
function hideImage(event){event.target.style.display='none'}
</script>
<style scoped>.member-ranking-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-top:24px}.member-ranking-heading>div{min-width:0}.member-ranking-heading h2{font:600 32px/1.15 var(--member-display);overflow-wrap:anywhere}.member-ranking-heading p:last-child{font-size:11px;color:var(--member-muted);margin-top:8px;line-height:1.6}.member-ranking-heading .member-button{min-height:42px;font-size:11px;padding:10px 12px;flex:none}.member-own-label{display:block;font-size:10px;color:var(--member-soft);margin-top:4px}@media(max-width:640px){.member-ranking-heading h2{font-size:27px}.member-ranking-heading{gap:10px}.member-ranking-heading .member-button{padding:9px}.member-ranking-heading .member-button svg{display:none}}</style>
