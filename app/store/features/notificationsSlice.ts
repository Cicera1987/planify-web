import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteAllNotificationsByContact,
  deleteNotification,
  getNotificationContactIds,
  getNotificationsByContact,
  markNotificationAsRead
} from "@/app/services/notificationService";
import { Notifications } from "@/app/services/notificationService";

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async () => {
    const ids = await getNotificationContactIds().catch(() => []);
    const map: Record<number, Notifications[]> = {};

    for (const id of ids) {
      map[id] = await getNotificationsByContact(id).catch(() => []);
    }

    return map;
  }
);

export const removeNotification = createAsyncThunk(
  "notifications/remove",
  async (id: number) => {
    await deleteNotification(id);
    return id;
  }
);

export const removeAllByContact = createAsyncThunk(
  "notifications/removeAllByContact",
  async (contactId: number) => {
    await deleteAllNotificationsByContact(contactId);
    return contactId;
  }
);

export const readContactNotifications = createAsyncThunk(
  "notifications/readContact",
  async (contactId: number, { getState }) => {
    const state = getState() as any;
    const list = state.notifications.notificationsByContact[contactId] || [];

    await Promise.all(list.filter(n => !n.read).map(n => markNotificationAsRead(n.id)));

    return { contactId };
  }
);

interface NotificationState {
  notificationsByContact: Record<number, Notifications[]>;
}

const initialState: NotificationState = {
  notificationsByContact: {},
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
      state.notificationsByContact = action.payload;
    });

    builder.addCase(readContactNotifications.fulfilled, (state, action) => {
      const { contactId } = action.payload;
      state.notificationsByContact[contactId] = state.notificationsByContact[contactId]
        .map(n => ({ ...n, read: true }));
    });

    builder.addCase(removeNotification.fulfilled, (state, action) => {
      const id = action.payload;
      for (const contactId in state.notificationsByContact) {
        state.notificationsByContact[contactId] =
          state.notificationsByContact[contactId].filter(n => n.id !== id);
      }
    });

    builder.addCase(removeAllByContact.fulfilled, (state, action) => {
      const contactId = action.payload;
      delete state.notificationsByContact[contactId];
    });
  }
});

export default notificationSlice.reducer;