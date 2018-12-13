import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Home from "../pages/Home";
import Clients from "./../pages/Clients";
import Factures from "./../pages/Factures";
import ClientForm from "./../pages/ClientForm";
import FactureForm from "./../pages/FactureForm";

class Shell extends Component {
  render() {
    return (
      <HashRouter>
        <>
          <Navbar />
          <main className="container pt-5">
            <ToastContainer />
            <Switch>
              <Route path="/clients/:id" component={ClientForm} />
              <Route path="/clients" component={Clients} />
              <Route path="/factures/:id" component={FactureForm} />
              <Route path="/factures" component={Factures} />
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
