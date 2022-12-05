import React from "react";
import styled from "styled-components";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/Map";

const FeedsMapSection = styled.div`
  //   background: pink;
  min-height: auto;
  min-width: auto;

  //   @media (max-width: 710px) {
  //     min-width: 200vw;
  //     height: 200vh;
  //   }

  & > .map-container {
    min-height: 100vh;
    min-width: 100%;

    // @media (max-width: 710px) {
    //   min-width: 200vw;
    //   height: 200vh;
    // }
  }
`;

const FeedsMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <FeedsMapSection>
      <Map />
    </FeedsMapSection>
  );
};

export default FeedsMap;
