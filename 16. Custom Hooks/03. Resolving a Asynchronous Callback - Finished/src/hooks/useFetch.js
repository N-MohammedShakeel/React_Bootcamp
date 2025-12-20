import { useEffect, useState } from "react";

/*
  ============================================================
  useFetch (Generic Custom Hook)
  ============================================================

  DESIGN GOAL:
  ------------
  This hook is intentionally GENERIC.

  It does NOT know:
    - What data is being fetched
    - Whether geolocation is involved
    - Whether sorting happens
    - Where the data comes from

  It ONLY assumes:
    - fetchFn returns a Promise
    - That Promise resolves with data
*/

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        /*
          This await works for BOTH cases:
          --------------------------------
          1) Simple async functions (API calls)
          2) Functions that manually return a Promise
             (like fetchSortedPlaces with geolocation)

          This is why wrapping geolocation in a Promise
          was necessary.
        */
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
