import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import { UserContext } from "../../use-context";

import classes from "./Main.module.css";
import classes1 from "../UI/Input/Input.module.css";
import Input from "../UI/Input/Input";

const arr = [
  classes1["in"] + " " + classes1["input"],
  classes1["in"] + " " + classes1["invalid"],
];

const emailReducer = (state, action) => {
  if (action.signal === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.signal === "BLUR_INPUT") {
    return { value: state.value, isValid: state.value.includes("@") };
  } else {
    return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  if (action.signal === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  } else if (action.signal === "BLUR_INPUT") {
    return { value: state.value, isValid: state.value.length > 6 };
  } else {
    return { value: "", isValid: false };
  }
};

const Main = (props) => {
  const ctx = useContext(UserContext);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(emailState.isValid && passwordState.isValid);
  }, [emailState.isValid, passwordState.isValid]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    if (isFormValid) {
      setFormValid(false);
      emailDispatch({});
      passwordDispatch({});
      ctx.loginHandler();
    }else if(!emailState.isValid){
      emailRef.current.focus();
    }else{
      passwordRef.current.focus();
    }
  };

  const emailHandler = (event) => {
    let email = event.target.value;
    emailDispatch({ signal: "USER_INPUT", val: email });
    console.log('***********************');
    emailRef.current.focus();
    console.log('***********************');
  };

  const emailBlur = (event) => {
    emailDispatch({ signal: "BLUR_INPUT" });
    event.target.className = emailState.isValid ? arr[0] : arr[1];
  };

  const passwordHandler = (event) => {
    let password = event.target.value.trim();
    passwordDispatch({ signal: "USER_INPUT", val: password });
  };

  const passwordBlur = (event) => {
    passwordDispatch({ signal: "BLUR_INPUT" });
    event.target.className = passwordState.isValid ? arr[0] : arr[1];
  };

  return (
    <Card className={classes["form-wrapper"]}>
      {!ctx.isLoggedIn && (
        <form onSubmit={submitHandler} className={classes["form"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="email">E-Mail</label>
            <Input
              value={emailState.value}
              className={arr[0]}
              onChange={emailHandler}
              onBlur={emailBlur}
              id="email"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="password">Password</label>
            <Input
              value={passwordState.value}
              className={arr[0]}
              onChange={passwordHandler}
              onBlur={passwordBlur}
              id="password"
              type="password"
              ref={passwordRef}
            />
          </div>
          <Button type="submit">
            Login
          </Button>
        </form>
      )}
      {ctx.isLoggedIn && (
        <div>
          <p className={classes.welcome}>Welcome back!</p>
          <Button onClick={ctx.logoutHandler}>Logout</Button>
        </div>
      )}
    </Card>
  );
};

export default Main;
