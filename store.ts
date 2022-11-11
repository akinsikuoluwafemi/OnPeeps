import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import sidebarReducer from "./slices/sidebarSlice";
import currentUserReducer from "./slices/currentUserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sidebar: sidebarReducer,
    currentUser: currentUserReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
