import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const Error = {
        error: "Network error: Please check your internet connection",
      };
      const data = { response: { data: Error } };
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

export default request;
