/*
  ============================================================
  DATA FETCHING FUNCTIONS
  ============================================================

  IMPORTANT NOTE ABOUT FUNCTION REFERENCES & CUSTOM HOOKS:
  --------------------------------------------------------

  These functions are:
  - Defined at module level (outside React components)
  - Exported and imported where needed

  Because of this:
  ✔ Their function reference is STABLE
  ✔ They are NOT recreated on every React render
  ✔ They can be safely passed to custom hooks (like useFetch)
    and used inside dependency arrays WITHOUT useCallback

  Example:
    useFetch(fetchUserPlaces, [])

  No useCallback is required here because:
  - useCallback is only needed for functions created INSIDE
    a React component that would otherwise change on every render
*/

/*
  Fetches ALL available places
  Used in AvailablePlaces component
*/
export async function fetchAvailablePlaces() {
  // Send GET request to backend
  const response = await fetch("http://localhost:3000/places");

  // Parse JSON response body
  const resData = await response.json();

  // If HTTP status is not 2xx, throw error
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  // Return only the places array
  return resData.places;
}

/*
  Fetches places selected by the user
  Passed directly to useFetch(fetchUserPlaces, [])
*/
export async function fetchUserPlaces() {
  // Send GET request to backend
  const response = await fetch("http://localhost:3000/user-places");

  // Parse JSON response body
  const resData = await response.json();

  // Handle backend or network failure
  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  /*
    WHY THIS FUNCTION DOES NOT NEED useCallback:
    -------------------------------------------
    - This function is NOT created inside a React component
    - It is defined once when the module is loaded
    - Its reference never changes between renders

    Therefore:
    - Safe to use as a dependency inside useEffect
    - Safe to pass into custom hooks like useFetch
  */
  return resData.places;
}

/*
  Updates user-selected places on the backend
  Used for optimistic UI updates + persistence
*/
export async function updateUserPlaces(places) {
  // Send PUT request with updated places
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Parse response body
  const resData = await response.json();

  // Handle failure response
  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  /*
    This function is also:
    - Module-scoped
    - Reference-stable
    - Safe to use directly inside components or hooks

    No useCallback needed here either.
  */
  return resData.message;
}
