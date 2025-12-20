import { Fragment, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";

/*
  CLASS COMPONENT — USING CONTEXT
  ===============================

  Key points:
  - Users data comes from Context
  - Component does NOT own the source of truth
  - Shared data can be consumed without prop drilling

  IMPORTANT RULE (Class Components):
  ----------------------------------
  - A class component can be directly linked to
    ONLY ONE Context using `static contextType`
*/
class UserFinder extends Component {
  /*
    contextType
    -----------
    - Special static property for class components
    - Makes the context available via: this.context
    - LIMITATION:
      ❗ Only ONE context can be consumed this way
      ❗ For multiple contexts, Context.Consumer must be used
  */
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  /*
    componentDidMount
    -----------------
    - Runs once after first render
    - Context is already available here
    - Initializes local state using context data
  */
  componentDidMount() {
    this.setState({ filteredUsers: this.context.users });
  }

  /*
    componentDidUpdate
    ------------------
    - Runs after every update
    - Filters users when searchTerm changes
    - Uses Context as the data source
  */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>

        {/* Data passed down is derived from Context */}
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

export default UserFinder;
