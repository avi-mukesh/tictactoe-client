import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "./services/auth/authService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // RTK Query service generates a slice reducer...
    [authApi.reducerPath]: authApi.reducer,
  },
  // ...and a custom middleware that handles data fetching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
