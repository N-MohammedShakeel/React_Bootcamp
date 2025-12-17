import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/*
  Modal responsibility:
  - React controls WHEN modal should be open
  - useEffect synchronizes that state with <dialog> DOM API
*/

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // Re-run effect whenever open changes

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* 
        Conditional rendering ensures:
        - DeleteConfirmation mounts ONLY when modal is open
        - Cleanup runs when modal closes
      */}
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
