import React, { useState, useCallback } from "react";
import SingleInput from "./SingleInput";

const OTPInput = (props) => {
  const {
    length,
    disabled,
    onChangeOTP,
    inputClassName,
    inputStyle,
    error,
    ...rest
  } = props;

  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array(length).fill(""));

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp) => {
      const otpValue = otp.join("");
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getOnlyNumber = useCallback((str) => {
    return !str || /\d/.test(str) ? str : "";
  }, []);

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || "";
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e) => {
      const val = getOnlyNumber(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }

      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getOnlyNumber]
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "Backspace":
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        case "Delete":
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusNextInput();
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          focusPrevInput();
          break;
        case "ArrowRight":
          e.preventDefault();
          focusNextInput();
          break;
        case " ":
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .trim()
        .slice(0, length - activeInput)
        .split("");
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getOnlyNumber(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getOnlyNumber, length, otpValues]
  );

  return (
    <>
      <div {...rest}>
        {Array(length)
          .fill("")
          .map((_, index) => (
            <SingleInput
              key={`SingleInput-${index}`}
              focus={activeInput === index}
              value={otpValues && otpValues[index]}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onBlur={onBlur}
              onKeyDown={handleOnKeyDown}
              onPaste={handleOnPaste}
              style={inputStyle}
              className={inputClassName}
              error={error && otpValues[index] === ""}
              data-testid={`otp-input-${index}`}
            />
          ))}
      </div>
      <div>{!!error && <label style={{ color: "red" }}>{error}</label>}</div>
    </>
  );
};

export default OTPInput;
