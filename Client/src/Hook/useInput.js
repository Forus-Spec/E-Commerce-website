import React from 'react';

// this is the greatest useInput functionality ever which is amazing and awesome
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = React.useState('');
  const [isTouched   , setIsTouched   ] = React.useState(false);

  // this is our awesome validValue
  const valueIsValid = validateValue(enteredValue);
  const hasError     = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };
    return {
    value  : enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
}

// This is our useInput functionality which is huge and awesome
export default useInput;
