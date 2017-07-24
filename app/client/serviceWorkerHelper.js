const {matchBestRoute} = require("../isomorphic/match-best-route");
const urlLib = require("url");

global.initializeQServiceWorker = function(self, params) {

  self.addEventListener("install", function(event){
    console.log("[ServiceWorker] Installing Service Worker");
    event.waitUntil(
      caches.open('pwa-static')
        .then(function(cache) {
          return cache.addAll(params.assets.map((asset) => new Request(asset, {mode: 'cors'})));
        }).then(() => console.log("[ServiceWorker] Downloaded all assets"))
    );
  });

  self.addEventListener("fetch", function(event) {
    const request = event.request;
    const url = urlLib.parse(request.url || "/");

    console.log("[ServiceWorker] Trying to match Routes", url.pathname);
    const match = matchBestRoute(url.pathname, params.routes)
    if(match) {
      console.log("[ServiceWorker] Rendering Shell");
      event.respondWith(caches.match("/shell.html").then((r) => r || fetch(request)));
    } else {
      event.respondWith(caches.match(request).then((r) => r || fetch(request)));
    }
  })
};
