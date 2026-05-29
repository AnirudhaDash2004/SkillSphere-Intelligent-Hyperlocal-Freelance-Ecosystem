import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("skillsphereUser") || "null");

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("skillsphereUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("skillsphereUser");
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
