import { configureStore } from "@reduxjs/toolkit";
import { authRedurcer } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authRedurcer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
