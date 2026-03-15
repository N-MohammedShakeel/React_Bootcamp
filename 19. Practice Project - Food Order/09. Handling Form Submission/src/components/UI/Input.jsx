/*
  ------------------------------------------------------------
  INPUT COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Reusable form input wrapper
  - Enforces consistent structure & styling
  - Reduces repetition in forms

  Design choice:
  --------------
  - Uses <p className="control"> to match existing CSS
  - Accepts all native input props via ...props
*/

export default function Input({ label, id, ...props }) {
  return (
    <p className="control">
      {/* Associate label with input using htmlFor */}
      <label htmlFor={id}>{label}</label>

      {/*
        name={id}:
        ----------
        - Required for FormData
        - FormData uses the "name" attribute as the key

        required:
        ---------
        - Enables native browser validation
        - Prevents form submission if empty
      */}
      <input id={id} name={id} required {...props} />
    </p>
  );
}
