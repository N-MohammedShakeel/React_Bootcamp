import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // Tracks loading state
  const [isFetching, setIsFetching] = useState(false);

  // Stores places fetched from backend
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // Stores error info if something fails
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true); // show loading indicator

      try {
        // Fetch places from backend
        const places = await fetchAvailablePlaces();

        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
          // Sort places based on distance from user
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces); // update state
          setIsFetching(false); // stop loading
        });
      } catch (error) {
        // Handle fetch or logic errors
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }

    fetchPlaces(); // run once on component mount
  }, []);

  // Render error UI if something failed
  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  // Render reusable Places component
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
