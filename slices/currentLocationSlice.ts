import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

type LatLngLiteral = google.maps.LatLngLiteral;

export interface CurrentLocationState {
  location: {
    lat: number;
    lng: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CurrentLocationState = {
  location: {
    lat: 0,
    lng: 0,
  } as LatLngLiteral | any,
  loading: false,
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LatLngLiteral | any>) => {
      state.location = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLocation,
  setLoading,
  setError,
  //  incrementByAmount
} = locationSlice.actions;

// Selector
export const selectLocation = (state: RootState) => state.location.location;
export const selectLocationLoading = (state: RootState) =>
  state.location.loading;
export const selectLocationError = (state: RootState) => state.location.error;

export default locationSlice.reducer;
