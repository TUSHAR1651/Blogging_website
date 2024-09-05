// src/redux/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  categories: ["Technology", "Travel", "Food", "Lifestyle"],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost } = blogSlice.actions;
export default blogSlice.reducer;
