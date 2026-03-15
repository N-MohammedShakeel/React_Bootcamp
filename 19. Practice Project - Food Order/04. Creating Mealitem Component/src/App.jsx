import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";

/*
  Root component:
  - Layout only
  - No business logic
*/

function App() {
  return (
    <>
      <Header />
      <Meals />
    </>
  );
}

export default App;
