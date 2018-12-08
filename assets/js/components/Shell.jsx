import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Home from "../pages/Home";
import Clients from "./../pages/Clients";
import Factures from "./../pages/Factures";

class Shell extends Component {
  render() {
    return (
      <HashRouter>
        <>
          <Navbar />
          <main className="container pt-5">
            <ToastContainer />
            <Switch>
              <Route path="/clients" component={Clients} />
              <Route path="/factures" component={Factures} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
        </>
      </HashRouter>
    );
  }
}

export default Shell;
