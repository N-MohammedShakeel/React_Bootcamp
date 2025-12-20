import { useEffect, useState } from "react";

/*
  ============================================================
  CUSTOM HOOK: useFetch
  ============================================================

  PURPOSE:
  --------
  This hook encapsulates reusable data-fetching logic:
  - loading state
  - error handling
  - fetched data storage

  It allows components to reuse the same fetching logic
  without duplicating useState + useEffect code.

  PARAMETERS:
  -----------
  fetchFn:
    - A function responsible for fetching data
    - Must return a Promise
    - Example: fetchUserPlaces, fetchAvailablePlaces

  initialValue:
    - Initial value for fetched data state
    - Usually [] or null depending on expected data

  RETURN VALUE:
  -------------
  An object containing:
    - isFetching     -> loading state
    - error          -> error state
    - fetchedData    -> fetched result
    - setFetchedData -> allows optimistic updates from component
*/

export function useFetch(fetchFn, initialValue) {
  // Indicates whether data is currently being fetched
  const [isFetching, setIsFetching] = useState(false);

  // Stores error information if fetch fails
  const [error, setError] = useState();

  // Stores fetched data (user places, available places, etc.)
  const [fetchedData, setFetchedData] = useState(initialValue);

  /*
    useEffect is responsible for triggering the fetch operation.

    Dependency:
    -----------
    fetchFn is included so that:
    - If the fetch function reference changes,
      the effect re-runs and fetches new data

    This makes the hook flexible and reusable.
  */
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
