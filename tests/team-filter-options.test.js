import assert from 'node:assert/strict';
import { createServer as createHttpServer } from 'node:http';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: { server: createHttpServer() } },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});
after(() => server.close());

for (const path of [
  'fantasy/PlayerSelection.vue',
  'fantasyBigmatch/PlayerSelection.vue',
  'object/model_edit_selectplayer.vue',
  'object/model_edit_selectplayer_new.vue',
]) {
  test(`${path} alphabetizes club options and keeps the selected club`, async () => {
    const { default: component } = await server.ssrLoadModule(`/src/components/${path}`);
    const teams = Object.freeze([
      { name: 'Wolverhampton', team_id: 9 },
      { name: 'arsenal', team_id: 3 },
      { name: 'Chelsea', team_id: 12 },
    ]);
    const vm = { ...component.data.call({ position: 'all' }), getTeams: teams, selectedTeam: 12 };
    component.methods.updateTeamOptions.call(vm);

    assert.deepEqual(vm.options.flatMap(group => group.options), [
      { name: 'ทั้งหมด', value: 'view' },
      { name: 'arsenal', value: 3 },
      { name: 'Chelsea', value: 12 },
      { name: 'Wolverhampton', value: 9 },
    ]);
    assert.equal(vm.selectedTeam, 12);
  });
}
