/* ── Types ─────────────────────────────────────────── */

type CookieType = 'string' | 'boolean' | 'booleanTrue';

const COOKIE_KEYS: Record<string, CookieType> = {
  dark_coire_ui: 'string',
  dark_ccs: 'boolean',
  dark_cams: 'boolean',
  dark_caas: 'boolean',
  'connect-quicksupport': 'booleanTrue',
};

/* ── Helpers ──────────────────────────────────────── */

/** Extract the base URL (scheme + host) from a full URL string. */
function getBaseUrl(url: string): string {
  const u = new URL(url);
  return `${u.protocol}//${u.hostname}`;
}

/** Show a brief status message that auto-fades. */
function flash(msg: string, isError = false): void {
  const el = document.getElementById('status');
  if (!el) return;

  el.textContent = msg;
  el.style.color = isError ? '#ff4d6a' : '#7cff7c';
  clearTimeout(flash._timer);
  flash._timer = window.setTimeout(() => (el.textContent = ''), 2500);
}

/** Timer handle stored on the flash function for debouncing. */
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace flash {
  export let _timer: number | undefined;
}

/* ── Cookie CRUD via chrome.cookies API ──────────── */

async function getCookie(
  url: string,
  name: string,
): Promise<chrome.cookies.Cookie | null> {
  return chrome.cookies.get({ url, name });
}

async function setCookie(
  url: string,
  name: string,
  value: string,
): Promise<chrome.cookies.Cookie | null> {
  return chrome.cookies.set({
    url,
    name,
    value: String(value),
    path: '/',
  });
}

async function removeCookie(url: string, name: string): Promise<void> {
  await chrome.cookies.remove({ url, name });
}

/* ── Load current values into the popup ──────────── */

async function loadCookies(url: string): Promise<void> {
  for (const [name, type] of Object.entries(COOKIE_KEYS)) {
    const cookie = await getCookie(url, name);
    const el = document.getElementById(name);
    if (!el) continue;

    if (type === 'boolean' || type === 'booleanTrue') {
      (el as HTMLInputElement).checked = cookie
        ? cookie.value === 'true'
        : false;
    } else {
      (el as HTMLInputElement).value = cookie ? cookie.value : '';
    }
  }
}

/* ── Save values from the popup to cookies ───────── */

async function saveCookies(url: string): Promise<void> {
  for (const [name, type] of Object.entries(COOKIE_KEYS)) {
    const el = document.getElementById(name);
    if (!el) continue;

    if (type === 'string') {
      await setCookie(url, name, (el as HTMLInputElement).value);
    }
    if (type === 'boolean' && (el as HTMLInputElement).checked) {
      await setCookie(url, name, '');
    }
    if (type === 'booleanTrue' && (el as HTMLInputElement).checked) {
      await setCookie(url, name, 'true');
    }
  }
  flash('✓ Cookies saved');
}

/* ── Clear all managed cookies ───────────────────── */

async function clearCookies(url: string): Promise<void> {
  for (const name of Object.keys(COOKIE_KEYS)) {
    await removeCookie(url, name);
  }
  await loadCookies(url);
  flash('✓ Cookies cleared');
}

/* ── Init ─────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.url || tab.url.startsWith('chrome://')) {
    const siteEl = document.getElementById('current-site');
    if (siteEl) siteEl.textContent = 'N/A (chrome:// pages not supported)';

    const saveBtn = document.getElementById(
      'save-btn',
    ) as HTMLButtonElement | null;
    const clearBtn = document.getElementById(
      'clear-btn',
    ) as HTMLButtonElement | null;
    if (saveBtn) saveBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;
    return;
  }

  const url = getBaseUrl(tab.url);
  const siteEl = document.getElementById('current-site');
  if (siteEl) siteEl.textContent = url;

  await loadCookies(url);

  document
    .getElementById('save-btn')
    ?.addEventListener('click', () => saveCookies(url));
  document
    .getElementById('clear-btn')
    ?.addEventListener('click', () => clearCookies(url));
});
