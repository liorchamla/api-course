import http from "./http";

const register = user => {
  return http.post("/api/users", user);
};

export default {
  register
};
