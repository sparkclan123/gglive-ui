import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Browser boundaries only: execute the real component click handler.
function page({ modern = 'absent', legacy = true } = {}) {
  let clipboard = '', selected = null;
  const dialogs = [], children = [];
  const button = { focus() { document.activeElement = button; } };
  const document = {
    activeElement: button,
    body: { appendChild(field) { children.push(field); } },
    createElement(tag) {
      assert.equal(tag, 'textarea');
      return {
        value: '', style: {}, setAttribute() {},
        focus() { document.activeElement = this; },
        select() { selected = this; }, setSelectionRange() {},
        remove() { children.splice(children.indexOf(this), 1); },
      };
    },
    execCommand(command) {
      assert.equal(command, 'copy');
      assert.ok(children.includes(selected), 'only a selected, attached field can be copied');
      if (legacy === 'throws') throw new Error('Copy blocked');
      if (legacy) clipboard = selected.value;
      return legacy;
    },
  };
  const navigator = modern === 'absent' ? {} : { clipboard: { async writeText(value) {
    if (modern === 'denied') throw new Error('Permission denied');
    clipboard = value;
  } } };
  const source = readFileSync(new URL('../src/components/list/SelfMatch.vue', import.meta.url), 'utf8')
    .match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import .*;\s*$/gm, '')
    .replace('export default', 'return');
  const component = new Function('navigator', 'document', 'Swal', source)(navigator, document, {
    fire: async options => { dialogs.push(options); return {}; },
  });
  return {
    copy: component.methods.copyToClipboard,
    get clipboard() { return clipboard; }, dialogs, children, document, button,
  };
}

test('competition code copies on HTTP without navigator.clipboard and restores focus', async () => {
  const view = page();
  await view.copy('0007-FRIENDS');
  assert.equal(view.clipboard, '0007-FRIENDS');
  assert.equal(view.dialogs.at(-1).icon, 'success');
  assert.equal(view.children.length, 0);
  assert.equal(view.document.activeElement, view.button);
});

test('competition copy uses the available modern clipboard without a temporary field', async () => {
  const view = page({ modern: 'allowed' });
  await view.copy('0007-FRIENDS');
  assert.equal(view.clipboard, '0007-FRIENDS');
  assert.equal(view.dialogs.at(-1).icon, 'success');
  assert.equal(view.children.length, 0);
});

test('denied modern clipboard falls back to copying the exact competition code', async () => {
  const view = page({ modern: 'denied' });
  await view.copy('0007-FRIENDS');
  assert.equal(view.clipboard, '0007-FRIENDS');
  assert.equal(view.dialogs.at(-1).icon, 'success');
});

for (const legacy of [false, 'throws']) {
  test(`blocked clipboard (${legacy}) offers the code for manual copy without claiming success`, async () => {
    const view = page({ modern: 'denied', legacy });
    await view.copy('0007-FRIENDS');
    assert.equal(view.clipboard, '');
    assert.equal(view.dialogs.some(dialog => dialog.icon === 'success'), false);
    assert.equal(view.dialogs.at(-1).input, 'text');
    assert.equal(view.dialogs.at(-1).inputValue, '0007-FRIENDS');
    assert.ok(view.dialogs.at(-1).inputAttributes.readonly);
    assert.equal(view.children.length, 0);
    assert.equal(view.document.activeElement, view.button);
  });
}

test('missing competition codes are reported instead of copying undefined or null', async () => {
  for (const code of [undefined, null, '']) {
    const view = page({ modern: 'allowed' });
    await view.copy(code);
    assert.equal(view.clipboard, '');
    assert.equal(view.dialogs.at(-1).icon, 'error');
  }
});
