import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mapActions } from 'vuex';
const sourceOptions = (path, dependencies = {}) => {
  const script = fs.readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8').split('<script>')[1].split('</script>')[0].replace(/^import .*$/gm, '').replace('export default', 'return');
  return new Function(...Object.keys(dependencies), script)(...Object.values(dependencies));
};
const bind = (options, extra = {}) => {
  const vm = { ...(options.data?.() || {}), ...extra };
  Object.entries(options.methods || {}).forEach(([key, method]) => { vm[key] = method.bind(vm); });
  Object.entries(options.computed || {}).forEach(([key, getter]) => Object.defineProperty(vm, key, { get: getter.bind(vm) }));
  return vm;
};
globalThis.localStorage = { getItem() { return 'fixture-token'; }, setItem() {} };

test('pagination never sends ellipses, out-of-range or duplicate pages to an API consumer', () => {
  const options = sourceOptions('components/object/pagenation.vue');
  const events = [];
  const vm = bind(options, { page: 5, pages: 20, $emit: (...event) => events.push(event) });
  for (const target of ['..', '...', 0, 21, 5, 1.5]) vm.goToPage(target);
  vm.goToPage(6);
  assert.deepEqual(events, [['page-change', 6]]);
});

test('selected-week fixtures use the scoped endpoint and a slow previous selection cannot overwrite them', async () => {
  let resolve;
  const slow = new Promise(r => { resolve = r; });
  const paths = [];
  const api = { get: async path => {
    paths.push(path);
    if (path.endsWith('/41')) return slow;
    return { data: { ok: true, matches: [{ ID: 42, DateVs: '2026-10-29', Team1Name: 'Home', Team2Name: 'Away', Score1: 1, Score2: 0 }] } };
  } };
  const options = sourceOptions('pages/gglive/result.vue', { api, mapActions, Result: {}, ResultGameweek: {}, ResultGameweekVip: {}, fetchGameweeks: async () => ({ ok: true, data: [] }), memberHeaders: () => ({}) });
  const vm = bind(options);
  const first = vm.fetchMatches(41);
  const second = vm.fetchMatches(42);
  await second;
  resolve({ data: { ok: true, matches: [{ ID: 41, DateVs: '2026-10-29', Team1Name: 'Old home', Team2Name: 'Old away', Score1: 0, Score2: 0 }] } });
  await first;
  assert.deepEqual(paths, ['/premier-league/v1/result-game-week/41', '/premier-league/v1/result-game-week/42']);
  assert.equal(vm.matches[0].id, 42);
});

test('a failed fixture request clears old matches and exposes an error instead of a false empty result', async () => {
  const options = sourceOptions('pages/gglive/result.vue', { api: { get: async () => { throw new Error('offline'); } }, mapActions, Result: {}, ResultGameweek: {}, ResultGameweekVip: {}, fetchGameweeks: async () => ({ ok: true, data: [] }), memberHeaders: () => ({}) });
  const vm = bind(options, { matches: [{ id: 4 }] });
  await vm.fetchMatches();
  assert.deepEqual(vm.matches, []);
  assert.ok(vm.matchesError);
  assert.equal(vm.matchesLoading, false);
});

test('player-points discovery keeps the latest requested page and opens its own season', async () => {
  let resolve;
  const slow = new Promise(r => { resolve = r; });
  const payload = page => ({ ok: true, data: [{ id: page * 10, season_id: page + 100, week: page }], total: 20, page, limit: 10, pages: 2 });
  const fetchGameweeks = async page => page === 1 ? slow : payload(page);
  const api = { get: async (_, config) => ({ data: await fetchGameweeks(config.params.page) }) };
  const options = sourceOptions('components/detailpoint/weekpoint.vue', { api, fetchGameweeks, gameweekState: () => 'completed', dateLabel: () => 'date' });
  const navigation = [];
  const vm = bind(options, { $router: { push: value => navigation.push(value) } });
  const first = vm.fetchGameWeeks(1);
  const second = vm.fetchGameWeeks(2);
  await second; resolve(payload(1)); await first;
  assert.equal(vm.gameweekData.page, 2);
  vm.seeDetailGameWeek(vm.gameweekData.datas[0]);
  assert.deepEqual(navigation, [{ name: 'player-detail-point-table', params: { id: 20, seasonID: 102 } }]);
});

test('retrying a failed ranking-discovery page requests that same page', async () => {
  const pages = [];
  const fetchGameweeks = async page => { pages.push(page); if (pages.length === 1) throw new Error('offline'); return { data: [], page, limit: 10, total: 0, pages: 1 }; };
  const options = sourceOptions('pages/gglive/result.vue', { api: {}, Result: {}, ResultGameweek: {}, ResultGameweekVip: {}, fetchGameweeks, memberHeaders: () => ({}) });
  const vm = bind(options);
  await vm.fetchGameWeeks(2);
  await vm.fetchGameWeeks();
  assert.deepEqual(pages, [2, 2]);
});


test('pagination is bounded for large page counts and can jump directly without submitting invalid values', () => {
  const options = sourceOptions('components/object/pagenation.vue');
  const events = [];
  const vm = bind(options, { page: 50000, pages: 100000, disabled: false, $emit: (...event) => events.push(event) });
  assert.ok(vm.pagesToShow.length <= 7);
  assert.equal(vm.pagesToShow[0], 1);
  assert.equal(vm.pagesToShow.at(-1), 100000);
  vm.jumpPage = '99999'; vm.submitPage();
  assert.deepEqual(events, [['page-change', 99999]]);
  for (const value of ['', '0', '-1', '1.5', '100001']) { vm.jumpPage = value; vm.submitPage(); }
  assert.equal(events.length, 1);
  vm.disabled = true; vm.jumpPage = '3'; vm.submitPage();
  assert.equal(events.length, 1);
});
