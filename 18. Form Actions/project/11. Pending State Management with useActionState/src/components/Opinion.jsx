import { use, useActionState } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  /*
    ------------------------------------------------------------
    CONTEXT ACCESS
    ------------------------------------------------------------

    We get the vote-related functions from context.
    These functions:
      - perform async backend calls
      - update client-side state
  */
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  /*
    ------------------------------------------------------------
    ACTION FUNCTIONS (NO FORM DATA)
    ------------------------------------------------------------

    These actions:
      - do NOT read FormData
      - do NOT return any UI state
      - exist purely to trigger side effects

    This is a valid and common use case for useActionState.
  */
  async function upvoteAction() {
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    await downvoteOpinion(id);
  }

  /*
    ------------------------------------------------------------
    useActionState WITHOUT INITIAL STATE
    ------------------------------------------------------------

    Full syntax:
      const [state, action, pending] = useActionState(actionFn, initialState?)

    IMPORTANT:
    ----------
    - initialState is OPTIONAL
    - If you are NOT managing form-related state,
      you can:
        ✔ pass null
        ✔ OR omit it entirely

    Here:
      - state is unused
      - pending is the only thing we care about
  */
  const [upvoteFormState, upvoteFormAction, upvotePending] =
    useActionState(upvoteAction);

  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>

      <p>{body}</p>

      {/*
        ------------------------------------------------------------
        MULTIPLE ACTIONS IN A SINGLE FORM
        ------------------------------------------------------------

        - Each button has its own formAction
        - Each action has its own pending state
        - We coordinate them to prevent race conditions
      */}
      <form className="votes">
        <button
          /*
            Disable button while ANY vote is in progress.
            This avoids:
              - double submits
              - vote spamming
              - inconsistent UI state
          */
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{votes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
