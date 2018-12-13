import React, { Component } from "react";
import Input from "../components/form/Input";
import FormFooter from "../components/form/FormFooter";
import clientsService from "../services/clientsService";
import FormContentLoader from "../components/loaders/FormContentLoader";

import { toast } from "react-toastify";

class ClientForm extends Component {
  state = {
    editing: false,
    customer: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
      company: ""
    },
    errors: {},
    loading: true
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id !== "new") {
      try {
        const customer = await clientsService.find(id);
        this.setState({ customer, editing: true, loading: false });
      } catch (error) {
        toast.error(
          `Nous n'arrivons pas à récupérer le client n°${id}, réessayez plus tard !`
        );
        this.props.history.replace("/clients");
      }
    } else {
      this.setState({ loading: false });
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const customer = { ...this.state.customer };

    customer[name] = value;
    this.setState({ customer });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { customer, editing } = this.state;
    const errors = {};

    try {
      if (!editing) {
        await clientsService.create(customer);
      } else {
        await clientsService.edit(customer);
      }
      this.props.history.replace("/clients");
    } catch ({ response }) {
      if (response.status === 400) {
        response.data.violations.forEach(violation => {
          errors[violation.propertyPath] = violation.message;
        });

        this.setState({ errors });
      }
    }
  };
  fw;

  render() {
    const { customer, errors, editing, loading } = this.state;

    return (
      <>
        <h1>
          {loading && "Chargement ..."}
          {!loading &&
            (editing
              ? `Modification de ${customer.firstName} ${customer.lastName}`
              : "Création d'un client")}
        </h1>
        {loading && <FormContentLoader />}
        {!loading && (
          <form onSubmit={this.handleSubmit}>
            <Input
              name="firstName"
              label="Prénom"
              value={customer.firstName}
              placeholder="Entrez le prénom du client"
              onChange={this.handleChange}
              error={errors.firstName}
            />
            <Input
              name="lastName"
              value={customer.lastName}
              label="Nom de famille"
              placeholder="Entrez le nom de famille du client"
              onChange={this.handleChange}
              error={errors.lastName}
            />
            <Input
              name="company"
              label="Entreprise"
              value={customer.company}
              placeholder="Entrez l'entreprise"
              onChange={this.handleChange}
              error={errors.company}
            />
            <Input
              name="email"
              label="Adresse email"
              value={customer.email}
              placeholder="Entrez l'adresse email du client"
              onChange={this.handleChange}
              error={errors.email}
            />
            <Input
              name="avatar"
              label="URL de l'avatar"
              placeholder="Entrez l'URL de l'avatar"
              onChange={this.handleChange}
              value={customer.avatar}
              error={errors.avatar}
              help="Vous pouvez entrer n'importe quelle adresse valide d'image"
            />
            <FormFooter
              submitLabel="Enregistrer le client"
              returnLabel="ou revenir aux clients"
              returnUrl="/clients"
            />
          </form>
        )}
      </>
    );
  }
}

export default ClientForm;
