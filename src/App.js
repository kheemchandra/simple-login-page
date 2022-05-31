import React, { useState, useEffect } from "react";

import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main"; 


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('isLoggedInIdentifier') === '1'){
      setLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedInIdentifier', '1');
  }

  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedInIdentifier');
  };

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      <Main isLoggedIn={isLoggedIn} loginHandler={loginHandler} logoutHandler={logoutHandler} />
    </>
  );
};

export default App;
