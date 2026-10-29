import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import * as Vue from 'vue';
import { compile, parse } from '@vue/compiler-dom';
import { renderToString } from '@vue/server-renderer';

globalThis.document={body:{style:{}},removeEventListener(){}};

function presentationComponent(path) {
  const file = new URL(`../src/${path}`, import.meta.url);
  const source = readFileSync(file, 'utf8');
  const script = source.split('<script>')[1].split('</script>')[0].replace('export default', 'return');
  const definition = new Function(script)();
  const template = source.split('<template>')[1].split('</template>')[0];
  return { ...definition, render: new Function('Vue', compile(template, { mode: 'function', prefixIdentifiers: true }).code)(Vue) };
}
const MemberTeamHeader = presentationComponent('components/member/MemberTeamHeader.vue');

// Run the Options API methods with only the external HTTP and store boundaries replaced.
function component(name, api) {
  const source = readFileSync(new URL(`../src/pages/gglive-detail/${name}.vue`, import.meta.url), 'utf8');
  const script = source.split('<script>')[1].split('</script>')[0].replace(/^import .*;\n/gm, '').replace('export default', 'return');
  const definition = new Function('api', 'mapActions', 'mapGetters', 'ModelEdit', 'ModelEditSelectPlayer', 'ModelEditSelectPlayerNew', 'Swal', 'localStorage', 'MemberTeamHeader', script)(api, () => ({}), () => ({}), {}, {}, {}, {}, { getItem: () => null }, MemberTeamHeader);
  const vm = { $route: { params: { id: '41', type: 'n', seasonID: '12' } }, updateLoading() {}, setTeams(teams) { this.teams = teams; } };
  Object.assign(vm, definition.data.call(vm));
  for (const [name, method] of Object.entries(definition.methods)) vm[name] = method.bind(vm);
  vm.id = '41'; vm.type = 'n';
  return { vm, definition };
}
const roster = [{ id: 101, player_id: 201, position: 'G', sort: 1, captain: 1, price: 6, name: 'Keeper', team_code: 't3', team_id: 3 }];
function entry(id, week = 52, season = 12) { return { data: { ok: true, playerGame: roster.map(p => ({ ...p })), playerGameMain: { id, week_id: week, season_id: season }, avgTotalPoint: 4, maxTotalPoint: 8 } }; }
function pool(week = 52, season = 12) { return { data: { ok: true, gameWeek: { id: week, season_id: season }, players: roster, teams: [{ team_id: 3, name: 'Club' }] } }; }
function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }

async function renderDetail(name, state) {
  const { definition } = component(name, {});
  const source = readFileSync(new URL(`../src/pages/gglive-detail/${name}.vue`, import.meta.url), 'utf8');
  const template = source.split('<template>')[1].split('</template>')[0];
  const render = new Function('Vue', compile(template, { mode: 'function', prefixIdentifiers: true }).code)(Vue);
  const hidden = { render: () => null };
  const app = Vue.createSSRApp({ ...definition, data: () => ({ ...definition.data(), detailPlayer: null, ...state }), created() {}, render,
    components: { ...definition.components, ModelEdit: hidden, ModelEditSelectPlayer: hidden, ModelEditSelectPlayerNew: hidden } });
  app.config.globalProperties.$memberBrand = { avatarFallback: '/avatar.svg' };
  app.component('NumberDisplay', presentationComponent('components/object/numberDisplay.vue'));
  app.component('DateFormatted', presentationComponent('components/object/dateformatted.vue'));
  app.component('LodingSceen', hidden);
  app.component('FootBallIcon', hidden);
  return renderToString(app);
}

function renderedStats(html) {
  const stats = html.match(/<dl\b[^>]*>([\s\S]*?)<\/dl>/)?.[1] || '';
  return stats.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

for (const name of ['challenge-detail', 'challenge-detail-n']) {
  test(`${name} shows one team identity while retaining avatar, points, budget and round context`, async () => {
    const html = await renderDetail(name, { getMain: { name: 'East Stand FC', total_point: 0, total_price: 79.5, week: 14, season: '2026/27' } });
    assert.equal((html.match(/East Stand FC/g) || []).length, 1, 'The team name should be displayed once');
    assert.match(html, /src="\/avatar.svg"/);
    assert.match(renderedStats(html), /คะแนน0/);
    assert.match(renderedStats(html), /งบที่ใช้ไป79\.5\$/);
    assert.match(html, /เกมวีค 14/);
    assert.match(html, /2026\/27/);
  });
}

for (const name of ['gglive-detail', 'gglive-detail-n']) {
  test(`${name} retains zero points and the round's maximum and average in its summary`, async () => {
    const html = await renderDetail(name, { getMain: { name: 'East Stand FC', total_point: 0, week: 14, season: '2026/27' }, maxTotalPoint: 92, avgTotalPoint: 45.5 });
    const stats = renderedStats(html);
    assert.match(stats, /คะแนน0/);
    assert.match(stats, /สูงสุด92/);
    assert.match(stats, /เฉลี่ย45\.5/);
    assert.match(html, /เกมวีค 14/);
    assert.match(html, /2026\/27/);
  });
}

for (const name of ['gglive-detail-edit', 'gglive-detail-edit_new']) {
  test(`${name} retains its budget, creation time and distinct save behavior`, async () => {
    const html = await renderDetail(name, { getMain: { name: 'East Stand FC', week: 14, season: '2026/27', created_at: '2026-10-29T03:00:00Z' }, getGKP: [{ ...roster[0] }] });
    const stats = renderedStats(html);
    assert.match(stats, /งบทั้งหมด80\.0/);
    assert.match(stats, /ใช้ไป-6\.0/);
    assert.match(stats, /เวลาสร้างทีม/);
    assert.match(stats, /29\/10\/2026/);
    const staged = name.endsWith('_new');
    assert.equal(/<button[^>]*>บันทึกแก้ไขทีม<\/button>/.test(html), staged);
    assert.equal(/<button[^>]*>รีเซ็ต<\/button>/.test(html), staged);
    assert.equal(html.includes('การเปลี่ยนแปลงจะบันทึกทันที'), !staged);
  });
}

for (const name of ['gglive-detail-edit', 'gglive-detail-edit_new']) {
  test(`${name} loads clubs and pool from the entry round before showing the editor`, async () => {
    const calls = [];
    const pending = deferred();
    const { vm } = component(name, { async get(url, options) { calls.push({ url, params: options.params }); if (url.includes('detail-edit/')) return entry(41); if (url.endsWith('/teams')) return { data: { ok: true, teams: [{ team_id: 3, name: 'Club' }] } }; return pending.promise; } });
    vm.getMain = { id: 8 }; vm.getGKP = [{ id: 9 }]; vm.players = [{ id: 99 }]; vm.is_captan = 99;
    const loading = vm.fetchGameWeekDetail();
    assert.equal(vm.getMain, null);
    assert.deepEqual(vm.players, []);
    await new Promise(setImmediate);
    assert.equal(vm.getMain, null);
    pending.resolve(pool());
    await loading;
    assert.deepEqual(calls.find(c => c.url.endsWith('/teams')).params, { game_week_id: 52 });
    assert.deepEqual(calls.find(c => c.url.endsWith('/game-week-player')).params, { seasonID: 12, gameWeekID: 52 });
    assert.equal(vm.getMain.id, 41);
    assert.equal(vm.is_captan, 201);
    assert.equal(vm.players[0].id, 101);
  });
  test(`${name} rejects a pool from another season`, async () => {
    const { vm } = component(name, { async get(url) { if (url.includes('detail-edit/')) return entry(41); if (url.endsWith('/teams')) return { data: { ok: true, teams: [] } }; return pool(52, 99); } });
    await vm.fetchGameWeekDetail();
    assert.equal(vm.getMain, null);
    assert.deepEqual(vm.players, []);
    assert.ok(vm.loadError);
  });
  test(`${name} ignores an older entry response after loading another entry`, async () => {
    const old = deferred();
    const { vm } = component(name, { async get(url, options) { if (url.includes('detail-edit/41/')) return old.promise; if (url.includes('detail-edit/42/')) return entry(42, 53, 13); if (url.endsWith('/teams')) return { data: { ok: true, teams: [{ team_id: 7 }] } }; return pool(options.params.gameWeekID, options.params.seasonID); } });
    const first = vm.fetchGameWeekDetail(); vm.id = '42'; await vm.fetchGameWeekDetail(); old.resolve(entry(41)); await first;
    assert.equal(vm.getMain.id, 42);
    assert.equal(vm.getMain.week_id, 53);
  });
}

for (const name of ['gglive-detail', 'gglive-detail-n', 'challenge-detail', 'challenge-detail-n']) {
  test(`${name} clears old detail while reloading and ignores an outdated response`, async () => {
    const old = deferred();
    const { vm } = component(name, { async get(url) { return url.endsWith('/41') ? old.promise : entry(42, 53, 13); } });
    vm.getMain = { id: 1 }; vm.getGKP = [{ id: 1 }];
    const first = vm.fetchGameWeekDetail();
    assert.equal(vm.getMain, null);
    assert.deepEqual(vm.getGKP, []);
    vm.id = '42'; await vm.fetchGameWeekDetail(); old.resolve(entry(41)); await first;
    assert.equal(vm.getMain.id, 42);
  });
}

test('score list uses snapshot clubs and clears the previous pool during loading', async () => {
  const response = deferred();
  const { vm } = component('table-player-point', { get() { return response.promise; } });
  vm.gameWeekID = 52; vm.seasonID = 12; vm.getGameWeekPlayer = [{ id: 9 }];
  const loading = vm.facthPlayerListGameWeekPoint();
  assert.equal(vm.getGameWeekPlayer, null);
  response.resolve(pool()); await loading;
  assert.deepEqual(vm.getTeams, [{ team_id: 3, name: 'Club' }]);
  assert.deepEqual(vm.options[1].options, [{ name: 'Club', value: 3 }]);
});

test('score filtering resets pagination so the matches are visible', () => {
  const { vm } = component('table-player-point', {}); vm.currentPage = 3;
  vm.filterPlayers(); assert.equal(vm.currentPage, 1);
});

for (const name of ['gglive-detail','gglive-detail-n','challenge-detail','challenge-detail-n','gglive-detail-edit','gglive-detail-edit_new']) {
 test(`${name} releases the shared loading overlay when navigation cancels a pending request`,async()=>{
  const pending=deferred();const {vm,definition}=component(name,{get(){return pending.promise}});
  let loading=true;vm.updateLoading=value=>{loading=value};
  const request=vm.fetchGameWeekDetail();definition.beforeUnmount.call(vm);
  assert.equal(loading,false);
  pending.resolve(entry(41));await request;
  assert.equal(vm.getMain,null);
 });
}

test('staged roster renders independent native buttons for player, remove and undo actions', async () => {
  const { definition } = component('gglive-detail-edit_new', {});
  const template = readFileSync(new URL('../src/pages/gglive-detail/gglive-detail-edit_new.vue', import.meta.url), 'utf8').split('<template>')[1].split('</template>')[0];
  const render = new Function('Vue', compile(template, { mode: 'function', prefixIdentifiers: true }).code)(Vue);
  const state = { ...definition.data(), getMain: { name: 'My team' }, getGKP: [{ ...roster[0] }], getDEF: [{ ...roster[0], player_id: 202, position: 'D', remove: true }], getMID: [{ ...roster[0], player_id: 203, position: 'M' }], getFWD: [{ ...roster[0], player_id: 204, position: 'F', remove: true }] };
  const hidden = { render: () => null };
  const app = Vue.createSSRApp({ ...definition, data: () => state, created() {}, render, components: { ...definition.components, ModelEdit: hidden, ModelEditSelectPlayerNew: hidden } });
  for (const name of ['LodingSceen', 'DateFormatted', 'NumberDisplay']) app.component(name, hidden);
  const tree = parse(await renderToString(app));
  let actions = 0;
  function visit(node, insideButton = false) {
    const interactive = node.tag === 'button' || node.props?.some(p => p.name === 'role' && p.value?.content === 'button');
    assert.equal(Boolean(insideButton && interactive), false, 'Interactive controls must not be nested inside a player button');
    if (node.props?.some(p => p.name === 'aria-label' && /^(นำ |คืน )/.test(p.value?.content || ''))) {
      assert.equal(node.tag, 'button', 'Remove and undo use native keyboard-operable buttons');
      actions++;
    }
    for (const child of node.children || []) visit(child, insideButton || node.tag === 'button');
  }
  visit(tree);
  assert.equal(actions, 4);
});
