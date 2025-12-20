/*
  =================================================
  HTTP UTILITY FUNCTIONS
  =================================================

  This file contains reusable functions for:
  - Fetching available places (GET)
  - Fetching user-selected places (GET)
  - Updating user-selected places (PUT)

  Why separate this file?
  - Keeps components clean
  - Centralizes HTTP logic
  - Makes error handling consistent
*/

/*
  -------------------------------------------------
  fetchAvailablePlaces()
  -------------------------------------------------

  Purpose:
  - Fetch the list of ALL available places from backend

  Keyword: async
  - Marks this function as asynchronous
  - Allows use of `await` inside
  - Automatically returns a Promise
*/
export async function fetchAvailablePlaces() {
  /*
    fetch()
    -------
    - Browser API for making HTTP requests
    - Returns a Promise
    - Default method: GET
  */
  const response = await fetch("http://localhost:3000/places");

  /*
    response.json()
    ---------------
    - Reads the response body
    - Parses JSON string into a JavaScript object
    - Also asynchronous → returns a Promise
  */
  const resData = await response.json();

  /*
    response.ok
    -----------
    - Boolean flag provided by Fetch API
    - true  → status code 200–299
    - false → error status (400, 500, etc.)
  */
  if (!response.ok) {
    /*
      throw Error
      -----------
      - Immediately stops function execution
      - Rejects the Promise returned by async function
      - Can be caught using try/catch in the caller
    */
    throw new Error("Failed to fetch places");
  }

  /*
    Return value:
    - resData = { places: [...] }
    - We only return the places array
  */
  return resData.places;
}

/*
  -------------------------------------------------
  fetchUserPlaces()
  -------------------------------------------------

  Purpose:
  - Fetch places selected by the user
  - Same structure as fetchAvailablePlaces
*/
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}

/*
  -------------------------------------------------
  updateUserPlaces()
  -------------------------------------------------

  Purpose:
  - Send updated user places to backend
  - Uses HTTP PUT (update operation)

  Parameter:
  - places → array of place objects
*/
export async function updateUserPlaces(places) {
  /*
    fetch() with options object
    ---------------------------
    When sending data, we must configure the request
  */
  const response = await fetch("http://localhost:3000/user-places", {
    /*
      HTTP Method
      -----------
      PUT is used to:
      - Replace existing data
      - Update server-side resource
    */
    method: "PUT",

    /*
      body
      ----
      - Data sent to the server
      - Must be a string (JSON)
      - We wrap places inside an object for clarity
    */
    body: JSON.stringify({ places }),

    /*
      headers
      -------
      Tell the server:
      - What type of data we are sending
      - Required for JSON APIs
    */
    headers: {
      "Content-Type": "application/json",
    },
  });

  /*
    Parse server response
    - Server returns: { message: "User places updated!" }
  */
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  /*
    Return success message
    - Useful for logging or future UI feedback
  */
  return resData.message;
}
