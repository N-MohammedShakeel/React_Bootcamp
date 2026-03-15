import { createContext, useReducer } from "react";

/*
  ------------------------------------------------------------
  CART CONTEXT
  ------------------------------------------------------------

  Purpose:
  --------
  - Store cart data globally
  - Allow ANY component to:
      • add items
      • remove items
      • read cart contents

  Why Context?
  ------------
  - Cart is needed in many places (Header, Meals, Cart UI)
  - Avoids prop drilling
*/

// Default context structure (for autocomplete + safety)
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

/*
  ------------------------------------------------------------
  REDUCER FUNCTION
  ------------------------------------------------------------

  Why useReducer?
  ----------------
  - Cart logic is complex
  - Multiple related state updates
  - Reducer keeps logic centralized & predictable
*/
function cartReducer(state, action) {
  /*
    ------------------------------------------------------------
    ADD ITEM TO CART
    ------------------------------------------------------------
  */
  if (action.type === "ADD_ITEM") {
    // Check if item already exists in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      /*
        If item exists:
        - Increase quantity
      */
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      /*
        If item does NOT exist:
        - Add it with quantity = 1
      */
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  /*
    ------------------------------------------------------------
    REMOVE ITEM FROM CART
    ------------------------------------------------------------
  */
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      /*
        If quantity is 1:
        - Remove item completely
      */
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      /*
        Otherwise:
        - Decrease quantity
      */
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

/*
  ------------------------------------------------------------
  CONTEXT PROVIDER
  ------------------------------------------------------------
*/
export function CartContextProvider({ children }) {
  /*
    useReducer returns:
    - current state
    - dispatch function
  */
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  /*
    Dispatch helper functions
    -------------------------
    These are exposed to components
  */
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  /*
    Context value shared globally
  */
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
