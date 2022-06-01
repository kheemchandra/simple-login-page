import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import classes from "./Main.module.css";

const emailReducer = (prevState, action) => {

};

const Main = (props) => {
  const [emailState, setEmailState] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);

  const [passwordState, setPasswordState] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);

  const [isFormValid, setFormValid] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault(); 

    if (isFormValid) { 
      setFormValid(false);
      setEmailState("");
      setEmailValid(false);
      setPasswordState("");
      setPasswordValid(false);
      props.loginHandler();
    }
  };

  

  const emailHandler = (event) => {
    let email = event.target.value;  
    setEmailState(email);
    setEmailValid(email.includes('@'));
    // setFormValid(
    //   email.includes('@') && isPasswordValid 
    // );
  }; 

  const emailBlur = (event) => {
    event.target.className = isEmailValid ? classes.input : classes.invalid;
  };

  // useEffect(() => {
  //   let timer = setTimeout(()=>{ 
  //     setFormValid(isEmailValid && isPasswordValid);
  //     console.log('hi there');
  //   }, 500);

  //   return () => { clearTimeout(timer); };
  // },[isEmailValid, isPasswordValid]);

  useEffect(() => { 
    console.log('You called me again.');
      setFormValid(isEmailValid && isPasswordValid);  
  },[isEmailValid, isPasswordValid]);
  
  const passwordHandler = (event) => {
    let password = event.target.value.trim(); 
    setPasswordState(password);
    setPasswordValid(password.length > 6);
    // setFormValid(
    //   isEmailValid && password.length > 6
    // );
  }; 

  const passwordBlur = (event) => {
    event.target.className = isPasswordValid ? classes.input : classes.invalid;
  };

  return (
    <Card className={classes["form-wrapper"]}>
      {!props.isLoggedIn && (
        <form onSubmit={submitHandler} className={classes["form"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="email">E-Mail</label>
            <input
              value={emailState}
              className={classes.input}
              onChange={emailHandler}
              onBlur={emailBlur}
              id="email"
              type="email"
            />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="password">Password</label>
            <input
              value={passwordState}
              className={classes.input}
              onChange={passwordHandler}
              onBlur={passwordBlur}
              id="password"
              type="password"
            />
          </div>
          <Button type="submit" disabled={!isFormValid}>
            Login
          </Button>
        </form>
      )}
      {props.isLoggedIn && <div>
        <p className={classes.welcome}>Welcome back!</p>
        <Button onClick={props.logoutHandler}>Logout</Button>
        </div>}
    </Card>
  );
};

export default Main;
