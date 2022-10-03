/* eslint-disable no-undef */
/// <reference lib="webworker" />

export declare const serviceWorker: ServiceWorkerGlobalScope

// // listen to message event from window
// serviceWorker.addEventListener('message', (e) => {
//   // HOW TO TEST THIS?
//   // Run this in your browser console:
//   //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
//   // OR use next-pwa injected workbox object
//   //     window.workbox.messageSW({command: 'log', message: 'hello world'})
//   console.log(e?.data)
// })

serviceWorker.addEventListener('install', (e) => {
  console.log('install', { event: e })
  e.waitUntil(serviceWorker.skipWaiting())
})

serviceWorker.addEventListener('activate', (e) => {
  console.log('activate', { event: e })
})

serviceWorker.addEventListener('push', (e) => {
  const message = e.data?.json()

  e.waitUntil(
    serviceWorker.registration.showNotification(message.title, {
      body: message.body,
      icon: '/images/apple-touch-icon.png',
    })
  )
})

serviceWorker.addEventListener('notificationclick', (e) => {
  console.log('notificationclick', { event: e })
  serviceWorker.clients.openWindow('https://github.com/leegeunhyeok/web-push')
})

// serviceWorker.addEventListener('notificationclick', (e) => {
//   e.notification.close()
//   e.waitUntil(
//     serviceWorker.clients
//       .matchAll({ type: 'window', includeUncontrolled: true })
//       .then((clientList) => {
//         if (clientList.length === 0) return serviceWorker.clients.openWindow('/')

//         let client = clientList[0]
//         for (let i = 0; i < clientList.length; i++) {
//           if (clientList[i].focused) {
//             client = clientList[i]
//           }
//         }
//         return client.focus()
//       })
//   )
// })
