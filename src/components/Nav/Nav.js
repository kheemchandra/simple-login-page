import React from "react";

import classes from "./Nav.module.css";

const Nav = (props) => {

  let style = (props.isLoggedIn) ? {} : {'display': 'none'};


  return (
    
    <nav className={classes.nav}>
      <div className={classes["nav-left"]}>
        <h1>A Typical Page</h1>
      </div>
      <div style={style} className={classes["nav-right"]}>
        <a href="/">Users</a>
        <a href="/">Admin</a>
        <button onClick={props.logoutHandler} className={classes.logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
