export default function Input({ label, id, error, ...props }) {
  /*
    ------------------------------------------------------------
    REUSABLE INPUT COMPONENT
    ------------------------------------------------------------

    PURPOSE:
    --------
    This component abstracts a common input pattern:
      - label
      - input field
      - error message display

    This avoids:
      - Repeating the same JSX structure
      - Duplicating error UI logic
      - Inconsistent styling across inputs

    PARAMETERS:
    -----------
    label:
      - Text shown inside <label>

    id:
      - Used for both <label htmlFor> and <input id>
      - Links label and input for accessibility

    error:
      - Error message to display (string or false/undefined)

    ...props:
      - Collects ALL remaining props
      - Forwards them to the <input> element
      - Makes this component flexible and reusable
  */

  return (
    <div className="control no-margin">
      {/* Label linked to input via id */}
      <label htmlFor={id}>{label}</label>

      {/*
        {...props} forwards things like:
          - type
          - name
          - value
          - onChange
          - onBlur

        This allows the parent component
        to fully control input behavior.
      */}
      <input id={id} {...props} />

      {/*
        Error container:
        - Only renders message if error exists
        - Keeps layout consistent even when no error
      */}
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
