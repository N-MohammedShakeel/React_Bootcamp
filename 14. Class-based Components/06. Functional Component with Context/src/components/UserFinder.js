import { Fragment, useState, useEffect, useContext } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";

/*
  FUNCTION COMPONENT WITH CONTEXT
  ===============================

  Purpose:
  - Demonstrates how FUNCTION components consume Context
  - Uses useContext instead of props
  - Uses useEffect to mimic lifecycle behavior

  This prepares the ground to understand
  how the SAME thing is done in class-based components.
*/

const UserFinder = () => {
  /*
    useContext(UsersContext)
    ------------------------
    - Subscribes this component to UsersContext
    - Returns the context value provided by the nearest Provider
    - Re-renders this component when context changes
  */
  const usersCtx = useContext(UsersContext);

  /*
    Local UI state
    --------------
    - filteredUsers → derived from context data
    - searchTerm    → controlled input state
  */
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /*
    useEffect → componentDidMount + componentDidUpdate equivalent
    --------------------------------------------------------------
    - Runs:
      ✔ once on mount
      ✔ again whenever searchTerm or context users change
    - Keeps derived state in sync with context
  */
  useEffect(() => {
    setFilteredUsers(
      usersCtx.users.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm, usersCtx.users]);

  /*
    Event handler
    -------------
    - Updates search term
    - Triggers effect re-run
  */
  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type="search" onChange={searchChangeHandler} />
      </div>

      {/* Users receive data derived from context */}
      <Users users={filteredUsers} />
    </Fragment>
  );
};

export default UserFinder;
