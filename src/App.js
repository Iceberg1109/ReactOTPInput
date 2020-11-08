import OTPInput from "./components/OTPInput";
import "./App.css";

function App() {
  return (
    <div className="App">
      <OTPInput
        length={6}
        className="otpContainer"
        inputClassName="otpInput"
        onChangeOTP={(otp) => console.log("Number OTP: ", otp)}
      />
    </div>
  );
}

export default App;
