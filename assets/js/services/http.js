import Axios from "axios";

Axios.defaults.headers["Accept"] = "application/json";

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete
};
