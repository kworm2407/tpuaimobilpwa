var cacheActual = 'cachestore-v1.0';
var CACHE_VERSION = 1;
var CURRENT_CACHES = {
    font: 'font-cache-v' + CACHE_VERSION
};
const recursosEstaticos = [
    'css/materialize.min.css',
    'js/materialize.min.js',
    'icons/192.png',
    'icons/512.jpg',
    'img/Avatar_Aguirre_Nestor.png',
    'img/Avatar_Aranda_Nelson.png',
    'img/Avatar_Lomoro_Jorge.png',
    'img/Avatar_Saavedra_Enzo.png',
    'img/geofencing-logo-52x52.jpg',
    'img/arrow-back-icon.png',
    'css/estilos.css',
    'abstract.html',
    'index.html'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheActual).then(cache => {
            return cache.addAll(recursosEstaticos);
        })
    );
    console.log('Installed ->', event);
});

self.addEventListener('activate', function (event) {
    // var version = 'v1';
    // event.waitUntil(
    //     caches.keys()
    //         .then(cacheNames =>
    //             Promise.all(
    //                 cacheNames
    //                     .map(c => c.split('-'))
    //                     .filter(c => c[0] === 'cachestore')
    //                     .filter(c => c[1] !== version)
    //                     .map(c => caches.delete(c.join('-')))
    //             )
    //         )
    // );
    // event.waitUntil(
    //     caches.keys().then(cacheNames => Promise.all(
    //         cacheNames.filter(cacheName => {
    //             return cacheName !== cacheActual
    //         }).map(cacheName => caches.delete(cacheName))
    //     ))
    // );
    var expectedCacheNames = Object.values(CURRENT_CACHES);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (!expectedCacheNames.includes(cacheName)) {
                        console.log('Deleting out of date cache:', cacheName);

                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(

        // Opens Cache objects that start with 'font'.
        caches.open(CURRENT_CACHES['font']).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                if (response) {
                    console.log('Found response in cache:', response);

                    return response;
                }

                console.log('Fetching request from the network');

                return fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                });
            }).catch(function(error) {

                // Handles exceptions that arise from match() or fetch().
                console.error('Error in fetch handler:', error);

                throw error;
            });
        })
    );
});
