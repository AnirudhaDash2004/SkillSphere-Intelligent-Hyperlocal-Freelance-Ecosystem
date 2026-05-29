import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import gigReducer from "./slices/gigSlice.js";
import proposalReducer from "./slices/proposalSlice.js";
import chatReducer from "./slices/chatSlice.js";
import notificationReducer from "./slices/notificationSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gigs: gigReducer,
    proposals: proposalReducer,
    chat: chatReducer,
    notifications: notificationReducer
  }
});

export default store;
