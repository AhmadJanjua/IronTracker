const CACHE_NAME = "app-shell-1";
const OFFLINE_URL = "/offline.html";

// install service worker
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll([OFFLINE_URL]);
			})
	);

	self.skipWaiting();
});

// use service worker
self.addEventListener("activate", (event) => {
	event.waitUntil(
		self.clients.claim()
	);
});

// offline fetch request
self.addEventListener("fetch", (event) => {
	const request = event.request;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.catch(() => {
					return caches.match(OFFLINE_URL);
				})
		);
	}
});
