import { useActionState } from "react";

export function NewOpinion() {
  /*
    ------------------------------------------------------------
    FORM ACTION FUNCTION
    ------------------------------------------------------------

    This function is executed automatically when the form is
    submitted because it is assigned to the <form action={...}>.

    Signature with useActionState:
      (prevState, formData) => newState

    - prevState:
        The previous state returned by this action.
        Useful when you want to build on existing state.

    - formData:
        Native browser FormData object.
        Contains all form field values by their "name" attribute.
  */
  function shareOpinionAction(prevState, formData) {
    // Read submitted values from the form
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    /*
      Validation errors are collected in an array.
      This allows us to show multiple errors at once.
    */
    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must be at least five characters long.");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long.");
    }

    if (!userName.trim()) {
      errors.push("Please provide your name.");
    }

    /*
      IMPORTANT:
      ----------
      - Form actions reset form fields by default
      - To preserve user input on validation errors,
        we must explicitly return the entered values
    */
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    /*
      At this point:
      - Validation passed
      - Next step would be submitting data to the backend

      (Backend submission will be added later)
    */

    return { errors: null };
  }

  /*
    ------------------------------------------------------------
    useActionState HOOK
    ------------------------------------------------------------

    Syntax:
      const [state, actionFn] = useActionState(action, initialState)

    - state:
        Holds the latest value returned by the action

    - actionFn:
        Wrapped version of the action function
        Must be passed to the form's `action` attribute

    - initialState:
        Initial value for state before first submission
  */
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>

      {/*
        ------------------------------------------------------------
        FORM WITH ACTION
        ------------------------------------------------------------

        Instead of onSubmit:
          <form onSubmit={...}>

        We use:
          <form action={formAction}>

        React intercepts the submit event and:
        - prevents page reload
        - calls the action function
        - updates formState with returned data
      */}
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>

            {/*
              defaultValue is required because:
              - Form actions reset fields by default
              - We want to repopulate fields after validation errors
            */}
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>

        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {/*
          ------------------------------------------------------------
          ERROR DISPLAY
          ------------------------------------------------------------

          When the action returns { errors },
          formState.errors becomes available and triggers a re-render.
        */}
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
