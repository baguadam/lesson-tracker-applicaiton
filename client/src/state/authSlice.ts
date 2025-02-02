import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Auth {
  email: string | null;
  token: string | null;
}

const initialState: Auth = { email: null, token: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

// reducer
export const authReducer = authSlice.reducer;

// actions
export const { login, logout } = authSlice.actions;

// selectors
export const selectLoggedInUser = (state: RootState) => state.auth.email;
export const selectAuthTokan = (state: RootState) => state.auth.token;
