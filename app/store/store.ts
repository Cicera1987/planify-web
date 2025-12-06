import { configureStore } from "@reduxjs/toolkit";

// Slices
import authReducer from "./features/authSlice";
import userReducer from "./features/usersSlice";
import contactsReducer from "./features/contactsSlice";
import jobsReducer from "./features/jobsSlice";
import packagesReducer from "./features/packagesSlice";
import schedulingReducer from "./features/schedulingSlice";
import calendarReducer from "./features/calendarSlice";
import notificationReducer from "./features/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactsReducer,
    jobs: jobsReducer,
    packages: packagesReducer,
    scheduling: schedulingReducer,
    calendar: calendarReducer,
    notifications:notificationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
