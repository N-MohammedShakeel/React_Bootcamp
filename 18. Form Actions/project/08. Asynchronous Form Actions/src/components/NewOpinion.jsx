import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  /*
    ------------------------------------------------------------
    use() WITH CONTEXT (React 19)
    ------------------------------------------------------------

    use() is a React 19 API that can consume:
      - Context
      - Promises
      - Async resources

    Here, it replaces useContext.

    This gives us access to:
      - addOpinion: a function that performs an async POST request
  */
  const { addOpinion } = use(OpinionsContext);

  /*
    ------------------------------------------------------------
    ASYNC FORM ACTION
    ------------------------------------------------------------

    This action is now ASYNCHRONOUS.

    That means:
      - React will wait for this function to finish
      - During the await, the action is considered "pending"
      - Once resolved, the returned value becomes the new form state

    Signature remains the same:
      async (prevState, formData) => newState
  */
  async function shareOpinionAction(prevState, formData) {
    // Extract submitted values from FormData
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    let errors = [];

    // Synchronous validation still happens FIRST
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
      If validation fails:
      - We return immediately
      - Async submission does NOT happen
      - Form fields are repopulated using enteredValues
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
      ------------------------------------------------------------
      ASYNC SIDE EFFECT (BACKEND SUBMISSION)
      ------------------------------------------------------------

      addOpinion:
        - Sends POST request to backend
        - Waits for server response
        - Updates global opinions state via context

      Because this is awaited:
        - React treats the action as pending
        - isPending (if used) would be true here
    */
    await addOpinion({ title, body, userName });

    /*
      Returning a new state after async completion:
      - errors: null → clears validation errors
      - form resets naturally after successful submit
    */
    return { errors: null };
  }

  /*
    ------------------------------------------------------------
    useActionState WITH ASYNC ACTION
    ------------------------------------------------------------

    FULL SYNTAX (not fully used here):
      const [state, action, isPending] = useActionState(...)

    In this component:
      - formState → latest returned state
      - formAction → bound async action function

    isPending EXISTS but is not destructured here.
  */
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>

      {/*
        ------------------------------------------------------------
        FORM USING ASYNC ACTION
        ------------------------------------------------------------

        On submit:
          1. Browser collects FormData
          2. React calls shareOpinionAction
          3. Await addOpinion()
          4. State updates from return value
      */}
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>

            {/*
              defaultValue is required because:
              - Form actions reset fields after submission
              - We want to preserve values on validation failure
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
          Validation errors returned by the action
          are rendered automatically on re-render.
        */}
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          {/*
            If isPending were used here:
              - button could be disabled
              - text could change to "Submitting..."
          */}
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
