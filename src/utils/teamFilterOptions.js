const teamNameOrder = new Intl.Collator('th', { sensitivity: 'base' });

export function teamFilterOptions(teams) {
  return teams
    .map(team => ({ name: team.name, value: team.team_id }))
    .sort((left, right) => teamNameOrder.compare(left.name ?? '', right.name ?? ''));
}
