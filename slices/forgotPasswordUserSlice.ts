import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface ForgetPasswordUserState {
  data: {
    timeCreated: number;
    email: string;
    token: string;
  };

  loading?: boolean;
  error?: string | null;
}

const initialState: ForgetPasswordUserState = {
  data: {
    email: "",
    token: "",
    timeCreated: 0,
  },

  loading: false,
  error: null,
};

export const forgetPasswordUserSlice = createSlice({
  name: "currentForgetPasswordUser",
  initialState,
  reducers: {
    setForgetPasswordUser: (
      state,
      action: PayloadAction<ForgetPasswordUserState | any>
    ) => {
      state.data = action.payload.data;
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

export const { setForgetPasswordUser, setLoading, setError } =
  forgetPasswordUserSlice.actions;

// getting a chunk of state  from the store itself

// export const selectForgetPasswordUser = (state: RootState) =>
//   state.forgetPasswordUser?.data;

export default forgetPasswordUserSlice.reducer;
