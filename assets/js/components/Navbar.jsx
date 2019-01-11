import React, { Component } from "react";

import auth from "../services/auth";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  handleLogout = () => {
    auth.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">
          SymReact !
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainNavBar"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavBar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                Accueil
              </NavLink>
            </li>

            {auth.isAuthenticated() && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/clients">
                    Clients
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/factures">
                    Factures
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            {!auth.isAuthenticated() && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Connexion
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Inscription
                  </NavLink>
                </li>
              </>
            )}
            {auth.isAuthenticated() && (
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={this.handleLogout}
                >
                  Déconnexion
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
