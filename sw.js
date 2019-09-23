const cacheActual = 'UAIMobile-v2';

const recursosEstaticos = [
  'css/materialize.min.css',  
  'js/materialize.min.js' , 
  'icons/192.png'
];

self.addEventListener('install', function(event) 
{
  event.waitUntil
  (
    caches.open(cacheActual).then(function(cache) 
       {
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

