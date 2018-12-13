import React, { Component } from "react";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import clientsService from "../services/clientsService";
import FormFooter from "../components/form/FormFooter";
import facturesService from "../services/facturesService";
import moment from "moment";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

class FactureForm extends Component {
  state = {
    invoice: {
      amount: 0,
      customer: "",
      status: "sent",
      sentAt: ""
    },
    errors: {},
    editing: false,
    customers: [],
    loading: true
  };

  async componentDidMount() {
    let invoice = { ...this.state.invoice };

    try {
      const customers = await clientsService.all();
      this.setState({ customers });
    } catch (error) {
      toast.error(
        `Nous n'avons pas pu charger les clients pour l'édition de facture ! Réessayez plus tard !`
      );
      this.props.history.replace("/factures");
    }

    const { id } = this.props.match.params;
    if (id !== "new") {
      try {
        invoice = await facturesService.find(id);
        invoice.sentAt = moment(invoice.sentAt).format("YYYY-MM-DD");
        invoice.customer = `/api/customers/${invoice.customer.id}`;
        this.setState({ invoice, editing: true, loading: false });
      } catch (error) {
        toast.error(
          `Nous n'avons pas pu charger les données pour l'édition de facture ! Réessayez plus tard !`
        );
        this.props.history.replace("/factures");
      }
    }
    this.setState({ loading: false });
  }

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const invoice = { ...this.state.invoice };

    invoice[name] = value;
    this.setState({ invoice });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { invoice, editing } = this.state;
    const errors = {};

    try {
      if (editing) await facturesService.edit(invoice);
      else await facturesService.create(invoice);

      this.props.history.replace("/factures");
    } catch ({ response }) {
      if (response.status === 400) {
        if (response.data.violations) {
          response.data.violations.forEach(v => {
            errors[v.propertyPath] = v.message;
          });
        } else {
          errors.customer = "Vous devez choisir un client pour la facture !";
        }
      }
      this.setState({ errors });
    }
  };

  render() {
    const { invoice, errors, customers, editing, loading } = this.state;
    return (
      <>
        <h1>
          {editing
            ? `Modification de la facture ${invoice.chrono}`
            : "Création d'une facture"}
        </h1>
        {loading && <FormContentLoader />}
        {!loading && (
          <form onSubmit={this.handleSubmit}>
            <Input
              name="amount"
              type="number"
              placeholder="Montant de la facture"
              label="Montant"
              value={invoice.amount}
              onChange={this.handleChange}
              error={errors.amount}
            />
            <Select
              name="customer"
              label="Client"
              value={invoice.customer}
              onChange={this.handleChange}
              error={errors.customer}
            >
              <option value="">-- Choisir un client --</option>
              {customers.map(c => (
                <option key={c.id} value={`/api/customers/${c.id}`}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </Select>

            <Select
              name="status"
              label="Statut"
              value={invoice.status}
              onChange={this.handleChange}
              error={errors.status}
            >
              <option value="sent">Envoyée</option>
              <option value="paid">Payée</option>
              <option value="canceled">Annulée</option>
            </Select>

            <Input
              type="date"
              name="sentAt"
              value={invoice.sentAt}
              label="Date d'envoi"
              error={errors.sentAt}
              onChange={this.handleChange}
              help="Laissez vide pour automatiquement dater d'aujourd'hui"
            />

            <FormFooter
              submitLabel="Enregistrer la facture"
              returnLabel="ou retourner aux factures"
              returnUrl="/factures"
            />
          </form>
        )}
      </>
    );
  }
}

export default FactureForm;
