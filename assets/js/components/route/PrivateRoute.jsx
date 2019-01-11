import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/auth";

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={`/login?redirectPath=${path}`} />
      )
    }
  />
);

export default PrivateRoute;
