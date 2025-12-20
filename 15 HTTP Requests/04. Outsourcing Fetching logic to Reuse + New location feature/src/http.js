/*
  =================================================
  HTTP UTILITY — SHARED FETCH FUNCTION
  =================================================

  Why move this code here?
  - Avoid duplication
  - Keep components clean
  - Reuse across multiple components
  - Easier to maintain & test
*/

export async function fetchAvailablePlaces() {
  /*
    Send HTTP GET request to backend
  */
  const response = await fetch("http://localhost:3000/places");

  /*
    Parse JSON response body
  */
  const resData = await response.json();

  /*
    fetch() does NOT throw errors for HTTP failures
    We must check manually
  */
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  /*
    Return only the required data
    (caller decides what to do with it)
  */
  return resData.places;
}
