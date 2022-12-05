// import React from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// const LocationInput = () => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   return (
//     <input className="location-input" type="text" placeholder="Your location" />
//   );
// };

// export default LocationInput;

import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GoLocation } from "react-icons/go";
import styled from "styled-components";
import Button from "utils/Buttons";
import { useDispatch } from "react-redux";
import { setRequestLocation } from "slices/requestLocationSlice";

const LocationWrapper = styled.div`
  position: relative;

  & > .create-request {
    position: absolute;
    // left: 70%;
    right: 0;
    // top: 70%;
    bottom: 0%;
    margin: auto;
    padding: 0.5rem 0rem;
    border-radius: 50px;
    font-weight: 600;
    width: 40%;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const LocationInput = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const dispatch = useDispatch();

  console.log(status, data);
  console.log(ready);

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(results[0]);

    console.log(lat, lng);
    dispatch(setRequestLocation({ location: { lat, lng } }));
    // set the location and pan the map to it.
  };

  return (
    <LocationWrapper>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="location-input"
          type="text"
          placeholder="Your location"
        />
        <ComboboxPopover
          style={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <div>
                <ComboboxOption
                  key={place_id}
                  value={description}
                  style={{
                    fontFamily: "Ubuntu sans-serif !important",
                    fontWeight: "400",
                    color: "gray",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    // borderBottomLeftRadius: "8px",
                    // borderBottomRightRadius: "8px",
                    padding: "1rem 1.5rem",
                    paddingRight: "0.1rem",
                    marginBottom: ".2rem",
                  }}
                >
                  {/* <GoLocation
                  style={{ marginRight: "1rem", fontSize: "1.2rem" }}
                /> */}
                  {description}
                </ComboboxOption>
              </div>
            ))}
        </ComboboxPopover>
      </Combobox>
      <Button
        variant="primary"
        // style={{ marginTop: ".5rem" }}
        className="create-request"
      >
        Create
      </Button>
    </LocationWrapper>
  );
};

export default LocationInput;
