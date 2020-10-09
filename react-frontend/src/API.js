import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";

const API = axios.create({
  headers:{
    'x-auth-token':localStorage.getItem('JWToken'),
  },
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "http://localhost:8000/api",
  withCredentials: true,
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      console.log("Got 401");
    }
    return Promise.reject(error);
  }
);
loadProgressBar({}, API);

export default API;
