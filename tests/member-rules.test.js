import test from 'node:test';
import assert from 'node:assert/strict';
import { rulesValidation, rulesResponse } from '../src/lib/memberRules.js';
const rules = () => ({ title: 'กติกาใหม่', version: 1, sections: [{ heading: 'จัดทีม', body: 'ผู้เล่น 11 คน\nกัปตัน 1 คน' }], images: [{ url: 'https://images.example/rules.png', alt: 'ตารางคะแนน' }] });
test('published rule document preserves ordered text and images', () => {
  const document = rulesResponse({ data: { ok: true, data: rules() } });
  assert.equal(document.sections[0].body, 'ผู้เล่น 11 คน\nกัปตัน 1 คน');
  assert.equal(document.images[0].alt, 'ตารางคะแนน'); assert.equal(document.version, 1);
});
test('rules reader rejects unsafe URLs and incomplete payloads', () => {
  for (const url of ['javascript:alert(1)', '//example.com/image.png', 'https://user:password@example.com/image.png']) {
    const data = rules(); data.images[0].url = url; assert.throws(() => rulesResponse({ data: { ok: true, data } }));
  }
  assert.throws(() => rulesResponse({ data: { ok: true, data: {} } })); assert.throws(() => rulesResponse({ data: { ok: false } }));
});
test('rules may contain only images or only sections, but cannot be empty', () => {
  const data = rules(); data.sections = []; assert.equal(rulesValidation(data), '');
  data.images = []; assert.notEqual(rulesValidation(data), ''); data.sections = rules().sections; assert.equal(rulesValidation(data), '');
});
