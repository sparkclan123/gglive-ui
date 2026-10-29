import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gameweekState } from '../src/utils/gameweeks.js';

// Exercise the component methods with only network and browser dependencies replaced.
function component(path, dependencies = {}) {
  const source = readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')
    .match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import .*;\s*$/gm, '')
    .replace('export default', 'return');
  const defaults = {
    api: {}, Swal: { fire: async () => ({ isConfirmed: false }) },
    gameweekState, fetchActiveGameweeks: async () => ({ data: [] }),
    rememberedGameweek: () => null, rememberGameweek: () => {},
    mapActions: () => ({}), mapGetters: () => ({}), MyGameWeek: {}, MyGameWeekN: {},
    localStorage: { getItem: () => 'test-token' },
  };
  const deps = { ...defaults, ...dependencies };
  const definition = new Function(...Object.keys(deps), source)(...Object.values(deps));
  const instance = { ...definition.data(), $emit() {}, ...definition.methods };
  for (const [key, getter] of Object.entries(definition.computed || {})) {
    Object.defineProperty(instance, key, { get: () => getter.call(instance) });
  }
  return instance;
}

const openRound = { id: 41, status: 'active', start_date: '2000-01-01', end_date: '2100-01-01' };

test('self-match creation sends the chosen round while keeping the existing name field', async () => {
  const requests = [];
  const page = component('components/list/SelfMatch.vue', {
    api: { post: async (url, body) => { requests.push({ url, body }); return { data: { ok: false } }; } },
  });
  page.teamName = 'Friends';
  page.gameweeks = [openRound, { ...openRound, id: 42 }];
  page.selectedGameweekID = 41;
  await page.confirmCreateMatch();
  assert.deepEqual(requests, [{ url: '/premier-league/v1/create-self_match', body: { teamName: 'Friends', game_week_id: 41 } }]);
});

test('self-match creation never falls back to a latest round when selection is missing or closed', async () => {
  let writes = 0;
  const page = component('components/list/SelfMatch.vue', {
    api: { post: async () => { writes++; return { data: { ok: false } }; } },
  });
  page.teamName = 'Friends';
  page.gameweeks = [openRound, { ...openRound, id: 42, status: 'completed' }];
  for (const id of [null, 99, 42]) {
    page.selectedGameweekID = id;
    await page.confirmCreateMatch();
  }
  assert.equal(writes, 0);
});

test('self-match detail passes its canonical round into the team picker', async () => {
  const routes = [];
  const page = component('pages/gglive/selfMatchDetail.vue');
  page.matchID = '17';
  page.gameWeekID = 99;
  page.selfMatch = { id: 17, game_week_id: 41 };
  page.$router = { push: route => routes.push(route) };
  await page.addTeamInMatch();
  assert.deepEqual(routes, [{ name: 'self-match-detail-pick', params: { id: '17' }, query: { gameWeekID: 41 } }]);
});

test('picker resolves the actual competition round when an incoming link has another round', async () => {
  const requests = [];
  const page = component('pages/gglive/selfMatchDetailPickUp.vue', {
    api: { get: async url => {
      requests.push(url);
      return { data: { ok: true, selfMatch: { id: 17, name: 'Friends', game_week_id: 41 }, gameWeek: { id: Number(url.split('/').pop()), week_name: 'Round A' } } };
    } },
  });
  page.$route = { params: { id: '17' }, query: { gameWeekID: '99' } };
  await page.loadMatchRound();
  assert.equal(page.gameWeekID, 41);
  assert.equal(page.gameWeek.id, 41);
  assert.deepEqual(requests, ['/premier-league/v1/self_match/17/99', '/premier-league/v1/self_match/17/41']);
});

test('an older picker link resolves its competition across pages without using an active-round endpoint', async () => {
  const requests = [];
  const page = component('pages/gglive/selfMatchDetailPickUp.vue', {
    api: { get: async (url, options) => {
      requests.push({ url, page: options.params?.page });
      if (url.endsWith('get-self_match')) return { data: { ok: true, pages: 2, selfMatch: options.params.page === 1 ? [{ id: 16, game_week_id: 99 }] : [{ id: 17, game_week_id: 41 }] } };
      return { data: { ok: true, selfMatch: { id: 17, game_week_id: 41 }, gameWeek: { id: 41 } } };
    } },
  });
  page.$route = { params: { id: '17' }, query: {} };
  await page.loadMatchRound();
  assert.equal(page.gameWeekID, 41);
  assert.deepEqual(requests, [
    { url: '/premier-league/v1/get-self_match', page: 1 },
    { url: '/premier-league/v1/get-self_match', page: 2 },
    { url: '/premier-league/v1/self_match/17/41', page: undefined },
  ]);
});

for (const [file, endpoint] of [['MyGameWeek.vue', 'game-week-player-user'], ['MyGameWeekN.vue', 'game-week-player-user-n']]) {
  test(`${file} requests only the competition round and cannot load an implicit round`, async () => {
    const requests = [];
    const picker = component(`components/selfPick/${file}`, {
      api: { get: async (url, options) => { requests.push({ url, params: options.params }); return { data: { ok: true, data: [], total: 0, page: 2, limit: 10, pages: 0 } }; } },
    });
    picker.gameWeekID = null;
    await picker.fetchDataMyGameWeek();
    picker.gameWeekID = 41;
    await picker.fetchDataMyGameWeek(2, 10);
    assert.deepEqual(requests, [{ url: `/premier-league/v1/${endpoint}`, params: { page: 2, limit: 10, game_week_id: 41 } }]);
  });

  test(`${file} rejects an entry from another round before confirmation or submission`, async () => {
    let confirmations = 0, writes = 0;
    const picker = component(`components/selfPick/${file}`, {
      api: { post: async () => { writes++; return { data: { ok: false } }; } },
      Swal: { fire: async options => { if (options.showCancelButton) confirmations++; return { isConfirmed: true }; } },
    });
    picker.gameWeekID = 41;
    picker.datas = [{ id: 101, week_id: 42 }];
    await picker.selectSelf(101, 'VIP', 'Other round');
    assert.equal(confirmations, 0);
    assert.equal(writes, 0);
  });

  test(`${file} keeps the existing confirmed selection payload for an entry in the correct round`, async () => {
    const requests = [];
    const picker = component(`components/selfPick/${file}`, {
      api: { post: async (url, body) => { requests.push({ url, body }); return { data: { ok: false } }; } },
      Swal: { fire: async () => ({ isConfirmed: true }) },
    });
    picker.matchID = '17';
    picker.gameWeekID = 41;
    picker.datas = [{ id: 101, week_id: 41 }];
    const mode = file === 'MyGameWeek.vue' ? 'VIP' : 'N';
    await picker.selectSelf(101, mode, 'My team');
    assert.deepEqual(requests, [{ url: '/premier-league/v1/self_match_sub-pick', body: { game_main_id: 101, type: mode, self_match_id: 17 } }]);
  });
}
