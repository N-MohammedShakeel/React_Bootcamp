import { useFormStatus } from "react-dom";

export default function Submit() {
  /*
    ------------------------------------------------------------
    useFormStatus — WHAT IT IS
    ------------------------------------------------------------

    useFormStatus is a React hook (React 19+)
    that provides the CURRENT STATUS of the nearest parent <form>.

    It works ONLY:
      - inside a component rendered within a <form>
      - when that form uses an action (form action or server action)

    This hook eliminates the need to manually pass
    pending/loading state down as props.
  */

  /*
    ------------------------------------------------------------
    COMPLETE SYNTAX
    ------------------------------------------------------------

    const {
      pending,
      data,
      method,
      action
    } = useFormStatus();

    Properties:
    -----------
    pending:
      - boolean
      - true while the form submission is in progress

    data:
      - FormData object
      - contains the data currently being submitted

    method:
      - HTTP method used (usually "POST")

    action:
      - reference to the action function being executed

    In this component, we only use `pending`.
  */
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      {/*
        When pending is true:
          - Disable the submit button
          - Prevent duplicate submissions
          - Show loading text
      */}
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
