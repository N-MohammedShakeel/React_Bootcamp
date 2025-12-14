import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

const CartModal = forwardRef(function CartModal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef();

  // Expose modal API to parent
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // Portal keeps modal outside normal DOM flow
  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>

      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />

      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
