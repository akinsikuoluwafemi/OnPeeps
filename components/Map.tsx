import React, { useEffect } from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation, setLocation } from "../slices/currentLocationSlice";
import { selectRequestLocation } from "slices/requestLocationSlice";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const dispatch = useDispatch();

  const location = useSelector(selectLocation);

  //   this is dispatched from the LocationInput component
  const requestLocation: LatLngLiteral | any = useSelector(
    selectRequestLocation
  );

  console.log("requestLocation", requestLocation?.location);
  useEffect(() => {
    // get users location

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setLocation({
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            })
          );
        },
        (err: any) => {
          console.log(err);
          //if there is an error use the users ip to get the users location
          if (err.code === 1) {
            const getLocationFromIp = async () => {
              const { data } = await axios.get("https://ipapi.co/json/");

              dispatch(
                setLocation({
                  location: {
                    lat: data.latitude,
                    lng: data.longitude,
                  },
                })
              );
            };
            getLocationFromIp();
          }
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const mapRef = useRef<GoogleMap | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const center = useMemo<LatLngLiteral | any>(() => location, [location]);
  const allRequest = useMemo(() => generateRequests(center.location), [center]);

  console.log("allRequest", allRequest);

  const options = useMemo<MapOptions>(
    () => ({
      //   mapId: "734887c1b8e6a5c0",
      //   mapId: "72043e68a7a9cbaa",
      mapId: "734887c1b8e6a5c0",
      disableDefaultUI: true,
      clickableIcons: false,
      //   zoomControl: true,
      //   fullscreenControl: true,
      //   mapTypeControl: true,
      //   streetViewControl: true,
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  //   useEffect(() => {
  //     // run a useeffect when the request location changes, and run the
  //     requestLocation.location &&
  //       mapRef.current?.panTo(requestLocation?.location); // pan the map to the request location
  //   }, [requestLocation.location && requestLocation.location]);

  if (center?.lat === 0 || center?.lng === 0) return <div>loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={center?.location}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onLoad}
    >
      <MarkerClusterer>
        {(clusterer) => (
          <>
            {allRequest.map((request) => (
              <>
                <Marker
                  key={request.lat + request.lng}
                  position={request}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                  clusterer={clusterer}
                  onClick={() => {
                    console.log(request);
                    // mapRef.current?.panTo(request);
                    setSelectedRequest(request);
                  }}
                />

                {selectedRequest && (
                  <InfoWindow
                    position={selectedRequest}
                    onCloseClick={() => setSelectedRequest(null)}
                    options={{ pixelOffset: new google.maps.Size(150, 85) }}
                  >
                    <div>
                      <p>Info Window</p>
                    </div>
                  </InfoWindow>
                )}
              </>
            ))}
          </>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
};

const generateRequests = (position: LatLngLiteral) => {
  const _request: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _request.push({
      lat: position?.lat + Math.random() / direction,
      lng: position?.lng + Math.random() / direction,
    });
  }
  return _request;
};

export default Map;
