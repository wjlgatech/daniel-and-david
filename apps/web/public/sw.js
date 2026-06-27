/* Daniel & David — Builder Loop service worker.
   Cache-first app shell so the app installs and works fully offline. No tracking, no network
   calls for user data — a family's loop notes live only in localStorage on their device. */
const CACHE = "dd-builder-loop-v1";
const SHELL = [
  "./app.html",
  "./manifest.webmanifest",
  "./icons/app-icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then((hit) =>
      hit ||
      fetch(req)
        .then((res) => {
          // Runtime-cache same-origin GETs so the app shell stays fresh and offline-ready.
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./app.html"))
    )
  );
});
