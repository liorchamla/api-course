import http from "./http";
import cache from "./cache";
import { toast } from "react-toastify";

export const getFactures = () => {
  return http.get("/api/invoices");
};

export const getFacture = id => {
  return http.get("/api/invoices/" + id);
};

const formatInvoice = invoice => {
  invoice.amount = +invoice.amount;
  if (invoice.sentAt === "") delete invoice.sentAt;
  return invoice;
};

export const createFacture = invoice => {
  return http.post("/api/invoices", formatInvoice(invoice));
};

export const updateFacture = invoice => {
  return http.put("/api/invoices/" + invoice.id, formatInvoice(invoice));
};

export default {
  all: getFactures,
  find: getFacture,
  create: createFacture,
  edit: updateFacture
};
