export default function Signup() {
  /*
    ------------------------------------------------------------
    FORM ACTION — DEFAULT BROWSER BEHAVIOR vs REACT v19+
    ------------------------------------------------------------

    TRADITIONAL HTML FORM BEHAVIOR:
    -------------------------------
    - <form action="URL"> tells the browser WHERE to send the form
    - On submit:
        • Browser collects form data
        • Sends an HTTP request to the URL in `action`
        • Page reloads with server response
    - If action is omitted:
        • Form submits to the current page URL
        • Page reload still happens

    In traditional HTML:
      action = string (URL)
      method = GET / POST
  */

  /*
    REACT v19+ FORM ACTION BEHAVIOR:
    -------------------------------
    React v19+ allows:
      action={function}

    When action is a FUNCTION:
      - React intercepts the form submission
      - Browser does NOT perform a page reload
      - Form data is collected automatically
      - The function is called with a FormData object

    This enables:
      - Declarative form handling
      - No manual preventDefault()
      - No onSubmit handler required
  */

  /*
    This function is used as a FORM ACTION.

    IMPORTANT:
    ----------
    - React automatically passes a FormData object
    - No event parameter
    - No event.preventDefault()
    - Runs only when form is submitted
  */
  function signupAction(formData) {
    /*
      formData is an instance of the browser FormData API.

      It contains:
        - All inputs with a name attribute
        - Selected values
        - Checked checkboxes
    */

    const enteredEmail = formData.get("email");

    // Custom logic (API call, validation, etc.) goes here
    console.log(enteredEmail);
  }

  return (
    /*
      FORM ACTION IN THIS COMPONENT:
      ------------------------------
      action={signupAction}

      Meaning in React v19+:
        - This is NOT a URL
        - This is a JavaScript function
        - React handles submission internally
        - Browser default submission is bypassed
    */
    <form action={signupAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>

        {/*
          name="email" is REQUIRED:
          - FormData uses name attributes as keys
          - Without name, value is ignored
        */}
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>

        {/*
          Select values are also included in FormData
        */}
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>

        {/*
          Multiple checkboxes with same name:
          - FormData.getAll("acquisition") can be used
        */}
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/*
          type="reset":
          - Resets browser-managed inputs
          - Works automatically with FormData
        */}
        <button type="reset" className="button button-flat">
          Reset
        </button>

        {/*
          Submit button:
          - Triggers React action function
          - No page reload
          - No preventDefault needed
        */}
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
