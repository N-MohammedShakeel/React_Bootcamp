import { createContext } from "react";

// CartContext:
// - Created using createContext()
// - Holds shared cart-related data
// - Default value is used only if a component consumes the context without a Provider
export const CartContext = createContext({
  items: [],
});
