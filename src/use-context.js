import React, { useState, useEffect } from "react";

export const UserContext = React.createContext({
  isLoggedIn: null,
  loginHandler: null,
  logoutHandler: null,
});

const Checking = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedInIdentifier") === "1") {
      setLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedInIdentifier", "1");
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedInIdentifier");
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default Checking;
