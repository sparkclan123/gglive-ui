import test from 'node:test';
import assert from 'node:assert/strict';
import { lockPageScroll, viewportMetrics, activateDialog, memberDialog, installMemberViewport } from '../src/utils/memberMobile.js';

function documentFixture() {
  const calls = [];
  const doc = { body: { style: { position: '', top: '', left: '', width: '', overflow: 'auto', paddingRight: '3px' } }, documentElement: { style: { scrollBehavior: 'smooth' }, clientWidth: 390 } };
  const attrs = {};
  doc.body.setAttribute = (key, value) => attrs[key] = value;
  doc.body.getAttribute = key => attrs[key] ?? null;
  doc.body.removeAttribute = key => delete attrs[key];
  const vars = {};
  doc.body.style.setProperty = (key, value) => vars[key] = value;
  doc.body.style.getPropertyValue = key => vars[key] || '';
  doc.body.style.removeProperty = key => delete vars[key];
  doc.defaultView = { scrollX: 0, scrollY: 430, innerWidth: 390, getComputedStyle: () => ({ paddingRight: '3px' }), scrollTo: options => calls.push(options) };
  return { doc, calls };
}

test('closing nested sheets restores page position and preexisting styles only after the last sheet closes', () => {
  const { doc, calls } = documentFixture();
  const before = { ...doc.body.style };
  const closeMenu = lockPageScroll(doc), closeDialog = lockPageScroll(doc);
  assert.equal(doc.body.style.position, 'fixed');
  assert.equal(doc.body.style.top, '-430px');
  closeMenu(); closeMenu();
  assert.equal(doc.body.style.position, 'fixed');
  assert.equal(calls.length, 0);
  closeDialog();
  assert.deepEqual(doc.body.style, before);
  assert.deepEqual(calls, [{ left: 0, top: 430, behavior: 'instant' }]);
  assert.equal(doc.documentElement.style.scrollBehavior, 'smooth');
});

test('keyboard viewport accounts for viewport panning without changing pinch zoom', () => {
  assert.deepEqual(viewportMetrics(844, { height: 480, offsetTop: 40, scale: 1 }, true), { height: 480, bottom: 324, keyboard: true });
  assert.deepEqual(viewportMetrics(844, { height: 480, offsetTop: 40, scale: 2 }, true), { height: 844, bottom: 0, keyboard: false });
  assert.deepEqual(viewportMetrics(844, null, false), { height: 844, bottom: 0, keyboard: false });
  assert.equal(viewportMetrics(844, { height: 790, offsetTop: 0, scale: 1 }, true).keyboard, false);
});

test('dialog focuses a button without opening keyboard, traps tab and restores focus without scrolling', () => {
  const { doc } = documentFixture();
  const focused = [];
  const control = name => ({ disabled: false, getClientRects: () => [1], focus: opts => { focused.push([name, opts]); doc.activeElement = controls[name]; } });
  const controls = { opener: control('opener'), close: control('close'), last: control('last') };
  controls.opener.isConnected = true;
  doc.activeElement = controls.opener;
  const handlers = {};
  const el = { ownerDocument: doc, querySelectorAll: () => [controls.close, controls.last], contains: item => item !== controls.opener, addEventListener: (name, fn) => handlers[name] = fn, removeEventListener: name => delete handlers[name] };
  const close = activateDialog(el);
  assert.equal(doc.activeElement, controls.close);
  doc.activeElement = controls.last;
  let prevented = false;
  handlers.keydown({ key: 'Tab', shiftKey: false, preventDefault: () => prevented = true });
  assert.equal(prevented, true); assert.equal(doc.activeElement, controls.close);
  close();
  assert.deepEqual(focused.at(-1), ['opener', { preventScroll: true }]);
  assert.equal(handlers.keydown, undefined);
  assert.equal(doc.body.style.position, '');
});

test('a nested Safari alert cannot discard the owned scroll offset', () => {
  const { doc, calls } = documentFixture();
  const release = lockPageScroll(doc);
  // SweetAlert iOSfix writes top=0, then clears it on close. CSS uses our owned offset.
  doc.body.style.top = '0px';
  assert.equal(doc.body.getAttribute('data-member-scroll-lock'), '');
  assert.equal(doc.body.style.getPropertyValue('--member-scroll-top'), '-430px');
  doc.body.style.top = '';
  assert.equal(doc.body.style.getPropertyValue('--member-scroll-top'), '-430px');
  release();
  assert.equal(doc.body.getAttribute('data-member-scroll-lock'), null);
  assert.equal(doc.body.style.getPropertyValue('--member-scroll-top'), '');
  assert.equal(calls[0].top, 430);
});


test('desktop picker stays scrollable and releases its mobile lock when crossing the breakpoint', () => {
  const { doc } = documentFixture();
  let onChange;
  const media = { matches: false, addEventListener: (_, fn) => onChange = fn, removeEventListener: () => onChange = null };
  doc.defaultView.matchMedia = () => media;
  const element = { ownerDocument: doc, querySelectorAll: () => [], addEventListener() {}, removeEventListener() {} };
  memberDialog.mounted(element, { value: true, modifiers: { mobile: true } });
  assert.equal(doc.body.style.position, '');
  media.matches = true; onChange();
  assert.equal(doc.body.style.position, 'fixed');
  media.matches = false; onChange();
  assert.equal(doc.body.style.position, '');
  memberDialog.beforeUnmount(element);
  assert.equal(onChange, null);
});

test('visual viewport updates sheet bounds and tears down keyboard listeners and pending frames', () => {
  const events = new Map(), styles = {}, classes = new Set();
  const target = name => ({
    addEventListener: (event, fn) => events.set(`${name}:${event}`, fn),
    removeEventListener: event => events.delete(`${name}:${event}`),
  });
  let frame, canceled;
  const viewport = { ...target('viewport'), height: 844, offsetTop: 0, scale: 1 };
  const win = { ...target('window'), innerHeight: 844, visualViewport: viewport, requestAnimationFrame: fn => { frame = fn; return 7; }, cancelAnimationFrame: id => canceled = id };
  const doc = { ...target('document'), activeElement: { matches: () => true }, documentElement: { style: { setProperty: (key, value) => styles[key] = value, removeProperty: key => delete styles[key] }, classList: { toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name), remove: name => classes.delete(name) } } };
  const dispose = installMemberViewport(win, doc);
  viewport.height = 480;
  events.get('viewport:resize')(); frame();
  assert.equal(styles['--member-viewport-height'], '480px');
  assert.equal(styles['--member-viewport-bottom'], '364px');
  assert.equal(classes.has('member-keyboard-open'), true);
  events.get('document:focusout')();
  dispose();
  assert.equal(canceled, 7);
  assert.equal(events.size, 0);
  assert.deepEqual(styles, {});
  assert.equal(classes.size, 0);
});
