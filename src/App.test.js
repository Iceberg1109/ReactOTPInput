import { fireEvent, render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";

import OTPInput from "./components/OTPInput/index";
import Home from "./pages/Home";
import Success from "./pages/Success";

test("renders home", () => {
  render(<Home />);
  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();
});

it("renders otp", () => {
  const div = document.createElement("div");
  ReactDOM.render(<OTPInput length={6} />, div);
});

test("renders success", () => {
  render(<Success />);
  const successImg = screen.getByAltText(/success/i);
  expect(successImg).toBeInTheDocument();
});

test("OTP validation check", async () => {
  render(<Home />);

  userEvent.click(screen.getByText("Submit"));
  expect(screen.queryByText(/Please fill the inputs/)).toBeInTheDocument();

  userEvent.type(screen.getByTestId("otp-input-0"), "1");
  userEvent.type(screen.getByTestId("otp-input-1"), "1");
  userEvent.type(screen.getByTestId("otp-input-2"), "1");
  userEvent.type(screen.getByTestId("otp-input-3"), "1");
  userEvent.type(screen.getByTestId("otp-input-4"), "1");
  userEvent.type(screen.getByTestId("otp-input-5"), "1");
  expect(screen.queryByText(/Please fill the inputs/)).toBeNull();
});

test("OTP submit check", async () => {
  render(<Home />);

  userEvent.type(screen.getByTestId("otp-input-0"), "1");
  userEvent.type(screen.getByTestId("otp-input-1"), "1");
  userEvent.type(screen.getByTestId("otp-input-2"), "1");
  userEvent.type(screen.getByTestId("otp-input-3"), "1");
  userEvent.type(screen.getByTestId("otp-input-4"), "1");
  userEvent.type(screen.getByTestId("otp-input-5"), "1");
  userEvent.click(screen.getByText("Submit"));

  expect(screen.queryByText(/Success/)).toBeNull();

  userEvent.type(screen.getByTestId("otp-input-0"), "1");
  userEvent.type(screen.getByTestId("otp-input-1"), "1");
  userEvent.type(screen.getByTestId("otp-input-2"), "1");
  userEvent.type(screen.getByTestId("otp-input-3"), "1");
  userEvent.type(screen.getByTestId("otp-input-4"), "1");
  userEvent.type(screen.getByTestId("otp-input-5"), "7");
  userEvent.click(screen.getByText("Submit"));

  expect(screen.queryByText(/Your verification code is wrong./)).toBeNull();
});
