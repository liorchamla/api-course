import React, { Component } from "react";
import Input from "./../components/form/Input";
import FormFooter from "./../components/form/FormFooter";
import queryString from "query-string";
import auth from "../services/auth";

class LoginForm extends Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    errors: {},
    error: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = this.state.user;

    auth.authenticate(user).then(data => {
      if (!data) {
        this.setState({
          errors: {
            username: `Le compte n'existe pas ou les informations ne correspondent pas.`
          }
        });
      } else {
        const params = queryString.parse(this.props.location.search);
        this.props.history.push(params.redirectPath || "/clients");
      }
    });
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
        <h1>Connexion</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            placeholder="Email de connexion"
            label="Adresse email"
            value={user.username}
            onChange={this.handleChange}
            error={errors.username}
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
          <FormFooter
            submitLabel="Connexion au site !"
            returnUrl="/"
            returnLabel="Revenir à l'accueil"
          />
        </form>
      </>
    );
  }
}

export default LoginForm;
