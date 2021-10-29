navigator.serviceWorker.register('sw.js');

navigator.serviceWorker.ready
.then(function(registration) {

  return registration.pushManager.getSubscription()
  .then(async function(subscription) {

 
    if (subscription) {
      return subscription;
    }

    const response = await fetch('./vapidPublicKey');
    const vapidPublicKey = await response.text();

 
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}).then(function(subscription) {


 
  fetch('./register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscription
    }),
  });

  document.getElementById('doIt').onclick = function() {
 
    fetch('./sendNotification', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription
      }),
    });
  };

});