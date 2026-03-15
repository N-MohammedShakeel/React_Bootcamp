import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/*
  ------------------------------------------------------------
  REUSABLE MODAL COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Create a reusable modal wrapper
  - Use the native HTML <dialog> element
  - Render it outside the normal React DOM tree
*/

export default function Modal({ children, open, className = "" }) {
  /*
    ------------------------------------------------------------
    useRef FOR DIRECT DOM ACCESS
    ------------------------------------------------------------

    - dialog will store a reference to the <dialog> DOM element
    - Needed because <dialog> methods (showModal, close)
      are IMPERATIVE browser APIs
  */
  const dialog = useRef();

  /*
    ------------------------------------------------------------
    CONTROLLING THE MODAL WITH useEffect
    ------------------------------------------------------------

    Why useEffect?
    --------------
    - Opening the modal is a SIDE EFFECT
    - It should run when the "open" prop changes

    Behavior:
    ---------
    - When open === true → show the modal
    - When open === false → do nothing here
      (closing is handled externally or by form submission)
  */
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
  }, [open]);

  /*
    ------------------------------------------------------------
    PORTAL RENDERING
    ------------------------------------------------------------

    Why createPortal?
    -----------------
    - Modals should NOT be constrained by parent styles
    - They should visually sit above everything else

    createPortal:
    -------------
    - Renders JSX into a different DOM node
    - Keeps React state & context intact

    Target:
    -------
    - <div id="modal"></div> in index.html
  */
  return createPortal(
    /*
      Native <dialog> element:
      ------------------------
      - Provides built-in accessibility
      - Handles focus trapping automatically
      - showModal() opens it as a modal dialog
    */
    <dialog ref={dialog} className={`modal ${className}`}>
      {/*
        Render any content passed to Modal
        (forms, buttons, text, etc.)
      */}
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
