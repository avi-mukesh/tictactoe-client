import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import gameReducer from "../features/game/gameSlice";
import { authApi } from "./services/auth/authService";
import { gameApi } from "./services/game/gameService";
import { userApi } from "./services/user/userService";

const store = configureStore({
  reducer: {
    // this is Redux Toolkit pattern
    auth: authReducer,
    game: gameReducer,
    // this is RTK Query pattern - service generates a slice reducer...
    // [authApi.reducerPath]: authApi.reducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  // ...and a custom middleware that handles data fetching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(authApi.middleware)
      .concat(gameApi.middleware)
      .concat(userApi.middleware),
});

export default store;
