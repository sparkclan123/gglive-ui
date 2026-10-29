// End this device's session independently of an expired token or failed network request.
export function clearMemberSession(storage, session, store) {
  for (const key of ['access_token', 'token', 'user_params', 'userinfo', 'ticket']) {
    try { storage.removeItem(key); } catch { /* Live state must still be cleared. */ }
  }
  try { session?.removeItem('member-gameweek'); } catch { /* Session storage can be blocked. */ }
  store.commit('auth/CLEAR_SESSION');
  store.commit('ticket/CLEAR_TICKET');
}

export async function logoutMember({api, storage, session, store, router}) {
  let token;
  try { token = storage.getItem('access_token'); } catch { /* Already unavailable. */ }
  clearMemberSession(storage, session, store);
  try {
    if (token) await api.post('/premier-league/v1/logout', {}, {
      headers: {Authorization: `Bearer ${token}`}, timeout: 3000,
    });
  } catch { /* Server revocation is best effort; local sign-out is complete. */ }
  finally { await router.replace({name: 'login'}); }
}
