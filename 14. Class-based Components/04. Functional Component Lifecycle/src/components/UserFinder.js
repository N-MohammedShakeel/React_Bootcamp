import { Fragment, useState, useEffect } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

/*
  FUNCTIONAL COMPONENT LIFECYCLE (MENTAL MODEL)
  =============================================

  Functional components do NOT have explicit lifecycle methods.

  Instead, lifecycle behavior is achieved using:
  - useState  → component state
  - useEffect → lifecycle synchronization

  Lifecycle phases:
  -----------------
  1️⃣ Mounting   → component appears on screen
  2️⃣ Updating  → state / props change
  3️⃣ Unmounting → component removed from screen
*/

const UserFinder = () => {
  /*
    INITIAL RENDER (Mounting Phase)
    -------------------------------
    - useState runs during render
    - Initial state values are set ONCE
  */
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  /*
    useEffect → Lifecycle Replacement
    --------------------------------
    This effect runs:
    - AFTER the component renders
    - AGAIN whenever `searchTerm` changes

    Equivalent class lifecycle behavior:
    - componentDidMount
    - componentDidUpdate (with condition)
  */
  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]); // Dependency controls UPDATE phase

  /*
    Event Handler
    -------------
    - Updates state
    - Triggers re-render
    - Causes useEffect to run again
  */
  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type="search" onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};

export default UserFinder;
