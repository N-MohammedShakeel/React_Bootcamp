import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

/*
  ------------------------------------------------------------
  CHECKOUT COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Collect customer information
  - Display order total
  - Handle form submission
  - Prepare data for backend order creation
*/

export default function Checkout() {
  /*
    ------------------------------------------------------------
    CONTEXT ACCESS
    ------------------------------------------------------------

    CartContext:
    - Provides cart items and pricing

    UserProgressContext:
    - Controls whether checkout modal is visible
  */
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /*
    ------------------------------------------------------------
    TOTAL PRICE CALCULATION
    ------------------------------------------------------------

    - Same pattern used in Cart
    - Ensures price is always derived from source of truth
  */
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  /*
    ------------------------------------------------------------
    CLOSE CHECKOUT MODAL
    ------------------------------------------------------------

    - Resets progress state
    - Hides checkout modal
  */
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  /*
    ------------------------------------------------------------
    FORM SUBMISSION HANDLER
    ------------------------------------------------------------

    This function:
    - Prevents default browser form submission
    - Collects all input values using FormData
    - Converts FormData into a plain JavaScript object

    IMPORTANT:
    ----------
    - We are NOT sending the request yet
    - This step focuses only on form handling
  */
  function handleSubmit(event) {
    /*
      Prevent default browser behavior:
      --------------------------------
      - Stops page reload
      - Allows full control via JavaScript
    */
    event.preventDefault();

    /*
      Create FormData from the form element.
      event.target === <form>
    */
    const fd = new FormData(event.target);

    /*
      Convert FormData entries into a plain object.

      Example output:
      ---------------
      {
        "full-name": "John Doe",
        "email": "john@example.com",
        "street": "Main St",
        "postal-code": "12345",
        "city": "Berlin"
      }
    */
    const customerData = Object.fromEntries(fd.entries());

    /*
      At this point:
      --------------
      - customerData contains all user inputs
      - cartCtx.items contains ordered meals

      Next step (later):
      ------------------
      - Combine both
      - Send POST request to /orders
    */
  }

  return (
    /*
      ------------------------------------------------------------
      MODAL-BASED FORM
      ------------------------------------------------------------

      - Modal visibility is controlled by UserProgressContext
      - Checkout opens when progress === 'checkout'
    */
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        {/* Display total price */}
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        {/*
          ------------------------------------------------------------
          CUSTOMER INPUT FIELDS
          ------------------------------------------------------------

          Each Input:
          - Has name via id
          - Is automatically captured by FormData
        */}
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {/*
          ------------------------------------------------------------
          FORM ACTION BUTTONS
          ------------------------------------------------------------
        */}
        <p className="modal-actions">
          {/* Close without submitting */}
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>

          {/* Triggers handleSubmit */}
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
