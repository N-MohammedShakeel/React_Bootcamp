import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";

/*
  ------------------------------------------------------------
  MEALS COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Fetch available meals from the backend
  - Hold meals data in state
  - Delegate rendering of each meal to MealItem

  This keeps responsibilities clear:
  - Meals      → data fetching & list rendering
  - MealItem   → presentation of a single meal
*/

export default function Meals() {
  /*
    Holds all fetched meals.
    Initialized as an empty array because the backend returns a list.
  */
  const [loadedMeals, setLoadedMeals] = useState([]);

  /*
    ------------------------------------------------------------
    FETCH MEALS ON COMPONENT MOUNT
    ------------------------------------------------------------

    useEffect is used because:
    - Fetching data is a side effect
    - We want this to happen only once
  */
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        // Error handling will be added later
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  /*
    ------------------------------------------------------------
    RENDER MEALS LIST
    ------------------------------------------------------------

    Each meal object is passed to MealItem.
    The key is required for React list rendering.
  */
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
