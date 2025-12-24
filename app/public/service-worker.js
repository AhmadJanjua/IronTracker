const CACHE_NAME = "app-shell-4";
const PRE_CACHE = ["/", "/index.html", "/offline.html"];
const OFFLINE_URL = "/offline.html";

// install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRE_CACHE))
  );
  self.skipWaiting();
});

// activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // delete previous caches
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k !== CACHE_NAME)
        .map((k) => caches.delete(k))
    );

    await self.clients.claim();
  })());
});

// fetch handler
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // cache navigations
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      // try online loads -> update to latest 
      try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put("/", response.clone());
        return response;
      // if online fails load in root directory
      } catch {
        return (await caches.match("/")) || caches.match(OFFLINE_URL);
      }
    })());
    return;
  }

  // cache assets
  const is_get = request.method === "GET";
  const is_asset = url.pathname.startsWith("/assets/");
  const is_same_origin = url.origin === self.location.origin;
  
  if (is_same_origin && is_get && is_asset ) {
    event.respondWith((async () => {
      // try cache
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }

      // try online
      const response = await fetch(request);
      if (response && response.ok)  {
        cache.put(request, response.clone());
      }
      return response;
    })());
  }
});

