import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  /*
    ------------------------------------------------------------
    CONTEXT ACCESS VIA use()
    ------------------------------------------------------------

    use() is a React 19 API that can consume:
      - Context
      - Promises
      - Async resources

    Here it replaces useContext and gives us:
      - addOpinion → async function that sends data to backend
  */
  const { addOpinion } = use(OpinionsContext);

  /*
    ------------------------------------------------------------
    ASYNC FORM ACTION
    ------------------------------------------------------------

    This action:
      - performs synchronous validation
      - performs async side effects (API call)
      - returns state that drives UI updates

    IMPORTANT:
    ----------
    Even though this action is async,
    we are NOT using isPending from useActionState.

    Instead, we will use useFormStatus.
  */
  async function shareOpinionAction(prevState, formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

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
      Async backend submission.
      While this is running:
        - The form is considered "pending"
        - useFormStatus().pending becomes true
    */
    await addOpinion({ title, body, userName });

    return { errors: null };
  }

  /*
    ------------------------------------------------------------
    useActionState (STATE + ACTION ONLY)
    ------------------------------------------------------------

    Full syntax:
      const [state, action, isPending] = useActionState(...)

    In this component:
      - We intentionally ignore isPending
      - Pending state is handled by useFormStatus instead
  */
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>

      {/*
        ------------------------------------------------------------
        FORM BOUND TO ACTION
        ------------------------------------------------------------

        All child components inside this <form>
        can access its submission state via useFormStatus.
      */}
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
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

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/*
          Submit button extracted into a separate component.
          This is where useFormStatus is used.
        */}
        <Submit />
      </form>
    </div>
  );
}
