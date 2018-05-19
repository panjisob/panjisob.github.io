var cacheName = 'Barbershop-v1';
var filesToCache = [
    '.',
    'index.html',
    'assets/css/style.css',
    'assets/css/bootstrap-theme.css',
    'assets/css/bootstrap-theme.css.map',
    'assets/css/bootstrap-theme.min.css',
    'assets/css/bootstrap-theme.min.css.map',
    'assets/css/bootstrap.css',
    'assets/css/bootstrap.css.map',
    'assets/css/bootstrap.min.css',
    'assets/css/bootstrap.min.css.map',
    'assets/fonts/glyphicons-halflings-regular.eot',
    'assets/fonts/glyphicons-halflings-regular.svg',
    'assets/fonts/glyphicons-halflings-regular.ttf',
    'assets/fonts/glyphicons-halflings-regular.woff',
    'assets/fonts/glyphicons-halflings-regular.woff2',
    'assets/js/bootstrap.js',
    'assets/js/bootstrap.min.js',
    'assets/js/jquery.js',
    'assets/js/npm.js',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/home.jpg',
    'images/home1.jpg',
    'images/hom.jpg'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
