import test from 'node:test';
import assert from 'node:assert/strict';
import { gameweekState, pitchDestination, preferredGameweek, rankingRows, isEntryEditable } from '../src/utils/gameweeks.js';
const now = '2026-10-28T12:00:00Z';
const current = { id: 30, season_id: 8, status: 'active', start_date: '2026-10-28T11:00:00Z', end_date: '2026-10-28T13:00:00Z' };
test('open, scheduled, completed and expired rounds stay distinct at boundaries', () => {
  assert.equal(gameweekState(current,now),'open');
  assert.equal(gameweekState({...current,start_date:'2026-10-28T12:01:00Z'},now),'scheduled');
  assert.equal(gameweekState({...current,end_date:now},now),'closed');
  assert.equal(gameweekState({...current,status:'completed'},now),'completed');
  assert.equal(gameweekState({...current,start_date:'invalid'},now),'closed');
});
test('routes use the chosen round season and mode, not the global season',()=>{
  assert.deepEqual(pitchDestination(current,'vip'),{name:'pitch',params:{seasonID:8,gameWeekID:30}});
  assert.equal(pitchDestination({...current,season_id:0},'normal'),null);
});
test('a remembered round wins; otherwise an open round then latest history is selected',()=>{
  const rows=[{...current,id:31,status:'completed'},{...current,id:30}];
  assert.equal(preferredGameweek(rows,31,now).id,31);
  assert.equal(preferredGameweek(rows,null,now).id,30);
  assert.equal(preferredGameweek([{...current,status:'completed'}],null,now).id,30);
  assert.equal(preferredGameweek([],null,now),null);
});
test('ordinal ranks do not use profile badge identifiers and continue across pages',()=>{
  const rows=rankingRows([{id:1,rank_p:''},{id:2,rank_p:'vip_gold'}],2,25);
  assert.deepEqual(rows.map(x=>x.position),[26,27]);
  assert.equal(rows[1].rank_p,'vip_gold');
});
test('edit buttons follow each entry round without leaking another active round',()=>{
  const rounds=[current,{...current,id:31,status:'completed'}];
  assert.equal(isEntryEditable({week_id:30},rounds,now),true);
  assert.equal(isEntryEditable({week_id:31},rounds,now),false);
  assert.equal(isEntryEditable({week_id:99},rounds,now),false);
});
