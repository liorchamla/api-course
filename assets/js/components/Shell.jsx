import React, { Component } from "react";
import { Switch, Route, HashRouter, withRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Home from "../pages/Home";
import Clients from "./../pages/Clients";
import Factures from "./../pages/Factures";
import ClientForm from "./../pages/ClientForm";
import FactureForm from "./../pages/FactureForm";
import LoginForm from "./../pages/LoginForm";
import PrivateRoute from "./route/PrivateRoute";
import RegisterForm from "../pages/RegisterForm";

class Shell extends Component {
  render() {
    const WithRouterNavbar = withRouter(Navbar);

    return (
      <HashRouter>
        <>
          <WithRouterNavbar />
          <main className="container pt-5">
            <ToastContainer />
            <Switch>
              <PrivateRoute path="/clients/:id" component={ClientForm} />
              <PrivateRoute path="/clients" component={Clients} />
              <PrivateRoute path="/factures/:id" component={FactureForm} />
              <PrivateRoute path="/factures" component={Factures} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
          <footer className="footer bg-light text-center py-5 mt-5">
            <strong>SymReact, gérez simplement vos clients !</strong>
          </footer>
        </>
      </HashRouter>
    );
  }
}

export default Shell;
