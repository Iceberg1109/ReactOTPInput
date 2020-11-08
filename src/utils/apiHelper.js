import axios from "axios";

const createAxios = () => {
  const config = {
    headers: { Accept: "application/json" },
  };
  const instance = axios.create(config);

  return instance;
};

export const POST = (url, data) => createAxios().post(url, data);
export const GET = (url, params) => createAxios().get(url, { params });

export const submitOTP = async (otp) => {
  let apiAddr = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/otp`;
  let data = await POST(apiAddr, { otp });
  return data;
};
