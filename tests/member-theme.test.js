import test from 'node:test';
import assert from 'node:assert/strict';
import { createThemePreference } from '../src/utils/memberTheme.js';

function fixture(saved) {
  const values = new Map(saved === undefined ? [] : [['kickmun-theme', saved]]);
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const applied = [];
  return { storage, applied, values, preference: createThemePreference(storage, value => applied.push(value)) };
}
test('saved light theme survives a new session and default stays dark', () => {
  const f = fixture(); assert.equal(f.preference.value, 'dark');
  f.preference.set('light');
  assert.equal(f.values.get('kickmun-theme'), 'light');
  assert.equal(createThemePreference(f.storage, () => {}).value, 'light');
  assert.deepEqual(f.applied, ['dark', 'light']);
});
test('invalid preferences are ignored and blocked browser storage does not break theme switching', () => {
  const f = fixture('bad'); assert.equal(f.preference.value, 'dark');
  assert.equal(f.preference.set('system'), false); assert.equal(f.preference.value, 'dark');
  const applied = [];
  const pref = createThemePreference({ getItem(){throw Error('blocked')}, setItem(){throw Error('blocked')} }, value => applied.push(value));
  assert.equal(pref.set('light'), true); assert.equal(pref.value, 'light'); assert.deepEqual(applied, ['dark', 'light']);
});
test('theme changes notify UI and external updates do not rewrite browser storage', () => {
  const f = fixture('dark'); let observed;
  const unsubscribe = f.preference.subscribe(value => observed = value);
  f.preference.set('light', { persist: false });
  assert.equal(observed, 'light'); assert.equal(f.values.get('kickmun-theme'), 'dark');
  unsubscribe(); f.preference.set('dark'); assert.equal(observed, 'light');
});
