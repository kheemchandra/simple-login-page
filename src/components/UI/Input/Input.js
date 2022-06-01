import React from "react";


const Input = (props) => {
  return (
    <input
      value={props.value}
      className={props.className}
      onChange={props.onChange}
      onBlur={props.onBlur}
      id={props.id}
      type={props.type}
    />
  );
};

export default Input;
