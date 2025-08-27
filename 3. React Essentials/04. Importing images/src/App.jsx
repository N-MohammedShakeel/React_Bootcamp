// **Why Import Images Dynamically?**
// - Importing images (or assets) in React allows the build tool (e.g., Vite, Webpack) to process and optimize them.
// - Ensures assets are bundled correctly, with proper paths resolved for production (e.g., hashed filenames).
// - Avoids broken paths when deploying (unlike direct paths like 'src/assets/...').

// **Usage of Importing Images**
// - Use ES module import syntax to bring the image into JS as a variable (reactImg).
// - Reference the imported variable in JSX (e.g., src={reactImg}) for dynamic, reliable asset loading.
import reactImg from "./assets/react-core-concepts.png";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const description = reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
