// Offline support: app files are cached; news data is fetched fresh and falls back to the last copy.
const SHELL = 'pulse-shell-v6';
const DATA = 'pulse-data';
const FILES = ['./', 'index.html', 'css/app.css', 'js/app.js', 'js/art.js', 'manifest.webmanifest', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('pulse-shell') && k !== SHELL).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // News data and app files: network first so updates show right away, cache as fallback.
  if (url.origin === location.origin) {
    const bucket = url.pathname.includes('/data/') ? DATA : SHELL;
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(bucket).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
    return;
  }

  // Fonts: cache first.
  if (/fonts\.(googleapis|gstatic)\.com|fontshare\.com/.test(url.host)) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(SHELL).then(c => c.put(e.request, copy));
      return res;
    })));
  }
});
