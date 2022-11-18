import { combineReducers } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUserSlice";
import sidebarReducer from "./sidebarSlice";
import counterReducer from "./counterSlice";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// persist currentUserSlice
export const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["currentUser"],
  whitelist: [],
};

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  sidebar: sidebarReducer,
  counter: counterReducer,
});

export default persistReducer(persistConfig, rootReducer);