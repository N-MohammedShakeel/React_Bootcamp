export default function Login() {
  /*
    This function handles form submission.

    By default, when a form is submitted:
    ------------------------------------
    - The browser sends a request to the server
    - The page reloads
    - All JavaScript state is lost

    In React (and modern SPAs), we usually want to:
    - Handle submission using JavaScript
    - Validate input values
    - Send data using fetch / axios
    - Stay on the same page (no reload)
  */
  function handleSubmit(event) {
    /*
      event is a SyntheticEvent provided by React.
      It wraps the native browser event and works
      consistently across browsers.
    */

    /*
      event.preventDefault():
      -----------------------
      Stops the browser's default form submission behavior.

      Without preventDefault():
      - Browser reloads the page
      - Console log never appears (page refresh)
      - React app state is reset

      With preventDefault():
      - Page does NOT reload
      - React stays in control
      - We can run custom logic (validation, API calls)
    */
    event.preventDefault();

    // Custom form submission logic goes here
    console.log("Submitted!");
  }

  return (
    /*
      onSubmit is attached to the <form>, NOT the button.

      Why?
      ----
      - Pressing Enter triggers form submission
      - Clicking any submit-type button triggers submission
      - Centralized and accessible submission handling
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/*
            name attribute:
            - Used when collecting form data
            - Important for FormData API
          */}
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        {/*
          Reset button:
          - Resets input fields to initial values
          - Uses browser's default behavior
          - Does NOT trigger onSubmit
        */}
        <button className="button button-flat">Reset</button>

        {/*
          Login button:
          - Defaults to type="submit"
          - Triggers the form's onSubmit handler
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
