export function gameweekState(week, now = Date.now()) {
  if (!week) return 'closed';
  if (week.status === 'completed') return 'completed';
  const time = new Date(now).getTime();
  const start = new Date(week.start_date).getTime();
  const end = new Date(week.end_date).getTime();
  if (week.status !== 'active' || !Number.isFinite(time) || !Number.isFinite(start) || !Number.isFinite(end) || time >= end) return 'closed';
  return time < start ? 'scheduled' : 'open';
}
export function pitchDestination(week, mode) {
  const id = Number(week?.id), season = Number(week?.season_id);
  if (!Number.isSafeInteger(id) || id <= 0 || !Number.isSafeInteger(season) || season <= 0) return null;
  return { name: mode === 'vip' ? 'pitch' : 'pitch-n', params: { seasonID: season, gameWeekID: id } };
}
export function preferredGameweek(weeks, requested, now = Date.now()) {
  return weeks.find(w => Number(w.id) === Number(requested)) || weeks.find(w => gameweekState(w, now) === 'open') || weeks.find(w => w.status === 'active') || [...weeks].sort((a,b) => b.id-a.id)[0] || null;
}
export function rankingRows(rows, page = 1, limit = 100) {
  const offset = (Math.max(1, Number(page) || 1) - 1) * Math.max(1, Number(limit) || 100);
  return (rows || []).map((row, index) => ({ ...row, position: offset + index + 1 }));
}
export function isEntryEditable(entry, weeks) {
  // Keep the existing active-round button policy. The existing edit endpoints
  // remain the authority for timing and per-user edit permission.
  return weeks.some(w => Number(w.id) === Number(entry.week_id) && w.status === 'active');
}
export function dateLabel(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('th-TH', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Bangkok'}).format(date);
}
