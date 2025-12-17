import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/*
  =================================================
  WHY useEffect IS REQUIRED HERE
  =================================================

  - <dialog> is a native DOM element
  - showModal() / close() are IMPERATIVE DOM APIs
  - React cannot call them automatically

  useEffect is used to:
  - Observe the `open` prop (React state)
  - Imperatively sync the DOM when state changes
*/

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    /*
      This effect acts as a BRIDGE:

      React State (open)
           ↓
      useEffect detects change
           ↓
      Native DOM API (showModal / close)
    */
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }

    // Effect re-runs whenever `open` changes
  }, [open]);

  return createPortal(
    <dialog
      className="modal"
      ref={dialog}
      onClose={onClose} // Handles ESC key / native close
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
