import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

/*
  ============================================================
  fetchSortedPlaces
  ============================================================

  PURPOSE:
  --------
  This function adapts existing logic so that it can be reused
  with the generic useFetch custom hook.

  useFetch expects:
    - A function
    - That RETURNS A PROMISE
    - Which eventually resolves with the final data

  This function:
    1) Fetches available places from backend
    2) Gets user's current geolocation
    3) Sorts places based on distance
    4) Returns the sorted places as a Promise
*/

async function fetchSortedPlaces() {
  // Step 1: Fetch raw places data from backend
  const places = await fetchAvailablePlaces();

  /*
    IMPORTANT: WHY ARE WE USING "new Promise" HERE?
    ------------------------------------------------

    navigator.geolocation.getCurrentPosition is:
      - Asynchronous
      - Callback-based (NOT Promise-based)
      - Does NOT return a Promise

    But useFetch internally does:
      const data = await fetchFn();

    That means:
      fetchFn MUST return a Promise

    Since getCurrentPosition uses callbacks,
    we manually wrap it inside a Promise so that:
      - useFetch can await it
      - Errors can be caught by try/catch
      - The hook remains generic and reusable
  */

  return new Promise((resolve) => {
    /*
      getCurrentPosition executes asynchronously and
      provides the user's position via a callback.

      Once we receive the position:
        - We compute the sorted places
        - We resolve the Promise with the final result
    */
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      // Resolving the Promise completes the async operation
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  /*
    Reusing the SAME custom hook (useFetch),
    but with a DIFFERENT fetching strategy.

    useFetch does NOT care:
      - How data is fetched
      - Whether geolocation is involved
      - Whether sorting happens

    It only cares that:
      - fetchSortedPlaces returns a Promise
      - That Promise resolves with data
  */
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

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
