import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

type LatLngLiteral = google.maps.LatLngLiteral;

export interface RequestLocationState {
  location: {
    lat: number;
    lng: number;
  };
}

const initialState: RequestLocationState = {
  location: {
    lat: 0,
    lng: 0,
  } as LatLngLiteral | any,
};

export const requestLocationSlice = createSlice({
  name: "request-location",
  initialState,
  reducers: {
    setRequestLocation: (state, action: PayloadAction<LatLngLiteral | any>) => {
      state.location = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRequestLocation } = requestLocationSlice.actions;

// Selector
export const selectRequestLocation = (state: RootState) =>
  state.requestLocation.location;

export default requestLocationSlice.reducer;
