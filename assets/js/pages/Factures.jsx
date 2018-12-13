import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClientDisplay from "../components/ClientDisplay";

import format from "./../services/formatter";
import facturesService from "../services/facturesService";
import Pagination from "./../components/Pagination";
import Search from "../components/Search";
import configuration from "./../config";
import TableContentLoader from "./../components/loaders/TableContentLoader";

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
    invoices: [],
    currentPage: 1,
    itemsPerPage: 5,
    filter: "",
    loading: true
  };

  async componentDidMount() {
    const itemsPerPage = configuration.itemsPerPage;
    let invoices = [];
    try {
      invoices = await facturesService.all();
    } catch (error) {
      toast.error(
        `Nous n'arrivons pas à récupérer les factures, réessayez plus tard !`
      );
    }
    this.setState({ invoices, loading: false, itemsPerPage });
  }

  handlePaginationChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = ({ currentTarget: input }) => {
    this.setState({ currentPage: 1, filter: input.value.toLowerCase() });
  };

  filter = () => {
    const { filter, invoices } = this.state;

    return invoices.filter(
      f =>
        f.customer.firstName.toLowerCase().includes(filter) ||
        f.customer.lastName.toLowerCase().includes(filter) ||
        f.chrono.toLowerCase().includes(filter)
    );
  };

  render() {
    const { loading, invoices, currentPage, itemsPerPage, filter } = this.state;

    const filtered = filter ? this.filter() : invoices;

    const paginated = Pagination.getPaginatedData(
      filtered,
      currentPage,
      itemsPerPage
    );

    return (
      <>
        <h1>Gestion des factures</h1>
        <div className="my-3">
          <Search onSearchChanged={this.handleSearch} />
        </div>
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
            {!loading &&
              paginated.map(f => <FactureRow facture={f} key={f.id} />)}
            {!loading && paginated.length === 0 && (
              <tr>
                <td>
                  <p>Pas encore de factures</p>
                  <Link to="/factures/new" className="btn btn-primary">
                    Créer ma première facture !
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && <TableContentLoader />}

        {filtered.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsCount={filtered.length}
            onPageChanged={this.handlePaginationChange}
          />
        )}

        <Link className="btn btn-primary" to="/factures/new">
          Créer une facture
        </Link>
      </>
    );
  }
}

export default Factures;
