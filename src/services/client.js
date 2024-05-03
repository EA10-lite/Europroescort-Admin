import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

axios.defaults.baseURL = process.env.BASE_API;

axios.interceptors.request.use((config) => {
  config.headers["Accept"] = "application/json"; // Set the Accept header
  config.headers["Content-Type"] = "application/json"; // Set the Content-Type header

  // Set referrerPolicy
  config.referrerPolicy = "strict-origin-when-cross-origin";

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
