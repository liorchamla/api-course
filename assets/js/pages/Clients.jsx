import React, { Component } from "react";

import { Link } from "react-router-dom";
import ClientDisplay from "../components/ClientDisplay";
import clientsService from "../services/clientsService";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Config from "../config";

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
    currentPage: 1,
    itemsPerPage: 5,
    filter: "",
    loading: true
  };

  async componentDidMount() {
    const customers = await clientsService.all();
    this.setState({
      customers,
      loading: false,
      itemsPerPage: Config.itemsPerPage
    });
  }

  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  handleFilter = ({ currentTarget: input }) => {
    const filter = input.value.toLowerCase();
    this.setState({ currentPage: 1, filter });
  };

  filter = () => {
    const { filter, customers } = this.state;

    return customers.filter(
      c =>
        c.firstName.toLowerCase().includes(filter) ||
        c.lastName.toLowerCase().includes(filter)
    );
  };

  render() {
    const {
      customers,
      itemsPerPage,
      currentPage,
      loading,
      filter
    } = this.state;

    let filteredData = filter ? this.filter() : customers;

    const paginatedData = Pagination.getPaginatedData(
      filteredData,
      currentPage,
      itemsPerPage
    );

    return (
      <>
        <h1>Gestion des clients</h1>
        <div className="my-3">
          <Search onSearchChanged={this.handleFilter} />
        </div>
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
              paginatedData.length > 0 &&
              paginatedData.map(c => <ClientRow client={c} key={c.id} />)}
            {!loading && paginatedData.length === 0 && (
              <tr>
                <td>
                  <p>Pas encore de clients</p>
                  <Link to="/clients/new" className="btn btn-primary">
                    Créer mon premier client !
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {filteredData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            itemsCount={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChanged={this.handlePagination}
          />
        )}
      </>
    );
  }
}

export default Clients;
