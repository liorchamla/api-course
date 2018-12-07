import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientDisplay from "../components/ClientDisplay";

import format from "./../services/formatter";
import facturesService from "../services/facturesService";

const FactureRow = ({ facture }) => {
  return (
    <tr>
      <td>{facture.id}</td>
      <td>
        <Link to={`/factures/${facture.id}`}>{facture.chrono}</Link>
      </td>
      <td>
        <ClientDisplay client={facture.customer} />
      </td>
      <td>{format.amount(facture.amount)}</td>
      <td>{format.invoiceStatus(facture.status)}</td>
      <td>{format.date(facture.sentAt)}</td>
      <td>
        <Link to={`/factures/${facture.id}`} className="btn btn-primary btn-sm">
          Editer
        </Link>
      </td>
    </tr>
  );
};

class Factures extends Component {
  state = {
    factures: []
  };

  async componentDidMount() {
    const factures = await facturesService.all();
    this.setState({ factures });
  }

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
            {this.state.factures.map(f => (
              <FactureRow facture={f} key={f.id} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Factures;
