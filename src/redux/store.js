// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import themeReducer from "./ThemeSlice";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    theme: themeReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    blogs: store.getState().blogs,
    theme: store.getState().theme,
  });
});
