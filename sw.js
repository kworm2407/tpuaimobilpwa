var cacheName = 'cachestore-v';
var cacheVersion = 1

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

const versionCache = 0

self.addEventListener('install', function (event,versionCache,document) {
    self.skipWaiting();
   
    event.waitUntil(
        caches.open(cacheName+cacheVersion).then(cache => {
            return cache.addAll(recursosEstaticos);
        })
    );
    
    console.log('Installed ->', event);
      // event.waitUntil(
    //     caches.keys().then((keys,versionCache) => {
    //         var fiarr = keys.map(key => key.split('-v'))

    //         let iVersion = parseInt(fiarr[0][1], 10);
    //         versionCache = iVersion + 1
    //         console.log(versionCache)
    //     })
    // ); 
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .map(key => key.split('-'))
                .filter(key => key[0] === 'cachestore')
                .filter(key => key[1] !== 'v'+cacheVersion)
                .map(key => caches.delete(key.join('-')))
            )
        })
    );
});

self.addEventListener("fetch", function (event) {
    // event.respondWith(
    //     fetch(event.request).catch(function() {
    //         return caches.match(event.request);
    //     })
    // );
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
          return cacheResponse || fetch(event.request);
        })
      );
});
