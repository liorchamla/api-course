import React, { Component } from "react";

import { Link } from "react-router-dom";
import ClientDisplay from "../components/ClientDisplay";
import clientsService from "../services/clientsService";

const formatAmount = amount => `${amount.toLocaleString("ft-FR")} €`;

const ClientRow = ({ client }) => {
  const globalInvoiced = formatAmount(client.totalInvoiced.global);
  const unpaidInvoices = formatAmount(
    client.totalInvoiced.global -
      client.totalInvoiced.paid -
      client.totalInvoiced.canceled
  );

  return (
    <tr>
      <td>{client.id}</td>
      <td>
        <ClientDisplay client={client} />
      </td>
      <td>{client.invoicesCount}</td>
      <td>{globalInvoiced}</td>
      <td>{unpaidInvoices}</td>
      <td>
        <Link className="btn btn-primary btn-sm" to={`/clients/${client.id}`}>
          Modifier
        </Link>
        <Link className="btn btn-danger btn-sm" to={`/clients/${client.id}`}>
          Supprimer
        </Link>
      </td>
    </tr>
  );
};

class Clients extends Component {
  state = {
    customers: [],
    loading: true
  };

  async componentDidMount() {
    const customers = await clientsService.all();
    this.setState({ customers, loading: false });
  }

  render() {
    const { customers, loading } = this.state;
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
              <th>Montant non encaissé</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td>Chargement ...</td>
              </tr>
            )}
            {!loading &&
              customers.map(c => <ClientRow client={c} key={c.id} />)}
          </tbody>
        </table>
      </>
    );
  }
}

export default Clients;
