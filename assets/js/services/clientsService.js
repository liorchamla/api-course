import http from "./http";
import auth from "./auth";

export const getClient = id => {
  return http.get("/api/customers/" + id);
};

export const getClients = () => {
  return http.get("/api/customers");
};

export const createClient = customer => {
  return http.post("/api/customers", customer);
};

export const updateClient = customer => {
  return http.put("/api/customers/" + customer.id, customer);
};

export const deleteClient = id => {
  return http.delete("/api/customers/" + id);
};

export default {
  all: getClients,
  find: getClient,
  create: createClient,
  edit: updateClient,
  delete: deleteClient
};
