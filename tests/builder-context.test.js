import test from 'node:test';
import assert from 'node:assert/strict';
const context = await import('../src/utils/builderContext.js').catch(() => ({}));
const week = (id, season = 9) => ({ ok: true, gameWeek: { id, season_id: season, status: 'active' }, players: [{ id: id * 100, player_id: 10, game_week_id: id, season_id: season, position: 'G', team_code: 't3' }], teams: [{ team_id: id, name: `Club ${id}`, is_open: false }] });
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };

test('a newer route clears the old roster and prevents late responses restoring the previous week', async () => {
  assert.equal(typeof context.createBuilderLoader, 'function');
  const first = deferred();
  const events = [];
  const loader = context.createBuilderLoader({
    request: (path, params) => path.endsWith('game-week-player') ? (params.gameWeekID === 1 ? first.promise : Promise.resolve(week(2))) : Promise.resolve({ ok: true, players: { 10: 25 } }),
    reset: () => events.push('reset'), apply: value => events.push(value),
  });
  const oldLoad = loader.load({ seasonID: '9', gameWeekID: '1' });
  const newLoad = loader.load({ seasonID: '9', gameWeekID: '2' });
  assert.deepEqual(events, ['reset', 'reset']);
  await newLoad;
  first.resolve(week(1));
  await oldLoad;
  assert.equal(events.length, 3);
  assert.equal(events[2].gameWeek.id, 2);
  assert.equal(events[2].teams[0].is_open, false);
  assert.deepEqual(events[2].ownership, { 10: 25 });
});

test('wrong-season data and foreign snapshot players fail without applying any pool', async () => {
  assert.equal(typeof context.createBuilderLoader, 'function');
  for (const payload of [week(1, 10), { ...week(1), players: [{ id: 7, game_week_id: 2, season_id: 9 }] }]) {
    const applied = [];
    const loader = context.createBuilderLoader({ request: async path => path.endsWith('game-week-player') ? payload : { ok: true, players: {} }, reset() {}, apply: value => applied.push(value) });
    await assert.rejects(loader.load({ seasonID: 9, gameWeekID: 1 }), /context/i);
    assert.deepEqual(applied, []);
  }
});

test('missing snapshot clubs use a week-scoped lookup and invalid route ids never request a catalog', async () => {
  assert.equal(typeof context.createBuilderLoader, 'function');
  const requested = [];
  const payload = week(4); delete payload.teams;
  let applied;
  const loader = context.createBuilderLoader({ request: async (path, params) => {
    requested.push([path, params]);
    if (path.endsWith('game-week-player')) return payload;
    if (path.endsWith('/teams')) return { ok: true, teams: [{ team_id: 4 }] };
    return { ok: true, players: {} };
  }, reset() {}, apply: value => { applied = value; } });
  await loader.load({ seasonID: 9, gameWeekID: 4 }, 'normal');
  assert.deepEqual(requested.find(([path]) => path.endsWith('/teams'))[1], { game_week_id: 4 });
  assert.equal(requested[1][0], '/premier-league/v1/game-week-player-percent-n');
  assert.equal(applied.teams[0].team_id, 4);
  await assert.rejects(loader.load({ seasonID: 9, gameWeekID: '4bad' }), /context/i);
  assert.equal(requested.length, 3);
});

test('failed ownership loads do not publish a partial round and disposal ignores pending results', async () => {
  assert.equal(typeof context.createBuilderLoader, 'function');
  const applied = [];
  const failed = context.createBuilderLoader({ request: async path => path.endsWith('game-week-player') ? week(1) : Promise.reject(new Error('offline')), reset() {}, apply: value => applied.push(value) });
  await assert.rejects(failed.load({ seasonID: 9, gameWeekID: 1 }), /offline/);
  const pending = deferred();
  const loader = context.createBuilderLoader({ request: async path => path.endsWith('game-week-player') ? pending.promise : { ok: true, players: {} }, reset() {}, apply: value => applied.push(value) });
  const load = loader.load({ seasonID: 9, gameWeekID: 1 });
  loader.dispose(); pending.resolve(week(1)); await load;
  assert.deepEqual(applied, []);
});

test('original club shirts, goalkeeper shirts and both empty-slot images retain their CDN paths', () => {
  assert.equal(typeof context.originalShirtImage, 'function');
  assert.equal(context.originalShirtImage({ id: 5, team_code: 't3', position: 'D' }), 'https://pudee.sgp1.digitaloceanspaces.com/shirt_3-66.webp');
  assert.equal(context.originalShirtImage({ id: 5, team_code: 't3', position: 'G' }), 'https://pudee.sgp1.digitaloceanspaces.com/shirt_3_1-66.webp');
  assert.equal(context.originalShirtImage({ id: null }, 'G'), 'https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png');
  assert.equal(context.originalShirtImage({ id: null }, 'D'), 'https://pudee.sgp1.digitaloceanspaces.com/shirt_0-66.png');
});

test('copying only accepts snapshots from the selected week and resets identity to the current pool', () => {
  assert.equal(typeof context.resolveCopiedPlayers, 'function');
  const pool = week(2).players;
  assert.deepEqual(context.resolveCopiedPlayers([{ player_id: 10, game_week_id: 2 }], pool, 2), pool);
  assert.throws(() => context.resolveCopiedPlayers([{ player_id: 10, game_week_id: 1 }], pool, 2), /context/i);
  assert.throws(() => context.resolveCopiedPlayers([{ player_id: 11, game_week_id: 2 }], pool, 2), /context/i);
});

test('copying rejects an empty response, duplicate players or wrong season without replacing the roster', () => {
  const pool = week(2).players;
  assert.throws(() => context.resolveCopiedPlayers([], pool, 2), /context/i);
  assert.throws(() => context.resolveCopiedPlayers([{ player_id: 10, game_week_id: 2, season_id: 8 }], pool, 2), /context/i);
  assert.throws(() => context.resolveCopiedPlayers([{ player_id: 10 }, { player_id: 10 }], pool, 2), /context/i);
});
