import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function loadPage(name, options = {}) {
  const source = readFileSync(new URL(`../src/pages/${name}.vue`, import.meta.url), 'utf8')
    .match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import .*;?\s*$/gm, '')
    .replace('export default', 'return');
  const saved = { ...options.saved };
  const notifications = [];
  const routes = [];
  const location = { href: '', search: options.search || '' };
  const timers = [];
  const clearedTimers = [];
  const storage = {
    getItem: key => saved[key] ?? null,
    setItem: (key, value) => { saved[key] = value; },
    removeItem: key => { delete saved[key]; }
  };
  const component = new Function('mapActions', 'api', 'apiMine', 'Swal', 'localStorage', 'window', 'setInterval', 'clearInterval', 'solveRegistrationProof', source)(
    () => ({}), options.api || {}, {}, options.Swal || { fire: async () => ({ isConfirmed: true }) }, storage, { location },
    callback => { timers.push(callback); return timers.length; }, id => clearedTimers.push(id), options.solveProof || (async () => ({ challenge_id: 'proof-id', nonce: '42' }))
  );
  const vm = {
    ...component.data(), ...component.methods,
    addNotification: message => notifications.push(message),
    updateLoading() {},
    $router: { push: path => routes.push(path) }
  };
  return { component, vm, saved, notifications, routes, location, timers, clearedTimers };
}

test('login ignores a second submit while preserving the endpoint and application key', async () => {
  const requests = [];
  let finish;
  const page = loadPage('login', { api: { post: (url, body) => {
    requests.push({ url, body });
    return new Promise(resolve => { finish = resolve; });
  } } });
  page.vm.username = '0800000000';
  page.vm.password = 'test-password';
  const pending = page.vm.loginform();
  const duplicate = page.vm.loginform();
  assert.equal(requests.length, 1);
  assert.deepEqual(requests[0], { url: '/premier-league/v1/login', body: {
    username: '0800000000', password: 'test-password', app_key: 'pudee'
  } });
  finish({ data: { tokenString: 'test-token' } });
  await Promise.all([pending, duplicate]);
  assert.equal(page.saved.access_token, 'test-token');
  assert.equal(page.location.href, '/season-select');
  assert.equal(page.vm.loading, false);
});

test('login reports a network failure without leaving loading active', async () => {
  const page = loadPage('login', { api: { post: async () => { throw new Error('offline'); } } });
  page.vm.username = '0800000000';
  page.vm.password = 'test-password';
  await page.vm.loginform();
  assert.equal(page.vm.loading, false);
  assert.equal(page.notifications.at(-1).type, 'error');
  assert.ok(page.notifications.at(-1).message);
});

for (const [method, endpoint] of [
  ['loginWithGoogle', 'https://api-service.pudee-club.com/api/premier-league/auth/login'],
  ['loginWithLine', 'https://api-service.pudee-club.com/api/premier-league/auth/line/login']
]) {
  test(`${method} preserves the OAuth destination and guards an active sign-in`, () => {
    const page = loadPage('login');
    page.vm.loading = true;
    page.vm[method]();
    assert.equal(page.location.href, '');
    page.vm.loading = false;
    page.vm[method]();
    assert.equal(page.location.href, endpoint);
    assert.equal(page.vm.loading, true);
  });
}

test('UUID sign-in preserves its payload, token persistence, and destination', async () => {
  const requests = [];
  const page = loadPage('login', { api: { post: async (url, body) => {
    requests.push({ url, body });
    return { data: { tokenString: 'test-callback-token' } };
  } } });
  await page.vm.loginuuid('test-uuid', 'Test member');
  assert.deepEqual(requests, [{ url: '/premier-league/v1/login-uuid', body: {
    uuid: 'test-uuid', username: 'Test member', app_key: 'pudee'
  } }]);
  assert.equal(page.saved.access_token, 'test-callback-token');
  assert.equal(page.location.href, '/season-select');
  assert.equal(page.vm.loading, false);
});

for (const name of ['login', 'register']) {
  test(`${name} retains saved OAuth callback login`, () => {
    const page = loadPage(name, { saved: { user_params: JSON.stringify({ access_token: 'test-callback-token' }) } });
    page.component.mounted.call(page.vm);
    assert.equal(page.saved.access_token, 'test-callback-token');
    assert.equal(page.location.href, '/lobby');
  });
  for (const callback of [undefined, 'broken-json']) {
    test(`${name} opens safely with ${callback ? 'invalid' : 'missing'} saved callback data`, () => {
      const page = loadPage(name, { saved: { user_params: callback }, search: '?ref=123' });
      page.component.mounted.call(page.vm);
      assert.equal(page.vm.loading, false);
      if (name === 'register') assert.equal(page.vm.referral, 123);
    });
  }
}


function fillRegistration(page) {
  Object.assign(page.vm, { phonenum: '0801234567', name: 'สมาชิก', password: 'test-password', confirm_password: 'test-password', referral: 123 });
}

test('registration submits one proof-protected request without OTP and returns to login', async () => {
  let confirm; let confirmations = 0; const requests = [];
  const page = loadPage('register', {
    Swal: { fire: () => { confirmations++; return new Promise(resolve => { confirm = resolve; }); } },
    api: { post: async (url, body) => { requests.push({ url, body }); return { data: { ok: true } }; } }
  });
  fillRegistration(page);
  const pending = page.vm.loginform(); const duplicate = page.vm.loginform();
  assert.equal(confirmations, 1); confirm({ isConfirmed: true });
  await Promise.all([pending, duplicate]);
  assert.deepEqual(requests, [{ url: '/premier-league/auth/register', body: { phone_number: '0801234567', password: 'test-password', name: 'สมาชิก', ref: 123, challenge_id: 'proof-id', nonce: '42' } }]);
  assert.deepEqual(page.routes, ['/login']); assert.equal(page.vm.loading, false);
});

test('registration validates mobile, Unicode names, and the bcrypt byte limit before proof', async () => {
  for (const change of [{ phonenum: 'abcdefghij' }, { name: ' ' }, { name: 'ก'.repeat(51) }, { password: '1234' }, { password: 'ก'.repeat(25) }]) {
    let proofs = 0; const page = loadPage('register', { solveProof: async () => { proofs++; } });
    fillRegistration(page); Object.assign(page.vm, change); await page.vm.loginform();
    assert.equal(proofs, 0); assert.equal(page.vm.loading, false);
  }
});

test('failed bot verification never posts registration and permits retry', async () => {
  let posts = 0; const page = loadPage('register', { solveProof: async () => { throw new Error('verification failed'); }, api: { post: async () => { posts++; } } });
  fillRegistration(page); await page.vm.loginform();
  assert.equal(posts, 0); assert.equal(page.vm.loading, false); assert.equal(page.vm.verifying, false);
});

test('unmount cancels proof work', () => {
  const page = loadPage('register'); let cancelled = false;
  page.vm.proofController = { abort: () => { cancelled = true; } };
  page.component.beforeUnmount.call(page.vm); assert.equal(cancelled, true);
});

test('leaving registration during confirmation cannot create an account later', async () => {
  let confirm; let proofs = 0; let posts = 0;
  const page = loadPage('register', {
    Swal: { fire: () => new Promise(resolve => { confirm = resolve; }), close() {} },
    solveProof: async () => { proofs++; return { challenge_id: 'proof', nonce: '0' }; },
    api: { post: async () => { posts++; return { data: { ok: true } }; } }
  });
  fillRegistration(page); const pending = page.vm.loginform();
  page.component.beforeUnmount.call(page.vm); confirm({ isConfirmed: true }); await pending;
  assert.equal(proofs, 0); assert.equal(posts, 0);
});
