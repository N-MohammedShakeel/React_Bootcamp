import logoImg from "../assets/logo.jpg";

/*
  ------------------------------------------------------------
  HEADER COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Displays the main branding of the app
  - Shows the application title and logo
  - Contains navigation-related UI (Cart button)

  This is a purely PRESENTATIONAL component:
  - No state
  - No side effects
  - No business logic
*/

export default function Header() {
  return (
    /*
      <header>:
      ----------
      - Semantic HTML element
      - Represents the top section of the application
      - Improves accessibility and document structure
    */
    <header id="main-header">
      {/*
        Title section:
        --------------
        Groups logo and app name together
      */}
      <div id="title">
        {/*
          Logo image:
          -----------
          - Imported as a module by the bundler (Vite)
          - Optimized and resolved at build time
        */}
        <img src={logoImg} alt="A restaurant" />

        {/*
          Application name:
          -----------------
          - Main heading for the app
          - Helps with SEO and accessibility
        */}
        <h1>ReactFood</h1>
      </div>

      {/*
        Navigation section:
        -------------------
        - Holds navigation-related actions
        - Cart button will later be enhanced with:
            * item count
            * click handler
            * modal / page navigation
      */}
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
