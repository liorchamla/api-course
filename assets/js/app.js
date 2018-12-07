/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React from "react";
import ReactDOM from "react-dom";

// any CSS you require will output into a single css file (app.css in this case)
import "../css/app.css";

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// var $ = require('jquery');

class App extends React.Component {
  state = {
    clicked: false
  };

  switchClick() {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World !</h1>
        <button onClick={this.switchClick.bind(this)}>
          Clicked: {this.state.clicked ? "Yes" : "No"}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
