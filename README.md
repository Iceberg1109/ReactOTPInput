# OTP verification Input

The front end is built by React.
You can check it at https://react-otp-input-drab.vercel.app/

## Features

- Manually input the code
- Paste any number of digits to any place
- Client Validation
  - Only allows numbers
  - Can't submit until fulfilled
- Resuable OTPInput components with custom length
- Unit testing

## Running locally

```
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Running tests

```
npm run test
```

Testing is written with the the helpf of Jest and [testing library](https://testing-library.com/docs/react-testing-library/intro).

## Build the production

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
