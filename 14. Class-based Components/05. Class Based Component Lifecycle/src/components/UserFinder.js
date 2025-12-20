import { Fragment, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

/*
  CLASS COMPONENT LIFECYCLE
  =========================

  Class components have EXPLICIT lifecycle methods.

  Lifecycle phases:
  -----------------
  1️⃣ Mounting
     - constructor()
     - render()
     - componentDidMount()

  2️⃣ Updating
     - render()
     - componentDidUpdate()

  3️⃣ Unmounting
     - componentWillUnmount()
*/

class UserFinder extends Component {
  /*
    constructor()
    -------------
    - Runs FIRST during mounting
    - Used to initialize state
  */
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  /*
    componentDidMount()
    -------------------
    - Runs ONCE after first render
    - Ideal for:
      ✔ HTTP requests
      ✔ setting initial derived state
  */
  componentDidMount() {
    // Example: load initial users
    this.setState({ filteredUsers: DUMMY_USERS });
  }

  /*
    componentDidUpdate()
    --------------------
    - Runs AFTER every update
    - Must compare previous state/props to avoid infinite loops
  */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  /*
    Event Handler
    -------------
    - Updates state
    - Triggers UPDATE lifecycle
  */
  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  /*
    render()
    --------
    - Runs on:
      ✔ initial mount
      ✔ every state update
    - Must stay pure
  */
  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

export default UserFinder;
