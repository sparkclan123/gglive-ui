// A shared lifecycle prevents one sheet from unlocking another (including editor sheets).
const scrollLocks = new WeakMap();

export function lockPageScroll(doc = document) {
  let state = scrollLocks.get(doc);
  if (!state) {
    const win = doc.defaultView, body = doc.body;
    const properties = ['position', 'top', 'left', 'width', 'overflow', 'paddingRight'];
    state = { count: 0, x: win.scrollX, y: win.scrollY, styles: Object.fromEntries(properties.map(key => [key, body.style[key]])) };
    const scrollbar = Math.max(0, win.innerWidth - doc.documentElement.clientWidth);
    const padding = parseFloat(win.getComputedStyle(body).paddingRight) || 0;
    Object.assign(body.style, { position: 'fixed', top: `-${state.y}px`, left: `-${state.x}px`, width: '100%', overflow: 'hidden', paddingRight: `${padding + scrollbar}px` });
    // SweetAlert's iOS fix temporarily rewrites inline top. Keep our owned offset
    // in CSS until the last sheet closes, then restore the original page styles.
    body.style.setProperty('--member-scroll-top', `-${state.y}px`);
    body.setAttribute('data-member-scroll-lock', '');
    scrollLocks.set(doc, state);
  }
  state.count += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--state.count) return;
    doc.body.removeAttribute('data-member-scroll-lock');
    doc.body.style.removeProperty('--member-scroll-top');
    Object.assign(doc.body.style, state.styles);
    const behavior = doc.documentElement.style.scrollBehavior;
    doc.documentElement.style.scrollBehavior = 'auto';
    doc.defaultView.scrollTo({ left: state.x, top: state.y, behavior: 'instant' });
    doc.documentElement.style.scrollBehavior = behavior;
    scrollLocks.delete(doc);
  };
}

export function activateDialog(element) {
  const doc = element.ownerDocument, previousFocus = doc.activeElement;
  const unlock = lockPageScroll(doc);
  const controls = () => [...element.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')].filter(el => el.getClientRects().length);
  const trap = event => {
    if (event.key !== 'Tab') return;
    const items = controls(), first = items[0], last = items[items.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && (doc.activeElement === first || !element.contains(doc.activeElement))) {
      event.preventDefault(); last.focus({ preventScroll: true });
    } else if (!event.shiftKey && (doc.activeElement === last || !element.contains(doc.activeElement))) {
      event.preventDefault(); first.focus({ preventScroll: true });
    }
  };
  element.addEventListener('keydown', trap);
  // Every member sheet starts with a close button; never autofocus a text field.
  controls()[0]?.focus({ preventScroll: true });
  return () => {
    element.removeEventListener('keydown', trap);
    unlock();
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  };
}

const dialogs = new WeakMap();
export const memberDialog = {
  mounted(element, binding) {
    const media = binding.modifiers.mobile ? element.ownerDocument.defaultView.matchMedia('(max-width: 850px)') : null;
    const state = { open: binding.value !== false, release: null, media };
    state.sync = () => {
      const active = state.open && (!media || media.matches);
      if (active && !state.release) state.release = activateDialog(element);
      else if (!active && state.release) { state.release(); state.release = null; }
    };
    media?.addEventListener('change', state.sync);
    dialogs.set(element, state);
    state.sync();
  },
  updated(element, binding) {
    const state = dialogs.get(element);
    if (state) { state.open = binding.value !== false; state.sync(); }
  },
  beforeUnmount(element) {
    const state = dialogs.get(element);
    state?.media?.removeEventListener('change', state.sync);
    state?.release?.();
    dialogs.delete(element);
  },
};

export function viewportMetrics(layoutHeight, viewport, editing) {
  if (!viewport || Math.abs(viewport.scale - 1) > 0.01) return { height: layoutHeight, bottom: 0, keyboard: false };
  return {
    height: Math.round(viewport.height),
    bottom: Math.max(0, Math.round(layoutHeight - viewport.height - viewport.offsetTop)),
    keyboard: Boolean(editing && layoutHeight - viewport.height > 120),
  };
}

export function installMemberViewport(win = window, doc = document) {
  let frame = 0;
  const update = () => {
    frame = 0;
    const editing = doc.activeElement?.matches('input:not([type=checkbox]):not([type=radio]), textarea, [contenteditable=true]');
    const metrics = viewportMetrics(win.innerHeight, win.visualViewport, editing);
    doc.documentElement.style.setProperty('--member-viewport-height', `${metrics.height}px`);
    doc.documentElement.style.setProperty('--member-viewport-bottom', `${metrics.bottom}px`);
    doc.documentElement.classList.toggle('member-keyboard-open', metrics.keyboard);
  };
  const schedule = () => { if (!frame) frame = win.requestAnimationFrame(update); };
  const subscriptions = [[win, 'resize'], [win.visualViewport, 'resize'], [win.visualViewport, 'scroll'], [doc, 'focusin'], [doc, 'focusout']];
  subscriptions.forEach(([target, name]) => target?.addEventListener(name, schedule, { passive: true }));
  update();
  return () => {
    subscriptions.forEach(([target, name]) => target?.removeEventListener(name, schedule));
    win.cancelAnimationFrame(frame);
    doc.documentElement.style.removeProperty('--member-viewport-height');
    doc.documentElement.style.removeProperty('--member-viewport-bottom');
    doc.documentElement.classList.remove('member-keyboard-open');
  };
}
