import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";

/*
  ------------------------------------------------------------
  ROOT APPLICATION COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Acts as the main composition layer
  - Combines Header and Meals components
  - Keeps layout simple and readable
*/

function App() {
  return (
    <>
      {/*
        Header:
        -------
        - Static UI
        - No data fetching
      */}
      <Header />

      {/*
        Meals:
        ------
        - Fetches data from backend
        - Displays dynamic content
      */}
      <Meals />
    </>
  );
}

export default App;
