importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC1Tv9VA77HQm10rRYULAxq1URsmoJmUa0",
  authDomain: "planify-f392b.firebaseapp.com",
  projectId: "planify-f392b",
  storageBucket: "planify-f392b.firebasestorage.app",
  messagingSenderId: "126796731344",
  appId:"1:126796731344:web:104cc3223d7c432c839fd5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png",
    data: payload.data,
  });
});
