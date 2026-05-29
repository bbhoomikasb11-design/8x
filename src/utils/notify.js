import affirmations from '../data/affirmations';

export const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      return registration;
    } catch (e) {
      console.error('Service worker registration failed:', e);
    }
  }
  return null;
};

export const requestPermission = async () => {
  if (!('Notification' in window)) return 'denied';
  return await Notification.requestPermission();
};

export const showLocalNotification = async (text) => {
  if (Notification.permission === 'granted' && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const body = text || affirmations[Math.floor(Math.random() * affirmations.length)].text;
    registration.showNotification('AffirmMe ✨', {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'daily-affirmation',
      renotify: true
    });
  }
};

export const scheduleDaily = (timeString) => {
  // timeString is "HH:MM"
  if (!timeString) return;

  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Store the time in local storage
  localStorage.setItem('affirmme_notif_time', timeString);

  const calculateDelay = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    if (now.getTime() > target.getTime()) {
      // If time has passed today, schedule for tomorrow
      target.setDate(target.getDate() + 1);
    }
    
    return target.getTime() - now.getTime();
  };

  const scheduleNext = () => {
    const delay = calculateDelay();
    
    if (window._affirmNotifId) {
      clearTimeout(window._affirmNotifId);
    }

    window._affirmNotifId = setTimeout(() => {
      showLocalNotification();
      // schedule the next one for the next day
      scheduleNext();
    }, delay);
  };

  scheduleNext();
};

export const cancelDaily = () => {
  if (window._affirmNotifId) {
    clearTimeout(window._affirmNotifId);
    window._affirmNotifId = null;
  }
  localStorage.removeItem('affirmme_notif_time');
};

export const getSavedTime = () => {
  return localStorage.getItem('affirmme_notif_time');
};

export const isScheduled = () => {
  return !!getSavedTime();
};
