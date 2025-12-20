import { Component } from "react";

import classes from "./User.module.css";

/*
  CLASS-BASED COMPONENT (React)
  =============================

  - Before React Hooks, class components were the primary way
    to manage state and lifecycle logic.
  - They are still fully supported, but function components
    are now preferred in modern React.

  Key points:
  - A class component MUST extend React.Component
  - It MUST implement a render() method
  - render() returns JSX (just like a function component)
*/
class User extends Component {
  /*
    render()
    --------
    - Called by React whenever the component needs to be rendered
    - Similar to executing a function component
    - Must be a PURE method (no side effects)
  */
  render() {
    /*
      Accessing props in class components:
      - Props are available via this.props
      - There is NO function argument like (props)
    */
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

/*
  FUNCTION COMPONENT EQUIVALENT (for comparison)
  ----------------------------------------------
  const User = (props) => {
    return <li className={classes.user}>{props.name}</li>;
  };

  Differences:
  - No "this"
  - Simpler syntax
  - Hooks replace lifecycle methods & state
*/

export default User;
