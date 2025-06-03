// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loggedIn: false,
  premiumEnabled: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.loggedIn = false;
    },
    permiumPurchased(state, action) {
      state.premiumEnabled = true;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
