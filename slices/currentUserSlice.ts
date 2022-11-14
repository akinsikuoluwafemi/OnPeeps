import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface CurrentUserState {
  user: {
    id: number;
    name?: string;
    username?: string;
    email: string;
    password?: string;
    confirm_password?: string;
    file?: File | null | undefined;
    cell_phone?: string;
    created_at?: string;
    updated_at?: string;
    verified: boolean;
  };

  loading?: boolean;
  error?: string | null;
}

const initialState: CurrentUserState = {
  user: {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    file: null,
    cell_phone: "",
    created_at: "",
    updated_at: "",
    verified: false,
    id: 0,
  },

  loading: false,
  error: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserState | any>) => {
      state.user = action.payload.user;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },

  extraReducers: {},
});

export const { setCurrentUser, setLoading, setError } =
  currentUserSlice.actions;

// getting a chunk of state  from the store itself

export const selectCurrentUser = (state: RootState) => state.currentUser?.user;
export const selectCurrentLoading = (state: RootState) =>
  state.currentUser.loading;
export const selectCurrentError = (state: RootState) => state.currentUser.error;

export default currentUserSlice.reducer;
