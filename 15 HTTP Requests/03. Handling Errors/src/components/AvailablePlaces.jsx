import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";

/*
  =================================================
  FETCHING DATA WITH ERROR HANDLING
  =================================================

  This component handles THREE UI states:
  1. Loading   → request in progress
  2. Success   → data loaded successfully
  3. Error     → request failed

  Why this is needed:
  - Network can fail
  - Server can be down
  - Response can be invalid
  - App must NOT crash
*/

export default function AvailablePlaces({ onSelectPlace }) {
  /*
    isFetching
    ----------
    - true  → request is running
    - false → request finished
    Used to show loading text
  */
  const [isFetching, setIsFetching] = useState(false);

  /*
    Stores successfully fetched data
  */
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /*
    Stores error information (if any)
    undefined → no error
    object    → error occurred
  */
  const [error, setError] = useState();

  /*
    =================================================
    useEffect → HTTP REQUEST SIDE EFFECT
    =================================================

    - Runs once on component mount
    - Correct place for data fetching
  */
  useEffect(() => {
    /*
      Async function to fetch data
      - useEffect itself cannot be async
      - So we define async function inside it
    */
    async function fetchPlaces() {
      // Mark request as started
      setIsFetching(true);

      try {
        /*
          fetch() sends HTTP GET request
          await waits until response arrives
        */
        const response = await fetch("http://localhost:3000/places");

        /*
          Convert response body from JSON string to JS object
        */
        const resData = await response.json();

        /*
          response.ok
          -----------
          - true  → status code 200–299
          - false → 400 / 500 errors

          fetch DOES NOT throw errors for HTTP failures
          So we must check manually
        */
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        /*
          Success path:
          - Store fetched data in state
          - Triggers re-render
        */
        setAvailablePlaces(resData.places);
      } catch (error) {
        /*
          catch block runs when:
          - Network fails
          - Server unreachable
          - Manual error thrown above
        */
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
      }

      // Mark request as finished (success OR error)
      setIsFetching(false);
    }

    // Trigger the async function
    fetchPlaces();
  }, []); // empty dependency → run once on mount

  /*
    =================================================
    ERROR UI (EARLY RETURN)
    =================================================

    If an error exists:
    - Do NOT render Places
    - Show error component instead
  */
  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  /*
    =================================================
    NORMAL UI (NO ERROR)
    =================================================
  */
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      /*
        Loading props
        - Used by Places component
        - Controls loading message visibility
      */
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
