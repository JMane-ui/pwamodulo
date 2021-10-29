if( navigator.serviceWorker ){
    console.log('Se cargó el service worker');
    navigator.serviceWorker.register('./sw.js')
        .then( resp => console.log('Todo bien: ', resp))
        .catch(error => console.log('Algo mal: ', error))
}else{
    console.log('No se aceptó el service worker');
}