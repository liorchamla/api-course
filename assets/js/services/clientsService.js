import http from "./http";

export const getClients = () => {
  return http.get("/api/customers").then(response => response.data);
};

export default {
  all: getClients
};
