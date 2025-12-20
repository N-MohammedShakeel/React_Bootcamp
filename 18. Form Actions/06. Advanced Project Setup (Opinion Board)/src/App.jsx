import { Header } from "./components/Header";
import { Opinions } from "./components/Opinions";
import { NewOpinion } from "./components/NewOpinion";
import { OpinionsContextProvider } from "./store/opinions-context";

/*
  Root composition:
  - Context wraps components that need opinions
  - NewOpinion will be upgraded to Form Actions
*/
function App() {
  return (
    <>
      <Header />
      <main>
        <OpinionsContextProvider>
          <NewOpinion />
          <Opinions />
        </OpinionsContextProvider>
      </main>
    </>
  );
}

export default App;
