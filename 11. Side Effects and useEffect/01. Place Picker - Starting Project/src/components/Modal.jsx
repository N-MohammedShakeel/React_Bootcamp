import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  /*
    Imperative Handle:
    - Exposes methods that trigger DOM side effects
    - Parent controls modal without state
  */
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal(); // DOM side effect
      },
      close() {
        dialog.current.close(); // DOM side effect
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
