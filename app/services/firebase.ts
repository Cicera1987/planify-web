import { initializeApp, getApps } from "firebase/app";
import { getMessaging, isSupported, Messaging } from "firebase/messaging";

let messaging: Messaging | null = null;


export const firebaseApp =
  getApps().length === 0
    ? initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    })
    : getApps()[0];

export async function getFirebaseMessaging() {
  if (typeof window === "undefined") return null;

  if (!messaging) {
    const supported = await isSupported();
    if (!supported) return null;

    messaging = getMessaging(firebaseApp);
  }

  return messaging;
}