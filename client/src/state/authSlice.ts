import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Auth {
  username: string | null;
  token: string | null;
}

const initialState: Auth = { username: null, token: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
    },
  },
});

// reducer
export const authReducer = authSlice.reducer;

// actions
export const { login, logout } = authSlice.actions;

// selectors
export const selectLoggedInUser = (state: RootState) => state.auth.username;
export const selectAuthTokan = (state: RootState) => state.auth.token;
