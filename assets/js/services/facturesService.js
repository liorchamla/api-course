import http from "./http";

export const getFactures = () => {
  return http.get("/api/invoices").then(response => response.data);
};

export default {
  all: getFactures
};
