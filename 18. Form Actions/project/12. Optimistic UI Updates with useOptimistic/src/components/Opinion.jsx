import { use, useActionState, useOptimistic } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  /*
    ------------------------------------------------------------
    CONTEXT ACCESS
    ------------------------------------------------------------

    These functions:
    - trigger async backend requests
    - update the canonical (real) application state
  */
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  /*
    ------------------------------------------------------------
    useOptimistic — CORE IDEA
    ------------------------------------------------------------

    useOptimistic enables "optimistic UI updates".

    Optimistic UI means:
    - Update the UI immediately
    - Assume the operation will succeed
    - Reconcile with the real result later

    This dramatically improves perceived performance
    for user interactions like voting, liking, saving, etc.
  */

  /*
    ------------------------------------------------------------
    useOptimistic — SYNTAX
    ------------------------------------------------------------

    const [optimisticState, optimisticUpdater] = useOptimistic(
      baseState,
      reducer
    )

    baseState:
      - The last confirmed (real) value from React state or props

    reducer:
      - Pure function
      - Describes how the optimistic value changes
      - Receives:
          1. previous optimistic value
          2. the "optimistic input" you pass
  */
  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );

  /*
    ------------------------------------------------------------
    OPTIMISTIC UPDATE FLOW
    ------------------------------------------------------------

    When a form action runs:

    1. setVotesOptimistically(...) updates the UI instantly
    2. Async request is sent to the backend
    3. One of two things happens:

       SUCCESS:
       --------
       - Backend confirms the update
       - Context updates the real votes
       - React REPLACES optimisticVotes with real votes

       FAILURE:
       --------
       - Action throws or fails
       - React automatically ROLLS BACK
       - optimisticVotes snaps back to baseState (votes)

    IMPORTANT:
    ----------
    You do NOT write rollback logic manually.
    React handles it as part of the form action lifecycle.
  */

  async function upvoteAction() {
    // Step 1: Immediate UI update
    setVotesOptimistically("up");

    // Step 2: Real async update
    await upvoteOpinion(id);

    /*
      If this throws or fails:
      - React discards the optimistic update
      - UI reverts to last confirmed state
    */
  }

  async function downvoteAction() {
    setVotesOptimistically("down");
    await downvoteOpinion(id);
  }

  /*
    ------------------------------------------------------------
    useActionState — ACTION BINDING + STATUS
    ------------------------------------------------------------

    Here:
    - We are NOT interested in returned state
    - We ONLY use:
        - formAction binding
        - pending status

    This is a valid use case.
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
        FORM IS REQUIRED FOR useOptimistic
        ------------------------------------------------------------

        Why useOptimistic works ONLY with forms:

        - React tracks optimistic updates per form submission
        - React knows when an action:
            * starts
            * succeeds
            * fails
        - This allows safe rollback and reconciliation

        Using onClick would break this lifecycle.
      */}
      <form className="votes">
        <button
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

        {/*
          IMPORTANT:
          ----------
          We render optimisticVotes, not votes.

          This value:
          - updates instantly
          - may be temporary
          - may be rolled back automatically
        */}
        <span>{optimisticVotes}</span>

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

/*

  Batch optimistic updates mean:

  - Multiple optimistic updates are queued together
  - React applies them in order
  - If one fails:
      - React rolls back ONLY the failed updates
      - Successful updates remain applied

*/
