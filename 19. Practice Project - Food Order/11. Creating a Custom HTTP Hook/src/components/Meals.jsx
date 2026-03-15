import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";

/*
  ------------------------------------------------------------
  REQUEST CONFIGURATION
  ------------------------------------------------------------

  - Empty object means:
    - Default HTTP method = GET
    - No headers or body required

  This object exists so the hook can also support:
  - POST
  - PUT
  - DELETE
  requests later
*/
const requestConfig = {};

export default function Meals() {
  /*
    ------------------------------------------------------------
    useHttp CUSTOM HOOK
    ------------------------------------------------------------

    Parameters:
    ----------
    1) URL:
       - Endpoint to fetch meals

    2) requestConfig:
       - Configuration object for fetch()
       - Empty means GET request

    3) initialData:
       - Initial value for data state
       - Empty array because meals is a list

    Returned values:
    ----------------
    - data       -> renamed to loadedMeals
    - isLoading  -> loading indicator
    - error      -> error message (if any)
  */
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  /*
    ------------------------------------------------------------
    LOADING STATE
    ------------------------------------------------------------

    While the request is in progress:
    - isLoading === true
    - Render fallback UI
  */
  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  /*
    Error handling will be added later.
    For now, we assume data exists if not loading.
  */

  /*
    ------------------------------------------------------------
    RENDER MEALS
    ------------------------------------------------------------
  */
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
