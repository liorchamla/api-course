import React, { Component } from "react";
import { Link } from "react-router-dom";

class Factures extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Gestion des factures</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Numéro</th>
              <th>Client</th>
              <th>Montant</th>
              <th>Status</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12</td>
              <td>FA2018004</td>
              <td>
                <Link to="/clients/xxx">Lior Chamla</Link>
              </td>
              <td>2500,00&euro;</td>
              <td>Payée</td>
              <td>19/01/2018</td>
              <td>
                <Link to="/factures/xxx" className="btn btn-primary btn-sm">
                  Editer
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Factures;
