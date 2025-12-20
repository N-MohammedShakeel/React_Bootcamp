import { useState, useEffect } from "react";
import Places from "./Places.jsx";

/*
  =================================================
  ASYNC / AWAIT + HTTP REQUEST (BEGINNER VIEW)
  =================================================

  Goal of this component:
  - Fetch available places from the backend server
  - Store them in state
  - Render them using <Places />

  Backend endpoint used:
  - GET http://localhost:3000/places
*/

export default function AvailablePlaces({ onSelectPlace }) {
  /*
    State to store data received from the backend
    Initially empty because:
    - Data is not available immediately
    - HTTP requests are asynchronous
  */
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /*
    =================================================
    WHAT IS useEffect DOING HERE?
    =================================================

    Important rule in React:
    - Components must render PURE JSX
    - No side effects during rendering

    Fetching data is a SIDE EFFECT because:
    - It talks to an external system (server)
    - It happens asynchronously
    - It can complete AFTER rendering

    useEffect:
    - Runs AFTER the component renders
    - Is the correct place for HTTP requests
  */
  useEffect(() => {
    /*
      =================================================
      OLD WAY (PROMISE CHAIN USING .then)
      =================================================

      fetch('http://localhost:3000/places')
        .then((response) => {
          return response.json(); // parse JSON
        })
        .then((resData) => {
          setAvailablePlaces(resData.places); // update state
        });

      Problems with this style:
      - Harder to read
      - Nested logic
      - Looks less like synchronous code
    */

    /*
      =================================================
      NEW WAY (ASYNC / AWAIT)
      =================================================

      What is `async`?
      ----------------
      - async is NOT a decorator
      - async marks a function as "asynchronous"
      - It makes the function ALWAYS return a Promise
      - Inside an async function:
        → `await` can be used

      What does `await` do?
      ---------------------
      - Pauses execution INSIDE the async function
      - Waits until a Promise resolves
      - Does NOT block the browser
      - Makes async code look synchronous
    */

    async function fetchPlaces() {
      /*
        fetch() returns a Promise
        await waits until the response arrives
      */
      const response = await fetch("http://localhost:3000/places");

      /*
        response.json() also returns a Promise
        await waits until JSON parsing finishes
      */
      const resData = await response.json();

      /*
        Update React state with received data
        - Triggers re-render
        - UI updates automatically
      */
      setAvailablePlaces(resData.places);
    }

    /*
      Call the async function
      - useEffect itself CANNOT be async
      - So we define async function INSIDE and call it
    */
    fetchPlaces();

    /*
      Empty dependency array []
      ------------------------
      - Effect runs ONLY ONCE
      - After initial component mount
      - Similar to componentDidMount in class components
    */
  }, []);

  /*
    Render UI using fetched data
    - First render: empty list
    - After fetch: list updates automatically
  */
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
