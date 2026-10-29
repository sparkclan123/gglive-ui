<template>
  <section class="player-points-page"><header class="member-page-header"><div class="member-kicker">PLAYER STATS</div><h1>คะแนนนักเตะ</h1><p>เลือกเกมวีคเพื่อดูคะแนน ผลงาน และรายละเอียดของนักเตะในรอบนั้น</p></header><WeekPoint /></section>
</template>
<script>
import WeekPoint from '../../components/detailpoint/weekpoint.vue';
export default { name: 'PlayerPointsDiscovery', components: { WeekPoint } };
</script>
