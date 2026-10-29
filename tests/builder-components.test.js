import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createStore, mapActions, mapGetters } from 'vuex';
import playerSelect from '../src/store/modules/playerSelect.js';
import GameWeek from '../src/store/modules/GameWeek.js';
import { gameweekState } from '../src/utils/gameweeks.js';
import { originalShirtImage, resolveCopiedPlayers } from '../src/utils/builderContext.js';

// Exercise the SFC's real options and Vuex mutations; replace only HTTP, UI imports and the browser confirmation.
function mountBuilder({ mode = 'vip', confirm = async () => ({ isConfirmed: true, value: 'My XI' }), post = async () => ({ data: { ok: true, main_id: 88 } }) } = {}) {
  const source = fs.readFileSync(new URL('../src/components/fantasy/FantasyTeam.vue', import.meta.url), 'utf8').split('<script>')[1].split('</script>')[0].replace(/^import .*$/gm, '').replace('export default', 'return');
  const options = new Function('mapActions', 'mapGetters', 'Swal', 'api', 'originalShirtImage', 'resolveCopiedPlayers', 'PlayerSelection', 'ModelCopyTeam', 'Modelc', 'gameweekState', source)(mapActions, mapGetters, { fire: confirm }, { post }, originalShirtImage, resolveCopiedPlayers, {}, {}, {}, gameweekState);
  const notices = [], navigation = [], tickets = [];
  const store = createStore({ modules: { playerSelect, GameWeek, alert: { namespaced: true, actions: { addNotification(_, value) { notices.push(value); } } }, ticket: { namespaced: true, actions: { facthTicket() { tickets.push(true); } } } } });
  store.dispatch('playerSelect/setFormation', '1-5-5-3');
  const positions = ['G', 'D', 'D', 'D', 'M', 'M', 'M', 'M', 'F', 'F', 'F'];
  const pool = positions.map((position, index) => ({ id: index + 1, player_id: index + 20, position, price: 5, team_id: index % 4, game_week_id: 2, season_id: 9, name: `Player ${index}` }));
  store.dispatch('GameWeek/setGameWeek', { id: 2, season_id: 9, status: 'active', start_date: '2020-01-01T00:00:00Z', end_date: '2100-01-01T00:00:00Z' });
  store.dispatch('GameWeek/setGameWeekPlayer', pool);
  for (const player of pool) store.dispatch('playerSelect/addPlayer', { player, position: { G: 'GKP', D: 'DEF', M: 'MID', F: 'FWD' }[player.position] });
  const vm = { ...options.data(), mode, condition: 3, isCaptain: 1, $store: store, $route: { params: { gameWeekID: '2', seasonID: '9' }, name: mode === 'normal' ? 'pitch-n' : 'pitch' }, $router: { push(value) { navigation.push(value); } } };
  Object.entries(options.methods).forEach(([name, fn]) => { vm[name] = fn.bind(vm); });
  Object.entries(options.computed).forEach(([name, get]) => Object.defineProperty(vm, name, { get: get.bind(vm) }));
  return { vm, options, notices, navigation, tickets };
}
globalThis.localStorage = { getItem() { return 'fixture-token'; } };

test('leaving the builder while the team-name confirmation is pending prevents a late submission', async () => {
  let resolve;
  const pending = new Promise(r => { resolve = r; });
  const posts = [];
  const { vm, options } = mountBuilder({ confirm: () => pending, post: async (...args) => { posts.push(args); return { data: { ok: true, main_id: 1 } }; } });
  const save = vm.saveTeam();
  options.beforeUnmount.call(vm);
  resolve({ isConfirmed: true, value: 'Late team' });
  await save;
  assert.equal(posts.length, 0);
});

test('normal and VIP submit the selected round through their original endpoints with a captain and preserve ticket handling', async () => {
  for (const mode of ['normal', 'vip']) {
    const requests = [];
    const { vm, navigation, tickets } = mountBuilder({ mode, post: async (...args) => { requests.push(args); return { data: { ok: true, main_id: 88 } }; } });
    await vm.saveTeam();
    assert.equal(requests.length, 1);
    assert.equal(requests[0][0], mode === 'normal' ? '/premier-league/v1/create-player-game-n' : '/premier-league/v1/create-player-game');
    assert.equal(requests[0][1].game_week_id, 2);
    assert.equal(requests[0][1].season_id, 9);
    assert.equal(requests[0][1].captain, 1);
    assert.equal(requests[0][1].name, 'My XI');
    assert.equal(tickets.length, mode === 'vip' ? 1 : 0);
    assert.equal(navigation[0].name, mode === 'normal' ? 'pitch-detail-n' : 'pitch-detail');
  }
});

test('copying a valid round resets captain while preserving the original 1/5/5/3 slot capacities', () => {
  const { vm } = mountBuilder();
  vm.CopyPlayer(vm.getGameWeekPlayer.map(player => ({ player_id: player.player_id, game_week_id: 2, season_id: 9 })));
  assert.equal(vm.isCaptain, 'none');
  assert.equal(vm.totalPlayerCount, 11);
  assert.deepEqual([vm.getGKP.length, vm.getDEF.length, vm.getMID.length, vm.getFWD.length], [1, 5, 5, 3]);
});


test('an active but scheduled or expired gameweek cannot submit through a direct builder URL', async () => {
  for (const dates of [{ start_date: '2100-01-01T00:00:00Z', end_date: '2101-01-01T00:00:00Z' }, { start_date: '2000-01-01T00:00:00Z', end_date: '2001-01-01T00:00:00Z' }]) {
    let posts = 0;
    const { vm } = mountBuilder({ post: async () => { posts += 1; return { data: { ok: true, main_id: 1 } }; } });
    vm.$store.dispatch('GameWeek/setGameWeek', { ...vm.getGameWeek, ...dates });
    await vm.saveTeam();
    assert.equal(posts, 0);
  }
});
