//Guidance for creating this code courtesy of https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/

/*
 * list of cached files necessary when working offline
 */
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

/*
 * Installing service worker and opening cache
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
          return cache.addAll(cacheFiles);
        })
    );
});

/*
 * Establishing the fetch event and handling possible responses and error cases
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
          if (response) {
            console.log('Found', event.request, ' in cache');
            return response;
          } else {
            console.log('Could not find ', event.request, ' in cache, fectching');
            return fetch(event.request)
            .then(function(response) {
              const responseClone =response.clone();
              caches.open('v1').then(function(cache) {
                cache.put(event.request, response);
              })
              return response;
            })
            .catch(function(err) {
              console.error(err);
            });
          }
        })
    );
})
