import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "../../hooks/usePrevious";

const SingleOTPInputComponent = (props) => {
  const { error, focus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus) {
        inputRef.current.focus();
      }
      if (focus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [focus, prevFocus]);

  return <input ref={inputRef} {...rest} style={error ? styles.error : {}} />;
};

const styles = {
  error: {
    borderColor: "#dc3545",
    boxShadow: "0 0 0 0.2rem rgba(220,53,69,.25)",
  },
};

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
