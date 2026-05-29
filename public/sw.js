self.addEventListener('push', event => {
  const data = event.data?.json() || {}
  self.registration.showNotification(data.title || 'AffirmMe ✨', {
    body: data.body || 'Your daily affirmation is waiting for you.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'daily-affirmation',
    renotify: true
  })
})
