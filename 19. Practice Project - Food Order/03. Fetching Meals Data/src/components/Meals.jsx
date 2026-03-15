import { useState, useEffect } from "react";

/*
  ------------------------------------------------------------
  MEALS COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Fetch available meals from the backend
  - Store them in component state
  - Render a list of meals

  This component introduces:
  - useEffect for side effects
  - async data fetching
  - state-driven rendering
*/

export default function Meals() {
  /*
    State to store fetched meals.

    Initial value:
    - Empty array, because we expect a list of meals

    Once data is fetched:
    - setLoadedMeals updates this state
    - Component re-renders automatically
  */
  const [loadedMeals, setLoadedMeals] = useState([]);

  /*
    ------------------------------------------------------------
    DATA FETCHING WITH useEffect
    ------------------------------------------------------------

    useEffect is used because:
    - Fetching data is a SIDE EFFECT
    - We want to run it AFTER the component renders
    - We do NOT want it to run on every re-render
  */
  useEffect(() => {
    /*
      Async function defined INSIDE useEffect
      because:
      - useEffect itself cannot be async
    */
    async function fetchMeals() {
      /*
        Send HTTP GET request to backend
        Endpoint: /meals
      */
      const response = await fetch("http://localhost:3000/meals");

      /*
        Basic error handling placeholder.
        In later steps, this will be expanded.
      */
      if (!response.ok) {
        // handle error (later)
      }

      /*
        Parse JSON response body
      */
      const meals = await response.json();

      /*
        Store fetched meals in state
        Triggers a re-render
      */
      setLoadedMeals(meals);
    }

    /*
      Invoke the async function
    */
    fetchMeals();

    /*
      Dependency array:
      -----------------
      - Empty array means:
          run this effect ONLY once
          when the component mounts
    */
  }, []);

  /*
    ------------------------------------------------------------
    RENDERING MEALS
    ------------------------------------------------------------

    - Map over loadedMeals
    - Each list item must have a unique key
  */
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
