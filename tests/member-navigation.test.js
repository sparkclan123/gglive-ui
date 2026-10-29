import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {preferredGameweek} from '../src/utils/gameweeks.js';
function options(file,names,values){const s=readFileSync(new URL('../src/'+file,import.meta.url),'utf8').split('<script>')[1].split('</script>')[0].replace(/^import .*;\n/gm,'').replace('export default','return');return new Function(...names,s)(...values)}
test('member list preserves selected VIP and self-match tabs when returning from detail',()=>{
 const saved={};const d=options('pages/gglive/list.vue',['MyGameWeekN','MyGameWeek','SelfMatch','localStorage'],[{},{},{},{getItem:k=>saved[k],setItem:(k,v)=>saved[k]=v}]);
 for(const [tab,mode] of [['tab2','vip'],['tab3','self'],['tab1','normal']]){
  let target;const vm={$route:{query:{game_week_id:'296',mode:'normal'}},$router:{replace:v=>target=v}};
  Object.assign(vm,d.data.call(vm));d.methods.setTab.call(vm,tab);
  assert.equal(target.query.mode,mode);assert.equal(target.query.game_week_id,'296');
  assert.equal(d.data.call({$route:target}).activeTab,tab);
 }
});
test('ranking selector resolves and displays a historical deep link outside the first page',async()=>{
 const d=options('pages/gglive/challenge.vue',['ChallengeGameWeek','ChallengeGameWeekVip','fetchGameweeks','fetchGameweek','rememberGameweek','rememberedGameweek','preferredGameweek','localStorage'],[{},{},async()=>({data:[{id:296}],page:1,pages:2}),async id=>({id,week_name:'Earlier round'}),()=>{},()=>null,preferredGameweek,{getItem:()=>null}]);
 const vm={$route:{query:{game_week_id:'40'}}};Object.assign(vm,d.data.call(vm));await d.methods.loadWeeks.call(vm);
 assert.equal(vm.selectedID,40);assert.equal(vm.weeks.find(w=>w.id===40).week_name,'Earlier round');assert.equal(vm.error,false);
});
