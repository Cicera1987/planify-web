import { configureStore } from "@reduxjs/toolkit";

// Services / APIs
import { authApi } from "../services/authService";
import { userApi } from "../services/usersService";
import { contactApi } from "../services/contactService";
import { packageApi } from "../services/packagesService";
import { schedulingApi } from "../services/schedulingService";
import { calendarApi } from "../services/calendarService";

// Slices
import authReducer from "./features/authSlice";
import userReducer from "./features/usersSlice";
import contactsReducer from "./features/contactsSlice";
import jobsReducer from "./features/jobsSlice";
import packagesReducer from "./features/packagesSlice";
import schedulingReducer from "./features/schedulingSlice";
import calendarReducer from "./features/calendarSlice";
import { jobApi } from "../services/jobService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactsReducer,
    jobs: jobsReducer,
    packages: packagesReducer,
    scheduling: schedulingReducer,
    calendar: calendarReducer,

    // RTK Query reducers
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [schedulingApi.reducerPath]: schedulingApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      contactApi.middleware,
      jobApi.middleware,
      packageApi.middleware,
      schedulingApi.middleware,
      calendarApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
