import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";
import { api } from "./api";

export interface NotificationPushInputs {
  contactId: number
  token: string
  title: string
  body: string
}

export interface Notifications {
  id: number
  title: string
  message: string
  read: boolean
  createdAt: string
  contactId: number
  professionalId?: number
}

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Permissão de notificação negada");
    return null;
  }

  const messaging = await getFirebaseMessaging();
  if (!messaging) {
    console.warn("Firebase messaging não inicializado");
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  return token;
}


export const getNotificationContactIds = async (): Promise<number[]> => {
  const res = await api.get<number[]>(`/notifications/contacts-with-notifications`);
  return res.data;
};

export const getNotificationsByContact = async (contactId: number): Promise<Notifications[]> => {
  const res = await api.get<Notifications[]>(`/notifications/list/${contactId}`);
  return res.data;
};

export const markNotificationAsRead = async (notificationId: number): Promise<void> => {
  await api.post(`/notifications/read/${notificationId}`);
};

export const saveContactFCMToken = async (contactId: number, token: string): Promise<string> => {
  const res = await api.post<string>(`/notifications/token`, { contactId, token });
  return res.data;
};

export const sendPushNotification = async (data: NotificationPushInputs): Promise<string> => {
  const res = await api.post<string>(
    `/notifications/send?token=${encodeURIComponent(data.token)}&title=${encodeURIComponent(data.title)}&body=${encodeURIComponent(data.body)}`
  );
  return res.data;
};

export const initNotificationsForContact = async (contactId: number) => {
  const token = await requestNotificationPermission();
  if (!token) return null;

  await saveContactFCMToken(contactId, token);
  return token;
};

export const deleteNotification = async (notificationId: number): Promise<void> => {
  await api.delete(`/notifications/${notificationId}`);
};

export const deleteAllNotificationsByContact = async (contactId: number): Promise<void> => {
  await api.delete(`/notifications/contact/${contactId}`);
};