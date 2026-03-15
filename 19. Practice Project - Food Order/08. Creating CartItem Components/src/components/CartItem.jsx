import { currencyFormatter } from "../util/formatting.js";

/*
  ------------------------------------------------------------
  CART ITEM COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Display a single cart item
  - Show name, quantity and price
  - Provide buttons to increase/decrease quantity
*/

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>

      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
