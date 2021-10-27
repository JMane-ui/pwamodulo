//Asignar nombre y versión a la cache
const CACHE_NAME = "v1_pwa_moduloencuestas";
//Archivos para la cache (no acepta carpetas)
var urlsToCache = [
    './',
    './css/style.css',
    './answer.html',
    './create.html',
    './dashboard.html',
    './edit.html',
    './surveyAnswer.html',
    './user.html',
    './view.html',
    './video/presentacion.mp4',
    './img/analytics.svg',
    './img/bar-chart.svg',
    './img/borrar.png',
    './img/circle-cropped.png',
    './img/color-palette-outline.svg',
    './img/compartir.png',
    './img/eye-outline.svg',
    './img/person.svg',
    './img/pie-chart.svg',
    './img/share-outline.svg',
    './img/trash-outline.svg',
    './img/ver.png',
    './img/favicon/favicon.ico',
    './img/favicon/favicon.png',
    './img/favicon/favicon-16x16.png',
    './img/favicon/favicon-32x32.png',
    './img/favicon/favicon-96x96.png',
    './img/favicon/favicon-256x256.png'
];

/*-----------EVENTOS-------------*/
//install: instalar el service worker y guardar en cache recursos estáticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then( cache => {
                return cache.addAll(urlsToCache)
                    .then( () => {
                        console.log("Instalación completa en cache");
                        self.skipWaiting();
                    })
            })
            .catch( err => {
                console.log("No se pudo registrar la cache", err);
            })
    );
});



//activate: ayuda a que la app pueda funcionar sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then( cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if( cacheWhitelist.indexOf(cacheName) === -1 ){
                            console.log("Activado correctamente");
                            return caches.delete( cacheName );
                        }
                    })
                )
            })
            .then( () => {
                self.clients.claim(); //activar cache en todos los clientes
            })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match( e.request )
            .then( resp => {
                if(resp){
                    return resp;
                }
                return fetch( e.request );
            })
    );
})