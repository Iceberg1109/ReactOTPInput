import React, { useState } from "react";
import OTPInput from "../components/OTPInput/index";
import { useHistory } from "react-router-dom";
import { submitOTP } from "../utils/apiHelper";

const Home = (props) => {
  const history = useHistory();

  const [otp, setOTP] = useState("");
  const [validationErr, setValidationErr] = useState(false);
  const [loading, setLoading] = useState(0);

  const handleOnChange = (otp) => {
    setOTP(otp);
    if (!!validationErr && otp.length === 6) setValidationErr(false);
  };

  const handleOnSubmit = () => {
    if (loading) return;

    if (otp.length < 6) {
      setValidationErr("Please fill the inputs");
      return;
    }

    setLoading(true);
    submitOTP(otp)
      .then((res) => {
        if (res.data.status === "success") history.push("/success");
        else setValidationErr("Your verification code is wrong.");
      })
      .catch((err) => {
        setValidationErr("Something went wrong.");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="App">
      <OTPInput
        length={6}
        className="otp"
        inputClassName="otp__input"
        onChangeOTP={handleOnChange}
        error={validationErr}
      />
      <button onClick={handleOnSubmit} className="submit__button">
        Submit
      </button>
    </div>
  );
};

export default Home;
