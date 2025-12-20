export default function Signup() {
  /*
    ------------------------------------------------------------
    BUILT-IN + CUSTOM VALIDATION (COMBINED APPROACH)
    ------------------------------------------------------------

    IMPORTANT IDEA:
    ---------------
    Real-world forms rarely rely ONLY on built-in validation
    or ONLY on custom validation.

    Instead, we usually combine BOTH:

    1) Built-in browser validation
       - required
       - type="email"
       - minLength
       - required on checkbox / select

    2) Custom validation logic
       - Cross-field validation (password match)
       - Business rules
       - Conditional validation
       - Custom error handling / UI

    Browser validation runs FIRST.
    Custom validation runs AFTER submission starts.
  */

  function handleSubmit(event) {
    event.preventDefault();

    /*
      VERY IMPORTANT FLOW:
      --------------------

      This function executes ONLY IF:
      - All built-in browser validations pass

      If any field violates:
        - required
        - email format
        - minLength
        - required checkbox

      THEN:
        - Browser blocks submission
        - handleSubmit is NEVER called
    */

    const fd = new FormData(event.target);

    /*
      FormData automatically collects:
      - input values
      - select values
      - checked checkboxes
      - ignores unchecked checkboxes
    */
    const acquisitionChannel = fd.getAll("acquisition");

    const data = Object.fromEntries(fd.entries());

    /*
      Multiple checkboxes share the same name,
      so we manually overwrite with the array.
    */
    data.acquisition = acquisitionChannel;

    /*
      ------------------------------------------------
      CUSTOM VALIDATION LOGIC (MANUAL)
      ------------------------------------------------

      Built-in validation CANNOT:
      - Compare two different fields
      - Enforce business rules

      Example here:
      - Password and confirm-password must match

      This check runs ONLY AFTER browser validation passes.
    */
    if (data.password !== data["confirm-password"]) {
      /*
        setPasswordsAreNotEqual is assumed to be
        a state setter controlling UI feedback.

        It is NOT shown here intentionally.
        The focus is on WHEN and WHY custom validation runs.
      */
      setPasswordsAreNotEqual(true);
      return;
    }

    /*
      If execution reaches here:
      - Built-in validation passed
      - Custom validation passed
      - Data is safe to send to backend
    */
    console.log(data);
  }

  return (
    /*
      FORM VALIDATION STRATEGY USED HERE:
      ----------------------------------
      - Inputs are UNCONTROLLED
      - Browser handles basic validation
      - JavaScript handles advanced validation
      - FormData collects values at submit time
    */
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>

        {/*
          BUILT-IN VALIDATION:
          -------------------
          type="email":
            - Browser validates email format

          required:
            - Field must not be empty
        */}
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>

          {/*
            BUILT-IN VALIDATION:
            -------------------
            required:
              - Field must be filled

            minLength={6}:
              - Browser enforces minimum length
          */}
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>

          {/*
            BUILT-IN VALIDATION:
            -------------------
            required:
              - Ensures value is provided

            LIMITATION:
            -----------
            Browser CANNOT verify that this
            matches the password field.

            That is why custom validation is required
            inside handleSubmit.
          */}
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>

          {/* required blocks empty submission */}
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>

        {/*
          required on <select>:
          - Ensures user chooses an option
        */}
        <select id="role" name="role" required>
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
          Checkboxes are OPTIONAL here.
          Multiple selections handled via FormData.getAll().
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
            required on checkbox:
            - User MUST agree before submitting
          */}
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/*
          reset:
          - Clears browser values
          - Clears browser validation state
        */}
        <button type="reset" className="button button-flat">
          Reset
        </button>

        {/*
          submit:
          - Triggers browser validation FIRST
          - Calls handleSubmit ONLY if valid
        */}
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
