// Instead of handling form submission manually with onSubmit,
// React's useActionState allows us to attach an action directly to the form
// and automatically manage submission state (like pending/loading).
import { useContext, useActionState } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // CHANGED: Removed "isLoading" from useHttp
  // Reason: The loading state will now be handled by useActionState instead of useHttp.
  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  // CHANGED: Replaced the old handleSubmit(event) function with an Action function
  // Old approach:
  // - handleSubmit(event)
  // - event.preventDefault()
  // - new FormData(event.target)
  //
  // New approach:
  // - React automatically passes FormData to the action function
  // - No need for preventDefault
  // - No need to manually read event.target
  //
  // Parameters received automatically:
  // prevState -> previous state returned from this action (not used here)
  // fd -> FormData from the form submission
  async function checkoutAction(prevState, fd) {
    // CHANGED: FormData is directly provided by React
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  }

  // CHANGED: useActionState replaces manual submit handling
  // Returns:
  // formState  -> state returned by the action (not used here yet)
  // formAction -> function assigned to <form action={...}>
  // isSending  -> pending submission state (loading indicator)
  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null,
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // CHANGED: Loading state now comes from useActionState instead of useHttp
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      {/* CHANGED: Form now uses "action" instead of "onSubmit"
         Before: <form onSubmit={handleSubmit}>
         After:  <form action={formAction}>

         Reason:
         React automatically executes the action function when the form submits.
         This removes the need for manual event handling.
      */}
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
