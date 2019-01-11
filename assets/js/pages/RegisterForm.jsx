import React, { Component } from "react";
import Input from "./../components/form/Input";
import FormFooter from "./../components/form/FormFooter";
import userService from "../services/userService";

class RegisterForm extends Component {
  state = {
    user: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    errors: {}
  };

  handleSubmit = async e => {
    e.preventDefault();
    const user = this.state.user;
    const errors = {};

    try {
      await userService.register(user);

      this.props.history.replace("/login");
    } catch ({ response }) {
      if (response.status === 400) {
        response.data.violations.forEach(violation => {
          errors[violation.propertyPath] = violation.message;
        });

        this.setState({ errors });
      }
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const user = { ...this.state.user };

    user[name] = value;
    this.setState({ user });
  };

  render() {
    const { user, errors } = this.state;
    return (
      <>
        <h1>Inscription</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="firstName"
            placeholder="Votre prénom"
            label="Prénom"
            value={user.firstName}
            onChange={this.handleChange}
            error={errors.firstName}
          />
          <Input
            name="lastName"
            placeholder="Votre nom de famille"
            label="Nom de famille"
            value={user.lastName}
            onChange={this.handleChange}
            error={errors.lastName}
          />
          <Input
            name="email"
            placeholder="Adresse email"
            label="Adresse email"
            value={user.email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            label="Mot de passe"
            value={user.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Confirmation du mot de passe"
            label="Confirmation du mot de passe"
            value={user.passwordConfirmation}
            onChange={this.handleChange}
            error={errors.passwordConfirmation}
          />
          <FormFooter
            submitLabel="Je m'inscris !"
            returnUrl="/"
            returnLabel="Revenir à l'accueil"
          />
        </form>
      </>
    );
  }
}

export default RegisterForm;
