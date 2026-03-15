import { useContext } from "react";

import Button from "./UI/Button.jsx";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

/*
  ------------------------------------------------------------
  HEADER COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Display app branding
  - Show cart button with item count
  - Open cart modal when clicked
*/

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /*
    ------------------------------------------------------------
    TOTAL ITEM COUNT
    ------------------------------------------------------------

    - Sum up quantities of all cart items
    - Used for display only
  */
  const totalCartItems = cartCtx.items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
    0
  );

  /*
    ------------------------------------------------------------
    SHOW CART HANDLER
    ------------------------------------------------------------

    - Updates progress state to 'cart'
    - Cart modal becomes visible
  */
  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>

      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
