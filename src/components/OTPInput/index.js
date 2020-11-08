import React, { useState, useCallback } from "react";
import SingleInput from "./SingleInput";

const OTPInput = (props) => {
  const {
    length,
    disabled,
    onChangeOTP,
    inputClassName,
    inputStyle,
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

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e) => {
      const val = getOnlyNumber(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = val[0] || "";
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);

      focusNextInput();
    },
    [focusNextInput, getOnlyNumber, activeInput, handleOtpChange, otpValues]
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  return (
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
            style={inputStyle}
            className={inputClassName}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

export default OTPInput;
