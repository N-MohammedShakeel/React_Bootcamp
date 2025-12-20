export default function Login() {
  /*
    This component renders a basic login form.

    IMPORTANT:
    ----------
    - This form is currently UNCONTROLLED
    - React is NOT managing input values yet
    - Inputs rely on the browser's default behavior

    This setup is usually the starting point before:
    - Adding refs (useRef)
    - Or converting inputs into controlled components (useState)
  */

  return (
    <form>
      {/* Form title */}
      <h2>Login</h2>

      {/* 
        control-row:
        Groups related form controls together for layout purposes
      */}
      <div className="control-row">
        <div className="control no-margin">
          {/* 
            htmlFor links the label to the input with matching id
            Improves accessibility and allows clicking the label
            to focus the input
          */}
          <label htmlFor="email">Email</label>

          {/*
            type="email":
            - Enables browser-level email validation
            - Shows email-specific keyboard on mobile devices

            name="email":
            - Used when submitting the form (FormData, backend)
          */}
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          {/*
            type="password":
            - Masks user input
            - Prevents plain-text display on screen
          */}
          <input id="password" type="password" name="password" />
        </div>
      </div>

      {/*
        Form action buttons
        -------------------
        These buttons currently rely on default browser behavior
      */}
      <p className="form-actions">
        {/*
          Reset button:
          - By default, resets all form fields to their initial values
          - Works automatically without JavaScript
        */}
        <button className="button button-flat">Reset</button>

        {/*
          Login button:
          - By default, submits the form
          - Will trigger form submission logic once added
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
