import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Auth {
  userName: string;
  token: string;
}

const initialState: Auth = { userName: "", token: "" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      const { userName, token } = action.payload;
      state.userName = userName;
      state.token = token;
    },
    logout: (state) => {
      state.userName = "";
      state.token = "";
    },
  },
});

// reducer
export const authRedurcer = authSlice.reducer;

// actions
export const { login, logout } = authSlice.actions;

// selectors
export const selectLoggedInUser = (state: RootState) => state.auth.userName;
export const selectAuthTokan = (state: RootState) => state.auth.token;
