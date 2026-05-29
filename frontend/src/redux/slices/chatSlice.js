import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chats",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    setItems: (state, action) => { state.items = action.payload; },
    addItem: (state, action) => { state.items.unshift(action.payload); },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; }
  }
});

export const { setItems, addItem, setLoading, setError } = slice.actions;
export default slice.reducer;
