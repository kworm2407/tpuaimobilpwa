const cacheActual = 'UAIMobile-v2';

const recursosEstaticos = [
    'css/materialize.min.css',
    'js/materialize.min.js',
    'icons/192.png',
    'img/Avatar_Aguirre_Nestor.jpg',
    'img/Avatar_Aranda_Nelson.jpg',
    'img/Avatar_Lomoro_Jorge.jpg',
    'img/Avatar_Saavedra_Enzo.jpg',
    'img/geofencing-icon-5.jpg',
    'img/arrow-back-icon.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil
    (
        caches.open(cacheActual).then(function (cache) {
            return cache.addAll(recursosEstaticos);
        })
    );
    console.log('Installed ->', event);
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
    console.log('Fetch -> ', event);
});

