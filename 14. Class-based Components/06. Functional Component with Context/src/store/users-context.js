import React from "react";

/*
  USERS CONTEXT
  =============

  - Context provides a way to share data
    across the component tree without prop drilling
  - This context will hold the list of users
  - Default value is used when no Provider is found
*/
const UsersContext = React.createContext({
  users: [],
});

export default UsersContext;
