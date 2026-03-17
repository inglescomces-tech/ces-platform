// CES Platform Service Worker — forces fresh content
const VERSION = 'ces-v1773763139';
 
self.addEventListener('install', e => {
  self.skipWaiting();
});
 
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});
 
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Always fetch fresh for HTML and JS
  if(url.includes('ces-platform') || url.includes('github.io')){
    e.respondWith(
      fetch(e.request, {cache: 'no-store'})
        .catch(() => caches.match(e.request))
    );
  }
});
