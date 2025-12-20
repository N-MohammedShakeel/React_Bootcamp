import { Component } from "react";

import User from "./User";
import classes from "./Users.module.css";

/*
  Dummy data for rendering the list
*/
const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

/*
  CLASS-BASED COMPONENT WITH STATE & EVENTS
  ========================================

  IMPORTANT RULES ABOUT STATE IN CLASS COMPONENTS
  -----------------------------------------------
  1️⃣ A class component can have ONLY ONE state container
     → You cannot create multiple states like useState

  2️⃣ The state variable MUST be named `state`
     → React looks specifically for `this.state`

  3️⃣ The state MUST ALWAYS be an OBJECT
     → Even if you store one value, it must be inside an object
*/
class Users extends Component {
  /*
    constructor()
    -------------
    - Runs once when the component instance is created
    - Used to initialize state in class components
    - super() must be called before using `this`
  */
  constructor() {
    super();

    /*
      this.state
      ----------
      ✔ Only ONE state object is allowed
      ✔ Must be called exactly `state`
      ✔ Must be an object

      Multiple values are grouped inside this single object
    */
    this.state = {
      showUsers: true,
      more: "Test", // additional state values live inside the same object
    };
  }

  /*
    Event Handler (Class Method)
    ----------------------------
    - Class methods are NOT auto-bound
    - `this` would be undefined without binding
  */
  toggleUsersHandler() {
    /*
      WRONG (never mutate state directly)
      this.state.showUsers = false;

      React will NOT re-render
    */

    /*
      CORRECT: setState()
      - setState MERGES the returned object with existing state
      - Only the changed fields need to be returned
    */
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  /*
    render()
    --------
    - Called whenever:
      ✔ state changes
      ✔ props change
    - Must return JSX
  */
  render() {
    /*
      JSX can be stored in variables
      - Improves readability
      - No performance impact
    */
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/*
          Event binding
          -------------
          - bind(this) ensures correct `this`
          - Without it, this.state would be undefined
        */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>

        {/*
          Conditional rendering using class state
        */}
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;
