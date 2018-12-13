import Axios from "axios";

Axios.defaults.headers["Accept"] = "application/json";

const get = url => {
  return Axios.get(url).then(response => response.data);
};

export default {
  get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete
};
