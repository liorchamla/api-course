import axios from "axios";
import auth from "./auth";

axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers["Authorization"] = "Bearer " + auth.getToken();
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      auth.logout();
      return error;
    }
    throw error;
  }
);

const get = url => {
  return axios.get(url).then(response => response.data);
};

export default {
  get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
