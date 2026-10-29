export const themeStorageKey = 'kickmun-theme';
const validTheme = value => value === 'light' || value === 'dark';

export function createThemePreference(storage, apply) {
  let current = 'dark';
  try { const saved = storage?.getItem(themeStorageKey); if (validTheme(saved)) current = saved; } catch { /* Private browsing can block storage. */ }
  const subscribers = new Set();
  apply(current);
  return {
    get value() { return current; },
    set(value, { persist = true } = {}) {
      if (!validTheme(value)) return false;
      current = value;
      if (persist) { try { storage?.setItem(themeStorageKey, value); } catch { /* Theme still works for this session. */ } }
      apply(value);
      subscribers.forEach(listener => listener(value));
      return true;
    },
    subscribe(listener) { subscribers.add(listener); return () => subscribers.delete(listener); },
  };
}

let preference;
export function getMemberTheme() {
  if (!preference) {
    let storage;
    try { storage = window.localStorage; } catch { /* Use session-only fallback. */ }
    preference = createThemePreference(storage, value => {
      document.documentElement.dataset.memberTheme = value;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'light' ? '#F4F6F8' : '#080808');
    });
  }
  return preference;
}

export function initializeMemberTheme() {
  const theme = getMemberTheme();
  const synchronize = event => {
    if (event.key === themeStorageKey || event.key === null) theme.set(validTheme(event.newValue) ? event.newValue : 'dark', { persist: false });
  };
  window.addEventListener('storage', synchronize);
  return () => window.removeEventListener('storage', synchronize);
}
