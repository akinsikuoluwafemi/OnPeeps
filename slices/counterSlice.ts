import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface CounterState {
  value: number;
  //   loading: boolean;
  //   error: string | null;
}

const initialState: CounterState = {
  value: 0,
  //   loading: false,
  //   error: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  //  incrementByAmount
} = counterSlice.actions;

// Selector
export const selectValue = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
