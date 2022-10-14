/* eslint-disable no-undef */
/// <reference lib="webworker" />

// Add an import, export, or an empty 'export {}' statement to make it a module. ts(1208)
export declare const self: ServiceWorkerGlobalScope

// listen to message event from window
self.addEventListener('message', (e) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(e.data)
})

self.addEventListener('install', (e) => {
  console.log('👀 - install', e)
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.log('👀 - activate', e)
})

self.addEventListener('push', (e) => {
  const message = e.data?.json()
  console.log('👀 - message', message)

  e.waitUntil(
    self.registration.showNotification(message.sender.nickname, {
      body: message.content,
      icon: message.sender.imageUrl,
    })
  )
})

self.addEventListener('notificationclick', (e) => {
  console.log('notificationclick', e)
  self.clients.openWindow('https://github.com/leegeunhyeok/web-push')
})
