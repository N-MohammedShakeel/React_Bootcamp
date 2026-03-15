import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";

/*
  ------------------------------------------------------------
  ROOT APPLICATION COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Acts as the top-level component
  - Wires global providers (Context)
  - Defines the main application layout
*/

function App() {
  return (
    /*
      ------------------------------------------------------------
      CART CONTEXT PROVIDER
      ------------------------------------------------------------

      Why wrap components with CartContextProvider?
      ---------------------------------------------
      - Any component INSIDE this provider tree can:
          • access cart items
          • add items to cart
          • remove items from cart

      Components that need cart data:
      -------------------------------
      - Header   → show total cart count
      - Meals    → contains MealItem → add to cart

      IMPORTANT:
      ----------
      If a component is NOT wrapped by the provider:
      - useContext(CartContext) will return DEFAULT values
      - Cart functionality will NOT work
    */
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
