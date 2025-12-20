export default function Signup() {
  /*
    ------------------------------------------------------------
    HANDLING COMPLEX FORMS USING BROWSER APIs
    ------------------------------------------------------------

    For large forms with:
    - many inputs
    - checkboxes
    - selects
    - grouped fields

    managing each input with useState or useRef becomes verbose.

    In such cases, the browser's built-in FormData API
    provides a clean and scalable solution.
  */

  function handleSubmit(event) {
    event.preventDefault();

    /*
      event.target refers to the <form> element
      that triggered the submit event.

      FormData constructor:
      ---------------------
      new FormData(formElement)

      - Automatically reads ALL form fields
      - Uses the "name" attribute as the key
      - Works with inputs, selects, checkboxes, radio buttons
      - Skips disabled inputs
    */
    const fd = new FormData(event.target);

    /*
      fd.getAll(name):
      ----------------
      - Returns ALL values for fields with the same name
      - Required for checkboxes or multi-select fields

      In this form:
        name="acquisition" appears multiple times
        (Google, Friend, Other)
    */
    const acquisitionChannel = fd.getAll("acquisition");

    /*
      fd.entries():
      -------------
      - Returns an iterator of key-value pairs
      - Each pair is [name, value]

      Object.fromEntries():
      ---------------------
      - Converts iterable key-value pairs into a plain object
      - Makes the data easier to work with in JavaScript
    */
    const data = Object.fromEntries(fd.entries());

    /*
      Since fd.entries() only keeps the LAST value
      for duplicate keys, we manually overwrite
      acquisition with the full array.
    */
    data.acquisition = acquisitionChannel;

    // Final collected and structured form data
    console.log(data);
  }

  return (
    /*
      This form:
      - Uses UNCONTROLLED inputs
      - Relies entirely on browser-managed values
      - Reads all data at submission time using FormData
    */
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>

        {/*
          name="email":
          - Required for FormData to capture this value
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
          <select> values are automatically captured
          by FormData using the selected option's value
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
          Multiple checkboxes share the same name="acquisition"
          This is why fd.getAll("acquisition") is required
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
          {/*
            Checkbox without value attribute:
            - Value defaults to "on" when checked
            - Not included at all if unchecked
          */}
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/*
          type="reset":
          - Clears all browser-managed inputs
          - Works automatically with FormData approach
        */}
        <button type="reset" className="button button-flat">
          Reset
        </button>

        {/*
          type="submit":
          - Triggers onSubmit
          - FormData collects all values at once
        */}
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
