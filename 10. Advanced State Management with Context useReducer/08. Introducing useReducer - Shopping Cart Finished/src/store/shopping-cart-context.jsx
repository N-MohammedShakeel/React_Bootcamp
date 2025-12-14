import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

/*
  ================================
  WHAT IS useReducer?
  ================================

  useReducer is a React Hook used to manage state
  when state logic becomes COMPLEX.

  Instead of:
    - updating state directly (useState)
    - spreading logic across many functions

  useReducer:
    - Centralizes all state updates in ONE place (the reducer)
    - Uses actions to describe WHAT happened
    - Calculates the next state based on the current state + action

  Think of it as:
    state machine for your component
*/

/*
  ================================
  WHY useReducer INSTEAD OF useState?
  ================================

  useState is great for:
    ✔ simple values
    ✔ isolated updates

  useReducer is better when:
    ✔ state has multiple related values
    ✔ updates depend on previous state
    ✔ many ways exist to update the same state
    ✔ logic must be predictable and scalable
    ✔ using Context (avoids prop drilling)

  Cart logic is a PERFECT example of this.
*/

/*
  CartContext
  - Defines WHAT data and actions are available to consumers
  - Default values are mainly for:
    ✔ auto-completion
    ✔ documentation
*/
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

/*
  ================================
  REDUCER FUNCTION
  ================================

  A reducer is:
    ✔ a pure function
    ✔ receives current state + action
    ✔ returns the NEXT state
    ✔ never mutates state directly

  Signature:
    (state, action) => newState
*/
function shoppingCartReducer(state, action) {
  /*
    Action object structure:
    {
      type: string,        // what happened
      payload: any         // data needed to update state
    }
  */

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );

      updatedItems.push({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return { items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
      quantity: updatedItems[updatedItemIndex].quantity + action.payload.amount,
    };

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return { items: updatedItems };
  }

  // Reducers MUST return state for unknown actions
  return state;
}

/*
  ================================
  CONTEXT PROVIDER + useReducer
  ================================

  The provider:
    ✔ owns the cart state
    ✔ exposes state + actions via context
    ✔ replaces multiple useState calls

  This makes App.jsx lean and clean.
*/
export default function CartContextProvider({ children }) {
  /*
    useReducer returns:
    1️⃣ state   → current cart state
    2️⃣ dispatch → function to trigger updates

    React guarantees state updates are predictable
  */
  const [shoppingCartState, dispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  /*
    Instead of setState,
    we DISPATCH actions describing what happened
  */
  function handleAddItemToCart(id) {
    dispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    dispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  /*
    Context exposes:
    ✔ current state
    ✔ functions that dispatch actions
  */
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
