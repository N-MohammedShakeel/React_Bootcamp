import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

/*
  =================================================
  AVAILABLE PLACES — LOCATION-AWARE DATA HANDLING
  =================================================

  Responsibilities of this component:
  1. Fetch available places from backend
  2. Get user's current geographic location
  3. Sort places based on distance from user
  4. Manage UI states (loading, error, success)

  Key idea:
  - Data comes from the SERVER
  - Ordering depends on the USER'S LOCATION
  - Both affect component STATE
*/

export default function AvailablePlaces({ onSelectPlace }) {
  /*
    Loading state
    -------------
    - true  → data / location still being processed
    - false → ready to render places
  */
  const [isFetching, setIsFetching] = useState(false);

  /*
    Stores final, sorted places
    (after fetch + location-based sorting)
  */
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /*
    Stores error info if anything fails
  */
  const [error, setError] = useState();

  /*
    =================================================
    SIDE EFFECT: FETCH + LOCATION ACCESS
    =================================================

    Why useEffect?
    - Fetching data is a side effect
    - Accessing geolocation is a browser side effect
    - Both must run AFTER component renders
  */
  useEffect(() => {
    /*
      Async function for sequential operations:
      1. Fetch data from server
      2. Access browser location
      3. Update state
    */
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        /*
          Step 1: Fetch places from backend
          --------------------------------
          Logic is outsourced to http.js
          → reusable
          → testable
          → cleaner components
        */
        const places = await fetchAvailablePlaces();

        /*
          Step 2: Get user's location
          ---------------------------
          - navigator.geolocation is a browser API
          - Works asynchronously
          - Requires user permission
        */
        navigator.geolocation.getCurrentPosition((position) => {
          /*
            Step 3: Sort places by distance
            --------------------------------
            Uses latitude & longitude from browser
          */
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          /*
            Step 4: Update state
            -------------------
            - Triggers re-render
            - UI now shows sorted places
          */
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        /*
          Error handling covers:
          - Network failures
          - Server errors
          - Unexpected fetch issues
        */
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }

    // Start the entire flow when component mounts
    fetchPlaces();
  }, []); // empty dependency → run once on mount

  /*
    =================================================
    ERROR UI
    =================================================
  */
  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  /*
    =================================================
    SUCCESS / LOADING UI
    =================================================
  */
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
