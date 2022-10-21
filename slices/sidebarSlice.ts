import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface SidebarState {
  open: boolean;
}

const initialState: SidebarState = {
  open: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export const selectOpen = (state: RootState) => state.sidebar.open;

export default sidebarSlice.reducer;
