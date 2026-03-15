import { useCallback, useEffect, useState } from "react";

/*
  ------------------------------------------------------------
  LOW-LEVEL HTTP FUNCTION
  ------------------------------------------------------------

  Purpose:
  --------
  - Encapsulate fetch logic
  - Handle JSON parsing
  - Centralize error handling

  This function:
  - Is NOT a hook
  - Can be reused by any hook or function
*/
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  /*
    Parse JSON response body
  */
  const resData = await response.json();

  /*
    If HTTP status is not OK (4xx / 5xx),
    throw an error so the caller can catch it
  */
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

/*
  ------------------------------------------------------------
  useHttp — CUSTOM HOOK
  ------------------------------------------------------------

  Purpose:
  --------
  - Centralize HTTP request logic
  - Handle loading & error state
  - Avoid repeating useEffect + fetch logic
*/
export default function useHttp(url, config, initialData) {
  /*
    ------------------------------------------------------------
    STATE MANAGEMENT
    ------------------------------------------------------------
  */
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /*
    ------------------------------------------------------------
    sendRequest FUNCTION
    ------------------------------------------------------------

    Wrapped in useCallback because:
    - It is used inside useEffect
    - Prevents infinite re-renders
    - Ensures stable function reference

    Dependencies:
    -------------
    - url
    - config
  */
  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  /*
    ------------------------------------------------------------
    AUTOMATIC REQUEST ON MOUNT (GET REQUESTS)
    ------------------------------------------------------------

    Logic:
    ------
    - If method is GET (or undefined)
    - Automatically send request when component mounts

    This allows:
    - GET requests to run automatically
    - POST / PUT requests to be triggered manually
  */
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  /*
    ------------------------------------------------------------
    RETURN API
    ------------------------------------------------------------

    sendRequest is returned so:
    - Non-GET requests can be triggered manually
    - Same hook works for all HTTP methods
  */
  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
