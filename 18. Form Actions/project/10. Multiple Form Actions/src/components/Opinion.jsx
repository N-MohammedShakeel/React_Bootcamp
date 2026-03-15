export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  /*
    ------------------------------------------------------------
    MULTIPLE FORM ACTIONS — CORE IDEA
    ------------------------------------------------------------

    In React 19+, a single <form> can trigger
    DIFFERENT actions depending on which button is clicked.

    This is achieved using:
      button formAction={someAction}

    Each button can:
      - Bypass the form's default action
      - Execute its own dedicated action function
  */

  /*
    ------------------------------------------------------------
    UPVOTE ACTION
    ------------------------------------------------------------

    This function is executed ONLY when:
      - The upvote button is clicked

    IMPORTANT:
    ----------
    - No event object
    - No preventDefault()
    - React intercepts the submission
    - Browser does NOT reload the page
  */
  function upvoteAction() {
    console.log("UPVOTE");
  }

  /*
    ------------------------------------------------------------
    DOWNVOTE ACTION
    ------------------------------------------------------------

    Same rules apply:
      - Triggered only by its corresponding button
      - Completely independent of upvoteAction
  */
  function downvoteAction() {
    console.log("DOWNVOTE");
  }

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>

      <p>{body}</p>

      {/*
        ------------------------------------------------------------
        SINGLE FORM — MULTIPLE ACTIONS
        ------------------------------------------------------------

        This <form> does NOT define an action attribute.

        Instead:
          - Each button defines its own formAction
          - React figures out which action to execute
      */}
      <form className="votes">
        {/*
          ------------------------------------------------------------
          UPVOTE BUTTON
          ------------------------------------------------------------

          formAction={upvoteAction} means:
            - Clicking this button submits the form
            - BUT executes upvoteAction instead
        */}
        <button formAction={upvoteAction}>
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

        {/*
          ------------------------------------------------------------
          DOWNVOTE BUTTON
          ------------------------------------------------------------

          Same form, different action.
        */}
        <button formAction={downvoteAction}>
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
