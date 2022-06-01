import React, { useContext } from "react";
import { UserContext } from "../../use-context";

import classes from "./Nav.module.css";

const Nav = (props) => {
  const ctx = useContext(UserContext);
  let style = (ctx.isLoggedIn) ? {} : {'display': 'none'};


  return (
    
    <nav className={classes.nav}>
      <div className={classes["nav-left"]}>
        <h1>A Typical Page</h1>
      </div>
      <div style={style} className={classes["nav-right"]}>
        <a href="/">Users</a>
        <a href="/">Admin</a>
        <button onClick={ctx.logoutHandler} className={classes.logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
