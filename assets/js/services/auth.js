import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const retrieveToken = () => {
  return window.localStorage.getItem("authToken") || null;
};

const saveToken = token => {
  window.localStorage.setItem("authToken", token);
};

const logout = () => {
  window.localStorage.removeItem("authToken");
  axios.defaults.headers["Authorization"] = "";
};

const getUser = () => {
  const token = retrieveToken();

  if (token) return jwtDecode(token).data;

  return null;
};

const authenticate = user => {
  return axios
    .post("/api/login_check", user)
    .then(response => {
      const token = response.data.token;
      saveToken(token);
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      toast.success("Connecté avec succès !");
      return true;
    })
    .catch(error => {
      toast.error(
        "La connexion n'a pas pu être effectuée, veuillez réessayer plus tard"
      );
      return false;
    });
};

const isTokenExpired = token => {
  const data = jwtDecode(token);

  return new Date().getTime() / 1000 - data.exp > 0;
};

const isAuthenticated = () => {
  const token = retrieveToken();

  if (!token) return false;

  return !isTokenExpired(token);
};

export default {
  authenticate,
  isAuthenticated,
  logout,
  getToken: retrieveToken,
  getUser
};
