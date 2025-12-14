import { createContext } from "react";

// Initial structure:
// - Used only for auto-completion & type safety
// - NOT real data (real data comes from Provider value)
// - Helps IDEs suggest correct properties in consumers
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
});
