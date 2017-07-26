const workboxVersion = '1.1.0';

import {matchBestRoute} from 'quintype-toddy-libs/isomorphic/match-best-route';

function qDebug() {
  if(process.env.NODE_ENV !== 'production') {
    console.debug.apply(console, arguments);
  }
}

global.initializeQServiceWorker = function(self, params) {
  importScripts(`https://unpkg.com/workbox-sw@${workboxVersion}/build/importScripts/workbox-sw.${process.env.NODE_ENV == 'production' ? 'prod' : 'dev'}.v${workboxVersion}.js`);

  const routeMatcher = function({event, url}) {
    if(event.request.mode !== 'navigate') return false;
    if(matchBestRoute(url.pathname, params.routes)) {
      qDebug(`Rendering the shell for navigation to ${url.pathname}`);
      return true;
    } else {
      qDebug(`Not rendering the shell for navigation to ${url.pathname}`);
      return false;
    }
  };
  const shellHandler = () => caches.match('/shell.html').then((r) => r || fetch(request));

  const workbox = new WorkboxSW({clientsClaim: true});
  workbox.precache(params.assets);
  workbox.router.registerRoute(routeMatcher, shellHandler);
  return workbox;
};
