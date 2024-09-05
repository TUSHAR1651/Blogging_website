// src/redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Selector
export const selectTheme = (state) => state.theme.mode;

// Action creators
export const { toggleTheme, setTheme } = themeSlice.actions;

// Reducer
export default themeSlice.reducer;