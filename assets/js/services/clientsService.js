import http from "./http";
import cache from "./cache";
import { toast } from "react-toastify";

export const getClients = async () => {
  try {
    return await cache.getItem("customers");
  } catch (error) {
    try {
      const { data: customers } = await http.get("/api/customers");
      cache.setItem("customers", customers);
      return customers;
    } catch (httpError) {
      toast.error(
        "Nous n'arrivons pas à charger les clients pour l'instant, merci de réessayer plus tard !"
      );
      return [];
    }
  }
};

export default {
  all: getClients
};
