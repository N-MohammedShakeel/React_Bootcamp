import { Component } from "react";

/*
  ERROR BOUNDARY
  ==============

  Purpose:
  - Catch JavaScript errors in child components
  - Prevent the entire React app from crashing
  - Show a fallback UI instead

  IMPORTANT RULE:
  ----------------
  ❗ Error Boundaries MUST be class-based components
  ❗ Functional components CANNOT act as error boundaries
  ❗ Hooks like useEffect / useErrorBoundary do NOT replace this
*/
class ErrorBoundary extends Component {
  constructor() {
    super();

    /*
      Local error state
      - Used to decide whether to show fallback UI
    */
    this.state = { hasError: false };
  }

  /*
    componentDidCatch()
    -------------------
    - Special lifecycle method
    - Triggered when a child component throws an error
    - Runs during rendering, lifecycle methods, or constructors
    - NOT triggered by:
        ❌ event handlers
        ❌ async code (setTimeout, fetch)
  */
  componentDidCatch(error) {
    console.log("Error caught by ErrorBoundary:", error);

    /*
      Update state → triggers re-render
      → fallback UI will be shown
    */
    this.setState({ hasError: true });
  }

  render() {
    /*
      If an error occurred anywhere inside this boundary,
      render a safe fallback UI instead of crashing the app
    */
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }

    /*
      Otherwise, render wrapped child components normally
    */
    return this.props.children;
  }
}

export default ErrorBoundary;
