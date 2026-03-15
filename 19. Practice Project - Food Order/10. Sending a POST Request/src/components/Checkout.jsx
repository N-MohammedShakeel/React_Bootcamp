import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

/*
  ------------------------------------------------------------
  CHECKOUT COMPONENT — ORDER SUBMISSION
  ------------------------------------------------------------

  New in this step:
  ----------------
  - Sending POST request to backend
  - Combining cart data + customer data
  - Using fetch with JSON payload
*/

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /*
    ------------------------------------------------------------
    CART TOTAL (DERIVED STATE)
    ------------------------------------------------------------
  */
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  /*
    ------------------------------------------------------------
    CLOSE CHECKOUT MODAL
    ------------------------------------------------------------
  */
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  /*
    ------------------------------------------------------------
    FORM SUBMISSION HANDLER
    ------------------------------------------------------------

    This function now:
    - Prevents default browser behavior
    - Collects customer input
    - Sends a POST request to the backend
  */
  function handleSubmit(event) {
    event.preventDefault();

    /*
      ------------------------------------------------------------
      EXTRACT FORM DATA
      ------------------------------------------------------------

      - event.target is the <form>
      - FormData reads all inputs using their "name" attribute
    */
    const fd = new FormData(event.target);

    /*
      Convert FormData into a plain object
      Example:
      --------
      {
        name: "John",
        email: "john@test.com",
        street: "Main St",
        "postal-code": "12345",
        city: "Berlin"
      }
    */
    const customerData = Object.fromEntries(fd.entries());

    /*
      ------------------------------------------------------------
      SEND POST REQUEST
      ------------------------------------------------------------

      Endpoint:
      ---------
      POST http://localhost:3000/orders

      Backend expects:
      ----------------
      {
        order: {
          items: [...],
          customer: {...}
        }
      }
    */
    fetch("http://localhost:3000/orders", {
      method: "POST",

      /*
        Content-Type:
        -------------
        Tells backend that request body contains JSON
      */
      headers: {
        "Content-Type": "application/json",
      },

      /*
        Body:
        -----
        - Must be a JSON string
        - Combines cart items + customer data
      */
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });

    /*
      At this stage:
      -------------
      - No loading state
      - No error handling
      - No success feedback

      These will be added in the next steps.
    */
  }

  return (
    /*
      ------------------------------------------------------------
      CHECKOUT FORM INSIDE MODAL
      ------------------------------------------------------------
    */
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        {/* Display derived total */}
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        {/*
          ------------------------------------------------------------
          CUSTOMER INPUT FIELDS
          ------------------------------------------------------------

          IMPORTANT:
          ----------
          - id is used for label association
          - name is implicitly set via Input component
          - name is required for FormData
        */}
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {/*
          ------------------------------------------------------------
          ACTION BUTTONS
          ------------------------------------------------------------
        */}
        <p className="modal-actions">
          {/* Close without submitting */}
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>

          {/* Submits the form */}
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
