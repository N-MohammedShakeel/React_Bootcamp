import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

function App() {
  // Central cart state lives in App
  // This will later move into Context + Reducer
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  // Adds product or increases quantity
  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        // Update quantity if item already exists
        updatedItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
      } else {
        // Add new item to cart
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return { items: updatedItems };
    });
  }

  // Updates quantity (+ / -)
  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = { ...updatedItems[updatedItemIndex] };
      updatedItem.quantity += amount;

      // Remove item if quantity reaches 0
      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1); // splice method used to remove item from array, Syntax: array.splice(start, deleteCount)
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return { items: updatedItems };
    });
  }

  return (
    <>
      {/* Cart state & handlers passed down via props (prop drilling) */}
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />

      <Shop onAddItemToCart={handleAddItemToCart} />
    </>
  );
}

export default App;
