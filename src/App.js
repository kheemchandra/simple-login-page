import React, { useState } from "react";

import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main"; 

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setLoggedIn(true);
  }

  const logoutHandler = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      <Main isLoggedIn={isLoggedIn} loginHandler={loginHandler} logoutHandler={logoutHandler} />
    </>
  );
};

export default App;
