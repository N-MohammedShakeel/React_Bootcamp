import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Cart({ onUpdateItemQuantity }) {
  // useContext (STANDARD – works in old & new React versions):
  // - Simplest and most common way to consume context
  // - Can only be used inside React components
  // - Automatically subscribes to context updates
  const { items } = useContext(CartContext);

  /*
  Alternative (NEW React versions – flexible):

  import { use } from 'react';

  const { items } = use(CartContext);

  use():
  - Newer API
  - More flexible (can be used in async / server components)
  - Replaces useContext in modern React
  - Still not available in older React versions
  */

  /*
  Context.Consumer (NON-STANDARD / LEGACY):
  
  <CartContext.Consumer>
    {(cartCtx) => {
      return <div>{cartCtx.items.length}</div>;
    }}
  </CartContext.Consumer>

  - Works without hooks
  - Verbose and harder to read
  - Rarely used in modern React
  - Mostly kept for backward compatibility
  */

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}

      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
