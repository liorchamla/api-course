import http from "./http";
import cache from "./cache";
import { toast } from "react-toastify";

export const getFactures = async () => {
  try {
    return await cache.getItem("invoices");
  } catch (error) {
    try {
      const { data: invoices } = await http.get("/api/invoices");
      cache.setItem("invoices", invoices);
      return invoices;
    } catch (httpError) {
      toast.error(
        "Nous n'arrivons pas à charger les factures pour l'instant, merci de réessayer plus tard !"
      );
      return [];
    }
  }
};

export default {
  all: getFactures
};
