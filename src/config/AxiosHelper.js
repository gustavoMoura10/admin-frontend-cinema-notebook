/* eslint-disable no-undef */
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const AxiosHelper = axios.create({
  baseURL
});

AxiosHelper.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    const status = error?.response?.status;
    if (status && (status === 401 || status === 403)) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
export default AxiosHelper;
