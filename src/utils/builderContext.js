const API_PREFIX = '/premier-league/v1';

function contextID(value) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error('Invalid builder context');
  return id;
}

/** Publish a complete round only when all of its requests still belong to the current route. */
export function createBuilderLoader({ request, reset, apply }) {
  let revision = 0;
  return {
    dispose() { revision += 1; },
    async load(route, mode = 'vip') {
      const current = ++revision;
      reset();
      try {
        const seasonID = contextID(route.seasonID);
        const gameWeekID = contextID(route.gameWeekID);
        const params = { seasonID, gameWeekID };
        const [pool, ownership] = await Promise.all([
          request(`${API_PREFIX}/game-week-player`, params),
          request(`${API_PREFIX}/game-week-player-percent${mode === 'normal' ? '-n' : ''}`, params),
        ]);
        if (current !== revision) return null;
        if (!pool.ok || !ownership.ok) throw new Error('Unable to load builder context');
        if (Number(pool.gameWeek?.id) !== gameWeekID || Number(pool.gameWeek?.season_id) !== seasonID) {
          throw new Error('Gameweek and season context do not match');
        }
        if (!Array.isArray(pool.players) || pool.players.some(player =>
          (player.game_week_id != null && Number(player.game_week_id) !== gameWeekID) ||
          (player.season_id != null && Number(player.season_id) !== seasonID))) {
          throw new Error('Player snapshot context does not match');
        }
        let teams = pool.teams;
        if (!Array.isArray(teams)) {
          const scoped = await request(`${API_PREFIX}/teams`, { game_week_id: gameWeekID });
          if (!scoped.ok || !Array.isArray(scoped.teams)) throw new Error('Unable to load round clubs');
          teams = scoped.teams;
        }
        if (current !== revision) return null;
        const result = { gameWeek: pool.gameWeek, players: pool.players, teams, ownership: ownership.players || {} };
        apply(result);
        return result;
      } catch (error) {
        if (current !== revision) return null;
        throw error;
      }
    },
  };
}

/** Keep the existing Pudee shirt and keeper assets, including the two PNG empty slots. */
export function originalShirtImage(player, position = player?.position) {
  const base = 'https://pudee.sgp1.digitaloceanspaces.com/shirt_';
  const suffix = position === 'G' ? '_1-66' : '-66';
  if (!player?.id) return `${base}0${suffix}.png`;
  const code = String(player.team_code || '').replace('t', '');
  return `${base}${code}${suffix}.webp`;
}

/** Resolve copy results against this round's snapshot; never reuse another round's snapshot IDs. */
export function resolveCopiedPlayers(copied, pool, gameWeekID) {
  if (!Array.isArray(copied) || !copied.length || !Array.isArray(pool)) throw new Error('Invalid copy context');
  const seen = new Set();
  return copied.map(player => {
    if (player.game_week_id != null && Number(player.game_week_id) !== Number(gameWeekID)) {
      throw new Error('Copy context does not match selected gameweek');
    }
    const current = pool.find(candidate => Number(candidate.player_id) === Number(player.player_id));
    if (!current || seen.has(current.id) ||
      (player.season_id != null && Number(player.season_id) !== Number(current.season_id))) {
      throw new Error('Copied player context is unavailable');
    }
    seen.add(current.id);
    return current;
  });
}
