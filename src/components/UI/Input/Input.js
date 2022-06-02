import React, { useRef, useImperativeHandle, forwardRef } from "react";


function Input(props, ref){
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return (
    <input
      value={props.value}
      className={props.className}
      onChange={props.onChange}
      onBlur={props.onBlur}
      id={props.id}
      type={props.type}
      ref={inputRef}
    />
  );
}

Input = forwardRef(Input);

export default Input;
