import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ClientDisplay from "../components/ClientDisplay";
import clientsService from "../services/clientsService";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Config from "../config";
import TableContentLoader from "../components/loaders/TableContentLoader";

const formatAmount = amount => `${amount.toLocaleString("ft-FR")} €`;

const ClientRow = ({ client, onDelete }) => {
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
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(client)}
        >
          Supprimer
        </button>
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
    let customers = [];
    try {
      customers = await clientsService.all();
    } catch (error) {
      toast.error(
        `Nous n'arrivons pas à récupérer les clients, veuillez réessayer plus tard !`
      );
    }
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

  handleDelete = async client => {
    const customers = [...this.state.customers];
    const originalCustomers = [...customers];
    const index = customers.findIndex(c => c.id === client.id);

    customers.splice(index, 1);

    this.setState({ customers });

    try {
      await clientsService.delete(client.id);
      toast.success(
        `Le client ${client.firstName} ${client.lastName} a bien été supprimé`
      );
    } catch (error) {
      toast.error(
        `Le client ${client.firstName} ${
          client.lastName
        } n'a pas pu être supprimé, réessayez plus tard !`
      );
      this.setState({ customers: originalCustomers });
    }
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
            {!loading &&
              paginatedData.length > 0 &&
              paginatedData.map(c => (
                <ClientRow client={c} key={c.id} onDelete={this.handleDelete} />
              ))}
            {!loading && paginatedData.length === 0 && (
              <tr>
                <td>
                  <p>Pas encore de clients</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && <TableContentLoader />}

        {filteredData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            itemsCount={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChanged={this.handlePagination}
          />
        )}

        <Link className="btn btn-primary" to="/clients/new">
          Créer un nouveau client
        </Link>
      </>
    );
  }
}

export default Clients;
