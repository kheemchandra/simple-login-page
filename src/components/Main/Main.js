import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import classes from "./Main.module.css";

const emailReducer = (state, action) => {
  console.log('Hi there');
  if(action.signal === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}
  }else if(action.signal === 'BLUR_INPUT'){
    return {value: state.value, isValid: state.value.includes('@')}
  }else{
    return {value: '', isValid: false}
  }
};

const passwordReducer = (state, action) => {
  if(action.signal === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.length > 6}
  }else if(action.signal === 'BLUR_INPUT'){
    return {value: state.value, isValid: state.value.length > 6}
  }else{
    return {value: '', isValid: false}
  }
};

const Main = (props) => { 

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });
 
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });

  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => { 
    setFormValid(emailState.isValid && passwordState.isValid);
  }, [emailState.isValid, passwordState.isValid]);


  const submitHandler = (event) => {
    event.preventDefault(); 

    if (isFormValid) { 
      setFormValid(false); 
      emailDispatch({});
      passwordDispatch({});
      props.loginHandler();
    }
  };

  

  const emailHandler = (event) => {
    let email = event.target.value;  
    emailDispatch({signal: 'USER_INPUT', val: email});
  }; 

  const emailBlur = (event) => { 
    emailDispatch({signal: 'BLUR_INPUT'});
    event.target.className = emailState.isValid ? classes.input : classes.invalid;
  };
  
  const passwordHandler = (event) => {
    let password = event.target.value.trim(); 
    passwordDispatch({signal: 'USER_INPUT', val: password});
  }; 

  const passwordBlur = (event) => {
    passwordDispatch({signal: 'BLUR_INPUT'});
    event.target.className = passwordState.isValid ? classes.input : classes.invalid;
  };

  return (
    <Card className={classes["form-wrapper"]}>
      {!props.isLoggedIn && (
        <form onSubmit={submitHandler} className={classes["form"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="email">E-Mail</label>
            <input
              value={emailState.value}
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
              value={passwordState.value}
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
