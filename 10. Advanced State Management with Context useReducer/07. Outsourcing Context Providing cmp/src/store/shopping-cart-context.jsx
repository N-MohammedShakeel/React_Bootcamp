import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

/*
  CartContext
  - Defines the shape of the shared cart data & actions
  - Default values are for:
    ✔ IDE auto-completion
    ✔ Safer usage outside a provider (dev-time only)
*/
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

/*
  CartContextProvider
  - Owns ALL cart-related state
  - Contains ALL cart-related business logic
  - Provides state + actions to the entire component tree
*/
export default function CartContextProvider({ children }) {
  // Centralized cart state
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  /*
    Adds a product to the cart
    - Increases quantity if item exists
    - Otherwise adds a new cart item
  */
  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        updatedItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return { items: updatedItems };
    });
  }

  /*
    Updates quantity of a cart item
    - Removes item if quantity becomes 0
  */
  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = { ...updatedItems[updatedItemIndex] };
      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return { items: updatedItems };
    });
  }

  /*
    Context value
    - Combines state + actions
    - Any descendant can access these via useContext
  */
  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
