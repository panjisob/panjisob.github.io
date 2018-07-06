var cacheName = 'Barbershop-v1';
var filesToCache = [
    '.',
    'index.php',
    'index.html',
    'produk.html',
    'css/bootstrap.css',
    'css/bootstrap.min.css',
    'css/mdb.css',
    'css/mdb.min.css',
    'css/style.css',
    'css/style.min.css',
    'model.html',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    //'https://maps.googleapis.com/maps/api/js?key=AIzaSyAiwtjlLUES51ioTbDvTh07JRLmpwWtyYM&callback=initMap',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/5216014_41a09f51-ca90-4500-8d86-a28a02cb49d9.jpg',
    'images/132631072209210.jpg',
    'images/barbershop.jpg',
    'images/barberspomade.JPG',
    'images/Classic_Barbershop_Beard_Oil_2_FL_OZ_3v_Pure_ONE_Beauty_1024x1024.jpg',
    'images/Cultusia_Hair_Color_Shampoo_DARK_BROWN.jpg',
    'images/Cultusia_Hair_Shampoo_.jpg',
    'images/home.jpg',
    'images/home1.jpg',
    'images/home2.jpg',
    'images/p1.jpg',
    'images/p2.jpg',
    'images/p3.jpg',
    'images/p4.jpg',
    'images/p5.jpg',
    'images/p6.jpg',
    'images/products.JPG',
    'js/bootstrap.js',
    'js/bootstrap.min.js',
    'js/jquery-3.2.1.min.js',
    'js/mdb.js',
    'js/mdb.min.js',
    'images/mr/1.jpg',
    'images/mr/2.jpg',
    'images/mr/3.jpg',
    'images/mr/4.jpg',
    'images/mr/5.jpg',
    'images/mr/6.jpg',
    'images/mr/7.jpg',
    'images/mr/8.jpg',
    'js/vue.js',
    'js/popper.min.js'

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
