import React, { Component } from "react";

import { Link } from "react-router-dom";

class Clients extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Gestion des clients</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id.</th>
              <th>Client</th>
              <th>Factures</th>
              <th>Montant global</th>
              <th>Montant non facturé</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12</td>
              <td>
                <img
                  src="http://placehold.it/28x28"
                  alt=""
                  className="avatar"
                />{" "}
                Lior Chamla
              </td>
              <td>5</td>
              <td>5000,00&euro;</td>
              <td>2500,00&euro;</td>
              <td>
                <Link className="btn btn-primary btn-sm" to="/clients/xxx">
                  Modifier
                </Link>
                <Link className="btn btn-danger btn-sm" to="/clients/xxx">
                  Supprimer
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Clients;
