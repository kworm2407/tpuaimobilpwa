var cacheActual = 'cachestore-1';

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
    event.waitUntil(
        caches.keys().then(keys => {
            console.log(keys)
        })
        // caches.keys().then(cacheNames => Promise.all(
        //     cacheNames.map(cacheName => caches.delete(cacheName))
        // ))
        // var slitNameCache = cacheActual.split('-')
        // var versionCache = slitNameCache[1] + 1
        // caches.open(cacheActual).then(cache => {
        //     return cache.addAll(recursosEstaticos);
        // })
    );

});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});
