import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Gestion des clients et factures !</h1>
        <p className="lead">
          Grâce à notre petite application, gérez vos clients et factures
          simplement !
        </p>
        <hr className="my-4" />
        <p>
          Si vous avez besoin d'un logiciel simple pour gérer vos clients et
          leurs factures, vous êtes au bon endroit !
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Gestion des clients
          </a>
        </p>
      </div>
    );
  }
}

export default Home;
